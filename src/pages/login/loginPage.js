import React from 'react';
import {
  AsyncStorage,ImageBackground,
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import BVLinearGraient from 'react-native'
import {BoxShadow} from 'react-native-shadow'
import LinearGradient from 'react-native-linear-gradient'

export class SignInScreen extends React.Component {
  static navigationOptions = {
    header:null // 隐藏顶部导航栏
  };

  render() {
    const boxshadow = {
      height:49,
      color:'#ff0000',
      border:10,
      radius:3,
      opacity:0.5,
      x:0,
      y:5,
      style:{marginVertical:5},
    }
    return (
      <View style={styles.loginWrapper}>
        <ImageBackground source={require('./images/login-bg.png')} style={styles.backgroundImage}>
          {/*<BoxShadow setting={boxshadow}>
            <View style={styles.login}>
              <Text style={styles.title}>登录</Text>
              <View>
                <TextInput
                  placeholder="请输入域名或手机号"
                />
              </View>
              <View>
                <TextInput
                  placeholder="请输入身份证后六位"
                />
              </View>
              <Button title="登陆" onPress={this._signInAsync} />
              <View style={styles.forgetPwd}>
                <Text onPress={this._forgetPwd}>找回密码</Text>
              </View>
            </View>
          </BoxShadow>*/}
          <View>
            <Text style={styles.logoTitle}>园区人员车辆管理</Text>
          </View>
          <View style={styles.login}>
            <Text style={styles.title}>登录</Text>
            <View>
              <TextInput style={styles.inputUserInfo}
                placeholder="请输入域名或手机号"
              />
            </View>
            <View>
              <TextInput style={styles.inputUserInfo} keyboardType='number-pad'
                placeholder="请输入身份证后六位"
              />
            </View>
            <View style={styles.forgetPwd}>
              <Text onPress={this._forgetPwd} style={{color:'#6078ea'}}>忘记密码?</Text>
            </View>
            {/*<Button style={styles.loginBtn} title="登录" onPress={this._signInAsync} />*/}
            {/*<LinearGradient colors={['#09B6FD', '#6078EA']} style={styles.linearGradient}>
              <Text style={{color:'#fff'}} onPress={this._signInAsync}> 登录 </Text>
            </LinearGradient>*/}
            <View style={{alignItems:'center'}}>
              <View style={styles.linearGradient} onPress={this._signInAsync}>
                <Text style={styles.loginBtn}>登录</Text>
              </View>
            </View>
          </View>

        </ImageBackground>

      </View>
    );
  }


  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };
  _forgetPwd = async () => {
    this.props.navigation.navigate('FindAccount');
  };
}

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },
  logoTitle:{
    color:'#ffffff',
    fontSize:18,
    position:'relative',
    top:-35,
    left:0,
  },
  inputUserInfo:{
    borderBottomWidth:1,
    borderBottomColor:'#D3DFEF',
    marginBottom:10,
  },
  title:{
     fontSize:23,
     color:'#3e4a59',
      paddingLeft:10,
    paddingBottom:20,
    },
  login: {
    width: 325,
    height: 267,
    borderStyle: 'solid',
    marginBottom:70,
    // borderColor: 'red',
    //  borderWidth: 2,
    borderRadius:5,
    backgroundColor:'#ffffff',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: '#ff0000',
    //注意：这一句是可以让安卓拥有灰色阴影
    elevation: 4,
    paddingHorizontal:16,
    paddingVertical:23,

  },
  forgetPwd: {
    marginTop: 10,
    flex: 1,
    alignItems: 'flex-end',
  },
  backgroundImage:{
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    justifyContent:'center',
    alignItems:'center',
    width:'80%',
    height:50,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    backgroundColor:'#6078ea',
    marginTop:35,
  },
  loginBtn:{
    color:'#ffffff',
    fontSize:20,
  },
})