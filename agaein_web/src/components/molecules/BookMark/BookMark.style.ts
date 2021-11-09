import { BookmarkIcon } from '@heroicons/react/solid';
import styled from 'styled-components';

export const BookMarkActive = styled(BookmarkIcon)`
    color: ${(props) => props.theme.light.sub1};
    width: 19px;
    height: 24px;
`;

export const BookMarkInActive = styled(BookmarkIcon)`
    color: ${(props) => props.theme.light.DarkGrey1};
    width: 19px;
    height: 24px;
`;

export const BookMarkContainer = styled.button`
    width: 24px;
    height: 24px;
`;
