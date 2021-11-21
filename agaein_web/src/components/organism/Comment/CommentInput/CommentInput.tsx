import { Textarea } from 'components/molecules';
import { RequiredGuide, RequiredIcon } from 'components/organism/Form/Form.style';
import { UserContext } from 'contexts/userContext';
import React, { forwardRef, Fragment, InputHTMLAttributes, useCallback, useContext, useState } from 'react';
import {
    CommentInputContainer,
    CommentPwd,
    CommentPwdContainer,
    CommentToolContainer,
    SubmitButton,
} from './CommentInput.style';

export interface CommentInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    commentId?: string;
    onPressSubmit: (content: string, password?: string) => void;
}

const CommentInput = forwardRef<HTMLTextAreaElement, CommentInputProps>((props, ref) => {
    const { commentId, onPressSubmit, ...TextAreaProps } = props;
    const { isLoggedIn } = useContext(UserContext);
    const [commentInput, setCommentInput] = useState<string | undefined>('');
    const [password, setPassword] = useState<string | undefined>(undefined);

    // TODO : 비밀번호 규칙을 정해서 적용해야함.
    const onChangePwd = (pwd: string) => {
        if (pwd.length <= 4) {
            setPassword(pwd);
        }
    };
    const onClickSubmitButton = () => {
        if (commentInput === undefined || (!isLoggedIn && password === undefined)) return;
        onPressSubmit(commentInput, password);
        resetCommentInput();
    };
    const resetCommentInput = () => {
        setCommentInput(undefined);
        setPassword(undefined);
    };

    const submitDisabled = useCallback(() => {
        return !commentInput || (!isLoggedIn && typeof password === 'string' && password.length !== 4);
    }, [commentInput, isLoggedIn]);

    return (
        <Fragment>
            <CommentInputContainer>
                <Textarea
                    {...TextAreaProps}
                    ref={ref}
                    value={commentInput ?? ''}
                    style={{ padding: '14px 114px 14px 14px' }}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="발견 정보 또는 응원의 메세지를 남겨주세요 :)"
                />
                <SubmitButton onClick={onClickSubmitButton} disabled={submitDisabled()}>
                    등록
                </SubmitButton>
            </CommentInputContainer>
            <CommentToolContainer>
                {!isLoggedIn && (
                    <CommentPwdContainer>
                        <CommentPwd
                            type="password"
                            value={password ?? ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                onChangePwd(e.target.value);
                            }}
                            placeholder="비밀번호"
                        />
                        <RequiredGuide>
                            <RequiredIcon />
                            비회원의 경우 댓글 등록, 수정, 삭제에 비밀번호가 필요합니다.
                        </RequiredGuide>
                    </CommentPwdContainer>
                )}
            </CommentToolContainer>
        </Fragment>
    );
});

export default CommentInput;
