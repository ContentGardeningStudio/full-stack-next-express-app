"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/redux/features/authSlice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { removeAuthLocalStorage } from "@/src/lib/common";

const drawerWidth = 240;

const LinkItem = ({ title, ...props }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton {...props}>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

function Header(props) {
  const { window } = props;
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    removeAuthLocalStorage();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        My Old library
      </Typography>
      <Divider />
      <List>
        <LinkItem title="Home" href="/" />
        <LinkItem
          title="Add a book"
          href={isAuthenticated ? "/new-book" : "/sign-in"}
        />
        {isAuthenticated ? (
          <LinkItem title="Logout" onClick={handleLogout} />
        ) : (
          <LinkItem title="Sign in" href="/sign-in" />
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar className="container" sx={{ height: 64 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            My Old library
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }} href="/">
              Home
            </Button>
            <Button
              sx={{ color: "#fff" }}
              href={isAuthenticated ? "/new-book" : "/sign-in"}
            >
              Add a book
            </Button>

            {isAuthenticated ? (
              <Button sx={{ color: "#fff" }} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button sx={{ color: "#fff" }} href="/sign-in">
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Header;
