import React from 'react';
import { style } from 'typestyle';
import * as csstips from 'csstips';

const styles = {
  container: style(csstips.width(400), csstips.height('auto'), csstips.vertical, {
    margin: '0 0 2rem 0',
  }),
};

export class Card extends React.Component {
  render() {
    return <div className={styles.container}>{this.props.children}</div>;
  }
}
