# Upland Imports - Turkish Shotgun Manufacturing Platform

## Overview

This is a professional B2B website for Upland Imports, specializing in white label Turkish shotgun manufacturing services. The platform features a modern React-based frontend with an Express.js backend, showcasing a complete PE-series shotgun lineup with inquiry and contact management capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with dark theme and gold accents
- **UI Components**: shadcn/ui component library built on Radix UI
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Email Service**: Nodemailer with Gmail SMTP integration
- **API Design**: RESTful endpoints for products, configurations, and inquiries
- **Environment**: Node.js 18.x runtime
- **Storage**: In-memory storage with interface for future database integration

### Database Schema (Drizzle ORM)
The application uses Drizzle ORM with PostgreSQL schema definition:
- **Products**: Product catalog with specifications, pricing, and availability
- **Configurations**: Custom shotgun configurations with pricing calculations
- **Inquiries**: Customer inquiries with contact information and requirements
- **Quotes**: Quote management system with status tracking

## Key Components

### Product Management
- Complete PE-series shotgun catalog (PE-301, PE-401, PE-501, PE-601, PE-701)
- Product categories: Over-under, Semi-auto, Pump-action, Bullpup
- Detailed specifications and pricing information
- Image management and display system

### Contact System
- Multi-purpose contact forms for different inquiry types
- Model selection and quantity estimation
- Custom branding and design comments
- Email integration sending to chris@uplandimports.com

### Configuration Builder
- Interactive shotgun customization tool
- Options for action type, gauge, barrel length, stock material, finish
- Real-time pricing calculations
- Custom branding and special requests handling

### Email Integration
- Gmail SMTP configuration for business communications
- Automated inquiry processing and notifications
- Form validation and error handling

## Data Flow

1. **Product Display**: Products are fetched from the in-memory storage and displayed in categorized sections
2. **Inquiry Processing**: Contact forms collect customer information and send emails via Nodemailer
3. **Configuration Management**: Custom configurations are saved and can be referenced in inquiries
4. **Quote Generation**: Inquiries can be converted to quotes with pricing and status tracking

## External Dependencies

### Core Libraries
- React ecosystem: React Router alternative (Wouter), TanStack Query
- UI Framework: Radix UI primitives with shadcn/ui components
- Styling: Tailwind CSS with custom dark theme
- Forms: React Hook Form with Zod validation
- Email: Nodemailer with Gmail SMTP transport

### Development Tools
- TypeScript for type safety
- Vite for build tooling
- ESBuild for server bundling
- Drizzle Kit for database schema management

### Email Configuration
- Gmail SMTP service integration
- Environment variables: GMAIL_USER, GMAIL_APP_PASSWORD
- Recipient: chris@uplandimports.com

## Deployment Strategy

### Vercel Deployment
- **Platform**: Vercel with automatic GitHub integration
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **API Routes**: Serverless functions in `/api/` directory
- **Node Runtime**: @vercel/node@2.15.10

### Environment Setup
- Node.js 18.x specified in .nvmrc and vercel.json
- Environment variables configured in Vercel dashboard
- Static file serving for uploads and images

### Database Migration Path
- Current: In-memory storage implementation
- Future: PostgreSQL with Drizzle ORM (schema already defined)
- Migration ready with DATABASE_URL environment variable

## Changelog

- July 08, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.