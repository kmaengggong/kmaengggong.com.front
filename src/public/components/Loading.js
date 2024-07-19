import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
    return(
        <>
        <Box sx={{ textAlign: 'center', mt: 25 }}>
            <CircularProgress color="success" />
        </Box>
        </>
    )
};

export default Loading;