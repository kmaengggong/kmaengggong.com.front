import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";

const Footer = () => {
    return(
        <>
        <Box sx={{
            borderColor: '#808080',
            borderTop: '1px solid',
            mt: 'auto',
            width: '100%'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: { xs: 2, sm: 4, md: 8},
                py: 4
            }}>
            <div>
                <Typography color="text.secondary" variant="body2" mt={1}>
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
                    aria-label="GitHub"
                    color="inherit"
                    href="https://github.com/kmaengggong"
                    sx={{alignSelf: 'center'}}
                >
                    <GitHubIcon />
                </IconButton>
            </Stack>
            </Box>
        </Box>
        </>
    );
};

export default Footer;