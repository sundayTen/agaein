import React from 'react';
import { FormLabel } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Input from 'components/molecules/Input';

const FormRow = styled.div`
    margin-top: 20px;
`;

const Form = styled.div`
    margin-top: 12px;
`;

const PhotoLabel = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 140px;
    height: 160px;
    border: ${(props) => '1px solid ' + props.theme.light.DarkGrey1};
    border-radius: 10px;
    cursor: pointer;
`;

const PhotoIcon = styled.span`
    font-size: 25px;
    color: ${(props) => props.theme.light.DarkGrey1};
`;

const PhotoText = styled.span`
    font-size: 14px;
    color: ${(props) => props.theme.light.DarkGrey1};
`;

const PhotoGuide = styled.p`
    margin-top: 12px;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: #5f6871;
`;

interface FormPhotoProps {}

export function FormPhoto(props: FormPhotoProps) {
    return (
        <FormRow>
            <FormLabel>반려동물 사진*</FormLabel>
            <Form>
                <PhotoLabel>
                    <input type="file" className="blind" />
                    {/* TODO: 아이콘으로 변경 */}
                    <PhotoIcon>+</PhotoIcon>
                    <PhotoText>이미지 추가</PhotoText>
                </PhotoLabel>
                <PhotoGuide>
                    <b>파일 형식</b> jpeg 또는 png 확장자의 이미지를 5mb 이하의 크기로 업로드해주세요.
                </PhotoGuide>
            </Form>
        </FormRow>
    );
}
