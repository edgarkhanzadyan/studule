const React = require('react');
const { Component } = React;
const style = require('./style');
class Schedule extends Component {
  render() {
    const renderStyle = {
      flexColumn: {
        display: 'flex',
        flexDirection: 'column',
      },
      flexRow: {
        display: 'flex',
      },
    };
    return(
      <div style={renderStyle.flexColumn}>
        <header style={style.header}>
          <div style={style.logo}>
            Studule
          </div>
        </header>
        <div style={style.scheduleAdd}>
          <div style={style.inputs}>
            <input style={style.classInput} />
            <input style={style.whenClassInput} />
            <input style={style.homeworkInput} />
          </div>
            <button style={style.buttonDate}></button>
        </div>
        <div style={style.mainSchedule}>
          <div style={style.timeSchedule}>

          </div>
          <div style={style.homeworkTab}>

          </div>
        </div>
      </div>
    );
  };
}
module.exports = Schedule;
