//@ts-nocheck
import { FormPhoto, FormAddress, FormDate, FormEtc } from 'components/organism/Form';
import { FormHp } from 'components/organism/Form/FormHp';
import { RequiredGuide, RequiredIcon } from 'components/pages/createArticle/CreateArticle.style';
import React, { useState } from 'react';
import { FormWrapper } from './WithessReport.style';

interface ReportProps {
    address: { lat: number; lng: number; address: string; roadAddress: string };
}

const WithessReport = ({ address }: ReportProps) => {
    const [files, setFiles] = useState<[]>();
    const [reportDetail, setReportDetail] = useState({
        feature: '',
        location: {
            lat: '',
            lng: '',
            address: '',
            detail: '',
        },
        foundDate: '',
    });
    const PhotoChange = (value: any) => {
        setFiles(value);
    };

    const inputChange = (value: any, name: string) => {
        setReportDetail((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <FormWrapper>
            <RequiredGuide style={{ float: 'right' }}>
                <RequiredIcon />는 필수적으로 입력해야 할 정보입니다
            </RequiredGuide>
            <FormPhoto type={'LFG_M'} onChange={PhotoChange} />
            <FormDate type={'LFG'} name="foundDate" onChange={inputChange} />
            <FormAddress name="location" type={'LFG_M'} onChange={inputChange} address={address} />
            <FormHp name="hp" />
            <FormEtc name="feature" value={reportDetail.feature} onChange={inputChange} />
        </FormWrapper>
    );
};

export default WithessReport;
