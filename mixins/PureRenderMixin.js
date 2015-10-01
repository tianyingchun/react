import isShallowEqual from '../utils/shallowEqual';

//backport PureRenderEqual
export default {
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    let update = !isShallowEqual(this.props, nextProps) || !isShallowEqual(this.state, nextState);
    console.log('shouldComponentUpdate check result is :'+update);
    return update;
  }
};
