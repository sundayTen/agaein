import GlobalStyle from './assets/styles/GlobalStyle';
import AppLayout from 'components/organism/AppLayout/AppLayout';
import Router from 'router';

function App() {
    return (
        <>
            <GlobalStyle />
            <AppLayout>
                <Router />
            </AppLayout>
        </>
    );
}

export default App;
