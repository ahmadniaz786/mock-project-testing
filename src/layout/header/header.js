import * as React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, RbLogo, DashboardIcon, ProductsIcon, LogoutIcon } from '../../assets/Icons/index';
import styled from '@emotion/styled';
import { AppBar, Box, Button, Toolbar } from '@mui/material';


// Styled Components
const CustomAppBar = styled(AppBar)({
    width: '100%',
    background: '#fff',
    color: '#02A996',
    boxShadow: 'none',
    position: "fixed",
    padding: '0px 10px'
});

const CustomToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
});

const styles = {
    active: {
        borderBottom: '5px solid #02A996',
        borderRadius: '0px'
    }
}

export const Header = () => {

    const [activeBtn, setActiveBtn] = React.useState('home');

    const updateActiveBtn = (val) => {
        setActiveBtn(val)
    }

    const logout = () => {
        if (process.env.NODE_ENV !== 'development') {
            window.SiebelApp.S_App.LogOff();
        }
    }

    const navButton = (value, name, icon) => {
        return (
            <Button variant="text"
                component={Link}
                to={name}
                style={activeBtn === name ? styles.active : null}
                onClick={updateActiveBtn.bind(this, name)}>
                <Box display="flex" flexDirection="column" textAlign="center">
                    <Box>
                        {icon}
                    </Box>
                    <Box textTransform="none">
                        {value}
                    </Box>
                </Box>
            </Button>
        )
    }

    return (
        <CustomAppBar data-testid="content-header">
            <CustomToolbar disableGutters>
                <Button component={Link} to="/" onClick={updateActiveBtn.bind(this, 'home')}>
                    {RbLogo()}
                </Button>

                <Box sx={{ display: { md: 'flex' }, gap: 5 }}>
                    {navButton('HOME', '/', <HomeIcon />)}
                    {navButton('PRODUCTS', 'products', <ProductsIcon />)}
                    {/* {navButton(RBConsts.LangConst[langCode]?.NAV.SERVICES, 'services', <ServicesIcon />)} */}
                    {/* {navButton(RBConsts.LangConst[langCode]?.NAV.DASHBOARD, 'dashboard', <DashboardIcon />)} */}
                </Box>

                <Button onClick={logout} >
                    <Box display="block">
                        <Box sx={{ transform: 'ENU' === "ENU" ? null : "rotate(180deg)" }}>
                            <LogoutIcon />
                        </Box>
                        <Box textTransform="none" >
                            LOGOUT
                        </Box>
                    </Box>
                </Button>
            </CustomToolbar>
        </CustomAppBar >
    );
}

