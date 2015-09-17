import mixin from 'es6-react-mixins';

export const mixin1 = base => class extends base {
  componentWillMount() {
    super.componentWillMount();
    console.log("mixin1 componentWillMount");
  }
  render() {
    super.render();
    console.log("mixin1 render");
  }
};

export const mixin2 = base => class extends base {
  componentWillMount() {
    super.componentWillMount();
    console.log("mixin2 componentWillMount");
  }
  render() {
    super.render();
    console.log("mixin2 render");
  }
};
