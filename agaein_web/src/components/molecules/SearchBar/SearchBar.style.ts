import styled from 'styled-components';
import { SearchIcon } from '@heroicons/react/solid';
import 'react-datepicker/dist/react-datepicker.css';

export const SearchBarDiv = styled.div`
    margin: 30px 0;
`;
export const SearchInputIcon = styled(SearchIcon)`
    position: absolute;
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-top: 0.9%;
`;

export const SearchInput = styled.input`
    width: 400px;
    height: 48px;
    border: ${(props) => '1px solid  ' + props.theme.light.DarkGrey1};
    border-radius: 4px 0px 0px 4px;
`;

export const AreaInput = styled.input`
    width: 239px;
    height: 48px;
    border: ${(props) => '1px solid  ' + props.theme.light.DarkGrey1}; ;
`;

export const DateInput = styled.input`
    width: 241px;
    height: 48px;
    border: ${(props) => '1px solid  ' + props.theme.light.DarkGrey1}; ;
`;

export const KindSelect = styled.select`
    width: 240px;
    height: 52px;
    border: ${(props) => '1px solid  ' + props.theme.light.DarkGrey1}; ;
`;

export const SearchButton = styled.button`
    width: 140px;
    height: 51px;
    border: ${(props) => '1px solid  ' + props.theme.light.DarkGrey1};
    border-radius: 0px 4px 4px 0px;
    background: #bfc4ca;
`;
