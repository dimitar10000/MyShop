import {z} from 'zod'
import type { products,shopping_carts,wishlists,users } from '@prisma/client'
import type { UseMutationResult } from '@tanstack/react-query';

export const SignUpFormSchema = z.object({
    name: z
    .coerce
    .string()
    .min(3,{message: "Username must be at least 3 characters long."})
    .trim(),

    email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .trim(),

    password: z
    .string()
    .min(8,{message: "be at least 8 characters long."})
    .regex(/[a-zA-Z]/, {message: "contain at least one letter."})
    .regex(/[0-9]/,{message: "contain at least one number."})
    .regex(/[^a-zA-Z0-9]/, {message: "contain at least one special character."})
    .trim()
});

export type FormState =
    {
      errors: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type User  = {
  email: string
  givenName?: string
  familyName?: string
  phone?: string
  sub?: string
  created?: Date
}

export type Brand = {
  name: string
  image?: string | null
}

type Sex = "men" | "women";
type BodyPosition = "clothes" | "shoes";

type MenClothes = "jeans" | "shirts" | "t-shirts";
type MenShoes = "sneakers" | "boots" | "slippers";

type WomenClothes = "skirts" | "dresses" | "blouses";
type WomenShoes = "sandals" | "high heels" | "ankle boots";

export type Category = Sex | Sex & BodyPosition | MenClothes | MenShoes | WomenClothes | WomenShoes;

// coerce functions take prisma types and convert them to defined types by me
// for use in different parts of the application, we remove unnecessary properties

export function coerceToCartType( cart: shopping_carts | null) : ShoppingCart | null {
  if(cart === null) {
    return null;
  }

  const {id, ...rest} = cart;
  const withoutIdCart = {...rest};

  if((withoutIdCart as ShoppingCart) !== undefined) {
    return withoutIdCart as ShoppingCart;
  }

  return null;
}

export function coerceToListType( list: wishlists | null) : Wishlist | null {
  if(list === null) {
    return null;
  }

  const {id, ...rest} = list;
  const withoutIdList = {...rest};

  if((withoutIdList as Wishlist) !== undefined) {
    return withoutIdList as Wishlist;
  }
  
  return null;
}

export function coerceToUserType(user: users | null): User | null {
  if(user === null) {
    return null;
  }

  const {given_name: givenName, family_name: familyName, id, ...rest} = user;
  const modifiedUser = {givenName, familyName, ...rest};

  return modifiedUser;
}

export function coerceToProductArrayType( products: products[] | null) : Product[] | null {
  if(products === null) {
    return null;
  }

  let modifiedProducts = [];

  for(let i=0;i<products.length;i++) {
    const {id, id_,...rest} = products[i];
    const modifiedProduct = {id: id_,...rest};
    modifiedProducts.push(modifiedProduct);
  }

  if((modifiedProducts as Product[]) !== undefined) {
    return modifiedProducts as Product[];
  }

  return null;
}

export type ProductImage = {
  source: string
  description: string
  width: number | null
  height: number | null
}

export type Product = {
  id: number
  name: string
  price: number
  discountedPercent: number | null
  brand: Brand
  categories: Category[]
  image: ProductImage
}

export type ShoppingCart = {
  userID: string | undefined;
  items: Array<{
      productID: number,
      name: string,
      price: number,
      discountedPercent: number | null,
      brand: string,
      image: ProductImage,
      categories?: Category[]
      quantity: number
  }>
}

export type Wishlist = {
  userID: string | undefined;
  items: Array<{
      productID: number,
      name: string,
      price: number,
      discountedPercent: number | null,
      brand: string,
      categories?: Category[]
      image: ProductImage}>
}

export type WishlistItemType = (Wishlist['items'])[0];

export type ShoppingCartItemType = (ShoppingCart['items'])[0];

export type UserCookie = {
  name: string,
  cart: {id: number, quantity: number}[],
  wishlist: {id: number}[],
  email: string,
  expiration: Date
}

export function isWishlist(data: Wishlist | UserCookie): data is Wishlist {
  return (data as Wishlist).items !== undefined;
}

// functions to narrow the data type between products, shopping or wishlist items
export function isProduct(data: Product | WishlistItemType): data is Product {
  return (data as Product).id !== undefined;
}

export function isProduct2(data: Product | ShoppingCartItemType): data is Product {
  return (data as Product).id !== undefined;
}

export function isProduct3(data: Product | WishlistItemType | ShoppingCartItemType): data is Product {
  return (data as Product).id !== undefined;
}

type AsyncFunction = (...args: any[]) => Promise<void>;

export function isAsyncType(func: UseMutationResult | Function): func is AsyncFunction {
  return func.constructor.name === 'AsyncFunction';
}

export type Nullable<T> = T | null | undefined;