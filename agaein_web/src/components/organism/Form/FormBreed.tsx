//@ts-nocheck

import { ChevronDownIcon } from '@heroicons/react/solid';
import Select from 'components/molecules/Select';
import { SelectIcon, StyledSelect } from 'components/molecules/Select/Select.style';
import { useGetBreedsQuery } from 'graphql/generated/generated';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, FormLabel, FormRow, RequiredIcon } from './Form.style';

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
export function FormBreed({ name, onChange }: FormBreedProps) {
    const [animal, setAnimal] = useState({
        id: 'DOG',
        name: '개',
    });
    const [breed, setBreed] = useState({
        id: 0,
        name: '선택해주세요',
    });
    const [animalSelected, setAnimalSelected] = useState(false);
    const [breedSelected, setBreedSelected] = useState(false);

    const { data, loading, error } = useGetBreedsQuery({
        variables: {
            type: animal.id,
        },
    });

    const SelectHandler = (id, name) => {
        setAnimal({
            id: id,
            name: name,
        });
        setBreed({
            id: 0,
            name: '선택해주세요',
        });
    };

    const setBreedId = (id, name) => {
        setBreed({
            id: id,
            name: name,
        });
    };

    useEffect(() => {
        onChange(breed.id, name);
    }, [breed]);

    const animalOptions = [
        {
            id: 'DOG',
            name: '개',
            onClick: SelectHandler,
        },
        {
            id: 'CAT',
            name: '고양이',
            onClick: SelectHandler,
        },
        {
            id: 'ECT',
            name: '기타',
            onClick: SelectHandler,
        },
    ];
    const breedOptions = data?.breeds.map((item) => {
        return { id: item.id, name: item.breed, onClick: setBreedId };
    });
    return (
        <FormRow>
            <FormLabel>
                품종
                <RequiredIcon />
            </FormLabel>
            <Form>
                <SelectWrapper>
                    <Select
                        name="animal"
                        defaultValue={animal.name}
                        options={animalOptions}
                        optionsMinWidth="220px"
                        optionsAbsoluteTop="46px"
                    >
                        <StyledSelect
                            selected={animalSelected}
                            onClick={() => (animalSelected ? setAnimalSelected(false) : setAnimalSelected(true))}
                        >
                            {animal.name}
                            <SelectIcon selected={animalSelected}>
                                <ChevronDownIcon />
                            </SelectIcon>
                        </StyledSelect>
                    </Select>
                </SelectWrapper>
                <SelectWrapper>
                    <Select
                        name="breed"
                        defaultValue={breed.name}
                        options={breedOptions}
                        optionsMinWidth="220px"
                        optionsAbsoluteTop="46px"
                    >
                        <StyledSelect
                            selected={breedSelected}
                            onClick={() => (breedSelected ? setBreedSelected(false) : setBreedSelected(true))}
                        >
                            {breed.name}
                            <SelectIcon selected={breedSelected}>
                                <ChevronDownIcon />
                            </SelectIcon>
                        </StyledSelect>
                    </Select>
                </SelectWrapper>
            </Form>
        </FormRow>
    );
}
