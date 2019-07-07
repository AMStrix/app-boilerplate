import React from 'react';
import { style } from 'typestyle';
import * as csstips from 'csstips';

import { GqlUsers } from 'components/GqlUsers';
import { List } from 'components/List';
import { UserListItem } from 'components/UserListItem';
import { PageControls } from './PageControls';

const s = {
  root: style(csstips.content, csstips.vertical, csstips.center),
};

const STATE = {
  page: 1,
  pageSize: 2,
};
type State = typeof STATE;

export class PageUsers extends React.Component<{}, State> {
  state: State = { ...STATE };
  render() {
    const { page, pageSize } = this.state;
    return (
      <div className={s.root}>
        <GqlUsers variables={{ page: { page, pageSize } }}>
          {({ data, loading, error }) => {
            const res = data && data.users;
            return (
              <>
                <List
                  title="Users"
                  items={res && res.items}
                  loading={loading}
                  error={error}
                  renderItem={u => <UserListItem key={u.id} {...u} />}
                />
                {res && (
                  <PageControls
                    onChange={(p, ps) => this.setState({ page: p, pageSize: ps })}
                    total={res.total}
                    current={res.page}
                    pageSize={2}
                  />
                )}
              </>
            );
          }}
        </GqlUsers>
      </div>
    );
  }
}
