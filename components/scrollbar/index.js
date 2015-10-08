import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GeminiScrollbar from 'gemini-scrollbar';
import classNames from 'classnames';
if (process.env.BROWSER) {
  require('./Scrollbar.less');
}
class Scrollbar extends Component {

  static propTypes = {
    autoshow: React.PropTypes.bool
  }

  static defaultProps = {
    autoshow: false
  }

  static displayName = 'GeminiScrollbar'

  /**
   * Holds the reference to the GeminiScrollbar instance.
   * @property scrollbar <public> [Object]
   */
  scrollbar = null

  componentDidMount() {
    this.scrollbar = new GeminiScrollbar({
      element: ReactDOM.findDOMNode(this),
      autoshow: this.props.autoshow,
      createElements: false
    }).create();
  }

  componentDidUpdate() {
    this.scrollbar.update();
  }

  componentWillUnmount() {
    this.scrollbar.destroy();
    this.scrollbar = null;
  }

  render() {
    let { className, children, ...other } = this.props;
    let classes = {
      'gm-scrollbar-container': true,
      [className]: !!className
    }

    return (
      <div {...other} className={classNames(classes)}>
        <div className='gm-scrollbar -vertical'>
          <div className='thumb'></div>
        </div>
        <div className='gm-scrollbar -horizontal'>
          <div className='thumb'></div>
        </div>
        <div className='gm-scroll-view' ref='scroll-view'>
          {children}
        </div>
      </div>
    );
  }
}

export default Scrollbar;
