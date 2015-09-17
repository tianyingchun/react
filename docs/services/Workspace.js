import request from 'superagent';
import WebAPI from '../utils/WebAPI';

class Workspace extends WebAPI{
  loadWorkspaceItems = (routerParams) => {
    console.log('service: loadWorkspaceItems routerParams:', routerParams);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { id:1, name:'new workspace item 1' },
          { id:2, name:'new workspace item 2' },
          { id:3, name:'new workspace item 3' },
          { id:4, name:'new workspace item 4' }
        ]);
      }, routerParams.timeout || 0);
    });
  }
}
export default Workspace;
