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
- **Framework**: Vite with Express.js API
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **API Routes**: Serverless functions in `/api/`
- **Node Runtime**: Uses @vercel/node for serverless functions

### Troubleshooting
If you encounter runtime errors:
1. Ensure environment variables are set in Vercel dashboard
2. Check that all dependencies are in package.json
3. Verify API routes are working locally first

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