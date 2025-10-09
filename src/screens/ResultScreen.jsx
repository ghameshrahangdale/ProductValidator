import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { productAPI } from '../services/productAPI';

const ResultScreen = ({ route, navigation }) => {
  const { qrCodeData } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    verifyProduct();
  }, []);

  const verifyProduct = async () => {
    try {
      setLoading(true);
      const productData = await productAPI.verifyProduct(qrCodeData);
      setProduct(productData);
      
      // Record the scan
      // await productAPI.recordScan(qrCodeData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'authentic':
        return '#4CAF50';
      case 'warning':
        return '#FF9800';
      default:
        return '#F44336';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'authentic':
        return 'verified';
      case 'warning':
        return 'warning';
      default:
        return 'error';
    }
  };

  const handleScanAgain = () => {
    navigation.navigate('Scanner');
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text className="mt-4 text-base text-gray-600 font-manrope-regular">
          Verifying product authenticity...
        </Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View className="flex-1 bg-gray-50">
        <View className="bg-red-500 px-8 py-12 items-center">
          <Icon name="error" size={60} color="#FFF" />
          <Text className="text-white text-2xl  mt-4 font-manrope-bold">
            Verification Failed
          </Text>
          <Text className="text-white text-base text-center mt-2 opacity-90 font-manrope-regular">
            {error || 'Product not found in our database'}
          </Text>
        </View>

        <ScrollView className="flex-1 px-4 py-6">
          <View className="bg-white p-6 rounded-xl shadow-sm shadow-black/5 mb-4">
            <Text className="text-base text-gray-500 mb-2 font-manrope-medium">Scanned Code</Text>
            <Text className="text-lg text-gray-800 font-manrope-semibold">{qrCodeData}</Text>
          </View>

          <View className="bg-amber-50 p-4 rounded-xl flex-row items-start mb-4">
            <Icon name="warning" size={24} color="#FF9800" />
            <Text className="text-amber-800 text-sm flex-1 ml-3 leading-5 font-manrope-regular">
              This product may be counterfeit or not properly registered.
              Please contact the manufacturer or retailer for assistance.
            </Text>
          </View>
        </ScrollView>

        <View className="bg-white px-5 py-6 border-t border-gray-200">
          <TouchableOpacity 
            className="bg-green-500 flex-row items-center justify-center py-4 rounded-lg mb-3"
            onPress={handleScanAgain}
          >
            <Text className="text-white text-lg  font-manrope-semibold">
              Scan Another Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View 
        className="px-8 py-12 items-center"
        style={{ backgroundColor: getStatusColor(product.status) }}
      >
        <Icon name={getStatusIcon(product.status)} size={60} color="#FFF" />
        <Text className="text-white text-2xl  mt-4 text-center font-manrope-bold">
          {product.status === 'authentic' ? 'Authentic Product' : 'Verification Warning'}
        </Text>
        <Text className="text-white text-base text-center mt-2 opacity-90 font-manrope-regular">
          {product.status === 'authentic' 
            ? 'This product is verified and authentic'
            : 'Please review the product details carefully'
          }
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {/* Product Basic Info */}
        <View className="bg-white p-6 rounded-xl shadow-sm shadow-black/5 mb-4">
          <Text className="text-2xl  text-gray-800 mb-1 font-manrope-bold">
            {product.name}
          </Text>
          <Text className="text-base text-gray-600 mb-6 font-manrope-regular">
            by {product.brand}
          </Text>
          
          <View className="flex-row justify-between mb-4">
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1 font-manrope-medium">SKU</Text>
              <Text className="text-base text-gray-800 font-manrope-semibold">{product.sku}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1 font-manrope-medium">Batch Number</Text>
              <Text className="text-base text-gray-800 font-manrope-semibold">{product.batchNumber}</Text>
            </View>
          </View>

          <View className="flex-row justify-between mb-4">
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1 font-manrope-medium">Manufacture Date</Text>
              <Text className="text-base text-gray-800 font-manrope-semibold">
                {new Date(product.manufactureDate).toLocaleDateString()}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1 font-manrope-medium">Expiry Date</Text>
              <Text className={`text-base font-manrope-semibold ${
                product.isExpired ? 'text-red-500' : 'text-gray-800'
              }`}>
                {new Date(product.expiryDate).toLocaleDateString()}
                {product.isExpired && ' (Expired)'}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1 font-manrope-medium">Category</Text>
              <Text className="text-base text-gray-800 font-manrope-semibold">{product.category}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1 font-manrope-medium">Stock</Text>
              <Text className="text-base text-gray-800 font-manrope-semibold">{product.stock} units</Text>
            </View>
          </View>
        </View>

        {/* Additional Information */}
        <View className="bg-white p-6 rounded-xl shadow-sm shadow-black/5 mb-4">
          <Text className="text-xl  text-gray-800 mb-4 font-manrope-bold">
            Additional Information
          </Text>
          
          <View className="mb-4">
            <Text className="text-sm text-gray-500 mb-1 font-manrope-medium">Description</Text>
            <Text className="text-base text-gray-800 leading-6 font-manrope-regular">
              {product.description || 'No description available'}
            </Text>
          </View>
          
          <View className="mb-4">
            <Text className="text-sm text-gray-500 mb-1 font-manrope-medium">Price</Text>
            <Text className="text-base text-gray-800 font-manrope-semibold">
              ${product.price}
            </Text>
          </View>
          
          <View>
            <Text className="text-sm text-gray-500 mb-1 font-manrope-medium">Warranty</Text>
            <Text className="text-base text-gray-800 leading-6 font-manrope-regular">
              {product.warranty}
            </Text>
          </View>
        </View>

        {/* Security Information */}
        <View className="bg-white p-6 rounded-xl shadow-sm shadow-black/5 mb-4">
          <Text className="text-xl  text-gray-800 mb-4 font-manrope-bold">
            Security Information
          </Text>
          
          <View className="flex-row items-center mb-3">
            <Icon 
              name={product.isAuthentic ? "check-circle" : "cancel"} 
              size={20} 
              color={product.isAuthentic ? "#4CAF50" : "#F44336"} 
            />
            <Text className="text-base text-gray-800 ml-3 font-manrope-regular">
              {product.isAuthentic ? 'Verified Product' : 'Product Not Verified'}
            </Text>
          </View>
          
          <View className="flex-row items-center mb-3">
            <Icon 
              name={product.isExpired ? "warning" : "check-circle"} 
              size={20} 
              color={product.isExpired ? "#FF9800" : "#4CAF50"} 
            />
            <Text className="text-base text-gray-800 ml-3 font-manrope-regular">
              {product.isExpired ? 'Product Expired' : 'Within Expiry Date'}
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <Icon 
              name={product.isSuspicious ? "warning" : "check-circle"} 
              size={20} 
              color={product.isSuspicious ? "#FF9800" : "#4CAF50"} 
            />
            <Text className="text-base text-gray-800 ml-3 font-manrope-regular">
              {product.isSuspicious 
                ? `Suspicious activity detected`
                : 'Normal verification status'
              }
            </Text>
          </View>
        </View>

        {/* Verification Timestamp */}
        <View className="bg-blue-50 p-4 rounded-lg items-center mb-4">
          <Text className="text-blue-700 text-sm italic font-manrope-regular">
            Verified on: {new Date(product.verificationDate).toLocaleString()}
          </Text>
        </View>
      </ScrollView>

      <View className="bg-white px-5 py-6 border-t border-gray-200">
        <TouchableOpacity 
          className="bg-green-500 flex-row items-center justify-center py-4 rounded-lg mb-3"
          onPress={handleScanAgain}
        >
          <Icon name="qr-code-scanner" size={20} color="#FFF" />
          <Text className="text-white text-lg  ml-2 font-manrope-semibold">
            Scan Another Product
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="py-4 items-center"
          onPress={handleGoHome}
        >
          <Text className="text-gray-600 text-base font-manrope-medium">
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResultScreen;