import { 
  Stack,

  Box,
  Typography,
  Grid,
  Container,
  CardContent,
  Card,
  Button,
  CardActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  TextField,
  IconButton
} from "@mui/material";
import { RootState } from "app/store";
import { CartState, removeProductOrder } from "features/common/CartSlice";
import React, { ReactEventHandler, useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { Map, Marker } from "pigeon-maps"
import { Destination, Product, ProductOrder } from "types";
import { CartProductCard } from "./CartProductCard";
import { useGetAddressesQuery, useSendOrderMutation } from "api/api";
import { theme } from "theme";
import { AddressForm } from "features/directions/addressForm";
import { DialogContext, DialogContextInterface } from "app/context/DialogContext";

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Cart = () => {
  
  const addressQuery = useGetAddressesQuery({});
  const [address, setAddress] = useState<Destination>();
  const [deliveryDate, setDeliveryDate] = useState(dayjs());

  const cart : CartState = useSelector( (state:RootState) => state.cart );


  const [sendOrder, sendOrderResult] = useSendOrderMutation({});

  const {modalDialog} = useContext(DialogContext) as DialogContextInterface;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChangeAddress= (el:Destination) => {
    console.log(el)
    setAddress(el) 
  }
  
  const openDialogNewAddress = () => {
    const handleClose = modalDialog({
      title: "Yes",
      content: <AddressForm onSave={()=>{ handleClose() }}/>
    })
  }

  const handleSendOrder = async () => {
    const order = {
      productOrders: cart.productOrders.map( 
        el => { 
          return {
            product: el.product.pk as number, 
            quantity: el.quantity as number
          } 
        }
      ),
      destination: address!.pk,
      deliveryDate: deliveryDate.toDate(),
    }

    await sendOrder(order);
  }

  return <Container maxWidth="md" sx={{textAlign:'left', paddingBottom:'1rem'}}>
      <br/>
        <Box 
          sx={{
            alignItems:'center',
            display:'flex'
          }}
        >
          <IconButton size='large' onClick={()=>{navigate(-1)}}>
            <ArrowBackIcon></ArrowBackIcon>
          </IconButton>
          <Typography variant='h5' component={'span'}>Cart</Typography>
        </Box> 
      <br/>
      <br/>
      <Typography variant="h5">
        Choose address: <Button variant='contained' onClick={openDialogNewAddress}>New address</Button>

        <Box sx={{
            [theme.breakpoints.up('md')]: {
              maxHeight: '200px'
            },
            overflowY:'scroll' 
          }}>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Address</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {
              addressQuery.isSuccess &&
              addressQuery.data.results.map((el:Destination,index:number) => {
                return <FormControlLabel  control={<Radio value={JSON.stringify(el)} onClick={()=>{handleChangeAddress(el)}} />} 
                  label={
                    <Box sx={{paddingY:'0.3rem'}}>
                      <Typography> City: {(el.city?.name||"")} </Typography>
                      <Typography> Address: {el.address} </Typography>
                    </Box>
                  } />
              })
            }
            
          </RadioGroup>
        </FormControl>    

        </Box>
      </Typography>

      <br/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(props) => <TextField fullWidth {...props} />}
          label="Delivery on date"
          value={ Date.now() }
          onChange={( newValue:dayjs.Dayjs | null ) : void => {
            setDeliveryDate( newValue! );
          }}
        />
      </LocalizationProvider>

      <Stack
        sx={{ textAlign:'left' }}
              direction={{ xs: 'column', sm: 'column' }}
              spacing={{ xs: 1, sm: 1, md: 1 }}
            >
      {
        cart.productOrders.map((el, index)=> {
          const productOrder = el;
          
          return <CartProductCard productOrder={el} />
        })
      }
      
      </Stack>

    <Typography variant='h6' textAlign={'right'}> 
      Subtotal: { (cart.productOrders.reduce( (sum, el) => sum + el.quantity * el.product.price, 0 )).toFixed(2) }    
    </Typography>

    <Typography variant='h6' textAlign={'right'}>
      Taxes: { (cart.productOrders.reduce( (sum, el) => sum + el.quantity * el.product.price, 0) *0.1).toFixed(2)  }        
    </Typography>

    <Divider/>

    <Typography variant='h5' textAlign={'right'} paddingY={'1rem'}>
      Total: { ( cart.productOrders.reduce( (sum, el) => sum + el.quantity * el.product.price, 0 ) * 1.1).toFixed(2) }
    </Typography>

    <Button variant="contained" onClick={handleSendOrder} fullWidth>Place order</Button>
  </Container>
}
