import { createContext, useContext, useState } from 'react';

const access_token = localStorage.getItem('access_token');

export const isLoginContext = createContext({
    isLogin : access_token ? true : false
});

export function IsLoginProvider({children}){
    const [isLogin, setIsLogin] = useState(
        access_token !== null ? true : false
    );
    return <isLoginContext.Provider value={{
        isLogin, setIsLogin
    }}>
        {children}
    </isLoginContext.Provider>
}

export function useIsLoginState(){
    const context = useContext(isLoginContext);
    if(!context){
        throw new Error("IsLoginProvider를 찾을 수 없음");
    }
    return context.isLogin;
}