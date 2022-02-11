import styled from 'styled-components';

export const NotFoundContainer = styled.div`
    text-align: center;
    flex: 1;
`;
export const NotFoundImage = styled.img`
    width: 305px;
    height: 300px;
`;
export const NotFoundButtonGroup = styled.div`
    margin-top: 30px;

    button {
        width: 200px;
        height: 52px;
    }

    button + button {
        margin-left: 20px;
    }
`;
