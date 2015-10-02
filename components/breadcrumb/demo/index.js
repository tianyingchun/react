import React, { Component } from 'react';
import Breadcrumb from '../index';
import Icon from '../../icon';
class BreadcrumbDemo extends Component {
  render () {
    return (
      <div className="doc-content">

        <h1>面包屑 Breadcrumb 系列</h1>
        <hr />
        <h2>Breadcrumb</h2>

        <h3>默认样式</h3>
        <Breadcrumb>
          <Breadcrumb.Item href="http://www.example.com">首页</Breadcrumb.Item>
          <Breadcrumb.Item href="http://www.example.com">分类</Breadcrumb.Item>
          <Breadcrumb.Item active>内容</Breadcrumb.Item>
        </Breadcrumb>
        <h3>斜杆分隔符</h3>
        <Breadcrumb slash>
          <Breadcrumb.Item href="http://www.example.org">首页</Breadcrumb.Item>
          <Breadcrumb.Item href="http://www.example.org">分类</Breadcrumb.Item>
          <Breadcrumb.Item active>内容</Breadcrumb.Item>
        </Breadcrumb>

        <h3>结合 Icon</h3>

        <Breadcrumb slash>
          <Breadcrumb.Item href="http://www.example.org">
            <Icon icon="coin-yen" />首页
          </Breadcrumb.Item>
          <Breadcrumb.Item href="http://www.example.org">分类</Breadcrumb.Item>
          <Breadcrumb.Item active>内容</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}
export default BreadcrumbDemo;
