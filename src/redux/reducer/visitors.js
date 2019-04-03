import * as actionTypes from '../actionTypes';
import _ from "lodash";
import update from 'immutability-helper'

const initialState = {
  visitors: [
    {
      id: '001',
      uname: '张三kkkkk',
      visitStartTime: '2019-04-05',
      visitFlag: '上午',
      visitNum: 3,
      carNum: 3,
      visitReason: '供应商来访',
      persons: [
        {
          uName: '张三',
          tel: '15625896541',
          cardId: '411524789654123658',
          carId: '京A78965'
        },
        {
          uName: '张三9',
          tel: '15625896541',
          cardId: '411524789654123658',
          carId: '京A78965'
        }
      ]
    },
    {
      id: '002',
      uname: '张三2',
      visitStartTime: '2019-04-05',
      visitFlag: '上午',
      visitNum: 3,
      carNum: 3,
      visitReason: '供应商来访'
    },
    {
      id: '003',
      uname: '张三3',
      visitStartTime: '2019-04-05',
      visitFlag: '上午',
      visitNum: 3,
      carNum: 3,
      visitReason: '供应商来访'
    },
    {
      id: '004',
      uname: '张三4',
      visitStartTime: '2019-04-05',
      visitFlag: '上午',
      visitNum: 3,
      carNum: 3,
      visitReason: '供应商来访'
    },
  ]
};

export default visitors = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.VISITORSAPP_ADD_VISITOR:
      // const nextState = _.cloneDeep(state);
      // nextState.visitors.push(action.visitor);
      // debugger
      // return nextState;

      return update(state, {
        visitors: {$push: [action.visitor]}
      })
    default:
      return state;
  }
}