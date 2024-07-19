import { useContext, useEffect } from 'react';
import { isLoginContext, useIsLoginState } from '../../member/contexts/IsLoginContext';
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const PublicRoute = () => {
    const isLogin = useIsLoginState();
    const {setIsLogin} = useContext(isLoginContext);
    const [, , removeCookie] = useCookies(['refresh_token']);

    const isTokenValid = async () => {
        await axios({
            method: 'POST',
            url: '/token/valid',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            console.log(res);
            localStorage.removeItem("access_token");
            localStorage.setItem("access_token", res.data.accessToken);
        }).catch((err) => {
            if(err.response && err.response.status === 404){
                alert("토큰이 만료되어 로그아웃 되었습니다.");
            }
            else{
                console.error(err);
                alert("로그인 정보에 문제가 있어 로그아웃 되었습니다.")
            }
            localStorage.removeItem("access_token");
            removeCookie("refresh_token");
            setIsLogin(false);
            return null;

        });
    };

    useEffect(() => {
        if(isLogin){
            isTokenValid();
        }
    }, []);

    return <Outlet />
};

export default PublicRoute;