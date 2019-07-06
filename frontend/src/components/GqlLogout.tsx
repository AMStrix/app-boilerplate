import React from 'react';

import gql from 'graphql-tag';
import { Mutation, MutationResult, MutationFn } from 'react-apollo';

const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

interface Props {
  children: (
    login: MutationFn<boolean, {}>,
    result: MutationResult<boolean>,
  ) => React.ReactNode;
}

export const GqlLogout: React.FC<Props> = props => (
  <Mutation<boolean, {}> mutation={LOGOUT} {...props} />
);
