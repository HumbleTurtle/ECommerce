import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { 
  Grid,
  Typography,
  CardActions,
  CardContent,
  Button,
  Card,
  GridSize,
} from "@mui/material";

import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Url, UrlObject } from 'url';
import { CartProductOrder, Product, ProductOrder } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { addProductOrder, CartState, removeProductOrder, updateProductOrder } from 'features/common/CartSlice';
import { DialogContext, DialogContextInterface } from 'app/context/DialogContext';
import { RootState } from 'app/store';

interface PageProps {
  productOrder: CartProductOrder,
  onRemove?: Function,
  onUpdate?: Function,
  isReadOnly?: boolean,
  xs?: boolean | GridSize | undefined,
}

export const CartProductCard = ({productOrder, onRemove, onUpdate, isReadOnly, xs}: PageProps) => {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(productOrder.quantity);

  const cart : CartState = useSelector( (state:RootState) => state.cart );
  const {infoDialog} = useContext<any>(DialogContext);

  useEffect( () => {
    updateProductCart();
  }, [quantity])

  const increaseQuantity= () => {
    setQuantity(quantity+1); 
  }

  const decreaseQuantity= () => {
    if (quantity> 1) {
      setQuantity(quantity-1)
    }    
  }

  const removeFromCart = () => {
    dispatch(removeProductOrder(productOrder))
  }

  const updateProductCart = () => {
    dispatch(updateProductOrder({...productOrder, quantity}))
  }


  const product = productOrder.product;

  return <Grid item key={product.pk} xs={xs}>
    <Card sx={{ width:'100%', margin:'10px 0', '& img': {maxWidth:'100%', height:'120px'}}}>
      <CardContent>
        <Grid container>

          <Grid item xs={12} sm={4}>
            <img src={product.image} alt="imagee"/>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Typography variant="h5" component="div">
              {product.name}
            </Typography>
            
            <Typography variant="body1">
              {product.description}
            </Typography>
            <br/>
            <Typography variant="body1">
              Quantity: {quantity} | Price: {product.price}
            </Typography>

            <Typography variant="body1">
              Total: {quantity * product.price}
            </Typography>
            <br />
            {
              !isReadOnly &&
              <>
              <Button variant="contained" onClick={increaseQuantity}>+</Button> <Button variant="contained" onClick={decreaseQuantity}>-</Button>
              </>
            }
          </Grid>
        </Grid>

      </CardContent>
      <CardActions sx={{display:'flex', flexDirection:'row-reverse'}}>
        {
          !isReadOnly &&
          <Button variant="contained" onClick={()=>{removeFromCart()}}> <RemoveShoppingCartIcon/>&nbsp; Remove from cart </Button>     
        }
      </CardActions>
    </Card>
  </Grid>
}

CartProductCard.defaultProps = {
  quantity: 1,
  isReadOnly: false,
  xs: 3,
  onRemove: ()=>{},
};
