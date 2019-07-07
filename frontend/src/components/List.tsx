import React, { ReactNode } from 'react';
import { ApolloError } from 'apollo-boost';
import { style, classes } from 'typestyle';
import * as csstips from 'csstips';

interface Props<T> {
  items?: T[];
  loading: boolean;
  error?: ApolloError;
  renderItem: (item: T, index: number, array: T[]) => ReactNode;
  className?: string;
  title?: string;
}

const s = {
  root: style(csstips.center, csstips.vertical),
  data: style({ maxWidth: 1100, $nest: { '& h1': { fontSize: '1.2rem' } } }),
};

export class List<T> extends React.Component<Props<T>> {
  render() {
    const { items, loading, error, renderItem, className, title } = this.props;
    if (!items && loading) {
      return 'list is loading...';
    }
    if (error) {
      return 'error: ' + error.message;
    }
    if (!items) {
      return 'List: unexpected, no items';
    }
    return (
      <div className={classes(s.root, className)}>
        {title && <h1>{title}</h1>}
        <div className={s.data}>{items.map(renderItem)}</div>
      </div>
    );
  }
}
