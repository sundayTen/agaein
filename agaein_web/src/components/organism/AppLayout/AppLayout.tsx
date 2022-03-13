import Footer from 'components/molecules/Footer';
import NavBar from 'components/molecules/NavBar';
import { AppLayer, Container, Content } from './AppLayout.style';
import Loading from 'components/pages/common/Loading';
interface Props {
    children: JSX.Element;
}

export default function AppLayout({ children }: Props) {
    return (
        <AppLayer>
            <NavBar />
            <Loading />
            <Container>
                <Content>{children}</Content>
            </Container>
            <Footer />
        </AppLayer>
    );
}
