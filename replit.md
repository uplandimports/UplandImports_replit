# replit.md

## Overview

This is a professional B2B website for Upland Imports, a company specializing in white label Turkish shotgun manufacturing services. The application is built as a modern full-stack web application with React frontend and Express.js backend, featuring product catalogs, contact forms, and email integration for business inquiries.

## Recent Changes

### July 8, 2025 - Latest Session
- Fixed critical React errors in contact form component
- Resolved SelectItem value prop issue causing runtime errors
- Fixed empty string default values in form fields
- Cleaned up API request error handling
- Verified server startup and email configuration
- Application running successfully on port 5000

### July 8, 2025 - Earlier
- Fixed TypeScript compilation errors in storage.ts
- Resolved nullable field handling with proper null coalescing
- Updated API to correctly use firstName/lastName instead of name
- Configured Vercel deployment with proper static site serving
- Ready for production deployment with all TypeScript errors resolved

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with dark theme and gold accents
- **State Management**: React Query (TanStack Query) for server state
- **Form Management**: React Hook Form with Zod validation
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite with TypeScript support

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 18.x
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Email Service**: Nodemailer with Gmail SMTP
- **API Design**: RESTful endpoints with JSON responses

### Development vs Production Setup
- **Development**: Full Express server with Vite middleware
- **Production**: Serverless functions on Vercel with static file serving

## Key Components

### Database Schema
The application uses four main tables:
- `products`: Shotgun product catalog with specifications and pricing
- `configurations`: Custom shotgun configurations with pricing estimates
- `inquiries`: Customer inquiries and contact form submissions
- `quotes`: Quote requests and pricing information

### API Endpoints
- `GET /api/products`: Retrieve all products or filter by category
- `GET /api/products/:id`: Get specific product details
- `POST /api/configurations`: Create custom shotgun configurations
- `POST /api/inquiries`: Submit customer inquiries
- `POST /api/quotes`: Request pricing quotes

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **Hero Section**: Landing area with call-to-action buttons
- **Product Catalog**: Filterable product grid with detailed modals
- **Services Overview**: Company capabilities and manufacturing services
- **Contact Section**: Enhanced contact form with model selection
- **Shotgun Builder**: Interactive configuration tool (partially implemented)

### Email Integration
- Uses Gmail SMTP for sending business inquiries
- Requires `GMAIL_USER` and `GMAIL_APP_PASSWORD` environment variables
- Sends inquiries to chris@uplandimports.com

## Data Flow

1. **Product Display**: Products are fetched from the database and displayed in a responsive grid
2. **Configuration**: Users can create custom shotgun configurations with real-time pricing
3. **Inquiry Submission**: Contact forms validate input and send emails while storing in database
4. **Quote Requests**: Customers can request quotes for specific products or configurations

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **nodemailer**: Email sending functionality
- **@radix-ui/***: Accessible UI components
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling
- **zod**: Schema validation

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking
- **tailwindcss**: Utility-first CSS framework
- **esbuild**: Fast JavaScript bundler

## Deployment Strategy

### Vercel Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **API Routes**: Serverless functions in `/api/`
- **Static Files**: Served from `dist/public`
- **Node Runtime**: `@vercel/node@2.15.10`

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `GMAIL_USER`: Gmail account for sending emails
- `GMAIL_APP_PASSWORD`: Gmail app password for SMTP

### File Structure
- `client/`: React frontend application
- `server/`: Express.js backend (development)
- `api/`: Serverless functions (production)
- `shared/`: Shared TypeScript types and schemas
- `uploads/`: Static file storage directory

The application follows a modern full-stack architecture with clear separation between client and server code, comprehensive type safety, and deployment flexibility for both development and production environments.