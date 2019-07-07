import React from 'react';

import { UserAdmin } from 'backend/types/user';

export class UserListItem extends React.Component<UserAdmin> {
  render() {
    const { email, id, displayName } = this.props;
    return (
      <div>
        {id}, {email}, {displayName || 'n/a'}
      </div>
    );
  }
}
