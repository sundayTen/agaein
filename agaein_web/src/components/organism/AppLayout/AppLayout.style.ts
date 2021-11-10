import styled from 'styled-components';

export const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const Container = styled.div`
    height: calc(100% - 76px);
    margin-top: 76px;
    overflow-y: auto;
`;

export const Content = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
`;
