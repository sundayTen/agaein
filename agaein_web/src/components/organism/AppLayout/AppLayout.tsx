import Footer from 'components/molecules/Footer';
import NavBar from 'components/molecules/NavBar';
import { AppLayer, Container, Content } from './AppLayout.style';

interface Props {
    children: JSX.Element;
}

export default function AppLayout({ children }: Props) {
    return (
        <AppLayer>
            <NavBar />
            <Container>
                <Content>{children}</Content>
            </Container>
            <Footer />
        </AppLayer>
    );
}
