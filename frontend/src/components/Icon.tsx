import React from 'react';
import { style } from 'typestyle';

import SvgUser from 'static/svg/user-solid.svg';
import SvgLock from 'static/svg/lock-solid.svg';

const icons = {
  user: SvgUser,
  lock: SvgLock,
};
export type IconType = keyof typeof icons;

type Props = React.SVGProps<any> & {
  type: IconType;
};

const s = {
  root: style({
    position: 'relative',
    marginBottom: '1rem',
  }),
};

export class Icon extends React.Component<Props> {
  render() {
    const { type, ...rest } = this.props;
    const Svg = icons[type];
    return <Svg {...rest} />;
  }
}
