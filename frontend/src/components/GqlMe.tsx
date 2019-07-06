import React from 'react';

import { User } from 'backend/models/User';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const ME = gql`
  {
    me {
      id
      email
      displayName
      verified
      role
    }
  }
`;

interface Data {
  me: User;
}

interface Props {
  children: (result: QueryResult<Data, {}>) => React.ReactNode;
}

export const GqlMe: React.FC<Props> = props => <Query<Data, {}> query={ME} {...props} />;
