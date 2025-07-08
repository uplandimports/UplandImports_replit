# Upland Imports - Turkish Shotgun Manufacturing Platform

## Overview

Upland Imports is a full-stack web application for a Turkish shotgun manufacturing company that specializes in white label services and custom firearm configurations. The platform serves as both a product catalog and a business inquiry system, allowing potential clients to browse premium shotgun models, configure custom specifications, and submit business inquiries for white label manufacturing services.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React-based SPA with TypeScript, utilizing Vite for development and build processes
- **Backend**: Express.js REST API server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **UI Framework**: Shadcn/ui components with Radix UI primitives and Tailwind CSS
- **State Management**: TanStack Query for server state management
- **Email Service**: Nodemailer for handling contact form submissions

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI
- **Styling**: Tailwind CSS with CSS variables for theming
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: TanStack Query with custom API request utilities

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas for request validation
- **Email**: Nodemailer for SMTP email sending
- **Storage**: In-memory storage with interface for future database integration

### Database Schema
- **Products**: Core shotgun models with specifications, pricing, and categories
- **Configurations**: Custom shotgun configurations with pricing calculations
- **Inquiries**: Business inquiry submissions with contact information

## Data Flow

1. **Product Catalog**: Frontend fetches product data from `/api/products` endpoint
2. **Custom Configuration**: Users configure shotguns through the builder, which calculates pricing and saves configurations via `/api/configurations`
3. **Business Inquiries**: Contact forms submit to `/api/inquiries` with email notifications
4. **Real-time Updates**: TanStack Query manages cache invalidation and optimistic updates

## External Dependencies

### Core Dependencies
- **Database**: Neon serverless PostgreSQL
- **Email Service**: SMTP provider (Gmail by default)
- **UI Components**: Radix UI primitives for accessibility
- **Development**: Vite with React plugin and Replit integration

### Third-party Services
- **Image Hosting**: External URLs for product images (Unsplash, Pixabay)
- **Email Transport**: Configurable SMTP service
- **Development Tools**: Replit-specific plugins for development environment

## Deployment Strategy

The application is designed for deployment on Replit with the following structure:

- **Development**: `npm run dev` starts both Vite dev server and Express API
- **Build**: `npm run build` creates optimized production bundles
- **Production**: `npm start` serves the built application
- **Database**: Migrations handled via `npm run db:push` using Drizzle Kit

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `SMTP_HOST`, `SMTP_PORT`: Email server configuration
- `SMTP_USER`, `SMTP_PASS`: Email authentication credentials

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- January 07, 2025: Updated website with authentic PowerPoint content
  - Replaced sample products with real PE-series models (PE-701, PE-601, PE-501, PE-401, PE-301)
  - Updated hero section with "White Label Opportunity" messaging
  - Added bullpup and pump-action categories to product filters
  - Updated service descriptions with authentic manufacturing details
  - Integrated real product specifications and pricing from presentation
  - Updated contact section with partnership opportunity messaging

## Changelog

Changelog:
- July 01, 2025. Initial setup
- January 07, 2025. Integrated authentic PowerPoint content and PE-series product lineup