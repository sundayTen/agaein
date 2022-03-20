import {
    MyInfoForm,
    MyInfoButtonArea,
    FormImage,
    FormInfo,
    MyImage,
    ModifyButton,
    FormWrap,
    FormLabel,
    FormInput,
} from 'components/pages/myPage/MyPage.style';
import { Input, Button } from 'components/molecules';

const MyInfo = () => {
    return (
        <>
            <MyInfoForm>
                <FormImage>
                    <MyImage width="100%" height="100%" src="https://picsum.photos/160/160" alt="내사진" />
                    <ModifyButton type="button">사진 변경</ModifyButton>
                </FormImage>
                <FormInfo>
                    <FormWrap>
                        <FormLabel>닉네임</FormLabel>
                        <FormInput>
                            <Input type="text" />
                        </FormInput>
                    </FormWrap>
                    <FormWrap>
                        <FormLabel>이메일</FormLabel>
                        <FormInput>
                            <Input type="text" />
                        </FormInput>
                    </FormWrap>
                </FormInfo>
            </MyInfoForm>
            <MyInfoButtonArea>
                <Button label="수정" onClick={() => {}} buttonStyle="PAINTED"></Button>
            </MyInfoButtonArea>
        </>
    );
};

export default MyInfo;
