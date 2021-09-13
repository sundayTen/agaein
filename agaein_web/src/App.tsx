import GlobalStyle from './assets/styles/GlobalStyle';
import NavBar from 'components/molcules/NavBar';
import Router from 'Router';

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
