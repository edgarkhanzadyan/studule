// import React, { Component } from 'react';
// import { render } from 'react-dom';
const React = require('react');
const render = require('react-dom').render;
const Application = require('./lib/schedule');

render(<Application/>,
       document.getElementById('container'));
