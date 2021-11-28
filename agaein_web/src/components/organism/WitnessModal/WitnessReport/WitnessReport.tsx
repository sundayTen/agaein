import { FormPhoto, FormAddress, FormDate, FormTextarea } from 'components/organism/Form';
import { FormHp } from 'components/organism/Form/FormHp';
import { RequiredGuide, RequiredIcon } from 'components/organism/Form/Form.style';
import { Location } from 'graphql/generated/generated';
import { FormWrapper } from './WitnessReport.style';

interface ReportProps {
    address: Location;
    reportChange: (value: any, name: string) => void;
    filesChange: (value: Array<File>) => void;
}

const WitnessReport = ({ address, reportChange, filesChange }: ReportProps) => {
    return (
        <FormWrapper>
            <RequiredGuide style={{ float: 'right' }}>
                <RequiredIcon />는 필수적으로 입력해야 할 정보입니다
            </RequiredGuide>
            <FormPhoto onChange={filesChange} isReport />
            <FormDate type={'LFG'} name="foundDate" onChange={reportChange} />
            <FormAddress name="location" type={'LFG_M'} onChange={reportChange} address={address} />
            <FormHp name="phoneNumber" onChange={reportChange} />
            <FormTextarea name="content" onChange={reportChange} placeholder="그 외 특징 및 상세 위치를 작성해주세요" />
        </FormWrapper>
    );
};

export default WitnessReport;
