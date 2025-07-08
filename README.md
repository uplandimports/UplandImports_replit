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
- **Framework**: Vite (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`
- **API Routes**: Serverless functions in `/api/`
- **Node Runtime**: `@vercel/node@2.15.10`

### Critical Settings in Vercel Dashboard:
1. **Framework Preset**: Vite
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist/public`
4. **Node.js Version**: 18.x (change from 22.x)

### Troubleshooting
If you see Node.js version errors:
- Project uses Node.js 18.x (specified in .nvmrc and vercel.json)
- Vercel will automatically use the correct version
- If manual override needed: Set Node.js version to 18.x in Vercel Project Settings

If Vercel shows source code instead of website:
- Ensure Framework Preset is set to "Vite" in Vercel project settings
- Build Command should be "npm run build"
- Output Directory should be "dist"
- The vercel.json is configured for proper static site serving

Common deployment issues:
- Ensure environment variables are set in Vercel dashboard
- Check that build command completes successfully
- Verify API functions are properly configured
- TypeScript compilation errors have been resolved
- All nullable fields properly handle undefined values

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