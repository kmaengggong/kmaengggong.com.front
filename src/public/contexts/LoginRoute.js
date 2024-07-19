import { useContext, useEffect } from 'react';
import { isLoginContext, useIsLoginState } from '../../member/contexts/IsLoginContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LoginRoute = () => {
    const isLogin = useIsLoginState();
    const {setIsLogin} = useContext(isLoginContext);
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['refresh_token']);

    const isTokenValid = () => {
        try{
            fetch(`/api/auth/isTokenValid`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type":"application/json; charset=utf-8"
                }
            }).then((res) => {
                // AT O, RT O or AT 만료, RT O 두 가지 경우를 제외한
                // 모든 상황은 재로그인이고, 로직은 백에서 처리
                if(res.status !== 200){
                    localStorage.removeItem("access_token");
                    removeCookie("refresh_token");
                    setIsLogin(false);
                    alert("토큰이 유효하지 않습니다. 다시 로그인해주세요.");
                    navigate("/signin");
                }
                return res.json();
            }).then((data) => {
                localStorage.removeItem("access_token");
                localStorage.setItem("access_token", data.accessToken);
            });
        } catch(error){
            alert("로그인 정보에 문제가 생겼습니다. 다시 로그인해주세요.");
            console.error(error);
        }
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