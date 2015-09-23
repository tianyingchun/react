import react from 'react';
import ClassNameMixin from '../../mixins/ClassNameMixin';
import classNames from 'classnames';

class Divider extends mixins(ClassNameMixin) {

  static propTypes = {
    theme: React.PropTypes.oneOf(['default','dotted','dashed'),
    classPrefix: React.PropTypes.string
  }
  static defaultProps= {
    theme: 'default',
    classPrefix: 'devider'
  }

  render () {
    let classSet = this.getClassSet();

    return (
      <hr {...this.props} className = {classNames(this.props.className, classSet)} />
    );
  }
}

export default Divider;
