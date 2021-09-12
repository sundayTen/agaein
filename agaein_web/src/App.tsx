import Router from './router';
import GlobalStyle from './assets/styles/GlobalStyle';
import NavBar from 'components/NavBar';

function App() {
    return (
        <div style={{ width: '100vw' }}>
            <GlobalStyle />
            <NavBar />
            <Router />
        </div>
    );
}

export default App;
