import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger'

import visitorsManage from '../redux/reducer/visitors';

const preloadedState = {};

export default store = createStore(
  combineReducers({
    visitorsManage,
  }),
  preloadedState,
  applyMiddleware(
    thunkMiddleware,
    createLogger(),
  )
)