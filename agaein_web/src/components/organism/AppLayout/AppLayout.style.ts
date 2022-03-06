import styled from 'styled-components';

export const AppLayer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
`;

export const Container = styled.div`
    min-height: calc(100% - 194px);
    padding-top: 80px;
`;

export const Content = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
`;
