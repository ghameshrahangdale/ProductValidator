import axios from 'axios';

const API_BASE_URL = 'https://your-backend-api.com/api'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock product database (replace with actual API calls)
const mockProducts = {
  'PROD001': {
    id: 'PROD001',
    name: 'Premium Wireless Headphones',
    brand: 'AudioTech',
    batchNumber: 'B2024001',
    manufactureDate: '2024-01-15',
    expiryDate: '2026-01-15',
    origin: 'Germany',
    warranty: '2 years',
    instructions: 'Charge fully before first use. Avoid water exposure.',
    isAuthentic: true,
    scanCount: 0,
    firstScanned: '2024-01-20'
  },
  'PROD002': {
    id: 'PROD002',
    name: 'Organic Face Cream',
    brand: 'NaturalGlow',
    batchNumber: 'B2024002',
    manufactureDate: '2024-02-01',
    expiryDate: '2025-02-01',
    origin: 'France',
    warranty: '1 year',
    instructions: 'Store in cool dry place. Use within 6 months of opening.',
    isAuthentic: true,
    scanCount: 1,
    firstScanned: '2024-02-10'
  },
  'EXPIRED001': {
    id: 'EXPIRED001',
    name: 'Expired Product Demo',
    brand: 'TestBrand',
    batchNumber: 'B2023001',
    manufactureDate: '2023-01-15',
    expiryDate: '2024-01-15',
    origin: 'Test',
    warranty: 'Expired',
    instructions: 'This is a test expired product',
    isAuthentic: false,
    scanCount: 5,
    firstScanned: '2023-02-01'
  }
};

export const productAPI = {
  verifyProduct: async (qrCodeData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, using mock data
      // In real implementation, replace with:
      // const response = await api.get(`/products/verify/${qrCodeData}`);
      // return response.data;
      
      const product = mockProducts[qrCodeData];
      
      if (!product) {
        throw new Error('Product not found in database');
      }
      
      // Check if product is expired
      const currentDate = new Date();
      const expiryDate = new Date(product.expiryDate);
      const isExpired = currentDate > expiryDate;
      
      // Check for suspicious activity (multiple scans)
      const isSuspicious = product.scanCount > 3;
      
      return {
        ...product,
        isExpired,
        isSuspicious,
        verificationDate: new Date().toISOString(),
        status: product.isAuthentic && !isExpired && !isSuspicious ? 'authentic' : 'warning'
      };
    } catch (error) {
      throw new Error(`Verification failed: ${error.message}`);
    }
  },
  
  recordScan: async (productId) => {
    try {
      // In real implementation, record the scan in backend
      // await api.post('/scans', { productId, timestamp: new Date() });
      
      if (mockProducts[productId]) {
        mockProducts[productId].scanCount += 1;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Failed to record scan:', error);
    }
  }
};