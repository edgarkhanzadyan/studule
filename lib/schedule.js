const React = require('react');
const { Component } = React;
const style = require('./style');
class Schedule extends Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'header',
        null,
        React.createElement(
          'div',
          { style: style.logo },
          'Studule'
        )
      ),
      React.createElement(
        'div',
        { style: style.scheduleAdd },
        React.createElement(
          'div',
          { style: style.inputs },
          React.createElement('input', { style: style.classInput }),
          React.createElement('input', { style: style.whenClassInput }),
          React.createElement('input', { style: style.homeworkInput })
        ),
        React.createElement('button', { style: style.buttonDate })
      ),
      React.createElement(
        'div',
        { style: style.mainSchedule },
        React.createElement('div', { style: style.timeSchedule }),
        React.createElement('div', { style: style.homeworkTab })
      )
    );
  }
}
module.exports = Schedule;
