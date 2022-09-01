import React, { useEffect } from 'react';

import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Typography,
  CardActions,
  CardContent,
  Button,
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ClearIcon from '@mui/icons-material/Clear';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useGetProductsQuery} from 'api/api';
import { ProductCard } from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { MenuLateral } from 'features/common/MenuLateral';
import { BaseLayout } from 'features/common/BaseLayout';

function Home() {
  const query = useGetProductsQuery({});
  const navigate = useNavigate();

  useEffect(()=>{

  }, [query])

  return <BaseLayout>
      <Typography variant="h4">
        Products
      </Typography>

      <Grid container alignItems={'stretch'} spacing={1} direction='row' >
      {
        (query.isSuccess) &&
          query.data.results.map( (el:any) =>
            <ProductCard key={el.pk} product={el} />
          )
      }
      </Grid>

  </BaseLayout>
}

export default Home;