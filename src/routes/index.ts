
import { Router } from 'express';
import menuRoutes from './menuRoutes';

const router = Router();

router.use('/menu', menuRoutes);

export default router;
