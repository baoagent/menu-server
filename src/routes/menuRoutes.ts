
import { Router } from 'express';
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem, createMenuCategory } from '../controllers/menuController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router({ mergeParams: true });

router.get('/', getMenu);
router.post('/items', authMiddleware, createMenuItem);
router.put('/items/:itemId', authMiddleware, updateMenuItem);
router.delete('/items/:itemId', authMiddleware, deleteMenuItem);
router.post('/categories', authMiddleware, createMenuCategory);

export default router;
