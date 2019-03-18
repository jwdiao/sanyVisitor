import React from 'react';
import {
  View,
  Text
} from 'react-native';
export class MyVisitorScreen extends React.Component {
  static navigationOptions = {
    title: '访客录入！',
  };

  render() {
    return (
      <View>
        <Text>访客录入！</Text>
      </View>
    );
  }

}