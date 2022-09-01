import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit';
import { CartProductOrder, Product, ProductOrder } from 'types';

export type CartState = {
  productOrders:  CartProductOrder[]
}

export const incrementAsync = createAsyncThunk(
  'cart/addProduct',
  async (product: Product) => {

  }
);

const cartSlice = createSlice({
  name: 'user',

  initialState : {
    productOrders: []
  } as CartState,

  reducers: {
    addProductOrder(state,{payload: productOrder} : {payload: CartProductOrder}) {
      state.productOrders.push(productOrder);
      return state;
    },

    removeProductOrder(state, { payload: productOrder } : { payload: CartProductOrder} ) {
      const index = state.productOrders.findIndex( (el) => el.uuid === productOrder.uuid );
      state.productOrders.splice( index, 1 );
      return state;
    },

    updateProductOrder(state, {payload: productOrder} : { payload: CartProductOrder}) {
      const index = state.productOrders.findIndex( (el) => el.uuid === productOrder.uuid );
      state.productOrders[index] = productOrder;
      return state;
    }
  },

  extraReducers: (builder) => {
    // builder.addMatcher( api.endpoints.postEntry.matchFulfilled,
    // (state,action) => {
    //   console.log("POST DATA", action)
    // })
  },
});

export const {addProductOrder, removeProductOrder, updateProductOrder} = cartSlice.actions;
export default cartSlice.reducer;
