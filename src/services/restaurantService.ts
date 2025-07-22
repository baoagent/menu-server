
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllRestaurants = async () => {
    return await prisma.restaurant.findMany();
};

export const createRestaurant = async (name: string, branding: any) => {
    return await prisma.restaurant.create({
        data: {
            name,
            branding,
        },
    });
};

export const updateRestaurant = async (id: string, name: string, branding: any) => {
    return await prisma.restaurant.update({
        where: { id },
        data: {
            name,
            branding,
        },
    });
};

export const deleteRestaurant = async (id: string) => {
    await prisma.restaurant.delete({ where: { id } });
};
