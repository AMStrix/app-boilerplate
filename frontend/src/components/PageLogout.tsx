import React from 'react';
import { style } from 'typestyle';
import { GqlLogout } from './GqlLogout';
import { ME } from './GqlMe';
import { MutationFn } from 'react-apollo';

const s = {
  root: style({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }),
};

export const PageLogout: React.FC = () => (
  <div className={s.root}>
    <GqlLogout>
      {(logout, { error, loading, data }) => (
        <>
          <CallLogout logout={logout} />
          {loading && <>logging out...</>}
          {error && <>error: {error.message}</>}
          {data && <>logged out</>}
        </>
      )}
    </GqlLogout>
  </div>
);

// just a way to call a mutation on mount
class CallLogout extends React.Component<{ logout: MutationFn }> {
  componentDidMount() {
    this.props.logout({ refetchQueries: [{ query: ME }] });
  }
  render() {
    return null;
  }
}
