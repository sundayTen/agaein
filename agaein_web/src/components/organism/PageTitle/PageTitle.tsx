import styled from 'styled-components';

const Title = styled.h2`
    margin-top: 60px;
    font-family: Ssurround, sans-serif;
    font-size: 34px;
    line-height: 40px;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.black};
    text-align: center;
`;

const SubTitle = styled.div`
    margin-top: 12px;
    font-family: SsurroundAir, sans-serif;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #505050;
`;

interface PageTitleProps {
    title: string;
    subTitle?: string;
}
const PageTitle = ({ title, subTitle }: PageTitleProps) => {
    return (
        <>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
        </>
    );
};

export default PageTitle;
