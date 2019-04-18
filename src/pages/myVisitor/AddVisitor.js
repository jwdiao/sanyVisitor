import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Button, Drawer, List, WhiteSpace } from '@ant-design/react-native';
import {px2dp} from "../../utils/ScreenUtil";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import * as visitorActions from '../../redux/actions/visitorActions'
import {DrawerActions} from "react-navigation";
import {reqrRegIDCard} from '../../http/api'

import {STATUS_BAR_HEIGHT,HEADER_HEIGHT} from '../../components/Header'
import Header from '../../components/Header'
import { setStatusBar } from '../../components/HOC/StatusBar'
@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent'
})
export class AddVisitorScreen extends React.Component {
  /* static navigationOptions = ({navigation}) =>{
    return ({
      headerLeft: function(){
        return (
          <TouchableOpacity activeOpacity={1} onPress={() =>navigation.goBack()}>
          <View style={{display:'flex',flexDirection: 'row',justifyContent: 'center',alignItem: 'center',paddingLeft: 15}}>
            <FontAwesome name={'angle-left'} size={30} color={'#fff'} />
            <Text style={{color:'#fff',fontSize: 18,paddingTop: 4,paddingLeft: 4}}>返回</Text>
          </View>
          </TouchableOpacity>
        )
      },
    })
  } */
  constructor(props) {
    super(props);
    this.state = {
      uName: '', // 姓名
      tel: '', // 手机号
      cardId: '', // 身份证号
      carId: '', // 车牌
      nameErrorInfo: '', // 姓名错误提示信息
      telErrorInfo: '', // 电话号码错误提示信息
      cardIdErrorInfo: '', // 身份证号错误提示信息
      carErrorInfo: '', // 车牌号错误提示信息
    }
  }
  componentDidMount () {}
  // 保存并新增按钮
  _saveAndAdd = () => {
    const uNameStatus = this.checkName(this.state.uName)
    const telStatus = this.checkTel(this.state.tel)
    const cardIdStatus = this.checkCardId(this.state.cardId)
    const carIdStatus = this.checkCarId(this.state.carId)
    // if(uNameStatus&&telStatus&&cardIdStatus&&carIdStatus) {
      let visitorInfoObj = {
        id: '002'+Math.random(),
        uName: this.state.uName,
        tel: this.state.tel,
        cardId: this.state.cardId,
        carId: this.state.carId,
        isChecked: false
      }
      Alert.alert('新增成功！','继续添加吧！')
      this.props.addPersonProps(visitorInfoObj)

      // 新增后清空继续新增
      this.setState({
        uName: '',
        tel: '',
        cardId: '',
        carId: ''
      })
    // }
  }
  _saveAndBack = async () => {
    const uNameStatus = this.checkName(this.state.uName)
    const telStatus = this.checkTel(this.state.tel)
    const cardIdStatus = this.checkCardId(this.state.cardId)
    const carIdStatus = this.checkCarId(this.state.carId)
    // if(uNameStatus&&telStatus&&cardIdStatus&&carIdStatus) {

      let visitorInfoObj = {
        id: '001'+Math.random(),
        uName: this.state.uName,
        tel: this.state.tel,
        cardId: this.state.cardId,
        carId: this.state.carId,
        isChecked: false
      }
      this.props.addPersonProps(visitorInfoObj)
      // this.props.navigation.navigate('RecordVisitor');
      // 新增后清空继续新增
      this.setState({
        uName: '',
        tel: '',
        cardId: '',
        carId: ''
      })
      this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }
  // }
  

