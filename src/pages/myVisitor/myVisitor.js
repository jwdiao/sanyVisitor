import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Alert,
  DeviceEventEmitter,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import {connect} from 'react-redux';

import Octicons from 'react-native-vector-icons/Octicons';

import {px2dp} from "../../utils/ScreenUtil";
import { DashLine } from '../../common/DashLine'


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// ======redux相关======
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


import {getVisitorList} from '../../http/api'
// ======顶部背景图片=======
import {STATUS_BAR_HEIGHT,HEADER_HEIGHT} from '../../components/Header'
import Header from '../../components/Header'
import { setStatusBar } from '../../components/HOC/StatusBar'
@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent'
})

export class MyVisitorScreen extends React.Component {
  /* static navigationOptions = {
    title: '我的访客',
    headerStyle: {
    }
  }; */
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      myVisitorList: [],
      refreshId: null
    }
  }
  componentDidMount () {
    this.fetchData()
    this.refreshId = DeviceEventEmitter.addListener('UPDATE_VISITOR_LIST',this.fetchData)
  }
  fetchData = () => {
    getVisitorList(1, 1000).then(res=> {
      console.log('list:',res)
      if(res&&res.code===200){
        let result = res.data.list
        this.setState({
          myVisitorList: result,
          loaded: true,
        })
        // this.props.VisitorListProps(result); // 将数据存入redux====不用了
      }
    }).catch(res=>{
      // 获取数据失败
    })
  }
  
  renderItems ({item,index}) { // 
    // let index = '第' + item;
    // 随机生成颜色
    // console.log(item)
    const borderColorArr = ['#e96aa1','#4ccc94','#9f90f1','#ffc472']
    let currentColor = borderColorArr[index%4]
    return (
      <View style={styles.item}>
        <Text style={[{borderColor:currentColor},styles.title]}>{item.uName}</Text>
        <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.lable}>拜访开始时间</Text>
              <Text style={styles.value}>{item.visitDate}</Text>
            </View>
            <DashLine />
        </View>
        
        <View style={styles.row}>
          <View style={styles.rowInner}>
            <Text style={styles.lable}>拜访周期</Text>
            <Text style={styles.value}>{item.visitCycle}</Text>
          </View>
          <DashLine />
        </View>
        <View style={styles.row}>
          <View style={styles.rowInner}>
            <Text style={styles.lable}>拜访人数</Text>
            <Text style={styles.value}>{item.visitorNum}</Text>
          </View>
          <DashLine />
        </View>
        
        <View style={styles.row}>
          <View style={styles.rowInner}>
            <Text style={styles.lable}>驾驶数量</Text>
            <Text style={styles.value}>{item.carNum}</Text>
          </View>
          <DashLine />
        </View>
        <View style={styles.row}>
          <View style={styles.rowInner}>
            <Text style={styles.lable}>拜访原因</Text>
            <Text style={styles.value}>{item.visitReason}</Text>
          </View>
        </View>
      </View>
    )
  }

  _handleAddVisitor= async () => {
    this.props.navigation.navigate('RecordVisitor')
/*     const initCurrentVisitorObj = { // 当前新增对象
      visitDate: new Date().Format('yyyy-MM-dd'),
      visitCycle: ['上午'],
      visitorNum: '',
      carNum: '',
      visitReason: '',
      persons: [
        {
          uName: '张三',
          tel: '15625896541',
          cardId: '411524789654123658',
          carId: '京A78965'
        },
        {
          uName: '张三1',
          tel: '15625896541',
          cardId: '411524789654123658',
          carId: '京A78965'
        }
      ]
    }
    this.props.VisitorObjProps(initCurrentVisitorObj) */
  };
  componentWillUnmount() {
    this.refreshId.remove()
  }

