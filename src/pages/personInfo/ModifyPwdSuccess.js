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
export class ModifyPwdSuccessScreen extends React.Component {
  static navigationOptions = {
    header: null

  };
  state = {
    newPwdValue:'',
    reNewPwdValue:'',
    isShowReNewPwd:false,//是否显示提示
    isModalVisible:true,//修改成功后弹出的模态框
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


    return (
      <ScrollView
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='never'>
      <View style={{backgroundColor:'#f3f3f3',height:height}}>
        <ImageBackground source={require('./img/head_bg2.png')} style={styles.backgroundImage}>          
          <Header title="修改密码" left={leftV} fullScreen />
        </ImageBackground>
        <View style={styles.containerModal}>
          <View style={{width:width,height:height*0.9,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
            <Image style={{marginTop:-110,marginBottom:50}} source={require('../../assets/images/edtiSuccess/gologin.png')}/>
            <Text style={{fontSize:16,marginBottom:120,}}>您已经成功更改密码，请使用新密码登录</Text>
            <LinearGradient colors={['#09B6FD', '#6078EA']} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.submitLogin}>
              <TouchableNativeFeedback onPress={this._nowSignIn}>
                <View style={styles.submitLoginView}>
                  <Text style={{color:'#fff',fontSize:18}}>现在登录</Text>
                </View>
              </TouchableNativeFeedback>
            </LinearGradient>
          </View>
        </View>
      </View>
    </ScrollView>
    );
  }

  _nowSignIn = () => {
    this.props.navigation.navigate('Auth');
  }
}

let {width,height} = Dimensions.get('window')


const styles = StyleSheet.create({
  backgroundImage: {
    width:'100%',
    height:px2dp(128),
  },
  submitLogin:{alignItems:'center',borderRadius:25,},
  submitLoginView:{width:width*0.7,height:50,justifyContent:'center',alignItems:'center',},
  containerModal:{flex:1,position:'absolute',top:0,bottom:0,left:0,right:0, justifyContent:'flex-end',alignItems:'center'},
})