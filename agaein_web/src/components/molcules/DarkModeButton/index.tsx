import { useState } from 'react';
import styled from 'styled-components';
import { BeakerIcon, MoonIcon, SunIcon } from '@heroicons/react/solid';

interface DarkModeButtonProps {}

const DarkModeContainer = styled.span`
        border-radius: 30px;
        background-color: '#0039ff;
        width: 70px;
        height: 70px;
        flex-direction:'row'
        justify-content:'space-between'
    `;

const DarkModeButton = (props: DarkModeButtonProps) => {
    const [currentMode, setCurrentMode] = useState('LIGHT');
    return (
        <>
            <DarkModeContainer onClick={() => setCurrentMode(currentMode === 'DARK' ? 'LIGHT' : 'DARK')}>
                {currentMode === 'LIGHT' ? <SunIcon /> : <MoonIcon />}
            </DarkModeContainer>
        </>
    );
};

export default DarkModeButton;
