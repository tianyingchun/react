import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-simple-promise';
import finalReducers from '../reducers';

let loggerMiddleware = createLogger({
  collapsed: false,
  predicate: (/*getState, action*/) => 'production' !== process.env.NODE_ENV
});

// the production middlewares, performace optimazation.
let middlewares = [ promiseMiddleware(), thunkMiddleware ];
let finalCreateStore;

if ('production' === process.env.NODE_ENV) {
  // Production and broswer mode.
  finalCreateStore = applyMiddleware(...middlewares)(createStore);
} else if (typeof window !== 'undefined') {
  // Development and broswer mode
  finalCreateStore = compose (
    applyMiddleware(...middlewares, loggerMiddleware)
  )(createStore);
} else {
  // for Node Env
  finalCreateStore = compose (
    applyMiddleware(...middlewares)
  )(createStore);
}


/**
 * Creates a preconfigured store for this example.
 * @param  {St} moduleName    the reducer module name
 * @param  {Any} initialState initialState values for reducer.
 * @return {Object}           store
 */
export default function configureStore (moduleName, initialState) {

  // store.
  let store = finalCreateStore(finalReducers, initialState);

  return store;
}
