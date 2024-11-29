import React from 'react';
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
    ListItemButton, ListItemText, CssBaseline, Drawer
} from '@mui/material';
import {Outlet} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;
const navItems = ["Home", "Placeholder01", "Placeholder02"];


const Navbar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleLoginClick = () => {
        checkLoginStatus(); // Check login status when modal opens
    };

    const checkLoginStatus = () => {
        window.FB.getLoginStatus(function (response: any) {
            statusChangeCallback(response);
        });
    };

    const statusChangeCallback = (response: any) => {
        console.log("Login status response:", response);

        if (response.status === "connected") {
            console.log("User is already logged in with Facebook!");

            fetchUserInfo(response.authResponse.accessToken);
        } else if (response.status === "not_authorized") {
            console.warn("User is logged into Facebook but not authorized for this app.");
        } else {
            console.warn("User is not logged into Facebook.");
            signupUser();
        }
    };

    // New signup logic when user is not logged in
    const signupUser = () => {
        console.log("Triggering signup flow...");

        window.FB.login(function (response: any) {
            if (response.authResponse) {
                console.log("User logged in with Facebook during signup.");

                fetchUserInfo(response.authResponse.accessToken);
            } else {
                console.warn("User cancelled the login or failed to log in.");
            }
        });
    };

    const fetchUserInfo = (accessToken: string) => {
        window.FB.api('/me', { fields: 'id,name,email' }, function(response: any) {
            console.log("User info:", response);
        });
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
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

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

                    <Box sx={{ display: {xs: 'none', sm: 'flex'}, justifyContent: 'flex-start', flexGrow: 1 }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }}>
                                {item}
                            </Button>
                        ))}
                    </Box>

                    <Button color="inherit" onClick={handleLoginClick}>Login</Button>
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

            <Outlet/>
        </Box>
    )
};

export default Navbar;