  // 校验访客姓名  
  checkName (uName) {
    if (uName=='') {
      this.setState({
        nameErrorInfo:'请输入姓名'
      })
      return false
    }
    return true
  }
  // 手机号码校验
  checkTel (tel) {
    if(tel && tel.length === 11){
      if(!(/^1[3456789]\d{9}$/.test(tel))){
        this.setState({
          telErrorInfo: '手机号码格式错误，请重新输入',
          tel: ''
        })
        return false
      }
      return true
    }else {
      this.setState({
        telErrorInfo: '请输入11位手机号码',
        tel: ''
      })
      return false
    }
  }
  // 身份号码校验
  checkCardId (CardId) {
    if(CardId.length === 15){
      if(!/(^\d{15}$)/.test(CardId)){
        this.setState({
          cardIdErrorInfo: '身份证号码格式错误，请重新输入',
          cardId: ''
        })
        return false
      } else {
        reqrRegIDCard(CardId).then(res=> {
          if(res&&res.code===200){
            return true
          } else {
            this.setState({
              cardIdErrorInfo: res.msg,
              cardId: ''
            })
            return false
          }
        }).catch(res=>{
          // 获取数据失败
          this.setState({
            cardIdErrorInfo: '服务器错误',
            cardId: ''
          })
          return false
        }) 
      }
    }else if(CardId.length === 18){
      if(!/(^\d{17}([0-9]|x|X)$)/.test(CardId)){
        this.setState({
          cardIdErrorInfo: '身份证号码格式错误，请重新输入',
          cardId: ''
        })
        return false
      } else {
        reqrRegIDCard(CardId).then(res=> {
          if(res&&res.code===200){
            return true
          } else {
            this.setState({
              cardIdErrorInfo: res.msg,
              cardId: ''
            })
            return false
          }
        }).catch(res=>{
          // 获取数据失败
          this.setState({
            cardIdErrorInfo: '服务器错误',
            cardId: ''
          })
          return false
        }) 
      }
    }else{
      this.setState({
        cardIdErrorInfo: '请输入15位或18位身份证号码',
        cardId: ''
      })
      return false
    }

    
  }
  // 车牌校验
  checkCarId (CarCardNum) {
    var PTNumExpress = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    var XNYumExpress = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-Z0-9][0-9]{4}$))/;
    if(CarCardNum.length === 7){
      if(!(PTNumExpress.test(CarCardNum))){
        this.setState({
          carErrorInfo: '车牌号码格式错误，请重新输入',
          carId: ''
        })
        return false
      }
      return true
    }else if(CarCardNum.length === 8){
      if(!(XNYumExpress.test(CarCardNum))){
        this.setState({
          carErrorInfo: '车牌号码格式错误，请重新输入',
          carId: ''
        })
        return false
      }
      return true
    }else{
      this.setState({
        carErrorInfo: '请输入7位或8位车牌号码',
        carId: ''
      })
      return false
    }
  }

  handleNameEndEditingFun= (event) => {
    // console.log(event.nativeEvent.text)
    const inputValue = event.nativeEvent.text
    this.checkName(inputValue)
  }
  handleNameFocusFun= (event) => {
    // console.log(event.nativeEvent.text)
    this.setState({
      nameErrorInfo: ''
    })
  }
  // 手机号码校验
  handleTelEndEditingFun= (event) => {
    // console.log(event.nativeEvent.text)
    const inputValue = event.nativeEvent.text
    this.checkTel(inputValue)
  }
  handleTelFocusFun= (event) => {
    // console.log(event.nativeEvent.text)
    this.setState({
      telErrorInfo: ''
    })
  }
  // 身份号码校验
  handleCardIdEndEditingFun= (event) => {
    // console.log(event.nativeEvent.text)
    const inputValue = event.nativeEvent.text
    this.checkCardId(inputValue)
  }
  handleCardIdFocusFun= (event) => {
    // console.log(event.nativeEvent.text)
    this.setState({
      cardIdErrorInfo: ''
    })
  }
  // 车牌校验
  handleCarEndEditingFun= (event) => {
    // console.log(event.nativeEvent.text)
    const inputValue = event.nativeEvent.text
    this.checkCarId(inputValue)
  }
  handleCarFocusFun= (event) => {
    // console.log(event.nativeEvent.text)
    this.setState({
      carErrorInfo: ''
    })
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
        <View style={styles.addVisitorWrapper}>
          <ImageBackground source={require('../../assets/images/head_bg2.png')} style={styles.backgroundImage}>          
            <Header title="信息录入" left={leftV} fullScreen />
          </ImageBackground>
          <View style={styles.addVisitorForm}>
            <View style={styles.addVisitorItem}>
              <Text style={styles.addVisitorItemLabel}>访客名称</Text>
              <TextInput
                style={[{opacity:this.state.nameErrorInfo==''?1:0},styles.addVisitorItemInput]}
                placeholder="请输入姓名"
                value={this.state.uName}
                onChangeText={(uName) => this.setState({uName})}
                onEndEditing={this.handleNameEndEditingFun}
                onFocus={this.handleNameFocusFun}
              />
              {!!this.state.nameErrorInfo && (<Text style={styles.errorText}>{this.state.nameErrorInfo}</Text>)}
            </View>
            <View style={styles.addVisitorItem}>
              <Text style={styles.addVisitorItemLabel}>电话号码</Text>
              <TextInput
                style={[{opacity:this.state.telErrorInfo==''?1:0},styles.addVisitorItemInput]}
                placeholder='请输入电话号码'
                keyboardType='number-pad'
                value={this.state.tel}
                onChangeText={(tel) => this.setState({tel})}
                onEndEditing={this.handleTelEndEditingFun}
                onFocus={this.handleTelFocusFun}
              />
              {!!this.state.telErrorInfo && (<Text style={styles.errorText}>{this.state.telErrorInfo}</Text>)}

            </View>
            <View style={styles.addVisitorItem}>
              <Text style={styles.addVisitorItemLabel}>身份号码</Text>
              <TextInput
                style={[{opacity:this.state.cardIdErrorInfo==''?1:0},styles.addVisitorItemInput]}
                placeholder="请输入身份证号"
                keyboardType='number-pad'
                value={this.state.cardId}
                onChangeText={(cardId) => this.setState({cardId})}
                onEndEditing={this.handleCardIdEndEditingFun}
                onFocus={this.handleCardIdFocusFun}
              />
              {!!this.state.cardIdErrorInfo && (<Text style={styles.errorText}>{this.state.cardIdErrorInfo}</Text>)}
            </View>
            <View style={styles.addVisitorItem}>
              <Text style={styles.addVisitorItemLabel}>驾车车牌</Text>
              <TextInput
                style={[{opacity:this.state.carErrorInfo==''?1:0},styles.addVisitorItemInput]}
                placeholder="请输入车牌号"
                value={this.state.carId}
                onChangeText={(carId) => this.setState({carId})}
                onEndEditing={this.handleCarEndEditingFun}
                onFocus={this.handleCarFocusFun}
              />
              {!!this.state.carErrorInfo && (<Text style={styles.errorText}>{this.state.carErrorInfo}</Text>)}
            </View>
          </View>
          <View style={styles.addVisitorBtnBox}>
            <TouchableHighlight onPress={this._saveAndAdd} style={styles.addVisitorBtnAddBox}>
              <LinearGradient
              start={{x: 0, y: 0}} end={{x: 1, y: 0}}
              colors={['#09B6FD', '#6078EA']}
              style={styles.addVisitorBtnAdd}>
                <Text style={styles.addVisitorBtnAddText}>保存并新增</Text>
              </LinearGradient>
            </TouchableHighlight>
            <Text
            onPress={this._saveAndBack}
            style={styles.addVisitorBtnBack}>保存并返回</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

}


