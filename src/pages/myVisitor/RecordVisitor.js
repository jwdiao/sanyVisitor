import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  DatePickerAndroid,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { Drawer, List, WhiteSpace } from '@ant-design/react-native';
import {connect} from 'react-redux';



import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Picker from 'react-native-picker'


import {px2dp} from "../../utils/ScreenUtil";
import * as visitorActions from '../../redux/actions/visitorActions'

Date.prototype.Format = function (fmt) {  
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

import {STATUS_BAR_HEIGHT,HEADER_HEIGHT} from '../../components/Header'
import Header from '../../components/Header'
import { setStatusBar } from '../../components/HOC/StatusBar'
/*@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent'
})*/

export class RecordVisitorScreen extends React.Component {

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
      visitDate: '', // 拜访日期
      period: ['上午'], // 拜访周期
      visitorNum: '', // 拜访人数
      carNum: '', // 驾车数量
      reason: '', // 拜访原因
      // isChecked: false,
      visitorList: [],
      selectedVisitorList: []
    }
  }
  componentDidMount () {
    let dater = new Date()
    this.setState({
      visitDate: dater.Format('yyyy-MM-dd')
    })

    // 访客列表获取数据
    let visitorData = [
       {
        id: '001',
        uName: '张三',
        tel: '18547896542',
        cardId: '411254789658741235',
        carId: '豫E45789'
      },
      {
        id: '002',
        uName: '李四',
        tel: '18547896548',
        cardId: '211254789658741235',
        carId: '京E45789'
      },
      {
        id: '003',
        uName: '李四3',
        tel: '18547896548',
        cardId: '211254789658741235',
        carId: '京E45789'
      },
    ]
    visitorData.forEach(item => item.isChecked = false)
    this.setState({
      visitorList: visitorData
    })
    
  }
  _openDatePicker = async () => {
    try {
      const {
        action, year, month, day
      } = await DatePickerAndroid.open({
        date: new Date()
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        let dateStr = year + '/' + (month+1) + '/' + day
        let dateObj = new Date(dateStr)
        this.setState({
          visitDate: dateObj.Format('yyyy-MM-dd')
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message)
    }
  };
  _openPeriodPicker = async () => {
    Picker.init({
      pickerTitleText: '',
      pickerData: ['上午','下午','全天'],
      selectedValue: this.state.period,
      onPickerConfirm: data => {
        this.setState({period: data})
      },
      onPickerCancel: data => {
      },
      onPickerSelect: data => {
      }
    })
    Picker.show()
  };

  _addVisitorPage = async () => {
    this.props.navigation.navigate('AddVisitor');
    // this.props.navigation.openDrawer()
  }
  _openAddVisitorPage = () => {
    this.drawer && this.drawer.openDrawer()
  }

  // 保存按钮
  _saveOpt () {
    let itemObj = {
      id: '100',
      uname: '王五',
      visitStartTime: '2019-04-05',
      visitFlag: '上午',
      visitNum: 3,
      carNum: 3,
      visitReason: '供应商来访',
      visitors: [
        {
          uName: '王五',
          tel: '15625896541',
          cardId: '411524789654123658',
          carId: '京A78965'
        },
        {
          uName: '张三9',
          tel: '15625896541',
          cardId: '411524789654123658',
          carId: '京A78965'
        }
      ]
    };
    this.props.addVisitor(itemObj);

    this.props.navigation.navigate('MyVisitorIndex');
  }

  // 取消按钮
  _cancelBtnOpt () {
    // 取消选中所有数据
    this.state.visitorList.forEach((ele, index) => {
      if (ele.isChecked) {
        this.state.visitorList[index].isChecked = false
      }
    })
    this.setState({
      visitorList: this.state.visitorList,
      selectedVisitorList: []
    })
  }
  // 删除按钮
  _delOpt () {
    let newArr = this.state.visitorList.slice()
    for(var i=newArr.length-1;i>=0;i--){
      if(newArr[i].isChecked){
        newArr.splice(i,1)
      }
    }

    this.setState({
      visitorList: newArr,
      selectedVisitorList: []
    })
  }

  handleSelectedCheckbox (item) {
    this.state.selectedVisitorList.forEach((ele,index) => {
      if (item.id === ele.id) {
        this.state.selectedVisitorList.splice(index,1)
        this.setState({
          selectedVisitorList: this.state.selectedVisitorList
        })
        return;
      }
    })
  }

  handleClickCheckbox (item) {
    this.state.visitorList.forEach((ele, index) => {
      if (ele.id === item.id) {


        
        this.state.visitorList[index].isChecked = !item.isChecked
        
        // 加入选中的数组
        if(this.state.visitorList[index].isChecked) { // 是选中,加入选中数组
          this.state.selectedVisitorList.push(this.state.visitorList[index])
        } else { // 是未选中，从选中数组中删除
          this.handleSelectedCheckbox(this.state.visitorList[index])
        }
        
        this.setState({
          visitorList: this.state.visitorList
        })
        return;
      }
    })
  }

  // 显示底部按钮
  renderBottomBtn () {
    if (this.state.visitorList.length>0 && this.state.selectedVisitorList.length>0) {
      return (
        <View style={styles.delAndCancleBtnBox}>
          <TouchableNativeFeedback onPress={() => this._delOpt()}>
            <LinearGradient
              start={{x: 0, y: 0}} end={{x: 1, y: 0}}
              colors={['#09B6FD', '#6078EA']}
              style={styles.delBtnBox}>
              <Text style={styles.delBtn}>删除</Text>
            </LinearGradient>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => this._cancelBtnOpt()}>
            <Text style={styles.cancleBtn}>取消</Text>
          </TouchableNativeFeedback>
        </View>
      )
    } else if (this.state.visitorList.length>0 && this.state.selectedVisitorList.length<=0){
      return (
        <View style={styles.delAndCancleBtnBox}>
          <TouchableNativeFeedback onPress={() => this._saveOpt()}>
            <LinearGradient
              start={{x: 0, y: 0}} end={{x: 1, y: 0}}
              colors={['#09B6FD', '#6078EA']} style={styles.delBtnBox}>
              <Text style={styles.delBtn}>保存</Text>
            </LinearGradient>
          </TouchableNativeFeedback>
        </View>
      //  <View style={styles.saveBtnBox}>
      //     <TouchableNativeFeedback onPress={this._saveOpt}>
      //       <LinearGradient style={styles.saveBtn}  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#09B6FD', '#6078EA']}>
      //         <Text style={styles.saveBtnText}>保存</Text>
      //       </LinearGradient>
      //     </TouchableNativeFeedback>
      //   </View>
      )
    }
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
    <View style={{flex:1,backgroundColor:'#F3F3F3'}}>
      <ImageBackground source={require('./img/head_bg2.png')} style={styles.backgroundImage}>          
        <Header title="增加访客" left={leftV} fullScreen />
      </ImageBackground>
      <LinearGradient colors={['#6078EA', '#09B6FD']} style={styles.addVisitorBtn}>
        <TouchableNativeFeedback onPress={this._addVisitorPage}>
          <Text style={styles.addVisitorBtnText}>新增访客</Text>
        </TouchableNativeFeedback>
      </LinearGradient>
      
        {/* <LinearGradient colors={['#6078EA', '#09B6FD']} style={styles.addVisitorBtn}>
          <TouchableNativeFeedback onPress={() => this._openAddVisitorPage()}>
            <Text style={styles.addVisitorBtnText}>新增访客</Text>
          </TouchableNativeFeedback>
        </LinearGradient> */}
     
      {/* 底部按钮 start */}
      {this.renderBottomBtn()}
      {/* 底部按钮 end */}
      <ScrollView style={styles.recordVisitorWrapperBox}>
        <View style={styles.recordVisitorWrapper}>
          {/* 顶部列表 start */}
          <View style={styles.recordVisitorList}>
            <View style={styles.recordVisitorItem}>
              <Text style={styles.recordVisitorLabel}>拜访日期</Text>
              <TouchableNativeFeedback onPress={this._openDatePicker}>
                <View style={styles.recordVisitorItemRight}>
                <Text style={styles.recordVisitorVal}>{this.state.visitDate}</Text>
                <FontAwesome name={'angle-right'} size={24} color={"#7a7a7f"} style={styles.recordVisitorArrow} />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.recordVisitorItem}>
              <Text style={styles.recordVisitorLabel}>拜访周期</Text>
              <TouchableNativeFeedback onPress={this._openPeriodPicker}>
                <View style={styles.recordVisitorItemRight}>
                  <Text style={styles.recordVisitorVal}>{this.state.period}</Text>
                  <FontAwesome name={'angle-right'} size={24} color={"#7a7a7f"} style={styles.recordVisitorArrow} />
                </View>
              </TouchableNativeFeedback>
            </View>

            <View style={styles.recordVisitorItem}>
              <Text style={styles.recordVisitorLabel}>拜访人数</Text>
              <View style={styles.recordVisitorItemRight}>
                <Text style={styles.recordVisitorVal}>{this.state.visitorNum}</Text>
                <FontAwesome name={'angle-right'} size={24} color={"#7a7a7f"} style={styles.recordVisitorArrow} />
              </View>
            </View>

            <View style={styles.recordVisitorItem}>
              <Text style={styles.recordVisitorLabel}>驾车数量</Text>
              <View style={styles.recordVisitorItemRight}>
                <Text style={styles.recordVisitorVal}>{this.state.carNum}</Text>
                <FontAwesome name={'angle-right'} size={24} color={"#7a7a7f"} style={styles.recordVisitorArrow} />
              </View>
            </View>

            <View style={styles.recordVisitorItem}>
              <Text style={styles.recordVisitorLabel}>拜访原因</Text>
              <View style={styles.recordVisitorItemRight}>
                <TextInput
                  style={styles.recordVisitorItemInput}
                  placeholder="请输入来访原因"
                  onChangeText={(reason) => this.setState({reason})}
                />
              </View>
            </View>
          </View>
          {/* 顶部列表 start */}

          {/* checkbox start */}
          <View style={styles.checkboxList}>
          {
            this.state.visitorList.map((item, index) => {          
              return (
                <View
                key={item.id}
                style={styles.checkboxItem}>
                  <View style={styles.checkboxItemTitleBox}>
                    <TouchableNativeFeedback onPress={() => this.handleClickCheckbox(item)}>
                    <View
                      style={styles.checkboxItemTitleLeft}>
                      {item.isChecked ?
                        <Image source={require('./checkbox_checked.jpg')} style={styles.checkboxImg} />
                        : <Image source={require('./checkbox_unchecked.jpg')} style={styles.checkboxImg} />}
                      <Text style={styles.checkboxItemName}>张三</Text>
                    </View>
                    </TouchableNativeFeedback>
                    <View style={styles.checkboxItemTitleRight}>
                      <AntDesign name={'clockcircleo'} size={12} color={"#B3B3B3"} style={styles.checkboxItemTitleClock} />
                      <Text style={styles.checkboxItemTitleDate}>2018/04/15</Text>
                      <AntDesign name={'edit'} size={24} color={"#09B6FD"} style={styles.checkboxItemTitleEdit} />
                    </View>
                  </View>
                  <View style={styles.checkboxItemInfoBox}>
                    <View style={styles.checkboxItemInfo}>
                      <FontAwesome name={'mobile-phone'} size={24} color={"#c1bfbf"} style={styles.checkboxItemInfoIcon} />
                      <Text style={styles.checkboxItemInfoText}>18301254698</Text>
                    </View>
                    <View style={styles.checkboxItemInfo}>
                      <FontAwesome name={'id-card-o'} size={14} color={"#c1bfbf"} style={styles.checkboxItemInfoIcon} />
                      <Text style={styles.checkboxItemInfoText}>411254789654123698</Text>
                    </View>
                    <View style={styles.checkboxItemInfo}>
                      <FontAwesome name={'car'} size={14} color={"#c1bfbf"} style={styles.checkboxItemInfoIcon} />
                      <Text style={styles.checkboxItemInfoText}>京Q45896</Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
          </View>

        </View>
          {/* checkbox end */}



          
          
      </ScrollView>
    </View>
    );
  }
}

const mapStateToProps = (state, ownProps)=>{
  return {};
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addVisitor: (visitor) => dispatch(visitorActions.addVisitor(visitor)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordVisitorScreen);

const styles = StyleSheet.create({
  backgroundImage: {
    width:'100%',
    height:px2dp(128),
    // height:64,
    /* position: 'absolute',top:-1,left:0,right:0,
    zIndex:-1, */
    // backgroundColor: '#4487d6',
  },
  recordVisitorWrapperBox: {
    backgroundColor: '#f3f3f3',
    display: 'flex',
    flex: 1,
  },
  recordVisitorWrapper: {
    display:'flex',
    flexDirection:'column',
    flex: 1,
    paddingLeft: px2dp(19),
    paddingRight: px2dp(20),
    paddingTop: px2dp(21),
    paddingBottom: px2dp(112),
  },
  addVisitorBtn: {
    position: 'absolute',
    right: 0,
    top: px2dp(97) + STATUS_BAR_HEIGHT + HEADER_HEIGHT,
    zIndex: 5,
    width: px2dp(59),
    height: px2dp(196),
    borderTopLeftRadius: px2dp(10),
    borderBottomLeftRadius: px2dp(10),
    display: 'flex',
    justifyContent: 'center'
  },
  addVisitorBtnText: {
    color: '#FEFEFE',
    fontSize: px2dp(32),
    textAlign: 'center'
  },
  recordVisitorList: {
    borderRadius: px2dp(6)
  },
  recordVisitorItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: px2dp(28),
    paddingBottom: px2dp(28),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(50),
    marginBottom: 1,
    backgroundColor: '#fff'
  },
  recordVisitorLabel: {
    fontSize: px2dp(28),
    color: '#1a1a1a',
    opacity: 0.9
  },
  recordVisitorItemRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',   
  },
  recordVisitorItemInput: {
    paddingTop:0,
    paddingBottom: 0,
  },
  recordVisitorVal: {
    fontSize: px2dp(26),
    color: '#1a1a1a',
    opacity: 0.81
  },
  recordVisitorArrow: {
    marginLeft: px2dp(6),
  },






  // ========checkbox start
  
  checkboxItem: {
    marginTop: px2dp(24),
    borderRadius: px2dp(6)
  },
  checkboxItemTitleBox: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    height: px2dp(88),
    alignItems: 'center',
    paddingLeft: px2dp(16),
    paddingRight: px2dp(47),
    marginBottom: 1,
   /*  borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e5e5e5' */
  },
  checkboxItemTitleLeft: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  checkboxImg: {
    width: px2dp(36),
    height: px2dp(36)
  },
  checkboxItemName: {
    marginLeft: px2dp(16),
    fontSize: px2dp(30),
    color: '#333333'
  },
  checkboxItemTitleRight: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems: 'center'

  },
  checkboxItemTitleClock: {
    marginRight: px2dp(20)
  },
  checkboxItemTitleDate: {
    fontSize: px2dp(24),
    color: '#B3B3B3'
  },
  checkboxItemTitleEdit: {
    marginLeft: px2dp(24)
  },
  checkboxItemInfoBox: {
    backgroundColor: '#fff',
    paddingLeft: px2dp(80),
    paddingRight: px2dp(80),
    paddingTop: px2dp(16),
    paddingBottom: px2dp(26)
  },
  checkboxItemInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px2dp(20)
  },
  checkboxItemInfoIcon: {
    width: px2dp(36),
    textAlign: 'center'
  },
  checkboxItemInfoText: {
    paddingLeft: px2dp(16),
    fontSize: px2dp(26),
    color: '#888'
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
  


  // 信息录入弹窗
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