import { combineReducers } from 'redux';
import * as DocsReducer from './docs';

import * as WsReducers from './workspace';

// The final reducers for docs page
const finalReducers = combineReducers({
  ...DocsReducer
});

export default finalReducers;
