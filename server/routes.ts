import type { Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from "nodemailer";
import { storage } from "./storage";
import { insertConfigurationSchema, insertInquirySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email transporter setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Test email configuration
  console.log('Email config:', {
    user: process.env.GMAIL_USER ? 'Set' : 'Not set',
    pass: process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set'
  });

  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category as string;
      const products = category 
        ? await storage.getProductsByCategory(category)
        : await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Configuration routes
  app.post("/api/configurations", async (req, res) => {
    try {
      const validatedData = insertConfigurationSchema.parse(req.body);
      const configuration = await storage.createConfiguration(validatedData);
      res.status(201).json(configuration);
    } catch (error) {
      res.status(400).json({ message: "Invalid configuration data" });
    }
  });

  app.get("/api/configurations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const configuration = await storage.getConfiguration(id);
      if (!configuration) {
        return res.status(404).json({ message: "Configuration not found" });
      }
      res.json(configuration);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch configuration" });
    }
  });

  // Inquiry routes
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);

      // Send email notification
      const mailOptions = {
        from: process.env.GMAIL_USER || process.env.EMAIL_USER,
        to: process.env.CONTACT_EMAIL || "chris@uplandimports.com",
        subject: `New ${inquiry.inquiryType} Inquiry from ${inquiry.company || inquiry.firstName + ' ' + inquiry.lastName}`,
        html: `
          <h2>New Business Inquiry</h2>
          <p><strong>Name:</strong> ${inquiry.firstName} ${inquiry.lastName}</p>
          ${inquiry.company ? `<p><strong>Company:</strong> ${inquiry.company}</p>` : ''}
          <p><strong>Email:</strong> ${inquiry.email}</p>
          ${inquiry.phone ? `<p><strong>Phone:</strong> ${inquiry.phone}</p>` : ''}
          <p><strong>Inquiry Type:</strong> ${inquiry.inquiryType}</p>
          <p><strong>Message:</strong></p>
          <p>${inquiry.message}</p>
          ${inquiry.selectedModel ? `<p><strong>Model of Interest:</strong> ${inquiry.selectedModel}</p>` : ''}
          ${inquiry.quantity ? `<p><strong>Estimated Quantity:</strong> ${inquiry.quantity}</p>` : ''}
          ${inquiry.designComments ? `<p><strong>Design Comments:</strong> ${inquiry.designComments}</p>` : ''}
          ${inquiry.configurationId ? `<p><strong>Configuration ID:</strong> ${inquiry.configurationId}</p>` : ''}
          <p><strong>Submitted:</strong> ${inquiry.createdAt}</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue with response even if email fails
      }

      res.status(201).json(inquiry);
    } catch (error) {
      res.status(400).json({ message: "Invalid inquiry data" });
    }
  });

  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
