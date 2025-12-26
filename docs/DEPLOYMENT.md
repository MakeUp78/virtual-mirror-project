# Virtual Mirror Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [MongoDB Atlas Setup](#mongodb-atlas-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Docker Deployment](#docker-deployment)
7. [Post-Deployment](#post-deployment)

## Prerequisites

- Node.js v16+
- MongoDB Atlas account (or self-hosted MongoDB)
- Domain name (optional but recommended)
- Cloud hosting account (Heroku, DigitalOcean, AWS, etc.)

## Environment Setup

### Production Environment Variables

**Backend (.env):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/virtual-mirror
JWT_SECRET=<generate_strong_random_secret>
JWT_EXPIRE=30d
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend (.env.production):**
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## MongoDB Atlas Setup

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up or log in

2. **Create Cluster**
   - Click "Build a Database"
   - Choose Free tier (M0)
   - Select region closest to your users
   - Name your cluster

3. **Configure Database Access**
   - Create database user
   - Set username and password
   - Save credentials securely

4. **Configure Network Access**
   - Add IP address `0.0.0.0/0` (allow from anywhere)
   - Or add specific server IPs

5. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create virtual-mirror-backend
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=<your_mongodb_uri>
   heroku config:set JWT_SECRET=<your_jwt_secret>
   heroku config:set FRONTEND_URL=<your_frontend_url>
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Verify**
   ```bash
   heroku logs --tail
   heroku open
   ```

### Option 2: DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean
   - Create new App
   - Connect GitHub repository

2. **Configure Build**
   - Build command: `npm install`
   - Run command: `npm start`
   - HTTP Port: 5000

3. **Set Environment Variables**
   - Add all required env variables
   - Use App Platform UI

4. **Deploy**
   - Click "Deploy"
   - Monitor build logs

### Option 3: AWS EC2

1. **Launch EC2 Instance**
   - Choose Ubuntu 20.04 LTS
   - Select t2.micro (free tier)
   - Configure security group (port 5000)

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx
   ```

4. **Clone Repository**
   ```bash
   git clone https://github.com/MakeUp78/virtual-mirror-project.git
   cd virtual-mirror-project/backend
   npm install
   ```

5. **Configure PM2**
   ```bash
   npm install -g pm2
   pm2 start server.js --name virtual-mirror-backend
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/virtual-mirror
   ```
   
   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/virtual-mirror /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Frontend Deployment

### Option 1: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add `REACT_APP_API_URL`

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Configure**
   - Set environment variables in Netlify UI
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`

### Option 3: AWS S3 + CloudFront

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Create S3 Bucket**
   - Go to AWS S3
   - Create bucket with unique name
   - Enable static website hosting

3. **Upload Build**
   ```bash
   aws s3 sync build/ s3://your-bucket-name
   ```

4. **Configure CloudFront**
   - Create distribution
   - Set S3 bucket as origin
   - Configure cache behaviors

5. **Update DNS**
   - Point domain to CloudFront distribution

## Docker Deployment

### Create Docker Files

**Backend Dockerfile:**
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

  mongodb:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
```

### Deploy with Docker

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Post-Deployment

### 1. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 2. Monitoring

**Set up monitoring:**
- Use PM2 monitoring: `pm2 monitor`
- Set up error tracking (Sentry)
- Configure logging (Winston)
- Set up uptime monitoring

### 3. Backup Strategy

**Database backups:**
```bash
# MongoDB Atlas: Enable automated backups
# Self-hosted: Set up cron job
0 2 * * * mongodump --uri="mongodb://..." --out=/backups/$(date +\%Y-\%m-\%d)
```

### 4. Testing

**Verify deployment:**
- Test all API endpoints
- Verify file uploads
- Test authentication flow
- Check AR preview functionality
- Test e-commerce workflow
- Verify email notifications

### 5. Performance Optimization

**Enable compression:**
```javascript
const compression = require('compression');
app.use(compression());
```

**Add caching:**
```javascript
app.use(express.static('public', { maxAge: '1y' }));
```

**Use CDN for static assets**

### 6. Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] Security headers set
- [ ] Regular security updates

## Troubleshooting

### Common Issues

**Issue: Cannot connect to MongoDB**
```bash
# Check connection string
# Verify network access in MongoDB Atlas
# Check firewall rules
```

**Issue: CORS errors**
```javascript
// Update CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

**Issue: Build fails**
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules
npm install
```

## Maintenance

### Regular Tasks

**Daily:**
- Monitor error logs
- Check server resources

**Weekly:**
- Review performance metrics
- Update dependencies if needed

**Monthly:**
- Rotate secrets/tokens
- Review and optimize database
- Update documentation

## Rollback Procedure

If deployment fails:

1. **Heroku:**
   ```bash
   heroku rollback
   ```

2. **Manual:**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Docker:**
   ```bash
   docker-compose down
   git checkout previous-version
   docker-compose up -d
   ```

## Support

For deployment issues:
- Check logs first
- Review documentation
- Contact: devops@virtualmirror.com
