/*
import React from 'react';
import {
  AsyncStorage,ImageBackground,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

import {
  getAttendanceData
} from '../../http/api'

export class MyInfoScreen extends React.Component {
  static navigationOptions = {
    title: '个人信息',
  };
  constructor(props){
    super(props);
    this.state ={
      centername: '',
      dataSource: {}
    }
  };
  componentDidMount(){
    
    // 测试接口
    getAttendanceData(this.state.centername).then(res => {
      debugger;
      console.log('ppp:',res)
      this.setState({
        dataSource: res.titledata,
      })
    })
  };

  render() {
    return (
      <ImageBackground source={require('./images/profile-bg.png')}>
        <View>
          <Text>个人信息</Text>
          <View>
            <TextInput placeholder="姓名"/>
          </View>
          <View>
            <TextInput placeholder="电话"/>
          </View>
          <View>
            <TextInput placeholder="登陆账号"/>
          </View>
          <Text>测试数据请求接口数据:{this.state.dataSource.lateNum}</Text>
          <Button title="修改密码" onPress={this._modifyPwd} />
        </View>
      </ImageBackground>

    );
  }
  _modifyPwd = async () => {
    this.props.navigation.navigate('ModifyPwd');
  };
}*/



import React from 'react';
import {
  AsyncStorage,ImageBackground,Dimensions,
  Button,Image,ScrollView,TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {px2dp} from "../../utils/ScreenUtil";
// ======顶部背景图片=======
import {STATUS_BAR_HEIGHT,HEADER_HEIGHT} from '../../components/Header'
import Header from '../../components/Header'
import { setStatusBar } from '../../components/HOC/StatusBar'
import storage from '../../storage/RNAsyncStorage'
@setStatusBar({
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent'
})

export class MyInfoScreen extends React.Component {
  static navigationOptions = {
    header:null // 隐藏顶部导航栏
  };
  state= {
    userName:'王小级',
    userAccount:'9000299230',
    telNumber:'15125348888',
    imageURL:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAEzUlEQVR4Xu2dy44cIRAEd/7/o8eSb81KGwplMXhx+kpTBRn1oOmx/Xq/3++v/rlGgVeBXsPy70YK9C6eBXoZzwIt0NsUuGw/7aEFepkCl22nGVqglylw2XaaoQV6mQKXbacZWqCXKXDZdpqhBXqZApdtJ87Q1+v1UUmmP9+u61/t/7b9FegSkAXaDB2tUGkFaoY2Q58BST0oDd9p+9aefd7ud9r+eIamJWMVZHzDkJG7/e+2X6Dwo8fpgCpQmVFU8iwg+zz5//VA7XscvTbYcRKYgNlx8je9/m8Bkv4u9/SGyT8JTPPtOPkrUPlaYQ9lFhgBKdBFARLMjpPABbooZAUhgS0w26NX/5TRp/dHel3fQ60ABdoMfShgK4StQDZAt18s7N6wtd+SCyFyuscQ0OmSShlGGUXzab1k//oMJYFsQBIQEpzm03rJfoGG77lUIajEU0ARwP/ulEsRT4LacQLw6zOUNkjjVtAU4O7L8932t5dcAkbjBUoKPccLtN9Dl4gY/l5pSxJlsLWXPu/y6evLrp/sj2coOUzH7aGCBLPj6fppPp0BaH6BytcWEjQdL1AJJM3wFBjNL9ACfcRIXHIp4naP001NGvG71z9tv0CnFT1sr0APA5h2X6DTih62FwP99Huc7Ylpj6X5lp9dv7VfoPLqzwq8Pl+giyJWEMowskfzLWDyZ+19u6r81345TxuyghAQskfzab2/PkPTDdie/OmbHwqAbxkTXnzYgBnvoQX6VCAN0AKVGWEFa4bK/0UkjWg7v0AXBayAaYQTgNQ+9eS0pdgeS/s9fspNBacNpvYLVPasVPAC/VmB8VMuRXiBulMwBfB4yaWeYHtO2pOnLwLs+kkPG9AFuvmfqrNAKEAtMHo+LrkUkTbCSQA7TgLY8QJdFCNBLDDq2RYYPU/rpwC382k923soLWC6x5FAaYBYQOn+aD+ob/q1hRyQIHb+p0s4rX+6QhSo/EBNAEhQm/E2YMk/2Rs/FKHD4VMoCWABTNsjPWzFIXsfB0oLsuO2Z+3OULv+6ecLVP7tOcr4aUDWXoEWqI2Zvc+35D71jTPUCprinT60TPdUe8iZLuEFurz2WIEpoNMAtAlQoAW61Ozh90qKyDTiKQNpnG6Oriu5JDgBI8Go51lB0/Wk/mwA0XrHS26Bvknzx3iBQs9LM4ZopIcgW4FoPd/spV9bpiPMbnhaYBJw2t+0fttLLglAGUUbtuOpvzTgplvSxzO0QJ//YW6Bhr/7pYCiUzMBsBWC7FHJp/GW3OGLhTRACBiNXwfU9kgSiMZPA7y+hxZoWNRtD5mO+LRH0npovBkKClmBCvQp6HU91BactMJYf5Tx6XiBytci6tEpkHR+gRboUrNDQSjibUm0JdDap/WmGZbO356h8QKHf5VHhyi7Xgog8kfz7XoK1Cq2PE9ACnQRjEpi+vUj5PlVoFLBAnWCjZdc594/TRcP9tCyO2Aog70CP88o0M2HrgINrwaboWEI0SluuqS05G4uudPAai9TIO6hmfvOnlagQKcVPWyvQA8DmHZfoNOKHrZXoIcBTLsv0GlFD9sr0MMApt0X6LSih+0V6GEA0+4LdFrRw/YK9DCAafcFOq3oYXsFehjAtPsCnVb0sL0CPQxg2v0fxrUnDuOUSlAAAAAASUVORK5CYII=',

  }
	componentDidMount(){
		this._loadText()
	}
  render() {
      const {userName,userAccount,telNumber} = this.state
    return (

        <View>
          <ImageBackground source={require('./img/head_bg1.png')} style={styles.backgroundImage}>
            <Header title="个人" fullScreen />
          </ImageBackground>
          <View>
            <View style={styles.sizeViewTop}>
              <View style={{marginTop:-70*scale,}}>
                {/*<Image style={styles.avarterImg} source={require('./img/title.png')}/>*/}
                {/*<Image style={{width:70,height:70}}  source={{uri:'https://avatar.csdn.net/F/9/6/3_public_calss.jpg'}}/>*/}
                <Image style={styles.avarterImg}  source={{uri:this.state.imageURL}}/>
              </View>
              <Text style={{fontWeight:'bold',fontSize:18,marginTop:10,marginBottom:6}}>{userName}</Text>
              <Text style={{fontSize:16}}>账号{userAccount}</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <View style={styles.sizeViewBottom}>
                <Text style={{borderLeftColor:'#458ad8',borderLeftWidth:4,fontSize:16,marginLeft:-17,paddingLeft:17,}}>安全设置</Text>
                <View  style={[styles.phoneAndChangePwd,{paddingBottom:20,paddingTop:20,borderBottomWidth:1,borderBottomColor:'#f0f0f0'}]}>
                  <View >
                    <MaterialIcons color='#4ec7ff' name={'phone-android'} size={24}/>
                  </View>
                  <View>
                    <Text style={{fontSize:16,}}>电       话</Text>
                  </View>
                  <View>
                    <Text style={{fontSize:16,paddingLeft:width*0.20}}>{telNumber}</Text>
                  </View>
                </View>
                <View style={[styles.phoneAndChangePwd,{paddingBottom:0,paddingTop:20,}]} >
                  <View>
                    <MaterialCommunityIcons color='#47f3a0' name={'shield-cross'} size={24}/>
                  </View>
                  <View >
                    <Text  onPress={this._modifyPwd} style={{fontSize:16,paddingRight:width*0.43}}>修改密码</Text>
                  </View>
                  <View>
                    <AntDesign color='#999' name={'right'} size={24}/>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

    );
  }
	//获取storage值的函数
  _loadText = ()=>{
		const urlImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAEzUlEQVR4Xu2dy44cIRAEd/7/o8eSb81KGwplMXhx+kpTBRn1oOmx/Xq/3++v/rlGgVeBXsPy70YK9C6eBXoZzwIt0NsUuGw/7aEFepkCl22nGVqglylw2XaaoQV6mQKXbacZWqCXKXDZdpqhBXqZApdtJ87Q1+v1UUmmP9+u61/t/7b9FegSkAXaDB2tUGkFaoY2Q58BST0oDd9p+9aefd7ud9r+eIamJWMVZHzDkJG7/e+2X6Dwo8fpgCpQmVFU8iwg+zz5//VA7XscvTbYcRKYgNlx8je9/m8Bkv4u9/SGyT8JTPPtOPkrUPlaYQ9lFhgBKdBFARLMjpPABbooZAUhgS0w26NX/5TRp/dHel3fQ60ABdoMfShgK4StQDZAt18s7N6wtd+SCyFyuscQ0OmSShlGGUXzab1k//oMJYFsQBIQEpzm03rJfoGG77lUIajEU0ARwP/ulEsRT4LacQLw6zOUNkjjVtAU4O7L8932t5dcAkbjBUoKPccLtN9Dl4gY/l5pSxJlsLWXPu/y6evLrp/sj2coOUzH7aGCBLPj6fppPp0BaH6BytcWEjQdL1AJJM3wFBjNL9ACfcRIXHIp4naP001NGvG71z9tv0CnFT1sr0APA5h2X6DTih62FwP99Huc7Ylpj6X5lp9dv7VfoPLqzwq8Pl+giyJWEMowskfzLWDyZ+19u6r81345TxuyghAQskfzab2/PkPTDdie/OmbHwqAbxkTXnzYgBnvoQX6VCAN0AKVGWEFa4bK/0UkjWg7v0AXBayAaYQTgNQ+9eS0pdgeS/s9fspNBacNpvYLVPasVPAC/VmB8VMuRXiBulMwBfB4yaWeYHtO2pOnLwLs+kkPG9AFuvmfqrNAKEAtMHo+LrkUkTbCSQA7TgLY8QJdFCNBLDDq2RYYPU/rpwC382k923soLWC6x5FAaYBYQOn+aD+ob/q1hRyQIHb+p0s4rX+6QhSo/EBNAEhQm/E2YMk/2Rs/FKHD4VMoCWABTNsjPWzFIXsfB0oLsuO2Z+3OULv+6ecLVP7tOcr4aUDWXoEWqI2Zvc+35D71jTPUCprinT60TPdUe8iZLuEFurz2WIEpoNMAtAlQoAW61Ozh90qKyDTiKQNpnG6Oriu5JDgBI8Go51lB0/Wk/mwA0XrHS26Bvknzx3iBQs9LM4ZopIcgW4FoPd/spV9bpiPMbnhaYBJw2t+0fttLLglAGUUbtuOpvzTgplvSxzO0QJ//YW6Bhr/7pYCiUzMBsBWC7FHJp/GW3OGLhTRACBiNXwfU9kgSiMZPA7y+hxZoWNRtD5mO+LRH0npovBkKClmBCvQp6HU91BactMJYf5Tx6XiBytci6tEpkHR+gRboUrNDQSjibUm0JdDap/WmGZbO356h8QKHf5VHhyi7Xgog8kfz7XoK1Cq2PE9ACnQRjEpi+vUj5PlVoFLBAnWCjZdc594/TRcP9tCyO2Aog70CP88o0M2HrgINrwaboWEI0SluuqS05G4uudPAai9TIO6hmfvOnlagQKcVPWyvQA8DmHZfoNOKHrZXoIcBTLsv0GlFD9sr0MMApt0X6LSih+0V6GEA0+4LdFrRw/YK9DCAafcFOq3oYXsFehjAtPsCnVb0sL0CPQxg2v0fxrUnDuOUSlAAAAAASUVORK5CYII='
		storage.load({
             key: 'loginState',
             // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
             autoSync: true,
             // syncInBackground(默认为true)意味着如果数据过期，
             // 在调用sync方法的同时先返回已经过期的数据。
             // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
             syncInBackground: true,

             // 你还可以给sync方法传递额外的参数
             syncParams: {
                 extraFetchOptions: {
                     // 各种参数
                 },
                 someFlag: true,
             },
         }).then(ret => {
             // 如果找到数据，则在then方法中返回
             // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
             // 你只能在then这个方法内继续处理ret数据
             // 而不能在then以外处理
             // 也没有办法“变成”同步返回
             // 你也可以使用“看似”同步的async/await语法
            var outerIp = 'http://222.240.233.67:8181'    //当外网时使用，目前只能外网访问
             this.setState({telNumber:ret.userNo,
						 imageURL:ret.imgUrlUpload?outerIp.concat(ret.imgUrlUpload.slice(22,ret.imgUrlUpload.length)) : urlImg,
						 userName:ret.userName,userAccount:ret.userNo});


             console.log('imageUrl:',this.state.imageURL)
         }).catch(err => {
             //如果没有找到数据且没有sync方法，
             //或者有其他异常，则在catch中返回
             console.warn(err.message);
             switch (err.name) {
                 case 'NotFoundError':
                     // TODO;
                     this.setState({ data: 'NotFoundError' });
                     break;
                 case 'ExpiredError':
                     this.setState({ data: 'ExpiredError' });
                     break;
             }
         })
		
	}
  _modifyPwd = () => {
    this.props.navigation.navigate('ModifyPwd');
  };

}
let {width,height} = Dimensions.get('window')
let scale = width/375
const styles = StyleSheet.create({
  backgroundImage: {
    width:'100%',height:px2dp(397),
    // position: 'absolute',top:-1,left:0,right:0,
    // zIndex:-1,
    // backgroundColor: '#4487d6',
  },
  sizeViewTop:{backgroundColor:'#fff',left:(width-300*scale)/2,width:300*scale,height:120*scale,elevation: 6,
    paddingHorizontal:16,paddingVertical:23,justifyContent:'center',alignItems:'center',borderRadius:5,marginTop:-85*scale},
  // backgroundImage:{width:width,height:height*0.3},
  // sizeViewTop:{backgroundColor:'#fff',marginTop:80*scale,left:(width-300*scale)/2,width:300*scale,height:130*scale,elevation: 2,
  //   paddingHorizontal:16,paddingVertical:23,justifyContent:'center',alignItems:'center',borderRadius:5},
  avarterImg:{width:70*scale,height:height*0.1,borderRadius:70*scale,borderWidth:3,borderColor:'#fff'},
  sizeViewBottom:{backgroundColor:'#fff',marginTop:20*scale,width:width*0.8,height:height*0.25,elevation: 6,
    paddingHorizontal:16,paddingVertical:23,fontSize:16,borderRadius:5,display:'flex'},
  // phoneAndChangePwd:{position:'absolute',top:height*0.1*0.3,left:0,},
  // phoneAndChangeRight:{position:'absolute',top:height*0.3*0.1,right:0,},
  phoneAndChangePwd:{flex:1,flexDirection:'row'},
  // phoneAndChangeRight:{flex:1,justifyContent:'flex-end'}
})

