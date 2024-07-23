import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useIsLoginState } from "../contexts/IsLoginContext";
import { useNavigate, useParams } from "react-router-dom";
import getMemberId from "../components/getMemberId";
import Loading from "../../public/components/Loading";
import getFormatDate from "../../public/components/getFormatDate";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            hidden={value !== index}
            id={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>

    );
};

const MyPage = () => {
    const isLogin = useIsLoginState();
    const params = useParams();
    const navigate = useNavigate();
    const pMemberId = params.memberId;
    const [tab, setTab] = useState(0);
    const [memberId, setMemberId] = useState(false);
    const [member, setMember] = useState(null);
    const [articles, setArticles] = useState(null);
    const [totalPage, setTotalPage] = useState(1);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        if(!isLogin){
            alert("로그인이 필요한 페이지입니다.");
            navigate(-1);
        }
        setMemberId(getMemberId());
    }, []);

    useEffect(() => {
        if(memberId){
            if(memberId != pMemberId){
                alert("접근 권한이 없습니다!");
                navigate(-1);
            }
            else{
                fetchMemberData();
            }
        }
    }, [memberId]);

    useEffect(() => {
        if(tab === 1){
            fetchArticleData();
        }
        else if(tab === 2){
            fetchCommentData();
        }
    }, [tab])

    const fetchMemberData = async () => {
        await axios({
            method: 'GET',
            url: `/member/${memberId}`,
            header: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            setMember(res.data);
        }).catch((err) => {

        });
    };

    const fetchArticleData = async () => {
        await axios({
            method: 'GET',
            url: `/board/${memberId}/member`,
            header: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            if(res.data.length < 1){
                setIsEmpty(true);
                return;
            }
            else{
                setTotalPage(res.data.page.totalPages);
                const articles = res.data._embedded.boardResponseList.map((item) => ({
                    articleId: item.articleResponse.articleId,
                    authorId: item.articleResponse.authorId,
                    nickname: item.articleResponse.nickname,
                    title: item.articleResponse.title,
                    headerImage: item.articleResponse.headerImage,
                    categoryName: item.articleResponse.categoryName,
                    createdAt: getFormatDate(item.articleResponse.createdAt, 0),
                    updatedAt: getFormatDate(item.articleResponse.updatedAt, 0),
                    commentLength: item.commentResponse.length,
                }));
                setArticles(articles);
            }
        }).catch((err) => {

        });
    };

    const fetchCommentData = async () => {

    };

    const onClickInfoChangeButton =  () => {
        navigate(`/member/${memberId}/update`);
    };

    const onClickPasswordChangeButton = () => {
        navigate(`/member/${memberId}/update-password`);
    };

    return(
        <>
        <Box sx={{width: '100%'}}>
            <Tabs
                centered
                value={tab}
                onChange={(e, v) => {
                    setTab(v);
                }}
            >
                <Tab label="Info" id="tab-0" />
                <Tab label="Articles" id="tab-1" />
                <Tab label="Comments" id="tab-2" />
            </Tabs>
            <TabPanel value={tab} index={0}>
                {member === null ? <Loading /> :
                <>
                {member.email}
                {member.nickname}
                {member.password}
                {member.registeredAt}
                </>
                }
                <Button variant="contained" onClick={onClickInfoChangeButton}>
                    정보 변경
                </Button>
                <Button variant="contained" onClick={onClickPasswordChangeButton}>
                    비밀번호 변경
                </Button>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                {isEmpty === true ?
                <>
                작성된 글이 없습니다
                </>
                :
                articles === null ? <Loading /> :
                <>
                {articles.map((article) => (
                    <>
                    <p>{article.title}</p>
                    </>
                ))}
                </>
                }
            </TabPanel>
            <TabPanel value={tab} index={2}>
                COMMENTS
            </TabPanel>
        </Box>
        </>
    );
};

export default MyPage;