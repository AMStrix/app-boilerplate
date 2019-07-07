import React from 'react';
import { Route as ReactRoute, RouteProps, Redirect } from 'react-router';

import { Roles } from 'backend/models/User';
import { GqlMe } from 'components/GqlMe';

interface Props extends RouteProps {
  authOnly?: boolean;
  guestOnly?: boolean;
  allowedRole?: Roles;
  verifiedOnly?: boolean;
  failTo?: string;
}

export class Route extends React.Component<Props> {
  render() {
    const { guestOnly, authOnly, allowedRole, verifiedOnly, failTo } = this.props;
    const route = <ReactRoute {...this.props} />;
    const fail = (reason: string) => {
      // TODO - dev only
      console.log(`[${this.props.path}] route failed, reason: ${reason}`);
      if (failTo) {
        return <Redirect to={failTo} />;
      } else {
        return <>This Route [{this.props.path}] shuould have the failTo path set.</>;
      }
    };
    if (guestOnly || authOnly || allowedRole || verifiedOnly) {
      return (
        <GqlMe>
          {({ data, loading }) => {
            if (loading) {
              return <>loading...</>;
            }
            if (authOnly && (!data || !data.me)) {
              return fail('not authed');
            }
            if (data) {
              if (guestOnly && data.me) {
                return fail('only for guests (unauthed)');
              }
              if (allowedRole && data.me.role > allowedRole) {
                return fail(`only for users with roles: ${allowedRole}`);
              }
              if (verifiedOnly && !data.me.verified) {
                return fail(`only for verifed users`);
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
