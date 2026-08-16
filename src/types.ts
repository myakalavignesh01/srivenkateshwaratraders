export type Language = 'en' | 'te';

export type ProductCategory = 'seeds' | 'fertilizers' | 'pesticides' | 'machinery_parts' | 'all';

export interface Product {
  id: string;
  name: string;
  nameTe?: string;
  category: 'seeds' | 'fertilizers' | 'pesticides' | 'machinery_parts';
  brand: string;
  unit: string;
  stock: number;
  minStockThreshold: number;
  price: number;
  description: string;
  descriptionTe?: string;
  imageUrl: string;
  isAvailable: boolean;
  suitableCrops?: string[];
}

export type TractorServiceType =
  | 'Ploughing (దున్నడం)'
  | 'Rotavator (రోటవేటర్)'
  | 'Cultivation (కల్టివేటర్)'
  | 'Harvesting (కోత కోయడం)'
  | 'DCM / Crop Transport (రవాణా)'
  | 'Land Leveling (భూమి చదును చేయడం)'
  | 'Other Works (ఇతర పనులు)';

export type RequestStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface TractorRequest {
  id: string;
  farmerName: string;
  phone: string;
  village: string;
  serviceType: string;
  landArea: string; // e.g. "3.5 Acres"
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: RequestStatus;
  createdAt: string;
  assignedOperator?: string;
  estimatedCost?: number;
}

export interface CropProcurementRequest {
  id: string;
  farmerName: string;
  phone: string;
  village: string;
  cropName: string; // e.g. Paddy, Cotton, Red Gram, Groundnut, Maize
  quantity: number;
  unit: 'Quintals' | 'Bags' | 'Tonnes' | 'Kgs';
  expectedRate?: number;
  preferredDate: string;
  notes?: string;
  status: RequestStatus;
  createdAt: string;
  offeredRate?: number;
  netPayable?: number;
}

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  village: string;
  landSizeAcres: number;
  primaryCrops: string[];
  outstandingBalance: number; // Positive means farmer owes business (Khata/Credit)
  totalPurchases: number;
  notes?: string;
  createdAt: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Sale {
  id: string;
  farmerName: string;
  farmerPhone: string;
  village: string;
  items: SaleItem[];
  totalAmount: number;
  discount: number;
  finalAmount: number;
  paymentType: 'CASH' | 'ONLINE_UPI' | 'CREDIT_KHATA';
  amountPaid: number;
  createdAt: string;
  notes?: string;
}

export interface InvoiceItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  saleId?: string;
  farmerId?: string;
  farmerName: string;
  farmerPhone: string;
  farmerVillage: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  taxRatePercent: number; // Configurable
  taxAmount: number;
  totalAmount: number;
  paymentMethod: 'CASH' | 'UPI' | 'KHATA_CREDIT' | 'BANK_TRANSFER' | 'PARTIAL';
  amountPaid: number;
  balanceDue: number;
  status: 'PAID' | 'PENDING' | 'PARTIAL';
  notes?: string;
}

export interface PaymentRecord {
  id: string;
  farmerId: string;
  farmerName: string;
  amount: number;
  date: string;
  paymentMethod: 'CASH' | 'UPI' | 'BANK_TRANSFER';
  referenceNote?: string;
  invoiceId?: string;
}

export interface ServiceArea {
  id: string;
  villageName: string;
  villageNameTe: string;
  distanceKm: number;
  servicesAvailable: string[];
  isPrimary: boolean;
  latitude?: number;
  longitude?: number;
}

export interface BusinessStats {
  todaySales: number;
  monthlySales: number;
  totalProductsCount: number;
  lowStockCount: number;
  totalFarmersCount: number;
  pendingTractorRequestsCount: number;
  pendingCropRequestsCount: number;
  totalOutstandingKhata: number;
}

export interface BusinessState {
  products: Product[];
  tractorRequests: TractorRequest[];
  cropRequests: CropProcurementRequest[];
  farmers: Farmer[];
  invoices: Invoice[];
  payments: PaymentRecord[];
  serviceAreas: ServiceArea[];
  settings: {
    businessName: string;
    businessNameTe: string;
    phone: string;
    email: string;
    address: string;
    addressTe: string;
    gstNumber: string;
    taxRatePercent: number;
    adminPin: string;
  };
}
