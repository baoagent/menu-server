
import { PrismaClient } from '@prisma/client';
import PDFDocument from 'pdfkit';

const prisma = new PrismaClient();

export const getMenu = async () => {
    return await prisma.menuCategory.findMany({
        include: { menuItems: true },
    });
};

export const createMenuItem = async (menuItemData: any) => {
    const { menuCategoryId, ...rest } = menuItemData;
    return await prisma.menuItem.create({
        data: {
            ...rest,
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

export const createMenuCategory = async (name: string) => {
    return await prisma.menuCategory.create({
        data: {
            name,
        },
    });
};

export const generatePdf = async (menu: any[]): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            resolve(Buffer.concat(buffers));
        });

        doc.fontSize(25).text('Menu', { align: 'center' });

        menu.forEach(category => {
            doc.fontSize(20).text(category.name, { underline: true });
            category.menuItems.forEach((item: any) => {
                doc.fontSize(15).text(`${item.name} - ${item.price}`);
                doc.fontSize(10).text(item.description);
            });
        });

        doc.end();
    });
};
