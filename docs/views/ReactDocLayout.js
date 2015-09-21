import React from 'react';
import { Layout, LayoutSplitter, ScrollArea } from '../../src/components';

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
    return (
      <Layout fill='container'>
          <Layout layoutWidth={this.state.layoutWidth} onLayoutChanged={this.layoutChanged}>
            <ScrollArea speed={0.8} width={this.state.layoutWidth} height={this.state.layoutHeight} amSize={'sm'} contentClassName="content">
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
            </ScrollArea>
          </Layout>
          <LayoutSplitter />
          <Layout layoutWidth='flex'>
            <Layout layoutHeight={200}>Row 1</Layout>
            <LayoutSplitter />
            <Layout layoutHeight='flex'>Row 2</Layout>
          </Layout>
      </Layout>
    );
  }
}

export default ReactDocLayout;
