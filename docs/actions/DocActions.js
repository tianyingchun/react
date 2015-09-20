import * as DocActionTypes from '../constants/DocActionTypes';
import DocService from '../services/Doc';

let docService = new DocService();

let docDetailDto = (doc) => {
  // May be we can do some data transfer here.
  // ...
  return {
    type: DocActionTypes.SHOW_DOC_DETAIL,
    payload: doc
  }
};

//promiseMiddleware, can be attached to component.needs for server async rendering also.
export function searchDocs(routerParams) {
  console.log('action.searchDocs router params: ', routerParams)
  return {
    type: DocActionTypes.SEARCH_DOCS,
    payload: {
      promise: docService.searchDocs(routerParams)
    }
  }
};

// thunkMiddleware
export function getDocDetails(routerParams) {
  console.log('action.getDocDetails router params: ', routerParams)
  return (dispatch, getState) => {
    return docService.loadDocDetail(routerParams)
      .then(function (result) {
        dispatch(docDetailDto(result));
      });
  };
};
