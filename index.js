const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const scheduleRouter = require('./routes/schedule');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/schedule', scheduleRouter);

const secretPhrase = 'Konstantynopol';

app.post('/login', (req, res) => {
  if (req.body.username === 'admin' & req.body.password === 'abc') {
    const token = jwt.sign({ login: 'admin '}, secretPhrase, { expiresIn: "60m" });
    res.json({ login: 'ok', token });
  } else {
    console.log(req.body)
    res.send({ login: 'error' })
  }
});

app.get('/', (req, res) => {
  try {
    res.send(jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluICIsImlhdCI6MTU3MjE4NTkwMiwiZXhwIjoxNTcyMTg5NTAyfQ.G3+VUj7AO7KcxZhZnbrsRT357DF6FX9dxTj55M3n2HE", secretPhrase))
  } catch (e) {
    res.status(401).json({ error: e});
  }
})

app.get('/dashboard', (req, res) => {
  try {
    console.log(jwt.verify(req.query.token, secretPhrase))
    res.json([{
      date: "28-10-2019",
      line: "139-12B",
      startTime: "14:49",
      endTime: "20:37",
      startPlace: "Kombinat",
      endPlace: "PP"
    },{
      date: "29-10-2019",
      line: "221-01B",
      startTime: "13:20",
      endTime: "23:13",
      startPlace: "Mały Płaszów P+R",
      endPlace: "PP"
    },{
      date: "30-10-2019",
      line: "129-05B",
      startTime: "13:27",
      endTime: "20:20",
      startPlace: "Czyżyny Dworzec",
      endPlace: "PP"
    }])
  } catch(e) {
    res.status(401).json({ error: e.message });
  }
})

const generateDaysTable = ( year = new Date().getFullYear(), month = new Date().getMonth()+1 ) => {
  let calendar = [];
  const previousMonthLength = new Date(year, month-1, 0).getDate();
  const monthLength = new Date(year, month, 0).getDate();
  let dayOfWeek = new Date(`${year}-${month}-01`).getDay();
  dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
  let sunday = 0;
  for (let i = dayOfWeek; i > 1; i--) {
    sunday++;
    calendar.push({day: previousMonthLength - i + 2, current: false, sunday: sunday % 7 === 0 ? true : false})
  }
  for (let i = 1; i <= monthLength; i++) {
    sunday++;
    calendar.push({day: i, current: true, sunday: sunday % 7 === 0 ? true : false});
  }
  let x = 1;
  while (calendar.length % 7 !== 0) {
    sunday++;
    calendar.push({day: x++, current: false, sunday: sunday % 7 === 0 ? true : false})
  }
  return calendar
}/*
console.log(scheduleMonth)
app.get('/schedule/month', (req, res) => {
  res.json(scheduleMonth)
})*/

app.listen(3050);