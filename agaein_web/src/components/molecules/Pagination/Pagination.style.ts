import styled from 'styled-components';

interface PageProps {
    active?: boolean;
}

const PageList = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
`;

const PageItem = styled.button<PageProps>`
    width: 28px;
    height: 28px;
    margin: 0 10px;
    padding: 0;
    border-radius: 50%;
    line-height: 28px;
    font-size: 14px;
    color: ${(props) => (props.active ? props.theme.light.white : props.theme.light.DarkGrey2)};
    background-color: ${(props) => props.active && props.theme.light.primary};

    &:hover {
        font-weight: bold;
    }

    svg {
        width: 12px;
        color: ${(props) => props.theme.light.DarkGrey1};
    }
`;

export { PageItem, PageList };
