const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/data', (req, res) => {
  axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
    .then((data) => res.send(data.data))
    .catch((err) => console.error(err));
});

module.exports = router;
