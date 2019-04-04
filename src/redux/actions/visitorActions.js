import * as actionTypes from '../actionTypes'

// 访客列表
export const VisitorListAction = function(visitorList){
  return({
    type: actionTypes.VISITORS_LIST,
    visitorList,
  })
}
// 新增一条访客对象
export const AddVisitorAction = function(visitor){
  // console.log('kkk', visitor);
  return({
    type: actionTypes.VISITORSAPP_ADD_VISITOR,
    visitor,
  })
}
// 编辑一条访客对象
export const EditVisitorObjAction = function(visitor){
  // console.log('kkk', visitor);
  return({
    type: actionTypes.VISITORSAPP_EDIT_VISITOROBJ,
    visitor,
  })
}
// 新增一条访客人员
export const AddPersonAction = function(person){
  // console.log('kkk', visitor);
  return({
    type: actionTypes.VISITORSAPP_ADD_VISITOR_MEMBER,
    person,
  })
}

// 更新一条访客人员
export const UpdatePersonAction = function(item) {
  return({
    type: actionTypes.VISITORSAPP_UPDATE_VISITOR_MEMBER,
    item
  })
}
// 编辑访客成员
export const EditPersonAction = function (person) {
  return ({
    type: actionTypes.VISITORSAPP_EDIT_VISITOR_MEMBER,
    person
  })
}
// 编辑保存访客成员
export const EditSAVEPersonAction = function (person) {
  return ({
    type: actionTypes.VISITORSAPP_EDITSAVE_VISITOR_MEMBER,
    person
  })
}


// 取消选中访客成员
export const CancleCheckedPersonAction = function(id) {
  return({
    type: actionTypes.VISITORSAPP_CANCLECHECKED_VISITOR_MEMBER,
    id
  })
}

// 删除一条访客人员
export const DeletePersonAction = function(id) {
  return({
    type: actionTypes.VISITORSAPP_DELETE_VISITOR_MEMBER,
    id
  })
}