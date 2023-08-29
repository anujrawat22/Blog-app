import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../features/authSlice';



const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { role, user } = useSelector(state => state.auth);
    const settings = [user, 'Logout'];

    const handleLogout = () => {
        dispatch(Logout())
        navigate('/login')
    }

    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const renderNavbar = () => {
        if (isAuthenticated) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Blog App
                            </Typography>

                            <Button color="inherit"><Link to="/allposts">Posts</Link></Button>
                            {role === 'author' ?
                                <>
                                    <Button color="inherit"><Link to="/addpost">Add</Link></Button>
                                    <Button color="inherit"><Link to="/manage">Manage</Link></Button>
                                </>
                                : null
                            }
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Profile" src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            {setting === 'Logout' ? <Typography textAlign="center" onClick={handleLogout}>{setting}</Typography> :
                                                <Typography textAlign="center">{setting}</Typography>}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                        </Toolbar>
                    </AppBar>
                </Box>
            );

        } else {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Blog App
                            </Typography>
                            <Button color="inherit"><Link to="/allposts">Posts</Link></Button>
                            <Button color="inherit"><Link to="/login">Login</Link></Button>
                            <Button color="inherit"><Link to="/signup">Signup</Link></Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            );
        }
    };

    return <>{renderNavbar()}</>;
};

export default Navbar;
