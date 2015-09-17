import * as WsActionTypes from '../constants/WsActionTypes';
import WorkspaceService from '../services/Workspace';

let workspaceService = new WorkspaceService();

// simple default redux action, directly return object.
export function receiveWsList(wsList) {
  return {
    type: WsActionTypes.SHOW_WS_LIST,
    payload: wsList
  }
}

// promiseMiddleware example, can be attached to component.needs for server async rendering.
export function getExistedWsList(routerParams) {
  return {
    type: WsActionTypes.GET_WS_LIST,
    payload: {
      promise: workspaceService.loadWorkspaceItems(routerParams),
      routerParams
    }
  };
}

// thunkMiddleware example, can be attached to component.needs for server async rendering also.
export function getWsListAsync(routerParams) {
  console.log('router params: ', routerParams)
  return (dispatch, getState) => {
    return workspaceService.loadWorkspaceItems(routerParams)
      .then(function (result) {
        console.log('result', result);
        dispatch(receiveWsList(result));
      });
  };
}
