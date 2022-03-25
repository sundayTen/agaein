import styled from 'styled-components';

// * Step 1
interface BigButtonProps {
    active: boolean;
}

export const BigButton = styled.button<BigButtonProps>`
    width: 460px;
    height: 274px;
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
    width: 340px;
    margin: 40px auto 0;
    background: #eeebe3;
    border-radius: 28px;
    padding: 4px;
`;

export const ToggleLabel = styled.label`
    display: inline-block;
`;

export const ToggleInput = styled.input`
    display: none;
    & + span {
        cursor: pointer;
        width: 150px;
        border: none;
        &:hover {
            background: none;
            color: #efa03d;
        }
    }

    &.toggle-left + span {
        border-right: 0px;

        &:before {
            content: '';
            width: 100%;
            left: 100%;
            border-radius: 24px;
            background: #efa03d;
            height: 100%;
            position: absolute;
            top: 0;
            transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
            width: 100%;
            z-index: -1;
        }
    }
    &.toggle-right + span {
        margin-left: 0px;
    }
    &:checked + span {
        cursor: default;
        color: #fff;
        transition: color 100ms;
        &:before {
            left: 0;
        }
    }
`;

export const ToggleText = styled.span`
    position: relative;
    border: 3px solid #1a1a1a;
    display: inline-block;
    padding: 10px;
    position: relative;
    text-align: center;
    transition: all 600ms ease, color 600ms ease;
    z-index: 1;
`;

export const Step1Image = styled.img`
    width: 272px;
    height: 190px;
`;
