import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/apollo';
import ThemeProvider from './contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <ApolloProvider client={client}>
                    <Router />
                </ApolloProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
