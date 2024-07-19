import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoginContext, useIsLoginState } from "../contexts/IsLoginContext";
import { useCookies } from "react-cookie";

const SignIn = () => {
    const isLogin = useIsLoginState();
    const {setIsLogin} = useContext(isLoginContext);
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(["refresh_token"]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(!password){
            setPassword('');
        }
    }, []);

    useEffect(() => {
        if(isLogin){
            navigate(`/`);
            return;
        }
    }, [isLogin]);

    const onFormSubmit = async (event) => {
        event.preventDefault();
        removeCookie("refresh_token");

        await axios({
            method: 'POST',
            url: '/auth/signin',
            data: {
                email: email,
                password: password
            }
        }).then((res) => {
            // 여기서 토큰 받은거 확인
            console.log(res.data);
            localStorage.setItem("access_token", res.data.accessToken);
            setIsLogin(true);
            alert("로그인 되었습니다.");
            navigate(`/`);
            window.location.reload();
        }).catch((err) => {
            if(err.response && (err.response.status === 400 || err.response.status === 404)){
                alert("이메일 혹은 비밀번호를 확인해주세요.");
                setPassword('');
            }
            else{
                console.error(err);
                alert("로그인에 문제가 생겼습니다. 다시 시도해주세요.");
                navigate(`/signin`);
                window.location.reload();
            }
        });
    };
    

    return(
        <>
        <Box sx={{width: '100%'}}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 8,
                mx: 'auto',
                maxWidth: '400px'
            }}>
                <Typography variant="h4" gutterBottom>
                    Sign In
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={onFormSubmit}
                    sx={{ mt:4, width:'100%' }}
                >
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
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
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                value={password || ''}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 4}}
                    >
                        로그인
                    </Button>
                </Box>
            </Box>
        </Box>
        </>
    );
};

export default SignIn;