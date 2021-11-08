import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import styled from 'styled-components';

interface PageProps {
    click: boolean
}
export const CarouselContainer = styled.div`
    position: relative;
    width: 580px;
`;

export const FocusedImage = styled.img`
    width: 580px;
    height: 400px;
    border-radius: 6px;
`;

export const BackIcon = styled(ChevronLeftIcon)`
    position: absolute;
    right: 540px;
    top: 190px;
    width: 40px;
    height: 40px;
    color: ${(props) => props.theme.light.white};
    cursor: pointer;
`

export const NextIcon = styled(ChevronRightIcon)`
    position: absolute;
    right: 0px;
    top: 190px;
    width: 40px;
    height: 40px;
    color: ${(props) => props.theme.light.white};
    cursor: pointer;
`

export const PageContainer = styled.div`
    position: absolute;
    top: 380px;
    left: 50%;
    transform: translate(-50%, 0%);
`
export const Page = styled.div<PageProps>`
    float: left;
    margin-right: 15px;
    width: 8px;
    height: 8px;
    border: 1px solid ${(props) => props.theme.light.lightGrey2};
    border-radius: 50%;
    background: ${(props) => props.click ? props.theme.light.primary : props.theme.light.white };
`