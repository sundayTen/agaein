import 'styled-components';
declare module 'styled-components' {
    export interface DefaultTheme {
        dark: {
            background: string;
            primary: string;
            secondary: string;
            disable: string;
            error: string;
            font: string;
        };
        light: {
            background: string;
            primary: string;
            secondary: string;
            disable: string;
            error: string;
            font: string;
        };
    }
}
