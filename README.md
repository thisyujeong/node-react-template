# node-react-template
## Initial Setting

# 목차
1. [Initial Setting](#1.-Initial-Setting)    
  1-1. [package, 라이브러리 설치](#1-1.-package,-라이브러리-설치)    
  1-2. [Mongo DB Atlas 클러스터 생성 후 Connect URL 발급](#1-2.-Mongo-DB-Atlas-클러스터-생성-후-Connect-URL-발급)    
  1-3. [express / mongoDB 연결](#1-3.-express-/-mongoDB-연결)  
  1-4. [Initial Project Structure](#1-4.-Initial-Project-Structure)   
2. [MongoDB Model & Schema](#2.-MongoDB-Model-&-Schema)

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
// server.js
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
    > 
2. User Schema 
:  mongoose 를 사용하여 User 스키마 생성

```jsx
const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);
module.exports = { User };
```