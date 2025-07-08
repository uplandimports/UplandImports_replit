# Upland Imports - Turkish Shotgun Manufacturing Platform

A professional B2B website for Upland Imports, specializing in white label Turkish shotgun manufacturing services.

## Features

- **Product Catalog**: Complete PE-series shotgun lineup with authentic images
- **Enhanced Contact Forms**: Model selection, quantity estimation, and design comments
- **Email Integration**: Gmail SMTP for business inquiries sent to chris@uplandimports.com
- **Responsive Design**: Professional dark theme with gold accents
- **TypeScript**: Full-stack type safety
- **Modern Stack**: React, Express.js, shadcn/ui components

## Deployment

### Vercel Deployment

1. **Connect GitHub Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the framework and build settings

2. **Environment Variables**:
   Set these in your Vercel dashboard:
   - `GMAIL_USER`: Your Gmail address
   - `GMAIL_APP_PASSWORD`: Gmail app password for SMTP

3. **Deploy**:
   - Push to GitHub main branch
   - Vercel will automatically build and deploy
   - Or use CLI: `vercel --prod`

### Deployment Configuration
- **Framework**: Automatically detected as Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **API Routes**: Serverless functions in `/api/`
- **Node Runtime**: `@vercel/node@3.0.7`

### Troubleshooting
If you see Node.js version errors:
- Project uses Node.js 18.x (specified in .nvmrc and vercel.json)
- Vercel will automatically use the correct version
- If manual override needed: Set Node.js version to 18.x in Vercel Project Settings

Common deployment issues:
- Ensure environment variables are set in Vercel dashboard
- Check that build command completes successfully
- Verify API functions are properly configured

### Local Development

```bash
npm run dev
```

## Product Lineup

- **PE-701 Bullpup**: Semi-automatic bullpup design
- **PE-601**: Traditional semi-automatic
- **PE-501**: Available in multiple finishes
- **PE-401**: Compact model with variants
- **PE-301**: Entry-level professional model

## Contact

All business inquiries are sent to chris@uplandimports.com with comprehensive details including model preferences, quantities, and customization requirements.

## License

All rights reserved - Upland Imports 2024