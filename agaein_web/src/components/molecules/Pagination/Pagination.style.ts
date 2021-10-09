import styled from 'styled-components';

interface PageProps {
    active?: boolean;
}

export const PaginationDiv = styled.div`
    text-align: center;
    margin-top: 50px;
`;
export const Page = styled.a<PageProps>`
    margin: 0 10px;
    font-weight: ${(props) => (props.active ? 'bold' : '')};
    &:hover {
        font-weight: bold;
    }

    &:active {
        font-weight: bold;
    }
`;
