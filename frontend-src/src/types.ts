import { nanoid } from "@reduxjs/toolkit";

export type Product = {
  pk: number,
  name: string,
  description: string,
  image: string,
  price: number,
}

export type Destination = {
  pk: string,
  address: string,
  city: City,
  long: number,
  lat:number
}

export type City ={
  pk: number,
  name: string
}

export type ProductOrder = {
  uuid?: string,
  pk?: number,
  product: Product | number,
  quantity: number,
  price?: number
}

export type CartProductOrder = Omit<ProductOrder, 'product'> & {product: Product};

export type OrderStatus = {
  pk: number,
  name: string
}

export type Order = {
  pk: number,
  productOrders: ProductOrder[],
  destination: Destination,
  total: number | null,
  create_date: Date | null,
  delivery_date: Date | null,
  status: OrderStatus | null,
}

export function ProductOrderObject({product, quantity}: {product:Product, quantity: number}) : CartProductOrder {
  return {
    uuid: nanoid(), 
    product, 
    quantity,
    price: product.price
  }
}

export enum OrderStatusEnum {
  PENDING=1,
  COMPLETED=2,
  CANCELLED=3
}