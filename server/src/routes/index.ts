import { Router } from 'express';
import chatRoutes from './chat';

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     description: Simple health check to verify the API is running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hello World"
 */
router.get('/', (req, res) => {
  res.send('Hello World');
});

// Mount route modules
router.use('/chat', chatRoutes);

export default router;
