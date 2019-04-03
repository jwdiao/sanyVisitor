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
  ImageBackground
} from 'react-native';
import {connect} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {px2dp} from "../../utils/ScreenUtil";
import { DashLine } from '../../common/DashLine'


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// ======顶部背景图片=======
import {STATUS_BAR_HEIGHT,HEADER_HEIGHT} from '../../components/Header'
import Header from '../../components/Header'
/*import { setStatusBar } from '../../components/HOC/StatusBar'
@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent'
})*/

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
      myVisitorList: []
    }
    this.fetchData = this.fetchData.bind(this)
  }
  componentDidMount () {
    // console.log(STATUS_BAR_HEIGHT + HEADER_HEIGHT)
    this.fetchData()
  }
  fetchData () {
    setTimeout(()=>{
      const data = [
        {
          id: '001',
          uname: '张三',
          visitStartTime: '2019-04-05',
          visitFlag: '上午',
          visitNum: 3,
          carNum: 3,
          visitReason: '供应商来访',
          visitors: [
            {
              uName: '张三',
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
        },
        {
          id: '002',
          uname: '李四',
          visitStartTime: '2019-04-05',
          visitFlag: '上午',
          visitNum: 3,
          carNum: 3,
          visitReason: '供应商来访'
        },
        {
          id: '003',
          uname: '张三3',
          visitStartTime: '2019-04-05',
          visitFlag: '上午',
          visitNum: 3,
          carNum: 3,
          visitReason: '供应商来访'
        },
        {
          id: '004',
          uname: '张三4',
          visitStartTime: '2019-04-05',
          visitFlag: '上午',
          visitNum: 3,
          carNum: 3,
          visitReason: '供应商来访'
        },
      ]
      this.setState({
        myVisitorList: data,
        loaded: true,
        scrollOfssetY: 0
      })
    },500)
  }
  
  renderItems ({item}) { // 
    return (  
      <View style={styles.item}>
        <Text style={styles.title}>{item.uname}</Text>
        <View style={styles.row}>
            <View style={styles.rowInner}>
              <Text style={styles.lable}>拜访开始时间</Text>
              <Text style={styles.value}>{item.visitStartTime}</Text>
            </View>
            <DashLine />
        </View>
        
        <View style={styles.row}>
          <View style={styles.rowInner}>
            <Text style={styles.lable}>拜访周期</Text>
            <Text style={styles.value}>{item.visitFlag}</Text>
          </View>
          <DashLine />
        </View>
        <View style={styles.row}>
          <View style={styles.rowInner}>
            <Text style={styles.lable}>拜访人数</Text>
            <Text style={styles.value}>{item.visitNum}</Text>
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
  };

  /* _handleTest() {
    this.props.navigation.navigate('Test')
  } */
  onScroll(event) {
    let newScrollOffset = event.nativeEvent.contentOffset.y;
    // console.log(9999)
    // console.log(newScrollOffset)
    /* this.setState({
      scrollOfssetY: newScrollOffset
    }) */
  }
  
  render() {
    const enterHistoryBtn =  (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() =>this.props.navigation.navigate('RecordVisitor')}>
        <MaterialCommunityIcons name={'history'} size={26} color={'#fff'} style={{marginRight: 15}} />
        </TouchableOpacity>
      </View>
    )
    // 数据加载成功之前
    if (!this.state.loaded){
      return <Text>正在加载中....</Text>
    }

    console.log('props', this.props);

    // 数据加载成功之后但是没有访客显示空页面
    if (this.state.loaded && this.state.myVisitorList.length==0) {
      return (
        <View style={styles.MyVisitorWrapper}>
          <View style={styles.EmptyPage}>
            <Image style={styles.EmptyPageImg} source={require('./img/noVisitor.png')} />
            <Text style={styles.EmptyPageTitle}>还没有访客</Text>
            {/* <Button onPress={() => this._handleTest()} title="进入测试页面"></Button> */}
            <Text style={styles.EmptyPageTip}>目前还没有访客哦，点击右下角快去添加新的访客吧</Text>
          </View>
          <TouchableOpacity activeOpacity={0.9} style={styles.plusBox} onPress={this._handleAddVisitor}>
            <View style={styles.plus}>
              <FontAwesome name={'plus'} size={24} color={"#fff"} />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    // 数据加载成功之后显示访客列表
    return (
      
      <View style={styles.MyVisitorWrapper}>
        <ImageBackground source={require('./img/head_bg1.png')} style={styles.backgroundImage}>          
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
        <View style={styles.backgroundBg}></View>
        <FlatList
          style={styles.list}
          contentContainerStyle={{paddingTop: px2dp(60),paddingBottom: 10}}
          data={this.state.myVisitorList}
          // data={this.props.visitors}
          renderItem={this.renderItems}
          keyExtractor={item => item.id}
          onScroll={this.onScroll.bind(this)}
        />
        <TouchableOpacity activeOpacity={0.9} style={styles.plusBox} onPress={this._handleAddVisitor}>
          <View style={styles.plus}>
            <FontAwesome name={'plus'} size={24} color={"#fff"} />
          </View>
        </TouchableOpacity>
      </View>
      
    )
    
  }

}

const mapStateToProps = (store, ownProps) => {
  const {visitorsManage} = store;
  console.log("current store:", store);
  return {
    visitors: visitorsManage.visitors
  }
}

export default connect(mapStateToProps)(MyVisitorScreen)



const styles = StyleSheet.create({
  backgroundImage: {
    width:'100%',height:px2dp(397),
    position: 'absolute',top:-1,left:0,right:0,
    zIndex:-1,
    // backgroundColor: '#4487d6',
  },
  backgroundImage2: {
    width:'100%',height:px2dp(128),
    position: 'absolute',top:-1,left:0,right:0,
    zIndex:-1,
    // backgroundColor: '#4487d6',
  },
  backgroundBg: {
    backgroundColor: '#F1F4FF',
    position: 'absolute',top:0,left:0,bottom:0,right:0,
    zIndex:-2,
  },
  MyVisitorWrapper: {
    // backgroundColor: '#4487d6',
    display: 'flex',
    flex: 1,
  },
  list: {
    marginTop:STATUS_BAR_HEIGHT + HEADER_HEIGHT,
    // backgroundColor: '#F1F4FF',
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
    borderColor:'#4ccc94',
    // borderTopLeftRadius: px2dp(6),
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
  EmptyPage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
    width: '100%',
    paddingLeft: px2dp(130),
    paddingRight: px2dp(130),
  },
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