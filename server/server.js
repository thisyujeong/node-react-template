const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/Users');
const { auth } = require('./middleware/auth');

const config = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
  .then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello world!'));

/* Register */
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body); // user instance // user = collection 명
  user.save((err, userInfo) => {  // mongoDB method; save into User Model 
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success: true
    })
  });
});

/* login */
app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 DB에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json ({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.'
      })
    }
    // 요청된 이메일이 있다면 비밀번호가 일치하는가
    // 입력한 비밀번호와 DB에 있는 암호화된 비밀번호 일치 여부 확인
    user.comparePassword(req.body.password, (err, isMatch) => { 
      // 비밀번호까지 일치하다면 토큰 생성
      user.generateToken((err, user) => { // user에는 받아온 토큰이 들어있음
        if(err) return res.status(400).send(err);
        // token을 저장한다. 어디에? 쿠키, 로컬스토리지 
        res.cookie('x_auth', user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
      });
    }) 
  })
})

/* auth */
app.get('/api/users/auth', auth, (req, res) => { // auth 미들웨어
  res.status(200).json({
    _id: req.user_id,
    isAdmin: req.user.role == 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" },
    (err, user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    }
  )
})

app.listen(port, () => console.log(`Express app listening on port ${port}!`));

