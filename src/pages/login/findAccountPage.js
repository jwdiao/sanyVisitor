import React from 'react';
import {
  AsyncStorage,
  Button,
  View,
  Text
} from 'react-native';

export class FindAccountPage extends React.Component {
  static navigationOptions = {
    title: '找回密码',
  };

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>忘记密码页面</Text>
        <Button title="修改完成,进入登陆页面登陆!" onPress={this._savePwd} />
      </View>
    );
  }

  _savePwd = async () => {
    this.props.navigation.navigate('Auth'); // 进入登陆页面
  };
}