import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    server: {
        port: 3000,
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }
    body{
        font-size: 1.2rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color:#151B1F;
        font-family: 'Arial', Montserrat;
    }
    a{
        text-decoration: none;
        color: #fff;
    }
`;