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

export const Step1ButtonGroup = styled.div`
    margin-top: 80px;
    margin-bottom: 60px;

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

// * Step 3
export const Step3ButtonGroup = styled.div`
    margin-top: 40px;
    margin-bottom: 80px;
    text-align: center;

    button {
        width: 200px;
        height: 58px;
    }
`;

// * 크롤링
export const ToggleWrap = styled.div`
    margin-top: 40px;
    text-align: center;
`;

export const ToggleLabel = styled.label``;

export const ToggleInput = styled.input`
    display: none;
    & + span {
        cursor: pointer;
        min-width: 200px;
        &:hover {
            background: none;
            color: #1a1a1a;
        }
        &:after {
            background: #1a1a1a;
            content: '';
            height: 100%;
            position: absolute;
            top: 0;
            transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
            width: 100%;
            z-index: -1;
        }
    }

    &.toggle-left + span {
        border-right: 0;
        &:after {
            left: 100%;
        }
    }
    &.toggle-right + span {
        margin-left: -5px;
        &:after {
            left: -100%;
        }
    }
    &:checked + span {
        cursor: default;
        color: #fff;
        transition: color 200ms;
        &:after {
            left: 0;
        }
    }
`;

export const ToggleText = styled.span`
    border: 3px solid #1a1a1a;
    display: inline-block;
    padding: 10px;
    position: relative;
    text-align: center;
    transition: background 600ms ease, color 600ms ease;
`;
