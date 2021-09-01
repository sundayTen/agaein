import Button from 'components/Button';
import DarkModeButton from 'components/DarkModeButton';
import styled from 'styled-components';

interface NavBarProps {}

const NavBarContainer = styled.div`
    width: 100vw;
    height: 80px;
    color: ${(props) => props.color};
    padding-vertical: 10px;
    flex-direction: 'row';
    margin: 5px;
    display: flex;
`;

const NavBar = (props: NavBarProps) => {
    return (
        // <div style={{ width: '100vw', background: '#aaaaaa' }}>
        //     <h1>네비게이션 바</h1>
        // </div>
        <NavBarContainer color={'#0038ff'}>
            <h1>이것은 NavBar입니다.</h1>
            <DarkModeButton />
            <Button />
        </NavBarContainer>
    );
};

export default NavBar;
