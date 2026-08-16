import {
  BusinessState,
  Product,
  TractorRequest,
  CropProcurementRequest,
  Invoice,
  PaymentRecord,
  Farmer,
  ServiceArea,
} from '../types';
import { initialBusinessState } from '../data/initialData';

const LOCAL_STORAGE_KEY = 'sv_traders_business_state_v1';

export class BusinessApiService {
  private static getLocalState(): BusinessState {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }
    return JSON.parse(JSON.stringify(initialBusinessState));
  }

  private static saveLocalState(state: BusinessState) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  static async fetchBusinessState(): Promise<BusinessState> {
    try {
      const res = await fetch('/api/business/state');
      if (res.ok) {
        const data: BusinessState = await res.json();
        this.saveLocalState(data);
        return data;
      }
    } catch (err) {
      console.warn('Server fetch failed, using local cache:', err);
    }
    return this.getLocalState();
  }

  static async getProducts(): Promise<Product[]> {
    const state = await this.fetchBusinessState();
    return state.products;
  }

  static async getServiceAreas(): Promise<ServiceArea[]> {
    const state = await this.fetchBusinessState();
    return state.serviceAreas;
  }

  static async getTractorRequests(): Promise<TractorRequest[]> {
    const state = await this.fetchBusinessState();
    return state.tractorRequests;
  }

  static async getCropRequests(): Promise<CropProcurementRequest[]> {
    const state = await this.fetchBusinessState();
    return state.cropRequests;
  }

  static async getFarmers(): Promise<Farmer[]> {
    const state = await this.fetchBusinessState();
    return state.farmers;
  }

  static async getInvoices(): Promise<Invoice[]> {
    const state = await this.fetchBusinessState();
    return state.invoices;
  }

  static async getSales(): Promise<Invoice[]> {
    const state = await this.fetchBusinessState();
    return state.invoices;
  }

  static async getPayments(): Promise<PaymentRecord[]> {
    const state = await this.fetchBusinessState();
    return state.payments;
  }

  static async submitTractorRequest(req: Partial<TractorRequest>): Promise<TractorRequest> {
    try {
      const res = await fetch('/api/business/tractor-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Server submission failed, storing locally:', e);
    }

    // Local fallback
    const state = this.getLocalState();
    const newReq: TractorRequest = {
      id: `TR-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerName: req.farmerName || '',
      phone: req.phone || '',
      village: req.village || 'Madharam',
      serviceType: req.serviceType || 'Ploughing',
      landArea: req.landArea || '1 Acre',
      preferredDate: req.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: req.preferredTime || 'Morning',
      notes: req.notes || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      estimatedCost: req.estimatedCost || 1500,
    };
    state.tractorRequests.unshift(newReq);
    this.saveLocalState(state);
    return newReq;
  }

  static async submitCropRequest(req: Partial<CropProcurementRequest>): Promise<CropProcurementRequest> {
    try {
      const res = await fetch('/api/business/crop-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Server submission failed, storing locally:', e);
    }

    // Local fallback
    const state = this.getLocalState();
    const newReq: CropProcurementRequest = {
      id: `CR-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerName: req.farmerName || '',
      phone: req.phone || '',
      village: req.village || 'Madharam',
      cropName: req.cropName || 'Paddy',
      quantity: Number(req.quantity) || 10,
      unit: req.unit || 'Quintals',
      expectedRate: req.expectedRate ? Number(req.expectedRate) : undefined,
      preferredDate: req.preferredDate || new Date().toISOString().split('T')[0],
      notes: req.notes || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    state.cropRequests.unshift(newReq);
    this.saveLocalState(state);
    return newReq;
  }

  static async createProduct(product: Partial<Product>): Promise<Product> {
    try {
      const res = await fetch('/api/business/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }

    const state = this.getLocalState();
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: product.name || 'New Product',
      nameTe: product.nameTe,
      category: product.category || 'seeds',
      brand: product.brand || 'Verified Agri Brand',
      unit: product.unit || 'Unit',
      stock: Number(product.stock) || 0,
      minStockThreshold: Number(product.minStockThreshold) || 5,
      price: Number(product.price) || 0,
      description: product.description || '',
      imageUrl:
        product.imageUrl ||
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      isAvailable: true,
      suitableCrops: product.suitableCrops || ['Paddy', 'Cotton'],
    };
    state.products.unshift(newProd);
    this.saveLocalState(state);
    return newProd;
  }

  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    try {
      const res = await fetch(`/api/business/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }

    const state = this.getLocalState();
    const idx = state.products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      state.products[idx] = { ...state.products[idx], ...updates };
      this.saveLocalState(state);
      return state.products[idx];
    }
    throw new Error('Product not found');
  }

  static async updateProductStock(id: string, newStock: number): Promise<Product> {
    return this.updateProduct(id, { stock: newStock });
  }

  static async updateTractorStatus(
    id: string,
    status: TractorRequest['status'],
    assignedOperator?: string
  ): Promise<TractorRequest> {
    try {
      const res = await fetch(`/api/business/tractor-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, assignedOperator }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }

    const state = this.getLocalState();
    const idx = state.tractorRequests.findIndex((r) => r.id === id);
    if (idx !== -1) {
      state.tractorRequests[idx] = {
        ...state.tractorRequests[idx],
        status,
        assignedOperator: assignedOperator || state.tractorRequests[idx].assignedOperator,
      };
      this.saveLocalState(state);
      return state.tractorRequests[idx];
    }
    throw new Error('Request not found');
  }

  static async updateCropStatus(
    id: string,
    status: CropProcurementRequest['status'],
    offeredRate?: number
  ): Promise<CropProcurementRequest> {
    try {
      const res = await fetch(`/api/business/crop-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, offeredRate }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }

    const state = this.getLocalState();
    const idx = state.cropRequests.findIndex((r) => r.id === id);
    if (idx !== -1) {
      state.cropRequests[idx] = {
        ...state.cropRequests[idx],
        status,
        offeredRate: offeredRate !== undefined ? offeredRate : state.cropRequests[idx].offeredRate,
      };
      this.saveLocalState(state);
      return state.cropRequests[idx];
    }
    throw new Error('Request not found');
  }

  static async recordSale(saleData: any): Promise<Invoice> {
    const invoicePayload: Partial<Invoice> = {
      farmerName: saleData.farmerName,
      farmerPhone: saleData.farmerPhone,
      farmerVillage: saleData.village,
      items: saleData.items.map((it: any) => ({
        productId: it.productId,
        productName: it.productName,
        quantity: it.quantity,
        unit: 'Unit',
        unitPrice: it.unitPrice,
        total: it.totalPrice,
      })),
      subtotal: saleData.totalAmount,
      discount: saleData.discount || 0,
      taxRatePercent: 0,
      taxAmount: 0,
      totalAmount: saleData.finalAmount,
      paymentMethod:
        saleData.paymentType === 'CREDIT_KHATA'
          ? 'KHATA_CREDIT'
          : saleData.paymentType === 'ONLINE_UPI'
          ? 'UPI'
          : 'CASH',
      amountPaid: saleData.amountPaid || 0,
      balanceDue: Math.max(0, saleData.finalAmount - (saleData.amountPaid || 0)),
      status:
        (saleData.amountPaid || 0) >= saleData.finalAmount
          ? 'PAID'
          : (saleData.amountPaid || 0) > 0
          ? 'PARTIAL'
          : 'PENDING',
      notes: saleData.notes || '',
    };

    return this.createInvoice(invoicePayload);
  }

  static async createInvoice(invoiceData: Partial<Invoice>): Promise<Invoice> {
    try {
      const res = await fetch('/api/business/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }

    const state = this.getLocalState();
    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `SVT/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      date: invoiceData.date || new Date().toISOString().split('T')[0],
      farmerId: invoiceData.farmerId,
      farmerName: invoiceData.farmerName || 'Walk-in Farmer',
      farmerPhone: invoiceData.farmerPhone || '',
      farmerVillage: invoiceData.farmerVillage || 'Madharam',
      items: invoiceData.items || [],
      subtotal: Number(invoiceData.subtotal) || 0,
      discount: Number(invoiceData.discount) || 0,
      taxRatePercent: Number(invoiceData.taxRatePercent) || 0,
      taxAmount: Number(invoiceData.taxAmount) || 0,
      totalAmount: Number(invoiceData.totalAmount) || 0,
      paymentMethod: invoiceData.paymentMethod || 'CASH',
      amountPaid: Number(invoiceData.amountPaid) || 0,
      balanceDue: Number(invoiceData.balanceDue) || 0,
      status: invoiceData.status || 'PAID',
      notes: invoiceData.notes || '',
    };

    // Deduct stock
    invoice.items.forEach((it) => {
      const prod = state.products.find((p) => p.id === it.productId);
      if (prod) prod.stock = Math.max(0, prod.stock - it.quantity);
    });

    // Update farmer balance if khata
    if (invoice.balanceDue > 0) {
      let farmer = state.farmers.find(
        (f) =>
          (invoice.farmerPhone && f.phone === invoice.farmerPhone) ||
          f.name.toLowerCase() === invoice.farmerName.toLowerCase()
      );
      if (farmer) {
        farmer.outstandingBalance += invoice.balanceDue;
        farmer.totalPurchases += invoice.totalAmount;
      } else {
        state.farmers.push({
          id: `farm-${Date.now()}`,
          name: invoice.farmerName,
          phone: invoice.farmerPhone || '9705806070',
          village: invoice.farmerVillage || 'Madharam',
          landSizeAcres: 5,
          primaryCrops: ['Paddy', 'Cotton'],
          outstandingBalance: invoice.balanceDue,
          totalPurchases: invoice.totalAmount,
          createdAt: new Date().toISOString(),
        });
      }
    }

    state.invoices.unshift(invoice);
    this.saveLocalState(state);
    return invoice;
  }

  static async recordFarmerPayment(
    farmerId: string,
    amount: number,
    paymentMethod: 'CASH' | 'UPI' | 'BANK_TRANSFER' = 'CASH',
    referenceNote?: string
  ): Promise<PaymentRecord> {
    return this.recordPayment({
      farmerId,
      amount,
      paymentMethod,
      referenceNote,
    });
  }

  static async recordPayment(paymentData: Partial<PaymentRecord>): Promise<PaymentRecord> {
    try {
      const res = await fetch('/api/business/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }

    const state = this.getLocalState();
    const payment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      farmerId: paymentData.farmerId || 'unknown',
      farmerName: paymentData.farmerName || 'Farmer',
      amount: Number(paymentData.amount) || 0,
      date: paymentData.date || new Date().toISOString().split('T')[0],
      paymentMethod: paymentData.paymentMethod || 'CASH',
      referenceNote: paymentData.referenceNote || 'Khata clearance payment',
      invoiceId: paymentData.invoiceId,
    };

    const farmer = state.farmers.find((f) => f.id === payment.farmerId);
    if (farmer) {
      farmer.outstandingBalance = Math.max(0, farmer.outstandingBalance - payment.amount);
    }

    state.payments.unshift(payment);
    this.saveLocalState(state);
    return payment;
  }

  static async askGeminiAdvisor(prompt: string, language: string = 'en'): Promise<string> {
    return this.askAiAssistant(prompt, language);
  }

  static async askAiAssistant(prompt: string, language: string = 'en'): Promise<string> {
    try {
      const res = await fetch('/api/business/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, language }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.reply;
      }
    } catch (e) {
      console.warn('AI API error:', e);
    }
    return 'Sri Venkateshwara Traders AI is ready. For direct assistance, please call 9705806070 or visit our main shop in Madharam Village.';
  }

  static async resetDatabase(): Promise<boolean> {
    try {
      await fetch('/api/business/reset', { method: 'POST' });
    } catch (e) {
      console.warn(e);
    }
    this.saveLocalState(JSON.parse(JSON.stringify(initialBusinessState)));
    return true;
  }
}
