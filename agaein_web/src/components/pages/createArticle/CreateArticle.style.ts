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
    button + button {
        margin-left: 20px;
    }
`;

// * Step 2
export const Title = styled.h2`
    margin-top: 60px;
    font-family: Ssurround, sans-serif;
    font-size: 34px;
    line-height: 40px;
    letter-spacing: -0.02em;
    color: #333;
    text-align: center;
`;

export const SubTitle = styled.div`
    margin-top: 12px;
    font-family: SsurroundAir, sans-serif;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #505050;
`;

export const FormWrapper = styled.div`
    width: 920px;
    margin: 40px auto 0;
    padding: 40px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #f6f6f6;
    border-radius: 10px;

    & + & {
        margin-top: 30px;
    }
`;

export const FormTitle = styled.strong`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 13px;
    border-bottom: 1px solid #c4c4c4;
    font-size: 16px;
    line-height: 24px;
    color: #333;
`;

export const RequiredIcon = styled.i`
    display: inline-block;
    vertical-align: 3px;
    width: 4px;
    height: 4px;
    margin-left: 6px;
    border-radius: 50%;
    background-color: #ef5f3d;
`;

export const RequiredGuide = styled.span`
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: #505050;

    ${RequiredIcon} {
        vertical-align: middle;
        margin: 0 6px 0 0;
    }
`;

export const FormRow = styled.div`
    display: flex;
    margin-top: 30px;
`;

export const FormLabel = styled.div`
    flex-shrink: 0;
    width: 130px;
    margin-top: 12px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: #333;
`;

export const Form = styled.div`
    width: 460px;
`;

export const ButtonWrapper = styled.div`
    margin: 60px 0 160px;
    text-align: center;

    button {
        margin-left: 20px;
    }
`;
