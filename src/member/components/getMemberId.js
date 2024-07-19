import { jwtDecode } from 'jwt-decode';

const getMemberId = () => {
    try{
        return jwtDecode(localStorage.getItem("access_token")).memberId;
    } catch(error){
        console.error(error);
    }
};

export default getMemberId;