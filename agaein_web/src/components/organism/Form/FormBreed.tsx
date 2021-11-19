//@ts-nocheck

import { useState } from 'react';
import { FormRow, FormLabel, Form, RequiredIcon } from '../../pages/createArticle/CreateArticle.style';
import { useGetBreedsQuery } from 'graphql/generated/generated';
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

const animalOptions = [
    {
        id: 'DOG',
        name: '개',
    },
    {
        id: 'CAT',
        name: '고양이',
    },
    {
        id: 'ECT',
        name: '기타',
    },
];

export function FormBreed({ name, onChange }: FormBreedProps) {
    const [animal, setAnimal] = useState({
        id: 'DOG',
        name: '개',
    });
    const [breed, setBreed] = useState({
        id: 0,
        name: '선택해주세요',
    });

    const { data, loading, error } = useGetBreedsQuery({
        variables: {
            type: animal.id,
        },
    });

    const breedOptions = data?.breeds;

    const SelectHandler = (id) => {
        const animalName = animalOptions.filter((option) => option.id === id)[0].name;

        setAnimal((prevState) => ({
            ...prevState,
            id: id,
            name: animalName,
        }));

        setBreed((prevState) => ({
            ...prevState,
            id: 0,
            name: '선택해주세요',
        }));
    };

    const setBreedId = (id) => {
        const breedName = breedOptions.filter((option) => option.id === id)[0].breed;

        setBreed((prevState) => ({
            ...prevState,
            id: id,
            name: breedName,
        }));

        onChange(id, name);
    };

    return (
        <FormRow>
            <FormLabel>
                품종
                <RequiredIcon />
            </FormLabel>
            <Form>
                <SelectWrapper>
                    <Select name="animal" defaultValue={animal.name} onChange={SelectHandler} options={animalOptions} />
                </SelectWrapper>
                <SelectWrapper>
                    <Select name="breed" defaultValue={breed.name} onChange={setBreedId} options={breedOptions} />
                </SelectWrapper>
            </Form>
        </FormRow>
    );
}
