import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../public/components/Loading";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const MemberList = () => {
    const [memberList, setMemberList] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios({
            method: 'GET',
            url: '/member',
            timeout: 5000
        }).then((res) => {
            if(res.status !== 200){
                console.error(res);
                alert("멤버 리스트 데이터 조회에 실패했습니다.")
                return;
            }
            setMemberList(res.data);
        }).catch((err) => {
            console.error(err);
            alert("멤버 리스트 데이터 조회에 실패했습니다.")
        });
    };

    return (
        <>
        {memberList === null ? <Loading /> :
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>이메일</TableCell>
                    <TableCell>닉네임</TableCell>
                    <TableCell>가입일</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {memberList.map((member) => (
                <TableRow>
                    <TableCell>{member.memberId}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.nickname}</TableCell>
                    <TableCell>{member.registeredAt}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
        }    
        </>
    );
};

export default MemberList;