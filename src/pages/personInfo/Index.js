import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

import {
  getAttendanceData
} from '../../http/api'

export class MyInfoScreen extends React.Component {
  static navigationOptions = {
    title: '个人信息',
  };
  constructor(props){
    super(props);
    this.state ={
      centername: '',
      dataSource: {}
    }
  };
  componentDidMount(){
    // 测试接口
    getAttendanceData(this.state.centername).then(res => {
      this.setState({
        dataSource: res.titledata,
      })
    })
  };

  render() {
    return (
      <View>
        <Text>个人信息</Text>
        <View>
          <TextInput
            placeholder="姓名"
            />
        </View>
        <View>
          <TextInput
            placeholder="电话"
            />
        </View>
        <View>
          <TextInput
            placeholder="登陆账号"
            />
        </View>
        <Text>测试数据请求接口数据:{this.state.dataSource.lateNum}</Text>
        <Button title="修改密码" onPress={this._modifyPwd} />
      </View>
    );
  }
  _modifyPwd = async () => {
    this.props.navigation.navigate('ModifyPwd');
  };
}