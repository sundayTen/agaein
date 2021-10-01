import styled from 'styled-components';

export const Title = styled.div`
    margin-top: 80px;
    font-size: 24px;
    line-height: 35px;
    color: #5f6871;
    text-align: center;
`;

export const FormWrapper = styled.div`
    width: 400px;
    margin: 80px auto 0;
`;

export const Fieldset = styled.div`
    strong {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: 20px;
        line-height: 29px;
        color: #5f6871;

        span {
            font-size: 12px;
            line-height: 17px;
        }
    }

    & + & {
        margin-top: 60px;
    }
`;

export const FormRow = styled.div`
    display: flex;

    & + & {
        margin-top: 20px;
    }
`;

export const Label = styled.div`
    flex-shrink: 0;
    width: 110px;
    font-size: 16px;
    line-height: 23px;
    color: #5f6871;
`;

export const CheckboxWrapper = styled.div`
    margin-top: 80px;
    text-align: center;
`;

export const Checkbox = styled.label`
    font-size: 18px;
    line-height: 26px;
    color: #5f6871;
`;

export const ButtonWrapper = styled.div`
    margin: 60px 0 160px;
    text-align: center;

    button {
        margin-left: 20px;
    }
`;

// * Step 1
interface BigButtonProps {
    active: boolean;
}

export const BigButton = styled.div<BigButtonProps>`
    display: flex;
    width: 400px;
    height: 180px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: ${(props) => (props.active ? '1px solid ' + props.theme.light.primary : '1px solid #bfc4ca')};
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

interface NextButtonProps {
    disabled: boolean;
}

export const NextButton = styled.div<NextButtonProps>`
    display: flex;
    width: 240px;
    height: 64px;
    background-color: ${(props) => (props.disabled ? '#eee' : props.theme.light.primary)};
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 60px;
    user-select: none;
`;

export const ButtonFont = styled.span<BigButtonProps>`
    font-size: 24px;
    font-weight: 400;
    line-height: 35px;
    letter-spacing: 0em;
    text-align: center;
    color: ${(props) => (props.active ? props.theme.light.primary : '#5f6871')};
`;

export const CreateArticleContainer = styled.div`
    width: 840px;
    margin: 0 auto;
    padding-top: 100px;
    text-align: center;
    margin-bottom: 176px;
`;

export const CreateArticleButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 100px;
`;

export const CreateArticleTitle = styled.p`
    font-size: 36px;
    font-weight: 600;
    color: #5f6871;
    margin-bottom: 20px;
    margin-top: 100px;
    font-family: 'Ssuround';
`;
export const CreateArticleDesc = styled.p`
    font-size: 22px;
    color: #5f6871;
`;
