import React from 'react';
import { Link } from 'react-router';
import RouteLink from './RouteLink';
import Menu, { SubMenu } from '../../src/components/menu';
import URI from '../utils/URI';

class Header extends React.Component {
  state = {
    current: 'default'
  }
  switchStyle (newLinkName, newLinkHref) {
    if(!newLinkHref || !newLinkName) {
      console.warn('switch theme style must provider two parameters!');
      return;
    }
    let link_tag = document.getElementsByTagName("link");
    let found = null;
    for (let i = 0; i <= link_tag.length; i++) {
      let link = link_tag[i];
      if (link && link.rel && link.rel.indexOf( "stylesheet" ) != -1) {
        let linkName = link.getAttribute("name");
        let linkHref = link.getAttribute("href");
        if (linkName == newLinkName) {
          found = link;
          break;
        }
      }
    }
    if (found) {
      if (newLinkHref !== found.getAttribute('href')) {
        found.setAttribute('href', newLinkHref);
      }
    } else {
      let head = document.head || document.getElementsByTagName('head')[0];
      let newLinkTag = document.createElement('link');
      newLinkTag.setAttribute('rel', 'stylesheet');
      newLinkTag.setAttribute('type', 'text/css');
      newLinkTag.setAttribute('name', newLinkName);
      newLinkTag.setAttribute('href', newLinkHref);
      head.appendChild(newLinkTag);
    }
  }
  getThemeLink(theme) {
    let link = '/shared/less-ui/public/common.css';
    switch (theme) {
      case 'glodonyun':
        link = '/shared/less-ui/public/themes/glodon-yun/common.css';
        break;
    }
    return URI.getUrl(link);
  }
  handleClick = (e) => {
    let theme = e.key;
    let link = this.getThemeLink(theme);
    // dynamic replace `common` link style.
    this.switchStyle('common', link);
    this.setState({
      current: theme
    });
  }
  render () {

    return (
      <header className= "topbar topbar-inverse">
        <div className="container">
          <h1 className="topbar-brand">
            <Link activeClassName="active" to="/docs">RUI Docs</Link>
          </h1>
          <ul className="nav nav-pills topbar-nav">
            <RouteLink to="/docs/less" activeClassName="active">LESS UI</RouteLink>
            <RouteLink to="/docs/react/layout/flexlayout" activeClassName="active">React UI</RouteLink>
          </ul>
          <div className="topbar-right">
           <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <SubMenu title={<span><i className="glyph-icon glyph-menu"></i>The Themes</span>}>
              <Menu.Item key="default">Default Theme</Menu.Item>
              <Menu.Item key="glodonyun">Gldon Yun</Menu.Item>
            </SubMenu>
          </Menu>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
