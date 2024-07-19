import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";

const Footer = () => {
    return(
        <>
        <Box sx={{
            borderColor: 'dvider',
            borderTop: '1px solid',
            display: 'flex',
            justifyContent: 'space-between',
            mt: 'auto',
            px: { xs: 2, sm: 4, md: 8},
            py: 4,
            width: '100%'
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
        </>
    );
};

export default Footer;