import * as actionTypes from '../actionTypes';
import _ from "lodash";
import update from 'immutability-helper'

const initialState = {
  visitorsList: [], // 访客列表
  currentVisitorObj: { // 当前新增对象
    id: Math.random()*1000,
    uname: '',
    visitDate: '',
    visitCycle: '',
    visitorNum: '',
    carNum: '',
    visitReason: '',
    persons: [
      /* {
        uName: '张三',
        tel: '15625896541',
        cardId: '411524789654123658',
        carId: '京A78965'
      }*/
    ]
  },
  currentPeopleObj: {
    uName: '',
    tel: '',
    cardId: '',
    carId: ''
  }
};

export default visitors = (state = initialState, action) => {
  switch(action.type){
    // 访客列表
    case actionTypes.VISITORS_LIST: {
      return Object.assign({}, state, { visitorsList: action.visitorList})
    }
    // 新增访客对象
    case actionTypes.VISITORSAPP_ADD_VISITOR: {
      /* const nextState = _.cloneDeep(state);
      nextState.visitors.push(action.visitor);
      return nextState; */

      return update(state, {
        visitorsList: {$push: [action.visitor]}
      })
    }
    // 编辑访客对象
    case actionTypes.VISITORSAPP_EDIT_VISITOROBJ: {
      const nextState = _.cloneDeep(state);
      nextState.currentVisitorObj = action.visitor;
      return nextState;
    }
    // 新增访客人员
    case actionTypes.VISITORSAPP_ADD_VISITOR_MEMBER: {
      // return update(state, {
      //   personList: {$push: [action.person]}
      // })
      const nextState = _.cloneDeep(state);
      nextState.currentVisitorObj.persons.push(action.person);
      return nextState;
    }
    // 修改访客人员 checkbox
    case actionTypes.VISITORSAPP_UPDATE_VISITOR_MEMBER: {
      const index = state.currentVisitorObj.persons.indexOf(state.currentVisitorObj.persons.find(person => person.id === action.item.id))
      const nextState = _.cloneDeep(state);
      nextState.currentVisitorObj.persons[index].isChecked = !nextState.currentVisitorObj.persons[index].isChecked
      return {
        ...state,
        currentVisitorObj: nextState.currentVisitorObj
      }
    }
    // 编辑访客成员
    case actionTypes.VISITORSAPP_EDIT_VISITOR_MEMBER: {
      // const index = state.currentVisitorObj.persons.indexOf(state.currentVisitorObj.persons.find(person => person.id === action.item.id))
      const nextState = _.cloneDeep(state);
      // nextState.currentVisitorObj.persons[index] = action.person
      nextState.currentPeopleObj = action.person
      // console.log('nextState:',nextState)
      return {
        ...state,
        // currentVisitorObj: nextState.currentVisitorObj,
        currentPeopleObj: action.person
      }
    }
     // 编辑保存访客成员
     case actionTypes.VISITORSAPP_EDITSAVE_VISITOR_MEMBER: {
      const index = state.currentVisitorObj.persons.indexOf(state.currentVisitorObj.persons.find(person => person.id === action.person.id))
      const nextState = _.cloneDeep(state);
      // debugger;
      nextState.currentVisitorObj.persons[index] = action.person
      return {
        ...state,
        currentVisitorObj: nextState.currentVisitorObj,
      }
    }


    // 取消选中访客成员
    case actionTypes.VISITORSAPP_CANCLECHECKED_VISITOR_MEMBER: {
      const index = state.currentVisitorObj.persons.indexOf(state.currentVisitorObj.persons.find(person => person.id === action.id))
      const nextState = _.cloneDeep(state);
      nextState.currentVisitorObj.persons[index].isChecked = false
      return {
        ...state,
        currentVisitorObj: nextState.currentVisitorObj
      }
    }
    
    // 删除访客成员
    case actionTypes.VISITORSAPP_DELETE_VISITOR_MEMBER: {
      const indexP = state.currentVisitorObj.persons.indexOf(state.currentVisitorObj.persons.find(person => person.id === action.id))
      const nextState = _.cloneDeep(state);
      nextState.currentVisitorObj.persons.splice(indexP, 1)
      return {
        ...state,
        currentVisitorObj: nextState.currentVisitorObj
      }
    }
    

    default:
      return state;
  }
}