/*   onScroll(event) {
    let newScrollOffset = event.nativeEvent.contentOffset.y;
    // console.log(9999)
    // console.log(newScrollOffset)
    this.setState({
      scrollOfssetY: newScrollOffset
    })
  } */
  
  render() {
    // 进入访客历史页面按钮
    const enterHistoryBtn =  (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() =>this.props.navigation.navigate('VisitorHistory')}>
         <MaterialCommunityIcons name={'history'} size={26} color={'#fff'} style={{marginRight: 15}} />
        </TouchableOpacity>
      </View>
    )
    // 数据加载成功之前
    if (!this.state.loaded){
      return(
        <View style={styles.MyVisitorWrapper}>
          <ImageBackground source={require('../../assets/images/head_bg2.png')} style={styles.backgroundImage2}>          
              <Header title="我的访客" right={enterHistoryBtn} fullScreen />
          </ImageBackground>
          <View style={styles.mainContainer}>
            <ActivityIndicator animating={true} color="green" size="large"></ActivityIndicator>
            <Text style={{marginTop: 10}}>正在加载中...</Text>
          </View>
        </View>
      )
    }

    // 数据加载成功之后但是没有访客显示空页面
    if (this.state.loaded && this.state.myVisitorList.length==0) {
      return(
        <View style={styles.MyVisitorWrapper}>
          <ImageBackground source={require('../../assets/images/head_bg2.png')} style={styles.backgroundImage2}>          
            <Header title="我的访客" right={enterHistoryBtn} fullScreen />
          </ImageBackground>
          <View style={styles.mainContainer}>
            <Image style={styles.EmptyPageImg} source={require('../../assets/images/noVisitor.png')} />
            <Text style={styles.EmptyPageTitle}>还没有访客</Text>
            <Text style={styles.EmptyPageTip}>目前还没有访客哦，点击右下角快去添加新的访客吧</Text>
          </View>
          <TouchableOpacity activeOpacity={1} style={styles.plusBox} onPress={this._handleAddVisitor}>
            <View style={styles.plus}>
              <Octicons name={'plus'} size={24} color={"#fff"} />
            </View>
          </TouchableOpacity>
        </View>
      )
    }
    // 数据加载成功之后显示访客列表
    return (
      
      <View style={styles.MyVisitorWrapper}>
        <ImageBackground source={require('../../assets/images/head_bg1.png')} style={styles.backgroundImage}>          
            <Header title="我的访客" right={enterHistoryBtn} fullScreen />
        </ImageBackground>
        {/* {
          this.state.scrollOfssetY<=px2dp(100)?
          <ImageBackground source={require('./img/head_bg1.png')} style={styles.backgroundImage}>          
            <Header title="测试页" fullScreen />
          </ImageBackground>:
          <ImageBackground source={require('./img/head_bg2.png')} style={styles.backgroundImage2}>          
            <Header title="测试页" fullScreen />
          </ImageBackground>
        } */}
        {/* <View style={styles.backgroundBg}></View> */}
        <FlatList
            style={styles.list}
            contentContainerStyle={{paddingTop: px2dp(60),paddingBottom: 10}}
            data={this.state.myVisitorList}
            // data={this.props.visitorsProps}
            renderItem={this.renderItems}
            keyExtractor={item => (item.id).toString()}
            // onScroll={this.onScroll.bind(this)}
          />
          <TouchableOpacity activeOpacity={1} style={styles.plusBox} onPress={this._handleAddVisitor}>
            <View style={styles.plus}>
              <Octicons name={'plus'} size={24} color={"#fff"} />
            </View>
          </TouchableOpacity>
      </View>
      
    )
    
  }

}
export default MyVisitorScreen;

/* const mapStateToProps = (store, ownProps) => {
  const {visitorsManage} = store;
  // console.log("current store:", store);
  return {
    visitorsProps: visitorsManage.visitorsList,
    // currentVisitorObjProps: visitorsManage.currentVisitorObj
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    VisitorListProps: (visitorArr) => dispatch(visitorActions.VisitorListAction(visitorArr)),
    VisitorObjProps: (visitorObj) => dispatch(visitorActions.EditVisitorObjAction(visitorObj)), //编辑访客当前对象
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyVisitorScreen)
 */


const styles = StyleSheet.create({
  // 主页面头部背景
  backgroundImage: {
    width:'100%',height:px2dp(397),
    position: 'absolute',top:-1,left:0,right:0,zIndex:-1,
  },
  // 加载中和列表为空时的头部背景
  backgroundImage2: {
    width:'100%',
    // height:px2dp(128),
    position: 'absolute',top:-1,left:0,right:0,zIndex:-1,
  },
  // 主页面使用灰色背景
  backgroundBg: {
    backgroundColor: '#F1F4FF',
    position: 'absolute',top:0,left:0,bottom:0,right:0,
    zIndex:-2,
  },
  MyVisitorWrapper: {
    display: 'flex',
    flex: 1,
  },
  list: {
    marginTop:STATUS_BAR_HEIGHT + HEADER_HEIGHT,
    paddingLeft: px2dp(38),
    paddingRight: px2dp(30),
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: px2dp(6),
    paddingRight: px2dp(40),
    paddingBottom: px2dp(20),
    marginBottom: px2dp(34),
    overflow:'hidden',
  },
  title: {
    color: '#333',
    fontSize: px2dp(30),
    fontWeight: "400",
    height: px2dp(62),
    paddingTop:px2dp(20),
    borderLeftWidth: px2dp(7),
    borderStyle: 'solid',
    paddingLeft: px2dp(24),
  },
  row: {
    paddingLeft: px2dp(30),
  },
  rowInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: px2dp(20),
    paddingBottom: px2dp(10)
  },
  lable: {
    color: '#999',
    fontSize: px2dp(26)
  },
  value: {
    color: '#333',
    fontSize: px2dp(26)
  },

  // 内容居中容器
  mainContainer: {
    display: 'flex',flex:1,flexDirection: 'column',justifyContent: 'center',alignItems:'center'
  },
  // 空页面
  EmptyPageImg: {
    width: px2dp(212),
    height: px2dp(241)
  },
  EmptyPageTitle: {
    fontSize: px2dp(38),
    color: '#344B67'
  },
  EmptyPageTip: {
    fontSize: px2dp(29),
    color: '#344B67',
    opacity:0.7,
    marginTop: px2dp(26),
    fontWeight: '500',
    lineHeight: px2dp(46),
    textAlign:'center',
    paddingLeft: px2dp(130),
    paddingRight: px2dp(130),
  },
  plusBox: {
    position:'absolute',
    bottom: px2dp(68),
    right: px2dp(60),
    zIndex:10
  },
  plus: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: px2dp(130),
    height: px2dp(130),
    borderRadius: px2dp(65),
    backgroundColor: '#28A0F6',
    shadowColor:'#28A0F6',
    //478AEF rgba(71,138,239,0.46)
    shadowOffset: {
      width: 0,
      height: 2
    },
    // shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4
  },
})