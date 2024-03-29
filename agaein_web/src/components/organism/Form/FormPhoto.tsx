//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { FormLabel, RequiredIcon } from './Form.style';
import styled from 'styled-components';
import { CloudUploadIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/solid';

const FormRow = styled.div`
    margin-top: 30px;
`;

const FormGuide = styled.p`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: #505050;
`;

const Form = styled.div`
    display: flex;
    margin-top: 20px;
`;

const PhotoLabel = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 120px;
    height: 120px;
    border: 1px dashed ${(props) => props.theme.light.DarkGrey1};
    border-radius: 4px;
    cursor: pointer;
    color: ${(props) => props.theme.light.DarkGrey1};

    &:hover {
        border: 1px solid ${(props) => props.theme.light.primary};
        color: ${(props) => props.theme.light.primary};
    }
`;

const PhotoIcon = styled.span`
    width: 32px;
    height: 32px;
`;

const PhotoText = styled.span`
    font-size: 14px;
`;

const PhotoList = styled.div`
    display: flex;
    margin-left: 20px;
`;

const PhotoItem = styled.div`
    position: relative;
    width: 120px;
    height: 120px;

    & + & {
        margin-left: 20px;
    }
`;

const PhotoWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;

    img {
        min-width: 100%;
    }
`;

const CloseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -7px;
    right: -7px;
    width: 20px;
    height: 20px;
    padding: 0;
    border-radius: 50%;
    background-color: ${(props) => props.theme.light.black};
    box-shadow: 0px 2px 2px rgba(51, 51, 51, 0.4);
    color: ${(props) => props.theme.light.white};

    svg {
        width: 12px;
    }
`;

interface FormPhotoProps {
    onChange: (value: any) => void;
    required?: boolean;
    isReport?: boolean;
}

export function FormPhoto({ onChange, required = false, isReport = false }: FormPhotoProps) {
    const [photoList, setPhotoList] = useState([]);
    const [previewList, setPreviewList] = useState([]);

    useEffect(() => {
        onChange(photoList);
    });

    function uploadImage(e) {
        e.stopPropagation();
        const fileArray = e.target.files;

        if (fileArray.length > 5 || previewList.length + fileArray.length > 5) {
            alert('사진은 최대 5장 등록 가능합니다.');
            return;
        }

        for (let i = 0; i < fileArray.length; i++) {
            const file = fileArray[i];
            let reader = new FileReader();
            let fileURLs = [];
            reader.onload = () => {
                fileURLs[i] = reader.result;
                setPreviewList((previewList) => [...previewList, fileURLs[i]]);
                setPhotoList((photoList) => [...photoList, file]);
            };
            reader.readAsDataURL(file);
        }
    }

    function removeImage(removeIndex) {
        setPreviewList(previewList.filter((value, index) => index !== removeIndex));
    }

    return (
        <FormRow>
            <FormLabel>
                사진 등록
                {required && <RequiredIcon />}
            </FormLabel>
            {!isReport && (
                <FormGuide>사진은 최대 5장 등록할 수 있고, 첫번째 사진이 대표 이미지로 등록됩니다.</FormGuide>
            )}
            <Form>
                <PhotoLabel>
                    <input
                        type="file"
                        multiple
                        accept="image/jpg,image/png,image/jpeg,image/gif"
                        className="blind"
                        onChange={(e) => uploadImage(e)}
                    />
                    <PhotoIcon>
                        <CloudUploadIcon />
                    </PhotoIcon>
                    <PhotoText>사진 업로드</PhotoText>
                </PhotoLabel>
                <PhotoList>
                    {previewList.map((photoURL, index) => (
                        <PhotoItem key={index}>
                            <PhotoWrap>
                                <img src={photoURL} alt="실종동물" />
                            </PhotoWrap>
                            <CloseButton onClick={() => removeImage(index)}>
                                <span className="blind">사진 삭제</span>
                                <XIcon />
                            </CloseButton>
                        </PhotoItem>
                    ))}
                </PhotoList>
            </Form>
        </FormRow>
    );
}
