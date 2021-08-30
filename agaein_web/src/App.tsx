import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/apollo';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/theme';

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <ApolloProvider client={client}>
                    <Router />
                </ApolloProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
