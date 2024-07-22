import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useIsLoginState } from "../../member/contexts/IsLoginContext";
import QuillEditor from "../components/QuillEditor";
import ArticleEdit from "../components/ArticleEdit";
import Loading from "../../public/components/Loading";
import getMemberId from "../../member/components/getMemberId";
import axios from "axios";

const ArticleUpdate = () => {
    const isLogin = useIsLoginState();
    const navigate = useNavigate();
    const params = useParams();
    const articleId = params.articleId;

    const [memberId, setMemberId] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);
    const [article, setArticle] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(2);
    const [fileUrl, setFileUrl] = useState(null);
    const [htmlStr, setHtmlStr] = useState(null);

    useEffect(() => {
        setMemberId(getMemberId());
        fetchData();
    }, []);

    useEffect(() => {
        if(article === null) return;
        if(memberId === article.authorId){
            setIsAuthor(true);
        }
    }, [article, isLogin]);

    useEffect(() => {
        if(!isAuthor) return;
        setFileUrl(article.headerImage);
        setTitle(article.title);
        setHtmlStr(article.content);
        // setCategory(article.category.categoryId);
    }, [isAuthor]);

    const fetchData = async () => {
        await axios({
            method: 'GET',
            url: `/board/${articleId}`
        }).then((res) => {
            setArticle(res.data.articleResponse);
            setFileUrl(res.data.articleResponse.headerImage);
        }).catch((err) => {
            if(err.response.status && err.response.status === 404){
                alert("존재하지 않는 페이지입니다.");
                navigate(-1);
            }
            else{
                alert("글 조회 과정에 문제가 생겼습니다. 다시 시도해주세요.");
            }
        });
    }

    return (
        <>
        <Box sx={{width: '100%'}}>
            <Typography variant="h6" gutterBottom>
                글 수정
            </Typography>

            <Divider />

            {article === null ? <Loading /> :
            <ArticleEdit
                editType={"update"}
                authorId={memberId}
                articleId={articleId}
                title={title}
                setTitle={setTitle}
                category={category}
                setCategory={setCategory}
                fileUrl={fileUrl}
                setFileUrl={setFileUrl}
                htmlStr={htmlStr}
                setHtmlStr={setHtmlStr}
            />
            }
        </Box>
        </>
    );
};

export default ArticleUpdate;