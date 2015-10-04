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
      <div className="doc-content">
        <h1>Tag 标签</h1>
        <p>进行标记和分类的小标签。</p>
        <hr/>
        <h2>何时使用</h2>
        <ul>
          <li>用于标记事物的属性和维度。</li>
          <li>进行分类。</li>
        </ul>
        <h2>组件演示</h2>

        <h3>简单的标签展示，添加 closable 表示可关闭。</h3>
        <Tag>标签一</Tag>
        <Tag>标签二</Tag>
        <Tag closable onDelete={this.onDelete}>标签三</Tag>
        <Tag href="http://www.baidu.com">标签四（链接）</Tag>

        <h3>四种颜色的标签。</h3>
        <Tag closable>默认</Tag>
        <Tag closable amStyle="primary">蓝色</Tag>
        <Tag closable amStyle="default">默认灰</Tag>
        <Tag closable amStyle="secondary">浅蓝色</Tag>
        <Tag closable amStyle="warning">黄色</Tag>
        <Tag closable amStyle="danger">红色</Tag>

        <h3>带输入框的TAG</h3>
        <ReactTags tags={this.state.tags}
          suggestions={this.state.suggestions}
          amStyle={'primary'}
          labelField = {'text'}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition} />
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>
    );
  }
}

export default TagDemo;
