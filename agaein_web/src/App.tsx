import GlobalStyle from './assets/styles/GlobalStyle';
import AppLayout from 'components/organism/AppLayout/AppLayout';
import Router from 'router';
import useGATracking from 'useGATraking';

function App() {
    useGATracking();
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
