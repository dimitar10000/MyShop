import { PrismaClient } from '@prisma/client'
import type { products, brands } from '@prisma/client'
import { coerceToProductArrayType, Category } from '@/app/lib/definitions';

export async function getProductsByQuery(query?: string) {
  if (!query) {
    return null;
  }

  const queryWords = query.split(' ');

  const prisma = new PrismaClient();
  let prods: products[] | null

  try {
    prods = await prisma.products.findMany();

  } catch (e: any) {
    console.error(e);
    return null;
  } finally {
    await prisma.$disconnect();
  };

  const filterCondition = (item: products) => {
    const prodWords = item.name.split(' ');

    return queryWords
      .every((queryWord) => prodWords
        .some((prodWord) => prodWord.toLowerCase().startsWith(queryWord, 0)));
  };

  const filteredProds = prods.filter((prod) => filterCondition(prod));

  console.log("filtered products by query");

  const coerced = coerceToProductArrayType(filteredProds);
  return coerced;
}

export async function getBrandsByQuery(query?: string) {
  if (!query) {
    return null;
  }

  const queryWords = query.split(' ');

  const prisma = new PrismaClient();
  let res: Omit<brands, 'id'>[] | null;

  try {
    res = await prisma.brands.findMany({
      omit: {
        id: true
      },
      where: {
        OR: queryWords.map(word => ({
          name: {
            contains: word,
            mode: 'insensitive'
          }
        }))
      }
    });

  } catch (e: any) {
    console.error(e);
    return null;
  } finally {
    await prisma.$disconnect();
  };

  console.log("filtered brands by query");

  return res;
}

export async function getCategoriesByQuery(query?: string) {
  if (!query) {
    return null;
  }

  const queryWords = query.split(' ');

  const prisma = new PrismaClient();
  let cats: { categories: string[] }[] | null;

  try {
    cats = await prisma.products.findMany({
      select: {
        categories: true
      }
    });

  } catch (e: any) {
    console.error(e);
    return null;
  } finally {
    await prisma.$disconnect();
  };

  const sexes = ['men', 'women'];

  // return either a category consisting of 1 word
  // or one of length at least 2 words not including the sex in it
  // since we don't have pages for them in the shop
  const filterCondition1 = (item: string) => !item.includes(' ') ||
  item.includes(' ') && sexes.every(sex => !item.includes(sex));
  
  const filterCondition2 = (item: string) => item === "men" || item === "women" || 
  queryWords.some(word => item.startsWith(word,0));

  const filteredCats1 = cats.map((obj) => obj.categories.filter(catName => filterCondition1(catName) && filterCondition2(catName)));
  const length2Arrays = filteredCats1.filter((arr) => arr.length === 2);
  const includedSexes = length2Arrays.map((arr) => sexes.includes(arr[0]) ? arr[0] : arr[1]);

  const filteredCats2 = filteredCats1.filter((arr) => includedSexes.some(sex => arr.includes(sex)));
  const flattenedCats = filteredCats2.map((arr) => arr.length === 1 ? arr[0] : arr);
  const uniqueCats = [...new Set(flattenedCats)];

  console.log("filtered categories by query");

  return uniqueCats;
}