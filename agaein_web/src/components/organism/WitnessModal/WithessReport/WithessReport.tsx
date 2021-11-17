import { FormPhoto, FormAddress, FormDate, FormEtc } from 'components/organism/Form';
import { FormHp } from 'components/organism/Form/FormHp';
import { RequiredGuide, RequiredIcon } from 'components/pages/createArticle/CreateArticle.style';
import { Location } from 'graphql/generated/generated';
import { FormWrapper } from './WithessReport.style';

interface ReportProps {
    address: Location;
    reportChange: (value: any, name: string) => void;
    filesChange: (value: Array<File>) => void;
}

const WithessReport = ({ address, reportChange, filesChange }: ReportProps) => {
    return (
        <FormWrapper>
            <RequiredGuide style={{ float: 'right' }}>
                <RequiredIcon />는 필수적으로 입력해야 할 정보입니다
            </RequiredGuide>
            <FormPhoto type={'LFG_M'} onChange={filesChange} />
            <FormDate type={'LFG'} name="foundDate" onChange={reportChange} />
            <FormAddress name="location" type={'LFG_M'} onChange={reportChange} address={address} />
            <FormHp name="phoneNumber" onChange={reportChange} />
            <FormEtc name="content" onChange={reportChange} />
        </FormWrapper>
    );
};

export default WithessReport;
