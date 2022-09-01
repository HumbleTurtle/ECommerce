import { Button, Card, CardActionArea, CardActions, CardContent, Chip, Grid, Typography } from "@mui/material"

import { useNavigate } from "react-router-dom";
import { Order, OrderStatusEnum } from "types"
import { formatDate } from "util/DateUtil";

export const OrderRow = ({order}:{order: Order}) => {
  const navigate = useNavigate();
  
  const goToDetail = (pk: number) => {
    navigate(`/orders/${pk}`)
  }
  const getStatusColor= (status?:{pk:number, name:string}|null) =>{
    if(!status) return 'default';

    if(status.pk === OrderStatusEnum.PENDING) return 'primary';
    if(status.pk === OrderStatusEnum.COMPLETED) return 'info';
    if(status.pk === OrderStatusEnum.CANCELLED) return 'error';
  }

  return <Card>
    <CardContent>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Typography variant="h6">
            <Chip label={order.status?.name} variant="outlined" color={getStatusColor(order.status)} />  Order #{order.pk}  
          </Typography>
          <Grid item container spacing={2} sx={{alignItems:'baseline', marginTop:0.1}}>            
            <Grid item xs={12}>
              <Typography variant="body2">  
                  Created: { formatDate(order.create_date) }
              </Typography>

              <Typography variant="body2">
                Delivery date: { formatDate(order.delivery_date) }
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle2">
                Total: {order.total}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                Status:   
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="contained" size="medium" onClick={()=>{ goToDetail(order.pk) }}>Detail</Button>
        </Grid>
      </Grid>
    </CardContent>
    <CardActions>
      
    </CardActions>
  </Card>
}