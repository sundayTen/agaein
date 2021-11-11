import { useState, useRef, KeyboardEvent } from 'react';
import { FormRow, FormLabel } from '../../pages/createArticle/CreateArticle.style';
import Input from 'components/molecules/Input';
import Button from 'components/molecules/Button';
import { XIcon } from '@heroicons/react/solid';
import styled from 'styled-components';

const KeywordForm = styled.div`
    label {
        display: inline-block;
        margin-right: 8px;
        width: 272px;
    }
`;

const KeywordList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
`;

const KeywordItem = styled.span`
    padding: 7px 20px;
    margin: 0 8px 8px 0;
    border-radius: 18px;
    background-color: ${(props) => props.theme.light.lightGrey1};
    font-size: 14px;
    line-height: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.light.DarkGrey2};
`;

const DeleteButton = styled.button`
    vertical-align: -3px;
    margin-left: 16px;
    padding: 0;

    svg {
        width: 15px;
        color: ${(props) => props.theme.light.primary};
    }
`;

interface FormKeywordProps {
    name: string;
    keywordInfo: string;
    onChange: (value: any, name: string) => void;
}

interface KeywordType {
    id: number;
    value: string;
}

export function FormKeyword({ name, onChange }: FormKeywordProps) {
    const [keyword, setKeyword] = useState('');
    const [keywordList, setKeywordList] = useState<KeywordType[]>([]);

    const inputChangeHandler = (value: string) => {
        setKeyword(value);
    };

    const nextId = useRef(1);

    const addKeyword = () => {
        const currentKeyword = {
            id: nextId.current,
            value: keyword,
        };
        setKeywordList(keywordList.concat(currentKeyword));
        setKeyword('');
        onChange?.(keywordList, name);
        nextId.current += 1;
    };

    const handleKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
        const isVaildKey = e.key === 'Enter';
        if (!isVaildKey) return;
        addKeyword();
    };

    const deleteKeyword = (id: any) => {
        setKeywordList(keywordList.filter((keywordList) => keywordList.id !== id));
    };

    return (
        <FormRow>
            <FormLabel>키워드</FormLabel>
            <div>
                <KeywordForm>
                    <Input
                        type="text"
                        value={keyword}
                        onKeyPress={handleKeypress}
                        onChange={(e) => inputChangeHandler(e.target.value)}
                    />
                    <Button label="추가" size="MEDIUM" buttonStyle="BLACK" onClick={addKeyword} />
                </KeywordForm>
                <KeywordList>
                    {keywordList.map((keyword) => {
                        return (
                            <KeywordItem key={keyword.id}>
                                {keyword.value}
                                <DeleteButton type="button" onClick={() => deleteKeyword(keyword.id)}>
                                    <XIcon />
                                </DeleteButton>
                            </KeywordItem>
                        );
                    })}
                </KeywordList>
            </div>
        </FormRow>
    );
}
