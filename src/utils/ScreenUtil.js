import { Dimensions,Platform, PixelRatio } from 'react-native'



//UI设计图的宽度
const DesignWidth = 750;
//UI设计图的高度
const DesignHeight = 1334;

//手机屏幕的宽度
export const ScreenWidth = Dimensions.get('window').width;
//手机屏幕的高度
export const ScreenHeight = Dimensions.get('window').height;


// 判断是否是 IphoneX
export function isIphoneX() {
  const X_WIDTH = 375;
  const X_HEIGHT = 812;
  return Platform.OS == 'ios' && (ScreenHeight == X_HEIGHT && ScreenWidth == X_WIDTH)
}

//状态栏的高度
export function getStatusBarHeight() {
  if (Platform.OS == 'android') return StatusBar.currentHeight;
  if (isIphoneX()) {
      return 44
  }
  return 20
}


export function px2dp(uiElementPx){
  return uiElementPx * ScreenWidth / DesignWidth
}

/* export default {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  onePixel: 1/ PixelRatio.get(),

} */


