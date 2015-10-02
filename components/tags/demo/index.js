import React, { Component } from 'react';
import { Tag, ReactTags } from '../index';

class TagDemo extends Component {
  state = {
    tags: [ {id: 1, text: "Apples"} ],
    suggestions: ["BananaBanana","BananaBanana1","BananaBanana2","BananaBanana3", "Mango", "Pear", "Apricot"]
  }

  handleDelete = (i) => {
    let tags = this.state.tags;
    tags.splice(i, 1);
    console.log('current tags: ', tags);
    this.setState({tags: tags});
  }

  handleAddition = (tag) => {
    let tags = this.state.tags;
    tags.push({
        id: tags.length + 1,
        text: tag
    });
    this.setState({tags: tags});
  }

  onDelete = (e) => {
    console.log(e);
  }
  render () {
    let tags = this.state.tags;
    let suggestions = this.state.suggestions;
    return (
      <div>
        <div className="container">
          <h2>简单的标签展示，添加 closable 表示可关闭。</h2>
          <Tag>标签一</Tag>
          <Tag>标签二</Tag>
          <Tag closable onDelete={this.onDelete}>标签三</Tag>
          <Tag href="http://www.baidu.com">标签四（链接）</Tag>
        </div>
        <div className="container">
          <h2>四种颜色的标签。</h2>
          <Tag closable>默认</Tag>
          <Tag closable amStyle="primary">蓝色</Tag>
          <Tag closable amStyle="default">默认灰</Tag>
          <Tag closable amStyle="secondary">浅蓝色</Tag>
          <Tag closable amStyle="warning">黄色</Tag>
          <Tag closable amStyle="danger">红色</Tag>
        </div>
        <div className="container">
          <h2>带输入框的TAG</h2>
          <ReactTags tags={this.state.tags}
            suggestions={this.state.suggestions}
            amStyle={'primary'}
            labelField = {'text'}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition} />
        </div>
      </div>
    );
  }
}

export default TagDemo;
