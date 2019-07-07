import React from 'react';
import RcPagination, { PaginationProps } from 'rc-pagination';
import en_US from 'rc-pagination/lib/locale/en_US';
import { style } from 'typestyle';

// style rc-pagination
const prefixCls = style({
  display: 'flex',
  fontSize: '1rem',
  userSelect: 'none',
  padding: 0,

  $nest: {
    '& > li': {
      listStyle: 'none',
    },
    '&-total-text': {
      background: 'red',
    },
    '&-item': {
      cursor: 'pointer',
      border: '1px solid green',
      padding: '0.4rem 0.6rem 0.35rem 0.6rem',
      margin: '0 0.2rem 0 0',

      $nest: {
        '&:hover, &-active': {
          borderColor: 'blue',
          color: 'blue',
        },
        '&-active': {
          cursor: 'default',
        },
      },
    },
  },
});

export const PageControls: React.FC<PaginationProps> = p => (
  <RcPagination locale={en_US} prefixCls={prefixCls} {...p} />
);
