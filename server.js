const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require('./models/Users');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongoDB URL')
  .then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello world!'));

app.post('/register', (req, res) => {
  const user = new User(req.body); // user instance
  user.save((err, userInfo) => {  // mongoDB method; save into User Model 
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success: true
    })
  });
});

app.listen(port, () => console.log(`Express app listening on port ${port}!`));

