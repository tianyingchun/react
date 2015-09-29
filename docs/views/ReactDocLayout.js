import React from 'react';
import { Link } from 'react-router';
import { Layout, LayoutSplitter, ScrollArea } from '../../src/components';
import { default as DraggableDemo } from '../../src/components/draggable/demo';
import DocMenu from '../components/DocMenu';
import ButtonDemo from '../../src/components/button/demo';
import LayoutDemo from '../../src/components/layout/demo';

import MenuDemo from '../../src/components/menu/demo';
import MessageDemo from '../../src/components/message/demo';
import TagDemo from '../../src/components/tags/demo';
import SelectDemo from '../../src/components/select/demo';

class ReactDocLayout extends React.Component {
  state = {
    layoutWidth: 220,
    layoutHeight: 400,
    layoutWidthFlex: 0,
    layoutHeightFlex: 400
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
    // this.refs.leftContainer.resetScrollArea(newState);
  }
  layoutChangedFlex = (layoutInfo) => {
    console.log('layoutInfoFlex',layoutInfo)
    let { layoutWidth, layoutHeight } = (layoutInfo || {});

    let newState = {
      width: layoutWidth || this.state.layoutWidthFlex,
      height: (layoutHeight || this.state.layoutHeightFlex)
    };
    if(this.refs.flexContainer) {
      // this.refs.flexContainer.resetScrollArea(newState);
    }
  }
  getComponents (child) {
    // here cause of we used ScrollArea nested into Layout component,
    // we should not speficied the width and height for `ScrollArea`.
    return (
      <ScrollArea speed={0.8} ref="flexContainer" amSize={'sm'} contentClassName="content">
        {child}
      </ScrollArea>
    );
  }
  render () {
    let params = this.props.params;
    console.log('router params',params);
    let example = '什么都还没有呢？';
    switch (params.component) {
      case 'layout':
        example = <LayoutDemo target={params.target}/>;
        break;
      case 'button':
        example = this.getComponents(<ButtonDemo />);
        break;

      case 'draggable':
        example = this.getComponents(<DraggableDemo />);
        break;

      case 'menu':
        example = this.getComponents(<MenuDemo />);
        break;

      case 'message':
        example = this.getComponents(<MessageDemo />);
        break;

      case 'tag':
        example = this.getComponents(<TagDemo />);
        break;
      case 'select':
        example = this.getComponents(<SelectDemo />);
        break;
    }
    return (
      <Layout className="row" fill='container'>
          <Layout layoutWidth={this.state.layoutWidth} onLayoutChanged={this.layoutChanged}>
            <ScrollArea ref="leftContainer" speed={0.8} amSize={'sm'} contentClassName="content">
              <DocMenu />
            </ScrollArea>
          </Layout>
          <LayoutSplitter layoutWidth={11} />
          <Layout layoutWidth='flex' onLayoutChanged={this.layoutChangedFlex}>
            {example}
          </Layout>
      </Layout>
    );
  }
}

export default ReactDocLayout;
