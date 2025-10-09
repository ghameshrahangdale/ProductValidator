import api from './api';

export const productAPI = {
  verifyProduct: async (qrCodeData) => {
    try {
      // 👇 Real API call
      const response = await api.get(`/products/barcode/${qrCodeData}`);
      const productData = response.data.data; // Access the nested data object

      console.log("Product API Response:", productData);

      if (!productData) {
        throw new Error("Product not found in database");
      }

      // Check expiry and suspicious activity
      const currentDate = new Date();
      const expiryDate = new Date(productData.expiryDate);
      const isExpired = currentDate > expiryDate;

      // Since scanCount is not in the response, we'll set a default or remove this check
      const isSuspicious = false; // productData.scanCount > 3; // scanCount not available in response

      return {
        ...productData,
        isExpired,
        isSuspicious,
        scanCount: 0, // Default value since it's not in response
        isAuthentic: productData.isVerified, // Map isVerified to isAuthentic
        verificationDate: new Date().toISOString(),
        status: productData.isVerified && !isExpired && !isSuspicious
          ? "authentic"
          : "warning",
        // Map field names to match your UI expectations
        batchNumber: productData.batch,
        origin: productData.brand, // Using brand as origin since origin not in response
        warranty: "Standard manufacturer warranty", // Default since not in response
        instructions: productData.description || "Follow manufacturer guidelines" // Use description for instructions
      };
    } catch (error) {
      console.error("Verification failed:", error);
      throw new Error(
        `Verification failed: ${error.response?.data?.message || error.message}`
      );
    }
  },

  // recordScan: async (productId) => {
  //   try {
  //     // 👇 Record scan to backend
  //     await api.post("/scans", { productId, timestamp: new Date() });
  //     return { success: true };
  //   } catch (error) {
  //     console.error("Failed to record scan:", error);
  //     return { success: false };
  //   }
  // },
};