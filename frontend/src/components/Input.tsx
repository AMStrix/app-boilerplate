import React, { InputHTMLAttributes } from 'react';
import { style, classes } from 'typestyle';

import { Icon, IconType } from './Icon';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: IconType;
  iconClassName?: string;
};

const s = {
  root: style({
    position: 'relative',
    marginBottom: '1rem',
  }),
  label: style({
    display: 'none',
  }),
  icon: style({
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '0.6rem',
    zIndex: 1,
  }),
  input: style({
    padding: '0.5rem',
    fontSize: '14px',
    width: '100%',
  }),
  inputWithIcon: style({
    paddingLeft: '2rem',
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
