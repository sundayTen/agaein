import styled from 'styled-components';

export const HomeHeaderContainer = styled.div`
    text-align: center;
    padding: 80px 0 20px;
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

    @media screen and (max-width: 420px){
        button {
        width: 150px;
        padding: 10px;
    }
    }
`;

export const HomeImage = styled.img`
    width: 892px;
    height: 280px;

    @media screen and (max-width: 420px){
        width: 380px;
        height: 122px;
        margin-top: 10px;
    }
`;
