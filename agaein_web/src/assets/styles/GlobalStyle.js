import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body,
  h1, h2, h3, h4, h5, h6,
  ul, ol, dl, dd,
  p,
  fieldset, legend {
    margin: 0;
    padding: 0;
  }
  
  body, input, textarea, select, button {
    font-family: Dotum,'돋움',Helvetica,"Apple SD Gothic Neo",sans-serif;
  }
  
  ul, ol {
    list-style: none;
  }
  
  table {
    border-collapse: collapse;
  }
  
  em {
    font-style: normal;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  img {
    vertical-align: top;
  }
  
  fieldset {
    border: 0;
  }
`;

export default GlobalStyle;