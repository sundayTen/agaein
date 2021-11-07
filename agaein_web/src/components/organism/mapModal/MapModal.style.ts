import styled from 'styled-components';
import {SearchIcon} from '@heroicons/react/outline';
import Input from 'components/molecules/Input';
export const InputForm = styled.form`
    position: relative;
    margin-bottom: 20px;
`

export const AddressInput = styled(Input)`
    width: 600px;
    padding-right: 40px;
`

export const Search = styled(SearchIcon)`
    position: absolute;
    top: 9px;
    left: 565px;
    width: 25px;
    height: 25px;
    color: ${(props) => props.theme.light.DarkGrey1}
`

