import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger'

import visitorsManage from '../redux/reducer/visitors';
// import accountManage from '../redux/reducer/loginAccount'
const preloadedState = {};

export default store = createStore(
  combineReducers({
    visitorsManage,
    // accountManage
  }),
  preloadedState,
  applyMiddleware(
    thunkMiddleware,
    createLogger(),
  )
)



