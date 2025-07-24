
import { Request, Response } from 'express';
import * as menuService from '../services/menuService';
import { MenuCategory } from '../types';

export const getMenu = async (req: Request, res: Response) => {
    try {
        const menu = await menuService.getMenu();
        res.json(menu);
    } catch (error) {
        res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const createMenuItem = async (req: Request, res: Response) => {
    try {
        const menuItemData = req.body;
        const menuItem = await menuService.createMenuItem(menuItemData);
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const updateMenuItem = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;
        const menuItemData = req.body;
        const menuItem = await menuService.updateMenuItem(itemId, menuItemData);
        res.json(menuItem);
    } catch (error) {
        res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;
        await menuService.deleteMenuItem(itemId);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const createMenuCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const menuCategory = await menuService.createMenuCategory(name);
        res.status(201).json(menuCategory);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const generatePdf = async (req: Request, res: Response) => {
    try {
        const menu: MenuCategory[] = await menuService.getMenu();
        const pdf = await menuService.generatePdf(menu);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=menu.pdf');
        res.send(pdf);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};
