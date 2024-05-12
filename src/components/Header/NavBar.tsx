import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const leftFeatures = [{
    name: 'Matches',
    link: '/matches',
}, {
    name: 'Results',
    link: '/results',
}, {
    name: 'Fixtures',
    link: '/fixtures',
}, {
}, {
    name: 'Stats',
    link: '/stats',
}];

const rightFeatures = [
    {
        name: 'Sign In',
        link: '/sign-in',
    },
]

function NavBar() {
    const [isOpenMenu, setIsOpenMenu] = useState<null | HTMLElement>(null);

    const handleOpenMenuIcon = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpenMenu(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setIsOpenMenu(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#37003c', }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ minHeight: '48px !important' }}>
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        mx: 2,
                    }}>
                        <img src='assets/images/main/pl-main-logo.png' alt='logo' style={{ width: '50px', height: '50px' }} />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenMenuIcon}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={isOpenMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(isOpenMenu)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {leftFeatures.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link to={`${page.link}`} style={{ textDecoration: 'none' }}>
                                        {page.name}
                                    </Link>
                                </MenuItem>
                            ))}

                            {rightFeatures.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link to={`${page.link}`} style={{ textDecoration: 'none' }}>
                                        {page.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                    }}>
                        <img src='assets/images/main/pl-main-logo.png' alt='logo' style={{ width: '50px', height: '50px' }} />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {leftFeatures.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 0, mx: 1, color: 'white', display: 'block', fontWeight: 700 }}
                            >
                                <Link to={`${page.link}`} style={{ textDecoration: 'none', color: 'white' }}>
                                    {page.name}
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {rightFeatures.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 0, mx: 1, color: 'black', display: 'block', fontWeight: 700, backgroundColor: 'white' }}
                            >
                                <Link to={`${page.link}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    {page.name}
                                </Link>
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar;
