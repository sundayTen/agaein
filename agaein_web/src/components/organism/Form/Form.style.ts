import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 920px;
    margin: 40px auto 0;
    padding: 40px;
    box-sizing: border-box;
    background: ${(props) => props.theme.light.white};
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
    border-bottom: 1px solid ${(props) => props.theme.light.DarkGrey1};
    font-size: 16px;
    line-height: 24px;
    color: ${(props) => props.theme.light.black};
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
    color: ${(props) => props.theme.light.black};
`;

export const Form = styled.div`
    width: 460px;
`;
