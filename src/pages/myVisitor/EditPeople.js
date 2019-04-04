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
import { Button, Drawer, List, WhiteSpace } from '@ant-design/react-native';
import {px2dp} from "../../utils/ScreenUtil";
// import LinearGradient from 'react-native-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import * as visitorActions from '../../redux/actions/visitorActions'

import {STATUS_BAR_HEIGHT,HEADER_HEIGHT} from '../../components/Header'
import Header from '../../components/Header'
import { setStatusBar } from '../../components/HOC/StatusBar'

@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent'
})
export class EditVisitorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uName: '',
      tel: '',
      cardId: '',
      carId: ''
    }
  }
  componentDidMount () {
    const {
      uName, tel, cardId, carId
    } = this.props.currentPeopleObjProps
    this.setState({
      uName: uName || '',
      tel: tel || '',
      cardId: cardId || '',
      carId: carId || ''
    })
  }
  _saveOpt = async () => {
    // alert('新增成功！')
    const initCurrentVisitorObj = { // 当前新增对象
      ...this.props.currentPeopleObjProps,
      uName: this.state.uName,
      tel: this.state.tel,
      cardId: this.state.cardId,
      carId: this.state.carId
    }
    // 调用接口新增1条
    // this.props.EditPersonProps(initCurrentVisitorObj)
    this.props.navigation.navigate('RecordVisitor');
    this.props.EditSAVEPersonProps(initCurrentVisitorObj)
    
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
      
      <View style={styles.addVisitorWrapper}>
        <ImageBackground source={require('./img/head_bg2.png')} style={styles.backgroundImage}>          
          <Header title="信息编辑" left={leftV} fullScreen />
        </ImageBackground>
        <View style={styles.addVisitorForm}>
          <View style={styles.addVisitorItem}>
            <Text style={styles.addVisitorItemLabel}>访客名称</Text>
            <TextInput
              style={styles.addVisitorItemInput}
              placeholder="请输入姓名"
              value={this.state.uName}
              onChangeText={(uName) => this.setState({uName})}
            />
          </View>
          <View style={styles.addVisitorItem}>
            <Text style={styles.addVisitorItemLabel}>电话号码</Text>
            <TextInput
              style={styles.addVisitorItemInput}
              placeholder="请输入电话号码"
              value={this.state.tel}
              onChangeText={(tel) => this.setState({tel})}
            />
          </View>
          <View style={styles.addVisitorItem}>
            <Text style={styles.addVisitorItemLabel}>身份号码</Text>
            <TextInput
              style={styles.addVisitorItemInput}
              placeholder="请输入身份证号"
              value={this.state.cardId}
              onChangeText={(cardId) => this.setState({cardId})}
            />
          </View>
          <View style={styles.addVisitorItem}>
            <Text style={styles.addVisitorItemLabel}>驾车车牌</Text>
            <TextInput
              style={styles.addVisitorItemInput}
              placeholder="请输入车牌号"
              value={this.state.carId}
              onChangeText={(carId) => this.setState({carId})}
            />
          </View>
        </View>
        <View style={styles.delAndCancleBtnBox}>
          <TouchableNativeFeedback onPress={() => this._saveOpt()}>
            <LinearGradient
              start={{x: 0, y: 0}} end={{x: 1, y: 0}}
              colors={['#09B6FD', '#6078EA']} style={styles.delBtnBox}>
              <Text style={styles.delBtn}>保存</Text>
            </LinearGradient>
          </TouchableNativeFeedback>
        </View>
      </View>
      
      
    );
  }

}


const mapStateToProps = (state, ownProps)=>{
  const {visitorsManage} = state;
  return {
    currentPeopleObjProps: visitorsManage.currentPeopleObj,
    currentVisitorObjProps: visitorsManage.currentVisitorObj
  };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    EditPersonProps: (person) => dispatch(visitorActions.EditPersonAction(person)),
    EditSAVEPersonProps: (person) => dispatch(visitorActions.EditSAVEPersonAction(person)),
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVisitorScreen);

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

    // =======底部按钮 start
    delAndCancleBtnBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right:0,
      zIndex: 6,
      
    },
    delBtnBox: {
      flex: 1,
      textAlign: 'center',
    },
    delBtn: {
      textAlign: 'center',
      color: '#fff',
      fontSize: px2dp(32),
      height: px2dp(88),
      lineHeight: px2dp(88),
    },
    cancleBtn: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: '#fff',
      fontSize: px2dp(32),
      height: px2dp(88),
      lineHeight: px2dp(88),
      color: '#333333',
    },
/*   addVisitorBtnBox: {
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
  } */
})