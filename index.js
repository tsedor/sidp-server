const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get('/schedule', (req, res) => {
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

app.listen(3050);