import * as WsActionTypes from '../constants/WsActionTypes';
import { resolve, reject } from 'redux-simple-promise';

let initialState = {
  isLoading: false,
  list:[
    { "id": 1, "name": "workspace name 1" },
    { "id": 2, "name": "workspace name 2" },
    { "id": 3, "name": "workspace name 3" },
    { "id": 4, "name": "workspace name 4" }
  ]
};
export function workspaces (state = initialState, action) {

  let list = Array.isArray(state) ? state : state.list;
  console.log('workspaces reducer payload: ', action.payload)

  switch (action.type) {
    case WsActionTypes.SHOW_WS_LIST:
      return Object.assign({}, { isLoading: false }, { list: action.payload });

    case WsActionTypes.GET_WS_LIST:
      return Object.assign({}, initialState, { isLoading: true });

    case resolve(WsActionTypes.GET_WS_LIST):
      return Object.assign({}, {
        isLoading: false,
        list: action.payload
      });

    case reject(WsActionTypes.GET_WS_LIST):
      return Object.assign({}, {
        isLoading: false,
        list: action.payload
      });

    default:
      return state;
  }
}

export function workspaceOthers (state = '', action) {
  switch (action.type) {
    case WsActionTypes.GET_WS_LIST:

    case resolve(WsActionTypes.GET_WS_LIST):

    case reject(WsActionTypes.GET_WS_LIST):

    default:
      return state;
  }
}
