import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import {px} from "../utils/AdapterUtil";
export class EmptyPage extends Component {
  
  render() {
    return (
      <View style={styles.EmptyPage}>
          <Image style={styles.img} source={require('./img/noVisitor.png')} />
          <Text style={styles.title}>还没有访客</Text>
          <Text style={styles.tip}>目前还没有访客哦，点击右下角快去添加新的访客吧</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  EmptyPage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
    width: '100%',
    paddingLeft: px(130),
    paddingRight: px(130),
  },
  img: {
    width: px(212),
    height: px(241)
  },
  title: {
    fontSize: px(38),
    color: '#344B67'
  },
  tip: {
    fontSize: px(29),
    color: '#344B67',
    opacity:0.7,
    marginTop: px(30),
    fontWeight: '500',
    lineHeight: px(46),
    textAlign:'center',
    
  }
})
