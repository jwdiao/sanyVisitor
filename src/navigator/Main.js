import React from 'react';
import {
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';



// 个人信息tab
import { MyInfoScreen } from '../pages/personInfo/Index'; // 个人信息
import { ModifyPwdScreen } from '../pages/personInfo/ModifyPwd'; // 修改密码

// 
import { MyVisitorScreen } from '../pages/myVisitor/myVisitor'; // 我的访客

// 个人信息tab
const PersonInfoStack = createStackNavigator(
  {
    MyInfoIndex: MyInfoScreen,
    ModifyPwd: ModifyPwdScreen
  },
  {
    initialRouteName: 'MyInfoIndex',
  }
); 

export const AppStack = createBottomTabNavigator(
  { 
    Home: {
      screen: MyVisitorScreen, 
      // navigationOption
    },
    MyInfo: {
      screen: PersonInfoStack
    }
  },
/*   {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#ff0',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  } */
/*   {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state
        let iconImage
        if (routeName === 'Home') {
          iconImage = focused
            ? require('../../assets/images/tabs/ic_tab_visiting_pressed.png')
            : require('../../assets/images/tabs/ic_tab_visiting_unpressed.png')
        } else if (routeName === 'Other') {
          iconImage = focused
            ? require('../../assets/images/tabs/ic_tab_intention_unpressed.png')
            : require('../../assets/images/tabs/ic_tab_intention_unpressed.png')
        }
        return (
          <Image
          resizeMode="contain"
          source={iconImage}
        />
        )
      },
      tabBarLabel: ({focused, tintColor}) => {
        const {routeName} = navigation.state
        let tabTitleText
        if (routeName === 'Home') {
          tabTitleText = '我的访客'
        } else if (routeName === 'Other') {
          tabTitleText = '个人信息'
        }
        return (
          <Text>
            {tabTitleText}
          </Text>
        )
      },
    }),
  } */
);

/* const AppNavigator = createBottomTabNavigator(
  {
    VisitingTab: {
      screen: VisitingStack
    },
    IntentionTab: {
      screen: IntentionStack
    },
    ReportTab: {
      screen: ReportStack
    },
    DeliverTab: {
      screen: DeliverStack
    },
    PreferenceTab: {
      screen: PreferenceStack
    }
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state
        let iconImage
        if (routeName === 'VisitingTab') {
          iconImage = focused
            ? require('./assets/images/tabs/ic_tab_visiting_pressed.png')
            : require('./assets/images/tabs/ic_tab_visiting_unpressed.png')
        } else if (routeName === 'IntentionTab') {
          iconImage = focused
            ? require('./assets/images/tabs/ic_tab_intention_unpressed.png')
            : require('./assets/images/tabs/ic_tab_intention_unpressed.png')
        } else if (routeName === 'ReportTab') {
          iconImage = focused
            ? require('./assets/images/tabs/ic_tab_report.png')
            : require('./assets/images/tabs/ic_tab_report.png')
        } else if (routeName === 'DeliverTab') {
          iconImage = focused
            ? require('./assets/images/tabs/ic_tab_deliver_pressed.png')
            : require('./assets/images/tabs/ic_tab_deliver_unpressed.png')
        } else if (routeName === 'PreferenceTab') {
          iconImage = focused
            ? require('./assets/images/tabs/ic_tab_preference_unpressed.png')
            : require('./assets/images/tabs/ic_tab_preference_unpressed.png')
        }
        return (
          <IconWithBadge
            routeName={routeName}
            iconImage={iconImage}
            badgeCount={2}
          />
        )
      },
      tabBarLabel: ({focused, tintColor}) => {
        const {routeName} = navigation.state
        let tabTitleText
        if (routeName === 'VisitingTab') {
          tabTitleText = '拜访'
        } else if (routeName === 'IntentionTab') {
          tabTitleText = '意向'
        } else if (routeName === 'ReportTab') {
          tabTitleText = '报表'
        } else if (routeName === 'DeliverTab') {
          tabTitleText = '交付'
        } else if (routeName === 'PreferenceTab') {
          tabTitleText = '我'
        }
        return (
          <Text style={focused ? CommonStyles.iconPressedTextStyle : CommonStyles.iconUnpressedTextStyle}>
            {tabTitleText}
          </Text>
        )
      },
    }),
    tabBarOptions: {
      style: {
        height: 50 * DIMENSION_RATIO
      },
      allowFontScaling: false,
      activeTintColor: '#262D84',
      inactiveTintColor: '#686868',
    },
  }
) */