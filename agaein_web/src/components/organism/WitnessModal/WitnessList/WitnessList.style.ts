import { CameraIcon, ChevronUpIcon, PhoneIcon, ChevronDownIcon } from '@heroicons/react/outline';
import styled from 'styled-components';
import { ReactComponent as Usual } from './Img/Usual.svg';
import { ReactComponent as Click } from './Img/Click.svg';
import { ReactComponent as TestImg } from './Img/test.svg';

interface StyledWitnessProps {
    click: boolean;
}

interface StyledPhotoProps {
    isimg: boolean;
}

interface StyledPhoneProps {
    ishp: boolean;
}

export const WitnessListTable = styled.table`
    margin-top: 20px;
    width: 580px;
`;

export const Header = styled.tr`
    height: 28px;
    color: #505050;
    border-bottom: 1px solid #505050;
    td {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 18px;
    }
`;

export const Witness = styled.tr`
    height: 45px;
    color: ${(props) => props.theme.light.black};
    border-bottom: 1px solid ${(props) => props.theme.light.lightGrey2};
    td {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 18px;
    }
`;

export const WitnessDetail = styled.tr<StyledWitnessProps>`
    display: ${(props) => (props.click ? `` : `none`)};
    height: 120px;
    color: ${(props) => props.theme.light.black};
    border-bottom: 1px solid ${(props) => props.theme.light.lightGrey2};
    td {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 18px;
    }
    background: #f6f6f6;
`;

export const UsualIcon = styled(Usual)`
    margin: 0 5px;
`;

export const ClickIcon = styled(Click)`
    margin: 0 5px;
`;

export const Img = styled.img`
    margin: 3px 10px;
    vertical-align: middle;
`;

export const Contents = styled.div`
    margin: 15px 10px;
    vertical-align: middle;
`;

export const Photo = styled(CameraIcon)<StyledPhotoProps>`
    width: 25px;
    height: 25px;
    color: ${(props) => (props.isimg ? props.theme.light.primary : props.theme.light.primary100)};
    margin-right: 5px;
    vertical-align: middle;
`;

export const SmallPhoto = styled(CameraIcon)<StyledPhotoProps>`
    width: 18px;
    height: 18px;
    color: ${(props) => (props.isimg ? props.theme.light.primary : props.theme.light.primary100)};
    margin-right: 5px;
    margin-bottom: 4px;
    vertical-align: middle;
`;

export const Phone = styled(PhoneIcon)<StyledPhoneProps>`
    width: 25px;
    height: 25px;
    color: ${(props) => (props.ishp ? props.theme.light.primary : props.theme.light.primary100)};
    margin-right: 20px;
    vertical-align: middle;
`;

export const ChevronUp = styled(ChevronUpIcon)`
    width: 25px;
    height: 25px;
    vertical-align: middle;
    font-weight: lighter;
    color: #505050;
`;
export const ChevronDown = styled(ChevronDownIcon)`
    width: 25px;
    height: 25px;
    vertical-align: middle;
`;

export const HpSpan = styled.span`
    margin-right: 10px;
`;

export const NullWitness = styled.div`
    text-align: center;
    width: 580px;
    line-height: 30px;
    margin-top: 35px;
`;

export const NullWitnessSpan = styled.span`
    vertical-align: middle;
    font-size: 14px;
    line-height: 22px;
`;
export const ReportLink = styled.a`
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.02em;
    text-decoration-line: underline;
    vertical-align: middle;
`;
