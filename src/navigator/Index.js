import {
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import { AuthLoadingScreen } from '../pages/login/AuthLoadingScreen' // 登陆前的loading
import { SignInScreen } from '../pages/login/loginPage' // 登陆页面
import { FindAccountPage } from '../pages/login/findAccountPage' // 找回密码页面
// import { AppStack } from './Main' // 主APP页面
import { AppStack ,DrawerNav} from './Main' // 主APP页面  ,侧滑页面


const LoginStack = createStackNavigator({ SignIn: SignInScreen }); // 登陆页面
const FindAccountPageStack = createStackNavigator({ FindAccountPage: FindAccountPage }); // 找回密码页面

export const AppContainer =  createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen, // 登陆前进入（判断是否有token）
    Main: AppStack, // 登陆后的主页
    Auth: LoginStack, // 登陆
    FindAccount: FindAccountPageStack ,// 找回密码
    sideBarPage:DrawerNav ,//侧滑
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
