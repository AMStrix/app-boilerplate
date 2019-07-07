import React from 'react';
import { style } from 'typestyle';
import * as csstips from 'csstips';
import { Link } from 'react-router-dom';

const s = {
  root: style(csstips.content, csstips.vertical, {
    $nest: { '& h1': { fontSize: '1.2rem' } },
  }),
};

export class PageDashboard extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h1>dashboard</h1>
        <div>
          <Link to="/users">Users</Link>
        </div>
      </div>
    );
  }
}
