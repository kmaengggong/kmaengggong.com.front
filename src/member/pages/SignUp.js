import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [nickname, setNickname] = useState(null);
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [isPasswordEqual, setIsPasswordEqual] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
        if(passwordCheck.match(password)) setIsPasswordEqual(true);
        else setIsPasswordEqual(false);
    }, [password, passwordCheck]);

    useEffect(() => {
        if(isPasswordEqual && password.length > 0) setIsPasswordValid(true);
    }, [password, isPasswordEqual]);

    const onClickEmailCheckButton = async (event) => {
        event.preventDefault();

        axios({
            method: 'GET',
            url: '/member/email',
            params: {
                email: email
            }
        }).then((res) => {
            if(!res.data){
                setIsEmailValid(true);
                alert("사용하셔도 좋은 이메일입니다.");
            }
            else{
                console.error(res);
                alert("이미 사용 중인 이메일입니다.");
                return;
            }
        }).catch((err) => {
            console.error(err);
            alert("이메일을 확인해 주세요.");
        });
    };

    const onClickNicknameCheckButton = async (event) => {
        event.preventDefault();

        await axios({
            method: 'GET',
            url: '/member/nickname',
            params: {
                nickname: nickname
            }
        }).then((res) => {
            if(!res.data){
                setIsNicknameValid(true);
                alert("사용하셔도 좋은 닉네임입니다.");
            }
            else{
                console.error(res);
                alert("이미 사용 중인 닉네임입니다.");
                return;
            }
        }).catch((err) => {
            console.error(err);
            alert("닉네임을 확인해 주세요.");
        });
    };

    const onFormSubmit = async (event) => {
        event.preventDefault();

        if(!isEmailValid){
            alert("이메일을 확인해 주세요.");
            return;
        }
        if(!isNicknameValid){
            alert("닉네임을 확인해 주세요.");
            return;
        }
        if(!isPasswordValid){
            alert("비밀번호를 확인해 주세요.");
            return;
        }

        await axios({
            method: 'POST',
            url: '/member',
            data: {
                email: email,
                nickname: nickname,
                password: password
            }
        }).then((res) => {
            alert("회원가입 완료!");
            navigate(`/`);
        }).catch((err) => {
            console.error(err);
            alert("회원가입 실패. 다시 시도해주세요.");
        });
    };

    return(
        <>
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 'sm',
                    mt: 8,
                    mx: 'auto'
                }}    
            >
                <Typography gutterBottom variant="h4">
                    Sign Up
                </Typography>
                <Box
                    noValidate
                    component="form"
                    onSubmit={onFormSubmit}
                    sx={{ mt:4, width:'100%' }}
                >
                    <Grid container alignItems={'center'} spacing={2}>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                fullWidth
                                required
                                id="email"
                                name="email"
                                label="이메일 주소"
                                autoComplete="email"
                                onChange={(e) => {
                                    setEmail(e.target.value.trim());
                                    setIsEmailValid(false);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={onClickEmailCheckButton}
                                sx={{my: 1}}
                            >
                                확인
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={9}>
                            <TextField
                                fullWidth
                                required
                                id="nickname"
                                name="nickname"
                                label="닉네임"
                                onChange={(e) => {
                                    setNickname(e.target.value.trim());
                                    setIsNicknameValid(false);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={onClickNicknameCheckButton}
                                sx={{my: 1}}
                            >
                                확인
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="password"
                                name="password"
                                label="비밀번호"
                                type="password"
                                autoComplete="new-password"
                                onChange={(e) => {
                                    setPassword(e.target.value.trim());
                                    setIsPasswordValid(false);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="password-check"
                                name="password-check"
                                label="비밀번호 확인"
                                type="password"
                                error={isPasswordEqual ? false : true}
                                helperText={isPasswordEqual ? "" : "비밀번호가 일치하지 않습니다."}
                                onChange={(e) => {
                                    setPasswordCheck(e.target.value.trim());
                                    setIsPasswordValid(false);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{mt: 4}}
                    >
                        가입하기
                    </Button>
                </Box>
            </Box>
        </Box>
        </>
    );
};

export default SignUp;