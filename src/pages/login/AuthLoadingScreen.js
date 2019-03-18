
import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from 'react-native';
// 权限获取
export class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
  };
  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}