const mapStateToProps = (state, ownProps)=>{
  return {};
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addPersonProps: (person) => dispatch(visitorActions.AddPersonAction(person)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVisitorScreen);

const styles = StyleSheet.create({
  backgroundImage: {
    width:'100%',
    // height:px2dp(128),
  },
  addVisitorWrapper: {
    backgroundColor: '#f3f3f3',
    display: 'flex',
    flex: 1,
  },
  addVisitorForm: {
    backgroundColor: '#fff',
    paddingLeft: px2dp(20),
    paddingTop: px2dp(15)
  },
  addVisitorItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#F3F3F3',
    paddingLeft: px2dp(20),
    paddingRight: px2dp(48),
    opacity: 0.7,
    height: px2dp(84),
    
  },
  addVisitorItemLabel: {
    fontSize: px2dp(28),
    color: '#1A1A1A',
    opacity: 0.9,
    
  },
  addVisitorItemInput: {
    fontSize: px2dp(30),
    position:'relative',
    textAlign:'right'
  },
  addVisitorBtnBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0,
  },
  addVisitorBtnAddBox: {
    flex: 1
  },
  addVisitorBtnAdd: {
    textAlign: 'center',
  },
  addVisitorBtnAddText: {
    textAlign: 'center',
    fontSize: px2dp(32),
    color: '#fff',
    height: px2dp(88),
    lineHeight: px2dp(88),
  },
  addVisitorBtnBack: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#fff',
    fontSize: px2dp(32),
    color: '#333333',
    height: px2dp(88),
    lineHeight: px2dp(88),
  },
  errorText: {
    color:'red',position:'absolute',right:px2dp(48),top:12,zIndex:-1
  }
})