'use server'
import { PrismaClient } from '@prisma/client'
import type { products } from '@prisma/client';
import { ShoppingCart, WishlistItemType, ShoppingCartItemType, 
    isProduct3,UserCookie,coerceToCartType, Product,Nullable } from '@/app/lib/definitions';
import { addToCartCookie, removeFromCartCookie,
    deleteCartCookie,getUserCookie } from '@/app/actions/cookies';

export async function addToCart(userID: string | undefined, 
    product: Product | WishlistItemType | ShoppingCartItemType,
    quantity?: number
) {
    let cart: Nullable<ShoppingCart> = await getCartByUser(userID);

    // cart doesn't exist, create new one
    if (!cart) {
        cart = await createCart(userID);
    }

    const prisma = new PrismaClient();

    try {
        if (isProduct3(product)) {
            if (userID === undefined) {
                await addToCartCookie(product.id, 1);
                const cart = await getDetailedCartOfCookie();
                return cart;
            }

            const itemExists = cart!.items.find((item) => item.productID === product.id);

            if (!itemExists) {
                await prisma.shopping_carts.updateMany({
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
                                discountedPercent: product.discountedPercent,
                                categories: product.categories,
                                productID: product.id,
                                quantity: 1
                            }
                        }
                    }
                })

                console.log(`added ${product.id} to cart!`);
            }
            else {
                await prisma.shopping_carts.updateMany({
                    where: {
                        userID: userID
                    },
                    data: {
                        items: {
                            updateMany: {
                                where: {
                                    productID: product.id
                                },
                                data: {
                                    quantity: {
                                        increment: 1
                                    }
                                }
                            }
                        }
                    }
                })

                console.log(`updated quantity of ${product.id} with 1!`);
            }
        }
        else if(!('quantity' in product)) {
            if (userID === undefined) {
                await addToCartCookie(product.productID, 1);
                const cart = await getDetailedCartOfCookie();
                return cart;
            }

            const itemExists = cart!.items.find((item) => item.productID === product.productID);

            if (!itemExists) {
                await prisma.shopping_carts.updateMany({
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
                                categories: product.categories,
                                quantity: 1
                            }
                        }
                    }
                })

                console.log(`added ${product.productID} to cart!`);
            }
            else {
                await prisma.shopping_carts.updateMany({
                    where: {
                        userID: userID
                    },
                    data: {
                        items: {
                            updateMany: {
                                where: {
                                    productID: product.productID
                                },
                                data: {
                                    quantity: {
                                        increment: 1
                                    }
                                }
                            }
                        }
                    }
                })

                console.log(`updated quantity of ${product.productID} with 1!`);
            }
        }
        else {
            if (userID === undefined) {
                await addToCartCookie(product.productID,quantity!);
                const cart = await getDetailedCartOfCookie();
                return cart;
            }

            await prisma.shopping_carts.updateMany({
                where: {
                    userID: userID
                },
                data: {
                    items: {
                        updateMany: {
                            where: {
                                productID: product.productID
                            },
                            data: {
                                quantity: product.quantity
                            }
                        }
                    }
                }
            })

            console.log(`set quantity of ${product.productID} to ${product.quantity}!`);
        }

    } catch (e: unknown) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }

    cart = await getCartByUser(userID);
    return cart;
}

export async function removeFromCart(userID: string | undefined, product: ShoppingCartItemType, quantity?: number) {
    let cart: ShoppingCart | null = await getCartByUser(userID);

    if (!quantity) {
        quantity = 1;
    }

    const prisma = new PrismaClient();

    try {
        if (userID === undefined) {
            await removeFromCartCookie(product.productID, quantity);
            const cart = await getDetailedCartOfCookie();
            return cart;
        }

        let productAmount;
        if(!cart) {
            productAmount = 0;
        }
        else {
            const cartItem = cart.items.find(item => product.productID === item.productID);
            if(!cartItem) {
                productAmount = 0;
            }
            else {
                productAmount = cartItem.quantity;
            }
        }
        
        const diff = productAmount - quantity;

        if (diff > 0) {

            await prisma.shopping_carts.updateMany({
                where: {
                    userID: userID
                },
                data: {
                    items: {
                        updateMany: {
                            where: {
                                productID: product.productID
                            },
                            data: {
                                quantity: {
                                    decrement: quantity
                                }
                            }
                        }
                    }
                }
            })

            console.log(`removed ${quantity} of product ${product.productID} from cart!`);
        } else {
            if(!cart) {
                return null;
            }

            // remove the item from the cart
            const newItems = cart.items.filter(item => item.productID !== product.productID);

            await prisma.shopping_carts.updateMany({
                where: {
                    userID: userID,
                },
                data: {
                    items: newItems
                }
            });

            if (cart!.items.length === 0) {
                await deleteCart(userID);
            }

            console.log(`removed product ${product.productID} from cart!`);
        }
    } catch (e: unknown) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }

    cart = await getCartByUser(userID);
    return cart;
}

