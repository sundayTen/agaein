import styled from 'styled-components';

interface PageProps {
    active?: boolean;
}

const PaginationDiv = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
`;
const Page = styled.div<PageProps>`
    cursor: pointer;
    margin: 0 10px;
    width: 28px;
    height: 28px;
    border-radius: 30px;
    background-color: ${(props) => props.active && props.theme.light.primary};
    &:hover {
        font-weight: bold;
    }
`;

const PageText = styled.span<PageProps>`
    font-size: 14px;
    color: ${(props) => (props.active ? props.theme.light.white : props.theme.light.DarkGrey2)};
`;

export { Page, PaginationDiv, PageText };
