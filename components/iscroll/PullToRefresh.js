import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Events from '../../utils/events';
//https://github.com/renatn/react-pull-to-refresh
//https://github.com/apeatling/web-pull-to-refresh
if (process.env.BROWSER) {
  require('./PullToRefresh.less');
}
class PullToRefresh extends Component {

  static propTypes = {
    pullRftTxt: React.PropTypes.string,
    releaseRftTxt: React.PropTypes.string,
    loadingTxt: React.PropTypes.string,
    // Number of pixels of dragging down until refresh will fire
    distanceToRefresh: React.PropTypes.number,
    // The dragging resistance level, the higher the more you'll need to drag down.
    resistance: React.PropTypes.number,
    // the parent iscroll translateY if have.
    iscrollTranslateY: React.PropTypes.number,
    loadingFunc: React.PropTypes.func
  }

  static defaultProps = {
    pullRftTxt: ' Pull to refresh',
    releaseRftTxt: ' Release to refresh',
    loadingTxt: ' Loading...',
    distanceToRefresh: 70,
    resistance: 2.5,
    iscrollTranslateY: 0,
    loadingFunc: function noop() {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
  }

  state = {
    pull: false,
    from: 0,
    distance: 0,
    height: 50,
    refresh: false,
    loading: false,
    reset: false
  }

  componentDidMount () {
    const height = ReactDOM.findDOMNode(this.refs.ptr).offsetHeight;
    this.setState({
      height: height
    });
  }

  handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (document.body.scrollTop === 0) {
      this.setState({
        pull: true,
        from: touch.pageY
      });
    }
  }

  handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (this.state.pull && !this.state.loading) {
      e.preventDefault();
      const distance = (touch.pageY - this.state.from) / this.props.resistance;
      this.setState({
        distance: distance,
        refresh: distance > this.props.distanceToRefresh
      });
    }
  }

  handleTouchEnd = (e) => {
    if (this.state.pull && !this.state.loading) {
      if (this.state.refresh) {
        this.setState({
          loading: true,
          distance: 60
        });

        // The loading function should return a promise
        let loadingPromise = this.props.loadingFunc();

        loadingPromise.then(this._reset)
          .catch(function (err) {
            this._reset();
          });

      } else {
        this._reset();
      }
    }
  }

  render () {
    const contentTranslate = 'translate3d(0, ' + this.state.distance + 'px, 0)';
    const contentStyle = {
      transform: contentTranslate,
      WebkitTransform: contentTranslate
    };
    console.log('this...', this.props.iscrollTranslateY);
    const ptrTranslate = 'translate3d(0, ' + (this.state.distance - this.state.height) + 'px, 0)';

    const ptrStyle = {
      transform: ptrTranslate,
      WebkitTransform: ptrTranslate
    };

    let classes = {
      'pull-to-refresh': true,
      'ptr-loading': this.state.loading,
      'ptr-refresh': this.state.refresh,
      'ptr-reset': this.state.reset
    }

    return (
      <div className={classNames(classes)}>
        <div className="ptr-indicator" style={ptrStyle} ref="ptr">
          <span className="arrow-wrap">
            <i className="glyph-icon glyph-arrow-down2 arrow"></i>
            <span>{this.state.refresh ? this.props.releaseRftTxt : this.props.pullRftTxt}</span>
          </span>
          <span className="loading-wrap">
            <i className="glyph-icon glyph-spinner2 glyph-spin loading"></i>
            <span>{this.props.loadingTxt}</span>
          </span>
        </div>
        <div ref="ptrContent" className="ptr-content"
          style={contentStyle}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}>
          {this.props.children}
        </div>
      </div>
    );
  }

  _reset = () => {

    // add ease animation for ptrcontent, while refresh content success.
    Events.one(this.refs.ptrContent, 'transitionend', () => {
      this.setState({
        reset: false
      });
    });

    this.setState({
      pull: false,
      reset: true,
      distance: 0,
      loading: false,
      refresh: false
    });
  }

}

export default PullToRefresh;
