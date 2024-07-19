import { useContext, useEffect } from 'react';
import { isLoginContext, useIsLoginState } from '../../member/contexts/IsLoginContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const LoginRoute = () => {
    const isLogin = useIsLoginState();
    const {setIsLogin} = useContext(isLoginContext);
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['refresh_token']);

    const isTokenValid = async () => {
        await axios({
            method: 'POST',
            url: '/token/valid',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            localStorage.removeItem("access_token");
            localStorage.setItem("access_token", res.data.accessToken);
        }).catch((err) => {
            if(err.response && err.response.status === 404){
                alert("토큰이 유효하지 않습니다. 다시 로그인해주세요.");
            }
            else{
                console.error(err);
                alert("로그인 정보에 문제가 생겼습니다. 다시 로그인해주세요.");
            }
            localStorage.removeItem("access_token");
            removeCookie("refresh_token");
            setIsLogin(false);
            return null;
        });
    };

    // 로그인 상태라면 검증
    useEffect(() => {
        if(isLogin){
            isTokenValid();
        }
        else{
            alert("로그인이 필요한 페이지입니다!");
            navigate(-1);
        }
    }, []);

    return <Outlet />;
};

export default LoginRoute;