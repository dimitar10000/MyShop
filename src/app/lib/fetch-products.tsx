import { cache } from 'react'
import { Nullable } from '@/app/lib/definitions';
import {coerceToProductArrayType} from '@/app/lib/definitions';
import { PrismaClient } from '@prisma/client'
import type { products } from '@prisma/client'

async function getProductsByCategories(categories: string[]) {
    const prisma = new PrismaClient();
    let res: products[] | null;
  
    try {
      res = await prisma.products.findMany({
        where: {
          categories: {
            hasEvery: categories
          }
        }
      })
    } catch (e: any) {
      console.error(e);
      return null;
    } finally {
      await prisma.$disconnect();
    };
  
    console.log("fetched products");
  
    const coerced = coerceToProductArrayType(res);
    return coerced;
  }
  
async function getProductsOnSale(categories: string[]) {
    const prisma = new PrismaClient();
    let res: products[] | null;
  
    try {
      res = await prisma.products.findMany({
        where: {
          AND: {
          discountedPercent: {
            not: null
          },
          categories: {
            hasEvery: categories
          }
        }
        }
      })
    } catch (e: any) {
      console.error(e);
      return null;
    } finally {
      await prisma.$disconnect();
    };
  
    console.log("fetched products on sale");
  
    const coerced = coerceToProductArrayType(res);
    return coerced;
  }

export const fetchProducts = cache(async (categories: Nullable<string[]>,sale?: Nullable<boolean>) => {
    let res;
    
    if (categories && sale) {
        res = await getProductsOnSale(categories);
    }
    else if (categories) {
        res = await getProductsByCategories(categories);
    }
    else {
        return null;
    }

    return res;
})