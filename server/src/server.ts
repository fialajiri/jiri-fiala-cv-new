import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { swaggerSpec } from './config/swagger';

const app = express();

// CORS configuration
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [
        process.env.FRONTEND_URL || 'https://your-app.railway.app',
        process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : null,
        process.env.RAILWAY_STATIC_URL ? `https://${process.env.RAILWAY_STATIC_URL}` : null,
      ].filter(Boolean)
    : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes);

// Serve static files from the React app build
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));

  // Handle React routing, return all requests to React app (only for non-API routes)
  app.use((req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api') || req.path.startsWith('/api-docs')) {
      return next();
    }
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  // Development routes
  app.use('/', routes);
}

export default app;
