# Deployment Guide

## Quick Deploy Options

### Option 1: Railway (Recommended for Server)

1. **Server Deployment:**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository
   - Select the `server` folder
   - Set environment variables:
     ```
     PORT=5000
     CLIENT_URL=https://your-client-url.vercel.app
     ```
   - Deploy

2. **Client Deployment on Vercel:**
   - Go to [Vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Set root directory to `client`
   - Set environment variable:
     ```
     VITE_SOCKET_URL=https://your-server-url.railway.app
     ```
   - Deploy

### Option 2: Render

1. **Server on Render:**
   - Go to [Render.com](https://render.com)
   - Create new Web Service
   - Connect repository
   - Set:
     - Root Directory: `server`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Add environment variables

2. **Client on Netlify:**
   - Go to [Netlify.com](https://netlify.com)
   - Drag and drop your `client/dist` folder after running `npm run build`

### Environment Variables

**Server (.env):**
```
PORT=5000
CLIENT_URL=https://your-client-domain.com
NODE_ENV=production
```

**Client (.env):**
```
VITE_SOCKET_URL=https://your-server-domain.com
```

### Build Commands

**Server:**
```bash
npm install
npm start
```

**Client:**
```bash
npm install
npm run build
```

### Testing Deployment

1. Open your deployed client URL
2. Enter a username
3. Send a message
4. Open another browser/tab with the same URL
5. Enter different username
6. Test real-time messaging between users

### Troubleshooting

**Common Issues:**
- CORS errors: Check CLIENT_URL in server environment
- Connection failed: Verify VITE_SOCKET_URL in client
- Build failures: Ensure all dependencies are in package.json

**Debug Steps:**
1. Check server logs for errors
2. Check browser console for client errors
3. Verify environment variables are set correctly
4. Test local development first