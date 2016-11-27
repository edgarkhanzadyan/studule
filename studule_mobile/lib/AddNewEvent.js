import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button} from 'react-native';

export default
class AddNewEvent extends Component {
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
      notPossibleInfo: false,
    };
  }
  clickHandlerPushEvent = (e) => {
    if(this.state.bufClass !== '' && this.state.bufTimeFrom !== '' && this.state.bufTimeTo !== '' && this.state.bufDay !== ''){
      console.log('button');
      let dayIndex = 0;
      for(let i = 0; i < 7; ++i){
        if(this.state.week[i].day === this.state.bufDay){
          dayIndex = i;
        }
      }
      const newClasses = this.state.week;
      for(let i = this.state.bufTimeFrom; i <= this.state.bufTimeTo; ++i){
        newClasses[dayIndex].schedule[i].event = this.state.bufClass;
      }
      const newHomework = this.state.hw;
      if(this.state.bufHomework !== ''){
        const fullHw = this.state.bufHomework + " ( " + this.state.bufClass + " from " + this.state.bufTimeFrom + ":00 to " + this.state.bufTimeTo + ":00, " + this.state.bufDay + " )";
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
      fetch('http://localhost:8888/new_data', request_options)
      .then(resp => resp.text())
      .then(console.log)
      .catch(console.error);
      this.setState({ week: newClasses, bufClass: '',bufTimeTo: '', bufTimeFrom: '', bufHomework: '', bufDay: '', notPossibleInfo: false});
    }else {
      console.log(this.state.notPossibleInfo);
      this.setState({ notPossibleInfo: true });
    }
  }
  onDayChange = (e) => {
    console.log('day');
    const day = e.currentTarget.value;
    this.setState({ bufDay: day});
  };
  onClassChange = (e) => {
    console.log('clas');
    const classs = e.currentTarget.value;
    this.setState({ bufClass: classs });
  };
  onTimeChangeFrom = (e) => {
    console.log('from');
    const time = e.currentTarget.value;
    this.setState({ bufTimeFrom: time });
  };
  onTimeChangeTo = (e) => {
    console.log('to');
    const time = e.currentTarget.value;
    this.setState({ bufTimeTo: time });
  }
  onHomeworkChange = (e) => {
    console.log('hw');
    const homework = e.currentTarget.value;
    this.setState({ bufHomework: homework });
  }
  render(){
    const style = {
      mainContainer: {
        backgroundColor: 'orange',
        flex: 1,
      },
      submitWrapper: {
        alignItems: 'center',
      },
      changeGoToScene: {
        fontSize: 25,
      },
      goToWrapper: {
        alignItems: 'center',
      },
      inputStyles: {
        fontSize: 20,
      },
      inputDescription: {
        fontSize: 25,
      },
      notRightInfoStyle: {
      },
      notRightInfoStyleNone: {
        opacity: 0,
      }
    };
    return(
      <View style={style.mainContainer}>
        <View>
          <TouchableOpacity style={style.goToWrapper} onPress={() => this.props.navigator.pop()}>
            <Text style={style.changeGoToScene}>go back</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={style.inputDescription}>Day</Text>
          <TextInput
            style={style.inputStyles}
            placeholder={'input day of the event'}
            autoCorrect={false}
            onChange={this.onDayChange}
          />
        </View>
        <View>
          <Text style={style.inputDescription}>Hour from</Text>
          <TextInput
            style={style.inputStyles}
            placeholder={'input when class starts'}
            autoCorrect={false}
            onChange={this.onTimeChangeFrom}
          />
        </View>
        <View>
          <Text style={style.inputDescription}>Hour To</Text>
          <TextInput
            style={style.inputStyles}
            placeholder={'input when class ends'}
            autoCorrect={false}
            onChange={this.onTimeChangeTo}
          />
        </View>
        <View>
          <Text style={style.inputDescription}>Class name</Text>
          <TextInput
            style={style.inputStyles}
            placeholder={'input name of the class'}
            autoCorrect={false}
            onChange={this.onClassChange}
          />
        </View>
        <View>
          <Text style={style.inputDescription}>Homework</Text>
          <TextInput
            style={style.inputStyles}
            placeholder={'input homework for that class'}
            autoCorrect={false}
            onChange={this.onHomeworkChange}
          />
        </View>
        <View style={style.submitWrapper}>
          <Button title={'Submit'} color={'#0ebc41'} onPress={this.clickHandlerPushEvent} />
        </View>
        <View style={this.state.notPossibleInfo ? style.notRightInfoStyle : style.notRightInfoStyleNone}>
          <Text>Sorry, not possible information passed in</Text>
        </View>
      </View>
      );
    }
}
