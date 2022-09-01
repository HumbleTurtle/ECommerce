import { Card, CardContent, Grid, Pagination, Stack, Typography } from "@mui/material"
import { useGetOrdersQuery } from "api/api"
import { BaseLayout } from "features/common/BaseLayout"
import { MenuLateral } from "features/common/MenuLateral"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Order } from "types"
import { OrderRow } from "./components/OrderRow"

export const OrdersPage = () => {
  let params = useParams();
  let navigate = useNavigate();

  const [page, setPage] = useState(1);
  const ordersQuery = useGetOrdersQuery({page: page})

  useEffect(()=>{
    if('pageNum' in params)
      setPage(parseInt(params?.pageNum||""))
  }, [params])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value:number) => {
    console.log(value)
    navigate(`/orders/page/${value}`)
  };

  if ( ordersQuery.isLoading )
    return <>"Loading.."</>

  return <BaseLayout>
      <Typography variant="h2">
      Orders

      <Stack
        sx={{ textAlign:'left' }}
              direction={{ xs: 'column', sm: 'column' }}
              spacing={{ xs: 1, sm: 1, md: 1 }}
            >
        {
          ordersQuery.isSuccess &&
          ordersQuery.data.results.map((order:Order) => 
            <OrderRow key={order.pk} order={order}></OrderRow>
          )     
        }
      </Stack>

      <Typography>Page: {page}</Typography>
      <Pagination count={ordersQuery.data.total_pages} page={page} onChange={handlePageChange} />

    </Typography>
  </BaseLayout>
}