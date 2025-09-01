# Vercel Deployment Troubleshooting Guide

## 🔍 Common Issues and Solutions

### 1. **GitHub Secrets Missing**
Your GitHub Actions workflow requires these secrets to be set in your repository:

#### Required Secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID` 
- `VERCEL_PROJECT_ID`

#### How to Set Up:
1. Go to your GitHub repository: `https://github.com/MoeThet20/portfolio-vite`
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **New repository secret** for each:

**Get your Vercel Token:**
```bash
# Visit: https://vercel.com/account/tokens
# Create a new token with scope for your account
```

**Get your Org ID and Project ID:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# In your project directory
vercel link

# Check the generated file
cat .vercel/project.json
```

### 2. **Build Errors in Vercel**

#### Check Node.js Version:
```json
// Add to package.json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### Memory Issues:
```json
// Add to package.json scripts
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' tsc -b && vite build"
  }
}
```

### 3. **Routing Issues (404 on refresh)**
✅ Your `vercel.json` is configured correctly for SPA routing.

### 4. **Environment Variables**
If your app uses environment variables:

#### In Vercel Dashboard:
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add variables for:
   - **Production**
   - **Preview** 
   - **Development**

#### Common Variables:
```bash
# If you use any of these in your app
VITE_API_URL=your_api_url
VITE_APP_NAME=Portfolio
# Add any other VITE_ prefixed variables
```

### 5. **Domain Configuration**
1. In Vercel dashboard → Project Settings → Domains
2. Add your custom domain if needed
3. Configure DNS settings with your domain provider

## 🚀 Quick Deployment Methods

### Method 1: GitHub Actions (Current Setup)
1. Push to `main` or `master` branch
2. GitHub Actions will automatically deploy
3. Check Actions tab for deployment status

### Method 2: Direct Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 3: Vercel Git Integration
1. Connect your GitHub repository directly in Vercel dashboard
2. Automatic deployments on every push
3. Preview deployments on pull requests

## 🔧 Debugging Steps

### 1. Check GitHub Actions Logs
1. Go to your repository → Actions tab
2. Click on the latest workflow run
3. Expand each step to see detailed logs
4. Look for error messages

### 2. Check Vercel Build Logs
1. Go to Vercel dashboard → Your project
2. Click on a deployment
3. View **Build Logs** tab
4. Look for build errors or warnings

### 3. Local Testing
```bash
# Test build locally
npm run build

# Test preview locally  
npm run preview

# Check for any errors
```

## 🛠️ Common Fixes

### Fix 1: Update Vercel Action
```yaml
# In .github/workflows/deploy.yml
- name: Deploy to Vercel (Production)
  uses: vercel/action@v1  # Make sure this is v1, not older versions
```

### Fix 2: Add Build Cache
```yaml
# In .github/workflows/deploy.yml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```

### Fix 3: Fix Package.json Scripts
```json
{
  "scripts": {
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

## 📋 Checklist

- [ ] GitHub secrets are set correctly
- [ ] Vercel project is linked to GitHub repository
- [ ] Build passes locally (`npm run build`)
- [ ] No console errors in build output
- [ ] Environment variables are set in Vercel dashboard
- [ ] Domain is configured (if using custom domain)
- [ ] GitHub Actions workflow is enabled

## 🆘 Still Having Issues?

### Check These:
1. **Repository Access**: Make sure Vercel has access to your GitHub repository
2. **Branch Names**: Ensure you're pushing to `main` or `master` branch
3. **Node Version**: Verify your local Node.js version matches Vercel (Node 18+)
4. **Dependencies**: Run `npm audit` to check for issues

### Get Help:
1. Check Vercel documentation: https://vercel.com/docs
2. Check GitHub Actions logs for specific error messages
3. Vercel support: https://vercel.com/help

## 📝 Quick Commands

```bash
# Check deployment status
vercel ls

# Check logs
vercel logs your-project-url

# Redeploy
vercel --prod

# Check domains
vercel domains ls
```