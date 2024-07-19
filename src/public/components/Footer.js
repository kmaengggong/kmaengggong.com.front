import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";

const Footer = () => {
    return(
        <>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 'auto',
            py: 4,
            px: { xs: 2, sm: 4, md: 8},
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'dvider',
        }}>
            <div>
                <Typography variant="body2" color="text.secondary" mt={1}>
                    {'Copyright © '}
                    <Link href="#">kmaengggong&nbsp;</Link>
                    {'2024'}
                </Typography>
            </div>
            <Stack
                direction="row"
                justify="left"
                spacing={1}
                useFlexGap
                sx={{color: 'text.secondary'}}
            >
                <IconButton
                    color="inherit"
                    href="https://github.com/kmaengggong"
                    aria-label="GitHub"
                    sx={{alignSelf: 'center'}}
                >
                    <GitHubIcon />
                </IconButton>
            </Stack>
        </Box>
        </>
    );
};

export default Footer;