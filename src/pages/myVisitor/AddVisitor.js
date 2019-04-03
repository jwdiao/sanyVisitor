import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
// import { Button, Drawer, List, WhiteSpace } from '@ant-design/react-native';
import {px2dp} from "../../utils/ScreenUtil";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      uName: '',
      tel: '',
      cardId: '',
      carId: ''
    }
  }
  _saveAndAdd = () => {
    let visitorInfoObj = {
      uName: this.state.uName,
      tel: this.state.tel,
      cardId: this.state.cardId,
      carId: this.state.carId
    }
    alert('新增成功！')
    // 调用接口新增一条

    // 新增后清空继续新增
    this.setState({
      uName: '',
      tel: '',
      cardId: '',
      carId: ''
    })
  }
  _saveAndBack = async () => {
    let visitorInfoObj = {
      uName: this.state.uName,
      tel: this.state.tel,
      cardId: this.state.cardId,
      carId: this.state.carId
    }
    // alert('新增成功！')
    // 调用接口新增多条
    this.props.navigation.navigate('RecordVisitor');
  }
  
/* 
<Drawer
          sidebar={sidebar}
          position="right"
          open={true}
          drawerRef={el => (this.drawer = el)}
          onOpenChange={this.onOpenChange}
          drawerBackgroundColor="#ccc"
        >
        <View>
          <Button onPress={() => this.drawer && this.drawer.openDrawer()}>
            Open drawer
          </Button>
          <WhiteSpace />
        </View>
      </Drawer>
*/

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
      
      <View style={styles.addVisitorWrapper}>
        <ImageBackground source={require('./img/head_bg2.png')} style={styles.backgroundImage}>          
          <Header title="信息录入" left={leftV} fullScreen />
        </ImageBackground>
        <View style={styles.addVisitorForm}>
          <View style={styles.addVisitorItem}>
            <Text style={styles.addVisitorItemLabel}>访客名称</Text>
            <TextInput
              style={styles.addVisitorItemInput}
              placeholder="请输入姓名"
              onChangeText={(uName) => this.setState({uName})}
            />
          </View>
          <View style={styles.addVisitorItem}>
            <Text style={styles.addVisitorItemLabel}>电话号码</Text>
            <TextInput
              style={styles.addVisitorItemInput}
              placeholder="请输入电话号码"
              onChangeText={(tel) => this.setState({tel})}
            />
          </View>
          <View style={styles.addVisitorItem}>
            <Text style={styles.addVisitorItemLabel}>身份号码</Text>
            <TextInput
              style={styles.addVisitorItemInput}
              placeholder="请输入身份证号"
              onChangeText={(cardId) => this.setState({cardId})}
            />
          </View>
          <View style={styles.addVisitorItem}>
            <Text style={styles.addVisitorItemLabel}>驾车车牌</Text>
            <TextInput
              style={styles.addVisitorItemInput}
              placeholder="请输入车牌号"
              onChangeText={(carId) => this.setState({carId})}
            />
          </View>
        </View>
        <View style={styles.addVisitorBtnBox}>
          <TouchableNativeFeedback onPress={this._saveAndAdd}>
            <LinearGradient colors={['#09B6FD', '#6078EA']} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.addVisitorBtnAdd}>
              <Text style={styles.addVisitorBtnAddText}>保存并新增</Text>
            </LinearGradient>
          </TouchableNativeFeedback>
          <Text
          onPress={this._saveAndBack}
          style={styles.addVisitorBtnBack}>保存并返回</Text>
        </View>
        {/*<Drawer
            sidebar={sidebar}
            position="right"
            open={true}
            drawerRef={el => (this.drawer = el)}
            onOpenChange={this.onOpenChange}
            drawerBackgroundColor="#ccc"
          >
          <View>
            <Button onPress={() => this.drawer && this.drawer.openDrawer()}>
              Open drawer
            </Button>
            <WhiteSpace />
          </View>
        </Drawer>*/}
      </View>
    );
  }

}
const styles = StyleSheet.create({
  backgroundImage: {
    width:'100%',
    height:px2dp(128),
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
  addVisitorBtnAdd: {
    flex: 1,
    textAlign: 'center',
    backgroundColor:'#6078ea',
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
  }
})