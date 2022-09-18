import styled, { css } from 'styled-components';

interface ButtonProps {
    active: boolean;
}

interface StatusProps {
    status: 'active' | 'stop' | 'complete';
}

export const MyPageWrap = styled.div`
    width: 840px;
    margin: 0 auto;
`;

export const MyPageSection = styled.div`
    margin-top: 60px;

    & + & {
        margin-top: 80px;
    }
`;

export const SectionHeader = styled.div`
    border-bottom: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
`;

export const HeaderItem = styled.button`
    display: inline-block;
    position: relative;
    width: 140px;
    margin-bottom: -1px;
    padding-bottom: 10px;
    font-size: 16px;
    line-height: 24px;
    color: ${(props) => props.theme.light.DarkGrey2};
    text-align: center;

    &.active {
        border-bottom: ${(props) => '2px solid ' + props.theme.light.DarkGrey2};
    }
`;

export const SectionBox = styled.div`
    margin-top: 20px;
    background-color: ${(props) => props.theme.light.white};
    border-radius: 10px;
`;

export const MyInfoForm = styled.div`
    display: flex;
    align-items: center;
    padding: 40px 40px 27px;
`;

export const FormImage = styled.label`
    position: relative;
    width: 160px;
    height: 160px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
`;

export const MyImage = styled.img`
    object-fit: cover;
`;

export const ModifyButton = styled.span`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 72px;
    height: 24px;
    background-color: ${(props) => props.theme.light.DarkGrey2};
    border-radius: 4px;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.white};
    text-align: center;
`;

export const FormInfo = styled.div`
    flex: 1;
    margin-left: 60px;
`;

export const FormWrap = styled.div`
    display: flex;
    align-items: center;

    & + & {
        margin-top: 30px;
    }
`;

export const FormLabel = styled.div`
    margin-right: 60px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.black};
`;

export const FormInput = styled.div`
    width: 276px;
    height: 42px;
`;

export const MyInfoButtonArea = styled.div`
    padding-bottom: 30px;
    text-align: center;
`;

export const MyArticleButtons = styled.div`
    padding: 24px 24px 0;
`;

export const MyArticleButton = styled.button<ButtonProps>`
    padding: 0;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: ${(props) => (props.active ? props.theme.light.black : props.theme.light.DarkGrey1)};

    & + & {
        &:before {
            content: '';
            display: inline-block;
            vertical-align: middle;
            width: 1px;
            height: 14px;
            margin: 0 8px;
            background-color: ${(props) => props.theme.light.DarkGrey1};
        }
    }
`;

export const MyArticleTableArea = styled.div`
    padding: 18px 24px 80px;

    table {
        width: 100%;

        th {
            font-size: 12px;
            line-height: 18px;
            padding: 6px 0;
            border-bottom: 1px solid ${(props) => props.theme.light.DarkGrey2};
            color: ${(props) => props.theme.light.DarkGrey2};
        }

        td {
            font-size: 14px;
            line-height: 22px;
            padding: 16px 0;
            color: ${(props) => props.theme.light.black};
            text-align: center;
            border-bottom: 1px solid ${(props) => props.theme.light.lightGrey2};
        }
    }

    .count {
        color: ${(props) => props.theme.light.primary};
    }

    .btn_review {
        width: 72px;
    }
`;

export const StatusIcon = styled.span<StatusProps>`
    display: inline-block;
    width: 56px;
    height: 24px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 24px;
    color: ${(props) => props.theme.light.white};
    text-align: center;

    ${(props: StatusProps) =>
        props.status === 'active' &&
        css`
            background-color: ${(props) => props.theme.light.primary};
        `}

    ${(props: StatusProps) =>
        props.status === 'stop' &&
        css`
            background-color: ${(props) => props.theme.light.negative};
        `}

    ${(props: StatusProps) =>
        props.status === 'complete' &&
        css`
            background-color: ${(props) => props.theme.light.positive};
        `}
`;

export const BookmarkList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 24px -20px 0;
`;

export const BookmarkItem = styled.li`
    margin: 0 20px 33px;
`;
