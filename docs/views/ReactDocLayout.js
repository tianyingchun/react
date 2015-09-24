import React from 'react';
import { Link } from 'react-router';
import { Layout, LayoutSplitter, ScrollArea } from '../../src/components';
import { default as DraggableDemo } from '../../src/components/draggable/demo';
import DocMenu from '../components/DocMenu';

class ReactDocLayout extends React.Component {
  state = {
    layoutWidth: 220,
    layoutHeight: 400,
    layoutWidthFlex: 0,
    layoutHeightFlex: 0
  }

  layoutChanged = (layoutInfo) => {
    console.log('layoutInfo',layoutInfo)
    let { layoutWidth, layoutHeight } = (layoutInfo || {});

    let newState = {
      width: layoutWidth || this.state.layoutWidth,
      height: layoutHeight || this.state.layoutHeight
    };
    // performance
    // directly reset scrollarea instead setState() on the hight level to re render all components.
    this.refs.leftContainer.resetScrollArea(newState);
  }
  layoutChangedFlex = (layoutInfo) => {
    console.log('layoutInfoFlex',layoutInfo)
    let { layoutWidth, layoutHeight } = (layoutInfo || {});

    let newState = {
      width: layoutWidth || this.state.layoutWidthFlex,
      height: layoutHeight || this.state.layoutHeightFlex
    };

    this.refs.flexContainer.resetScrollArea(newState);

  }
  render () {
    let params = this.props.params;
    let example = '什么都还没有呢？';
    switch (params.component) {
      case 'draggable':
        example = <DraggableDemo />;
        break;
      case 'menu':
        example = <DocMenu />;
        break;
    }
    return (
      <Layout className="row" fill='container'>
          <Layout layoutWidth={this.state.layoutWidth} onLayoutChanged={this.layoutChanged}>
            <ScrollArea ref="leftContainer" speed={0.8} width={this.state.layoutWidth} height={this.state.layoutHeight} amSize={'sm'} contentClassName="content">

              <ul className="nav nav-left-dock">
                <li className="nav-header">
                  布局相关
                </li>
                <li><Link to="/docs/react/draggable" activeClassName="active">Draggable</Link></li>
                <li><Link to="/docs/react/menu" activeClassName="active">Menu</Link></li>
              </ul>
            </ScrollArea>
          </Layout>
          <LayoutSplitter layoutWidth={11} />
          <Layout layoutWidth='flex' onLayoutChanged={this.layoutChangedFlex}>
            <ScrollArea speed={0.8} ref="flexContainer" width={this.state.layoutWidthFlex} height={this.state.layoutHeightFlex} amSize={'sm'} contentClassName="content">
              {example}
            </ScrollArea>
          </Layout>
      </Layout>
    );
  }
}

export default ReactDocLayout;
