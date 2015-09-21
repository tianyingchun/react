import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { history } from '../utils/browser';
import configureStore from './configureStore';
import routes from './routes';

const initialState = window.__INITIAL_STATE__;

// specific module reducers 'wslist'.
const store = configureStore('home', initialState);

const rootElement = document.getElementById('react-view');

//https://github.com/rackt/react-router/blob/master/UPGRADE_GUIDE.md#state-mixin
ReactDOM.render(
  <Provider store={ store }>
    {<Router history={ history }>{routes()}</Router>}
  </Provider>,
  rootElement
);

