// import { BaseUrl } from './global'
// import { get, post } from './http'
import http from './https'


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

// export const getAttendanceData = (centername) => post(BaseUrl + '/sanyAttendanceData/getAttendanceData', {centername: centername});
// export const getAttendanceData = (centername) => post(BaseUrl + '/sanyAttendanceData/getAttendanceData', {centername: centername});
//登录接口
// export const LoginRequest = (param) => post(`http://10.19.8.22:8100/user/SanyBasicShrUser/login`, param)
export const LoginRequest = (param) => http.post(`http://10.19.8.22:8100/user/SanyBasicShrUser/login`, param)