import { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";

const CommentList = ({
    comment, commentId,
    authorId, articleId,
    marginLeft, isReply
}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [newNewComment, setNewNewComment] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [editComment, setEditComment] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        setEditComment(comment.commentContent);
        if(comment.deleted) setIsDisabled(true);
    }, []);

    const onClickAccordion = (event) => {
        event.preventDefault();
        if(isEditMode) event.stopPropagation();
    };

    // 좋아요
    const onClickCommentLikeButton = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }

    // 수정
    const onClickCommentEditButton = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsEditMode(true);
        setEditComment(comment.content);
    };

    const onClickCheckEditButton = async (event) => {
        event.preventDefault();

        await axios({
            method: 'PATCH',
            url: `/comment/${commentId}`,
            header: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            data: {
                content: editComment
            }
        }).then((res) => {
            alert("댓글 수정 성공!");
            window.location.reload();
        }).catch((err) => {
            console.error(err);
            alert("댓글 수정에 문제가 생겼습니다. 다시 시도해주세요.");
        });
    };

    const onClickClearEditButton = (event) => {
        event.preventDefault();
        // event.stopPropagation();
        setIsEditMode(false);
    };

    const onClickEditComment = (event) => {
        event.preventDefault();
        // event.stopPropagation();
    };

    // 삭제
    const onClickCommentDeleteButton = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDeleteDialogOpen(true);
    };

    const onCloseDeleteDialog = (event) => {
        event.preventDefault();
        setDeleteDialogOpen(false);
    };

    const onClickDeleteDialogYesButton = async (event) => {
        event.preventDefault();

        await axios({
            method: 'DELETE',
            url: `/comment/${commentId}`,
            header: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            alert("댓글 삭제 성공!");
            window.location.reload();
        }).catch((err) => {
            console.error(err);
            alert("댓글 삭제에 문제가 생겼습니다. 다시 시도해주세요.");
        });
    }

    // 대댓글
    const onClickCommentReplyButton = async (event) => {
        event.preventDefault();

        await axios({
            method: 'POST',
            url: `/comment`,
            header: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            data: {
                parentId: commentId,
                authorId: authorId,
                articleId: articleId,
                content: newNewComment
            }
        }).then((res) => {
            alert("대댓글 작성 성공!");
            window.location.reload();
        }).catch((err) => {
            console.error(err);
            alert("대댓글 작성에 문제가 생겼습니다. 다시 시도해주세요.");
        })
    };

    return (
        <>
        <Accordion
            disabled={isDisabled}
            onClick={onClickAccordion}
            sx={{ml: marginLeft, mb: 1}}
        >
            <AccordionSummary
                // expandIcon={<SubdirectoryArrowRightIcon color="success" />}
            >

            <ListItem>
                <Stack
                    spacing={1}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mr:3,
                        // pt:1
                }}>
                    {/* <ListItemAvatar> */}
                        <Avatar src="https://picsum.photos/200/200"></Avatar>
                    {/* </ListItemAvatar> */}
                    <Typography textAlign={'center'}>
                        {comment.nickname}
                    </Typography>
                </Stack>
                {!isEditMode ?
                        <>
                        {isReply && <SubdirectoryArrowRightIcon sx={{mr: 1}} />}
                        <ListItemText>
                            {comment.content}
                        </ListItemText>
                        </>
                        :
                        <TextField
                            fullWidth
                            value={editComment}
                            onClick={onClickEditComment}
                            onChange={(e) => {
                                setEditComment(e.target.value);
                            }}
                            sx={{mr: 2}}
                        />
                }
                {authorId !== comment.authorId ? <></> :
                    !isEditMode ?
                    <>
                        <IconButton onClick={onClickCommentLikeButton}>
                            <FavoriteBorderIcon color="error" />
                        </IconButton>
                        <Typography sx={{mr: 2}}>&nbsp;0{comment.like}</Typography>
                        <IconButton sx={{mr: 2}} onClick={onClickCommentEditButton}>
                            <EditIcon color="warning" />
                        </IconButton>
                        <IconButton onClick={onClickCommentDeleteButton}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    </>
                    :
                    <>
                        <IconButton sx={{mr: 2}} onClick={onClickCheckEditButton}>
                            <CheckIcon color="success" />
                        </IconButton>
                        <IconButton onClick={onClickClearEditButton}>
                            <ClearIcon color="error" />
                        </IconButton>
                    </>
                }
                
            </ListItem>

            </AccordionSummary>

            <AccordionDetails>
                <Stack
                    // component="form"
                    spacing={1}
                    // onSubmit={onFormNewNewCommentSubmit}
                >
                    <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        onChange={(e) => {
                            setNewNewComment(e.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={onClickCommentReplyButton}
                    >
                        대댓글쓰기
                    </Button>

                    <Dialog
                        open={deleteDialogOpen}
                        onClose={onCloseDeleteDialog}
                    >
                        <DialogTitle>
                            댓글 삭제
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
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
                </Stack>
            </AccordionDetails>
        </Accordion>
        
        {comment.replies.length > 0 &&
            comment.replies.map((children) => (
                <div key={children.commentId}>
                    <CommentList
                        comment={children}
                        commentId={children.commentId}
                        authorId={authorId}
                        articleId={articleId}
                        marginLeft={marginLeft+4}
                        isReply={true}
                    />
                </div>
            ))
        }
        </>
    );
};

export default CommentList;