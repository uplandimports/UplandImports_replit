# Upland Imports - B2B Turkish Shotgun Manufacturing Platform

## Overview

This is a professional B2B website for Upland Imports, a company specializing in white label Turkish shotgun manufacturing services. The platform serves as a comprehensive business solution for showcasing premium PE-series shotgun products, handling customer inquiries, and facilitating business partnerships through a modern, responsive web interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with custom dark theme and gold accents
- **UI Components**: shadcn/ui component library built on Radix UI
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Structure**: RESTful API with separate development and production configurations
- **Development**: Traditional Express server with middleware
- **Production**: Serverless functions using Vercel's @vercel/node runtime
- **Email Service**: Nodemailer with Gmail SMTP integration
- **Data Storage**: In-memory storage with interface for future database integration

### Database Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect (configured but not actively used)
- **Schema Design**: Four main entities:
  - Products (shotgun models with specifications)
  - Configurations (custom build specifications)
  - Inquiries (customer contact forms)
  - Quotes (pricing requests and responses)
- **Current Implementation**: In-memory storage with predefined product data

## Key Components

### Product Management
- Product catalog with filtering by category (bullpup, over-under, semi-auto, pump-action)
- Detailed product specifications including gauge options, pricing, and images
- Image gallery with carousel functionality for product showcase

### Customer Interaction
- Enhanced contact forms with multiple inquiry types
- Model selection dropdowns integrated with product catalog
- Quantity estimation for bulk orders
- Custom design comments and special requests handling

### Email Integration
- Gmail SMTP configuration for business inquiries
- Automated email routing to chris@uplandimports.com
- Form validation and submission handling with user feedback

### Responsive Design
- Mobile-first approach with breakpoint-aware components
- Dark theme with professional gold accent colors
- Smooth scrolling navigation and section anchoring
- Error handling with user-friendly toast notifications

## Data Flow

### Product Display Flow
1. Client requests product data from `/api/products`
2. Server retrieves from in-memory storage (or future database)
3. Products rendered in responsive grid with filtering capabilities
4. User interactions trigger modal dialogs for detailed views

### Inquiry Processing Flow
1. User submits contact form with validation
2. Form data processed and validated on server
3. Email sent via Gmail SMTP to business address
4. Inquiry stored in memory/database for future reference
5. User receives confirmation feedback

### Configuration Builder Flow
1. User customizes shotgun specifications through form interface
2. Real-time price calculation based on selected options
3. Configuration saved to storage with unique identifier
4. Optional email generation for configuration sharing

## External Dependencies

### Email Service
- **Provider**: Gmail SMTP
- **Authentication**: App-specific passwords
- **Configuration**: Environment variables for credentials
- **Fallback**: Error handling for email delivery failures

### Recent Changes (July 8, 2025)
- **Fixed Vercel deployment configuration** - Removed problematic `functions` configuration that was causing "api/index.ts" pattern mismatch errors
- **Optimized build process** - Updated build command to handle lucide-react icon processing timeouts
- **Maintained API routing** - Preserved proper serverless function handling for production deployment
- **Verified email integration** - Confirmed Gmail SMTP configuration working in both development and production environments

### UI Framework
- **shadcn/ui**: Comprehensive component library
- **Radix UI**: Accessible primitive components
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent visual elements

### Development Tools
- **Vite**: Build tool with HMR and TypeScript support
- **ESBuild**: Fast JavaScript bundler for production
- **Drizzle Kit**: Database schema management (future use)

## Deployment Strategy

### Vercel Platform
- **Framework Detection**: Automatic Vite configuration
- **Build Process**: `npm run build` with custom output directory
- **API Routes**: Serverless functions in `/api/` directory
- **Static Assets**: Served from `/uploads/` and `/images/` paths
- **Environment Variables**: Secure storage for email credentials

### Production Configuration
- **Node.js Version**: 18.x (specified in .nvmrc)
- **Runtime**: @vercel/node@2.15.10 for serverless functions
- **Build Output**: `dist/public` directory for static assets
- **Routing**: Custom rewrites for SPA and API handling

### Performance Optimizations
- **Static Asset Caching**: Long-term caching headers for uploads
- **Image Optimization**: Placeholder images with error handling
- **Code Splitting**: Vite's automatic bundle optimization
- **TypeScript**: Full-stack type safety for reduced runtime errors

The application is designed to be easily extensible, with clear separation of concerns and a modular component structure that supports future enhancements like database integration, user authentication, and advanced product management features.