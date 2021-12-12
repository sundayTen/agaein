import { useRef, useState } from 'react';
import { useDeleteArticleMutation, useDeleteCommentMutation } from 'graphql/generated/generated';
import { Input, Button } from '..';
import { InputRefProps } from '../Input/Input';
import { ErrorCheckerContainer, ModalButtonGroup } from './ErrorCheckerInput.style';

interface ErrorCheckerInputProps {
    contentType: 'ARTICLE' | 'COMMENT';
    targetId: string;
    closeModal: () => void;
    confirmButtonLabel: string;
}
const ErrorCheckerInput = (props: ErrorCheckerInputProps) => {
    const { closeModal, contentType, targetId, confirmButtonLabel } = props;
    const [inError, setInError] = useState(false);
    const [deleteComment] = useDeleteCommentMutation({
        onError: (error) => {
            setInError(true);
        },
        onCompleted: closeModal,
        update: (cache) => {
            try {
                cache.modify({
                    id: `Comment:${targetId}`,
                    fields: {
                        content: () => {
                            return '';
                        },
                    },
                });
            } catch (error) {
                console.error('Error at Caching : ', error);
            }
        },
    });
    const [deleteArticle] = useDeleteArticleMutation({
        onError: () => {
            setInError(true);
        },
        onCompleted: closeModal,
        update: (cache) => {
            try {
                const normalizedId = `Article:${targetId}`;
                cache.evict({ id: normalizedId });
                cache.gc();
            } catch (error) {
                console.error(`Error occur : ${error}`);
            }
        },
    });
    const inputRef = useRef<InputRefProps>(null);
    const onPressConfirm = () => {
        const deleteContentVariable = { variables: { id: targetId, password: inputRef.current?.getValue() } };
        contentType === 'ARTICLE' ? deleteArticle(deleteContentVariable) : deleteComment(deleteContentVariable);
    };
    return (
        <ErrorCheckerContainer>
            <Input
                onFocus={() => setInError(false)}
                ref={inputRef}
                type="password"
                maxLength={4}
                ErrorMessage="비밀번호가 틀렸습니다"
                isError={inError}
            />
            <ModalButtonGroup>
                <Button buttonStyle="BLACK" size="MEDIUM" label="취소" onClick={closeModal} />
                <Button buttonStyle="PAINTED" size="MEDIUM" label={confirmButtonLabel} onClick={onPressConfirm} />
            </ModalButtonGroup>
        </ErrorCheckerContainer>
    );
};

export default ErrorCheckerInput;
