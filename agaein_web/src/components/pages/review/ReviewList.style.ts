import styled from 'styled-components';

export const BestReview = styled.div`
    margin-top: 60px;
`;

export const BestReviewTitle = styled.strong`
    display: block;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.black};
`;

export const ReviewInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
`;

export const ReviewCount = styled.div`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.black};
`;

export const Count = styled.span`
    color: ${(props) => props.theme.light.primary};
`;

export const ReviewTable = styled.table`
    width: 100%;
    margin-top: 12px;

    tr {
        cursor: pointer;
    }

    th {
        padding: 7px 0;
        background: #eeebe3;
        font-size: 14px;
        letter-spacing: -0.02em;
        color: ${(props) => props.theme.light.black};
        border: solid ${(props) => props.theme.light.DarkGrey1};
        border-width: 1px 0;
    }

    td {
        padding: 17px 0;
        border-bottom: 1px solid ${(props) => props.theme.light.DarkGrey1};
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.02em;
        color: ${(props) => props.theme.light.black};
        text-align: center;

        svg {
            vertical-align: middle;
            width: 15px;
            margin-left: 5px;
            color: ${(props) => props.theme.light.primary};
        }

        &:nth-child(2) {
            text-align: left;
        }
    }
`;

export const ReviewPagination = styled.div`
    display: flex;
    justify-content: center;
    margin: 68px 0 120px;
`;
