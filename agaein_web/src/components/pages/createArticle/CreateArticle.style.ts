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
    & + & {
        margin-top: 60px;
    }
`;

export const FieldsetTitle = styled.strong`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    font-size: 20px;
    line-height: 29px;
    color: #5f6871;

    span {
        font-size: 12px;
        font-weight: 300;
        line-height: 17px;
    }
`;

export const FormRow = styled.div`
    display: flex;
    margin-top: 20px;
`;

export const FormLabel = styled.div`
    flex-shrink: 0;
    width: 110px;
    margin-top: 8px;
    font-size: 16px;
    line-height: 23px;
    font-weight: 500;
    color: #5f6871;
`;

export const ButtonWrapper = styled.div`
    margin: 60px 0 160px;
    text-align: center;

    button {
        margin-left: 20px;
    }
`;

export const BackButton = styled.button`
    width: 64px;
    height: 64px;
    border: ${(props) => '2px solid ' + props.theme.light.DarkGrey1};
    border-radius: 10px;
    color: #5f6871;
`;

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
