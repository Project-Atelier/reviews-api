const express = require('express');
const seq = require('../db/db.js');
const Review = require('../db/Models/Review.js');
const Characteristic = require('../db/Models/Characteristic.js');
const Reviews_Photo = require('../db/Models/Reviews_Photo.js');
const Characteristic_Review = require('../db/Models/Characteristic_Review.js');
const app = express();
const port = 3000;



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

