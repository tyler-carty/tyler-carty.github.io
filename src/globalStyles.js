import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Courier New', sans-serif;
        background-color: #0a192f;
        color: #8892b0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Courier New', sans-serif;
        color: #64ffda;
    }

    input, button {
        font-family: 'Courier New', sans-serif;
    }
`;

export default GlobalStyle;