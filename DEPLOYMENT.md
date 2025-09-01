# Deployment Guide

This project is configured for automatic deployment to Vercel using GitHub Actions.

## Setup Instructions

### 1. Vercel Project Setup

#### Option A: Link Existing Project
If you already have a Vercel project:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (run this in your project directory)
vercel link
```

#### Option B: Create New Project
1. Create a new project on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure the project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 2. Get Vercel Credentials
After linking your project, get your credentials:

```bash
# Check your project configuration
cat .vercel/project.json

# This file contains your orgId and projectId
```

### 3. GitHub Secrets Setup
Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

#### Required Secrets:
- **`VERCEL_TOKEN`**: Your Vercel token
  - Get it from: https://vercel.com/account/tokens
  - Create a new token with appropriate scope

- **`VERCEL_ORG_ID`**: Your Vercel organization ID
  - Found in `.vercel/project.json` as `orgId`

- **`VERCEL_PROJECT_ID`**: Your Vercel project ID  
  - Found in `.vercel/project.json` as `projectId`

### 4. How to Get Your IDs

#### Method 1: Using Vercel CLI
```bash
# In your project directory
vercel link
cat .vercel/project.json
```

#### Method 2: From Vercel Dashboard
1. Go to your project settings on Vercel
2. **Org ID**: Found in your team/account settings URL
3. **Project ID**: Found in project settings → General

### 5. Environment Variables (if needed)
If your project uses environment variables, add them to:

#### In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add your variables for Production, Preview, and Development

#### In GitHub Secrets (for build-time variables):
Add any build-time environment variables as GitHub secrets and reference them in the workflow.

## Deployment Workflow

### Automatic Deployments:
- **Production**: Triggered on push to `main` or `master` branch
- **Preview**: Triggered on pull requests

### Manual Deployment:
You can also deploy manually using Vercel CLI:
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check your build command and dependencies
2. **404 on Routes**: Ensure SPA routing is configured (handled by vercel.json)
3. **Environment Variables**: Make sure all required env vars are set in Vercel dashboard

### Debugging:
1. Check GitHub Actions logs for detailed error messages
2. Verify all secrets are correctly set
3. Test build locally: `npm run build`
4. Test locally: `npm run preview`

## Project Structure
```
.github/
  workflows/
    deploy.yml          # GitHub Actions workflow
vercel.json            # Vercel configuration
DEPLOYMENT.md          # This file
```

## Support
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)