import Footer from 'components/molecules/Footer';
import NavBar from 'components/molecules/NavBar';
import { Container, Content } from './AppLayout.style';

interface Props {
    children: JSX.Element;
}

export default function AppLayout({ children }: Props) {
    return (
        <>
            <NavBar />
            <Container>
                <Content>{children}</Content>
                <Footer />
            </Container>
        </>
    );
}
