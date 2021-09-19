import GlobalStyle from './assets/styles/GlobalStyle';
import AppLayout from 'components/organism/AppLayout/AppLayout';
import Router from 'router';

function App() {
    return (
        <div style={{ width: '100vw' }}>
            <GlobalStyle />
            <AppLayout>
                <Router />
            </AppLayout>
        </div>
    );
}

export default App;
