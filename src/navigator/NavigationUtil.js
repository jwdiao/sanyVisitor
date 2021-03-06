export default class NavigationUtil {

  /* eg: 
  NavigationUtil.goPage({}, 'DetailPage') */
  /**
   * 
   * @param {*} params 要传递的参数
   * @param {*} page 要跳转的页面名
   */
  static goPage(params, page) {
    const navigation = NavigationUtil.navigation;
    if (!navigation) {
      return;
    }
    navigation.navigate(
      page,
      {
        ...params
      }
    )
  }
  /**
   * 返回上一页
   * @param {*} navigation 
   */
  static goBack(navigation) {
    navigation.goBack()
  }
  /**
   * 重置到首页
   */
  static resetToHomePage(params) {
    const { navigation } = params;
    navigation.navigate('Main')
  }
}