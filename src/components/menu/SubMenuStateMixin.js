import React from 'react';
import ReactDOM from 'react-dom';
import dom from '../../utils/dom';
import events from '../../utils/events';
import KeyCode from '../../utils/KeyCode';

export default {
  componentDidMount() {
    this.componentDidUpdate();
  },

  componentDidUpdate() {
    if (this.props.mode !== 'inline') {
      if (this.props.open) {
        this.bindRootCloseHandlers();
      } else {
        this.unbindRootCloseHandlers();
      }
    }
  },

  handleDocumentKeyUp(e) {
    if (e.keyCode === KeyCode.ESC) {
      this.props.onItemHover({
        key: this.props.eventKey,
        item: this,
        hover: false,
      });
    }
  },

  handleDocumentClick(e) {
    // If the click originated from within this component
    // don't do anything.
    if (dom.contains(ReactDOM.findDOMNode(this), e.target)) {
      return;
    }
    const props = this.props;
    props.onItemHover({
      hover: false,
      item: this,
      key: this.props.eventKey,
    });
    this.triggerOpenChange(false);
  },

  bindRootCloseHandlers() {
    if (!this._onDocumentClickListener) {
      this._onDocumentClickListener = events.on(document, 'click', this.handleDocumentClick);
      this._onDocumentKeyupListener = events.on(document, 'keyup', this.handleDocumentKeyUp);
    }
  },

  unbindRootCloseHandlers() {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.off();
      this._onDocumentClickListener = null;
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.off();
      this._onDocumentKeyupListener = null;
    }
  },

  componentWillUnmount() {
    this.unbindRootCloseHandlers();
  },
};
