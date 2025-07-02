import React from "react";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Chat from "./Chat";
import { APP_NAME } from "../env";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import BasePage from "../pages/BasePage";

function LayoutAppContent({ userName, handleClickOpen }) {
  const location = useLocation();
  const showAppBar = false; // Nunca mostrar AppBar

  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }} />
      <CssBaseline />

      {showAppBar && (
        <AppBar position="static" color="default" elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Toolbar sx={{ flexWrap: "wrap", p: 1, m: 0 }}>
            <Typography variant="h6" color="primary" noWrap sx={{ flexGrow: 1 }}>
              {APP_NAME}
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "inline" } }}>
              <Chip
                sx={{ border: 0, fontSize: "0.95em" }}
                label={userName}
                variant="outlined"
                icon={<SentimentSatisfiedAltIcon />}
              />
            </Box>
          </Toolbar>
        </AppBar>
      )}

      <Routes>
        <Route path="/" element={<BasePage />} />
      </Routes>

      <Box sx={{ position: "fixed", bottom: "8px", right: "12px" }}>
        <IconButton onClick={handleClickOpen}>
          <CloudOutlinedIcon />
        </IconButton>
      </Box>
    </>
  );
}

function LayoutApp() {
  const [userName, setUserName] = React.useState("Guest User");
  const [open, setOpen] = React.useState(false);

  const effectRan = React.useRef(false);
  useEffect(() => {
    if (!effectRan.current) {
      console.log("effect applied - only on the FIRST mount");
    }
    return () => (effectRan.current = true);
  }, []);

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#44B8AC",
      },
      secondary: {
        main: "#006f66",
      },
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <LayoutAppContent userName={userName} handleClickOpen={handleClickOpen} />

        <Dialog fullWidth maxWidth="xl" open={open} onClose={handleClose}>
          <DialogTitle>Amazon Bedrock</DialogTitle>
          <DialogContent>
            <img src="/images/gen-ai-assistant-diagram.png" width="100%" alt="Diagram" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Router>
    </ThemeProvider>
  );
}

export default LayoutApp;
