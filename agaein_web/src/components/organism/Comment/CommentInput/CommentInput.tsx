import { forwardRef, Fragment, InputHTMLAttributes, useCallback, useContext, useEffect, useState } from 'react';
import { RequiredGuide, RequiredIcon } from 'components/organism/Form/Form.style';
import { Textarea } from 'components/molecules';
import { UserContext } from 'contexts/userContext';
import { ReplyIcon } from '../CommentItem/CommentItem.style';
import {
    CommentInputContainer,
    CommentInputWrapper,
    CommentPwd,
    CommentPwdContainer,
    CommentToolContainer,
    SubmitButton,
} from './CommentInput.style';

export interface CommentInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    content?: string;
    onPressSubmit: (content: string, password?: string) => void;
}

const CommentInput = forwardRef<HTMLTextAreaElement, CommentInputProps>((props, ref) => {
    const { content = null, onPressSubmit, ...TextAreaProps } = props;
    const { isLoggedIn } = useContext(UserContext);
    const [commentInput, setCommentInput] = useState<string | undefined>('');
    const [password, setPassword] = useState<string | undefined>(undefined);

    useEffect(() => {
        setCommentInput(content ?? '');
    }, [content]);

    const onClickSubmitButton = () => {
        if (commentInput === undefined || (!isLoggedIn && password === undefined)) return;
        onPressSubmit(commentInput, password);
        resetCommentInput();
    };
    const resetCommentInput = () => {
        setCommentInput(undefined);
        setPassword(undefined);
    };
    const isCommentInput = useCallback(() => {
        return commentInput === undefined || commentInput === '';
    }, [commentInput]);

    const isPassword = useCallback(() => {
        return !isLoggedIn && (password === undefined || password.length < 4);
    }, [isLoggedIn, password]);

    const submitDisabled = useCallback(() => {
        return isCommentInput() || isPassword();
    }, [isCommentInput, isPassword]);

    return (
        <CommentInputWrapper>
            <Fragment>
                <CommentInputContainer>
                    <Textarea
                        {...TextAreaProps}
                        ref={ref}
                        value={commentInput ?? ''}
                        style={{ padding: '14px 114px 14px 14px' }}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="?????? ?????? ?????? ????????? ???????????? ??????????????? :)"
                    />
                    <SubmitButton onClick={onClickSubmitButton} disabled={submitDisabled()}>
                        ??????
                    </SubmitButton>
                </CommentInputContainer>
                <CommentToolContainer>
                    {!isLoggedIn && (
                        <CommentPwdContainer>
                            <CommentPwd
                                type="password"
                                maxLength={4}
                                value={password ?? ''}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="????????????"
                            />
                            <RequiredGuide>
                                <RequiredIcon />
                                ???????????? ?????? ?????? ??????, ??????, ????????? ??????????????? ???????????????.
                            </RequiredGuide>
                        </CommentPwdContainer>
                    )}
                </CommentToolContainer>
            </Fragment>
        </CommentInputWrapper>
    );
});

export default CommentInput;
