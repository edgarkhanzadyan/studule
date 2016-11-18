const React = require('react');
const { Component } = React;
const style = require('./style');
class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      week: [{ day: 'Monday', schedule: [] }, { day: 'Tuesday', schedule: [] }, { day: 'Wednesday', schedule: [] }, { day: 'Thursday', schedule: [] }, { day: 'Friday', schedule: [] }, { day: 'Saturday', schedule: [] }, { day: 'Sunday', schedule: [] }],
      bufClass: '',
      bufTime: '',
      bufHomework: '',
      bufDay: ''
    };
    for (let i = 0; i < 7; ++i) {
      for (let j = 0; j < 24; ++j) {
        this.state.week[i].schedule[j] = {
          event: '1'
        };
      }
    }
    this.onDayChange = this.onDayChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onClassChange = this.onClassChange.bind(this);
    this.onHomeworkChange = this.onHomeworkChange.bind(this);
    this.clickHandlerPushEvent = this.clickHandlerPushEvent.bind(this);
  }
  sendData(data) {}
  clickHandlerPushEvent(e) {
    if ((e.button === 0 || e.key === 'Enter') && this.state.bufClass.trim() !== '' && this.state.bufTime.trim() !== '') {
      const buffer = JSON.stringify({
        classo: bufClass,
        time: bufTime,
        homework: bufHomework
      });
      this.sendData(buffer);
      this.setState({ bufClass: '', bufTime: '', bufHomework: '' });
    }
  }
  onDayChange(e) {
    const day = e.currentTarget.value;
    this.setState({ bufDay: day });
  }
  onClassChange(e) {
    const classs = e.currentTarget.value;
    this.setState({ bufClass: classs });
  }
  onTimeChange(e) {
    const time = e.currentTarget.value;
    this.setState({ bufTime: time });
  }
  onHomeworkChange(e) {
    const homework = e.currentTarget.value;
    this.setState({ bufHomework: homework });
  }
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
    const makeHours = this.state.week[0].schedule.map((hour, i) => {
      if (i < 10) {
        return React.createElement(
          'li',
          { key: i, style: style.eventul },
          '0',
          i,
          ':00'
        );
      } else if (i >= 10) {
        return React.createElement(
          'li',
          { key: i, style: style.eventul },
          i,
          ':00'
        );
      }
    });
    const makeDays = this.state.week.map((day, idx) => {
      const makeEvents = this.state.week[idx].schedule.map((ev, i) => {
        return React.createElement(
          'li',
          { key: i, style: style.eventul },
          ev.event
        );
      });
      return React.createElement(
        'div',
        { style: style.eventBox },
        React.createElement(
          'ul',
          null,
          React.createElement(
            'li',
            { style: style.eventul },
            day.day
          ),
          makeEvents
        )
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
          React.createElement('input', { style: style.classInput, placeholder: 'name of the class*', onChange: this.onClassChange }),
          React.createElement('input', { style: style.whenClassInput, placeholder: 'time of that class*', onChange: this.onTimeChange }),
          React.createElement('input', { style: style.whenClassInput, placeholder: 'day of that class*', onChange: this.onDayChange }),
          React.createElement('input', { style: style.homeworkInput, placeholder: 'homework for it', onChange: this.onHomeworkChange })
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
          { style: style.mainSchedule },
          React.createElement(
            'div',
            { style: style.timeSchedule },
            React.createElement(
              'div',
              { style: renderStyle.flexRow },
              React.createElement(
                'div',
                { style: style.eventBox },
                React.createElement(
                  'ul',
                  null,
                  makeHours
                )
              ),
              makeDays
            )
          ),
          React.createElement('div', { style: style.homeworkTab })
        )
      )
    );
  }
}
module.exports = Schedule;
