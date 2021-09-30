import styled from 'styled-components';

export const Title = styled.div`
    margin-top: 80px;
    font-size: 24px;
    line-height: 35px;
    color: #5f6871;
    text-align: center;
`

export const FormWrapper = styled.div`
    width: 400px;
    margin: 80px auto 0;
`

export const Fieldset = styled.div`
    strong {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: 20px;
        line-height: 29px;
        color: #5F6871;
        
        span {
            font-size: 12px;
            line-height: 17px;  
        }
    }

    & + & {
        margin-top: 60px;
    }
`

export const FormRow = styled.div`
    display: flex;
 

    & + & {
        margin-top: 20px;
    }
`

export const Label = styled.div`
    flex-shrink: 0;
    width: 110px;
    font-size: 16px;
    line-height: 23px;
    color: #5F6871;
`

export const CheckboxWrapper = styled.div`
    margin-top: 80px;
    text-align: center;
`

export const Checkbox = styled.label`
    font-size: 18px;
    line-height: 26px;
    color: #5F6871;
`

export const ButtonWrapper = styled.div`
    margin: 60px 0 160px;
    text-align: center;

    button {
        margin-left: 20px;
    }
`


