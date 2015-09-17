import { createHistory, createHashHistory } from 'history'

let platform = () => {
  let ua = navigator.userAgent.toLowerCase();

  let match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
    /(webkit)[ \/]([\w.]+)/.exec(ua) ||
    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
    /(msie) ([\w.]+)/.exec(ua) ||
    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

  let matched = {
    browser: match[1] || "",
    version: match[2] || "0"
  };
  let browser = {};
  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
  }

  // Chrome is Webkit, but Webkit is also Safari.
  if (browser.chrome) {
    browser.webkit = true;
  } else if (browser.webkit) {
    browser.safari = true;
  }
  return browser;
};

let browser = platform();

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

