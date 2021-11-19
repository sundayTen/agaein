import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from 'graphql/apollo';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/theme';
import { UserProvider } from 'contexts/userContext';
import ScrollToTop from 'components/molecules/ScrollToTop/scrollToTop';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <UserProvider>
                        <ScrollToTop />
                        <App />
                    </UserProvider>
                </ThemeProvider>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
reportWebVitals();
