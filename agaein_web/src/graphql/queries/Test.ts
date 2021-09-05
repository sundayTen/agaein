import { gql } from '@apollo/client';

export const fetchUser = gql`
    query {
        movie(id: 7) {
            id
            name
            score
        }
    }
`;
