
import { Request, Response } from 'express';
import * as restaurantService from '../services/restaurantService';

export const getAllRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await restaurantService.getAllRestaurants();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const createRestaurant = async (req: Request, res: Response) => {
    try {
        const { name, branding } = req.body;
        const restaurant = await restaurantService.createRestaurant(name, branding);
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, branding } = req.body;
        const restaurant = await restaurantService.updateRestaurant(id, name, branding);
        res.json(restaurant);
    } catch (error) {
        res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await restaurantService.deleteRestaurant(id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};
