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
        name: "Elite O/U 12GA",
        description: "Premium over/under with Turkish walnut stock and precision engineering",
        category: "over-under",
        gauge: "12",
        basePrice: "850.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        specifications: JSON.stringify({
          barrels: ["28\"", "30\""],
          choke: "Multi-choke",
          stock: "Turkish Walnut",
          weight: "7.5 lbs"
        }),
        available: true
      },
      {
        id: 2,
        name: "Classic SxS 20GA",
        description: "Traditional side-by-side with hand-engraved receiver and premium finish",
        category: "side-by-side",
        gauge: "20",
        basePrice: "1200.00",
        imageUrl: "https://pixabay.com/get/g22860e6eef9895235616107e4f5abf2feb4b5cbd372980d6368f6ae4a9d456e2cf9f0af34bd5694bce6a72461ce87219a2e3dcc81ff915893909a58a5312cd9a_1280.jpg",
        specifications: JSON.stringify({
          barrels: ["26\"", "28\""],
          choke: "IC/M",
          stock: "Select Walnut",
          weight: "6.2 lbs"
        }),
        available: true
      },
      {
        id: 3,
        name: "Auto Sport 12GA",
        description: "Gas-operated semi-automatic with synthetic or wood stock options",
        category: "semi-auto",
        gauge: "12",
        basePrice: "675.00",
        imageUrl: "https://pixabay.com/get/g9aef70e48d98b53d4f747afe54f1129c4b71170dd68a68919ff605a67273f2b3961280bc880b7b2b704fd9ef5dd1c89ca0494dd18c69c38818774ec56b4fa6f4_1280.jpg",
        specifications: JSON.stringify({
          barrels: ["26\"", "28\"", "30\""],
          action: "Gas-operated",
          capacity: "4+1",
          weight: "7.8 lbs"
        }),
        available: true
      },
      {
        id: 4,
        name: "Competition Pro",
        description: "Professional-grade competition shotgun with adjustable comb and trigger",
        category: "over-under",
        gauge: "12",
        basePrice: "1450.00",
        imageUrl: "https://pixabay.com/get/g65c4d41ae2cd21e4a8eff39931076c30b690b96aca20bf915e76cad3438943c6043bfb50d0b4d4f09f01e8dffb372550e3f35663d68c163abcc170ece0fc0851_1280.jpg",
        specifications: JSON.stringify({
          barrels: ["30\"", "32\""],
          choke: "Extended tubes",
          features: "Adjustable comb",
          weight: "8.2 lbs"
        }),
        available: true
      },
      {
        id: 5,
        name: "Heritage SxS 16GA",
        description: "Traditional 16-gauge with color case hardened receiver",
        category: "side-by-side",
        gauge: "16",
        basePrice: "975.00",
        imageUrl: "https://pixabay.com/get/g2123cbda2c587c279541831f2a689eb5cb9b70c72b44be605da5d3f7041f01e6c66794dbd23d59690036d40440548656314d83d437659450042b558f50c7acc7_1280.jpg",
        specifications: JSON.stringify({
          barrels: ["26\"", "28\""],
          finish: "Case hardened",
          weight: "6.5 lbs",
          stock: "Grade II Walnut"
        }),
        available: true
      },
      {
        id: 6,
        name: "Tactical Auto 12GA",
        description: "Tactical configuration with rail system and adjustable stock",
        category: "semi-auto",
        gauge: "12",
        basePrice: "725.00",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        specifications: JSON.stringify({
          barrels: ["18.5\"", "20\""],
          features: "Rail system",
          stock: "Adjustable",
          capacity: "5+1"
        }),
        available: true
      },
      {
        id: 7,
        name: "Youth O/U 20GA",
        description: "Compact over/under designed for youth and smaller-framed shooters",
        category: "over-under",
        gauge: "20",
        basePrice: "695.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        specifications: JSON.stringify({
          barrels: ["24\"", "26\""],
          lop: "13.5\"",
          weight: "5.8 lbs",
          stock: "Compact design"
        }),
        available: true
      },
      {
        id: 8,
        name: "Artisan SxS 28GA",
        description: "Hand-engraved 28-gauge with premium grade Turkish walnut",
        category: "side-by-side",
        gauge: "28",
        basePrice: "1650.00",
        imageUrl: "https://pixabay.com/get/g2033c06a966d4ccc5999d4f076e16dbe54f9a254940edcb5c575129e10734f138325d5aca5d7fa6c4e33681b0c35bd4f503efab86e3884c907e417b95ff5ab4d_1280.jpg",
        specifications: JSON.stringify({
          barrels: ["26\"", "28\""],
          engraving: "Hand-engraved",
          grade: "AAA Walnut",
          weight: "5.5 lbs"
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
