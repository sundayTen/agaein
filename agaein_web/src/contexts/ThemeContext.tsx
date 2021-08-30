import React, { createContext, useState } from 'react';
import { DarkModeTheme, LightModeTheme } from '../theme/theme';

export const ThemeContext = createContext({});

// TODO : LocalStorage에 테마를 저장하고 다시 돌아왔을 때 받아서 이니셜라이즈 하기
export const ThemeProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
    const [currentTheme, setCurrentTheme] = useState(LightModeTheme);
    return <ThemeContext.Provider value={currentTheme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
