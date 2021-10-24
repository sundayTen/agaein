import { DotsVerticalIcon } from '@heroicons/react/solid';
import styled from 'styled-components';

interface CommentContainerProps {
    isChildren?: boolean;
}

export const CommentItemContainer = styled.div<CommentContainerProps>`
    height: 47px;
    margin: ${(props) => `10px ${props.isChildren ? '30px' : '0'}`};
    padding: 30px 20px;
`;
export const CommentItemWriterContainer = styled.div`
    display: inline-block;
    margin: 0 0 5px 0;
`;

export const CommentItemToolBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const DotIcon = styled(DotsVerticalIcon)`
    width: 18px;
    height: 18px;
`;
export const DotIconButton = styled.button``;

export const AuthorTag = styled.span`
    padding: 2px 10px;
    border-radius: 11px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    border: ${(props) => 'solid 1px ' + props.theme.light.primary};
    color: ${(props) => props.theme.light.primary};
`;
