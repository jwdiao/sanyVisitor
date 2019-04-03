import React from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet
} from 'react-native';
const screenWidth = Dimensions.get('window').width;

export class DashLine extends React.Component{
  render(){
      var len = Math.ceil(screenWidth/4);
      var arr = [];
      for(let i=0; i<len; i++){
          arr.push(i);
      }

      return <View style={styles.dashLine}>
          {
              arr.map((item, index)=>{
                  return <Text style={styles.dashItem} key={'dash'+index}> </Text>
              })
          }
      </View>
  }
}
const styles = StyleSheet.create({
  // common
  dashLine: {
      flexDirection: 'row',
  },
  dashItem: {
      height: 1,
      width: 2,
      marginRight: 2,
      flex: 1,
      backgroundColor: 'rgba(216,215,215,1)',
  },
})