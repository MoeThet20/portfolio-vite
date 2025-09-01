# Domain Setup Guide for Vercel

## 🌐 Setting Up Custom Domain

### Method 1: Vercel Dashboard (Recommended)

#### Step 1: Access Domain Settings
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Navigate to **Settings** → **Domains**

#### Step 2: Add Your Domain
1. Click **Add Domain**
2. Enter your domain name (e.g., `yourname.com` or `portfolio.yourname.com`)
3. Click **Add**

#### Step 3: Configure DNS
Vercel will show you DNS records to add. You have two options:

**Option A: Use Vercel Nameservers (Easiest)**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: Add DNS Records to Your Current Provider**
```
Type: A
Name: @ (or your subdomain)
Value: 76.76.19.61

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

### Method 2: Vercel CLI

```bash
# Add domain via CLI
vercel domains add yourname.com

# List all domains
vercel domains ls

# Remove domain
vercel domains rm yourname.com
```

### Method 3: Automatic Domain via GitHub Actions

Add this to your GitHub Actions workflow after deployment:

```yaml
- name: Add Custom Domain
  run: |
    vercel domains add yourname.com --token=${{ secrets.VERCEL_TOKEN }}
    vercel alias set your-project-url.vercel.app yourname.com --token=${{ secrets.VERCEL_TOKEN }}
```

## 🏷️ Domain Types

### 1. **Apex Domain** (yourname.com)
```bash
# DNS Configuration
A Record: @ → 76.76.19.61
CNAME: www → cname.vercel-dns.com
```

### 2. **Subdomain** (portfolio.yourname.com)
```bash
# DNS Configuration  
CNAME: portfolio → cname.vercel-dns.com
```

### 3. **Both Apex + WWW**
```bash
# DNS Configuration
A Record: @ → 76.76.19.61
CNAME: www → cname.vercel-dns.com
```

## 📋 DNS Provider Setup

### Namecheap
1. Go to Domain List → Manage
2. Navigate to **Advanced DNS**
3. Add the records shown above

### Cloudflare  
1. Go to DNS → Records
2. Add A record and CNAME as needed
3. Set Proxy status to "DNS only" (gray cloud)

### GoDaddy
1. Go to DNS Management
2. Add records as shown above

### Google Domains
1. Go to DNS settings
2. Add custom resource records

## 🔧 Vercel Configuration

### Update vercel.json (Optional)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## ✅ Verification Steps

### 1. Check DNS Propagation
```bash
# Check if DNS is propagated
dig yourname.com
nslookup yourname.com

# Or use online tools:
# https://dnschecker.org
# https://whatsmydns.net
```

### 2. Test SSL Certificate
- Vercel automatically provisions SSL certificates
- It may take 5-10 minutes after domain setup
- Check: `https://yourname.com`

### 3. Verify Redirects
- Test both `yourname.com` and `www.yourname.com`
- Check that both redirect to HTTPS

## 🚀 Quick Setup Script

```bash
#!/bin/bash
# Quick domain setup script

echo "🌐 Setting up domain for Vercel..."

# Check if vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel@latest
fi

echo "Enter your domain name (e.g., yourname.com):"
read domain

echo "Adding domain to Vercel..."
vercel domains add $domain

echo "✅ Domain added! Now configure your DNS settings:"
echo "Add these DNS records to your domain provider:"
echo ""
echo "Type: A"
echo "Name: @"
echo "Value: 76.76.19.61"
echo ""
echo "Type: CNAME"
echo "Name: www"  
echo "Value: cname.vercel-dns.com"
echo ""
echo "🕐 DNS propagation may take up to 24 hours"
```

## 🔍 Troubleshooting

### Common Issues:

#### 1. **Domain Not Connecting**
- Check DNS propagation (can take 24-48 hours)
- Verify DNS records are correct
- Ensure no conflicting A records

#### 2. **SSL Certificate Issues**  
- Wait 5-10 minutes after domain setup
- Check if domain is properly verified
- Try re-adding the domain

#### 3. **WWW vs Non-WWW**
- Set up both versions in Vercel
- Configure redirects in DNS or Vercel settings

#### 4. **Subdomain Issues**
- Use CNAME record for subdomains
- Point to `cname.vercel-dns.com`

### DNS Records Cheatsheet:

```bash
# For yourname.com
A     @     76.76.19.61
CNAME www   cname.vercel-dns.com

# For portfolio.yourname.com  
CNAME portfolio cname.vercel-dns.com

# For blog.yourname.com
CNAME blog      cname.vercel-dns.com
```

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs/concepts/projects/custom-domains
- **DNS Help**: https://vercel.com/docs/concepts/projects/domains/troubleshooting
- **Community**: https://github.com/vercel/vercel/discussions

## 🎯 Next Steps After Domain Setup

1. **Update Social Links**: Update portfolio links to use new domain
2. **Update README**: Add your live site URL
3. **Google Analytics**: Update domain in tracking
4. **SEO**: Submit new domain to Google Search Console