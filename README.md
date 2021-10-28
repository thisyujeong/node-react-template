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
// package.json
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
**dev.js**
```js
module.exports = {
  mongoURI: 'mongoURI'
}
```
### Production 환경
**prod.js**
```js
module.exports = {
  mongoURI: process.env.MONGO_URI // heroku
}
```
### Dev, Prod 환경 구분하여 정보 읽기
**key.js**    
Development 환경일 때 `dev.js` 에서, Production 환경일 때 `prod.js` 에서 정보를 가져옴
```js
if(process.env.NODE_ENV === 'prov') { 
  module.exports = require('./prod');

} else {
  module.exports = require('./dev');
}
```
## gitignore 
**.gitignore** 에 민감한 정보가 들어있는 `dev.js` 추가
```
dev.js
```
