import { ChevronDownIcon, ChevronUpIcon, RefreshIcon } from '@heroicons/react/solid';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Table = styled.table`
    width: 1280px;
    max-height: 750px;
    margin-bottom: 60px;
`;

export const Thead = styled.thead`
    height: 36px;
    background: #eeebe3;
    border-top: 1px solid ${(props) => props.theme.light.DarkGrey1};
    border-bottom: 1px solid ${(props) => props.theme.light.DarkGrey1};
    font-size: 14px;
`;

export const HeadTh = styled.th`
    min-width: 100px;
`;

export const BodyTr = styled.tr`
    height: 56px;
    border-bottom: 1px solid ${(props) => props.theme.light.DarkGrey1};
    font-weight: normal;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
`;

export const HiddenBodyTr = styled.tr`
    height: 42px;
    border-bottom: 1px solid ${(props) => props.theme.light.DarkGrey1};
    background: #eeebe3;
`;

export const PagingContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 120px;
`;

export const SearchFilter = styled.div`
    display: flex;
    margin: 60px 0 32px 0;
`;

export const RefreshButton = styled(Link)`
    font-family: NanumSquareRound;
    font-size: 14px;
    line-height: 22px;
    color: #505050;
    vertical-align: middle;
    margin-left: 12px;
`;

export const SortFilter = styled.div`
    line-height: 10px;
`;

export const DownIcon = styled(ChevronDownIcon)`
    width: 25px;
    height: 25px;
    vertical-align: middle;
`;

export const UpIcon = styled(ChevronUpIcon)`
    width: 25px;
    height: 25px;
    vertical-align: middle;
`;

export const AgainIcon = styled(RefreshIcon)`
    width: 13px;
    height: 13px;
    vertical-align: middle;
`;

export const SelectContainer = styled.div`
    position: relative;
    cursor: pointer;
`;
