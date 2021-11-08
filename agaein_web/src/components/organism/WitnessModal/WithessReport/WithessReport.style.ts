import { RequiredGuide } from "components/pages/createArticle/CreateArticle.style";
import styled from "styled-components";

export const FormWrapper = styled.div`
    positon: relative;
    width: 580px;
    padding: 20px;
    box-sizing: border-box;
    background: ${(props) => props.theme.light.white};
    border: 1px solid #f6f6f6;
    border-radius: 10px;
`;