import { Button, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React from "react"
import { MenuLateral } from "./MenuLateral"
import { 
  Box,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ClearIcon from "@mui/icons-material/Clear";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LiquorIcon from '@mui/icons-material/Liquor';
import LiquorTwoToneIcon from '@mui/icons-material/LiquorTwoTone';
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "api/api";

const drawerWidth = 250;


const LateralBar = styled( Grid, {shouldForwardProp: (prop) => prop !=='open' })<{
  open?: boolean
}>(({theme, open})=> ({
  overflowX:'hidden',
  width:0,
  position:'fixed',
  transition: theme.transitions.create('width',{
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open &&{
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: `${drawerWidth}px`,
  })
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const BaseLayout = ({children} : {children: React.ReactNode}) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  
  const [logout, logoutResult] = useLogoutMutation();

  const handleLogout = async () => {
    await logout({}).unwrap();
    localStorage.removeItem('user');
  }
  return <React.Fragment> 
    <Grid container sx={{paddingX:'1rem'}}>
      <LateralBar item open={open}> 
        <Box>
          <Box sx={{ width: `${drawerWidth}px`, maxWidth: `${drawerWidth}px`, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <Box sx={{
              margin:'1rem 1rem',
              float: 'left',
            }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
            </Box>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>{navigate('/')}} >
                  <ListItemIcon>
                    <LiquorTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>{navigate('/cart')}} >
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="My cart" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>{navigate('/directions')}} >
                  <ListItemIcon>
                    <AddLocationAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="My addresses" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>{navigate('/orders')}} >
                  <ListItemIcon>
                    <ReceiptLongIcon />
                  </ListItemIcon>
                  <ListItemText primary="My orders" />
                </ListItemButton>
              </ListItem>

            </List>
          </nav>
          <Divider />
          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          </Box>
        </Box>
      </LateralBar>

      <Grid item xs>
        <Main open={open}>
          <Button onClick={()=>{setOpen(!open)}}>Clik</Button>

            {children}
        </Main>
      </Grid>


    </Grid>
  </React.Fragment>
}