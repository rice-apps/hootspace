import { createGlobalStyle } from 'styled-components/macro'
import avenir from './fonts/AvenirLTStd-Book.otf'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Avenir";
    src: 
      url(${avenir}) 
      format("opentype");
  }

  html {
    overflow-x: hidden;
  }

  body {
    margin: 0;
    font-family: "Avenir";
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`

export default GlobalStyle
