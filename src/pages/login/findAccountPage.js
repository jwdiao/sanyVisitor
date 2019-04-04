import React from 'react';
import {
  AsyncStorage, ScrollView, TextInput, TouchableOpacity,Modal,TouchableHighlight,TouchableNativeFeedback,
  Button,Alert,Dimensions,Image,View,Text, StyleSheet,ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Portal,
  WhiteSpace,WingBlank,Toast,Provider,} from '@ant-design/react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {px2dp} from "../../utils/ScreenUtil";
import {STATUS_BAR_HEIGHT,HEADER_HEIGHT} from '../../components/Header'
import Header from '../../components/Header'
// import Pop from 'rn-global-modal'
import { setStatusBar } from '../../components/HOC/StatusBar'
import {regSubmitNewPwd,regTelIsExist,regSendExpregNumber} from '../../http/api'
@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent'
})

export class FindAccountPage extends React.Component {
  // static navigationOptions = () => ({
     static navigationOptions = {
       header:null // 隐藏顶部导航栏
     };
    /*   static navigationOptions = () => ({
        headerTitle: '修改密码',
        titleCenter:true,
        headerStyle: {
          backgroundColor: '#4487d6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize:20,
        },
      }) */


  state = {
    isShowRegNum:false,  //获取验证码
    isShowSixthTimes:false,//倒计时
    isShowReNewPwd:false,//两次密码输入不一致
    sixthTimes:60,
    newPwd:'', //新密码
    telephone:'',//手机号
    exgRegText:'',//验证码

    reNewPwd:"",//重新输入密码
    modalVisible:false,//修改成功模态框
    isEditTel:true,//电话号码获取短信后是否可以编辑
  }




  render() {
    const leftV =  (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() =>this.props.navigation.navigate('Auth')} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <FontAwesome name={'angle-left'} size={32} color={"#fff"} style={styles.recordVisitorArrow} />
          <Text style={{color:'#fff',marginLeft:4,fontSize:16}}>返回</Text>
        </TouchableOpacity>
      </View>
    )
    const {sixthTimes,isEditTel,newPwd} = this.state
    let regNum = this.state.isShowRegNum ? <Text>获取验证码</Text> : null
    let sixthTimesText = this.state.isShowSixthTimes ? <Text>{sixthTimes}S</Text> : null
    let ReNewPwdText = this.state.isShowReNewPwd ? <Text>两次密码输入不一致</Text> : null
    let ReNewPwdView = this.state.isShowReNewPwd ? <TextInput clearButtonMode='always' defaultValue={this.state.reNewPwd} secureTextEntry  onChangeText={this._reNewPwdChange} onBlur={this._reNewPwdBlur}/>
      : <TextInput clearButtonMode='always' defaultValue={this.state.reNewPwd} secureTextEntry placeholder="请确认新密码" onChangeText={this._reNewPwdChange} onBlur={this._reNewPwdBlur}/>
    const {height,width} = Dimensions.get('window')
    return (
    <ScrollView style={styles.pageBG}
      contentContainerStyle={{flex:1}}
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps='never'>
        <ImageBackground source={require('../../assets/images/head_bg2.png')} style={styles.backgroundImage}>          
          <Header title="信息录入" left={leftV} fullScreen />
        </ImageBackground>
        <View>
          <View style={styles.inputsTextFirst}>
            {/*clearButtonMode='white-editing'*/}
            <TextInput  secureTextEntry={false}  placeholder="请输入登录账号域名或手机号"/>
          </View>
          <View style={styles.inputsText}>
            <TextInput  secureTextEntry={false} keyboardType='number-pad' //键盘只显示数字
                       placeholder="请输入手机号" maxLength={11} editable={isEditTel} onChangeText={this._telephoneChage}/>
            <Text style={styles.reqRegNum} onPress={this._clickReqRegNum}>{regNum}</Text>
            <Text style={styles.reqRegNumTime}>{sixthTimesText}</Text>
          </View>
          <View style={styles.inputsText}>
            <TextInput secureTextEntry={false}  placeholder="请输入验证码" keyboardType='number-pad' onChangeText={this._regExpNumChage}/>
          </View>
          <View style={styles.inputsText}>
            <TextInput  defaultValue={newPwd}  secureTextEntry placeholder="请输入新密码" onChangeText={this._newPwdChange}/>
          </View>
          <View style={styles.inputsText}>
            {ReNewPwdView}
            <Text style={styles.isTwoPwdSame} onPress={this._reNewPwdFocus}>{ReNewPwdText}</Text>
          </View>
          <View style={styles.pwdSix}>
            <Text>密码由6位数字组成</Text>
          </View>
          <WingBlank>
            <View style={{alignItems:"center"}}>
              <LinearGradient colors={['#09B6FD', '#6078EA']} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.submitStyle}>
                <TouchableNativeFeedback  onPress={this._findPassword}>
                  <View style={styles.submitStyleView} disabled={true}>
                    <Text style={{color:'#fff',fontSize:20}}>确定</Text>
                  </View>
                </TouchableNativeFeedback>
              </LinearGradient>
            </View>
          </WingBlank>

