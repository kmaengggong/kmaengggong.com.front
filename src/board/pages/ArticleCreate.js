import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import getMemberId from "../../member/components/getMemberId";
import ArticleEdit from "../components/ArticleEdit";

const ArticleCreate = () => {
    const [memberId, setMemberId] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(2);
    const [fileUrl, setFileUrl] = useState(null);
    const [htmlStr, setHtmlStr] = useState(null);

    useEffect(() => {
        setMemberId(getMemberId());
    }, []);

    return (
        <>
        <Box sx={{width: '100%'}}>
            <Typography variant="h5" gutterBottom>
                글 작성
            </Typography>

            <Divider />

            <ArticleEdit
                editType={"create"}
                authorId={memberId}
                title={title}
                setTitle={setTitle}
                category={category}
                setCategory={setCategory}
                fileUrl={fileUrl}
                setFileUrl={setFileUrl}
                htmlStr={htmlStr}
                setHtmlStr={setHtmlStr}
            />
        </Box>
        </>
    );
};

export default ArticleCreate;