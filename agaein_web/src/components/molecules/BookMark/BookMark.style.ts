import * as outlineIcon from '@heroicons/react/outline';
import * as solidIcon from '@heroicons/react/solid';
import styled from 'styled-components';

export const BookMarkActive = styled(solidIcon.BookmarkIcon)`
    color: ${(props) => props.theme.light.sub1};
    width: 19px;
    height: 24px;
`;

export const BookMarkInActive = styled(outlineIcon.BookmarkIcon)`
    color: ${(props) => props.theme.light.white};
    width: 19px;
    height: 24px;
`;

export const BookMarkContainer = styled.button`
    width: 24px;
    height: 24px;
`;
