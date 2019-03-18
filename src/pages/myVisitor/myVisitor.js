import React from 'react';
import {
  View,
  Text
} from 'react-native';
export class MyVisitorScreen extends React.Component {
  static navigationOptions = {
    title: '我的访客！',
  };

  render() {
    return (
      <View>
        <Text>我的访客！</Text>
      </View>
    );
  }

}