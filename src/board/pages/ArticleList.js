import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, InputBase, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Loading from '../../public/components/Loading';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import getFormatDate from '../../public/components/getFormatDate';
import { useIsLoginState } from '../../member/contexts/IsLoginContext';
import SearchIcon from '@mui/icons-material/Search';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';

// 순서대로 수정. id name label type
const ArticleList = () => {
    const isLogin = useIsLoginState();
    const navigate = useNavigate();
    const [searchParams, setSerachParams] = useSearchParams();

    const [articleList, setArticleList] = useState(null);
    const [page, setPage] = useState(searchParams.get("page") !== null ? Number(searchParams.get("page")) : 1);
    const [totalPage, setTotalPage] = useState(1);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        await axios({
            method: 'GET',
            url: `/board?page=${page}`
        }).then((res) => {
            if(res.data.length < 1){
                setIsEmpty(true)
                alert("글이 존재하지 않습니다.");
                return;
            }
            else{
                setTotalPage(res.data.totalPages);
                const articles = res.data.map((item) => ({
                    articleId: item.articleResponse.articleId,
                    authorId: item.articleResponse.authorId,
                    nickname: item.articleResponse.nickname,
                    title: item.articleResponse.title,
                    content: formatArticleContent(item.articleResponse.content),
                    headerImage: item.articleResponse.headerImage,
                    categoryName: item.articleResponse.categoryName,
                    createdAt: getFormatDate(item.articleResponse.createdAt, 0),
                    updatedAt: getFormatDate(item.articleResponse.updatedAt, 0),
                    commentLength: item.commentResponse.length,
                }));
                setArticleList(articles);
            }
        }).catch((err) => {
            console.error(err);
            alert("글 리스트 조회 과정에 문제가 생겼습니다. 다시 시도해주세요.");
        });
    }

    const formatArticleContent = (articleContent) => {
        if (!articleContent) return '';
        const match = articleContent.match(/<[^>]*>([^<]+)<\/[^>]*>/);
        if (!match) return '';
        return match[1];
    };

    const onClickWriteButton = () => {
        navigate("/board/create");
    }
    const onChangePagination = (event, value) => {
        setPage(value);
        navigate(`/board/list?page=${value}`);
    };

    return(
        <>
        <Box sx={{width: '100%'}}>

        {isEmpty === true ?
        <>
        등록된 글이 없습니다
        </>
        :
        articleList === null ? <Loading /> :
        <Box>
            {articleList.map((article) => (
            <Card key={article.articleId} sx={{my: 1}}>
                <CardActionArea
                    component={Link}
                    to={`/board/${article.articleId}`}
                    sx={{
                        display: 'flex',
                        width: "100%",
                        height: {xs: 100, sm: 150},
                        al: 'center'
                    }}
                >
                    <CardMedia
                        component="img"
                        image={article.headerImage}
                        alt="Header Image"
                        sx={{
                            width: {xs: 100, sm: 150},
                            height: {xs: 100, sm: 150}
                        }}
                    />
                    {/* sx={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display:"inline-block"}} */}
                    <Box sx={{ width: '100%', px:1 }}>
                        <CardContent sx={{textAlign: 'start'}}>
                            <Grid container alignItems="center">
                                <Grid item xs={11}>
                                    <Typography variant="h5" sx={{pt: '7px'}}>
                                        {article.title}
                                    </Typography>
                                    <div> 
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        gutterBottom
                                        sx={{
                                            pt: '2px',
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: "1",
                                            WebkitBoxOrient: "vertical",
                                        }}
                                    >
                                        {article.content}
                                    </Typography>
                                    </div>
                                    <Typography variant="body2" color="text.secondary">
                                        {article.categoryName}
                                        &nbsp;|&nbsp;
                                        {article.createdAt}&nbsp;
                                        by {article.nickname}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6">
                                        <CommentIcon />&nbsp;{article.commentLength}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Box>
                </CardActionArea>
            </Card>
            ))}
        </Box>
        }

        <Box sx={{width: '100%'}}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    // px: { xs: 2, sm: 4, md: 8},
                    py: 1,
                    mt: 1,
                    // bgcolor: 'background.paper',
                    // borderRadius: 1
                }}
            >
                {/* 태블릿 이상용 */}
                <Pagination
                    count={totalPage}
                    shape="rounded"
                    variant="outlined"
                    showFirstButton
                    showLastButton
                    page={page}
                    onChange={onChangePagination}
                    sx={{display: {xs: 'none', sm: 'flex'}}}
                />
                {/* 모바일용  */}
                <Pagination
                    count={totalPage}
                    shape="rounded"
                    variant="outlined"
                    defaultPage={3}
                    siblingCount={0}
                    page={page}
                    onChange={onChangePagination}
                    sx={{display: {xs: 'flex', sm: 'none'}}}
                />
            </Box>

            <Box sx={{
                display: 'flex',
                //flexDirection: 'row',
                justifyContent: 'space-between',
                mt: 4,
                width: '100%'
            }}>
                {!isLogin ? <></> :
                    <Button variant="contained" onClick={onClickWriteButton} sx={{width: 100, mr:2}}>
                        글쓰기
                    </Button>
                }
                <Box sx={{bgcolor: 'background.paper',
                    borderRadius: 2, pl:2, pr:1, py:0, width:'100%', display:'flex'}}>
                    <InputBase
                        fullWidth
                        placeholder="Search..."
                        inputProps={{'aria-label': 'search'}}
                        sx={{mr: 1}}
                    />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Box>
                
            </Box>
        </Box>

        </Box>
        </>
    );
};

export default ArticleList;