          {/*密码重置成功后弹出模态框*/}
          <View>
            <Modal  transparent maskClosable
                   onClose={this.onClose}
                   closable
                   visible={this.state.modalVisible} onPress={()=>{this._setModalVisible(!this.state.modalVisible)}}
                   onRequestClose={()=>{alert('modal closeed')}}>
              <View style={styles.containerModal}>
                <View style={{width:width*0.8,height:height*0.6,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                  <Image source={require('../../assets/images/edtiSuccess/editSuccess.png')}/>
                  <Text style={styles.closeModal} onPress={this._closeModalClick}>X</Text>
                  <Text style={{fontSize:22,fontWeight:'bold'}}>修改成功</Text>
                  <Text style={{fontSize:16,}}>您的密码已经修改生效，请重新登录</Text>
                  <TouchableHighlight style={{flex:1}} activeOpacity={1} onPress={this._goBackLogin}>
                    <LinearGradient colors={['#09B6FD', '#6078EA']} start={{x:0,y:0}} end={{x:1,y:0}} style={[styles.goBackLogin,{width:width*0.5}]}>
                      <Text  style={{fontSize:20,color:'#fff'}}>登录</Text>
                    </LinearGradient>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
          {/*/*必须放在最外层View的底部*/}
          {/* <Toast ref='toast' position='center'/> */}
        </View>
    </ScrollView>
    );
  }
  //点击确定按钮
  _findPassword = async () => {
    const {newPwd,telephone,exgRegText} = this.state
    //提交修改信息给后台
    regSubmitNewPwd(newPwd,exgRegText,telephone).then(res=>{
      if(res&&res.code===200){
        console.warn('res:',res.code)
        //修改成功后出现模态框
        this._setModalVisible(true)
        //清空输入框内容
      }else{
        Alert.alert(res.msg)
      }
    }).catch(res=>{
      Toast.info('修改失败',3)
    })



  };
  //点击登录按钮
  _goBackLogin = () => {
    this._setModalVisible(false)
    this.props.navigation.navigate('Auth')
  }
  //点击模态框的X关闭
  _closeModalClick = () => {
    this._setModalVisible(false)
  }
  //输入电话号码改变input 的值触发事件
  _telephoneChage = (Text) => {
    this.state.telephone = Text
    if(Text.length === 11){
      regTelIsExist(Text).then(res=>{
        // console.warn('res:',res)
        this.setState({isShowRegNum:true})
      })
    }else{
      this.setState({isShowRegNum:false})
    }
  };
  //输入验证码的值
  _regExpNumChage = (Text) => {
    this.state.exgRegText = Text
  }
  //点击获取验证码
  _clickReqRegNum = () => {
    regSendExpregNumber(this.state.telephone).then(res=>{

      this.setState({isShowRegNum:false,isShowSixthTimes:true,isEditTel:false})
      //发送短信的逻辑，与后台交互  如果切换到后台倒计时不受影响时，给增加时间戳
      /*const now = Date.now()
      const overTimerStamp = now + timeCount * 1000 + 100
      定时器内部判断
      if(now>=overTimerStamp){}else{}
      * */
      // this.refs.toast.show('验证码已发送')
      // Toast.loading('验证码已发送');
      // Portal.remove(key);
      let timeCount = this.state.sixthTimes
      let timers = setInterval(()=>{
        timeCount--;
        this.setState({sixthTimes:timeCount})
        if(timeCount<=0){
          timeCount = 60
          clearInterval(timers)
          this.setState({isShowRegNum:true,isShowSixthTimes:false,sixthTimes:timeCount,isEditTel:true})
        }
      },1000)
      //出现倒计时60s，倒计时结束再次出现获取验证码
      //在倒计时期间，不能点击确定按钮

    }).catch(error=>{

    })
  };

  //两次密码不一致
  _reNewPwdBlur = () => {
    let {newPwd,reNewPwd} = this.state
    // console.warn('newPwd',reNewPwd)
    if(newPwd!==reNewPwd){
      reNewPwd = ''
      this.setState({isShowReNewPwd:true})
      this.setState({reNewPwd})
    }
  }
  //两次密码输入时
  _newPwdChange = (newPwdNum) => {this.setState({newPwd:newPwdNum})}
  _reNewPwdChange = (reNewPwdNum) => {this.setState({reNewPwd:reNewPwdNum,isShowReNewPwd:false})}
  _reNewPwdFocus = () => {this.setState({isShowReNewPwd:false})}
  ///
  _setModalVisible = (visible) => {
    this.setState({modalVisible:visible})
  }
}

const {height,width} = Dimensions.get('window')
const styles = StyleSheet.create({
  backgroundImage: {
    width:'100%',
    height:px2dp(128),
  },
  pageBG:{backgroundColor:'#f4f5fa',},
  inputsTextFirst: {marginTop:20,backgroundColor:'#fff',paddingLeft:10},
  inputsText: {backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#EEE',paddingLeft:10},
  pwdSix:{marginTop:20,marginLeft:20,},
  submitStyle:{marginTop:100,borderRadius:25,alignItems:'center',},
  submitStyleView:{justifyContent:'center',alignItems:'center',width:width*0.7,height:50,},
  reqRegNum:{position:'absolute',top:15,right:15,color:'#468BD9'},
  reqRegNumTime:{position:'absolute',top:15,right:15,color:'#ff0000'},
  isTwoPwdSame:{position:'absolute',top:15,left:15,color:'#ff0000'},
  containerModal:{flex:1,position:'absolute',top:0,bottom:0,left:0,right:0, justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'},
  goBackLogin:{width:'70%',height:50,marginTop:40,justifyContent:'center',alignItems:'center',backgroundColor:'#468BD9',borderRadius:25,},
  closeModal:{position:'absolute',top:20,right:20,fontSize:20,},
})


export default ()=>(
  <Provider>
    <FindAccountPage/>
  </Provider>

)
