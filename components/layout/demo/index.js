import React from 'react'
import { Layout, LayoutSplitter} from '../index.js';
import { Link } from 'react-router';

class Horizontal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout fill="container">
        <Layout layoutWidth={100}>Column1</Layout>
        <Layout layoutWidth='flex'>Column2</Layout>
      </Layout>
    );
  }
}

class FixedRightPane extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout fill="container">
        <Layout layoutWidth='flex'>Column1</Layout>
        <Layout layoutWidth={100}>Column2</Layout>
      </Layout>
    );
  }
}

class ThreeColumn extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout fill="container">
        <Layout layoutWidth={100}>Column1</Layout>
        <Layout layoutWidth='flex'>Column2</Layout>
        <Layout layoutWidth={100}>Column3</Layout>
      </Layout>
    );
  }
}

class HorizontalResizer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout fill="container">
        <Layout layoutWidth={100}>Column1</Layout>
        <LayoutSplitter />
        <Layout layoutWidth='flex'>Column2</Layout>
      </Layout>
    );
  }
}

class BothFixedHorizontalResizer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{border: '1px solid #000', height: 200, width: 313}}>
        <Layout fill='container'>
          <Layout layoutWidth={100}>Column1</Layout>
          <LayoutSplitter />
          <Layout layoutWidth={200}>Column2</Layout>
        </Layout>
      </div>
    );
  }
}

class VerticalResizer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout fill="container">
        <Layout layoutHeight={200}>Row1</Layout>
        <LayoutSplitter />
        <Layout layoutHeight='flex'>Row2</Layout>
      </Layout>
    );
  }
}

class Nested extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout fill="container">
        <Layout layoutWidth={100}>Column1</Layout>
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

class DemoLayout extends React.Component {

  constructor(props) {
    super(props);
    this.page =  <Horizontal />;
  }
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.target !== nextProps.target;
  }
  render() {
    var target = this.props.target || 'horizontal';
    console.log('layout target:', target);
    var example = <Horizontal />;
    switch(target) {
      case 'horizontal':
        example = <Horizontal />;
        break;
      case 'fixedright':
        example = <FixedRightPane />;
        break;
      case 'threecolumn':
        example = <ThreeColumn />;
        break;
      case 'oneflexhorizontalresize':
        example = <HorizontalResizer />;
        break;
      case 'bothfixedhorizontalresize':
        example = <BothFixedHorizontalResizer />;
        break;
      case 'verticalresize':
        example = <VerticalResizer />;
        break;
      case 'nested':
        example = <Nested />;
        break;
    }
    return (
      <Layout fill='container'>
        <Layout layoutHeight={50} style={{marginTop: '20px'}}>
          <div className="container btn-toolbar">
            <Link to="/docs/react/layout/flexlayout/horizontal" className="btn btn-xs btn-primary radius" activeClassName="active">Horizontal</Link>
            <Link to="/docs/react/layout/flexlayout/fixedright" className="btn btn-xs btn-primary radius" activeClassName="active">Fixed right column</Link>
            <Link to="/docs/react/layout/flexlayout/threecolumn" className="btn btn-xs btn-primary radius" activeClassName="active">Three column</Link>
            <Link to="/docs/react/layout/flexlayout/oneflexhorizontalresize" className="btn btn-xs btn-primary radius" activeClassName="active">Horizontal Splitter</Link>
            <Link to="/docs/react/layout/flexlayout/bothfixedhorizontalresize" className="btn btn-xs btn-primary radius"  activeClassName="active">Both fixed Horizontal Splitter</Link>
            <Link to="/docs/react/layout/flexlayout/verticalresize" className="btn btn-xs btn-primary radius" activeClassName="active">Vertical Splitter</Link>
            <Link to="/docs/react/layout/flexlayout/nested" className="btn btn-xs btn-primary radius" activeClassName="active">Nested</Link>
          </div>
        </Layout>
        <Layout layoutHeight='flex' style={{borderTop: '1px solid #ccc'}}>
          {example}
        </Layout>
      </Layout>
    );
  }
}

export default DemoLayout;
