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
      hw: [],
      bufClass: '',
      bufTimeFrom: '',
      bufTimeTo: '',
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
    this.onTimeChangeFrom = this.onTimeChangeFrom.bind(this);
    this.onTimeChangeTo = this.onTimeChangeTo.bind(this);
    this.onClassChange = this.onClassChange.bind(this);
    this.onHomeworkChange = this.onHomeworkChange.bind(this);
    this.clickHandlerPushEvent = this.clickHandlerPushEvent.bind(this);
  }
  async componentDidMount() {
    let request = 'http://localhost:8080/new_schedule';
    let schedule = await fetch(request);
    let all_schedule = await schedule.json();
    this.setState({week: all_schedule.payload, hw: all_schedule.homew});
  };

  clickHandlerPushEvent(e){
    if((e.button === 0 || e.keyCode === 13) && this.state.bufClass.trim() !== ''
    && this.state.bufTimeFrom.trim() !== '' && this.state.bufTimeTo.trim() !== ''){
      let dayIndex;
      for(let i = 0; i < 7; ++i){
        if(this.state.week[i].day === this.state.bufDay){
          dayIndex = i;
        }
      }
      const newClasses = this.state.week;
      for(let i = this.state.bufTimeFrom.substr(0, 2); i < this.state.bufTimeTo.substr(0, 2); ++i){
        newClasses[dayIndex].schedule[i].event = this.state.bufClass;
      }
      const newHomework = this.state.hw;
      if(this.state.bufHomework.trim() !== ''){
        const fullHw = `${this.state.bufClass} homework for ${this.state.bufTimeFrom}:00 on ${this.state.bufDay}: ${this.state.bufHomework}`;
        newHomework[newHomework.length] = fullHw;
      }
      const request_options = {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body:JSON.stringify({
          array : newClasses,
          homework: newHomework,
        }),
      };
      fetch('/new_data', request_options);
      this.setState({ week: newClasses, bufClass: '',bufTimeTo: '', bufTimeFrom: '', bufHomework: '', bufDay: ''});
    }
  }
  onDayChange(e){
    const day = e.currentTarget.value;
    this.setState({ bufDay: day });
  }
  onClassChange(e){
    const classs = e.currentTarget.value;
    this.setState({ bufClass: classs });
  }
  onTimeChangeFrom(e){
    const time = e.currentTarget.value;
    this.setState({ bufTimeFrom: time });
  }
  onTimeChangeTo(e){
    const time = e.currentTarget.value;
    this.setState({ bufTimeTo: time });
  }
  onHomeworkChange(e){
    const homework = e.currentTarget.value;
    this.setState({ bufHomework: homework });
  }
  render() {
    const makeHourChoices = this.state.week[0].schedule.map((hour,i) => {
        if(i < 10){
          return(
            <option key={i} value={i}>0{i}:00</option>
          );
        }else if(i >= 10){
          return(
            <option key={i} value={i}>{i}:00</option>
          );
        }
    });
    const makeHomework = this.state.hw.map((homew, i) => {
      return(
        <li key={i} style={style.homeworkItem}>{homew}</li>
      );
    })
    const makeHours = this.state.week[0].schedule.map((hour,i) => {
        if(i < 10){
          return(
            <li key={i} style={style.eventli}>0{i}:00</li>
          );
        }else if(i >= 10){
          return(
            <li key={i} style={style.eventli}>{i}:00</li>
          );
        }
    });
    const makeDays = this.state.week.map((day, idx) => {
      const makeEvents = this.state.week[idx].schedule.map((ev, i) => {
        return(
          <li key={i} style={style.eventli}>{ev.event}</li>
        );
      });
      return(
        <div style={style.eventBox}>
          <ul style={style.eventul}>
            <li style={style.eventli}>{day.day}</li>
            {makeEvents}
          </ul>
        </div>
      );
    });
    return(
      <div style={style.flexColumn}>
        <header style={style.header}>
          <div style={style.logo}>
            Studule
          </div>
        </header>
        <div style={style.scheduleAdd}>
          <div style={style.inputs}>
            <select onChange={this.onTimeChangeFrom} value={this.state.bufTimeFrom}>
              <option value="" style={style.dontShow}>Choose start time</option>
              {makeHourChoices}
            </select>
            <select onChange={this.onTimeChangeTo} value={this.state.bufTimeTo}>
              <option value="" style={style.dontShow}>Choose finish time</option>
              {makeHourChoices}
            </select>
            <select onChange={this.onDayChange} value={this.state.bufDay}>
              <option value="" style={style.dontShow}>Choose week day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <input style={style.classInput} placeholder={'Name of the class*'} onChange={this.onClassChange} value={this.state.bufClass} onKeyDown={this.clickHandlerPushEvent}/>
            <input style={style.homeworkInput} placeholder={'Homework (if applicable)'} onChange={this.onHomeworkChange} value={this.state.bufHomework} onKeyDown={this.clickHandlerPushEvent}/>
          </div>
            <button style={style.buttonDate} onClick={this.clickHandlerPushEvent}>Save event</button>
        </div>
        <div style={style.flexColumn}>
          <div style={style.mainSchedule}>
            <div style={style.timeSchedule}>
              <div style={style.flexRow}>
                <div style={style.eventBox}>
                  <ul>
                    <li style={style.eventli}>Time</li>
                    {makeHours}
                  </ul>
                </div>
                {makeDays}
              </div>
            </div>
            <div style={style.homeworkTab}>
              <div style={style.homeworkLogo}>Homework tab</div>
              <div>
                <ul>
                  {makeHomework}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
module.exports = Schedule;
