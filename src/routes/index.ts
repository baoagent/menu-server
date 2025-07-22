
import { Router } from 'express';
import authRoutes from './authRoutes';
import restaurantRoutes from './restaurantRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);

export default router;
