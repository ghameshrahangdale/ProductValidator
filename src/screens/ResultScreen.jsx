import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { productAPI } from '../services/productAPI';

const ResultScreen = ({ route, navigation }) => {
  const { qrCodeData } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    verifyProduct();
  }, []);

  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  const verifyProduct = async () => {
    try {
      setLoading(true);
      const productData = await productAPI.verifyProduct(qrCodeData);
      setProduct(productData);
      console.log(productData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'authentic':
        return {
          color: '#10B981',
          gradient: ['#10B981', '#059669'],
          icon: 'verified',
          title: 'Authentic Product',
          subtitle: 'This product is verified and authentic'
        };
      case 'warning':
        return {
          color: '#F59E0B',
          gradient: ['#F59E0B', '#D97706'],
          icon: 'warning',
          title: 'Verification Warning',
          subtitle: 'Please review the product details carefully'
        };
      default:
        return {
          color: '#EF4444',
          gradient: ['#EF4444', '#DC2626'],
          icon: 'error',
          title: 'Verification Failed',
          subtitle: 'Product verification unsuccessful'
        };
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
        <View className="items-center">
          <ActivityIndicator size="large" color="#10B981" />
          <Text className="mt-4 text-lg text-gray-700 font-manrope-semibold">
            Verifying Product
          </Text>
          <Text className="mt-2 text-base text-gray-500 text-center font-manrope-regular">
            Checking authenticity in our database...
          </Text>
        </View>
      </View>
    );
  }

  if (error || !product) {
    const config = getStatusConfig('error');
    
    return (
      <Animated.View style={{ opacity: fadeAnim }} className="flex-1 bg-gray-50">
        {/* Header Section */}
        <View className="bg-gradient-to-b from-red-500 to-red-600 px-6 pt-16 pb-12 rounded-b-3xl shadow-lg">
          <View className="items-center">
            <View className="bg-white/20 p-4 rounded-full mb-4">
              <Icon name="error" size={48} color="#FFF" />
            </View>
            <Text className="text-white text-2xl font-manrope-bold text-center mb-2">
              Verification Failed
            </Text>
            <Text className="text-white/90 text-base text-center font-manrope-regular">
              {error || 'Product not found in our database'}
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-5 -mt-6" showsVerticalScrollIndicator={false}>
          {/* Scanned Code Card */}
          <View className="bg-white rounded-2xl p-6 shadow-sm shadow-black/5 mb-4">
            <View className="flex-row items-center mb-3">
              <Icon name="qr-code" size={20} color="#6B7280" />
              <Text className="text-gray-500 text-sm font-manrope-medium ml-2">
                SCANNED CODE
              </Text>
            </View>
            <Text className="text-gray-800 text-lg font-manrope-semibold font-mono">
              {qrCodeData}
            </Text>
          </View>

          {/* Warning Card */}
          <View className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-4">
            <View className="flex-row items-start">
              <Icon name="warning" size={24} color="#F59E0B" />
              <View className="flex-1 ml-3">
                <Text className="text-amber-800 text-sm font-manrope-semibold mb-1">
                  Important Notice
                </Text>
                <Text className="text-amber-700 text-sm leading-5 font-manrope-regular">
                  This product may be counterfeit or not properly registered. 
                  Please contact the manufacturer or retailer for assistance.
                </Text>
              </View>
            </View>
          </View>

          {/* Help Section */}
          <View className="bg-white rounded-2xl p-6 shadow-sm shadow-black/5">
            <Text className="text-gray-800 text-lg font-manrope-bold mb-4">
              What to do next?
            </Text>
            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Icon name="store" size={20} color="#3B82F6" />
                </View>
                <Text className="text-gray-700 flex-1 font-manrope-regular">
                  Contact the retailer where you purchased this product
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="bg-green-100 p-2 rounded-lg mr-3">
                  <Icon name="support-agent" size={20} color="#10B981" />
                </View>
                <Text className="text-gray-700 flex-1 font-manrope-regular">
                  Reach out to manufacturer customer support
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="bg-purple-100 p-2 rounded-lg mr-3">
                  <Icon name="refresh" size={20} color="#8B5CF6" />
                </View>
                <Text className="text-gray-700 flex-1 font-manrope-regular">
                  Try scanning the code again or use a different product
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View className="bg-white px-5 pt-4 pb-8 border-t border-gray-100">
          <TouchableOpacity 
            className="bg-green-500 flex-row items-center justify-center py-4 rounded-2xl mb-3 shadow-sm shadow-black/10"
            onPress={handleScanAgain}
          >
            <Icon name="qr-code-scanner" size={22} color="#FFF" />
            <Text className="text-white text-lg font-manrope-semibold ml-2">
              Scan Another Code
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
      </Animated.View>
    );
  }

  const config = getStatusConfig(product.status);

  return (
    <Animated.View style={{ opacity: fadeAnim }} className="flex-1 bg-gray-100">
      {/* Header Section with Gradient */}
      <View 
        className="px-6 pt-16 pb-12 rounded-b-3xl shadow-lg"
        style={{ 
          backgroundColor: config.color,
          background: `linear-gradient(135deg, ${config.gradient[0]}, ${config.gradient[1]})`
        }}
      >
        <View className="items-center">
          <View className="bg-white/20 p-4 rounded-full mb-4">
            <Icon name={config.icon} size={48} color="#FFF" />
          </View>
          <Text className="text-white text-2xl font-manrope-bold text-center mb-2">
            {config.title}
          </Text>
          <Text className="text-white/90 text-base text-center font-manrope-regular">
            {config.subtitle}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-5 -mt-6" showsVerticalScrollIndicator={false}>
        {/* Product Overview Card */}
        <View className="bg-white rounded-2xl p-6 shadow-sm shadow-black/5 mb-4">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1">
              <Text className="text-2xl text-gray-800 font-manrope-bold leading-8">
                {product.name}
              </Text>
              <Text className="text-base text-gray-500 font-manrope-regular mt-1">
                by {product.brand}
              </Text>
            </View>
            <View className="bg-gray-50 px-3 py-2 rounded-lg">
              <Text className="text-gray-600 text-sm font-manrope-semibold">
                ${product.price}
              </Text>
            </View>
          </View>

          <View className="bg-gray-50 rounded-xl p-4">
            <View className="flex-row justify-between mb-3">
              <View className="flex-1">
                <Text className="text-xs text-gray-500 font-manrope-medium mb-1">SKU</Text>
                <Text className="text-sm text-gray-800 font-manrope-semibold">
                  {product.sku}
                </Text>
              </View>
              <View className="flex-1 items-end">
                <Text className="text-xs text-gray-500 font-manrope-medium mb-1">Batch</Text>
                <Text className="text-sm text-gray-800 font-manrope-semibold">
                  {product.batchNumber}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between">
              <View className="flex-1">
                <Text className="text-xs text-gray-500 font-manrope-medium mb-1">Manufactured</Text>
                <Text className="text-sm text-gray-800 font-manrope-semibold">
                  {new Date(product.manufactureDate).toLocaleDateString()}
                </Text>
              </View>
              <View className="flex-1 items-end">
                <Text className="text-xs text-gray-500 font-manrope-medium mb-1">Expires</Text>
                <Text className={`text-sm font-manrope-semibold ${
                  product.isExpired ? 'text-red-500' : 'text-gray-800'
                }`}>
                  {new Date(product.expiryDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Product Details Card */}
        <View className="bg-white rounded-2xl p-6 shadow-sm shadow-black/5 mb-4">
          <Text className="text-xl text-gray-800 font-manrope-bold mb-5">
            Product Details
          </Text>
          
          <View className="space-y-4">
            <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
              <Text className="text-gray-600 font-manrope-medium">Category</Text>
              <Text className="text-gray-800 font-manrope-semibold">{product.category}</Text>
            </View>
            
            <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
              <Text className="text-gray-600 font-manrope-medium">Stock Available</Text>
              <Text className="text-gray-800 font-manrope-semibold">{product.stock} units</Text>
            </View>
            
            <View className="py-2">
              <Text className="text-gray-600 font-manrope-medium mb-2">Description</Text>
              <Text className="text-gray-800 leading-6 font-manrope-regular">
                {product.description || 'No description available for this product.'}
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600 font-manrope-medium">Warranty</Text>
              <Text className="text-gray-800 font-manrope-semibold text-right flex-1 ml-2">
                {product.warranty}
              </Text>
            </View>
          </View>
        </View>

        {/* Security Status Card */}
        <View className="bg-white rounded-2xl p-6 shadow-sm shadow-black/5 mb-4">
          <Text className="text-xl text-gray-800 font-manrope-bold mb-5">
            Security Status
          </Text>
          
          <View className="space-y-4">
            <View className="flex-row items-center">
              <View className={`p-2 rounded-lg mr-4 ${
                product.isAuthentic ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Icon 
                  name={product.isAuthentic ? "verified" : "warning"} 
                  size={20} 
                  color={product.isAuthentic ? "#10B981" : "#EF4444"} 
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-manrope-semibold">
                  {product.isAuthentic ? 'Verified Authentic' : 'Not Verified'}
                </Text>
                <Text className="text-gray-500 text-sm font-manrope-regular">
                  {product.isAuthentic 
                    ? 'This product is confirmed authentic' 
                    : 'Unable to verify product authenticity'
                  }
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-center">
              <View className={`p-2 rounded-lg mr-4 ${
                product.isExpired ? 'bg-amber-100' : 'bg-green-100'
              }`}>
                <Icon 
                  name={product.isExpired ? "warning" : "check-circle"} 
                  size={20} 
                  color={product.isExpired ? "#F59E0B" : "#10B981"} 
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-manrope-semibold">
                  {product.isExpired ? 'Product Expired' : 'Within Shelf Life'}
                </Text>
                <Text className="text-gray-500 text-sm font-manrope-regular">
                  {product.isExpired 
                    ? 'This product has passed its expiry date' 
                    : 'Product is within valid expiry period'
                  }
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-center">
              <View className={`p-2 rounded-lg mr-4 ${
                product.isSuspicious ? 'bg-amber-100' : 'bg-green-100'
              }`}>
                <Icon 
                  name={product.isSuspicious ? "security" : "check-circle"} 
                  size={20} 
                  color={product.isSuspicious ? "#F59E0B" : "#10B981"} 
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-manrope-semibold">
                  Security Check
                </Text>
                <Text className="text-gray-500 text-sm font-manrope-regular">
                  {product.isSuspicious 
                    ? 'Unusual activity detected - proceed with caution'
                    : 'All security checks passed successfully'
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Verification Timestamp */}
        <View className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-4 items-center">
          <Icon name="schedule" size={20} color="#3B82F6" />
          <Text className="text-blue-700 text-sm font-manrope-medium mt-1">
            Scanned on {new Date(product.verificationDate).toLocaleString()}
            
          </Text>
          {
            product.verificationLocation && !product.locationError ? (
              <Text className="text-blue-700 text-sm font-manrope-medium mt-1">
                Place: {product.verificationLocation} </Text>
            ) : product.locationError ? (
              <Text className="text-blue-700 text-sm font-manrope-medium mt-1">
                Location Error: {product.locationError}
              </Text>
            ) : null
          }
         
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="bg-white px-5 pt-4 pb-8 border-t border-gray-100">
        <TouchableOpacity 
          className="bg-green-500 flex-row items-center justify-center py-4 rounded-2xl mb-3 shadow-sm shadow-black/10"
          onPress={handleScanAgain}
        >
          <Icon name="qr-code-scanner" size={22} color="#FFF" />
          <Text className="text-white text-lg font-manrope-semibold ml-2">
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
    </Animated.View>
  );
};

export default ResultScreen;