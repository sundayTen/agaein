import { ModalContext } from 'contexts';
import { useContactUsMutation } from 'graphql/generated/generated';
import  { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button';
import { ModalButtonGroup } from '../PortalModal/Modal.style';

const CustomerServiceContents = () => {
    const { close, update } = useContext(ModalContext);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [문의하기] =useContactUsMutation()

    const isContactButtonDisable = useMemo(() => title.length === 0 || description.length === 0, [title, description])

    const onClickSubmit = async () => { 
        try {
            await 문의하기({
                variables: {
                    subject: title,
                    content: description,
                    sender: email
                },
                onCompleted: () => {
                    update({
                        title:"문의 접수 완료",
                        content:"접수가 완료되었습니다.",
                        children: <></>
                    })
                },
                onError: (error)=> {
                    update({
                        title:"문의 접수 실패",
                        content:`뭔가 문제가 발생했습니다, ${error}`,
                        children: <></>
                    })
                }
            })



            
        } catch (error) {
            
        }
        
        
     }

    
  return (
    <Container>
        <Title
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            placeholder='제목을 입력해주세요'
            type={"text"}
        />
        <Description
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            placeholder='문의내용을 입력해주세요'
        />

        <Email
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder='회신받으실 이메일을 입력해주세요'
            type="email"
        />

        <ModalButtonGroup>
            <Button
                buttonStyle="BLACK"
                size="MEDIUM"
                label={"취소"}
                onClick={
                    close
                }
            />
            <Button
                buttonStyle="PAINTED"
                size="MEDIUM"
                label={"문의하기"}
                onClick={onClickSubmit}
                type="submit"
                disabled={isContactButtonDisable}
            />
        </ModalButtonGroup>
    </Container>
  )
}

export default CustomerServiceContents

const Container = styled.form`
    display: flex;
    flex-direction: column;
`

const Title = styled.input`
    border:none;
    margin-top: 10px;
    caret-color: ${props => props.theme.light.primary};

    :focus {
        outline: none;
    }
`

const Description = styled.textarea`
    border:none;
    margin-top: 10px;
    caret-color: ${props => props.theme.light.primary};
    :focus {
        outline: none;
    }
`

const Email = styled.input`
    border:none;
    margin-top: 10px;
    caret-color: ${props => props.theme.light.primary};
    :focus {
        outline: none;
    }
`