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
    </head>
    <style>
     /*  Basic resets for modern browsers */
     * {
       margin:0; padding:0; font-family: 'poppins', 'sans-serif';
     }
     html { box-sizing: border-box; }
     *, *:before, *:after { box-sizing: inherit; }
     /*  Basic resets for modern browsers */
    </style>
    <body>
      <div id='container'>${ReactDOMServer.renderToString(createElement(Application, null))}</div>
    <script src='bundle.js'></script>
    </body>
  </html>
`;
let week = [
  {day:'Monday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
  {day:'Tuesday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
  {day:'Wednesday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
  {day:'Thursday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
  {day:'Friday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
  {day:'Saturday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
  {day:'Sunday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
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
