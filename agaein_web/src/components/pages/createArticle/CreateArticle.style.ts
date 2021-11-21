import styled from 'styled-components';

// * Step 1
interface BigButtonProps {
    active: boolean;
}

export const BigButton = styled.button<BigButtonProps>`
    width: 400px;
    height: 180px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: ${(props) => (props.active ? '1px solid ' + props.theme.light.primary : '1px solid #EEEBE3')};
    cursor: pointer;
    background-color: white;
    &:hover {
        opacity: 0.8;
    }
`;

export const Step1Container = styled.div`
    padding-top: 100px;
    text-align: center;
    margin-bottom: 176px;
`;

export const Step1Headers = styled.div`
    padding: 80px 0px;
    text-align: center;
`;

export const Step1ButtonGroup = styled.div`
    margin-top: 30px;
    margin-bottom: 100px;
    button + button {
        margin-left: 20px;
    }
`;
export const UtilButtonGroup = styled.div`
    button {
        width: 200px;
        height: 58px;
        border-radius: 8px;
    }

    button + button {
        margin-left: 20px;
    }
`;

// * Step 2
export const ButtonWrapper = styled.div`
    margin: 60px 0 160px;
    text-align: center;

    button {
        width: 200px;
        height: 58px;
        border-radius: 8px;
    }

    button + button {
        margin-left: 20px;
    }
`;

export const CheckWrapper = styled.div`
    margin-top: 30px;
`;
