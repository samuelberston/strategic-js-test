const express = require('express');
// const path = require('path');
const router = require('./router');

const app = express();

const port = 3000;

// app.use(express.json());

// app.use(express.static(path.join(__dirname, '../public')));

app.use('/', router);

app.listen(port, () => console.log(`App listening at port ${port}`));
