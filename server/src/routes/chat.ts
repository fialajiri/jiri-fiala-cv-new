import { Router, Request, Response } from 'express';
import { validateBody } from '../validation/middleware';
import { ChatRequestSchema, ChatRequest, ChatResponse } from '../validation/schemas';
import { chatService } from '../services/chat.service';

const router = Router();

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Send a message to the chat
 *     description: Process a user message and return an AI response with updated conversation history
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *           example:
 *             message: "Hello, how are you?"
 *             history: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 *             example:
 *               message: "Hello! I'm doing well, thank you for asking. How can I help you today?"
 *               history: [
 *                 { role: "user", content: "Hello, how are you?" },
 *                 { role: "assistant", content: "Hello! I'm doing well, thank you for asking. How can I help you today?" }
 *               ]
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Message cannot be empty"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal server error"
 */
router.post(
  '/',
  validateBody(ChatRequestSchema),
  async (req: Request<Record<string, never>, unknown, ChatRequest>, res: Response) => {
    try {
      const { message, history } = req.body;
      const response: ChatResponse = await chatService.processMessage(message, history);
      res.json(response);
    } catch {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);

/**
 * @swagger
 * /chat/stream:
 *   post:
 *     summary: Send a message to the chat with streaming response
 *     description: Process a user message and return an AI response streamed in real-time
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *           example:
 *             message: "Hello, how are you?"
 *             history: []
 *     responses:
 *       200:
 *         description: Streaming response
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               example: "data: Hello! I'm doing well, thank you for asking.\n\n"
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Message cannot be empty"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal server error"
 */
router.post(
  '/stream',
  validateBody(ChatRequestSchema),
  async (req: Request<Record<string, never>, unknown, ChatRequest>, res: Response) => {
    try {
      const { message, history } = req.body;

      // Set headers for Server-Sent Events
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Cache-Control');

      // Send initial connection confirmation
      res.write('data: {"type":"connected"}\n\n');

      // Stream the response
      try {
        for await (const chunk of chatService.processMessageStream(message, history)) {
          if (chunk.type === 'chunk') {
            res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk.content })}\n\n`);
          } else if (chunk.type === 'done') {
            res.write(`data: ${JSON.stringify({ type: 'done', history: chunk.history })}\n\n`);
          }
        }
      } catch (streamError) {
        // Log error for debugging
        // eslint-disable-next-line no-console
        console.error('Streaming error:', streamError);
        res.write(
          `data: ${JSON.stringify({ type: 'error', content: 'Streaming error occurred' })}\n\n`,
        );
      }

      res.end();
    } catch (error) {
      // Log error for debugging
      // eslint-disable-next-line no-console
      console.error('Chat streaming error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);

export default router;
