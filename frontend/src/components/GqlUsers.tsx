import React from 'react';

import { UserPageResult } from 'backend/types/user';
import { PageVariables } from 'src/../../backend/src/types/pagination';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';

export const USERS = gql`
  query Users($page: PageInput!) {
    users(page: $page) {
      items {
        id
        email
        displayName
        verified
        role
      }
      page
      pageSize
      total
      search
      sort
      filters
    }
  }
`;

interface Data {
  users: UserPageResult;
}

interface Props {
  children: (result: QueryResult<Data, PageVariables>) => React.ReactNode;
  variables: PageVariables;
}

export const GqlUsers: React.FC<Props> = props => (
  <Query<Data, PageVariables> query={USERS} {...props} />
);
