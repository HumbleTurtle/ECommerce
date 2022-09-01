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

export const MenuLateral = () => {

  const navigate = useNavigate();
  
  const [logout, logoutResult] = useLogoutMutation();

  const handleLogout = async () => {
    await logout({}).unwrap();
    localStorage.removeItem('user');
  }
    
  return <Box sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}>
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
}