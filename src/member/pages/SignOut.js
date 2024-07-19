import { useNavigate } from "react-router-dom";
import { isLoginContext, useIsLoginState } from "../contexts/IsLoginContext";
import { useCookies } from "react-cookie";
import { useContext, useEffect } from "react";

const SignOut = () => {
    const isLogin = useIsLoginState();
    const {setIsLogin} = useContext(isLoginContext);
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['refresh_token']);

    console.log("로그인 상태: " + isLogin);

    useEffect(() => {
        navigate(`/`);
    }, [isLogin]);

    if(!isLogin) return;

    localStorage.removeItem("access_token");
    removeCookie("refresh_token");
    setIsLogin(false);
    alert("로그아웃 되었습니다.");
};

export default SignOut;