# replit.md - Upland Imports Turkish Shotgun Manufacturing Platform

## Overview

This is a professional B2B website for Upland Imports, specializing in white label Turkish shotgun manufacturing services. The platform serves as a comprehensive showcase for the PE-series shotgun lineup with integrated contact forms, email functionality, and a modern responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety
- **Styling**: Tailwind CSS with dark theme and gold accents
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful API with JSON responses
- **Email Service**: Gmail SMTP integration using Nodemailer
- **File Serving**: Static file serving for uploads and images
- **Error Handling**: Centralized error handling middleware

### Database Architecture
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Schema**: Structured tables for products, configurations, inquiries, and quotes
- **Storage Strategy**: In-memory storage implementation for development with database fallback

## Key Components

### Product Management
- **Product Catalog**: Complete PE-series shotgun lineup with filtering capabilities
- **Product Details**: Specifications, pricing, and image galleries
- **Categories**: Organized by action type (bullpup, over-under, semi-auto, pump-action)
- **Pricing**: Dynamic pricing based on configurations and customizations

### Contact & Inquiry System
- **Enhanced Forms**: Model selection, quantity estimation, and design comments
- **Email Integration**: Automated email sending to chris@uplandimports.com
- **Form Validation**: Zod schema validation with React Hook Form
- **Inquiry Types**: Multiple inquiry categories (pricing, general, technical)

### Configuration Builder
- **Customization Options**: Action type, gauge, barrel length, stock material, finish
- **Real-time Pricing**: Dynamic price calculation based on selected options
- **Custom Branding**: Support for client branding and special requests

### UI/UX Components
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Theme**: Professional dark theme with gold accent colors
- **Navigation**: Smooth scrolling navigation with mobile hamburger menu
- **Modals & Dialogs**: Product details, configuration builder, and contact forms
- **Toast Notifications**: User feedback for form submissions and errors

## Data Flow

### Product Display Flow
1. Frontend requests products from `/api/products`
2. Backend retrieves products from storage (memory or database)
3. Products filtered by category if specified
4. Frontend renders product cards with images and basic info
5. Detail modal triggered on product interaction

### Contact Form Flow
1. User fills out contact form with validation
2. Form data validated using Zod schemas
3. POST request to `/api/inquiries` with form data
4. Backend processes inquiry and sends email via Gmail SMTP
5. Success/error feedback displayed to user
6. Form reset on successful submission

### Configuration Flow
1. User selects base product and customization options
2. Real-time price calculation based on selections
3. Configuration saved to `/api/configurations`
4. Optional quote request generates inquiry with configuration reference

## External Dependencies

### Email Service
- **Gmail SMTP**: Business email integration
- **Environment Variables**: `GMAIL_USER` and `GMAIL_APP_PASSWORD`
- **Nodemailer**: Email sending library with Gmail transport

### UI Libraries
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Development Tools
- **TypeScript**: Static type checking
- **ESBuild**: Fast bundling for server-side code
- **Vite**: Frontend build tool and development server
- **React Query**: Data fetching and caching

## Deployment Strategy

### Vercel Deployment
- **Platform**: Vercel for both frontend and serverless functions
- **Build Process**: Automated builds from GitHub integration
- **Environment**: Production environment variables configured in Vercel dashboard
- **API Routes**: Serverless functions in `/api/` directory
- **Static Assets**: Served from `/dist/public/` directory

### Configuration Files
- **vercel.json**: Deployment configuration with Node.js runtime
- **package.json**: Build scripts and dependencies
- **tsconfig.json**: TypeScript configuration for full-stack development
- **vite.config.ts**: Frontend build configuration

### Environment Variables
- `GMAIL_USER`: Gmail account for SMTP authentication
- `GMAIL_APP_PASSWORD`: Gmail app-specific password
- `DATABASE_URL`: PostgreSQL connection string (optional)
- `NODE_ENV`: Environment mode (development/production)

### File Structure
- `/client/`: Frontend React application
- `/server/`: Backend Express.js application
- `/shared/`: Shared types and schemas
- `/api/`: Vercel serverless functions
- `/uploads/`: Static file storage for images
- `/dist/`: Production build output

The application uses a monorepo structure with clear separation between frontend and backend code, enabling easy maintenance and deployment to Vercel's serverless platform.