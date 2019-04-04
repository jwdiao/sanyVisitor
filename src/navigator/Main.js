import React from 'react';
import {
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// 个人信息tab
import { MyInfoScreen } from '../pages/personInfo/Index'; // 个人信息
import { ModifyPwdScreen } from '../pages/personInfo/ModifyPwd'; // 修改密码
import { ModifyPwdSuccessScreen } from '../pages/personInfo/ModifyPwdSuccess'; // 修改密码

// 
import MyVisitorScreen from '../pages/myVisitor/MyVisitor'; // 我的访客
import VisitorHistoryScreen from '../pages/myVisitor/VisitorHistory'; // 访客历史
import RecordVisitorScreen from '../pages/myVisitor/RecordVisitor'; // 访客
import AddVisitorScreen from '../pages/myVisitor/AddVisitor'; // 信息录入
import EditPeopleScreen from '../pages/myVisitor/EditPeople'; // 信息编辑

import { TestScreen } from '../pages/test/Header'; // 测试
import { px2dp } from '../utils/ScreenUtil';


/* 
// 我的访客tab
const MyVisitorStack = createStackNavigator(
  {
    MyVisitorIndex: {
      screen: MyVisitorScreen,
      navigationOptions: {
        title: '我的访客',
        headerLeft: <View />,
        // headerTitle: <Text style={{ flex: 1, textAlign: 'center' }}>自定义Header</Text>,
        headerRight: (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#ff0"
          />
        ),
      }
    },
    RecordVisitor: {
      screen: RecordVisitorScreen,
      navigationOptions: {
        title: '访客录入',
        headerRight: <View />
      }
    },
    AddVisitor: {
      screen: AddVisitorScreen,
      navigationOptions: {
        title: '新增访客',
        headerRight: <View />
      }
    },
    
  },
  {
    initialRouteName: 'MyVisitorIndex',
    defaultNavigationOptions: {
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
      },
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor:'#28A0F6'
      }
    }
  }
); 


// 个人信息tab
const PersonInfoStack = createStackNavigator(
  {
    MyInfoIndex: MyInfoScreen,
    ModifyPwd: ModifyPwdScreen
  },
  {
    initialRouteName: 'MyInfoIndex',
  }
);  */

let platformContainerStyles;
if (Platform.OS === 'ios') {
  platformContainerStyles = {
    borderBottomWidth: 0,
    borderBottomColor: '#A7A7AA'
  }
} else {
  platformContainerStyles = {
    backgroundColor:'#4487d6',
    shadowColor: 'black',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0
    },
    elevation: 0
  }
  
}
{/* <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#ff0"
        /> */}
const MyVisitorStack = createStackNavigator({
  MyVisitorIndex: {
    screen: MyVisitorScreen,
    navigationOptions: {
      header: null
      /* title: '我的访客',
      headerLeft: <View />,
      // headerTitle: <Text style={{ flex: 1, textAlign: 'center' }}>自定义Header</Text>,
      headerRight: (
        <MaterialCommunityIcons name={'history'} size={26} color={'#fff'} style={{marginRight: 15}} />
      ),
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
      },
      headerTintColor: '#fff',
      headerStyle: platformContainerStyles */
    }
  }
}, 
);

const PersonInfoStack = createStackNavigator({
  MyInfoIndex: {
    screen: MyInfoScreen,
    navigationOptions: {
      // header: null
      title: '个人',
      headerLeft: <View />,
      // headerTitle: <Text style={{ flex: 1, textAlign: 'center' }}>自定义Header</Text>,
      headerRight: <View />,
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
      },
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor:'#4487d6'
      },
    }
  }
});


