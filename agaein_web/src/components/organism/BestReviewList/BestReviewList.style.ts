import styled from 'styled-components';

export const List = styled.ul`
    display: flex;
`;

export const Item = styled.li`
    & + & {
        margin-left: 40px;
    }
`;
