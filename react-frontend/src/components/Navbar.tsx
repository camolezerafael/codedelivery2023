// @flow
import {FunctionComponent} from "react";
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import DriverIcon from "@mui/icons-material/DriveEta"

export const Navbar: FunctionComponent = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="secondary" aria-label="menu">
                    <DriverIcon/>
                </IconButton>
                <Typography variant="h6" color="secondary">Code Delivery</Typography>
            </Toolbar>
        </AppBar>
    );
};