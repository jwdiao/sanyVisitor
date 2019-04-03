import * as actionTypes from '../actionTypes'

export const addVisitor = function(visitor){
  console.log('kkk', visitor);
  return({
    type: actionTypes.VISITORSAPP_ADD_VISITOR,
    visitor,
  })
}