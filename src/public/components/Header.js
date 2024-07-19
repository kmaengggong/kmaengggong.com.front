import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// import ToggleColorMode from './ToggleColorMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { useIsLoginState } from '../../member/contexts/IsLoginContext';
import getMemberId from '../../member/components/getMemberId';

// const theme = createTheme({});

const Header = ({ mode, toggleColorMode }) => {
    const isLogin = useIsLoginState();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [memberId, setMemberId] = useState(null);

    useEffect(() => {
        if(isLogin){
            setMemberId(getMemberId());
        }
    }, []);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const onClickHomeButton = () => {
        navigate(`/`);
    };
    const onClickUserListButton = () => {
        navigate(`/member`);
    };
    const onClickBoarListButton = () => {
        navigate(`/board`);
    };
    const onClickShrimpButton = () => {
        navigate(`/shrimp`);
    };
    const onClickSignInButton = () => {
        navigate(`/signin`);
    };
    const onClickSignUpButton = () => {
        navigate(`/signup`);
    };
    const onClickSignOutButton = () => {
        navigate(`/signout`);
    };
    const onClickMyPageButton = () => {
        navigate(`/member/${memberId}`);
    }

    const DrawerList = (
    <>
    <Box
        onClick={toggleDrawer(false)}
        role="presentation"
        sx={{width: 250}}
    >
        <Toolbar sx={{ display:'flex',  justifyContent:'space-between', my: 0, width: '100%' }}>
            <ListItem>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemButton>
                    <ListItemText primary="로고들어갈자"></ListItemText>
                </ListItemButton>
            </ListItem>
        </Toolbar>
        <Divider />
        <List>
            <ListItem>
                <ListItemButton onClick={onClickUserListButton}>
                    <ListItemIcon>
                        임시
                    </ListItemIcon>
                    <ListItemText primary="Member"></ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={onClickBoarListButton}>
                    <ListItemIcon>
                        <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Board"></ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={onClickBoarListButton}>
                    <ListItemIcon>
                        <LunchDiningIcon />
                    </ListItemIcon>
                    <ListItemText primary="Shrimp"></ListItemText>
                </ListItemButton>
            </ListItem>
            {isLogin ? 
            <>
            <ListItem>
                <ListItemButton onClick={onClickMyPageButton}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Page"></ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={onClickSignOutButton}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out"></ListItemText>
                </ListItemButton>
            </ListItem>
            </>
            :
            <>
            <ListItem>
                <ListItemButton onClick={onClickSignInButton}>
                    <ListItemIcon>
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign In"></ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={onClickSignUpButton}>
                    <ListItemIcon>
                        <AssignmentIndIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Up"></ListItemText>
                </ListItemButton>
            </ListItem>
            </>
            }
        </List>
    </Box>
    </>
    );

    return(
        <>
        <Box sx={{
            borderColor: '#808080',
            borderBottom: '1px solid',
            width: '100%'
        }}>
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 4, md: 8},
          py: 1
        }}>
            <IconButton
                onClick={toggleDrawer(true)}
                size="large"
                sx={{ display: { xs: 'flex', sm: 'none'} }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                onClose={toggleDrawer(false)}
                open={open}
                sx={{ display: { xs: 'flex', sm: 'none'} }}
            >
                {DrawerList}
            </Drawer>

            <Box sx={{ py: 1, display: { xs: 'none', sm: 'flex' }}}>
                <MenuItem onClick={onClickHomeButton}>
                    <Typography>Home</Typography>
                </MenuItem>
                <MenuItem onClick={onClickUserListButton}>
                    <Typography>Member</Typography>
                </MenuItem>
                <MenuItem onClick={onClickBoarListButton}>
                    <Typography>Board</Typography>
                </MenuItem>
                <MenuItem onClick={onClickShrimpButton}>
                    <Typography>Shrimp</Typography>
                </MenuItem>
                {isLogin ? 
                <>
                <MenuItem onClick={onClickMyPageButton}>
                    <Typography>My Page</Typography>
                </MenuItem>
                <MenuItem onClick={onClickSignOutButton}>
                    <Typography>Sign Out</Typography>
                </MenuItem>
                </>
                :
                <>
                <MenuItem onClick={onClickSignInButton}>
                    <Typography>Sign In</Typography>
                </MenuItem>
                <MenuItem onClick={onClickSignUpButton}>
                    <Typography>Sing Up</Typography>
                </MenuItem>
                </>
                }
            </Box>

            {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
            {/* {windowWidth} */}
            {/* {windowWidth < 600 ?
            <>
            <IconButton size="large" onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
            </>
            :
            <>
            <MenuItem onClick={onClickHomeButton}>
                <Typography>홈으로</Typography>
            </MenuItem>
            <MenuItem onClick={onClickUserListButton}>
                <Typography>회원목록</Typography>
            </MenuItem>
            <MenuItem onClick={onClickBoarListButton}>
                <Typography>글목록</Typography>
            </MenuItem>
            {isLogin ? 
            <>
            <MenuItem onClick={onClickSignOutButton}>
                <Typography>로그아웃</Typography>
            </MenuItem>
            </>
            :
            <>
            <MenuItem onClick={onClickSignInButton}>
                <Typography>로그인</Typography>
            </MenuItem>
            <MenuItem onClick={onClickSignUpButton}>
                <Typography>회원가입</Typography>
            </MenuItem>
            </>
            }
            </>
            }
            <Box sx={{flexGlow: 0}}>
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box> */}
        </Toolbar>
        </Box>
        </>
    );
}

Header.propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    toggleColorMode: PropTypes.func.isRequired,
};

export default Header;