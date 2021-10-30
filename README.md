# node-react-template
노드 + 리액트 템플릿입니다. ([참고](https://www.youtube.com/playlist?list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T))

# Index
- [Initial Setting](#initial-setting)
  - [package와 라이브러리 설치](#package와-라이브러리-설치)
  - [Mongo DB Atlas 클러스터 생성 후 Connect URI 발급](#mongo-db-atlas-클러스터-생성-후-connect-uri-발급)
  - [express와 mongoDB 연결](#express와-mongodb-연결)
  - [Initial Project Structure](#initial-project-structure)
- [MongoDB Model과 Schema](#mongodb-model과-schema)
- [Client와 Server 통신](#client와-server-통신)    
  - [body-parser 설치 및 불러오기](#body-parser-설치-및-불러오기)    
  - [Postman 설치](#postman-설치)
- [Register Route 생성](#register-route-생성)    
  - [User Model 불러오기](#user-model-불러오기)    
  - [Register Route 작성](#register-route-작성)    
  - [Postman 으로 기능 확인](#postman-으로-기능-확인)    
- [Nodemon](#nodemon)    
  - [Install Nodemon](#install-nodemon)    
  - [Usage Nodemon](#usage-nodemon)    
- [비밀 설정 정보 관리 env](#비밀-설정-정보-관리-env)    
  - [환경에 따른 정보 전달](#환경에-따른-정보-전달)    
  - [gitignore 오픈소스 업로드 방지](#gitignore-오픈소스-업로드-방지)    
- [Bcrypt로 비밀번호 암호화](#bcrypt로-비밀번호-암호화)    
  - [Bcrypt 설치와 사용](#bcrypt-설치와-사용)    
  - [비밀번호 암호화하기](#비밀번호-암호화하기)    
- [로그인 기능 구현하기](#로그인-기능-구현하기)
  - [로그인 기능 구현 순서](#로그인-기능-구현-순서)
  - [암호 비교 메소드 생성](#암호-비교-메소드-생성)
  - [토큰을 생성하는 메소드 생성](#토큰을-생성하는-메소드-생성)
  - [Login Route 생성 후 반영하기](#login-route-생성-후-반영하기)

# Initial Setting
## package와 라이브러리 설치

```jsx
// package.json
npm init

// install Express
npm install express --save

// install Mongoose 
npm install mongoose --save
```

### package.json
```jsx
{
  "name": "react-template",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^6.0.12"
  }
}
```

## Mongo DB Atlas 클러스터 생성 후 Connect URI 발급
[MongDB Atlas](http://www.mongodb.com/)

## express와 mongoDB 연결

```jsx
/* server.js */
const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongoDB URL')
	.then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, () => console.log(`Express app listening on port ${port}!`));
```

## Initial Project Structure

```bash
├── node_modules
│   ├── ...
│   └── 
├── package-lock.json
├── package.json
└── server.js
```

# MongoDB Model과 Schema

1. Models 폴더 생성 
    
    > Model은 스키마를 감싸주는 역할
2. 생성한 Models 폴더 내에 ```Users.js``` 파일 생성
2. User Schema 
:  mongoose 를 사용하여 User 스키마 생성

```jsx
/* User.js */
const mongoose = require('mongoose');

// create Schema
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

const User = mongoose.model('User', userSchema);
module.exports = { User };
```

# Client와 Server 통신
클라이언트와 서버 통신을 위한 세팅이 필요하다.
## body-parser 설치 및 불러오기
클라이언트와 서버 사이에서 데이터 전송을 담당하는 마둘웨어
### Install
```
npm install body-parser --save
```

### Usage
```js
/* server.js */
const bodyParser = require('body-parser');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());
```
## Postman 설치
만들어진 클라이언트가 없어 데이터를 클라이언트에 전송할 수 없어 클라이언트를 대체하기 위해 postman 사용

[Download Postman](https://www.postman.com/downloads/)


# Register Route 생성
회원가입을 위한 register 라우트 생성하기

## User Model 불러오기
생성했던 User Model을 불러옴
```js
/* server.js */
const { User } = require('./models/Users'); 
```

## Register Route 작성    
- ```/register``` 경로로 post 요청    
- mongoDB 의 메소드 ```save``` 를 사용해 User Model 에 데이터 저장
```js
/* server.js */
app.post('/register', (req, res) => {
  const user = new User(req.body); // user instance
  user.save((err, userInfo) => {  // mongoDB method; save into User Model 
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success: true
    })
  });
});
```

## Postman 으로 기능 확인
1. http://localhost:5000/register 경로(설정한 경로)로 **Post** 요청
2. **Body - raw - json** 설정
3. 회원가입 정보 작성 후 **Send**
    ```json
    {
      "name": "test",
      "email": "test@gmail.com",
      "password": "test"
    }
    ```
4. 이와 같이 출력되면 성공적으로 Register Route 생성 완료
    ```json
    {
      "success": true
    }
    ```

# Nodemon
> Nodemon 이란 소스가 변경되면 자동으로 서버를 재시작 해주는 툴
## Install Nodemon
```bash
npm install nodemon --save-dev
```
여기서 `-dev`(development mode)는 local에서 작업할 때만 사용하겠다는 의미    

## Usage Nodemon
`package.json`파일에서 script를 추가해 Nodemon으로 서버를 시작
```json
"script": {
  "start": "node server.js",
  "backend": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```
이제 `npm run backend` 명령어로 서버를 켜고 변경사항이 있을 때마다 자동적으로 서버에 반영해줄 것이다.

# 비밀 설정 정보 관리 env
민감한 정보임과 동시에 보안이 이루어져야 하는 정보들을 암호화하기 위한 환경변수 env 사용

개발을 할 때 두가지 환경이 있다.
- Development 환경 (Local)
- Production 환경 (Deploy 배포 후)    

**Development** 환경에서는 로컬 js 파일 내에서 정보를 가져오도록하고,
**Production** 환경에서는 Heroku 에서 정보를 가져오도록 함


1. 최상위 폴더에 **config** 폴더 생성
2. **config** 폴더 내 `dev.js` / `prod.js` / `key.js` 생성

## 환경에 따른 정보 전달
### Development 환경
```js
// dev.js
module.exports = {
  mongoURI: 'mongoURI'
}
```
### Production 환경
```js
// prod.js
module.exports = {
  mongoURI: process.env.MONGO_URI // heroku
}
```
### Dev, Prod 환경 구분하여 정보 읽기

Development 환경일 때 `dev.js` 에서, Production 환경일 때 `prod.js` 에서 정보를 가져옴
```js
// key.js
if(process.env.NODE_ENV === 'prov') { 
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
```
## gitignore 오픈소스 업로드 방지
**.gitignore** 에 민감한 정보가 들어있는 `dev.js` 추가
```
dev.js
```

# Bcrypt로 비밀번호 암호화
약한 보안성을 Bcrypt를 통해 관리자도 비밀번호를 알 수 없도록 암호화하는 과정    

## Bcrypt 설치와 사용
### Install
```
npm install bcrypt --save
```
### Usage
Bcrypt 문서 참고하기 [Bcrypt 문서 바로가기](https://www.npmjs.com/package/bcrypt)
```js
const bcrypt = require('bcrypt');
const saltRounds = 10; // 10자리의 암호화 바말번호

bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    // Store hash in your password DB.
  });
});
```

## 비밀번호 암호화하기
암호화 과정에서 유저 정보들을 DB에 저장히기 전이 비밀번호를 암호화할 타이밍인데,
Register 라우트를 생성할 때 작성한 이 코드에서 `user.save()`하기 전이 바로 그 타이밍이다.
```js
/* models/User.js */
app.post('/register', (req, res) => {
  const user = new User(req.body); // user instance // user = collection 명
  user.save((err, userInfo) => {  // mongoDB method; save into User Model 
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success: true
    })
  });
});
```
그렇다면 어디에서 작업을 해줄 것인가? User 스키마를 생성했던 **models/User.js** 에서 mongoose 의 미들웨어 기능인 `pre()`를 사용하여 `save` 전에 처리할 코드를 작성한다, `save` 외에 `init`, `validate`, `remove` 메소드가 있다.

```js
/* models/User.js */
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  ...
});

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
  } else {
    next();
  }
});

...
```

# 로그인 기능 구현하기
## 로그인 기능 구현 순서
1. 요청된 이메일이 DB에 있는지 찾는다.
2. 요청된 이메일이 있다면 비밀번호와 일치하는가
3. 비밀번호까지 일치하다면 토큰 생성

## 암호 비교 메소드 생성
원하는 메소드 명으로 생성해도 무관하다. 이 예제에서는 `comparePassword`으로 설정했다.
```js
/* methode/User.js */
userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
      // 비밀번호까지 일치하다면 토큰 생성
  })
}
```

## 토큰을 생성하는 메소드 생성
원하는 메소드 명으로 생성해도 무관하다. 이 예제에서는 `generateToken`으로 설정했다.
메소드를 생성하기전에 두가지 라이브러리 설치가 필요하다
1. jsonwebtoken
2. cookie-parser
### jsonwebtoken 라이브러리 설치
Token 생성을 위한 라이브러리 다운로드
```
npm install jsonwebtoken --save
```
#### Usage
[문서 바로가기](https://www.npmjs.com/package/jsonwebtoken)
```js
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
```
### 

### Cookie Parser 라이브러리 설치
토큰을 쿠키에 저장하기 위한 라이브러리 다운로드
```
npm install cookie-parser --save
```
#### Usage
```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

### Token 생성 메소드 생성
```js
const jwt = require('jsonwebtoken');

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
```
## Login Route 생성 후 반영하기
1. 요청된 이메일이 DB에 있는지 찾는다.
2. 요청된 이메일이 있다면 비밀번호와 일치하는가
3. 비밀번호까지 일치하다면 토큰 생성
```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.post('/login', (req, res) => {
  // 1. 요청된 이메일을 DB에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json ({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.'
      })
    }
    // 2. 요청된 이메일이 있다면 비밀번호가 일치하는가
    user.comparePassword(req.body.password, (err, isMatch) => { 
      // 비밀번호까지 일치하다면 토큰 생성
      user.generateToken((err, user) => { // user에는 받아온 토큰이 들어있음
        if(err) return res.status(400).send(err);
        // 3. token을 저장한다. 어디에? 쿠키, 로컬스토리지 
        res.cookie('x_auth', user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
      });
    }) 
  })
})
```