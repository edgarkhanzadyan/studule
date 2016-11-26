import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class MyScene extends Component {
  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableOpacity onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

MyScene.propTypes = {
  title: PropTypes.string.isRequired,
  onForward: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
