import { BookmarkIcon as SolidBookMark } from '@heroicons/react/solid';
import { BookmarkIcon as OutlineBookMark } from '@heroicons/react/outline';
import styled from 'styled-components';

export const BookMarkActive = styled(SolidBookMark)`
    color: ${(props) => props.theme.light.primary};
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

export const BookMarkInActive = styled(OutlineBookMark)`
    color: white;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

export const BookMarkContainer = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
`;
