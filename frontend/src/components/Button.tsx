import React, { ButtonHTMLAttributes } from 'react';
import { style, classes } from 'typestyle';

import { Icon, IconType } from './Icon';
import { rem } from 'csx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconType;
  iconClassName?: string;
};

const s = {
  button: style({
    padding: rem(0.5),
    fontSize: rem(1),
    width: '100%',
  }),
  icon: style({
    position: 'absolute',
    top: 0,
    left: 0,
    padding: rem(0.6),
    zIndex: 1,
  }),
  buttonWithIcon: style({
    paddingLeft: rem(2),
  }),
};

export class Button extends React.Component<Props> {
  render() {
    const { children, icon, iconClassName, ...rest } = this.props;
    return (
      <button className={classes(s.button, icon && s.buttonWithIcon)} {...rest}>
        {icon && (
          <>
            <div className={classes(s.icon, iconClassName)}>
              <Icon type={icon} height={16} />
            </div>
          </>
        )}
        {children}
      </button>
    );
  }
}
