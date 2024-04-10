const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes')

const app = express();

app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true
  }));

app.use(express.json());

app.use(routes);

mongoose.connect('mongodb://localhost:27017/angular-project')
.then(() => console.log('DB connected...'))

app.listen(3000, () => {console.log(`Server is listening on port: 3000`)});