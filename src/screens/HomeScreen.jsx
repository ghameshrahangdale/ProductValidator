import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const handleScanPress = () => {
    navigation.navigate('Scanner');
  };

  const showInstructions = () => {
    Alert.alert(
      'How to Use',
      '1. Tap "Scan QR Code" button\n2. Point your camera at the product QR code\n3. Get instant verification results\n4. View product details and authenticity status',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="items-center bg-white px-8 py-12 mb-5">
        <Icon name="verified-user" size={80} color="#4CAF50" />
        <Text className="text-3xl  text-gray-800 mt-3 mb-2 font-manrope-bold">
          Product Validator
        </Text>
        <Text className="text-base text-gray-600 text-center leading-6 font-manrope-regular">
          Verify product authenticity and protect yourself from counterfeits
        </Text>
      </View>

      <View className="bg-white mx-5 my-4 p-5 rounded-xl shadow-lg shadow-black/10">
        <Text className="text-xl text-gray-800 mb-4 font-manrope-semibold">
          Key Features
        </Text>
        
        <View className="flex-row items-center mb-3 py-2">
          <Icon name="camera-alt" size={24} color="#2196F3" />
          <Text className="text-base text-gray-700 ml-3 font-manrope-regular">
            Quick QR Code Scanning
          </Text>
        </View>
        
        <View className="flex-row items-center mb-3 py-2">
          <Icon name="security" size={24} color="#4CAF50" />
          <Text className="text-base text-gray-700 ml-3 font-manrope-regular">
            Instant Authenticity Check
          </Text>
        </View>
        
        <View className="flex-row items-center mb-3 py-2">
          <Icon name="warning" size={24} color="#FF9800" />
          <Text className="text-base text-gray-700 ml-3 font-manrope-regular">
            Counterfeit Detection
          </Text>
        </View>
        
        <View className="flex-row items-center mb-1 py-2">
          <Icon name="info" size={24} color="#2196F3" />
          <Text className="text-base text-gray-700 ml-3 font-manrope-regular">
            Product Details & Origin
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        className="flex-row bg-green-500 mx-5 my-3 p-5 rounded-xl items-center justify-center shadow-lg shadow-black/30"
        onPress={handleScanPress}
      >
        <Icon name="qr-code-scanner" size={28} color="#FFF" />
        <Text className="text-white text-lg  ml-3 font-manrope-semibold">
          Scan QR Code
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="flex-row items-center justify-center p-4 mx-5"
        onPress={showInstructions}
      >
        <Icon name="help-outline" size={20} color="#666" />
        <Text className="text-gray-600 text-base ml-2 font-manrope-regular">
          How to Use
        </Text>
      </TouchableOpacity>

      <View className="bg-white mx-5 my-4 p-5 rounded-xl border-l-4 border-l-blue-500">
        <Text className="text-base  text-gray-800 mb-3 font-manrope-semibold">
          Demo QR Codes:
        </Text>
        <Text className="text-sm text-gray-600 mb-1 font-manrope-regular">
          • PROD001 - Authentic Product
        </Text>
        <Text className="text-sm text-gray-600 mb-1 font-manrope-regular">
          • PROD002 - Previously Scanned
        </Text>
        <Text className="text-sm text-gray-600 mb-1 font-manrope-regular">
          • EXPIRED001 - Expired Product
        </Text>
        <Text className="text-sm text-gray-600 mb-1 font-manrope-regular">
          • Any other - Invalid Code
        </Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;