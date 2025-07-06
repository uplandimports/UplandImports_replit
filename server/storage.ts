import { products, configurations, inquiries, type Product, type Configuration, type Inquiry, type InsertProduct, type InsertConfiguration, type InsertInquiry } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  
  // Configurations
  createConfiguration(config: InsertConfiguration): Promise<Configuration>;
  getConfiguration(id: number): Promise<Configuration | undefined>;
  
  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private configurations: Map<number, Configuration>;
  private inquiries: Map<number, Inquiry>;
  private currentProductId: number;
  private currentConfigId: number;
  private currentInquiryId: number;

  constructor() {
    this.products = new Map();
    this.configurations = new Map();
    this.inquiries = new Map();
    this.currentProductId = 1;
    this.currentConfigId = 1;
    this.currentInquiryId = 1;
    
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: "PE-701 Bullpup",
        description: "Compact tactical design with reliable performance. Perfect balance of innovative bullpup configuration and dependable operation.",
        category: "bullpup",
        gauge: "12",
        basePrice: "849.00",
        imageUrl: "https://via.placeholder.com/600x400/2D2D2D/FFD700?text=PE-701+Bullpup",
        specifications: JSON.stringify({
          action: "Semi-automatic",
          barrel: "18.50\"",
          overall: "29.13\"",
          capacity: "5+1 rounds",
          chamber: "3\" chamber"
        }),
        available: true
      },
      {
        id: 2,
        name: "PE-601 Over-Under",
        description: "Premium sporting arms with chrome-lined barrels and hand-finished Turkish walnut stock. Classic over-under configuration for discerning shooters.",
        category: "over-under",
        gauge: "12",
        basePrice: "1,149.00",
        imageUrl: "https://via.placeholder.com/600x400/2D2D2D/FFD700?text=PE-601+Over-Under",
        specifications: JSON.stringify({
          action: "Over-Under",
          barrel: "27.95\"",
          overall: "45.27\"",
          capacity: "2 rounds",
          features: "Selective ejectors, 5 chokes"
        }),
        available: true
      },
      {
        id: 3,
        name: "PE-501 Semi-Auto",
        description: "Versatile semi-automatic with premium chrome-lined barrels and superior handling. Reliable performance for tactical and sporting applications.",
        category: "semi-auto",
        gauge: "12",
        basePrice: "749.00",
        imageUrl: "https://via.placeholder.com/600x400/2D2D2D/FFD700?text=PE-501+Semi-Auto",
        specifications: JSON.stringify({
          action: "Semi-automatic",
          barrel: "18.50\"",
          overall: "38.18\"",
          capacity: "5+1 rounds",
          features: "Chrome-lined barrel"
        }),
        available: true
      },
      {
        id: 4,
        name: "PE-401 Pump Action",
        description: "Proven market performance with dual action bars and rotary bolt head design. Available in tactical and field configurations.",
        category: "pump-action",
        gauge: "12",
        basePrice: "629.00",
        imageUrl: "https://via.placeholder.com/600x400/2D2D2D/FFD700?text=PE-401+Pump+Action",
        specifications: JSON.stringify({
          action: "Pump action",
          barrel: "24\"-28\"",
          overall: "40.15\"-45.27\"",
          capacity: "5+1 rounds",
          features: "Dual action bars"
        }),
        available: true
      },
      {
        id: 5,
        name: "PE-301 Semi-Auto",
        description: "Premium materials and craftsmanship with self-regulating gas system. Multiple barrel configurations for diverse market segments.",
        category: "semi-auto",
        gauge: "12",
        basePrice: "799.00",
        imageUrl: "/uploads/pe-301/301wood.jpeg",
        specifications: JSON.stringify({
          action: "Semi-automatic",
          barrel: "20\"-28\"",
          overall: "40.15\"-45.27\"",
          capacity: "5+1 rounds",
          features: "Self-regulating gas system"
        }),
        available: true
      }
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
      this.currentProductId = Math.max(this.currentProductId, product.id + 1);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async createConfiguration(insertConfig: InsertConfiguration): Promise<Configuration> {
    const id = this.currentConfigId++;
    const config: Configuration = {
      id,
      productId: insertConfig.productId,
      actionType: insertConfig.actionType,
      gauge: insertConfig.gauge,
      barrelLength: insertConfig.barrelLength,
      stockMaterial: insertConfig.stockMaterial,
      finish: insertConfig.finish,
      customBranding: insertConfig.customBranding ?? null,
      specialRequests: insertConfig.specialRequests ?? null,
      estimatedPrice: insertConfig.estimatedPrice
    };
    this.configurations.set(id, config);
    return config;
  }

  async getConfiguration(id: number): Promise<Configuration | undefined> {
    return this.configurations.get(id);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = {
      id,
      firstName: insertInquiry.firstName,
      lastName: insertInquiry.lastName,
      company: insertInquiry.company ?? null,
      email: insertInquiry.email,
      phone: insertInquiry.phone ?? null,
      inquiryType: insertInquiry.inquiryType,
      message: insertInquiry.message,
      configurationId: insertInquiry.configurationId ?? null,
      createdAt: new Date().toISOString()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
}

export const storage = new MemStorage();
