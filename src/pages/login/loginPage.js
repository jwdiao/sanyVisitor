import React from 'react';
import {
  AsyncStorage, ImageBackground, Modal,TouchableNativeFeedback,
  Button, Image, ScrollView, TouchableOpacity,
  View, Text, TextInput, StyleSheet, Dimensions,
  StatusBar
} from 'react-native';
// import {BoxShadow} from 'react-native-shadow'
import LinearGradient from 'react-native-linear-gradient'
// import Svg from 'react-native-svg'
// import Svg from '../../Component/Svg';
// import svgs from '../../assets/svgs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'


import {LoginRequest} from '../../http/api'

import { setStatusBar } from '../../components/HOC/StatusBar'
@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent'
})

export class SignInScreen extends React.Component {
  static navigationOptions = {
    header:null // 隐藏顶部导航栏
  };
  constructor(props){
    super(props);
    this.state= {
      userNameInput:'',
      userPassword:'',
      showImageClose:false,//input图标显示关闭
       modalVisible:false,//登录失败模态框
      isShowPasswordIcon:true,//是否查看密码
      isPwd:true
    }
  }
  componentDidMount(){
    
  };
   
  _onChangeText = (userNameInput)=>{
       this.setState({userNameInput})
      if(userNameInput !==''){
         this.setState({showImageClose:true})
      }else{
        this.setState({showImageClose:false})
      }
  }
  _onChangePwd = (userPassword)=>{
       this.setState({userPassword})
  }
  _clearUserName = () =>{
     this.setState({userNameInput:'',showImageClose:false})
  }
  _toggleIsShowPwd = () =>{
     this.setState({isShowPasswordIcon:!this.state.isShowPasswordIcon,isPwd:!this.state.isPwd})
  }
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
     const {userNameInput} = this.state
    let v = this.state.showImageClose ? <AntDesign color='#0ed485' name={'closecircle'} size={24}/> : null
    let isShowPassword = this.state.isShowPasswordIcon ? <Image source={require('./images/close.png')} style={{marginTop:10,}}/> : <SimpleLineIcons name={'eye'} size={24}/>
    const {height,width} = Dimensions.get('window')
    return (

      // style={styles.loginWrapper}
      //拖动界面输入法退出,点击输入法以外输入法退出
    <ScrollView
      contentContainerStyle={{flex:1}}
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps='never'>
      <ImageBackground source={require('./images/beijing.png')} style={styles.backgroundImage}>          
        <View>
          <Image source={require('./images/sanylogo.png')}/>
          <View style={{alignItems:'center'}}>
            <Text style={styles.logoTitle}>园区人员车辆管理</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.loginContainer}>
        <View style={styles.login}>
          <Text style={styles.title}>登录</Text>
            <View style={styles.inputFlex}>
              {/*<Image source={require('./images/username_icon.png')} style={styles.userIcon} />*/}
              <FontAwesome color='#09B6FD' name={'user'} size={24} style={styles.userIcon}/>
              <TouchableOpacity  style={styles.userRightIcon} onPress={this._clearUserName}>{v}</TouchableOpacity >
              <TextInput style={styles.inputUserInfo}
                         secureTextEntry={false}
                         value={userNameInput}
                         onChangeText={this._onChangeText}//输入框改变触发的函数
                         placeholder="请输入域名或手机号"/>
            </View>
            <View  style={styles.inputFlex}>
              {/*<Image source={require('./images/password.png')} style={styles.userIconPwd}/>*/}
              <Ionicons color='#09B6FD' name={'ios-lock'} size={24} style={styles.userIconPwd}/>
              <TouchableOpacity style={styles.userIconPwdEye} onPress={this._toggleIsShowPwd}>{isShowPassword}</TouchableOpacity>
              <TextInput style={styles.inputUserInfo}  secureTextEntry={this.state.isPwd}
                /* keyboardType='number-pad' //键盘只显示数字*/
                         placeholder="请输入身份证后六位"  onChangeText={this._onChangePwd}
              />
            </View>
            <View style={styles.forgetPwd}>
              <Text onPress={this._forgetPwd} style={{color:'#468BD9'}}>忘记密码?</Text>
            </View>

