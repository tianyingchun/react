import Layout from './Layout';
import LayoutSplitter from './LayoutSplitter';

if (process.env.BROWSER) {
  require('./Layout.less');
}
export default {
  Layout,
  LayoutSplitter
};
