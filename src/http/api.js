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
// const BaseUrl = 'http://10.19.8.22:8100'
// const BaseUrl = 'http://10.19.8.21:9010'  //内网
const BaseUrl = 'http://222.240.233.67:9010'  //外网

const BaseUrlYB = 'http://10.88.195.184:1234'

// export const getAttendanceData = (centername) => post(BaseUrl + '/sanyAttendanceData/getAttendanceData', {centername: centername});
//登录---接口
export const LoginRequest = (param) => post(BaseUrl +'/user/SanyBasicShrUser/login', param)
// export const LoginRequest = (param) => fetch.post(BaseUrl +'/user/SanyBasicShrUser/login', param)
//忘记密码--确定设置新密码--接口
// export const regSubmitNewPwd = (password,code,telephone) => post(`${BaseUrl}/user/SanyBasicShrUser/setNewPassword`,{password,code,telephone});
export const regSubmitNewPwd = (password,code,telephone) => fetch.post(`${BaseUrl}/user/SanyBasicShrUser/setNewPassword`,{password,code,telephone});
//忘记密码--手机号验证--接口
// export const regTelIsExist = (telephone) => post(`${BaseUrl}/user/SanyBasicShrUser/forgetPassword`,{telephone});
export const regTelIsExist = (telephone) => fetch.post(BaseUrl+'/user/SanyBasicShrUser/forgetPassword',{telephone});
//忘记密码--发送验证码--接口
// export const regSendExpregNumber = (telephone) => post(`${BaseUrl}/user/SanyBasicShrUser/sendMessageByTelephone`,{telephone});

// export const regSendExpregNumber = (telephone) => fetch.post(`${BaseUrl}/user/SanyBasicShrUser/sendMessageByTelephone`,{telephone});


// 访客列表---接口
export const getVisitorList = (pageNum, pageSize) => fetch.post(`${BaseUrl}/visitorcontrol/sanyBussVisitorApp/getVisitorAllByUser`,{
  pageNum: pageNum, // 分页参数，第几页
  pageSize: pageSize ,// 分页参数，每页多少条
  query:{},
})
// 访客新增---接口
export const addVisitorObjReq = (addVisitorObj) => fetch.post(`${BaseUrl}/visitorcontrol/sanyBussVisitorApp/addApplyAndSendHaiKang`,addVisitorObj)
// 访客历史拜访列表---接口
export const getVisitorHistoryReq = (pageNum, pageSize) => fetch.post(`${BaseUrl}/visitorcontrol/sanyBussVisitorApp/getVisitorHistory`,{
  pageNum: pageNum, // 分页参数，第几页
  pageSize: pageSize, // 分页参数，每页多少条
  query:{userNo:'',visitorName:''}
})
// 访客身份证重复校验
export const reqrRegIDCard = (idCard) =>fetch.post(`${BaseUrl}/visitorcontrol/SanyBussVisitor/selectVisitorsByIdCard`,{idCard})

export const regSendExpregNumber = (telephone) => fetch.post(`${BaseUrl}/user/SanyBasicShrUser/sendMessageByTelephone`,{telephone});
//个人--修改密码--接口
export const reqModifyPwd = (loginAccount,orginalPassword,newPassword) => fetch.post(`${BaseUrl}/user/SanyBasicShrUser/updateLoginPwd`,{loginAccount,orginalPassword,newPassword});
