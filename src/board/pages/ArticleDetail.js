import { Box, Button, Divider, List, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import getMemberId from "../../member/components/getMemberId";
import { useIsLoginState } from "../../member/contexts/IsLoginContext";
import Loading from "../../public/components/Loading";
import getFormatDate from "../../public/components/getFormatDate";
import ArticleButton from "../components/ArticleButton";
import "../style/quill-content.css";
import axios from "axios";
import CommentList from "../components/CommentList";

const ArticleDetail = () => {
    const isLogin = useIsLoginState();
    const navigate = useNavigate();
    const params = useParams();
    const articleId = params.articleId;

    const [memberId, setMemberId] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);
    const [article, setArticle] = useState(null);
    const [articleLike, setArticleLike] = useState(0);
    const [commentList, setCommentList] = useState(null);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchData();
        if(isLogin){
            setMemberId(getMemberId());
        }
    }, []);

    useEffect(() => {
        if(article === null) return;
        if(memberId === article.authorId){
            setIsAuthor(true);
        }
    }, [article, isLogin]);

    const fetchData = async () => {
        await axios({
            method: 'GET',
            url: `/board/${articleId}`
        }).then((res) => {
            console.log(res.data);
            setArticle(res.data.articleResponse);
            setCommentList(res.data.commentResponse);
        }).catch((err) => {
            if(err.response.status && err.response.status === 404){
                alert("존재하지 않는 페이지입니다.");
                navigate(-1);
            }
            else{
                alert("글 조회 과정에 문제가 생겼습니다. 다시 시도해주세요.");
            }
        });

        await axios({
            method: 'GET',
            url: `/board/${articleId}/like`
        }).then((res) => {
            setArticleLike(res.data);
        }).catch((err) => {
            alert("글 조회 과정에 문제가 생겼습니다. 다시 시도해주세요.");
        });
    }

    const onFormSubmit = async (event) => {
        event.preventDefault();
        if(!isLogin){
            alert("로그인을 해주세요!");
            return;
        }
        if(newComment.length < 1){
            alert("댓글을 입력해주세요!");
            return;
        }

        await axios({
            method: 'POST',
            url: `/comment`,
            header: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            data: {
                authorId: memberId,
                articleId: articleId,
                content: newComment
            }
        }).then((res) => {
            alert("댓글 작성 성공!");
            window.location.reload();
        }).catch((err) => {
            console.error(err);
            alert("댓글 작성에 문제가 생겼습니다. 다시 시도해주세요.");
            return;
        });
    };

    return (
        <>
        {article === null ? <Loading /> :
        <Box sx={{width: '100%'}}>
            <Box sx={{
                width: '100%',
                height: {xs: 200, sm: 300},
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box sx={{opacity:0.7}}>
                <img src={article.headerImage} style={{width: '100%'}} />
                </Box>
                <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                    sx={{
                        position:'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 'fit-content',
                        margin: 'auto',
                        px: 1,
                        textShadow: '0 0 3px grey'
                }}>
                    {article.title}
                </Typography>
                <Typography
                    component="h5"
                    variant="subtitle1"
                    color="grey.200"
                    gutterBottom
                    sx={{
                        position:'absolute',
                        top: 0,
                        bottom: {xs: 5, sm: 10},
                        left: 0,
                        right: 0,
                        height: 'fit-content',
                        textAlign: 'left',
                        margin: 'auto 0 0',
                        marginLeft: {xs: 2, sm: 4},
                        textShadow: '0 0 2px black'
                }}>
                    {article.categoryName} |&nbsp;
                    {getFormatDate(article.createdAt, 0)}&nbsp;
                    by {article.nickname}
                </Typography>
            </Box>

            {/* <Grid item xs={12} sx={{
                '& .markdown': {py: 3}
            }}> */}
            <Typography
                variant="subtitle2"
                color="grey.300"
                gutterBottom
                textAlign="right"
                margin={1}
            >
                좋아요 {articleLike}&nbsp;
                조회수 {article.viewCount} 
            </Typography>

            <Divider />

            <Box sx={{ mt: 4, mb: 16, textAlign: 'left' }}>
                <div id="quill-content" dangerouslySetInnerHTML={{ __html: article.content}} />
            </Box>

            {!isAuthor ? <></> : 
                <ArticleButton
                    isAuthor={isAuthor}
                    articleId={articleId}
                    article={article}
                />
            }

            <Divider />

            <List disablePadding>
            {commentList.map((comment) => (
                <div key={comment.commentId}>
                <CommentList
                    comment={comment}
                    commentId={comment.commentId}
                    authorId={memberId}
                    articleId={articleId}
                    marginLeft={0}
                />
                <Divider />
                </div>
            ))}
            </List>
            <Stack
                component="form"
                spacing={1}
                marginTop={4}
                onSubmit={onFormSubmit}
            >
                <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    onChange={(e) => {
                        setNewComment(e.target.value);
                    }}
                />
                <Button type="submit" variant="contained">댓글쓰기</Button>
            </Stack>
        {/* </Grid> */}
        </Box>
        }
        </>
    );
};

export default ArticleDetail;