import styled from 'styled-components';

export const CommentWrapper = styled.div`
    margin: 40px 0 120px;

    @media screen and (max-width: 420px){
        margin: 20px 0 60px;
    }
`;

export const CommentContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    margin-top: 15px;
    padding: 30px;

    @media screen and (max-width: 420px){
        padding: 15px;
    }
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
export const CommentBorder = styled.hr`
    background: ${(props) => props.theme.light.lightGrey2};
    height: 1px;
    border: 0;
`;
