import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from 'graphql/apollo';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/theme';
import { UserProvider } from 'contexts/userContext';
import { ModalProvider } from 'contexts/modalContext';
import ScrollToTop from 'components/molecules/ScrollToTop/scrollToTop';
import { ErrorBoundary } from 'react-error-boundary';
import Error from 'components/pages/common/Error';
import { BookmarkProvider } from 'contexts/bookmarkContext';
import dotenv from 'dotenv';
dotenv.config();

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <ErrorBoundary fallbackRender={Error}>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <ThemeProvider theme={theme}>
                        <UserProvider>
                            <ModalProvider>
                                <BookmarkProvider>
                                    <ScrollToTop />
                                    <App />
                                </BookmarkProvider>
                            </ModalProvider>
                        </UserProvider>
                    </ThemeProvider>
                </ApolloProvider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>,
);
reportWebVitals();
