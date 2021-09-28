import styled from 'styled-components';

export const HomeHeaderContainer = styled.div`
    text-align: center;
    padding-top: 120px;
`;

export const HomeHeaderButtonGroup = styled.div`
    margin-top: 30px;

    button + button {
        margin-left: 20px;
    }
`;

export const HeaderFirstFont = styled.p`
    font-size: 22px;
    color: #5f6871;
`;
export const HeaderSecondFont = styled.p`
    padding-top: 4px;
    font-size: 36px;
    font-weight: 600;
    color: #5f6871;
`;
