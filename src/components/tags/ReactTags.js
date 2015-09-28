import React, { Component } from 'react';
var Tag = require('./TagItem');
var Suggestions = require('./Suggestions');

// Constants
const Keys = {
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27
};

class ReactTags extends Component {
  static propTypes = {
    tags: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    labelField: React.PropTypes.string,
    amStyle: React.PropTypes.string,
    suggestions: React.PropTypes.array,
    autofocus: React.PropTypes.bool,
    handleDelete: React.PropTypes.func.isRequired,
    handleAddition: React.PropTypes.func.isRequired,
    allowDeleteFromEmptyInput: React.PropTypes.bool
  }
  static defaultProps = {
    placeholder: 'Add new tag',
    tags: [],
    suggestions: [],
    autofocus: true,
    labelField: 'text',
    allowDeleteFromEmptyInput: true
  }
  state = {
    suggestions: this.props.suggestions,
    query: "",
    selectedIndex: -1,
    selectionMode: false
  }
  componentDidMount () {
    if (this.props.autofocus) {
      this.refs.input.focus();
    }
  }

  handleDelete = function (i, e) {
    this.props.handleDelete(i);
    this.setState({
      query: ""
    });
  }

  handleChange = (e) => {
    let query = e.target.value.trim();
    let suggestions = this.props.suggestions.filter(function (item) {
      return (item.toLowerCase()).search(query.toLowerCase()) === 0;
    });

    this.setState({
      query: query,
      suggestions: suggestions,
    });
  }

  handleKeyDown = (e) => {

    var {
      query, selectedIndex, suggestions
    } = this.state;

    // hide suggestions menu on escape
    if (e.keyCode === Keys.ESCAPE) {
      e.preventDefault();
      this.setState({
        selectedIndex: -1,
        selectionMode: false,
        suggestions: []
      });
    }

    // when enter or tab is pressed add query to tags
    if ((e.keyCode === Keys.ENTER || e.keyCode === Keys.TAB) && query != "") {
      e.preventDefault();
      if (this.state.selectionMode) {
        query = this.state.suggestions[this.state.selectedIndex];
      }
      this.addTag(query);
    }

    // when backspace key is pressed and query is blank, delete tag
    if (e.keyCode === Keys.BACKSPACE && query == "" && this.props.allowDeleteFromEmptyInput) { //
      this.handleDelete(this.props.tags.length - 1);
    }

    // up arrow
    if (e.keyCode === Keys.UP_ARROW) {
      e.preventDefault();
      var selectedIndex = this.state.selectedIndex;
      // last item, cycle to the top
      if (selectedIndex <= 0) {
        this.setState({
          selectedIndex: this.state.suggestions.length - 1,
          selectionMode: true
        });
      } else {
        this.setState({
          selectedIndex: selectedIndex - 1,
          selectionMode: true
        });
      }
    }

    // down arrow
    if (e.keyCode === Keys.DOWN_ARROW) {
      e.preventDefault();
      this.setState({
        selectedIndex: (this.state.selectedIndex + 1) % suggestions.length,
        selectionMode: true
      });
    }
  }

  addTag = (tag) => {
    let input = this.refs.input;

    // call method to add
    this.props.handleAddition(tag);

    // reset the state
    this.setState({
      query: "",
      selectionMode: false,
      selectedIndex: -1
    });

    // focus back on the input box
    input.value = "";
    input.focus();
  }

  handleSuggestionClick = (i, e) => {
    this.addTag(this.state.suggestions[i]);
  }

  handleSuggestionHover = (i, e) => {
    this.setState({
      selectedIndex: i,
      selectionMode: true
    });
  }

  render () {
    let tagItems = this.props.tags.map((tagData, i) => {
      return (
        <Tag key = { tagData.id }
          closable
          amStyle={this.props.amStyle}
          onDelete = { this.handleDelete.bind(this, i) }>
          {tagData[this.props.labelField]}
        </Tag>
      );
    });

    // get the suggestions for the given query
    let query = this.state.query.trim(),
      selectedIndex = this.state.selectedIndex,
      suggestions = this.state.suggestions,
      placeholder = this.props.placeholder;

    return (
      <div className = "tags-container">
        <div className = "tags-selected-list">
          { tagItems }
        </div>
        <div className = "tags-input">
          <input ref = "input" type = "text" placeholder = {placeholder}
            onChange = { this.handleChange }
            onKeyDown = { this.handleKeyDown } />
          <Suggestions query = {query}
            suggestions = { suggestions }
            selectedIndex = { selectedIndex }
            handleClick = { this.handleSuggestionClick }
            handleHover = { this.handleSuggestionHover } />
        </div>
      </div>
    );
  }
}


export default ReactTags;
