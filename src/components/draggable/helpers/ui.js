import Utils from './utils';
import ReactDOM from 'react-dom';
class Ui {

  static createUIEvent = (draggable) => {
    // State changes are often (but not always!) async. We want the latest value.
    let state = draggable._pendingState || draggable.state;
    return {
      node: ReactDOM.findDOMNode(draggable),
      position: {
        top: state.clientY,
        left: state.clientX
      }
    };
  }

  static getBoundPosition = (draggable, clientX, clientY) => {
    let bounds = JSON.parse(JSON.stringify(draggable.props.bounds));
    let node = ReactDOM.findDOMNode(draggable);
    let parent = node.parentNode;

    if (bounds === 'parent') {
      let nodeStyle = window.getComputedStyle(node);
      let parentStyle = window.getComputedStyle(parent);
      // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
      bounds = {
        left: -node.offsetLeft + Utils.int(parentStyle.paddingLeft) +
              Utils.int(nodeStyle.borderLeftWidth) + Utils.int(nodeStyle.marginLeft),
        top: -node.offsetTop + Utils.int(parentStyle.paddingTop) +
              Utils.int(nodeStyle.borderTopWidth) + Utils.int(nodeStyle.marginTop),
        right: Utils.innerWidth(parent) - Utils.outerWidth(node) - node.offsetLeft,
        bottom: Utils.innerHeight(parent) - Utils.outerHeight(node) - node.offsetTop
      };
    }

    // Keep x and y below right and bottom limits...
    if (Utils.isNum(bounds.right)) clientX = Math.min(clientX, bounds.right);
    if (Utils.isNum(bounds.bottom)) clientY = Math.min(clientY, bounds.bottom);

    // But above left and top limits.
    if (Utils.isNum(bounds.left)) clientX = Math.max(clientX, bounds.left);
    if (Utils.isNum(bounds.top)) clientY = Math.max(clientY, bounds.top);

    return [clientX, clientY];
  }
}

export default Ui;
