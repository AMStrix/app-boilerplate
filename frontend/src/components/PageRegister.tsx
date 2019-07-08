import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { style } from 'typestyle';

import { Card } from 'components/Card';
import { Input } from 'components/Input';
import { Button } from 'components/Button';

import { RegisterInput, RegisterVariables } from 'backend/resolvers/user/registerInput';
import { User } from 'src/../../backend/src/models/User';

const REGISTER = gql`
  mutation Register($registerData: RegisterInput!) {
    register(registerData: $registerData) {
      id
    }
  }
`;

const styles = {
  container: style({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }),
};

const STATE = {
  password2: '',
  invalid: '',
};
type State = RegisterInput & typeof STATE;

export class PageRegister extends React.Component<{}, State> {
  state: State = {
    email: '',
    password: '',
    ...STATE,
  };
  render() {
    const { email, password, password2, invalid } = this.state;
    return (
      <Mutation<User, RegisterVariables> mutation={REGISTER}>
        {(register, { error, loading }) => (
          <div className={styles.container}>
            <Card>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.validate(() => {
                    if (!this.state.invalid) {
                      // tslint:disable-next-line:no-shadowed-variable
                      const { invalid, password2, ...registerData } = this.state;
                      register({ variables: { registerData } });
                    }
                  });
                }}
              >
                Register
                <Input
                  autoFocus
                  value={email}
                  onChange={({ target: { value } }) =>
                    this.setState({ email: value }, this.validate)
                  }
                  icon="user"
                  type="text"
                  placeholder="Email address"
                />
                <Input
                  value={password}
                  onChange={({ target: { value } }) =>
                    this.setState({ password: value }, this.validate)
                  }
                  icon="lock"
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                />
                <Input
                  value={password2}
                  onChange={({ target: { value } }) =>
                    this.setState({ password2: value })
                  }
                  icon="lock"
                  iconClassName={style({
                    opacity: password === password2 ? 1 : 0.5,
                  })}
                  type="password"
                  placeholder="Verify password"
                  autoComplete="off"
                />
                <Button disabled={loading} type="submit">
                  Register
                </Button>
                {/* TODO - error interpretation, form input errors from server */}
                {error && <div>{error.message}</div>}
                {invalid && <div>{invalid}</div>}
              </form>
            </Card>
            <div className={style({ height: '1rem' })}>
              Have an account? <Link to={'/login'}>Log In</Link>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
  private validate = (cb?: () => void) => {
    const { password, password2 } = this.state;
    let invalid = '';
    if (password !== password2) {
      invalid = 'Passwords do not match';
    }
    this.setState({ invalid }, cb);
  };
}
