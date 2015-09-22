import React from 'react';
import { Link } from 'react-router';
import { Layout, LayoutSplitter, ScrollArea } from '../../src/components';
import { default as DraggableDemo } from '../../src/components/draggable/demo';
class ReactDocLayout extends React.Component {
  state = {
    layoutWidth: 220,
    layoutHeight: 400,
    layoutWidthFlex: 0,
    layoutHeightFlex: 0
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
  layoutChangedFlex = (layoutInfo) => {
    // console.log('layoutInfoFlex',layoutInfo)
    let { layoutWidth, layoutHeight } = (layoutInfo || {});

    let newState = {
      layoutWidthFlex: layoutWidth || this.state.layoutWidthFlex,
      layoutHeightFlex: layoutHeight || this.state.layoutHeightFlex
    };

    this.setState(newState);
  }
  render () {
    console.log('react doc layout render');
    let params = this.props.params;
    let example = '什么都还没有呢？';
    // console.log('router params:', params);
    switch (params.component) {
      case 'draggable':
        example = <DraggableDemo />;
        break;
    }
    return (
      <Layout className="row" fill='container'>
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
          <LayoutSplitter layoutWidth={11} />
          <Layout layoutWidth='flex' onLayoutChanged={this.layoutChangedFlex}>
            <ScrollArea speed={0.8} width={this.state.layoutWidthFlex} height={this.state.layoutHeightFlex} amSize={'sm'} contentClassName="content">
              {example}
            </ScrollArea>
          </Layout>
      </Layout>
    );
  }
}

export default ReactDocLayout;
