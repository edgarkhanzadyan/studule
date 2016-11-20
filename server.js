const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Application = require('./lib/schedule');
const port = 4000;
const { createElement } = React;
const body_parser = require('body-parser');
const json_parser = body_parser.json();
const form_parser = body_parser.urlencoded({extended: true});
const express = require('express');
const app = express();
const site = `
<!doctype html>
  <html>
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
  {day:'Monday',schedule: [{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''}]},
  {day:'Tuesday',schedule: [{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''}]},
  {day:'Wednesday',schedule: [{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''}]},
  {day:'Thursday',schedule: [{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''}]},
  {day:'Friday',schedule: [{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''}]},
  {day:'Saturday',schedule: [{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''}]},
  {day:'Sunday',schedule: [{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''},{event:''}]}
];
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(site);
});
app.get('/new_schedule', (req, res) => {
  res.setHeader('content-type', 'text/html');
  const sendMe = JSON.stringify({
    payload: week,
  });
  res.end(sendMe);
});
app.post('/new_data', json_parser, form_parser, (req, res) => {
  week[req.body.day].schedule[req.body.time].event = req.body.classo;
  res.end();
});
app.listen(port, () => console.log('started %d', port));
