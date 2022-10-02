import { useContext, useEffect, useState } from 'react';
import {
    MyPageSection,
    SectionHeader,
    HeaderItem,
    MyInfoForm,
    SectionBox,
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
import { UserContext } from 'contexts/userContext';
import { ModalContext } from 'contexts';
import { User, useUpdateUserMutation, useMeQuery } from 'graphql/generated/generated';
import defaultImage from 'assets/image/notFound.png';

interface Props {
    user?: User;
}

const MyInfo = (props: Props) => {
    const { user } = useContext(UserContext);
    const [myInfo, setMyInfo] = useState<User>(user);
    const [myImageFile, setMyImageFile] = useState<File>();
    const { show, close } = useContext(ModalContext);
    const [modifyInfo] = useUpdateUserMutation();
    const { data, loading, error } = useMeQuery();

    useEffect(() => {
        setMyInfo({
            ...myInfo,
            nickname: data?.me.nickname,
            email: data?.me?.email,
            profileUrl: data?.me?.profileUrl,
        });
    }, [data]);

    const inputChangeHandler = (value: any, name: string) => {
        setMyInfo({
            ...myInfo,
            [name]: value,
        });
    };

    function fileChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0];

        let reader = new FileReader();
        reader.onload = () => {
            const fileURLs = reader.result;
            setMyInfo({
                ...myInfo,
                profileUrl: fileURLs as string,
            });
            setMyImageFile(file);
        };
        reader.readAsDataURL(file);
    }

    const openPopup = () => {
        show({
            title: '알림',
            content: '정보를 수정하시겠습니까?',
            cancelButtonLabel: '취소',
            cancelButtonPressed: close,
            confirmButtonLabel: '수정',
            confirmButtonPressed: modifyMyInfo,
        });
    };

    const modifyMyInfo = () => {
        modifyInfo({
            variables: {
                nickname: myInfo.nickname,
                email: myInfo.email,
                file: myImageFile,
            },
            update: (cache) => {
                try {
                    cache.modify({
                        id: `User:${myInfo.id}`,
                        fields: {
                            nickname: () => myInfo.nickname,
                            email: () => myInfo.email,
                            profileUrl: () => myInfo.profileUrl,
                        },
                    });
                } catch (error) {
                    console.error(`Error occur : ${error}`);
                }
            },
        });

        close();
    };

    return (
        <MyPageSection>
            <SectionHeader>
                <HeaderItem className="active" type="button">
                    내 정보 수정
                </HeaderItem>
            </SectionHeader>
            <SectionBox>
                <MyInfoForm>
                    <FormImage>
                        <input
                            type="file"
                            multiple
                            accept="image/jpg,image/png,image/jpeg,image/gif"
                            className="blind"
                            onChange={(e) => fileChangeHandler(e)}
                        />
                        <MyImage
                            width="100%"
                            height="100%"
                            src={myInfo.profileUrl ? myInfo.profileUrl : defaultImage}
                            alt="내사진"
                        />
                        <ModifyButton>사진 변경</ModifyButton>
                    </FormImage>
                    <FormInfo>
                        <FormWrap>
                            <FormLabel>닉네임</FormLabel>
                            <FormInput>
                                <Input
                                    type="text"
                                    value={myInfo.nickname ? myInfo.nickname : ''}
                                    onChange={(e) => inputChangeHandler(e.target.value, 'nickname')}
                                />
                            </FormInput>
                        </FormWrap>
                        <FormWrap>
                            <FormLabel>이메일</FormLabel>
                            <FormInput>
                                <Input
                                    type="text"
                                    value={myInfo.email ? myInfo.email : ''}
                                    onChange={(e) => inputChangeHandler(e.target.value, 'email')}
                                />
                            </FormInput>
                        </FormWrap>
                    </FormInfo>
                </MyInfoForm>
                <MyInfoButtonArea>
                    <Button label="수정" onClick={openPopup} buttonStyle="PAINTED" />
                </MyInfoButtonArea>
            </SectionBox>
        </MyPageSection>
    );
};

export default MyInfo;
