import sqlite3 from 'sqlite3';
import PDFDocument from 'pdfkit';
import cuid from 'cuid';
import { MenuItem, MenuCategory } from '../types';

const db = new sqlite3.Database('./data/menu.db');

// Helper function to wrap db.all in a Promise
const allAsync = <T>(query: string, params: any[] = []): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        db.all<T>(query, params, (err: Error | null, rows: T[]) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

// Helper function to wrap db.run in a Promise
const runAsync = (query: string, params: any[] = []): Promise<sqlite3.RunResult> => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function(err) {
            if (err) {
                reject(err);
            }
            resolve(this);
        });
    });
};

export const getMenu = async (): Promise<MenuCategory[]> => {
    const categoriesQuery = `SELECT * FROM MenuCategory`;
    const itemsQuery = `SELECT * FROM MenuItem WHERE menuCategoryId = ?`;

    const categories = await allAsync<MenuCategory>(categoriesQuery);

    const promises: Promise<MenuCategory>[] = categories.map(async (category: MenuCategory): Promise<MenuCategory> => {
        const items = await allAsync<MenuItem>(itemsQuery, [category.id]);
        category.menuItems = items;
        return category;
    });

    return Promise.all(promises);
};

export const createMenuItem = async (menuItemData: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
    const { name, description, price, menuCategoryId } = menuItemData;
    const id = cuid();
    const query = `INSERT INTO MenuItem (id, name, description, price, menuCategoryId) VALUES (?, ?, ?, ?, ?)`;

    await runAsync(query, [id, name, description, price, menuCategoryId]);
    return { id, ...menuItemData };
};

export const updateMenuItem = async (itemId: string, menuItemData: Partial<Omit<MenuItem, 'id'>>): Promise<MenuItem> => {
    const fields = Object.keys(menuItemData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(menuItemData);
    const query = `UPDATE MenuItem SET ${fields} WHERE id = ?`;

    await runAsync(query, [...values, itemId]);
    // For simplicity, we're returning the updated data. In a real app, you might fetch the full updated item.
    return { id: itemId, ...menuItemData } as MenuItem;
};

export const deleteMenuItem = async (itemId: string): Promise<number> => {
    const query = `DELETE FROM MenuItem WHERE id = ?`;

    const result = await runAsync(query, [itemId]);
    return result.changes || 0;
};

export const createMenuCategory = async (name: string): Promise<MenuCategory> => {
    const id = cuid();
    const query = `INSERT INTO MenuCategory (id, name) VALUES (?, ?)`;

    await runAsync(query, [id, name]);
    return { id, name, menuItems: [] };
};

export const generatePdf = async (menu: MenuCategory[]): Promise<Buffer> => {
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
            category.menuItems.forEach(item => {
                doc.fontSize(15).text(`${item.name} - $${item.price}`);
                doc.fontSize(10).text(item.description);
            });
        });

        doc.end();
    });
};