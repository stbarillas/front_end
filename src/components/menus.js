import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Menu2 from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";


function NavbarMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }

    function handleLogout() {
        handleClose();
        props.on_logout()
    }

    return (
        <div>
            <IconButton
                aria-label="More"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Menu2 />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to="/usersettings">
                    <MenuItem  onClick={handleClose}> User Settings</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

export {NavbarMenu}