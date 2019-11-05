const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const settings = require('../cfg');

const connection = mysql.createConnection(settings.mysql);
connection.connect();

//console.log(settings.mysql)

const tmpJson = require('../tmpJson');

router.get('/month/:year/:month', (req, res) => {
  connection.query(`SELECT MONTH(date) AS month, DAY(date) AS day, type, line, brigade, shift, place, start_time, end_time FROM schedule WHERE user_id = 1 AND MONTH(date) = ${req.params.month}`, (errors, results, fields) => {
    console.log(results);
    res.json(results)
  });
  //res.json(tmpJson)
});

module.exports = router;