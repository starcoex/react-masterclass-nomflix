import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from "recoil"
import { ThemeProvider } from 'styled-components';
import { theme } from "./theme"
import App from './App';
import GlobalStyle from './Styles/GlobalStyle';
import { QueryClient, QueryClientProvider } from "react-query"


const client = new QueryClient()
// console.log(client)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
