import request from 'superagent';
import WebAPI from '../utils/WebAPI';

class Doc extends WebAPI {

  /**
   * Load doc details
   * @param  {Object} query doc query condictions
   * @return {Object<Doc>}       doc detail information
   */
  loadDocDetail = (query) => {
    console.log('service: loadDocDetail query:', query);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          guide: 'the is guide',
          code: 'this is coce'
        });
      }, query.timeout || 0);
    });
  }

  /**
   * Search docs
   * @param  {Object} query the search docs query conditions
   * @return {Array<Doc>}       results
   */
  searchDocs = (query) => {
    console.log('service: searchDocs query:', query);
    return new Promise((resolve, reject)) => {
      setTimeout(() => {
        resolve([{
          guide: 'the is guide',
          code: 'this is coce'
        }, {
          guide: 'the is guide',
          code: 'this is coce'
        }]);
      }, query.timeout || 0);
    });
  }
  /**
   * Load current doc catalogs.
   * @param  {Object} query doc catalogs
   * @return {Array<DocCatalogItem>}
   */
  loadDocCatalogs = (query) => {
    console.log('service: loadDocCatalogs query:', query);
    return new Promise((resolve, reject)) => {
      setTimeout(() => {
        resolve([{
          guide: 'the is guide',
          code: 'this is coce'
        }, {
          guide: 'the is guide',
          code: 'this is coce'
        }]);
      }, query.timeout || 0);
    });
  }
}

export default Doc;
