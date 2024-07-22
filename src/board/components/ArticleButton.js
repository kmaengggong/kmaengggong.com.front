import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleButton = ({
    isAuthor,
    articleId, article
}) => {
    const navigate = useNavigate();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // 버튼
    const onClickArticleEditButton = (event) => {
        event.preventDefault();
        if(!isAuthor){
            alert("글 수정 권한이 없습니다.");
            return;
        }

        navigate(`/board/update/${articleId}`);
    };

    const onClickArticleDeleteButton = (event) => {
        event.preventDefault();
        if(!isAuthor){
            alert("글 삭제 권한이 없습니다.");
            return;
        }

        setDeleteDialogOpen(true);
    };

    // 삭제 다이얼로그
    const onCloseDeleteDialog = (event) => {
        event.preventDefault();
        setDeleteDialogOpen(false);
    };

    const onClickDeleteDialogYesButton = async (event) => {
        event.preventDefault();

        await axios({
            method: 'DELETE',
            url: `/board/${articleId}`,
            header: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            alert("글 삭제 성공!");
            setDeleteDialogOpen(false);
            navigate("/board");
        }).catch((err) => {
            console.error(err);
            alert("글 삭제에 문제가 생겼습니다. 다시 시도해주세요.");
        });
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row-reverse', mb:2}
        }>
            <Button
                variant="contained"
                color="error"
                onClick={onClickArticleDeleteButton}
            >
                글 삭제
            </Button>
            <Button
                variant="contained"
                color="warning"
                onClick={onClickArticleEditButton}
                sx={{mr:1}}
            >
                글 수정
            </Button>

            <Dialog
                open={deleteDialogOpen}
                onClose={onCloseDeleteDialog}
            >
                <DialogTitle>
                    글 삭제
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        *글을 삭제하면 7일 후 완전히 삭제됩니다.<br />
                        글이 완전히 삭제되기 전, 마이페이지에서 글을 복구할 수 있습니다.<br /><br />

                        정말로 삭제하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={onCloseDeleteDialog}
                        autoFocus
                    >
                        No
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onClickDeleteDialogYesButton}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ArticleButton;