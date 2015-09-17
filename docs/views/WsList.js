import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WsListActions from '../actions/WsListActions';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router';
import WorkspaceList from '../components/WorkspaceList';
import ReactButton from '../components/Button';
import Button from '../../src/components/button';
import Icon from '../../src/components/Icon';

@connect((state) => ({ workspaces: state.workspaces }))
class WsList extends Component {

  constructor (...args) {
    super(...args);
  }

  // used to server async rendering.
  static needs = [
    (params) => WsListActions.getExistedWsList(params)
  ]
  // binding action creators.
  action = bindActionCreators(WsListActions, this.props.dispatch)

  componentDidMount () {
    let { dispatch } = this.props;
    console.log('componentDidMount()...');
    // dispatch(() => this.action.getWsListAsync('workspaceId'));
  }
  render () {
    let { workspaces, dispatch } = this.props;
    // place meta in all individule module root view.
    const meta = {
      title: 'the docs of react ui components',
      description: 'show user documents for react ui components',
      canonical: 'http://example.com/docs',
      meta: {
        name: {
          keywords: 'react ui, react components, react widgets, react component docs'
        }
      }
    };

    let isLoading = workspaces.isLoading;
    let loadingTxt = isLoading ? 'LOADING.....' : 'INIIAL';

    console.log('loading: ', loadingTxt);

    // manully dispatch action.
    return (
      <div>
        <Button href="www.baidu.com" amStyle={'primary'}><Icon icon={'comment'}/> React Button</Button>
        <ReactButton loading={ loadingTxt }/>
        <div><Link to="/about">About</Link></div>
        <DocumentMeta {...meta} />
        <WorkspaceList workspaces= { workspaces.list || workspaces } />
        <button onClick={() => this.action.getExistedWsList({ timeout:5000 })}>trigger add</button>
      </div>
    );
  }
}
export default WsList;
