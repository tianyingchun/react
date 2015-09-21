import React from 'react';

class WorkspaceItem extends React.Component {
  render () {
    const { workspace } = this.props;
    return (
      <div className="workspace-list-item">name: {workspace.name}</div>
    );
  }
}

export default WorkspaceItem;
