
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMenu = async (restaurantId: string) => {
    return await prisma.menuCategory.findMany({
        where: { restaurantId },
        include: { menuItems: true },
    });
};

export const createMenuItem = async (restaurantId: string, menuItemData: any) => {
    const { menuCategoryId, ...rest } = menuItemData;
    return await prisma.menuItem.create({
        data: {
            ...rest,
            name_zh: menuItemData.name_en,
            name_es: menuItemData.name_en,
            description_zh: menuItemData.description_en,
            description_es: menuItemData.description_en,
            menuCategory: {
                connect: { id: menuCategoryId },
            },
        },
    });
};

export const updateMenuItem = async (itemId: string, menuItemData: any) => {
    return await prisma.menuItem.update({
        where: { id: itemId },
        data: menuItemData,
    });
};

export const deleteMenuItem = async (itemId: string) => {
    await prisma.menuItem.delete({ where: { id: itemId } });
};

export const createMenuCategory = async (restaurantId: string, name: string) => {
    return await prisma.menuCategory.create({
        data: {
            name,
            restaurant: {
                connect: { id: restaurantId },
            },
        },
    });
};
