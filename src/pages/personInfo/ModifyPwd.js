import React from 'react';
import {
  AsyncStorage,StyleSheet,Dimensions,Modal,Image,ScrollView,TouchableNativeFeedback,
  View,Text,TextInput,TouchableOpacity,ImageBackground,Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {px2dp} from "../../utils/ScreenUtil";
import {STATUS_BAR_HEIGHT,HEADER_HEIGHT} from '../../components/Header'
import Header from '../../components/Header'
import { setStatusBar } from '../../components/HOC/StatusBar'
@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent'
})
export class ModifyPwdScreen extends React.Component {
  static navigationOptions = {
    header: null
    /* title: '修改密码',
    titleCenter:true,
    headerStyle: {
      backgroundColor: '#468BD9',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize:20,
    }, */
  };
  state = {
    newPwdValue:'',
    reNewPwdValue:'',
    isShowReNewPwd:false,//是否显示提示
  }

  render() {
    const leftV =  (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() =>this.props.navigation.goBack()} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <FontAwesome name={'angle-left'} size={32} color={"#fff"} style={styles.recordVisitorArrow} />
          <Text style={{color:'#fff',marginLeft:4,fontSize:16}}>返回</Text>
        </TouchableOpacity>
      </View>
    )
    let ReNewPwdText = this.state.isShowReNewPwd ? <Text>两次密码不一致请重新输入</Text> : null
    let ReNewPwdView = this.state.isShowReNewPwd ? <TextInput style={styles.inputTextPwdTopAndBottom} defaultValue={this.state.reNewPwdValue}  secureTextEntry  onChangeText={this._reNewPwdChange} onBlur={this._reNewPwdBlur}/>
      : <TextInput style={styles.inputTextPwdTopAndBottom} defaultValue={this.state.reNewPwdValue} placeholder="请再次输入密码"  secureTextEntry  onChangeText={this._reNewPwdChange} onBlur={this._reNewPwdBlur}/>
    return (
      <ScrollView
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='never'>
      <View style={{backgroundColor:'#f3f3f3',height:height}}>
        <ImageBackground source={require('./img/head_bg2.png')} style={styles.backgroundImage}>          
          <Header title="修改密码" left={leftV} fullScreen />
        </ImageBackground>
        <View>
          <View style={{marginTop:20,}}>
            <Text style={styles.pwdPosition}>原始密码</Text>
            <TextInput style={styles.inputTextPwdTopAndBottom} placeholder="请输入原始密码" secureTextEntry/>
          </View>
          <View>
            <Text style={styles.pwdPosition}>新密码</Text>
            <TextInput style={styles.inputTextPwd}  Value={this.state.newPwdValue} placeholder="请输入新密码至少6位" secureTextEntry onChangeText={this._NewPwdChange}/>
          </View>
          <View>
            <Text style={styles.pwdPosition}>确认新密码</Text>
            {ReNewPwdView}
            <Text style={{color:'#ff0000',position:'absolute',top:15,right:15,fontSize:16}} onPress={this._pressRedText}>{ReNewPwdText}</Text>
          </View>
          <View style={{alignItems:'center',marginTop:200,}}>
            <LinearGradient colors={['#09B6FD', '#6078EA']} start={{x:0,y:0}} end={{x:1,y:0}} style={[styles.submitLogin,{marginTop:20}]} >
              <TouchableNativeFeedback onPress={this._signOutAsync}>
                <View style={styles.submitLoginView}>
                  <Text style={{color:'#fff',fontSize:18}}>确定</Text>
                </View>
              </TouchableNativeFeedback>
            </LinearGradient>

          </View>
        </View>
      </View>
    </ScrollView>
    );
  }
   _signOutAsync = async () => {
    await AsyncStorage.clear();
    // this.props.navigation.navigate('Auth');
     this.props.navigation.navigate('ModifyPwdSuccess');
  };
  _nowSignIn = () => {
    this.props.navigation.navigate('Auth');
  }
  _NewPwdChange = (newPwd) => {this.setState({newPwdValue:newPwd,isShowReNewPwd:false})}
  _reNewPwdChange = (reNewPwd) => {this.setState({reNewPwdValue:reNewPwd,isShowReNewPwd:false})}
  _reNewPwdBlur = () => {
    let {newPwdValue,reNewPwdValue} = this.state
    if(newPwdValue!==reNewPwdValue){
      reNewPwdValue = ''
      this.setState({reNewPwdValue,isShowReNewPwd:true})
    }else{
      this.setState({isShowReNewPwd:false})
    }
  }
  _pressRedText = () => {this.setState({isShowReNewPwd:false})}
}

let {width,height} = Dimensions.get('window')


const styles = StyleSheet.create({
  backgroundImage: {
    width:'100%',
    height:px2dp(128),
  },
  inputTextPwd:{borderTopWidth:1,borderTopColor:'#f0f0f0',borderBottomWidth:1,borderBottomColor:'#f0f0f0',paddingLeft:100,backgroundColor:'#fff',textAlign:'right',paddingRight:20},
  inputTextPwdTopAndBottom:{paddingLeft:100,backgroundColor:'#fff',textAlign:'right',paddingRight:20},
  pwdPosition:{position:'absolute',top:15,left:5,fontSize:16,paddingLeft:10,zIndex:1000},
  submitLogin:{alignItems:'center',borderRadius:25,},
  submitLoginView:{width:width*0.7,height:50,justifyContent:'center',alignItems:'center',},
  containerModal:{flex:1,position:'absolute',top:0,bottom:0,left:0,right:0, justifyContent:'flex-end',alignItems:'center'},
})