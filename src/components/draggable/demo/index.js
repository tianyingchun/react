import React, { Component } from 'react';
import Draggable from '../index';

class Demo extends Component {

  state = {
    position: {
      top: 0,
      left: 0
    },
    activeDrags: 0
  }

  handleDrag = (e, ui) => {
    this.setState({
      position: ui.position
    });
  }

  onStart = () => {
    this.setState({
      activeDrags: ++this.state.activeDrags
    });
  }

  onStop = () => {
    this.setState({
      activeDrags: --this.state.activeDrags
    });
  }

  render () {
    var drags = {
      onStart: this.onStart,
      onStop: this.onStop
    };

    return (
      <div className="demo-draggable">
        <p>Active Drags: {this.state.activeDrags}</p>
        <Draggable zIndex={100} {...drags}>
            <div className="box">I can be dragged anywhere</div>
          </Draggable>
          <Draggable axis="x" {...drags}>
            <div className="box cursor-x">I can only be dragged horizonally</div>
          </Draggable>
          <Draggable axis="y" {...drags}>
            <div className="box cursor-y">I can only be dragged vertically</div>
          </Draggable>
          <Draggable onDrag={this.handleDrag} {...drags}>
            <div className="box">
              <div>I track my position</div>
              <div>top: {this.state.position.top.toFixed(0)}, left: {this.state.position.left.toFixed(0)}</div>
            </div>
          </Draggable>
          <Draggable handle="strong" {...drags}>
            <div className="box no-cursor">
              <strong className="cursor">Drag here</strong>
              <div>You must click my handle to drag me</div>
            </div>
          </Draggable>
          <Draggable cancel="strong" {...drags}>
            <div className="box">
              <strong className="no-cursor">Cant drag here</strong>
              <div>Dragging here works</div>
            </div>
          </Draggable>
          <Draggable grid={[25, 25]} {...drags}>
            <div className="box">I snap to a 25 x 25 grid</div>
          </Draggable>
          <Draggable grid={[50, 50]} {...drags}>
            <div className="box">I snap to a 50 x 50 grid</div>
          </Draggable>
          <Draggable bounds={{top: -100, left: -100, right: 100, bottom: 100}} zIndex={5} {...drags}>
            <div className="box">I can only be moved 100px in any direction.</div>
          </Draggable>
          <div className="box" style={{height: '500px', width: '500px', position: 'relative'}}>
            <Draggable bounds="parent" {...drags}>
              <div className="box">
                I can only be moved within my offsetParent.<br /><br />
                Both parent padding and child margin work properly.
              </div>
            </Draggable>
            <Draggable bounds="parent" {...drags}>
              <div className="box">
                I also can only be moved within my offsetParent.<br /><br />
                Both parent padding and child margin work properly.
              </div>
            </Draggable>
          </div>
          <Draggable>
            <div className="box" style={{position: 'absolute', bottom: '100px', right: '100px'}} {...drags}>
              I already have an absolute position.
            </div>
          </Draggable>
          <Draggable start={{x: 25, y: 25}} {...drags}>
            <div className="box">
              {"I have a start position of {x: 25, y: 25}, so I'm slightly offset."}
            </div>
          </Draggable>
        </div>
    );
  }
}

export default Demo;






