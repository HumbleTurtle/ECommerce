import {createApi, fetchBaseQuery,} from '@reduxjs/toolkit/query/react';
import { Destination, Order } from 'types';
import {getCookie} from './helper';

export const api = createApi({
  reducerPath: 'api/',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers, {getState}) => {
      const cookie =  getCookie('csrftoken');

      headers.set('Access-Control-Allow-Origin', '*');
      if (cookie) {
        headers.set('X-CSRFToken', cookie);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({page = 1, limit = 10}) => {
        return `products/?offset=${ (page-1* limit) }&limit=${limit}`;
      },
    }),

    getAddresses: builder.query({
      query: ({page = 1, limit = 10}) => {
        return `destinations/?offset=${( (page-1)* limit)}&limit=${limit}`;
      },

      providesTags: (result, error, arg) => {
        return ['addresses', ...result.results.map((address:Destination)=> `address${address.pk}` )];
      },
    }),

    getOrderDetail: builder.query({
      query: ({pk}: {pk:number}) => {
        return `orders/${pk}`;
      },
      providesTags:(result, error, arg) => {
        return [`order${arg.pk}`] as any
      },
    }),

    getOrders: builder.query({
      query: ({page = 1, limit = 5}) => {
        return `orders/?offset=${((page-1)* limit)}&limit=${limit}`;
      },

      providesTags: (result, error, arg) => {
        return ['orders', ...result.results.map((order:Order)=> `order${order.pk}` )];
      },
    }),

    cancelOrder: builder.mutation({
      query:({pk}:{pk:number}) => {
        return {
          url: `orders/${pk}/cancel/`,
          method: 'PUT'
        };
      },
      invalidatesTags:(result, error, arg) => {
        return [`order${arg.pk}`] as any
      },
    }),

    saveAddress: builder.mutation({
      query: ({address, city, long, lat}) => {
        return {
          url: `destinations/`,
          method: 'POST',
          body: JSON.stringify({address, city: city.pk, long, lat}),
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        };
      },

      invalidatesTags: (result, error, arg) => {
        return [`addresses`] as any;
      },
    }),

    sendOrder: builder.mutation({
      query: ({ productOrders: product_orders, deliveryDate: delivery_date, destination }) => {
        return {
          url: `orders/`,
          method: 'POST',
          body: JSON.stringify({ product_orders, delivery_date, destination }),
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        };
      },
    }),

    getCities: builder.query({
      query: ({page = 1, limit = 10}) => {
        return `cities/?page=${(page-1* limit)}&limit=${limit}`;
      },
    }),

    login: builder.mutation({
      query: ({username, password}) => {
        return {
          url: `login/`,
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        };
      },
    }),

    register: builder.mutation({
      query: ({username, email, password, confirmationPassword}) => {
        return {
          url: `register/`,
          method: 'POST',
          body: JSON.stringify({username, email, password, confirmationPassword}),
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        };
      },
    }),

    logout: builder.mutation({
      query: () => {
        return {
          url: `logout/`,
          method: 'POST',
        };
      },
    }),
  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetProductsQuery,
  useGetAddressesQuery,
  useGetCitiesQuery,
  useSaveAddressMutation,
  useSendOrderMutation,
  useGetOrdersQuery,
  useGetOrderDetailQuery,
  useCancelOrderMutation,
} = api