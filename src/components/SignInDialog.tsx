import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import { useAppSelector, useAppDispatch } from '../hooks';
import TransitionsSnackbar from './AlertMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "@mui/material/Button";
import axios from 'axios'
import { setSignUp, setSignIn, setSignedUp } from '../stores/UserStore'
import { Alert, AlertTitle, OutlinedInput } from '@mui/material';
import { Warning } from '@mui/icons-material';
import { css, keyframes } from 'styled-components';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Wrapper = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #222639;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 5px #0000006f;
`

const Title = styled.h3`
  margin: 5px;
  text-align: center;
  font-size: 24px;
  color: #eee;
`
const Content = styled.div`
  display: flex;
  margin: 36px 0;

`

function SignedUpToast () {
  return (
    <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
  )
}


export default function SignInDialog() {

  const signedUp = useAppSelector((state) => state.user.signedUp);

console.log(signedUp);

const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [pwFieldEmpty, setPwFieldEmpty] = useState<boolean>(false)
  
  const [userIdFieldEmpty, setUserIdFieldEmpty] = useState<boolean>(false)
  const [userIdFieldWrong, setUserIdFieldWrong] = useState<boolean>(false)
 
  

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setUserIdFieldEmpty(false);
    setUserIdFieldWrong(false);
    setPwFieldEmpty(false);

    console.log(userId);
    console.log(userIdFieldEmpty);
      if (userId === '') {
        setUserIdFieldEmpty(true)
      } 
      if (password === '') {
        setPwFieldEmpty(true)
      }
      else  {
        



  let body = {
          userId: userId,
          password: password,
  }

  console.log({userId})
  console.log({password})


    axios.post("/auth/login", body).then(function (response) {
       // response  
       
       if(response.data.status == 200){
         dispatch(setSignIn(false));

                    
                } else {
                    console.log('11111');
            
      }

  }).catch(function (error) {
      // 오류발생시 실행
      setUserIdFieldWrong(true);
      console.log("hi",error.message);
      if(error.message == "Request failed with status code 409"){
      console.log('22222');
     }
      else {
        console.log('444444');
      }
  }).then(function() {
      // 항상 실행
      console.log('333333');
  });

      }



    }
    return (
      <>
      {signedUp === true? (toast('회원가입이 완료되었어요! 로그인해주세요', {
position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
})): null}

{/* {dispatch(setSignedUp(false))} */}
      <ToastContainer />

        <Wrapper>
            <Title>로그인</Title>
            <TextField
            autoFocus
            fullWidth
            label="아이디"
            variant="outlined"
            color="secondary"
            margin = "normal"
            error={userIdFieldEmpty || userIdFieldWrong}
            helperText={(userIdFieldEmpty && '이름이 필요해요') || (userIdFieldWrong && '회원정보가 잘못되었습니다')}
            onInput={(e) => {
              setUserId((e.target as HTMLInputElement).value)
             }}
          />
          <TextField
            autoFocus
            fullWidth
            label="비밀번호"
            variant="outlined"
            color="secondary" 
            margin = "normal"
            error={pwFieldEmpty || userIdFieldWrong}
            helperText={(pwFieldEmpty && '비밀번호가 필요해요') || (userIdFieldWrong && '회원정보가 잘못되었습니다')}
            onInput={(e) => {
              setPassword((e.target as HTMLInputElement).value)
            }}
            type={showPassword ? 'text' : 'password'}
            InputProps={{ endAdornment: <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment> }}
          />
         <Button
                  variant="contained"
                  color="secondary"
                  onClick={onSubmitHandler}
                >
                  로그인 완료
                </Button>
        </Wrapper>
        </>
    )
}