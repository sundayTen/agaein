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
export const DeleteModal = styled.div`
    width: 460px;
    margin: 0 auto;
`;

export const ButtonGroup = styled.div`
    display: flex;
    margin-top: 40px;
    justify-content: center;
    button + button {
        margin-left: 20px;
    }
`;
