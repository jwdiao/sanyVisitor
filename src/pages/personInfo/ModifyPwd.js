import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
export class ModifyPwdScreen extends React.Component {
  static navigationOptions = {
    title: '个人信息',
  };

  render() {
    return (
      <View>
        <Text>修改密码页面</Text>
        <View>
          <TextInput
            placeholder="原密码"
            />
        </View>
        <View>
          <TextInput
            placeholder="新密码"
            />
        </View>
        <View>
          <TextInput
            placeholder="确认密码"
            />
        </View>
        <Button title="修改完成" />
         <Button
          title="退出登陆"
          onPress={this._signOutAsync} />
      </View>
    );
  }
   _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}