#!/bin/bash

# Vercel Setup Script
echo "🚀 Setting up Vercel deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel@latest
fi

# Login to Vercel
echo "🔐 Please login to Vercel..."
vercel login

# Link the project
echo "🔗 Linking project to Vercel..."
vercel link

# Check if .vercel/project.json was created
if [ -f ".vercel/project.json" ]; then
    echo "✅ Project linked successfully!"
    echo ""
    echo "📋 Your project configuration:"
    cat .vercel/project.json
    echo ""
    echo "🔑 Next steps:"
    echo "1. Copy the 'orgId' value from above"
    echo "2. Copy the 'projectId' value from above"
    echo "3. Get your Vercel token from: https://vercel.com/account/tokens"
    echo "4. Add these as GitHub secrets:"
    echo "   - VERCEL_TOKEN: [your-token]"
    echo "   - VERCEL_ORG_ID: [orgId from above]"
    echo "   - VERCEL_PROJECT_ID: [projectId from above]"
    echo ""
    echo "5. Push to main branch to trigger automatic deployment!"
else
    echo "❌ Project linking failed. Please try again."
fi