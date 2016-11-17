const React = require('react');
const { Component } = React;
const style = require('./style');
class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      week: [{ day: 'Monday', schedule: [{ id: 0, event: 'Freshman' }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }] }, { day: 'Tuesday', schedule: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }] }, { day: 'Wendnsday', schedule: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }] }, { day: 'Thursday', schedule: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4, event: 'hey' }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }] }, { day: 'Friday', schedule: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }] }, { day: 'Saturday', schedule: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }] }, { day: 'Sunday', schedule: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }] }],
      bool: [false, false, false, true, false, false, false]
    };
  }
  clickHandler(e) {}
  render() {
    const renderStyle = {
      flexColumn: {
        display: 'flex',
        flexDirection: 'column'
      },
      flexRow: {
        display: 'flex'
      }
    };
    const makeDays = this.state.week.map((day, idx) => {
      if (this.state.bool[idx]) {
        const makeHours = this.state.week[idx].schedule.map((hour, i) => {
          if (i < 10) {
            return React.createElement(
              'li',
              { key: i },
              '0',
              hour.id,
              ':00 ',
              hour.event
            );
          } else if (i >= 10) {
            return React.createElement(
              'li',
              { key: i },
              hour.id,
              ':00'
            );
          }
        });
        return React.createElement(
          'ul',
          null,
          makeHours
        );
      }
    });
    const makeDaysButtons = this.state.week.map((day, idx) => {
      return React.createElement(
        'button',
        { key: idx },
        day.day
      );
    });
    return React.createElement(
      'div',
      { style: renderStyle.flexColumn },
      React.createElement(
        'header',
        { style: style.header },
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
          React.createElement('input', { style: style.classInput, placeholder: 'name of the class' }),
          React.createElement('input', { style: style.whenClassInput, placeholder: 'when is that class' }),
          React.createElement('input', { style: style.homeworkInput, placeholder: 'homework for it' })
        ),
        React.createElement(
          'button',
          { style: style.buttonDate },
          'put new date!'
        )
      ),
      React.createElement(
        'div',
        { style: style.flexColumn },
        React.createElement(
          'div',
          { style: style.daysContainer },
          makeDaysButtons
        ),
        React.createElement(
          'div',
          { style: style.mainSchedule },
          React.createElement(
            'div',
            { style: style.timeSchedule },
            makeDays
          ),
          React.createElement('div', { style: style.homeworkTab })
        )
      )
    );
  }
}
module.exports = Schedule;