export async function deleteCart(userID: string | undefined) {
    let cart: ShoppingCart | null = await getCartByUser(userID);
    const prisma = new PrismaClient();

    try {
        if (userID === undefined) {
            await deleteCartCookie();
            const cart = await getDetailedCartOfCookie();
            return cart;
        }

        await prisma.shopping_carts.updateMany({
            where: {
                userID: userID
            },
            data: {
                items: []
            }
        })

        console.log(`deleted cart!`);
    } catch (e: unknown) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }

    cart = await getCartByUser(userID);
    return cart;
}

async function createCart(userID: string | undefined) {
    const prisma = new PrismaClient();
    let res: ShoppingCart | null;

    if(userID === undefined) {
        return;
    }

    try {
        const tmp = await prisma.shopping_carts.create({
            data: {
                userID: userID,
                items: []
            }
        })

        res = coerceToCartType(tmp);

        console.log(`created new cart for user ${userID}!`);
    } catch (e: unknown) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }

    return res;
}

export async function getCartByUser(userID: string | undefined) {
    const prisma = new PrismaClient();
    let res: ShoppingCart | null;

    try {
        const tmp = await prisma.shopping_carts.findFirst({
            where: {
                userID: userID
            }
        })

        res = coerceToCartType(tmp);
    } catch (e: unknown) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }

    console.log(`got cart of user ${userID}!`);
    return res;
}

async function getQuantityByProduct(productID: number) {
    const prisma = new PrismaClient();
    let res;

    try {
        res = await prisma.storage.findFirst({
            select: {
                quantity: true
            },
            where: {
                productID: productID
            }
        })
    } catch (e: unknown) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }

    return res?.quantity;
}

// returns a filtered list of products in the cookie cart with more details
export async function getDetailedCartOfCookie() {
    const cookie: UserCookie | null = await getUserCookie();
    if(!cookie) {
        return null;
    }

    const cart = cookie.cart;
    const IdsArray = cart.map((x) => {
        if(x.id !== undefined) {
            return x.id;
        }
        else {
            return 0;
        }
    }); 
    const quantities = cart.map((x) => x.quantity);

    const prisma = new PrismaClient().$extends({
        result: {
            products: {
                quantity: {
                    needs: {id_: true},
                    compute(products) {
                        let q;
                        const index = IdsArray.findIndex((x) => x === products.id_);
                        if(index !== -1) {
                            q = quantities[index];
                        }
                        else {
                            q = 0;
                        }

                        return q;
                    }
                }
            }
        }
    })
    let res;

    try {
        res = await prisma.products.findMany({
            omit: {
                id: true
            },
            where: {
                id_: {
                    in: IdsArray
                }
            }
        })

        console.log(`filtered products by cart items`);
    } catch (e: unknown) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }
    
    res = res.map((x) => {
        const {id_:productID, brand: renamedBrand,...rest} = x;
        const newObj = {productID,brand: renamedBrand.name,...rest};
        return newObj;
    });

    if((res as ShoppingCart['items']) !== undefined) {
        return {userID: undefined, items: res} as ShoppingCart
    }

    return {userID: undefined, items: []};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function checkForSufficientProducts(product: products, quantity: number) {
    const productCount = await getQuantityByProduct(product.id_);
    if (productCount && productCount < quantity) {
        console.error(`The quantity of product ${product.id} is 0`);
        return false;
    }

    return productCount;
}