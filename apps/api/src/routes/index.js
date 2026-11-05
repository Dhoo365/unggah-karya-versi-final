import { Router } from 'express';
import todoRoutes from './todo.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/todos', todoRoutes);

export default router;
