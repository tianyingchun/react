import React from 'react';
import WorkspaceItem from './WorkspaceItem';

class WorkspaceList extends React.Component {
  render () {
    let { workspaces } = this.props;
    return (
      <div className="workspace-list">
        {
          workspaces.map((ws) => {
            return <WorkspaceItem key={ws.id} workspace={ws} />;
          })
        }
      </div>
    );
  }
}

export default WorkspaceList;
