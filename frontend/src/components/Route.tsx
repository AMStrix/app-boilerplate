import React from 'react';
import { Route as ReactRoute, RouteProps } from 'react-router';

import { Roles } from 'backend/models/User';
import { GqlMe } from 'components/GqlMe';

interface Props extends RouteProps {
  authOnly?: boolean;
  unauthedOnly?: boolean;
  allowedRole?: Roles;
  verifiedOnly?: boolean;
}

export class Route extends React.Component<Props> {
  render() {
    const { unauthedOnly, authOnly, allowedRole, verifiedOnly } = this.props;
    const route = <ReactRoute {...this.props} />;
    if (unauthedOnly || authOnly || allowedRole || verifiedOnly) {
      return (
        <GqlMe>
          {({ data, loading }) => {
            if (loading) {
              return <>loading...</>;
            }
            if (authOnly && !data) {
              return <div>TODO: Error, or no data returned.</div>;
            }
            if (data) {
              if (unauthedOnly && data.me) {
                return (
                  <div>
                    TODO: Error, redirect b/c only for unauthed (home page, or profile)
                  </div>
                );
              }
              if (allowedRole && data.me.role > allowedRole) {
                return <div>TODO: Error, or redirect b/c of insufficient role</div>;
              }
              if (verifiedOnly && !data.me.verified) {
                return <div>TODO: Error, or redirect b/c not verified</div>;
              }
            }
            return route;
          }}
        </GqlMe>
      );
    }
    return route;
  }
}
