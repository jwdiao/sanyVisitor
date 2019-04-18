import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import {connect} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {px2dp} from "../../utils/ScreenUtil";
import { DashLine } from '../../common/DashLine'


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// ======redux相关======
import * as visitorActions from '../../redux/actions/visitorActions'
import {getVisitorHistoryReq} from '../../http/api'

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
      myVisitorHistoryList: []
    }
  }
  componentDidMount () {
    // console.log(STATUS_BAR_HEIGHT + HEADER_HEIGHT)
    this.fetchData()
  }
  fetchData () {
    getVisitorHistoryReq(1, 1000).then(res=> {
      console.log('history:',res)
      if(res&&res.code===200){
        let result = res.data.list
        this.setState({
          myVisitorHistoryList: result,
          loaded: true,
        })
      }
    }).catch(res=>{
      // 获取数据失败
    }) 
/*     return;
    setTimeout(()=>{
      const data = [
        {
          id: '001',
          uname: '张三',
          visitDate: '2019-04-05',
          visitCycle: '上午',
          visitorNum: 3,
          carNum: 3,
          visitReason: '供应商来访',
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
        },
        {
          id: '002',
          uname: '李四',
          visitDate: '2019-04-05',
          visitCycle: '上午',
          visitorNum: 3,
          carNum: 3,
          visitReason: '供应商来访',
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
      ]
      this.setState({
        myVisitorHistoryList: data,
        loaded: true,
        // scrollOfssetY: 0
      })
      // 将获取的数据存入redux
      // this.props.VisitorListProps(data);
    },100) */
  }
  
  renderItems ({item,index}) { // 
    // 随机生成颜色
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
  
  render() {
    const leftV =  (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() =>this.props.navigation.goBack()} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <FontAwesome name={'angle-left'} size={32} color={"#fff"} style={styles.recordVisitorArrow} />
          <Text style={{color:'#fff',marginLeft:4,fontSize:16}}>返回</Text>
        </TouchableOpacity>
      </View>
    )
    // 数据加载成功之前
    if (!this.state.loaded){
      return (
        <View style={styles.MyVisitorWrapper}>
          <ImageBackground source={require('../../assets/images/head_bg2.png')} style={styles.backgroundImage2}>          
            <Header title="历史访客" left={leftV} fullScreen />
          </ImageBackground>
          <View style={styles.mainContainer}>
            <ActivityIndicator animating={true} color="green" size="large"></ActivityIndicator>
            <Text style={{marginTop: 10}}>正在加载中...</Text>
          </View>
        </View>
      )
    }

    // 数据加载成功之后但是没有访客显示空页面
    if (this.state.loaded && this.state.myVisitorHistoryList.length==0) {
      return (
        <View style={styles.MyVisitorWrapper}>
          <ImageBackground source={require('../../assets/images/head_bg2.png')} style={styles.backgroundImage2}>          
          <Header title="历史访客" left={leftV} fullScreen />
          </ImageBackground>
          <View style={styles.mainContainer}>
            <Image style={styles.EmptyPageImg} source={require('../../assets/images/noHistoryRecord.png')} />
            <Text style={styles.EmptyPageTip}>目前还没有历史记录！</Text>
          </View>
        </View>
      )
    }
    // 数据加载成功之后显示访客列表
    return (
      <View style={styles.MyVisitorWrapper}>
        <ImageBackground source={require('../../assets/images/head_bg1.png')} style={styles.backgroundImage}>          
            <Header title="历史访客" left={leftV} fullScreen />
        </ImageBackground>
        {/* <View style={styles.backgroundBg}></View> */}
        <FlatList
          style={styles.list}
          contentContainerStyle={{paddingTop: px2dp(60),paddingBottom: 10}}
          data={this.state.myVisitorHistoryList}
          renderItem={this.renderItems}
          keyExtractor={item => (item.id).toString()}     
        />
      </View>    
    )   
  }

}

const mapStateToProps = (store, ownProps) => {
  const {visitorsManage} = store;
  // console.log("current store:", store);
  return {
    // visitorsProps: visitorsManage.visitorsList
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    VisitorListProps: (visitorArr) => dispatch(visitorActions.VisitorListAction(visitorArr)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyVisitorScreen)



const styles = StyleSheet.create({
  backgroundImage: {
    width:'100%',
    height:px2dp(397),
    position: 'absolute',top:-1,left:0,right:0,zIndex:-1
  },
  backgroundImage2: {
    width:'100%',
    // height:px2dp(128),
    position: 'absolute',top:-1,left:0,right:0,zIndex:-1,
  },
  backgroundBg: {
    backgroundColor: '#F1F4FF',
    position: 'absolute',top:0,left:0,bottom:0,right:0,zIndex:-2,
  },
  MyVisitorWrapper: {
    flex: 1,
  },
/*   MyVisitorWrapper2: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#F1F4FF',
    marginTop:STATUS_BAR_HEIGHT + HEADER_HEIGHT,
  }, */
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

  // 空页面
  // 内容居中容器
  mainContainer: {
    display: 'flex',flex:1,flexDirection: 'column',justifyContent: 'center',alignItems:'center'
  },
  EmptyPageImg: {
    width: px2dp(260),
    height: px2dp(226)
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
  }
})