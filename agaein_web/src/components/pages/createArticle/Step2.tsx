import { Title, FormWrapper, Fieldset, FieldsetTitle, ButtonWrapper, BackButton } from './CreateArticle.style';
import {
    FormName,
    FormPhone,
    FormPhoto,
    FormAddress,
    FormDate,
    FormBreed,
    FormAge,
    FormGender,
    FormEtc,
} from 'components/organism/createArticle';
import Button from 'components/molecules/Button';
import StepIndicator from 'components/molecules/StepIndicator';
import { CreateArticleStep2Params } from 'router/params';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useCreateArticleMutation } from 'graphql/generated/generated';

//TODO: 찾는 글, 발견한 글 분기 처리
const Step2 = ({ history, match }: RouteComponentProps<CreateArticleStep2Params>) => {
    const [create] = useCreateArticleMutation();
    const onPressButton = async () => {
        const response = await create({
            variables: {
                boardType: match.params.type,
                title: 'Create Test In Web',
                content: 'Content',
                articleDetail: {
                    breedId: '4',
                    feature: '머리가 커요',
                    gender: '중성',
                    name: 'HJ',
                    gratuity: 1000,
                    lostDate: new Date(),
                    foundDate: new Date(),
                },
            },
        });
        // TODO : Error 처리 (터지지 않도록 유도)
        if (!!response.errors) {
            console.log(response.errors[0].message);
        }
        // TODO : 완료 로직
        console.log(response.data?.createArticle);
        history.push('/createArticle/step3');
    };

    return (
        <>
            <StepIndicator active={2} styles={{ marginTop: 100 }} />
            <Title>상세하게 작성할수록 발견될 확률이 높아져요!</Title>
            <FormWrapper>
                <Fieldset>
                    <FieldsetTitle>나의 정보</FieldsetTitle>
                    <FormName />
                    <FormPhone />
                </Fieldset>
                <Fieldset>
                    <FieldsetTitle>
                        실종동물 정보
                        <span>*는 필수적으로 입력해야 할 정보입니다</span>
                    </FieldsetTitle>
                    <FormPhoto />
                    <FormAddress />
                    <FormDate />
                    <FormName />
                    <FormBreed />
                    <FormAge />
                    <FormGender />
                    <FormEtc />
                </Fieldset>
            </FormWrapper>
            <ButtonWrapper>
                <BackButton>
                    <Link to="/createArticle/step1">
                        <span className="blind">이전</span>
                        {/* TODO: 아이콘으로 변경 */}
                        &lt;
                    </Link>
                </BackButton>
                <Button label="등록" onClick={onPressButton} />
            </ButtonWrapper>
        </>
    );
};

export default Step2;
