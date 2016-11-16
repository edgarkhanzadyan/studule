const express = require('express');
const app = express();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Application = require('./lib/schedule');
const port = 4000;

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

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(site);
});
app.get('/new_schedule', (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(main_schedule);
})

app.listen(port, () => console.log('started %d', port));
