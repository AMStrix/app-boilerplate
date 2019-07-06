import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  component: React.ComponentClass<{ error: Error }>;
}

const STATE = {
  error: null as null | Error,
};

type State = typeof STATE;

export default class ErrorBoundary extends React.Component<Props, State> {
  state = STATE;

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { component, children } = this.props;
    if (error) {
      return React.createElement(component, { error });
    }
    return children;
  }
}
