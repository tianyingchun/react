import React from 'react';
import { Link } from 'react-router';
import { Layout, LayoutSplitter, ScrollArea } from '../../src/components';
import { default as DraggableDemo } from '../../src/components/draggable/demo';
class ReactDocLayout extends React.Component {
  state = {
    layoutWidth: 220,
    layoutHeight: 400
  }
  addContent =()=> {
    this.setState(Object.assign({}, this.state, {
      content: this.state.content+'\ndddddd'
    }));
  }
  layoutChanged = (layoutInfo) => {
    // console.log('layoutInfo',layoutInfo)
    let { layoutWidth, layoutHeight } = (layoutInfo || {});

    let newState = {
      layoutWidth: layoutWidth || this.state.layoutWidth,
      layoutHeight: layoutHeight || this.state.layoutHeight
    };

    this.setState(newState);
  }
  render () {
    let params = this.props.params;
    let example = '什么都还没有呢？';
    console.log('router params:', params);
    switch (params.component) {
      case 'draggable':
        example = <DraggableDemo />;
        break;
    }
    return (
      <Layout fill='container'>
          <Layout layoutWidth={this.state.layoutWidth} onLayoutChanged={this.layoutChanged}>
            <ScrollArea speed={0.8} width={this.state.layoutWidth} height={this.state.layoutHeight} amSize={'sm'} contentClassName="content">
              <ul className="nav nav-left-dock">
                <li className="nav-header">
                  布局相关
                </li>
                <li><Link to="/docs/react/draggable" activeClassName="active">Draggable</Link></li>
              </ul>
            </ScrollArea>
          </Layout>
          <LayoutSplitter />
          <Layout layoutWidth='flex'>
            {example}
          </Layout>
      </Layout>
    );
  }
}

export default ReactDocLayout;
