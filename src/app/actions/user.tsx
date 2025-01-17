'use server'
import { PrismaClient,users } from '@prisma/client'
import { User } from '../lib/definitions';

export async function getUser(email: string | undefined) {
    const prisma = new PrismaClient();
    let user: users | null;

    try {
        user = await prisma.users.findFirst({
            where: {
                email: email
            }
        })

    } catch (e: any) {
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
    } catch (e: any) {
        console.error(e);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}