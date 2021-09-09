import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Custom Scalars */
  Date: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** User */
  signup?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
};


export type MutationSignupArgs = {
  User: UserSignupInput;
};


export type MutationLoginArgs = {
  User: UserLoginInput;
};

export type Query = {
  __typename?: 'Query';
  /** User */
  users: Array<Maybe<User>>;
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Timestamps = {
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type User = Timestamps & {
  __typename?: 'User';
  id: Scalars['ID'];
  info: UserInfo;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  kakao_id?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserSignupInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  kakao_id?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<Maybe<{ __typename?: 'User', id: string, info: { __typename?: 'UserInfo', name: string, email: string } }>> };


export const GetUsersDocument = gql`
    query getUsers {
  users {
    id
    info {
      name
      email
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;