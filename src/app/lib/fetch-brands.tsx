import { cache } from 'react'
import { PrismaClient } from '@prisma/client'
import { Brand } from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'

export const fetchBrands = cache(async () => {
    const prisma = new PrismaClient();
    let res;
  
    try {
      res = await prisma.brands.findMany({
        omit: {
          id: true
        }
      })
    } catch (e: any) {
      console.error(e);
      return null;
    } finally {
      await prisma.$disconnect();
    };
    
    console.log("fetched brands");
  
    return res;
})

export const initializeBrandsOnClient = async (brandsSetter: Dispatch<SetStateAction<Brand[] | null>>) => {
  type FetchedType = {
    brands: Brand[] | null
  }
  
  const res = await fetch('/api/brands',
      {
          headers: {
              "Content-Type": "application/json"
          }
      }
  );

  if(res.ok) {
     let jsonResponse : FetchedType = await res.json();
     brandsSetter(jsonResponse.brands);
  }
}