import { combineReducers } from 'redux';
import * as WsReducers from './workspace';

// The final reducers for workspace list.
const finalReducers = combineReducers({
  ...WsReducers
});

export default finalReducers;
