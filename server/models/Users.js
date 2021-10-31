const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

/* create Schema */
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlengt: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: { // ex) 0이면 일반유저, 1이면 관리자
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 비밀번호 암호화
userSchema.pre('save', function( next ) { // 유저 정보를 저장하기 전 실행 함수
  let user = this; // userSchema 스키마를 가리킴
  if(user.isModified('password')) { // password가 변환될 때만 실행
    bcrypt.genSalt(saltRounds, function(err, salt){
      if(err) return next(err);
      bcrypt.hash( user.password, salt, function(err, hash) { // hash 암호화 된 비밀번호
        if(err) return next(err);
        user.password = hash; // 비밀번호를 암호화된 비밀번호로 교체
        next(); // register 라우트로 돌아가기
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  })
}

userSchema.methods.generateToken = function(cb) {
  let user = this;
  // jsonwebtoken을 이용해 token 생성하기
  let token = jwt.sign(user._id.toHexString(), 'secretToken'); // user._id + 'secretToken' = token
  user.token = token;
  user.save(function(err, user){
    if(err) return cb(err);
    cb(null, user);
  })
}

/* methods, statics 차이점 */
// methods는 이 method를 호출한 객체가 method 내에서의 this가 되고,
// statics는 이 static를 호출한 객체에 상관없이 this가 모델 자체가 된다.
userSchema.statics.findByToken = function(token, cb) {
  let user = this;

  // 토큰을 decode(복호화)
  jwt.verify(token, 'secretToken', function(err, decoded) {
    // 유저 아이디를 이용해 유저를 찾은 후 
    // 클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인
    user.findOne({"_id": decoded, "token": token}, function(err, user){
      if(err) return cb(err);
      cb(null, user);
    }) 
  })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };