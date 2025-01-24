import React, { useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    IconButton,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    CssBaseline,
    Drawer,
    Snackbar,
    Alert,
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { FacebookLoginHelper, LoginResponse } from '../../utils/facebookLoginHelper';
import { NavItem } from './NavItem';
import { useAuth } from '../../utils/authProvider';

const drawerWidth = 240;
const navItems = [
    new NavItem('Home', '/'),
    new NavItem('Browse Events', '/events'),
    new NavItem('Create Event', '/events/new'),
    new NavItem('Registered Events', '/events/registered'),
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const { setAccessToken, isAuthenticated } = useAuth();
    const [name, setName] = React.useState('');

    const handleLoginClick = async () => {
        try {
            const loginResponse: LoginResponse = await FacebookLoginHelper.checkLoginStatus();

            if (loginResponse.status === 'connected') {
                setAccessToken(loginResponse.accessToken);
                setName(loginResponse.userInfo?.name ?? '');
                setSnackbarMessage('Login successful!');
                setOpenSnackbar(true);
            } else {
                setSnackbarMessage('Login failed. Please try again.');
                setName('');
                setAccessToken(null);
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error(`Error during login: ${error}`);
            setSnackbarMessage('An error occurred. Please try again later.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                VibeSync
            </Typography>
            <Divider />
            <List>
                {navItems.map((navItem) => (
                    <ListItem key={navItem.text} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={navItem.to}>
                            <ListItemText primary={navItem.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                try {
                    const response = await FacebookLoginHelper.checkLoginStatus();
                    console.log('response:', response);
                    setName(response.userInfo?.name ?? '');
                } catch (error) {
                    console.error('Error fetching Facebook user info:', error);
                }
            }
        };

        fetchData();
    }, [isAuthenticated]);

    return (
        <Box sx={{ display: 'flex', mb: 10 }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-start', flexGrow: 1 }}>
                        {navItems.map((navItem) => (
                            <Button key={navItem.text} sx={{ color: '#fff' }} component={Link} to={navItem.to}>
                                {navItem.text}
                            </Button>
                        ))}
                    </Box>

                    {!isAuthenticated && (
                        <Button color="inherit" onClick={handleLoginClick}>
                            Login
                        </Button>
                    )}
                    {isAuthenticated && (
                        <Typography variant="h6">Welcome, {name}</Typography>
                    )}
                </Toolbar>
            </AppBar>

            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Outlet />
        </Box>
    );
};

export default Navbar;