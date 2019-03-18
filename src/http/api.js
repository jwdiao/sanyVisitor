import { BaseUrl } from './global'
import { get, post } from './http'


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


export const getAttendanceData = (centername) => post(BaseUrl + '/sanyAttendanceData/getAttendanceData', {centername: centername});