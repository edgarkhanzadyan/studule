import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, ScrollView, Picker } from 'react-native';

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
  componentWillMount() {
    let request = 'https://studule.mybluemix.net/new_schedule';
    fetch(request)
    .then(response => response.json())
    .then(actual_data => {
      this.setState({week: actual_data.payload});
    })
    .catch(
      console.error
    );
  };
  clickHandlerPushEvent = (e) => {
    if(this.state.bufClass !== '' && this.state.bufTimeFrom !== '' && this.state.bufTimeTo !== '' && this.state.bufDay !== ''){
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
      fetch('https://studule.mybluemix.net/new_data', request_options)
      .then(resp => resp.text())
      .then(console.log)
      .catch(console.error);
      this.setState({ week: newClasses, bufClass: '',bufTimeTo: '', bufTimeFrom: '', bufHomework: '', bufDay: '', notPossibleInfo: false});
    }else {
      this.setState({ notPossibleInfo: true });
    }
  }
  render(){
    const style = {
      mainContainer: {
        backgroundColor: 'orange',
        flex: 1
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
      <ScrollView style={style.mainContainer}>
        <View>
          <TouchableOpacity style={style.goToWrapper} onPress={() => this.props.navigator.pop()}>
            <Text style={style.changeGoToScene}>go back</Text>
          </TouchableOpacity>
        </View>
        <Picker
          mode='dropdown'
          selectedValue={this.state.bufDay}
          onValueChange={(data) => this.setState({ bufDay: data})}>
          <Picker.Item label='input day of the class' value='' />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
        <Picker
          mode='dropdown'
          selectedValue={this.state.bufTimeFrom}
          onValueChange={(data) => this.setState({ bufTimeFrom: data })}>
          <Picker.Item label='input when class starts' value='' />
          <Picker.Item label='00:00' value={0} />
          <Picker.Item label='00:30' value={1} />
          <Picker.Item label='01:00' value={2} />
          <Picker.Item label='01:30' value={3} />
          <Picker.Item label='02:00' value={4} />
          <Picker.Item label='02:30' value={5} />
          <Picker.Item label='03:00' value={6} />
          <Picker.Item label='03:30' value={7} />
          <Picker.Item label='04:00' value={8} />
          <Picker.Item label='04:30' value={9} />
          <Picker.Item label='05:00' value={10} />
          <Picker.Item label='05:30' value={11} />
          <Picker.Item label='06:00' value={12} />
          <Picker.Item label='06:30' value={13} />
          <Picker.Item label='07:00' value={14} />
          <Picker.Item label='07:30' value={15} />
          <Picker.Item label='08:00' value={16} />
          <Picker.Item label='08:30' value={17} />
          <Picker.Item label='09:00' value={18} />
          <Picker.Item label='09:30' value={19} />
          <Picker.Item label='10:00' value={20} />
          <Picker.Item label='10:30' value={21} />
          <Picker.Item label='11:00' value={22} />
          <Picker.Item label='11:30' value={23} />
          <Picker.Item label='12:00' value={24} />
          <Picker.Item label='12:30' value={25} />
          <Picker.Item label='13:00' value={26} />
          <Picker.Item label='13:30' value={27} />
          <Picker.Item label='14:00' value={28} />
          <Picker.Item label='14:30' value={29} />
          <Picker.Item label='15:00' value={30} />
          <Picker.Item label='15:30' value={31} />
          <Picker.Item label='16:00' value={32} />
          <Picker.Item label='16:30' value={33} />
          <Picker.Item label='17:00' value={34} />
          <Picker.Item label='17:30' value={35} />
          <Picker.Item label='18:00' value={36} />
          <Picker.Item label='18:30' value={37} />
          <Picker.Item label='19:00' value={38} />
          <Picker.Item label='19:30' value={39} />
          <Picker.Item label='20:00' value={40} />
          <Picker.Item label='20:30' value={41} />
          <Picker.Item label='21:00' value={42} />
          <Picker.Item label='21:30' value={43} />
          <Picker.Item label='22:00' value={44} />
          <Picker.Item label='22:30' value={45} />
          <Picker.Item label='23:00' value={46} />
          <Picker.Item label='23:30' value={47} />
        </Picker>
        <Picker
          mode='dropdown'
          selectedValue={this.state.bufTimeTo}
          onValueChange={(data) => this.setState({ bufTimeTo: data })}>
          <Picker.Item label='input when class ends' value='' />
          <Picker.Item label='00:00' value={0} />
          <Picker.Item label='00:30' value={1} />
          <Picker.Item label='01:00' value={2} />
          <Picker.Item label='01:30' value={3} />
          <Picker.Item label='02:00' value={4} />
          <Picker.Item label='02:30' value={5} />
          <Picker.Item label='03:00' value={6} />
          <Picker.Item label='03:30' value={7} />
          <Picker.Item label='04:00' value={8} />
          <Picker.Item label='04:30' value={9} />
          <Picker.Item label='05:00' value={10} />
          <Picker.Item label='05:30' value={11} />
          <Picker.Item label='06:00' value={12} />
          <Picker.Item label='06:30' value={13} />
          <Picker.Item label='07:00' value={14} />
          <Picker.Item label='07:30' value={15} />
          <Picker.Item label='08:00' value={16} />
          <Picker.Item label='08:30' value={17} />
          <Picker.Item label='09:00' value={18} />
          <Picker.Item label='09:30' value={19} />
          <Picker.Item label='10:00' value={20} />
          <Picker.Item label='10:30' value={21} />
          <Picker.Item label='11:00' value={22} />
          <Picker.Item label='11:30' value={23} />
          <Picker.Item label='12:00' value={24} />
          <Picker.Item label='12:30' value={25} />
          <Picker.Item label='13:00' value={26} />
          <Picker.Item label='13:30' value={27} />
          <Picker.Item label='14:00' value={28} />
          <Picker.Item label='14:30' value={29} />
          <Picker.Item label='15:00' value={30} />
          <Picker.Item label='15:30' value={31} />
          <Picker.Item label='16:00' value={32} />
          <Picker.Item label='16:30' value={33} />
          <Picker.Item label='17:00' value={34} />
          <Picker.Item label='17:30' value={35} />
          <Picker.Item label='18:00' value={36} />
          <Picker.Item label='18:30' value={37} />
          <Picker.Item label='19:00' value={38} />
          <Picker.Item label='19:30' value={39} />
          <Picker.Item label='20:00' value={40} />
          <Picker.Item label='20:30' value={41} />
          <Picker.Item label='21:00' value={42} />
          <Picker.Item label='21:30' value={43} />
          <Picker.Item label='22:00' value={44} />
          <Picker.Item label='22:30' value={45} />
          <Picker.Item label='23:00' value={46} />
          <Picker.Item label='23:30' value={47} />
        </Picker>
        <View>
          <Text style={style.inputDescription}>Class name</Text>
          <TextInput
            style={style.inputStyles}
            placeholder={'input name of the class'}
            autoCorrect={false}
            onChangeText={(data) => this.setState({ bufClass: data })}
            value={this.state.bufClass}
          />
        </View>
        <View>
          <Text style={style.inputDescription}>Homework</Text>
          <TextInput
            style={style.inputStyles}
            placeholder={'input homework for that class'}
            autoCorrect={false}
            onChangeText={(data) => this.setState({ bufHomework: data })}
            value={this.state.bufHomework}
          />
        </View>
        <View style={style.submitWrapper}>
          <Button title={'Submit'} color={'#0ebc41'} onPress={this.clickHandlerPushEvent} />
        </View>
        <View style={this.state.notPossibleInfo ? style.notRightInfoStyle : style.notRightInfoStyleNone}>
          <Text>Sorry, not possible information passed in</Text>
        </View>
      </ScrollView>
      );
    }
}
