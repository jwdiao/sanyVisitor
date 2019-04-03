
import React from 'react';
import {
  View,
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import { AppContainer } from './navigator/Index';
import store from './store';

/**
 * <StatusBar />
 * translucent 设置状态栏是否为透明
 * hidden 设置状态栏是否隐藏
 * animated 设置当状态栏的状态发生变化时，是否需要加入动画
 */
export const App = () => {
  console.log('store', store);
  return (
    <Provider store={store} >
      <View style={{flex: 1}}>
       {/* <StatusBar backgroundColor={'#4487d6'}
          translucent={false}
          hidden={false}
          animated={true}/> */}
        <AppContainer />
      </View>
    </Provider>
  )
}