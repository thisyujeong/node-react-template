# node-react-template
노드 + 리액트 템플릿입니다. ([참고](https://www.youtube.com/playlist?list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T))


- 계정 생성 기능
- 로그인 기능
- 로그아웃 기능
- 사용자 인증 기능


### Tech
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"/> <img src="https://img.shields.io/badge/Node.JS-339933?style=for-the-badge&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/AntDesign-0170FE?style=for-the-badge&logo=AntDesign&logoColor=white"/>


### UI 
Antd 시스템 프레임워크 사용

<img width="100%" alt="Screen Shot 2021-11-07 at 8 49 53 PM" src="https://user-images.githubusercontent.com/85509993/140643681-45fbbd3c-6eff-4872-b350-a108d455b3cf.png">
<img width="100%" alt="Screen Shot 2021-11-07 at 8 50 02 PM" src="https://user-images.githubusercontent.com/85509993/140643685-f3cd1910-526d-4d78-b722-bce5e7d3c21e.png">

# Index
### Server
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
- [Auth 기능 구현하기](#auth-기능-구현하기)
  - [미들웨어 생성하기](#미들웨어-생성하기)
  - [미들웨어 적용 및 Auth 기능 구현](#미들웨어-적용-및-auth-기능-구현)
- [Logout 기능 구현하기](#logout-기능-구현하기)

### Client
- [Client와 Server 분리](#client와-server-분리)
  - [폴더 분리 후 프로젝트 구조](#폴더-분리-후-프로젝트-구조)
- [CRA 리액트 시작하기](#cra-리액트-시작하기)
  - [Client 프로젝트 구조 세팅](#client-프로젝트-구조-세팅)
- [React Router Dom](#react-router-dom)
  - [리액트 라우터 사용](#리액트-라우터-사용)
- [CORS 이슈 프록시로 해결](#cors-이슈-프록시로-해결)
- [Front와 Back 서버 한 번에 켜기](#front와-back-서버-한-번에-켜기)
  - [concurrently 라이브러리](#concurrently-라이브러리)
- [Antd CSS Framwork](#antd-css-framwork)
- [Setting Up Redux](#setting-up-redux)
  - [Redux 기본 구조 만들기](#redux-기본-구조-만들기)

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
- ```api/users/register``` 경로로 post 요청    
- mongoDB 의 메소드 ```save``` 를 사용해 User Model 에 데이터 저장
```js
/* server.js */
app.post('api/users/register', (req, res) => {
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
1. http://localhost:5000/api/users/register 경로(설정한 경로)로 **Post** 요청
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
app.post('api/users/register', (req, res) => {
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
/* models/User.js */
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
/* models/User.js */
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
/* server.js */
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.post('/api/users/login', (req, res) => {
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

# Auth 기능 구현하기
#### Why & What?
1. 페이지 이동 때마다 로그인되었는지 안되어있는지, 관리자 유저인지 등을 체크
2. 글을 쓸 때나 지울 때 등 권한이 있는지 체크


## 미들웨어 생성하기
최상위 루트에 `middleware` 디렉토리를 생성 후 `auth.js` 파일 생성
```js
/* middleware/auth.js */
let auth = (req, res, next) => {
  // 인증 처리를 하는 곳
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  // 토큰 복호화 후 유저 찾기
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  })
} 

module.exports = { auth };
```
### 토큰 복호화 후 유저를 찾는 statics 생성
토큰 복호화 후 유저를 찾는 UserSchema의 `findByToken` 메소드 생성

#### **methods**와 **statics**의 차이점
`methods`는 이 method를 호출한 객체가 method 내에서의 this가 되고,    
`statics`는 이 static를 호출한 객체에 상관없이 this가 모델 자체가 된다.
```js
/* models/user.js */
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
```

## 미들웨어 적용 및 Auth 기능 구현
get / post 요청 시 두번째 파라미터로 미들웨어를 직접 생성해 전달할 수 있어 콜백함수가 실행되기 전에 미들웨어가 실행된다. 미들웨어가 콜백함수까지 통과해 왔다는 것은 Authentication이 True 라는 의미이다.
```js
/* server.js */
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
```

# Logout 기능 구현하기
로그아웃 기능 구현은 생각보다 간단하다.

> 1. 로그아웃 Route 생성
> 2. 로그아웃 하려는 유저를 DB에서 찾는다.
> 3. 해당 유저의 토큰을 제거한다.

Mongoose 의 `findOneUpdate` 를 사용해 DB의 토큰을 제거한다.

```js
/* server.js */
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" },
    (err, user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    }
  )
});
``` 

# Client와 Server 분리
1. 최상위 폴더에 Client와 Server 디렉토리 생성
2. `/server.js` 파일과 `config` / `middleware` / `models` 폴더를 Server 폴더에 옮긴다.    
    **주의: `import`와 같은 파일 경로도 함께 바꿔야함.**
3. Client 폴더로 들어가 CRA 라액트 시작하기

### 폴더 분리 후 프로젝트 구조
```bash
├── node_modules
├── client
├── server
│   ├── config
│   │   ├── dev.js
│   │   ├── key.js
│   │   └── prod.js
│   │
│   ├── middleware
│   └── models
│       └── Users.js
├── .gitignore
├── package-lock.json
└── package.json
```


# CRA 리액트 시작하기
> Create-React-App
### install
```
npx create-react-app .
npm init react-app .
yarn create react-app .
```

# Client 프로젝트 구조 세팅
프로젝트에 필요한 구조를 사전에 세팅. `actions`, `reducers`, `components`, `hoc`, `utils`, `config.js` 등의 폴더 / 파일을 생성한다. 프로젝트 상세 구조는 이와 같다.

기본 구조에서 추가된 폴더 / 파일은 `*` 로 표시
```bash
├── client
│   ├── public
│   └── src
│       ├── _actions *
│       ├── _reducers *
│       ├── components *
│       │   └── views  
│       │       ├── Footer 
│       │       │   └── Footer.js
│       │       ├── LandingPage
│       │       │   └── LandingPage.js
│       │       ├── LoginPage 
│       │       │   └── LoginPage.js
│       │       ├── NavBar
│       │       │   └── NavBar.js
│       │       └── RegisterPage
│       │           └── RegisterPage.js
│       ├── hoc *
│       ├── utils *
│       ├── App.css
│       ├── App.js
│       ├── config.js *
│       ├── index.js
│       ├── reportWebVitals.js
│       ├── setupTests.js
│       ├── .gitignore
│       ├── package.json
│       ├── README.md
│       └── yarn.lock
└── server
    └── ...
```

# React Router Dom
[문서 바로가기](https://reactrouter.com/web/example/basic)

### install
```
npm install react-router-dom --save
yarn install react-router-dom --save
```
npm으로 설치했더니 패키지, 라이브러리 등의 버전에 의해 취약점 경고가 발생해 npm 이 아닌 yarn으로 설치하니 경고 없이 설치되었다.

### 리액트 라우터 사용
```js
/* clinet/src/App.js */
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/register" component={RegisterPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```

# CORS 이슈 프록시로 해결
Server 의 포트는 5000, Client 의 포트는 3000으로 서로 다른 포트로 설정되어있다. 이처럼 두 개의 다른 포트를 가지고 있는 서버는 아무 설정 없이 Request를 보낼 수 없다. CORS 정책에 의해 보안상의 이유로 요청을 차단하는 이슈이다. 이를 해결할 수 있는 방법 중 하나인 프록시를 사용했다.

## http-proxy-middleware
[문서 바로가기 CRA - Proxying in Development](https://create-react-app.dev/docs/proxying-api-requests-in-development)
#### install
```
npm install http-proxy-middleware --save
yarn add http-proxy-middleware --save
```

1. `src/setupProxy.js`해당 경로에 파일 추가
2. `target` 을 server 포트로 설정
    ```js
    /* client/src/setupProxy.js */    
    const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function(app) {
      app.use(
        '/api',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      );
    };
    ```
3. `npm run start`로 실행 가능

# Front와 Back 서버 한 번에 켜기
### concurrently 라이브러리
>  Server와 Client의 서버를 한번에 켤 수 있는 라이브러리

#### install 
```
npm install concurrently --save
yarn add concurrently --save
```

#### package.json 에서 스크립트 설정하기
`dev`항목을 추가헤 concurrently 라이브러리의 문법에 따라 명령어 앞에 `concurrently` 를 명시해주고, `\" \"` 안에 차례로 명령어 작성
```json
"scripts": {
  "start": "node server.js",
  "backend": "nodemon ./server/server.js",
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "concurrently \"npm run backend\" \"npm run start --prefix client\""
},
```
root 경로의 명령어를 실행하는 것이 아닌 서브 폴더의 명령어를 실행하고 싶다면 명령어 --prefix 폴더명 을 입력. 위 예시 코드와 같이 작성했다면 `npm run dev` 명령어로 실행시켜 server와 client 가 동시에 실행된 것을 확인 가능.

# Antd CSS Framwork
Ant Design 프래임워크 사용 [문서 바로가기](https://ant.design/)
#### install 
```
npm install antd
yarn add antd
```
#### Usage
```js
/* client/src/index.js */
import "antd/dist/antd.css";
```

# Setting Up Redux
### 다운 받아야 할 Dependency
1. redux
2. react-redux
3. redux-promise
4. redux-thunk

`redux-promise` 와 `redux-thunk`는 리덕스의 미들웨어

`redux-thunk` 는 function이 dispatch한테 어떻게 접근했는지를 알려주는 역할.
`redux-promise`는 dispatch 가 promise를 받았을 때 어떻게 대처해야하는지를 알려주는 역할.

#### install 
```
npm install react react-redux redux-promise redux-thunk --save
yarn add react react-redux redux-promise redux-thunk --save
```
 
## Redux 기본 구조 만들기 
### Store 생성 및 적용
```js
/* client/src/index.js */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

// 스토어를 Redux 미들웨어인 `redux-thunk`와 `redux-promise`를 함께 사용하기 위해 이와 같이 생성
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
```
### Redux DevTools 사용
[Chrome - Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ko) | [Git 문서](https://github.com/zalmoxisus/redux-devtools-extension)    

Provider 의 store로 `Reducer`와 함께 Redux DevTools를 연결
```js
/* client/src/index.js */
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### Reducers
각 기능에 따른 리듀서 생성 후 combineReducers 를 이용해 하나의 rootRecuder로 합쳐주는 작업 진행
```js
/* client/src/_reducers/index.js */
import { combineReducers } from 'redux';
import  user from './user_recuder';

const rootReducer = combineReducers({
  user,
  ...
})

export default rootReducer;
```