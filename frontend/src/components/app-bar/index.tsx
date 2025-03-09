import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  AppBar as _AppBar,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { getErrorMessage } from "../../backend/error";
import { useSnackBar } from "../../snackbar";
import { logoutAction } from "./action";

const drawerWidth = 240;

export const AppBar: FC<{
  window?: () => Window;
  links: { name: string; link: string }[];
  title?: string;
}> = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const navigate = useNavigate();

  const { showSnackBar } = useSnackBar();

  const { setAuth } = useAuth();

  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess() {
      setAuth(null);
      navigate("/");
    },
    onError(err) {
      showSnackBar("error", `Unable to logout: ${getErrorMessage(err)}`);
    },
  });

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography sx={{ my: 2 }}>{props.title || "Spirit11"}</Typography>
      <Divider />
      <List>
        {props.links.map((item) => (
          <Link to={item.link} key={item.name}>
            <ListItem>
              <ListItemButton>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <ListItem>
          <ListItemButton
            disabled={logoutMutation.isPending}
            onPointerDown={() => {
              logoutMutation.mutate();
            }}
          >
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <_AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {props.title || "Spirit11"}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {props.links.map((item) => (
              <Link key={item.name} to={item.link}>
                <Button sx={{ color: "#fff" }}>{item.name}</Button>
              </Link>
            ))}
            <Button
              sx={{ color: "#fff" }}
              onClick={() => {
                logoutMutation.mutate();
              }}
              loading={logoutMutation.isPending}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </_AppBar>
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
    </>
  );
};
