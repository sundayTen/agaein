import { DotsVerticalIcon } from '@heroicons/react/solid';
import styled from 'styled-components';
import { ReactComponent as Reply } from 'assets/image/reply.svg';

interface CommentContainerProps {
    isReply?: boolean;
}

export const CommentItemContainer = styled.div<CommentContainerProps>`
    height: 47px;
    margin: ${(props) => `20px ${props.isReply ? '0 10px 10px' : '0'}`};
`;
export const CommentItemWriterContainer = styled.div`
    display: inline-block;
    margin: 0 0 5px 0;
`;

export const CommentItemToolBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`;

export const ReplyIcon = styled(Reply)`
    width: 10px;
    height: 10px;
    margin-right: 10px;
`;

export const DotIcon = styled(DotsVerticalIcon)`
    width: 18px;
    height: 18px;
`;
export const DotIconButton = styled.button``;

export const AuthorTag = styled.span`
    padding: 2px 10px;
    margin-right: 8px;
    border-radius: 11px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    border: ${(props) => 'solid 1px ' + props.theme.light.primary};
    color: ${(props) => props.theme.light.primary};
`;

export const CommentSelectContainer = styled.div`
    display: inline-block;
    position: relative;
`;

export const SelectContainer = styled.ul`
    position: absolute;
    top: 28px;
    right: 0;
    box-sizing: border-box;
    min-width: 100px;
    padding: 6px;
    box-shadow: 0px 0px 6px rgba(51, 51, 51, 0.12);
    border-radius: 6px;
    background-color: ${(props) => props.theme.light.white};
    z-index: 1000;
`;

export const SelectItem = styled.li`
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        color: ${(props) => props.theme.light.primary};
        background-color: ${(props) => props.theme.light.background};
    }
`;
