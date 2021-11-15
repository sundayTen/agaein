import Input from 'components/molecules/Input/Input';
import styled from 'styled-components';

export const CommentWrapper = styled.div`
    margin: 40px 0 120px;
`;

export const CommentContainer = styled.div`
    width: 100%;
    background-color: white;
    border-radius: 10px;
    margin-top: 15px;
`;

export const CommentHeader = styled.div`
    border-bottom: 1px solid #eee;
`;

// ? 어림잡아 맞춘 부분이라 좋은 방법이 있으면 수정해야함.
export const CommentInputContainer = styled.div`
    padding: 30px 30px 30px 30px;
`;

export const CommentToolContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const CommentPwdContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 435px;
`;
export const CommentPwd = styled(Input)`
    width: 120px;
    margin-right: 10px;
`;
