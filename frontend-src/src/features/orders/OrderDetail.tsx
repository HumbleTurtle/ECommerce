import React, { useContext } from 'react'
import { BaseLayout } from "features/common/BaseLayout"
import { useCancelOrderMutation, useGetOrderDetailQuery } from 'api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { CartProductCard } from 'features/cart/CartProductCard';
import { CartProductOrder, OrderStatusEnum, ProductOrder } from 'types';
import { Box, Button, Chip, Divider, Grid, IconButton, Typography } from '@mui/material';
import { formatDate } from 'util/DateUtil';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DialogContext, DialogContextInterface } from 'app/context/DialogContext';

export const OrderDetail = () => {
  const {pk} = useParams();
  const orderQuery = useGetOrderDetailQuery({ pk: parseInt( pk! ) });
  const [cancelOrder, cancelOrderResult] = useCancelOrderMutation({});

  const {confirmDialog} = useContext(DialogContext);

  const navigate = useNavigate();

  const data = orderQuery.data;

  const getStatusColor= (status?:{pk:number, name:string}|null) =>{
    if(!status) return 'default';

    if(status.pk === OrderStatusEnum.PENDING) return 'primary';
    if(status.pk === OrderStatusEnum.COMPLETED) return 'info';
    if(status.pk === OrderStatusEnum.CANCELLED) return 'error';
  }

  const handleCancelOrder = () => {

    confirmDialog({title:'Confirm', text:'¿Are you sure you want to cancel the order?', onAccept: async()=>{
      let pk = data.pk;
      await cancelOrder({pk})
    }})

  }
  return <BaseLayout>
    {
      orderQuery.isSuccess &&
      <Grid container xs={12} spacing={3}>
        <Grid item xs={12}
          sx={{
            alignItems:'center',
            display:'flex'
          }}
        >
          <IconButton size='large' onClick={()=>{navigate(-1)}}>
            <ArrowBackIcon></ArrowBackIcon>
          </IconButton>
          <Grid container component='span' sx={{alignItems:'center', display:'flex'}} spacing={1}>
            <Grid item>
              <Typography variant='h5' component={'span'}>
                Order detail
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={data.status?.name} size='medium' variant="outlined" color={getStatusColor(data.status)} />
            </Grid>
          </Grid>
        </Grid> 

        <Grid item container xs={12} spacing={3} sx={{ display:'flex', justifyContent:'space-between'}}>
          <Grid item sx={{alignItems:'flex-start', display:'flex'}}>
            <Typography variant="h5" component="span">Order status:</Typography> <Chip label={data.status?.name} size='medium' variant="outlined" color={getStatusColor(data.status)} />
          </Grid>

          <Grid item sx={{ alignItems:'center', display:'flex'}}>
            {
              data.status.pk === OrderStatusEnum.PENDING &&
              <Button variant="contained" onClick={handleCancelOrder}>Cancel order</Button>
            }
          </Grid>

        </Grid>

        <Grid item>
          <Typography component={'span'}>
            <Typography variant="h5">Request date:</Typography> { formatDate(data.create_date) }
          </Typography>
        </Grid>

        <Grid item>
          <Typography component={'span'}>
            <Typography variant="h5">Delivery date:</Typography> { formatDate(data.delivery_date) }
          </Typography>
        </Grid>


        <Grid item xs={12}>
        {          
          data.product_orders.map((el:CartProductOrder)=>{
            return <CartProductCard key={el.pk} productOrder={el} isReadOnly={true} xs={12} />
          })
        }
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' textAlign={'right'}> 
            Subtotal: { (data.product_orders.reduce( (sum:number, el:CartProductOrder) => sum + el.quantity * el.product.price, 0 )).toFixed(2) }    
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' textAlign={'right'}>
            Taxes: { (data.product_orders.reduce( (sum:number, el:CartProductOrder) => sum + el.quantity * el.product.price, 0) *0.1).toFixed(2)  }        
          </Typography>
        </Grid>

        <Divider/>

        <Grid item xs={12}>
          <Typography variant='h5' textAlign={'right'} paddingY={'1rem'}>
              Total: { ( data.product_orders.reduce( (sum:number, el:CartProductOrder) => sum + el.quantity * el.product.price, 0 ) * 1.1).toFixed(2) }
          </Typography>
        </Grid>

      </Grid>
    }


  </BaseLayout>
}