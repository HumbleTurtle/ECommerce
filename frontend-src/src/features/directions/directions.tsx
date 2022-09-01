import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { useGetAddressesQuery, useGetProductsQuery } from 'api/api';
import { DialogContext, DialogContextInterface } from 'app/context/DialogContext';
import { MenuLateral } from 'features/common/MenuLateral';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddressForm } from './addressForm';
import { Marker, Map, Draggable } from 'pigeon-maps';
import { BaseLayout } from 'features/common/BaseLayout';

export const Directions = () => {

  const { data, error, isSuccess} = useGetAddressesQuery({});
  const navigate = useNavigate()

  const {modalDialog} = useContext(DialogContext) as DialogContextInterface;

  const openDialogNewAddress = () => {
    const handleClose = modalDialog({
      title: "Yes",
      content: <AddressForm key={nanoid()} onSave={()=>{ handleClose() }}/>
    })
  }

  return <BaseLayout>
          <Typography variant='h3'>
          My addresses
        </Typography>
 
        <Box sx={{marginBottom:2, marginTop:1}}>
          <Button variant="contained" onClick={openDialogNewAddress}>New address</Button>
        </Box>

        <Stack spacing={2}>
          {(isSuccess) &&
            React.Children.toArray(
              data.results.map((el:any) => 
                <Card sx={{width:'100%', textAlign:'left'}} key={el.pk}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Map height={200} width={200} mouseEvents={false} touchEvents={false} defaultCenter={[el.lat, el.long]} defaultZoom={13}>
                          <Marker 
                            width={60} height={60}
                            anchor={[el.lat, el.long]} 
                          />            
                      </Map>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant='h6'>
                        Address {el.address}
                      </Typography>
                      <Typography variant='body1'>
                        City {el.city?.name||""}
                      </Typography>
                    </Grid>
                  </Grid>

                </Card> )
            )
          }
        </Stack>
        
  </BaseLayout>

}