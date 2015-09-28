import React, { Component } from 'react';

// determines the min query length for which
// suggestions are displayed
const MIN_QUERY_LENGTH = 2;

class Suggestions extends Component {

  static propTypes = {
    query: React.PropTypes.string.isRequired,
    selectedIndex: React.PropTypes.number.isRequired,
    suggestions: React.PropTypes.array.isRequired,
    handleClick: React.PropTypes.func.isRequired,
    handleHover: React.PropTypes.func.isRequired
  }

  markIt (input, query) {
    let escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    let r = RegExp(escapedRegex, "gi");
    return {
      __html: input.replace(r, "<mark>$&</mark>")
    }
  }
  render () {
    let props = this.props;
    let suggestions = props.suggestions.map((item, i) => {
      return (
        <li key = {i}
          onClick = {props.handleClick.bind(null, i)}
          onMouseOver = {props.handleHover.bind(null, i)}
          className = {i == props.selectedIndex ? "active" : ""}>
          <span dangerouslySetInnerHTML = { this.markIt(item, props.query)} />
        </li>
      );
    });

    if (suggestions.length === 0 || props.query.length < MIN_QUERY_LENGTH) {
      return <div className = "tags-suggestions" > </div>
    }

    return (
      <div className = "tags-suggestions">
        <ul> {suggestions} </ul>
      </div>
    );
  }
}

export default Suggestions;
