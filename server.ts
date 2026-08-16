import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { initialBusinessState } from './src/data/initialData';
import { BusinessState, Product, TractorRequest, CropProcurementRequest, Invoice, PaymentRecord, Farmer } from './src/types';

dotenv.config();

// In-memory data store with file persistence for durability
let businessData: BusinessState = JSON.parse(JSON.stringify(initialBusinessState));
const DB_FILE = path.join(process.cwd(), 'data-store.json');

// Try loading existing state if available
try {
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    businessData = JSON.parse(raw);
    console.log('Loaded persistent business data from disk.');
  }
} catch (e) {
  console.warn('Could not read existing db file, using initial data:', e);
}

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(businessData, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save db to file:', err);
  }
}

// Lazy Gemini SDK client initialization
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', business: 'Sri Venkateshwara Traders', time: new Date().toISOString() });
  });

  // 1. Get entire business state
  app.get('/api/business/state', (req: Request, res: Response) => {
    res.json(businessData);
  });

  // 2. Products CRUD
  app.get('/api/business/products', (req: Request, res: Response) => {
    res.json(businessData.products);
  });

  app.post('/api/business/products', (req: Request, res: Response) => {
    const newProduct: Product = {
      ...req.body,
      id: req.body.id || `prod-${Date.now()}`,
    };
    businessData.products.unshift(newProduct);
    saveDb();
    res.status(201).json(newProduct);
  });

  app.put('/api/business/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = businessData.products.findIndex(p => p.id === id);
    if (index !== -1) {
      businessData.products[index] = { ...businessData.products[index], ...req.body };
      saveDb();
      res.json(businessData.products[index]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });

  app.delete('/api/business/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    businessData.products = businessData.products.filter(p => p.id !== id);
    saveDb();
    res.json({ success: true });
  });

  // 3. Tractor Requests
  app.get('/api/business/tractor-requests', (req: Request, res: Response) => {
    res.json(businessData.tractorRequests);
  });

  app.post('/api/business/tractor-requests', (req: Request, res: Response) => {
    const request: TractorRequest = {
      id: req.body.id || `TR-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerName: req.body.farmerName,
      phone: req.body.phone,
      village: req.body.village,
      serviceType: req.body.serviceType,
      landArea: req.body.landArea || '1 Acre',
      preferredDate: req.body.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: req.body.preferredTime || 'Morning',
      notes: req.body.notes || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      estimatedCost: req.body.estimatedCost || 1200,
    };
    businessData.tractorRequests.unshift(request);

    // Auto-link/create farmer record if doesn't exist
    const existingFarmer = businessData.farmers.find(f => f.phone === request.phone);
    if (!existingFarmer && request.farmerName) {
      businessData.farmers.push({
        id: `farm-${Date.now()}`,
        name: request.farmerName,
        phone: request.phone,
        village: request.village,
        landSizeAcres: parseFloat(request.landArea) || 2,
        primaryCrops: ['Cotton', 'Paddy'],
        outstandingBalance: 0,
        totalPurchases: 0,
        notes: `Registered via Tractor booking (${request.id})`,
        createdAt: new Date().toISOString(),
      });
    }

    saveDb();
    res.status(201).json(request);
  });

  app.put('/api/business/tractor-requests/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = businessData.tractorRequests.findIndex(r => r.id === id);
    if (index !== -1) {
      businessData.tractorRequests[index] = { ...businessData.tractorRequests[index], ...req.body };
      saveDb();
      res.json(businessData.tractorRequests[index]);
    } else {
      res.status(404).json({ error: 'Tractor request not found' });
    }
  });

  // 4. Crop Procurement Requests
  app.get('/api/business/crop-requests', (req: Request, res: Response) => {
    res.json(businessData.cropRequests);
  });

  app.post('/api/business/crop-requests', (req: Request, res: Response) => {
    const request: CropProcurementRequest = {
      id: req.body.id || `CR-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerName: req.body.farmerName,
      phone: req.body.phone,
      village: req.body.village,
      cropName: req.body.cropName,
      quantity: Number(req.body.quantity) || 10,
      unit: req.body.unit || 'Quintals',
      expectedRate: req.body.expectedRate ? Number(req.body.expectedRate) : undefined,
      preferredDate: req.body.preferredDate || new Date().toISOString().split('T')[0],
      notes: req.body.notes || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    businessData.cropRequests.unshift(request);

    // Auto-link/create farmer record
    const existingFarmer = businessData.farmers.find(f => f.phone === request.phone);
    if (!existingFarmer && request.farmerName) {
      businessData.farmers.push({
        id: `farm-${Date.now()}`,
        name: request.farmerName,
        phone: request.phone,
        village: request.village,
        landSizeAcres: 3,
        primaryCrops: [request.cropName],
        outstandingBalance: 0,
        totalPurchases: 0,
        notes: `Registered via Crop selling desk (${request.id})`,
        createdAt: new Date().toISOString(),
      });
    }

    saveDb();
    res.status(201).json(request);
  });

  app.put('/api/business/crop-requests/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = businessData.cropRequests.findIndex(r => r.id === id);
    if (index !== -1) {
      businessData.cropRequests[index] = { ...businessData.cropRequests[index], ...req.body };
      saveDb();
      res.json(businessData.cropRequests[index]);
    } else {
      res.status(404).json({ error: 'Crop request not found' });
    }
  });

  // 5. Sales & Invoicing
  app.post('/api/business/sales', (req: Request, res: Response) => {
    const invoice: Invoice = {
      id: req.body.id || `inv-${Date.now()}`,
      invoiceNumber: req.body.invoiceNumber || `SVT/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      date: req.body.date || new Date().toISOString().split('T')[0],
      farmerId: req.body.farmerId,
      farmerName: req.body.farmerName,
      farmerPhone: req.body.farmerPhone || '',
      farmerVillage: req.body.farmerVillage || 'Madharam',
      items: req.body.items || [],
      subtotal: Number(req.body.subtotal) || 0,
      discount: Number(req.body.discount) || 0,
      taxRatePercent: Number(req.body.taxRatePercent) || 0,
      taxAmount: Number(req.body.taxAmount) || 0,
      totalAmount: Number(req.body.totalAmount) || 0,
      paymentMethod: req.body.paymentMethod || 'CASH',
      amountPaid: Number(req.body.amountPaid) || 0,
      balanceDue: Number(req.body.balanceDue) || 0,
      status: req.body.status || 'PAID',
      notes: req.body.notes || '',
    };

    // Deduct stock for all items
    invoice.items.forEach(item => {
      const prod = businessData.products.find(p => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });

    // Update farmer Khata if balance due exists or if purchases made
    if (invoice.farmerId) {
      const farmer = businessData.farmers.find(f => f.id === invoice.farmerId);
      if (farmer) {
        farmer.totalPurchases += invoice.totalAmount;
        if (invoice.balanceDue > 0) {
          farmer.outstandingBalance += invoice.balanceDue;
        }
      }
    }

    businessData.invoices.unshift(invoice);

    // If payment was made, add payment entry
    if (invoice.amountPaid > 0) {
      businessData.payments.unshift({
        id: `pay-${Date.now()}`,
        farmerId: invoice.farmerId || 'general-cash',
        farmerName: invoice.farmerName,
        amount: invoice.amountPaid,
        date: invoice.date,
        paymentMethod: (invoice.paymentMethod === 'UPI' ? 'UPI' : 'CASH') as any,
        referenceNote: `Payment against Invoice ${invoice.invoiceNumber}`,
        invoiceId: invoice.id,
      });
    }

    saveDb();
    res.status(201).json(invoice);
  });

  // 6. Farmers Management
  app.get('/api/business/farmers', (req: Request, res: Response) => {
    res.json(businessData.farmers);
  });

  app.post('/api/business/farmers', (req: Request, res: Response) => {
    const farmer: Farmer = {
      id: req.body.id || `farm-${Date.now()}`,
      name: req.body.name,
      phone: req.body.phone,
      village: req.body.village,
      landSizeAcres: Number(req.body.landSizeAcres) || 2,
      primaryCrops: req.body.primaryCrops || ['Paddy', 'Cotton'],
      outstandingBalance: Number(req.body.outstandingBalance) || 0,
      totalPurchases: Number(req.body.totalPurchases) || 0,
      notes: req.body.notes || '',
      createdAt: new Date().toISOString(),
    };
    businessData.farmers.unshift(farmer);
    saveDb();
    res.status(201).json(farmer);
  });

  app.put('/api/business/farmers/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = businessData.farmers.findIndex(f => f.id === id);
    if (index !== -1) {
      businessData.farmers[index] = { ...businessData.farmers[index], ...req.body };
      saveDb();
      res.json(businessData.farmers[index]);
    } else {
      res.status(404).json({ error: 'Farmer not found' });
    }
  });

  // 7. Payments Record
  app.post('/api/business/payments', (req: Request, res: Response) => {
    const payment: PaymentRecord = {
      id: req.body.id || `pay-${Date.now()}`,
      farmerId: req.body.farmerId,
      farmerName: req.body.farmerName,
      amount: Number(req.body.amount),
      date: req.body.date || new Date().toISOString().split('T')[0],
      paymentMethod: req.body.paymentMethod || 'CASH',
      referenceNote: req.body.referenceNote || 'Khata clearance payment',
      invoiceId: req.body.invoiceId,
    };

    const farmer = businessData.farmers.find(f => f.id === payment.farmerId);
    if (farmer) {
      farmer.outstandingBalance = Math.max(0, farmer.outstandingBalance - payment.amount);
    }

    businessData.payments.unshift(payment);
    saveDb();
    res.status(201).json(payment);
  });

  // 8. Settings Update
  app.put('/api/business/settings', (req: Request, res: Response) => {
    businessData.settings = { ...businessData.settings, ...req.body };
    saveDb();
    res.json(businessData.settings);
  });

  // 9. Reset / Seed Database
  app.post('/api/business/reset', (req: Request, res: Response) => {
    businessData = JSON.parse(JSON.stringify(initialBusinessState));
    saveDb();
    res.json({ success: true, message: 'Database reset to initial demo state' });
  });

  // 10. AI Business & Agricultural Assistant (Server-Side Gemini API)
  app.post('/api/business/ai-assistant', async (req: Request, res: Response) => {
    try {
      const { prompt, language = 'en' } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      // Compute real-time business facts to ground Gemini
      const totalSalesRevenue = businessData.invoices.reduce((acc, inv) => acc + (inv.amountPaid || 0), 0);
      const totalOutstanding = businessData.farmers.reduce((acc, f) => acc + (f.outstandingBalance || 0), 0);
      const lowStockItems = businessData.products.filter(p => p.stock <= p.minStockThreshold);
      const pendingTractors = businessData.tractorRequests.filter(t => t.status === 'PENDING');
      const pendingCrops = businessData.cropRequests.filter(c => c.status === 'PENDING');

      const systemContext = `
You are the AI Business & AgriTech Advisor for "Sri Venkateshwara Traders", a reputable agricultural trading and farm services business located in Madharam Village, Urkonda Mandal, Nagarkurnool District, Telangana.
Phone: 9705806070, Email: contact@svtraders.com.

You have access to the verified real-time database state:
- Products in stock: ${businessData.products.length} products
- Low stock items: ${lowStockItems.map(p => `${p.name} (Stock: ${p.stock} ${p.unit}, Min: ${p.minStockThreshold})`).join(', ') || 'None'}
- Total Registered Farmers: ${businessData.farmers.length}
- Total Invoices recorded: ${businessData.invoices.length} (Total Collected Revenue: ₹${totalSalesRevenue.toLocaleString('en-IN')})
- Total Outstanding Farmer Khata / Credit: ₹${totalOutstanding.toLocaleString('en-IN')}
- Pending Tractor Requests: ${pendingTractors.length} (${pendingTractors.map(t => `${t.farmerName} in ${t.village} for ${t.serviceType}`).join('; ') || 'None'})
- Pending Crop Procurement Requests: ${pendingCrops.length} (${pendingCrops.map(c => `${c.farmerName} in ${c.village} selling ${c.quantity} ${c.unit} of ${c.cropName}`).join('; ') || 'None'})
- Key Coverage Areas: Madharam, Urkonda, Gundlapally, Kotra, Udimilla, Nagarkurnool district.

CRITICAL INSTRUCTIONS:
1. For business data queries (sales, stock, tractor requests, khata ledger, crops), ANSWER ONLY from the verified data above. Never hallucinate fake figures.
2. For agricultural advice (crops like Paddy, Cotton, Red Gram, Groundnut, Chilli, Maize in Telangana conditions):
   - Provide practical agronomic guidance tailored to Telangana black/red soils and monsoon/rabi seasons.
   - For chemical pesticides/fertilizers: state standard, safe, general active ingredient usages without claiming unverified magic dosages.
   - Always include a responsible note recommending farmers consult their local mandal Agricultural Extension Officer (AEO) or Sri Venkateshwara Traders staff for field-specific soil test confirmations.
3. Language preference: If the user prompts in Telugu or asks in Telugu, respond in clear, respectful, natural Telugu (or English if prompted in English).
4. Maintain a warm, highly professional, rural-friendly tone.
      `.trim();

      const gemini = getGeminiClient();
      if (!gemini) {
        res.json({
          reply: language === 'te'
            ? 'నమస్కారం! శ్రీ వెంకటేశ్వర ట్రేడర్స్ సహాయక సేవలు అందుబాటులో ఉన్నాయి. పూర్తి వ్యవసాయ మరియు వ్యాపార సమాచారం కోసం దయచేసి నేరుగా 9705806070 కు కాల్ చేయండి.'
            : 'Welcome to Sri Venkateshwara Traders. For direct business inquiries, tractor scheduling, or crop rates, please contact our hub at 9705806070.'
        });
        return;
      }

      const response = await gemini.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: systemContext,
          temperature: 0.4,
        }
      });

      const replyText = response.text || 'I could not generate an answer at this moment. Please check with Sri Venkateshwara Traders directly at 9705806070.';
      res.json({ reply: replyText });
    } catch (error: any) {
      console.error('AI Assistant Error:', error);
      res.status(500).json({ 
        error: 'Failed to process AI assistant request',
        fallbackReply: 'Our AI service is momentarily busy. Please contact Sri Venkateshwara Traders directly at 9705806070 for immediate business and farm inquiries.' 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sri Venkateshwara Traders platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Server startup error:', err);
});
