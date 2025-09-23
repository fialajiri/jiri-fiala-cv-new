# CV Application Deployment Guide

This guide covers multiple deployment options for your CV application with both frontend and backend.

## 🚀 Quick Start - Railway (Recommended)

Railway is the easiest option for full-stack deployment with automatic builds and deployments.

### Prerequisites
- GitHub account
- Railway account (free at [railway.app](https://railway.app))

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will automatically detect the configuration

3. **Set Environment Variables**
   In Railway dashboard, go to Variables tab and add:
   ```
   NODE_ENV=production
   FRONTEND_URL=https://your-app-name.railway.app
   VITE_API_BASE_URL=https://your-app-name.railway.app
   ```

4. **Deploy**
   - Railway will automatically build and deploy
   - Your app will be available at `https://your-app-name.railway.app`

## 🐳 Docker Deployment

### Local Docker Build
```bash
# Build the Docker image
docker build -t jiri-fiala-cv .

# Run the container
docker run -p 3000:3000 -e NODE_ENV=production jiri-fiala-cv
```

### Deploy to Cloud with Docker

#### Option A: Railway with Docker
1. Add `Dockerfile` to your repo (already created)
2. Railway will automatically use Docker for deployment

#### Option B: DigitalOcean App Platform
1. Connect your GitHub repository
2. Select "Docker" as the source type
3. DigitalOcean will use your Dockerfile

#### Option C: AWS ECS/Fargate
1. Push Docker image to ECR
2. Create ECS service with Fargate
3. Configure load balancer and domain

## 🌐 Vercel + Railway (Separate Services)

### Frontend on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set build command: `cd client && npm run build`
4. Set output directory: `client/dist`
5. Add environment variable: `VITE_API_BASE_URL=https://your-backend.railway.app`

### Backend on Railway
1. Deploy only the server folder to Railway
2. Set environment variables for production
3. Get the Railway URL for your frontend

## 🔧 Environment Configuration

### Production Environment Variables
```bash
# Server
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-domain.com

# Client
VITE_API_BASE_URL=https://your-domain.com

# Optional: OpenAI (if using chat features)
OPENAI_API_KEY=your_openai_key
```

### Development Setup
```bash
# Install all dependencies
npm run install:all

# Start development servers
npm run dev
```

## 📁 Project Structure for Deployment

```
jiri-fiala-cv/
├── client/                 # React frontend
├── server/                 # Express backend
├── package.json           # Root package.json for deployment
├── railway.json           # Railway configuration
├── Dockerfile             # Docker configuration
└── .env.example          # Environment variables template
```

## 🚀 Build Process

The deployment uses a multi-stage build process:

1. **Dependencies**: Install all required packages
2. **Build**: Compile TypeScript and build React app
3. **Production**: Create optimized production image
4. **Serve**: Express serves both API and static files

## 🔍 Monitoring and Logs

### Railway
- View logs in Railway dashboard
- Monitor performance and errors
- Automatic deployments on git push

### Docker
- View logs: `docker logs <container-id>`
- Monitor resources: `docker stats`

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (requires 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **CORS Issues**
   - Update `allowedOrigins` in server.ts
   - Ensure frontend URL is correct

3. **Static Files Not Loading**
   - Verify build output directory
   - Check file permissions
   - Ensure correct path in server.ts

4. **Environment Variables**
   - Double-check variable names
   - Ensure they're set in production
   - Check for typos in variable values

### Debug Commands
```bash
# Check build locally
npm run build

# Test production build locally
NODE_ENV=production npm start

# Check Docker build
docker build -t test-cv .
docker run -p 3000:3000 test-cv
```

## 📊 Performance Optimization

### Already Implemented
- ✅ Multi-stage Docker build
- ✅ Production environment detection
- ✅ Static file serving
- ✅ CORS configuration
- ✅ Environment-based configuration

### Additional Optimizations
- Enable gzip compression
- Add caching headers
- Implement CDN for static assets
- Add monitoring and analytics

## 🔐 Security Considerations

- Environment variables for sensitive data
- CORS properly configured
- Non-root user in Docker
- Production-ready Express configuration

## 📈 Scaling

### Railway
- Automatic scaling based on traffic
- Easy to upgrade plans

### Docker
- Use orchestration tools (Docker Swarm, Kubernetes)
- Load balancers for multiple instances
- Database scaling for high traffic

## 🎯 Next Steps

1. Choose your preferred deployment method
2. Set up your domain (optional)
3. Configure monitoring and analytics
4. Set up CI/CD for automatic deployments
5. Add error tracking (Sentry, etc.)

---

**Recommended**: Start with Railway for the easiest deployment experience!
