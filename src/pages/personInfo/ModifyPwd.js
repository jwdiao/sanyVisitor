import React from 'react';
import {
  AsyncStorage,StyleSheet,Dimensions,Modal,Image,ScrollView,TouchableNativeFeedback,TouchableHighlight,
  View,Text,TextInput,TouchableOpacity,ImageBackground,Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {px2dp} from "../../utils/ScreenUtil";
import {STATUS_BAR_HEIGHT,HEADER_HEIGHT} from '../../components/Header'
import Header from '../../components/Header'

import {reqModifyPwd} from '../../http/api'
import { setStatusBar } from '../../components/HOC/StatusBar'
import storage from '../../storage/RNAsyncStorage'
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
    orginalPassword:'',///原始密码
    newPwdValue:'',  ///新密码
    reNewPwdValue:'',  //重新输入新密码
    isShowReNewPwd:false,//是否显示提示
	    userNo:'',
		oldPwdValue:'',
		modalVisible:false
  }
  componentDidMount(){
	this. _readuserNo()
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
            {/*<TextInput style={styles.inputTextPwdTopAndBottom} value={this.state.orginalPassword} placeholder="请输入原始密码" secureTextEntry onChangeText={this._orginalPwdChange}/>*/}
            <TextInput style={styles.inputTextPwdTopAndBottom} placeholder="请输入原始密码" secureTextEntry onChangeText={this._OldPwdChange}/>
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
              <TouchableOpacity onPress={this._signOutAsync}>
                <View style={styles.submitLoginView}>
                  <Text style={{color:'#fff',fontSize:18}}>确定</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>

          </View>
        </View>
      </View>
			{/*修改密码失败模态框*/}
			<View>
			  <Modal animationType='fade' transparent maskClosable visible={this.state.modalVisible}
			          onRequestClose={()=>{alert('modal closeed')}}>
			    <View style={styles.containerModal}>
			      <View style={{width:width*0.8,height:height*0.35,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',borderRadius:10,}}>
			        <Text style={{fontSize:24,fontWeight:'bold',marginBottom:20,}}>修改失败</Text>
			        <Text style={{fontSize:18,}}>输入的有一个或多个错误</Text>
			        <LinearGradient colors={['#09B6FD', '#6078EA']} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.goBackLogin}>
			          <TouchableHighlight onPress={this._goBackLogin}>
			            <View style={styles.goBackLoginView}>
			              <Text  style={{fontSize:20,color:'#fff',}}>确定</Text>
			            </View>
			          </TouchableHighlight>
			        </LinearGradient>
			
			      </View>
			    </View>
			  </Modal>
			</View>
    </ScrollView>
    );
  }
   _signOutAsync = async () => {
    await AsyncStorage.clear();

		 if(!this.state.isShowReNewPwd){
			  console.log(this.state.userNo)
			  reqModifyPwd(this.state.userNo,this.state.oldPwdValue,this.state.reNewPwdValue).then(res=> {
				console.log(res)
			    if(res&&res.code===200){
			      this.props.navigation.navigate('ModifyPwdSuccess');
			 		 
			    }else{
			  		this.setState({modalVisible:true})
			  	}
			    //this.props.navigation.navigate('Main');
			  }).catch(res=>{
			    // 登录失败时，弹出模态框
			    //this.setState({modalVisible:true})
			  })
			 //await AsyncStorage.clear();
			 // this.props.navigation.navigate('Auth');
			  //this.props.navigation.navigate('ModifyPwdSuccess');
		 }else{
			  this.setState({modalVisible:true})
		 }
		
  };
  _readuserNo = () =>{
	    storage.load({
	             key: 'loginState',
	             // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
	             autoSync: true,
	             // syncInBackground(默认为true)意味着如果数据过期，
	             // 在调用sync方法的同时先返回已经过期的数据。
	             // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
	             syncInBackground: true,
	    
	             // 你还可以给sync方法传递额外的参数
	             syncParams: {
	                 extraFetchOptions: {
	                     // 各种参数
	                 },
	                 someFlag: true,
	             },
	         }).then(ret => {
	             // 如果找到数据，则在then方法中返回
	             // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
	             // 你只能在then这个方法内继续处理ret数据
	             // 而不能在then以外处理
	             // 也没有办法“变成”同步返回
	             // 你也可以使用“看似”同步的async/await语法
	             this.setState({userNo:ret.userNo,});
	         }).catch(err => {
	             //如果没有找到数据且没有sync方法，
	             //或者有其他异常，则在catch中返回
	             console.warn(err.message);
	             switch (err.name) {
	                 case 'NotFoundError':
	                     // TODO;
	                     this.setState({ data: 'NotFoundError' });
	                     break;
	                 case 'ExpiredError':
	                     this.setState({ data: 'ExpiredError' });
	                     break;
	             }
	         })
  }
	_goBackLogin = () => {
		this.setState({modalVisible:false})
	}
  _nowSignIn = () => {
    this.props.navigation.navigate('Auth');
  }
	_OldPwdChange = (newPwd) =>{this.setState({oldPwdValue:newPwd})}
  _NewPwdChange = (newPwd) => {this.setState({newPwdValue:newPwd,isShowReNewPwd:false})}
  //原始密码
  _orginalPwdChange = (orgPwd) => {this.setState({orginalPassword:orgPwd})}
  //
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
	containerModal:{flex:1,position:'absolute',top:0,bottom:0,left:0,right:0, justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'},
	goBackLogin:{alignItems:'center',borderRadius:25,marginTop:40,},
	goBackLoginView:{width:width*0.6,height:50,justifyContent:'center',alignItems:'center',borderRadius:25,},
})