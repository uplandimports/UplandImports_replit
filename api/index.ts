import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from "nodemailer";
import { storage } from "../server/storage";
import { insertConfigurationSchema, insertInquirySchema } from "../shared/schema";

// Email transporter setup
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  const url = req.url || '';
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Products routes
    if (method === 'GET' && url.match(/^\/api\/products$/)) {
      const category = req.query.category as string;
      const products = category 
        ? await storage.getProductsByCategory(category)
        : await storage.getProducts();
      return res.json(products);
    }
    
    if (method === 'GET' && url.match(/^\/api\/products\/\d+$/)) {
      const id = parseInt(url.split('/').pop() || '0');
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(product);
    }

    // Configuration routes
    if (method === 'POST' && url.match(/^\/api\/configurations$/)) {
      const validation = insertConfigurationSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid configuration data" });
      }
      
      const configuration = await storage.createConfiguration(validation.data);
      return res.json(configuration);
    }
    
    if (method === 'GET' && url.match(/^\/api\/configurations\/\d+$/)) {
      const id = parseInt(url.split('/').pop() || '0');
      const configuration = await storage.getConfiguration(id);
      if (!configuration) {
        return res.status(404).json({ message: "Configuration not found" });
      }
      return res.json(configuration);
    }

    // Inquiry routes
    if (method === 'POST' && url.match(/^\/api\/inquiries$/)) {
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
      
      return res.json(inquiry);
    }
    
    if (method === 'GET' && url.match(/^\/api\/inquiries$/)) {
      const inquiries = await storage.getInquiries();
      return res.json(inquiries);
    }

    // Default 404
    res.status(404).json({ message: 'Not Found' });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}