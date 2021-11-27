import { useState, useMemo } from 'react';
import { ArticleDetailInput, File, Board_Type } from 'graphql/generated/generated';
import PageTitle from 'components/organism/PageTitle/PageTitle';
import { FormPhoto, FormInput, FormTextarea, FormWrapper } from 'components/organism/Form';
import { ButtonWrapper } from 'components/pages/createArticle/CreateArticle.style';
import Button from 'components/molecules/Button';
import Modal from 'components/molecules/Modal';
import { RouteComponentProps } from 'react-router-dom';
import useArticle from 'graphql/hooks/useArticle';

// TODO: 게시글 id 를 가져와서 작성할 지 논의
const Review = ({ history, match }: RouteComponentProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [currentReview, setCurrentReview] = useState<ArticleDetailInput>({});
    const { createArticle } = useArticle();
    const boardType = Board_Type.Review;
    const [isOpenModal, setIsOpenModal] = useState(false);

    const inputChangeHandler = (value: string, name: string) => {
        setCurrentReview({
            ...currentReview,
            [name]: value,
        });
    };

    const inputFilesHandler = (value: any) => {
        setFiles(value);
    };

    const isInvalid = useMemo<boolean>(() => {
        return !currentReview.title || !currentReview.content;
    }, [currentReview]);

    const onPressButton = async () => {
        createArticle({
            boardType,
            files,
            articleDetail: currentReview,
        }).then(() => setIsOpenModal(true));
    };

    const goHome = () => {
        history.push('/');
    };

    return (
        <>
            <PageTitle title="후기 작성하기" subTitle="감사의 마음을 담은 따뜻한 후기를 남겨주세요" />
            <FormWrapper formTitle={'후기 작성'}>
                <FormPhoto onChange={inputFilesHandler} />
                <FormInput
                    name="title"
                    onChange={inputChangeHandler}
                    label="제목"
                    placeholder="제목을 입력해주세요"
                    required={true}
                />
                <FormTextarea
                    name="content"
                    onChange={inputChangeHandler}
                    placeholder="내용을 입력해주세요"
                    required={true}
                />
            </FormWrapper>
            <ButtonWrapper>
                <Button label="다음으로" buttonStyle="PAINTED" onClick={onPressButton} disabled={isInvalid} />
            </ButtonWrapper>
            {/* TODO: 후기 등록 완료 팝업 내용 논의 */}
            <Modal
                open={isOpenModal}
                close={() => setIsOpenModal(false)}
                title="후기 등록 완료"
                btnName="확인"
                onBtn={goHome}
            >
                <>후기 등록이 완료되었습니다 👏🏻</>
            </Modal>
        </>
    );
};

export default Review;
