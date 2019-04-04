// import { BaseUrl } from './global'
import { get, post } from './http'
import fetch from './fetchHttp'


// 在页面上使用实例说明
/*
import {
  getAttendanceData
} from '../../http/api'
getAttendanceData(this.state.centername).then(res => {
  this.setState({
    dataSource: res.titledata,
  })
})
 */
const BaseUrl = 'http://10.19.8.22:8100'

// export const getAttendanceData = (centername) => post(BaseUrl + '/sanyAttendanceData/getAttendanceData', {centername: centername});
//登录---接口
// export const LoginRequest = (param) => post(BaseUrl +'/user/SanyBasicShrUser/login', param)
export const LoginRequest = (param) => fetch.post(BaseUrl +'/user/SanyBasicShrUser/login', param)
//忘记密码--确定设置新密码--接口
// export const regSubmitNewPwd = (password,code,telephone) => post(`${BaseUrl}/user/SanyBasicShrUser/setNewPassword`,{password,code,telephone});
export const regSubmitNewPwd = (password,code,telephone) => fetch.post(`${BaseUrl}/user/SanyBasicShrUser/setNewPassword`,{password,code,telephone});
//忘记密码--手机号验证--接口
// export const regTelIsExist = (telephone) => post(`${BaseUrl}/user/SanyBasicShrUser/forgetPassword`,{telephone});
export const regTelIsExist = (telephone) => fetch.post(BaseUrl+'/user/SanyBasicShrUser/forgetPassword',{telephone});
//忘记密码--发送验证码--接口
// export const regSendExpregNumber = (telephone) => post(`${BaseUrl}/user/SanyBasicShrUser/sendMessageByTelephone`,{telephone});
export const regSendExpregNumber = (telephone) => fetch.post(`${BaseUrl}/user/SanyBasicShrUser/sendMessageByTelephone`,{telephone});