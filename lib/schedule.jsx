const React = require('react');
const { Component } = React;
const style = require('./style');
class Schedule extends Component {
  constructor(){
    super();
    this.state = {
      week: [
      {day:'Monday',schedule: []},
      {day:'Tuesday',schedule: []},
      {day:'Wednesday',schedule: []},
      {day:'Thursday',schedule: []},
      {day:'Friday',schedule: []},
      {day:'Saturday',schedule: []},
      {day:'Sunday',schedule: []}
      ],
      bufClass: '',
      bufTime: '',
      bufHomework: '',
      bufDay: '',
    };
    for (let i = 0; i < 7; ++i) {
      for (let j = 0; j < 24; ++j) {
        this.state.week[i].schedule[j] = {
          event: ''
        };
      }
    }
    this.onDayChange = this.onDayChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onClassChange = this.onClassChange.bind(this);
    this.onHomeworkChange = this.onHomeworkChange.bind(this);
    this.clickHandlerPushEvent = this.clickHandlerPushEvent.bind(this);
  }
  async componentDidMount() {
    let request = 'http://localhost:4000/new_schedule';
    let schedule = await fetch(request);
    let all_schedule = await schedule.json();
    this.setState({week: all_schedule.payload});
  };

  clickHandlerPushEvent(e){
    if((e.button === 0 || e.key === 'Enter') && this.state.bufClass.trim() !== ''
    && this.state.bufTime.trim() !== '' && this.state.bufDay.trim() !== ''){
      let dayIndex = 0;
      for(let i = 0; i < 7; ++i){
        if(this.state.week[i].day === this.state.bufDay){
          dayIndex = i;
        }
      }
      const request_options = {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body:JSON.stringify({
          classo : this.state.bufClass,
          time : this.state.bufTime,
          homework : this.state.bufHomework,
          day : dayIndex,
        }),
      };
      fetch('/new_data', request_options);
      const newArr = this.state.week;
      newArr[dayIndex].schedule[this.state.bufTime].event = this.state.bufClass;
      this.setState({ week: newArr, bufClass: '', bufTime: '', bufHomework: '', bufDay: ''});
    }
  }
  onDayChange(e){
    const day = e.currentTarget.value;
    this.setState({ bufDay: day});
  }
  onClassChange(e){
    const classs = e.currentTarget.value;
    this.setState({ bufClass: classs });
  }
  onTimeChange(e){
    const time = e.currentTarget.value;
    this.setState({ bufTime: time });
  }
  onHomeworkChange(e){
    const homework = e.currentTarget.value;
    this.setState({ bufHomework: homework });
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
    const makeHours = this.state.week[0].schedule.map((hour,i) => {
        if(i < 10){
          return(
            <li key={i} style={style.eventul}>0{i}:00</li>
          );
        }else if(i >= 10){
          return(
            <li key={i} style={style.eventul}>{i}:00</li>
          );
        }
    });
    const makeDays = this.state.week.map((day, idx) => {
      const makeEvents = this.state.week[idx].schedule.map((ev, i) => {
        return(
          <li key={i} style={style.eventul}>{ev.event}</li>
        );
      });
      return(
        <div style={style.eventBox}>
          <ul>
            <li style={style.eventul}>{day.day}</li>
            {makeEvents}
          </ul>
        </div>
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
            <input style={style.classInput} placeholder={'name of the class*'} onChange={this.onClassChange} value={this.state.bufClass}/>
            <input style={style.timeInput} placeholder={'time of that class*'} onChange={this.onTimeChange} value={this.state.bufTime}/>
            <input style={style.dayInput} placeholder={'day of that class*'} onChange={this.onDayChange} value={this.state.bufDay}/>
            <input style={style.homeworkInput} placeholder={'homework for it'} onChange={this.onHomeworkChange} value={this.state.bufHomework}/>
          </div>
            <button style={style.buttonDate} onClick={this.clickHandlerPushEvent}>put new date!</button>
        </div>
        <div style={style.flexColumn}>
          <div style={style.mainSchedule}>
            <div style={style.timeSchedule}>
              <div style={renderStyle.flexRow}>
                <div style={style.eventBox}>
                  <ul>
                    <li style={style.eventul}>Time</li>
                    {makeHours}
                  </ul>
                </div>
                {makeDays}
              </div>
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
