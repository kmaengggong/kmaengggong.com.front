import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import QuillEditor from "./QuillEditor";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ArticleEdit = ({
    editType,
    memberId, articleId,
    title, setTitle,
    category, setCategory,
    fileUrl, setFileUrl,
    htmlStr, setHtmlStr
}) => {
    const navigate = useNavigate();

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    // const onChangeType = (event) => {
    //     setCategory(event.target.value);
    // };
    const onChangeHeaderImage = async (event) => {
        // event.preventDefault();

        // // 파일이 없는 경우. 예) 파일 선택에서 취소 누른 경우.
        // if(event.target.files[0] === undefined){
        //     if(fileUrl !== null){
        //         deleteFile();
        //     }
        //     setFileUrl(null);
        //     return;
        // }
        // // 이전의 파일을 바꾼 경우.
        // if(fileUrl !== null){
        //     deleteFile();
        // }

        // const file = event.target.files[0];
        // const formData = new FormData();
        // formData.append("file", file);
        // formData.append("fileType", "headerImage");

        // try{
        //     await fetch(`/api/file/upload/file`, {
        //         method: "POST",
        //         body: formData,
        //         headers:{
        //             ACL: "public-read"
        //         },
        //     }).then((res) => {
        //         if(res.status !== 200){
        //             alert("헤더 이미지 업로드에 실패했습니다.");
        //             return null;
        //         }
        //         return res.json();
        //     }).then((data) => {
        //         if(data === null) return;
        //         console.log(data);
        //         setFileUrl(data.uploadFileUrl);
        //     });
        // } catch(error){
        //     console.error(error);
        //     alert("헤더 이미지 업로드에 실패했습니다.");
        // }
    }

    // const deleteFile = async () => {
    //     try{
    //         await fetch(`/api/file/delete/file`, {
    //             method: "DELETE",
    //             body: JSON.stringify({
    //                 "fileType": "headerImage",
    //                 "uploadFileUrl": fileUrl
    //             }),
    //             headers:{
    //                 "Content-Type":"application/json; charset=utf-8"
    //             },
    //         }).then((res) => {
    //             if(res.status !== 200){
    //                 alert("헤더 이미지 삭제에 실패했습니다.");
    //             }
    //             return;
    //         });
    //     } catch(error){
    //         console.error(error);
    //         alert("헤더 이미지 삭제에 실패했습니다.");
    //     } 
    // };

    const onFormCreateSubmit = async (event) => {
        event.preventDefault();

        let headerImage = fileUrl;
        if(headerImage === null){
            // deleteFile();
            headerImage = "https://picsum.photos/1000/1000";
        }

        await axios({
            method: 'POST',
            url: '/board',
            header: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            data: {
                authorId: memberId,
                title: title,
                content: htmlStr,
                headerImage: headerImage
                // category: category
            }
        }).then((res) => {
            if(res.headers.location){
                window.location.href = res.headers.location;
            }
        }).catch((err) => {
            console.error(err);
            alert("글 작성 과정에 문제가 생겼습니다. 다시 시도해주세요.");
        });
        // try{
        //     await fetch(`/api/board`, {
        //         method: "POST",
        //         headers:{
        //             "Content-Type":"application/json; charset=utf-8"
        //         },
        //         body: JSON.stringify({
        //             "memberId": memberId,
        //             "articleTitle": title,
        //             "headerImage": headerImage,
        //             "content": htmlStr,
        //             // "categoryId" : category,
        //         })
        //     }).then((res) => {
        //         if(res.status !== 200){
        //             alert("글 작성 과정에 문제가 생겼습니다. 다시 시도해주세요.");
        //             return null;
        //         }
        //         return res.json();
        //     }).then((data) => {
        //         if(data === null) return;
        //         alert("글 작성 완료!");
        //         navigate(`/board/${data}`);
        //     });
        // } catch(error){
        //     console.error(error);
        //     alert("글 작성 과정에 문제가 생겼습니다. 다시 시도해주세요.");
        // }
    };

    // const onFormUpdateSubmit = async (event) => {
    //     event.preventDefault();
    //     try{
    //         await fetch(`/api/board/${articleId}`, {
    //             method: "PATCH",
    //             headers:{
    //                 "Content-Type":"application/json; charset=utf-8"
    //             },
    //             body: JSON.stringify({
    //                 "articleId": articleId,
    //                 "articleTitle": title,
    //                 "articleHeaderImage": fileUrl,
    //                 "articleContent": htmlStr,
    //                 "categoryId" : category,
    //             })
    //         }).then((res) => {
    //             if(res.status !== 200){
    //                 alert("글 수정 과정에 문제가 생겼습니다. 다시 시도해주세요.");
    //                 return null;
    //             }
    //             alert("글 수정 성공!");
    //             navigate(`/board/${articleId}`);
    //         });
    //     } catch(error){
    //         console.error(error);
    //         alert("글 수정 과정에 문제가 생겼습니다. 다시 시도해주세요.");
    //     }
    // };

    return (
        <>
        <Box sx={{
            width: '100%',
            height: {xs: 200, sm: 300},
            backgroundColor: 'background.paper',
            position: 'relative',
            overflow: 'hidden',
            mt: 3,
            mb: 2
        }}>
            <Box sx={{opacity:0.7}}>
                {fileUrl && <img src={fileUrl} alt="업로드 이미지" style={{width: '100%'}} />}
            </Box>
            <Typography variant="subtitle1" sx={{
                position:'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                height: 'fit-content',
                margin: 'auto',
                textShadow: '0 0 3px grey'
            }}>
                미리보기
            </Typography>
        </Box>

        <Grid>
            <TextField
                type="file"
                fullWidth
                onChange={onChangeHeaderImage}
            />
        </Grid>

        <Box>
            <Grid container spacing={2} sx={{ mt: 0, mb: 1}}>
                <Grid item xs={12} sm={10}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="제목"
                        value={title}
                        fullWidth
                        onChange={onChangeTitle}
                    />
                </Grid>
                {/* <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                        <InputLabel id="ype-select-label">카테고리</InputLabel>
                        <Select
                            labelId="ype-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="카테고리"
                            onChange={onChangeType}
                        >
                            <MenuItem value={1}>공지</MenuItem>
                            <MenuItem value={2}>일반</MenuItem>
                        </Select>
                    </FormControl>
                </Grid> */}
                <Grid item xs={12}>
                    <QuillEditor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
                </Grid>
            </Grid>

            <Grid item sx={{ display:'flex', justifyContent:'flex-end' }}>
                {editType === 'create' ?
                <Button variant="contained" onClick={onFormCreateSubmit}>
                    작성
                </Button>
                : editType === 'update' ? <></>
                // <Button variant="contained" onClick={onFormUpdateSubmit}>
                //     수정
                // </Button>
                : <></>
                }

            </Grid>
        </Box>
        </>
    );
};

export default ArticleEdit;