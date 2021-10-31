import 'styled-components';
// ? DarkMode를 고려해서 나눴지만 일단 보류.
declare module 'styled-components' {
    export interface DefaultTheme {
        // dark: {
        //     background: string;
        //     primary: string;
        //     disable: string;
        //     positive: string;
        //     negative: string;
        //     placeholder: string;
        //     font: string;
        // };
        light: {
            background: string;
            primary: string;
            disable: string;
            positive: string;
            sub1: string;
            sub2: string;
            negative: string;
            white: string;
            black: string;
            lightGrey1: string;
            lightGrey2: string;
            DarkGrey1: string;
            DarkGrey2: string;
            primary100: string;
            primary400: string;
            primary800: string;
        };
    }
}
