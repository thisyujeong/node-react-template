const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thisyujeong:dldbwjd12@boiler-plate.pv0or.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello world!'));
app.listen(port, () => console.log(`Express app listening on port ${port}!`));

