import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { style, classes } from 'typestyle';
import * as csstips from 'csstips';
import { GqlMe } from './GqlMe';

const styles = {
  header: style(csstips.content, csstips.horizontal, csstips.height(50), {
    padding: '0 1rem',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  }),
  menuItem: style({ color: '#999999', height: 'auto' }),
  activeMenuItem: style({ color: '#444444' }),
};

type Props = RouteComponentProps<any>;

class HeaderC extends React.Component<Props> {
  render() {
    const { pathname } = this.props.location;
    const pathbase = pathname.split('/')[1] || '/';

    const MenuItem = ({ to, children }) => (
      <Link
        to={to}
        className={classes(
          styles.menuItem,
          `/${pathbase}` === to && styles.activeMenuItem,
        )}
      >
        {children}
      </Link>
    );

    return (
      <div className={styles.header}>
        <div className={style(csstips.flex1)}>logo</div>
        <div className={style(csstips.content)}>
          <GqlMe>
            {({ data, loading }) => {
              if (loading) {
                return null;
              } else if (data && data.me) {
                return (
                  <>
                    <MenuItem to="/profile">Profile</MenuItem> or{' '}
                    <MenuItem to="/logout">Logout</MenuItem>
                  </>
                );
              }
              return (
                <>
                  <MenuItem to="/register">Register</MenuItem> or{' '}
                  <MenuItem to="/login">Login</MenuItem>
                </>
              );
            }}
          </GqlMe>
        </div>
      </div>
    );
  }
}

export const Header = withRouter(HeaderC);
