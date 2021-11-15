import styled from 'styled-components';

export const HomeHeaderContainer = styled.div`
    text-align: center;
    padding: 80px 0 120px;
`;

export const HomeHeaderButtonGroup = styled.div`
    margin-top: 30px;

    button {
        width: 200px;
        height: 52px;
    }

    button + button {
        margin-left: 20px;
    }
`;
