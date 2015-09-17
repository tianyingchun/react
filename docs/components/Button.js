import React, { Component } from 'react';

if (process.env.BROWSER) {
  require('../stylesheets/sample-less.less');
  require('../stylesheets/index.css');

}
class ReactButton extends Component {

  //
  static propTypes = {
    loading: React.PropTypes.string.isRequired
  }
  static defaultProps = {
    loading: 'initial'
  }
  state = {
    loading: this.props.loading
  }
  handleClick = () => {
    this.setState({
      loading: 'initial'
    });
  }

  render () {
    return (
      <div>
        {this.props.loading}
        <button className="btn btn-primary" onClick={this.handleClick}>Load Data </button>
      </div>
    );
  }
}
export default ReactButton;
