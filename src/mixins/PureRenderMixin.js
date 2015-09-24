import isShallowEqual from '../utils/shallowEqual';

//backport PureRenderEqual
export default {
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return !isShallowEqual(this.props, nextProps) || !isShallowEqual(this.state, nextState);
  }
};
