import * as actionTypes from '../actionTypes'

//登录

export const loginAccountAction = function(numbers){
  return({
    type: actionTypes.LOGINACCOUNT,
    numbers,
  })
}