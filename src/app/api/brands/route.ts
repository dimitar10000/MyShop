export const dynamic = 'force-static'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

async function getBrands() {
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
  }

export async function GET(request: Request) {
    const brands = await getBrands();

    return NextResponse.json({brands: brands});
}