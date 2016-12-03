import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default
class Homework extends Component {
  constructor(){
    super();
    this.state = {hw: []};
  }
  componentWillMount() {
    let request = 'https://studule.mybluemix.net/new_schedule';
    fetch(request)
    .then(response => response.json())
    .then(actual_data => {
      this.setState({hw: actual_data.homew});
    })
    .catch(
      console.error
    );
  };
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
      changeGoToScene: {
        fontSize: 25
      },
      homeworkText: {
        fontSize: 20,
        marginTop: 2,
        marginBottom: 2,
      },
      addEventStyle: {
        alignItems: 'center',
      }
    };
    const makeHomework = this.state.hw.map((homew, idx) => {
      return(
        <Text style={style.homeworkText} key={idx}>{idx + 1}. {homew}</Text>
      );
    });
    return(
      <View style={style.mainContainer}>
        <View style={style.flexRow}>
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Text style={style.changeGoToScene}>go to Calendar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {makeHomework}
        </ScrollView>
      </View>
    )
  }
}
