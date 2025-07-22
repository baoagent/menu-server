
import { Router } from 'express';
import { getAllRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurantController';
import { authMiddleware } from '../middlewares/authMiddleware';

import menuRoutes from './menuRoutes';

const router = Router();

router.use('/:restaurantId/menu', menuRoutes);

router.get('/', getAllRestaurants);
router.post('/', createRestaurant);
router.put('/:id', authMiddleware, updateRestaurant);
router.delete('/:id', authMiddleware, deleteRestaurant);

export default router;
