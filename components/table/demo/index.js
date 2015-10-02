import React, { Component } from 'react';
import Table from '../index';
class TableDemo extends Component {
  render () {
    return (
      <div className="doc-content">
        <Table>
          <thead>
          <tr>
            <th>网站名称</th>
            <th>网址</th>
            <th>创建时间</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Amaze UI</td>
            <td>http://amazeui.org</td>
            <td>2012-10-01</td>
          </tr>
          <tr className="am-active">
            <td>Amaze UI(Active)</td>
            <td>http://amazeui.org</td>
            <td>2012-10-01</td>
          </tr>
          <tr>
            <td>Amaze UI</td>
            <td>http://amazeui.org</td>
            <td>2012-10-01</td>
          </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TableDemo;
