
import { Router } from 'express';
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem, createMenuCategory, deleteCategory, generatePdf } from '../controllers/menuController';

const router = Router();

router.get('/', getMenu);
router.post('/items', createMenuItem);
router.put('/items/:itemId', updateMenuItem);
router.delete('/items/:itemId', deleteMenuItem);
router.post('/categories', createMenuCategory);
router.delete('/categories/:categoryId', deleteCategory);
router.get('/pdf', generatePdf);

export default router;
