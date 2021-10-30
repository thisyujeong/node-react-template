const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  role: { // ex) number가 1 이면 일반 유저, 0 이면 관리자
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
  var user = this; // userSchema 스키마를 가리킴
  if(user.isModified('password')) { // password가 변환될 때만 실행
    bcrypt.genSalt(saltRounds, function(err, salt){
      if(err) return next(err);
      bcrypt.hash( user.password, salt, function(err, hash) { // hash 암호화 된 비밀번호
        if(err) return next(err);
        user.password = hash; // 비밀번호를 암호화된 비밀번호로 교체
        next(); // register 라우트로 돌아가기
      });
    });
  }
})
const User = mongoose.model('User', userSchema);

module.exports = { User };