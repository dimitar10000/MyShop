'use server'
import { PrismaClient,users } from '@prisma/client'
import { User,Nullable,coerceToUserType } from '@/app/lib/definitions';
import {createCart} from "@/app/actions/shopping-cart";
import {createList} from "@/app/actions/wishlist";

export async function getUser(user: Nullable<User>) {
    const prisma = new PrismaClient();
    let dbUser: users | null;

    if(!user) {
        return;
    }

    try {
        dbUser = await prisma.users.findFirst({
            where: {
                email: user.email
            }
        })

    } catch (e: unknown) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }

    // user didn't exist, need to add them
    // cart and list need to be created too
    if(dbUser === null) {
        dbUser = await createUser(user.email);
        if(user !== null) {
            await createCart(user.sub);
            await createList(user.sub);
        }
    }

    return coerceToUserType(dbUser);
}

export async function createUser(email: string) {
    const prisma = new PrismaClient();
    let user: users;

    try {
        user = await prisma.users.create({
            data: {
                email: email,
                given_name: "",
                family_name: "",
                phone: ""
            }
        });

    } catch (e: unknown) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }

    return user;
}

export async function updateUser(user: User) {
    const prisma = new PrismaClient();

    try {
        await prisma.users.updateMany({
            where: {
                email: user.email
            },
            data: {
                given_name: user.givenName,
                family_name: user.familyName,
                phone: user.phone
            }
        })
    } catch (e: unknown) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

export async function deleteUser(email: string | undefined) {
    const prisma = new PrismaClient();
    
    if(email === undefined) {
        throw new Error("Email is undefined");
    }

    try {
        await prisma.users.deleteMany({
            where: {
                email: email
            }
        })
    } catch (e: unknown) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}