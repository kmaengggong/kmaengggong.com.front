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

    const onChangeEmail = (event) => {
        setEmail(event.currentTarget.value.trim());
        setIsEmailValid(false);
    };
    const onChangeNickname = (event) => {
        setNickname(event.currentTarget.value.trim());
        setIsNicknameValid(false);
    };
    const onChangePassword = (event) => {
        setPassword(event.currentTarget.value.trim());
        setIsPasswordValid(false);
    };
    const onChangePasswordCheck = (event) => {
        setPasswordCheck(event.currentTarget.value.trim());
        setIsPasswordValid(false);
    };

    const onClickEmailCheckButton = async (event) => {
        event.preventDefault();

        axios({
            method: 'GET',
            url: '/member/email',
            params: {
                email: email
            }
        }).then((res) => {
            if(res.status === 200 && !res.data){
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
            if(res.status === 200 && !res.data){
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

        try{
            await axios({
                method: 'POST',
                url: '/member',
                data: {
                    email: email,
                    nickname: nickname,
                    password: password
                }
            }).then((res) => {
                if(res.status !== 201){
                    alert("회원가입 실패. 다시 시도해주세요.");
                    return;
                }
                else{
                    alert("회원가입 완료!");
                    navigate(`/`);
                }
            })
        } catch(error){
            console.error(error);
            alert("회원가입 실패. 다시 시도해주세요.");
        }
    };

    return(
        <>
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8,
                    mx: 'auto',
                    maxWidth: 'sm'
                }}    
            >
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={onFormSubmit}
                    sx={{ mt:4, width:'100%' }}
                >
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                name="email"
                                autoComplete="email"
                                onChange={onChangeEmail}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{my: 1}}
                                onClick={onClickEmailCheckButton}
                            >
                                확인
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={9}>
                            <TextField
                                required
                                fullWidth
                                id="nickname"
                                label="닉네임"
                                name="nickname"
                                onChange={onChangeNickname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{my: 1}}
                                onClick={onClickNicknameCheckButton}
                            >
                                확인
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="비밀번호"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={onChangePassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password-check"
                                label="비밀번호 확인"
                                type="password"
                                onChange={onChangePasswordCheck}
                                id="password-check"
                                helperText={isPasswordEqual ? "" : "비밀번호가 일치하지 않습니다."}
                                error={isPasswordEqual ? false : true}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
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