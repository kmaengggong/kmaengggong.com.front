import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
    return(
        <>
        <Box sx={{ mt: 25, textAlign: 'center' }}>
            <CircularProgress color="success" />
        </Box>
        </>
    )
};

export default Loading;