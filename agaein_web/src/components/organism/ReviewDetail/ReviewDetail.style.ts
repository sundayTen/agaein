import styled, { css } from 'styled-components';
import { ChevronRightIcon } from '@heroicons/react/solid';

interface ArrowProps {
    direction: 'prev' | 'next';
}

export const ReviewBody = styled.div`
    width: 580px;
`;

export const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ReviewAuthor = styled.div`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.black};
`;

export const ReviewInfo = styled.div`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.02em;
    text-align: right;
    color: ${(props) => props.theme.light.black};
`;

export const ReviewImages = styled.ul`
    margin-top: 20px;
`;

export const ReviewImage = styled.li`
    height: 400px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const ReviewContent = styled.div`
    margin-top: 20px;
`;

export const ReviewTitle = styled.strong`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.black};
`;

export const ReviewText = styled.p`
    margin-top: 12px;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.DarkGrey2};
`;

export const ReviewArrowIcon = styled(ChevronRightIcon)<ArrowProps>`
    width: 30px;
    height: 30px;
    color: #fff;
    z-index: 100;

    ${(props: ArrowProps) =>
        props.direction === 'prev' &&
        css`
            transform: rotate(180deg);
            left: 0;
        `}

    ${(props: ArrowProps) =>
        props.direction === 'next' &&
        css`
            right: 0;
        `}
`;
