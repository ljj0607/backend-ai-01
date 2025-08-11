# Deployment Guide

## Prerequisites

1. **Cloudflare Account**
   - Sign up at [cloudflare.com](https://cloudflare.com)
   - Free tier is sufficient for testing

2. **Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

3. **OpenAI API Key**
   - Get from [platform.openai.com](https://platform.openai.com)

## Local Development Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/ljj0607/backend-ai-01.git
   cd backend-ai-01
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .dev.vars
   # Edit .dev.vars and add your OpenAI API key
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Production Deployment

### Step 1: Login to Cloudflare

```bash
wrangler login
```

This will open your browser for authentication.

### Step 2: Configure Secrets

```bash
wrangler secret put OPENAI_API_KEY
# Enter your OpenAI API key when prompted
```

### Step 3: Deploy

```bash
npm run deploy
```

Your API will be deployed to:
```
https://backend-ai-01.<your-subdomain>.workers.dev/graphql
```

## Environment-Specific Deployments

### Staging Environment

1. **Deploy to Staging**
   ```bash
   wrangler deploy --env staging
   ```

2. **Set Staging Secrets**
   ```bash
   wrangler secret put OPENAI_API_KEY --env staging
   ```

### Production Environment

1. **Deploy to Production**
   ```bash
   wrangler deploy --env production
   ```

2. **Set Production Secrets**
   ```bash
   wrangler secret put OPENAI_API_KEY --env production
   ```

## Custom Domain Setup

1. **Add Custom Domain in Cloudflare Dashboard**
   - Go to Workers & Pages
   - Select your worker
   - Go to "Triggers" tab
   - Add custom domain

2. **Update CORS Settings**
   ```typescript
   // src/index.ts
   cors: {
     origin: 'https://yourdomain.com',
     credentials: true,
   }
   ```

## Monitoring and Logs

### View Real-time Logs

```bash
wrangler tail
```

### View Metrics

In Cloudflare Dashboard:
- Workers & Pages → Your Worker → Analytics

## Rollback Deployment

### List Deployments

```bash
wrangler deployments list
```

### Rollback to Previous Version

```bash
wrangler rollback [deployment-id]
```

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - run: npm ci
      
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          command: deploy
```

### Setup GitHub Secrets

1. Get Cloudflare API Token:
   - Go to Cloudflare Dashboard → My Profile → API Tokens
   - Create token with "Edit Workers" permission

2. Add to GitHub:
   - Repository Settings → Secrets → New repository secret
   - Name: `CF_API_TOKEN`
   - Value: Your Cloudflare API token

## Troubleshooting Deployment

### Common Issues

1. **"Authentication required" error**
   ```bash
   wrangler login
   ```

2. **"Worker not found" error**
   - Check `wrangler.toml` configuration
   - Ensure worker name is unique

3. **"Script too large" error**
   - Check bundle size
   - Remove unnecessary dependencies

4. **"Secret not found" error**
   ```bash
   wrangler secret list
   wrangler secret put OPENAI_API_KEY
   ```

## Performance Optimization

1. **Enable Caching**
   ```typescript
   // Add cache headers for static responses
   return new Response(data, {
     headers: {
       'Cache-Control': 'public, max-age=3600',
     },
   });
   ```

2. **Use Cloudflare KV for Session Storage**
   ```bash
   wrangler kv:namespace create "SESSIONS"
   ```

3. **Enable Smart Placement**
   ```toml
   # wrangler.toml
   [placement]
   mode = "smart"
   ```