'use server'
import { PrismaClient } from '@prisma/client'
import { Wishlist, UserCookie, ShoppingCartItemType, Product,WishlistItemType, isProduct3,coerceToListType } from '@/app/lib/definitions';
import { addToListCookie, removeFromListCookie, deleteWishlistCookie, getUserCookie } from '@/app/actions/cookies';

export async function addToList(userID: string, product: Product | ShoppingCartItemType | WishlistItemType) {
    let list: Wishlist | null = await getListByUser(userID);

    // list doesn't exist, create new one
    if (!list) {
        list = await createList(userID);
    }

    const prisma = new PrismaClient();
    let res;

    try {
        if (isProduct3(product)) {
            if (userID === undefined) {
                await addToListCookie(product.id);
                const list = await getDetailedListOfCookie();
                return list;
            }

            let itemExists;
            itemExists = list!.items.find((item) => item.productID === product.id);

            if (!itemExists) {
                res = await prisma.wishlists.updateMany({
                    where: {
                        userID: userID
                    },
                    data: {
                        items: {
                            push: {
                                brand: product.brand.name,
                                image: product.image,
                                name: product.name,
                                price: product.price,
                                productID: product.id,
                                categories: product.categories
                            }
                        }
                    }
                })

                console.log(`added ${product.id} to list!`);
            }
            else {
                console.error(`The product with id ${product.id} is already in the list`);
            }
        }
        else {
            if (userID === undefined) {
                await addToListCookie(product.productID);
                const list = await getDetailedListOfCookie();
                return list;
            }

            let itemExists;
            itemExists = list!.items.find((item) => item.productID === product.productID);

            if (!itemExists) {
                res = await prisma.wishlists.updateMany({
                    where: {
                        userID: userID
                    },
                    data: {
                        items: {
                            push: {
                                brand: product.brand,
                                image: product.image,
                                name: product.name,
                                price: product.price,
                                productID: product.productID,
                                categories: product.categories
                            }
                        }
                    }
                })

                console.log(`added ${product.productID} to list!`);
            }
            else {
                console.error(`The product with id ${product.productID} is already in the list`);
            }
        }
    } catch (e: any) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    };

    list = await getListByUser(userID);
    return list;
}

export async function getListByUser(userID: string) {
    const prisma = new PrismaClient();
    let res: Wishlist | null;

    try {
        const tmp = await prisma.wishlists.findFirst({
            where: {
                userID: userID
            }
        })

        res = coerceToListType(tmp);

    } catch (e: any) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    };

    console.log(`fetched list of user ${userID}!`);
    return res;
}

export async function removeFromList(userID: string, productID: number) {
    let list: Wishlist | null = await getListByUser(userID);

    const prisma = new PrismaClient();
    let res;

    try {
        if (userID === undefined) {
            await removeFromListCookie(productID);
            const list = await getDetailedListOfCookie();
            return list;
        }

        // remove the item from the list
        const newItems = list!.items.filter(item => item.productID !== productID);

        res = await prisma.wishlists.updateMany({
            where: {
                userID: userID
            },
            data: {
                items: newItems
            }
        })

        console.log(`removed ${productID} from list!`);
    } catch (e: any) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    };

    list = await getListByUser(userID);
    return list;
}

export async function deleteList(userID: string) {
    const prisma = new PrismaClient();
    let res;

    try {
        if (userID === undefined) {
            await deleteWishlistCookie();
            const list = await getDetailedListOfCookie();
            return list;
        }

        res = await prisma.wishlists.updateMany({
            where: {
                userID: userID
            },
            data: {
                items: []
            }
        })

        console.log(`deleted list!`);
    } catch (e: any) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    };

    res = await getListByUser(userID);
    return res;
}

async function createList(userID: string) {
    const prisma = new PrismaClient();
    let res: Wishlist | null;

    try {
        const tmp = await prisma.wishlists.create({
            data: {
                userID: userID,
                items: []
            }
        })

        res = coerceToListType(tmp);

        console.log(`created new list for user ${userID}!`);
    } catch (e: any) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    };

    return res;
}

// returns a filtered list of products in the cookie wishlist with more details
export async function getDetailedListOfCookie() : Promise<Wishlist | null> {
    const cookie: UserCookie | null = await getUserCookie();
    if(!cookie) {
        return null;
    }

    const list = cookie.wishlist;
    const IdsArray = list.map((x) => x.id);

    const prisma = new PrismaClient();
    let items;

    try {
        items = await prisma.products.findMany({
            where: {
                id_: {
                    in: IdsArray
                }
            }
        })

        console.log(`filtered products by wishlist items`);
    } catch (e: any) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    };

    items = items.map((x) => {
        const {id_:productID, brand: renamedBrand, id,...rest} = x;
        const newObj = {productID,brand: renamedBrand.name,...rest};
        return newObj;
    });

    if((items as Wishlist['items']) !== undefined) {
        return {userID: undefined, items: items} as Wishlist;
    }

    return {userID: undefined, items: []};
}