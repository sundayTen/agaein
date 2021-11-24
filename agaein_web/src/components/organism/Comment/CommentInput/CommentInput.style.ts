import { Input } from 'components/molecules';
import styled from 'styled-components';

export const CommentInputContainer = styled.div`
    position: relative;
    margin: 30px 30px 0px 30px;
`;

export const SubmitButton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    height: 100%;
    background-color: ${(props) => (props.disabled ? props.theme.light.DarkGrey1 : props.theme.light.primary)};
    color: ${(props) => props.theme.light.white};
    font-weight: 400;
    border-radius: 0px 4px 4px 0px;
`;

export const CommentToolContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px 0px 30px 30px;
`;

export const CommentPwdContainer = styled.div`
    display: flex;
    align-items: center;
    width: 435px;
`;
export const CommentPwd = styled(Input)`
    width: 120px;
    margin-right: 10px;
`;
