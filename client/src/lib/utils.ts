import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(numPrice);
}

export function calculateConfigurationPrice(basePrice: number, options: any): number {
  let totalPrice = basePrice;
  
  // Add pricing logic based on configuration options
  if (options.stockMaterial === 'walnut') {
    totalPrice += 100;
  }
  
  if (options.finish === 'nickel') {
    totalPrice += 150;
  } else if (options.finish === 'case-hardened') {
    totalPrice += 200;
  }
  
  if (options.customBranding) {
    totalPrice += 75;
  }
  
  return totalPrice;
}
