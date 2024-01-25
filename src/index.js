import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from "react-router-dom";

import { App } from 'components/App';
import { GlobalStyle } from 'components/GlobalStyle';

const theme = {
  colors: {
    white: '#fff',
    lableColor: '#434455',
    accentColor: '#5ad9bb',
    borderColor: '#8e8f99',
    secondaryColor: '#27a688',
    errorColor: '#d06a31',
  },
  radius: {   
    m: '6px',
    l: '16px',
  },
  spacing: value => `${value *4}px`
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/PracticeReact">
      <ThemeProvider theme={theme}>
        <App /> 
        <GlobalStyle/>
      </ThemeProvider>
    </BrowserRouter>      
  </React.StrictMode>
);
