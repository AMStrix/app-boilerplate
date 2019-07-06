import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { style } from 'typestyle';
import * as csstips from 'csstips';

const styles = {
  footer: style(csstips.content, csstips.height(50), { backgroundColor: '#eeeeee' }),
};

type Props = RouteComponentProps<any>;

class FooterC extends React.Component<Props> {
  render() {
    return <div className={styles.footer}>{GIT_HASH}</div>;
  }
}

export const Footer = withRouter(FooterC);