const TabNavigator = createBottomTabNavigator(
  { 
    // 首页：我的访客
    Home: {
      screen: MyVisitorStack,
    },
    // 个人
    MyInfo: {
      screen: PersonInfoStack,
    },
    
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state
        let iconName
        if (routeName === 'Home') {
          iconName = 'th-large'
        } else if (routeName === 'MyInfo') {
          iconName = 'user'
        }
        return (
          <View><FontAwesome name={iconName} size={24} color={tintColor} /></View>
        )
      },
      tabBarLabel: ({focused, tintColor}) => {
        const {routeName} = navigation.state
        let tabTitleText
        if (routeName == 'Home') {
          tabTitleText = '访客'
        } else if (routeName == 'MyInfo') {
          tabTitleText = '个人'
        }
        return (
          <Text style={focused ? styles.iconPressedTextStyle : styles.iconUnpressedTextStyle}>
            {tabTitleText}
          </Text>
        )
      },
    }),
    tabBarOptions: {
      style: {
        borderTopWidth:0,
        height: px2dp(100),
        backgroundColor: '#FFFEFF',
        elevation: 10,
        // paddingHorizontal:16,paddingVertical:23
      },
      allowFontScaling: false,
      activeTintColor: '#2380FE', // focused颜色
      inactiveTintColor: '#D7D8E1', // 没有激活的颜色
    },
  }
);

export const AppStack = createStackNavigator({
  Tabs: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  VisitorHistory: {
    screen: VisitorHistoryScreen,
    navigationOptions: {
      header: null
    }
  },
  RecordVisitor: {
    screen: RecordVisitorScreen,
    navigationOptions: {
      header: null
    }
/*     navigationOptions: ({navigation}) =>{
      return ({
        title: '增加访客',
        headerLeft: function(){
          return (
            <TouchableOpacity activeOpacity={1} onPress={() =>navigation.goBack()}>
            <View style={{display:'flex',flexDirection: 'row',justifyContent: 'center',alignItem: 'center',paddingLeft: 15}}>
              <FontAwesome name={'angle-left'} size={30} color={'#fff'} />
              <Text style={{color:'#fff',fontSize: 18,paddingTop: 4,paddingLeft: 4}}>返回</Text>
            </View>
            </TouchableOpacity>
          )
        },
        headerRight: <View />,
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
        },
        headerTintColor: '#fff',
        headerStyle: platformContainerStyles
      })
    } */
    /* navigationOptions: {
      title: '增加访客',
      headerRight: <View />
    } */
  },
  AddVisitor: {
    screen: AddVisitorScreen,
    navigationOptions: {
      header: null
    }
    /* navigationOptions: ({navigation}) =>{
      return ({
        title: '信息录入',
        headerRight: <View />,
        headerLeft: function(){
          return (
            <TouchableOpacity activeOpacity={1} onPress={() =>navigation.goBack()}>
            <View style={{display:'flex',flexDirection: 'row',justifyContent: 'center',alignItem: 'center',paddingLeft: 15}}>
              <FontAwesome name={'angle-left'} size={30} color={'#fff'} />
              <Text style={{color:'#fff',fontSize: 18,paddingTop: 4,paddingLeft: 4}}>返回</Text>
            </View>
            </TouchableOpacity>
          )
        },
        headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
        },
        headerTintColor: '#fff',
        headerStyle: platformContainerStyles
      })
    } */
  },
  EditPeople: {
    screen: EditPeopleScreen,
    navigationOptions: {
      header: null
    }
  },
  ModifyPwd: {
    screen: ModifyPwdScreen,
    navigationOptions: {
      title: '修改密码',
      headerRight: <View />
    }
  },
  ModifyPwdSuccess: {
    screen: ModifyPwdSuccessScreen,
    navigationOptions: {
      title: '修改密码',
      headerRight: <View />
    }
  },
  Test: {
    screen: TestScreen,
    navigationOptions: {
      header: null,
      // title: '测试页面',
      // headerRight: <View />
    }
  }
},
{
  initialRouteName: 'Tabs',
  defaultNavigationOptions: {
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
    },
    
    headerTintColor: '#fff',
    headerStyle: {
      
    }
  }
},
);


const styles = StyleSheet.create({
  iconUnpressedTextStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign:'center',
    color: '#D7D8E1',
    marginTop: -8,
    paddingBottom: 4
  },
  iconPressedTextStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign:'center',
    color: '#1379C9',
    marginTop: -8,
    paddingBottom: 4
  },  
})
