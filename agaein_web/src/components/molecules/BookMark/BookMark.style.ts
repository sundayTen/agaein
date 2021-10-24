import { BookmarkIcon as SolidBookMark } from '@heroicons/react/solid';
import { BookmarkIcon as OutlineBookMark } from '@heroicons/react/outline';
import styled from 'styled-components';

export const BookMarkActive = styled(SolidBookMark)`
    color: ${(props) => props.theme.light.sub1};
    width: 18px;
    height: 18px;
`;

export const BookMarkInActive = styled(OutlineBookMark)`
    color: white;
    width: 18px;
    height: 18px;
`;

export const BookMarkContainer = styled.button``;
