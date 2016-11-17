const React = require('react');
const { Component } = React;
const style = require('./style');
class Schedule extends Component {
  constructor(){
    super();
    this.state = {
    week: [
    {day:'Monday',schedule: [{id:0, event: 'Freshman'},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
    {day:'Tuesday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
    {day:'Wendnsday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
    {day:'Thursday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4, event: 'hey'},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
    {day:'Friday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
    {day:'Saturday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]},
    {day:'Sunday',schedule: [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:21},{id:22},{id:23}]}],
    bool: [false,false,false,true,false,false,false]
    };
  }
  clickHandler(e){

  }
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
    const makeDays = this.state.week.map((day, idx) => {
      if(this.state.bool[idx]){
        const makeHours = this.state.week[idx].schedule.map((hour,i) => {
          if(i < 10){
            return(
              <li key={i}>0{hour.id}:00 {hour.event}</li>
            );
          }else if(i >= 10){
            return(
              <li key={i}>{hour.id}:00</li>
            );
          }
        });
        return(
          <ul>
            {makeHours}
          </ul>
        );
      }
    });
    const makeDaysButtons = this.state.week.map((day, idx) => {
      return(
        <button key={idx}>{day.day}</button>
      );
    });
    return(
      <div style={renderStyle.flexColumn}>
        <header style={style.header}>
          <div style={style.logo}>
            Studule
          </div>
        </header>
        <div style={style.scheduleAdd}>
          <div style={style.inputs}>
            <input style={style.classInput} placeholder={'name of the class'} />
            <input style={style.whenClassInput} placeholder={'when is that class'} />
            <input style={style.homeworkInput} placeholder={'homework for it'} />
          </div>
            <button style={style.buttonDate}>put new date!</button>
        </div>
        <div style={style.flexColumn}>
          <div style={style.daysContainer}>
            {makeDaysButtons}
          </div>
          <div style={style.mainSchedule}>
            <div style={style.timeSchedule}>
              {makeDays}
            </div>
            <div style={style.homeworkTab}>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
module.exports = Schedule;
