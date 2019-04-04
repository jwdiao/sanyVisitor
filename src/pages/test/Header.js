import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Header from '../../components/Header'
import { setStatusBar } from './StatusBar'
import {px2dp} from "../../utils/ScreenUtil";
@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent'
})

export class TestScreen extends React.PureComponent {
  // static navigationOptions = {
    // title: '测试',
    // headerStyle: {
    //   ...Platform.OS === 'android' && {
    //     height: StatusBar.currentHeight + 44,
    //     paddingTop: StatusBar.currentHeight
    //   }
    // }
  // }


  /* 
  <ImageBackground style={styles.bg} source={require('../assets/imgs/bg.png')}>
          <Header title="主页" fullScreen />
        </ImageBackground>

  */
  render() {
    let leftV =  (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>this.props.navigation.goBack()}>
          <SimpleLineIcons name={'arrow-left'} size={24} color={"#fff"} style={styles.recordVisitorArrow} />
          <Text style={{color:'#fff'}}>返回</Text>
        </TouchableOpacity>
      </View>
    )
    return (
      <View>
        <ImageBackground source={require('./head_bg1.png')} style={{height: px2dp(397)}}>
          <Header title="测试页" left={leftV} fullScreen />
        </ImageBackground>
          {/*  backgroundColor={'#28A0F6'} */}
          {/* <Image source={require('./header_bg.png')} style={{width: '100%',height: 400,position: 'absolute',resizeMode: 'stretch'}} /> */}
          {/* <StatusBar
            translucent={false}
            hidden={false}
            animated={true}/> */}
          {/* <ImageBackground source={require('./header_bg.png')} style={{width: '100%',height: 400,marginTop:-20}}>
            <StatusBar
            translucent={true}
            hidden={false}
            animated={true}/>
            <Text>test hhh</Text>
          </ImageBackground> */}
          
      </View>
      
    )
  }
}