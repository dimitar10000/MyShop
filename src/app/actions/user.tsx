'use server'
import { PrismaClient,users } from '@prisma/client'
import { User } from '../lib/definitions';

export async function getUser(email: string | undefined) {
    const prisma = new PrismaClient();
    let user: users | null;

    if(email === undefined) {
        return;
    }

    try {
        user = await prisma.users.findFirst({
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

    // user didn't exist, need to add them
    if(user === null) {
        user = await createUser(email);
    }

    return user;
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