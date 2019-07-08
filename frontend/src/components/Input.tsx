import React, { InputHTMLAttributes } from 'react';
import { style, classes } from 'typestyle';
import { rem } from 'csx';

import { controls } from './css';
import { Icon, IconType } from './Icon';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: IconType;
  iconClassName?: string;
};

const s = {
  root: style({
    position: 'relative',
    marginBottom: rem(controls.spacing),
  }),
  label: style({
    display: 'none',
  }),
  icon: style({
    position: 'absolute',
    top: 0,
    left: 0,
    padding: rem(controls.height * 0.3),
    zIndex: 1,
  }),
  input: style({
    padding: rem(controls.height * (0.55 / 2)),
    fontSize: rem(controls.height * 0.45),
    width: '100%',
  }),
  inputWithIcon: style({
    paddingLeft: rem(2 * 1),
  }),
};

export class Input extends React.Component<Props> {
  render() {
    const { id, name } = this.props;
    const { icon, iconClassName, ...rest } = this.props;
    return (
      <div className={s.root}>
        <label className={s.label} htmlFor={id}>
          {name}
        </label>
        {icon && (
          <div className={classes(s.icon, iconClassName)}>
            <Icon type={icon} height={16} />
          </div>
        )}
        <input className={classes(s.input, icon && s.inputWithIcon)} {...rest} />
      </div>
    );
  }
}
