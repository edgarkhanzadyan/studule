import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default
class Calendar extends Component {
  constructor(){
    super();
    this.state = {
      week: [
        {day:'Monday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Tuesday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Wednesday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Thursday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Friday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Saturday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
        {day:'Sunday',schedule: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
      ],weekNumber: 0
    };
  }
  // componentWillMount() {
  //   let request = 'http://localhost:8080/new_schedule';
  //   console.log('bef');
  //   fetch(request)
  //   .then(response => response.json())
  //   .then(actual_data => {
  //     this.setState({week: actual_data.payload});
  //   })
  //   .catch(
  //     console.error
  //   );
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
      if(idx - Math.round(idx/2) < 10 && idx % 2 == 0){
        return(
          <View key={idx} style={style.eventTimeWrapper}>
            <Text style={style.timeText}>0{idx - Math.round(idx/2)}:00</Text>
            <Text style={style.eventText}>{day.event}</Text>
          </View>
        );
      }else if(idx - Math.round(idx/2) < 10 && idx % 2 == 1){
        return(
          <View key={idx} style={style.eventTimeWrapper}>
            <Text style={style.timeText}>0{idx - Math.round(idx/2)}:30</Text>
            <Text style={style.eventText}>{day.event}</Text>
          </View>
        );
      }
      else if(idx - Math.round(idx/2) >= 10 && idx % 2 == 0){
        return(
          <View key={idx} style={style.eventTimeWrapper}>
            <Text style={style.timeText}>{idx - Math.round(idx/2)}:00</Text>
            <Text style={style.eventText}>{day.event}</Text>
          </View>
        );
      }else if(idx - Math.round(idx/2) >= 10 && idx % 2 == 1){
        return(
          <View key={idx} style={style.eventTimeWrapper}>
            <Text style={style.timeText}>{idx - Math.round(idx/2)}:30</Text>
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
        <View style={style.flexRow}>
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
