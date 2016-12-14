const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Application = require('./lib/schedule');
const { createElement } = React;
const body_parser = require('body-parser');
const json_parser = body_parser.json();
const form_parser = body_parser.urlencoded({extended: true});
const express = require('express');
const port = 8080;
const app = express();
const site = `
<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
     <link rel="icon" type="png" href="./studule.png">
      <title>
        Studule
      </title>
      <link rel="stylesheet" type="text/css" href="./styles.css"/>
    </head>
    <body>
    <h1 class="linear-wipe">Studule</h1>
      <div id='container'>${ReactDOMServer.renderToString(createElement(Application, null))}</div>
        <script src='bundle.js'></script>
    </body>
  </html>
`;
let week = [
  {day:'Monday',schedule: Array(48).fill('')},
  {day:'Tuesday',schedule:Array(48).fill('')},
  {day:'Wednesday',schedule: Array(48).fill('')},
  {day:'Thursday',schedule: Array(48).fill('')},
  {day:'Friday',schedule: Array(48).fill('')},
  {day:'Saturday',schedule:Array(48).fill('')},
  {day:'Sunday',schedule:Array(48).fill('')},
];
let homework = [];
app.use(express.static('public'));;

app.get('/', (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(site);
});
app.get('/new_schedule', (req, res) => {
  res.setHeader('content-type', 'text/html');
  const sendMe = JSON.stringify({
    payload: week,
    homew: homework,
  });
  res.end(sendMe);
});
app.post('/new_data', json_parser, form_parser, (req, res) => {
  week = req.body.array;
  homework = req.body.homework;
  res.end();
});
app.listen(port, () => console.log(`server starting on ${port}`));
