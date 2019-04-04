import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,ActivityIndicator} from 'react-native';

export default class ProductList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isShow: true
      }
  }
  
  render() {
      return (
		  <View>
		     <ActivityIndicator animating={this.state.isShow} color="green" size="large"></ActivityIndicator>
		     <Text style={styles.loadText}>正在加载中...</Text>
		  </View>
      );
  }
}

const styles = StyleSheet.create({
  productList:{
  	flex:1,
  	backgroundColor:'blue'
  },
  loadText:{
	  textAlign:'center'
  }
});