import { createHistory, createHashHistory } from 'history'
import browser from '../../src/utils/browser';

let autoHistory = () => {
  let { msie, version } = browser;
  if (msie && parseInt(version) <= 9) {
    // see 'history' package
    // HTML5 gives us the `pushState` method and the `popstate` event,
    // but in older browsers the only thing we have is the URL.
    // So, when using hash history, you'll see an extra item in your query string that looks something like `_k=123abc`.
    // This is a key that `history` uses to look up persistent state data in `window.sessionStorage` between page loads.
    //  If you prefer to use a different query parameter, or to opt-out of this behavior entirely, use the `queryKey` configuration option.
    return createHashHistory({ queryKey: false });
  }
  return createHistory();
}
let history = autoHistory();

export { browser, history };