        </View>
        {/*登录按钮*/}
        <View style={{alignItems:'center',zIndex:10000,marginTop:-25,paddingHorizontal:16,paddingVertical:0,elevation: 11,}} >
          <LinearGradient colors={['#09B6FD', '#6078EA']} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.linearGradient}>
            <TouchableOpacity onPress={this._signInAsync}>
              <View style={styles.linearGradientView}>
                <Text style={styles.loginBtn} >登录</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      {/*登录失败模态框*/}
      <View>
        <Modal animationType='fade' transparent maskClosable visible={this.state.modalVisible}
                onRequestClose={()=>{alert('modal closeed')}}>
          <View style={styles.containerModal}>
            <View style={{width:width*0.8,height:height*0.35,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',borderRadius:10,}}>
              <Text style={{fontSize:24,fontWeight:'bold',marginBottom:20,}}>登录失败</Text>
              <Text style={{fontSize:18,}}>帐号或登录密码错误，请重新输入</Text>
              <LinearGradient colors={['#09B6FD', '#6078EA']} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.goBackLogin}>
                <TouchableNativeFeedback onPress={this._goBackLogin}>
                  <View style={styles.goBackLoginView}>
                    <Text  style={{fontSize:20,color:'#fff',}}>确定</Text>
                  </View>
                </TouchableNativeFeedback>
              </LinearGradient>

            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
    );
  }


  _signInAsync = async () => {
    // await AsyncStorage.setItem('userToken', 'abc');

    // this.props.navigation.navigate('Main');
    // this.setState({modalVisible:true})
    const formData = {
      loginAccount: this.state.userNameInput,
      loginPwd: this.state.userPassword
    }
    /*fetch请求*/
    /*const res = fetch('http://10.19.8.22:8100/user/SanyBasicShrUser/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json())
      .then((responseJSON) =>{
      console.warn('qingqiuchenggong:',responseJSON)
    })*/
    /*fetch封装----*/
    LoginRequest(formData).then(res=> {
     /* if(res&&res.code===200){
        this.props.navigation.navigate('Main');
      }*/
      this.props.navigation.navigate('Main');
    }).catch(res=>{
      // 登录失败时，弹出模态框
      this.setState({modalVisible:true})
    })

    /*axios封装----*/
     /*LoginRequest(formData).then(res => {
      this.props.navigation.navigate('Main');
      // console.log('ppp:',res)
    }).catch(res =>{
      // 登录失败时，弹出模态框
      this.setState({modalVisible:true})
       console.log('登录失败')
    })*/

  };
  _forgetPwd = async () => {
    this.props.navigation.navigate('FindAccount');
  };
  //登录失败后，点击确定按钮
  _goBackLogin = () => {
    this.setState({modalVisible:false})
  }
}
const {height,width} = Dimensions.get('window')
const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1, justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },
  logoTitle:{ color:'#ffffff',fontSize:18},
  userIcon:{  position:'absolute', top:height*0.1*0.55,left:10,},
  userIconPwd:{ position:'absolute', top:height*0.1*0.55,left:10,},
  userIconPwdEye:{ position:'absolute', top:height*0.1*0.55,left:width*0.6,zIndex:100},
  userRightIcon:{ position:'absolute', top:height*0.1*0.55,left:width*0.6, zIndex:100, },
  inputUserInfo:{ borderBottomWidth:1,borderBottomColor:'#D3DFEF',height:height*0.7*0.1, paddingLeft:30, paddingRight:50,marginTop:height*0.4*0.1},
  title:{  fontSize:23, color:'#3e4a59', paddingLeft:10,  marginBottom:-height*0.2*0.1,},
  login: {width: width*0.8, height: height*0.4,borderStyle: 'solid', marginTop:-height*0.4*0.1, borderRadius:5, backgroundColor:'#ffffff',
    //注意：这一句是可以让安卓拥有灰色阴影  elevation: 10, paddingHorizontal:16,paddingVertical:23,
     paddingHorizontal:16,paddingVertical:23,elevation: 10,},
  inputFlex:{flex:1,marginBottom:height*0.5*0.2},
  forgetPwd: { marginTop: height*0.4*0.1, flex: 1, alignItems: 'flex-end',marginBottom:height*0.6*0.1},
  loginContainer: {justifyContent:'center',alignItems:'center',},
  backgroundImage:{width:width, height:height*0.32, justifyContent: 'center', alignItems: 'center',},
  linearGradient: { alignItems:'center',borderRadius: 25,position:'relative'},
  linearGradientView: { justifyContent:'center',alignItems:'center', width:width*0.6, height:50,},
  loginBtn:{ color:'#ffffff', fontSize:20,},
  containerModal:{flex:1,position:'absolute',top:0,bottom:0,left:0,right:0, justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'},
  goBackLogin:{alignItems:'center',borderRadius:25,marginTop:40,},
  goBackLoginView:{width:width*0.6,height:50,justifyContent:'center',alignItems:'center',borderRadius:25,},
})