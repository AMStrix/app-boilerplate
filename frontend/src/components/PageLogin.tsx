import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { style } from 'typestyle';
import * as csstips from 'csstips';

import { Card } from 'components/Card';
import { Input } from 'components/Input';

import { ME } from 'components/GqlMe';
import { LoginInput, LoginVariables } from 'backend/resolvers/user/loginInput';
import { User } from 'src/../../backend/src/models/User';
import { Link } from 'react-router-dom';
import { Button } from './Button';

const LOGIN = gql`
  mutation Login($loginData: LoginInput!) {
    login(loginData: $loginData) {
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
  input: style(csstips.flex),
};

export class PageLogin extends React.Component<{}, LoginInput> {
  state: LoginInput = {
    email: '',
    password: '',
  };
  render() {
    const { email, password } = this.state;
    return (
      <Mutation<User, LoginVariables> mutation={LOGIN}>
        {(login, { error, loading }) => (
          <div className={styles.container}>
            <Card>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  login({
                    variables: { loginData: this.state },
                    refetchQueries: [{ query: ME }],
                  });
                }}
              >
                Login
                <Input
                  autoFocus
                  value={email}
                  onChange={({ target: { value } }) => this.setState({ email: value })}
                  icon="user"
                  type="text"
                  placeholder="Email address"
                />
                <Input
                  value={password}
                  onChange={({ target: { value } }) => this.setState({ password: value })}
                  icon="lock"
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                />
                <Button disabled={loading} type="submit">
                  Log In
                </Button>
                {/* TODO - error interpretation, form input errors from server */}
                {error && <div>{error.message}</div>}
              </form>
            </Card>
            <div className={style({ height: '1rem' })}>
              New account? <Link to={'/register'}>Sign Up</Link>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
