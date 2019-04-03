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