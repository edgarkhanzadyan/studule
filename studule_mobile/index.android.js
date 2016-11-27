/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import Calendar from './lib/Calendar';
import AddNewEvent from './lib/AddNewEvent';
import Homework from './lib/Homework';

export default
class studule_mobile extends Component {

  renderScene(route, navigator) {
    if(route.name === 'Calendar') {
      return <Calendar navigator={navigator} {...route.passProps} />;
    }else if(route.name === 'Homework'){
      return <Homework navigator={navigator} {...route.passProps} />;
    }else if(route.name === 'toAddingEvent'){
      return <AddNewEvent navigator={navigator} {...route.passProps} />;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Calendar'}}
        renderScene={this.renderScene}
      />
    );
  }
}

const styles = StyleSheet.create({});

AppRegistry.registerComponent('studule_mobile', () => studule_mobile);
