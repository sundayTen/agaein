import styled from 'styled-components';

export const BillboardSectionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 24px 40px;
    background-color: white;
    border-radius: 10px;

    @media screen and (max-width: 410px) {
        padding: 12px 20px;
    }
`;

export const CountUnitContainer = styled.div`
    display: flex;
    align-items: center;

    div + div {
        margin-left: 20px;
    }
`;

export const CountContainer = styled.div``;
