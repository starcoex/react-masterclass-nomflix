import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from "recoil"
import { ThemeProvider } from 'styled-components';
import { theme } from "./theme"
import App from './App';
import GlobalStyle from './Styles/GlobalStyle';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
