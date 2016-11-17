const express = require('express');
const app = express();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Application = require('./lib/schedule');
const port = 4000;
const expressWs = require('express-ws')(app);
const { createElement } = React;

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
const schedule = {
  {day:'Monday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
  {day:'Tuesday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
  {day:'Wendnsday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
  {day:'Thursday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
  {day:'Friday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
  {day:'Saturday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
  {day:'Sunday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]}],
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(site);
});
app.get('/new_schedule', (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(main_schedule);
})
app.ws('/', (ws, req) => {
  ws.on('message', (msg) => {
    const reply = JSON.parse(msg);

    switch (reply.cmd) {
      case 'new_data':
        
    }
  });
  console.log('socket', req.testing);
});
app.listen(port, () => console.log('started %d', port));
