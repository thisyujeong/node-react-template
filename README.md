# node-react-template
노드 + 리액트 템플릿입니다.

# Index
- [Initial Setting](#1.-initial-setting)
  - [package, 라이브러리 설치](#1-1.-package,-라이브러리-설치)
  - [Mongo DB Atlas 클러스터 생성 후 Connect URL 발급](#1-2.-mongo-db-atlas-클러스터-생성-후-cnnect-url-발급)
  - [express / mongoDB 연결](#1-3.-express-/-mongodb-연결)
  - [Initial Project Structure](#1-4.-initial-project-structure)
- [MongoDB Model & Schema](#2.-mongoDB-model-&-schema)
- [Client & Server 통신](#3.-client-&-server-통신)    
  - [body-parser 설치 및 불러오기](#3-1.-body-parser-설치-및-불러오기)    
  - [Postman 설치](#3-2.-postman-설치)
- [Register Route 생성](#4.-register-route-생성)    
  - [User Model 불러오기](#4-1.-user-model-불러오기)    
  - [Register Route 작성](#4-2.-register-route-작성)    
  - [Postman 으로 기능 확인](#4-3.-postman-으로-기능-확인)    


# 1. Initial Setting
## 1-1. package, 라이브러리 설치

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

## 1-2. Mongo DB Atlas 클러스터 생성 후 Connect URL 발급
[MongDB Atlas](http://www.mongodb.com/)

## 1-3. express / mongoDB 연결

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

## 1-4. Initial Project Structure

```bash
├── node_modules
│   ├── ...
│   └── 
├── package-lock.json
├── package.json
└── server.js
```

# 2. MongoDB Model & Schema

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

# 3. Client & Server 통신
클라이언트와 서버 통신을 위한 세팅이 필요하다.
## 3-1. body-parser 설치 및 불러오기
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
## 3-2. Postman 설치
만들어진 클라이언트가 없어 데이터를 클라이언트에 전송할 수 없어 클라이언트를 대체하기 위해 postman 사용

[Download Postman](https://www.postman.com/downloads/)


# 4. Register Route 생성
회원가입을 위한 register 라우트 생성하기

## 4-1. **User Model** 불러오기
생성했던 User Model을 불러옴
```js
/* server.js */
const { User } = require('./models/Users'); 
```

## 4-2. Register Route 작성    
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

## 4-3. Postman 으로 기능 확인
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