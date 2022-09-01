import React, { FunctionComponent, useContext, useState } from 'react';
import { 
  Grid,
  Typography,
  CardActions,
  CardContent,
  Button,
  Card,
  Divider,
} from "@mui/material";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { Url, UrlObject } from 'url';
import { CartProductOrder, Product, ProductOrder, ProductOrderObject } from 'types';
import { useDispatch } from 'react-redux';
import { addProductOrder } from 'features/common/CartSlice';
import { DialogContext, DialogContextInterface } from 'app/context/DialogContext';
import { nanoid } from '@reduxjs/toolkit';

interface PageProps {
  product: Product;
  quantity?: number;
}

export const ProductCard = ({product, quantity: paramQuantity }: PageProps) => {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(paramQuantity||1);
  const {infoDialog} = useContext<any>(DialogContext);

  const increaseQuantity= () => {
    setQuantity(quantity+1); 
  }

  const decreaseQuantity= () => {
    if (quantity> 1)
      setQuantity(quantity-1)
  }

  const addToCart = () => {

    const productOrder : CartProductOrder= ProductOrderObject({
      product,
      quantity
    });

    dispatch(addProductOrder(productOrder))

    setQuantity(1);
    infoDialog( {title:"Success", text:"Product added to cart!"} )
  }

  return <Grid item key={product.pk} xs={12} md={2.2}>
    <Card sx={{ 
      position:'relative', width:'100%', margin:'10px', height:'100%', '& img': {maxWidth:'100%', width:'auto', maxHeight:'300px'}}}>
      <CardContent sx={{
          height: '100%',
          boxSizing:'border-box',
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between'
      }}>

        <Typography variant="h5" component="div">
          {product.name}
        </Typography>

        <img src={product.image} alt="imagee"/>
        
        <Typography variant="body1">
        {product.description}
        </Typography>

        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body2"  sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:1}}>         
              <Button variant="contained" onClick={decreaseQuantity}><RemoveIcon/></Button>
              Quantity: {quantity}
              <Button variant="contained" onClick={increaseQuantity}><AddIcon/></Button>  
            </Typography>            
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={addToCart} sx={{fontWeight:'bold'}}> <AddShoppingCartIcon/>&nbsp; Add to cart</Button>
          </Grid>
        </Grid>

      </CardContent>

    </Card>
  </Grid>
}

ProductCard.defaultProps = {
  quantity: 1
};
