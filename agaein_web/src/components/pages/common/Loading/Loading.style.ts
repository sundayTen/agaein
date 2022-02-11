import styled from 'styled-components';
import { ReactComponent as Loading_1 } from 'assets/image/loading/loading1.svg';
import { ReactComponent as Loading_2 } from 'assets/image/loading/loading2.svg';
import { ReactComponent as Loading_3 } from 'assets/image/loading/loading3.svg';
import { ReactComponent as Loading_4 } from 'assets/image/loading/loading4.svg';

export const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;
export const LoadingInnerContainer = styled.div`
    text-align: center;
`;
export const LoadingIcons = styled.div`
    width: 130px;
    height: 24px;
`;

export const Loading1Icon = styled(Loading_1)``;
export const Loading2Icon = styled(Loading_2)``;
export const Loading3Icon = styled(Loading_3)``;
export const Loading4Icon = styled(Loading_4)``;
