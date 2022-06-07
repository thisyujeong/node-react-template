# node-react-template

노드 + 리액트 템플릿입니다. ([참고](https://www.youtube.com/playlist?list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T))

- 계정 생성 기능
- 로그인 기능
- 로그아웃 기능
- 사용자 인증 기능

### Get Started

##### 1. 라이브러리 설치

템플릿에 사용된 라이브러리를 설치합니다.  
**root 경로의 `package.json`에서 확인 가능**

```
yarn
```

##### 2. ./clent 경로에서 npm 설치

```
npm install
```

##### 3. npm run dev 실행시 dev 환경만 실행될 경우 (react-seript 에러)

```
yarn add react-script
```

##### 4. mongoDB 연결

`/server/config` 경로에 `dev.js` 파일 추가 후 mongoDB URI 연결.

```js
// Example
module.exports = {
  mongoURI:
    'mongodb+srv://<userID>:<password>@boiler-plate.pv0or.mongodb.net/<DatabaseName>?retryWrites=true&w=majority',
};
```

##### 5. 프로젝트 실행

```
npm run dev
```

### Tech

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"/> <img src="https://img.shields.io/badge/Node.JS-339933?style=for-the-badge&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/AntDesign-0170FE?style=for-the-badge&logo=AntDesign&logoColor=white"/>

### UI

Antd 시스템 프레임워크 사용

<img width="100%" alt="Screen Shot 2021-11-07 at 8 49 53 PM" src="https://user-images.githubusercontent.com/85509993/140643681-45fbbd3c-6eff-4872-b350-a108d455b3cf.png">
<img width="100%" alt="Screen Shot 2021-11-07 at 8 50 02 PM" src="https://user-images.githubusercontent.com/85509993/140643685-f3cd1910-526d-4d78-b722-bce5e7d3c21e.png">
