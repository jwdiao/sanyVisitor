### 顶部状态条相关(参考地址:https://juejin.im/post/5c4949bc6fb9a049bd42a6eb)
yarn add hoist-non-react-statics

yarn add @babel/plugin-proposal-decorators --dev
安装后再babel.config.js里面加一句话（babel里面plugins那句）：
"babel": {
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ],
    "presets": [
      "react-app"
    ]
  },


  ### flatlist
  1、设置paddingTop和paddingBottom不生效。
  解决：<FlatList contentContainerStyle={{paddingTop:20, paddingBottom: 10}} />

##引用SVG图片
###1. yarn add react-native-svg --save
###2. react-native link react-native-svg
###3. yarn add react-native-svg-uri --save
    报错时:android/setting.gradle文件中  地址转换/
    重新build或
    
##raect native debugger安装
####文件目录 node_modules/react-native/Libraries/Core/LnitializeCore.js
	global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest
global.FormData = global.originalFormData
  ? global.originalFormData
  : global.FormData

fetch // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) {
  // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false
} else {
  /*
   * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
   * If you're using another way you can just use the native Blob and remove the `else` statement
   */
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob
  global.FileReader = global.originalFileReader
    ? global.originalFileReader
    : global.FileReader
}
##应用  react-native-storage
###1  yarn add react-native-storage
###2  yarn add @react-native-community/async-storage
###3  react-native link @react-native-community/async-storage
报错时:android/setting.gradle文件中  地址转换/