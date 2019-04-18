import * as actionTypes from '../actionTypes';

const initialState = {
  loginAccount:'',//登录账号
};
export default account = (state = initialState, action) => {
  debugger
  switch(action.type){
    // 登录账号
    case actionTypes.LOGINACCOUNT: {
      return Object.assign({}, state, { loginAccount: action.loginAccount})
    }
    default:
      return state;
  }
}
