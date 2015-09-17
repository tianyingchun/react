import { mixin1, mixin2 } from '../../mixins/Test1';

class MyComponent extends mixin(mixin1, mixin2) {

  componentWillMount () {
    super.componentWillMount();
  }

  render () {
    super.render();
    return <div> hello </div> ;
  }
}

export default MyComponent;
