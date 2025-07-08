import express from "express";
import nodemailer from "nodemailer";
import { storage } from "../server/storage";
import { insertConfigurationSchema, insertInquirySchema } from "../shared/schema";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
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
    const validation = insertConfigurationSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid configuration data" });
    }
    
    const configuration = await storage.createConfiguration(validation.data);
    res.json(configuration);
  } catch (error) {
    res.status(500).json({ message: "Failed to create configuration" });
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
    const validation = insertInquirySchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid inquiry data" });
    }
    
    const inquiry = await storage.createInquiry(validation.data);
    
    // Send email notification
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: 'chris@uplandimports.com',
        subject: `New Business Inquiry - ${inquiry.inquiryType}`,
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
        `
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }
    
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to create inquiry" });
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

export default app;