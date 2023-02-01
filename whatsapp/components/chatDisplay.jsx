import styled from "styled-components";


export default (props) => {
    const { conversetion, googleLogin } = props;


    return (
        <DivStyled>
            {conversetion.map((email, index) => {
                return (
                    <PostStyled key={index}>
                        <A>
                        {email.emailOne === googleLogin.user.email ? <FromStyled>{email.text} </FromStyled> : null}
                        </A>
                        <B>
                        {email.emailTwo === googleLogin.user.email ? <ToStyled>{email.text} </ToStyled> : null}
                        </B>
                    </PostStyled>
                )
            })}
        </DivStyled>
    );
}

const DivStyled = styled.div
    `
    margin: 0% 0% 0% 40%;
    padding: 0% 0% 0% 24%;
`

const PostStyled = styled.div
    `
    justify-content: space-between;
`

const ToStyled = styled.div
    `
background-color: rgb(0 271 38 / 60%);
border-radius: 10%;
margin: 1% 0% 1% -0%;
padding: 1% 0% 1% 0%;
`

const FromStyled = styled.div
    `
background-color: silver;
border-radius: 10%;
`

const A = styled.div
    `
margin: 0% 0% 0% -20%;
    padding: 0% 0% 0% 0%;
`

const B = styled.div
    `
margin: 0% 0% 0% 0%;
    padding: 0% 0% 0% 0%;
`

const C = styled.div
    `
margin: 0% 0% 0% 0%;
    padding: 0% 0% 0% 0%;
`