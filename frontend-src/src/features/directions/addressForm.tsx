import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useGetCitiesQuery, useSaveAddressMutation } from 'api/api';
import { DialogContext, DialogContextInterface } from 'app/context/DialogContext';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { City } from 'types';
import { XMap } from './xMap';



export const AddressForm = ({onSave}:{onSave?: Function}) => {
  const citiesQuery = useGetCitiesQuery({});
  const [saveAddress, saveAddressResult] = useSaveAddressMutation();

  const {infoDialog} = useContext(DialogContext) as DialogContextInterface;
  
  const [anchor, setAnchor] = useState([] as Array<number>);
  
  const [city, setCity] = useState<City|null>(null);
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  useEffect(()=>{
    console.log(city)
  }, [city])

  const changeCity = ( city: City )=>{

    setCity(city)
  }

  const changeAddress =  (event: React.ChangeEvent<HTMLInputElement>)=>{
    setAddress(event.target.value);
  }

  const changeAnchor = (value:Array<number>)=>{
    console.log(value)
    setAnchor(value)
  }
 
  const handleSaveAddress = async () => {
    if (!city || address.length === 0){
      infoDialog({title:"Error!", text:"Please fill all the fields"})
      return
    }

    const payload = await saveAddress({
      lat: anchor[0],
      long: anchor[1],
      city,
      address,
    }).unwrap();

    onSave!();
  }

  return <Grid container sx={{minHeight:'100vh', paddingTop:'2rem', paddingX:'2rem'}}>
        <Grid item xs={12}>
          <Typography variant="h4">
            New address
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            fullWidth 
            id="outlined-basic" 
            label="Address" 
            variant="outlined" 
            onChange={changeAddress}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="city-label">City</InputLabel>
            <Select
              value={ city?.pk || "" }
              label="Age"
            >
                <MenuItem value="" defaultChecked={true}>
                  <em>None</em>
                </MenuItem>
              { 
                !citiesQuery.isFetching && citiesQuery.isSuccess &&
                  React.Children.toArray(citiesQuery.data.results.map( ((e:City)=><MenuItem onClick={()=>{changeCity(e)}} value={e.pk}>{e.name}</MenuItem> ) ) )
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <XMap onAnchorChange={changeAnchor}></XMap>
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={handleSaveAddress}>Save</Button>
        </Grid>
      </Grid>    
}

AddressForm.defaultProps = {
  onSave: () => {}
}