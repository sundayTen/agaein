import styled from 'styled-components';

interface CircleContainerProps {
    active: boolean;
}

export const CircleContainer = styled.div<CircleContainerProps>`
    width: 52px;
    height: 52px;
    border-radius: 50px;
    background-color: ${(props) => (props.active ? props.theme.light.primary : 'white')};
    color: ${(props) => (props.active ? 'white' : props.theme.light.disable)};
    border: ${(props) => (props.active ? undefined : '1px solid #bfc4ca')};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    user-select: none;
`;
