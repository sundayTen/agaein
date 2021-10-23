//@ts-nocheck

import React, { useState } from 'react';
import { FormRow, FormLabel, Form, RequiredIcon } from '../../pages/createArticle/CreateArticle.style';
import styled from 'styled-components';
import Select from 'components/molecules/Select';

const SelectWrapper = styled.div`
    display: inline-block;
    position: relative;

    & + & {
        margin-left: 16px;
    }
`;

interface FormBreedProps {
    name: string;
    value?: string;
    onChange?: (value: string, name: string) => void;
}

//TODO: options 서버에서 받아오기, 동물 종류 입력하면 품종 옵션 다시 받아오기
const tempAnimalOptions = ['개', '고양이', '기타'];
const tempBreedOptions = ['골든리트리버', '그레이 하운드', '그레이트 덴', '그레이트 피레니즈', '기타'];

export function FormBreed({ name, value, onChange }: FormBreedProps) {
    const [animalType, setAnimalType] = useState({
        animal: '개',
        breed: '골든리트리버',
    });

    function selectHandler(name, value) {
        setAnimalType({
            ...animalType,
            [name]: value,
        });
    }

    return (
        <FormRow>
            <FormLabel>
                동물 종류
                <RequiredIcon />
            </FormLabel>
            <Form>
                <SelectWrapper>
                    <Select
                        name="animal"
                        defaultValue={animalType.animal}
                        onChange={selectHandler}
                        options={tempAnimalOptions}
                    />
                </SelectWrapper>
                <SelectWrapper>
                    <Select
                        name="breed"
                        defaultValue={animalType.breed}
                        onChange={selectHandler}
                        options={tempBreedOptions}
                    />
                </SelectWrapper>
            </Form>
        </FormRow>
    );
}
