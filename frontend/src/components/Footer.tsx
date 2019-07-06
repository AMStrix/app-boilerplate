import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
// import { Link } from 'react-router-dom';
import { style } from 'typestyle';
import * as csstips from 'csstips';

const styles = {
  footer: style(csstips.content, csstips.height(50), { backgroundColor: '#eeeeee' }),
};

type Props = RouteComponentProps<any>;

class FooterC extends React.Component<Props> {
  render() {
    const { pathname } = this.props.location;
    const pathbase = pathname.split('/')[1] || '/';

    return <div className={styles.footer}>{GIT_HASH}</div>;
  }
}

export const Footer = withRouter(FooterC);
