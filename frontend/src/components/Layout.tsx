import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { style } from 'typestyle';
import * as csstips from 'csstips';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import ErrorBoundary from 'components/ErrorBoundary';
import PageError from 'components/PageError';

const styles = {
  container: style(csstips.fillParent, csstips.vertical),
  body: style(csstips.flex),
};

type Props = RouteComponentProps<any>;

class LayoutC extends React.Component<Props> {
  render() {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.body}>
          <ErrorBoundary component={PageError}>{this.props.children}</ErrorBoundary>
        </div>
        <Footer />
      </div>
    );
  }
}

export const Layout = withRouter(LayoutC);
