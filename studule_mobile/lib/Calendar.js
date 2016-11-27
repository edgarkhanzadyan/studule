import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default
class Calendar extends Component {
  constructor(){
    super();
    this.state = {
      week: [
        {day:'Monday',schedule: [{},{},{},{},{},{},{event: 'heeey'},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Tuesday',schedule: [{},{},{},{},{},{},{},{},{event: 'Discrete mathematics in 304W with fucaodjoak djfkjsndfkljasdl kjfalksdj fhlkajsdhflkjashdfk'},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Wednesday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Thursday',schedule: [{},{},{},{},{},{},{},{},{},{},{event: 'yo bitch'},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Friday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Saturday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Sunday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
      ],weekNumber: 0
    };
  }
  // componentDidMount() {
  //   let request = 'http://localhost:8888/new_schedule';
  //   console.log('bef');
  //   let schedule = fetch(request)
  //   .then((response) => response.text())
  //   .then((responseText) => {
  //     console.log(responseText);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  //   console.log('after');
  //   console.log(schedule);
  //   let all_schedule = schedule.json();
  //   this.setState({week: all_schedule.payload});
  // };
  _navigate(propName, name) {
    if(propName === 'toHomework'){
      this.props.navigator.push({
        name: 'Homework',
        passProps: {
          name: name,
        },
      });
    }else if(propName === 'toAddingEvent'){
      this.props.navigator.push({
        name: 'toAddingEvent',
        passProps: {
          name: name,
        },
      });
    }
  }
  onForward(){
    this.setState({weekNumber: ++this.state.weekNumber});
  }
  onBack(){
    this.setState({weekNumber: --this.state.weekNumber});
  }
  render(){
    const style = {
      mainContainer: {
        backgroundColor: 'orange',
        flex: 1,
      },
      flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      eventTimeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        borderStyle: 'solid',
      },
      changeGoToScene: {
        fontSize: 25,
      },
      text: {
        fontSize: 20,
      },
      leftAndRight: {
        fontSize: 18,
      },
      day: {
        fontSize: 22,
      },
      eventText: {
        fontSize: 20,
        padding: 10,
      },
      timeText: {
        fontSize: 20,
        borderRightWidth: 0.5,
        borderRightColor: 'black',
        borderStyle: 'solid',
        padding: 10,
      },
      addEventWrapper: {
        alignItems: 'center',
      },
      addEventText: {
        fontSize: 20,
      }
    };
    const makeDay = this.state.week[this.state.weekNumber].schedule.map((day, idx) => {
      if(idx < 10){
        return(
          <View key={idx} style={style.eventTimeWrapper}>
            <Text style={style.timeText}>0{idx}:00</Text>
            <Text style={style.eventText}>{day.event}</Text>
          </View>
        );
      }else if(idx >= 10){
        return(
          <View key={idx} style={style.eventTimeWrapper}>
            <Text style={style.timeText}>{idx}:00</Text>
            <Text style={style.eventText}>{day.event}</Text>
          </View>
        );
      }
    })
    return(
      <View style={style.mainContainer}>
        <View style={style.flexRow}>
          <TouchableOpacity onPress={() => this._navigate('toHomework')}>
            <Text style={style.changeGoToScene}>go to Homework</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => this._navigate('toAddingEvent')} style={style.addEventWrapper}>
            <Text style={style.addEventText}>Add event</Text>
          </TouchableOpacity>
        </View>
        <View style={style.flexRow}>
          <TouchableOpacity onPress={() => {if(this.state.weekNumber>0){this.onBack()}}}>
            <Text style={style.leftAndRight}>left</Text>
          </TouchableOpacity>
          <Text style={style.day}>{this.state.week[this.state.weekNumber].day}</Text>
          <TouchableOpacity onPress={() => {if(this.state.weekNumber<6){this.onForward()}}}>
            <Text style={style.leftAndRight}>right</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {makeDay}
        </ScrollView>
      </View>
    )
  }
}
