import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleScanPress = () => {
    navigation.navigate('Scanner');
  };

  const handleStartScanning = () => {
    setShowInstructions(false);
    handleScanPress();
  };

  const features = [
    {
      icon: 'qr-code-scanner',
      title: 'QR & Barcode Scanner',
      description: 'Scan any product QR code or barcode for verification',
      color: '#8B5CF6'
    },
    {
      icon: 'verified-user',
      title: 'Instant Verification',
      description: 'Get real-time authenticity results in seconds',
      color: '#10B981'
    },
    {
      icon: 'security',
      title: 'Anti-Counterfeit',
      description: 'Protect yourself from fake products',
      color: '#F59E0B'
    },
    {
      icon: 'inventory',
      title: 'Product Details',
      description: 'View comprehensive product information',
      color: '#EC4899'
    }
  ];

  const InstructionsModal = () => (
    <Modal
      visible={showInstructions}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowInstructions(false)}
    >
      <TouchableOpacity 
        className="flex-1 bg-black/70 justify-end"
        activeOpacity={1}
        onPressOut={() => setShowInstructions(false)}
      >
        <View 
          className="bg-white rounded-t-3xl pt-6 pb-10 px-6"
          onStartShouldSetResponder={() => true}
        >
          <View className="items-center mb-6">
            <View className="w-12 h-1 bg-gray-300 rounded-full mb-4" />
            <Text className="text-2xl text-gray-800 font-manrope-bold text-center">
              How to Verify Products
            </Text>
          </View>

          <View className="space-y-5 mb-8 gap-4">
            {[
              "Tap the Scan button and point your camera at the product QR code or barcode",
              "Hold steady until the code is automatically recognized",
              "View instant verification results and product details",
              "Check authenticity status and product origin information"
            ].map((step, index) => (
              <View key={index} className="flex-row items-start bg-purple-50 rounded-xl p-4">
                <LinearGradient
                  colors={['#8B5CF6', '#7C3AED']}
                  style={{ borderRadius: 20 }}
                  className="w-8 h-8 rounded-full items-center justify-center mr-4"
                >
                  <Text className="text-white text-sm font-manrope-bold">{index + 1}</Text>
                </LinearGradient>
                <Text className="text-base text-gray-700 flex-1 font-manrope-regular leading-6">
                  {step}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            className="bg-purple-600 p-4 rounded-2xl items-center justify-center shadow-lg shadow-purple-500/30"
            onPress={handleStartScanning}
          >
            <Text className="text-white text-lg font-manrope-bold">
              Start Scanning
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-16 pb-8 px-6 rounded-b-3xl shadow-lg shadow-black/10">
        <View className="items-center">
          <Image
            source={require("../../assets/images/verifyit_primary_logo.png")}
            style={{ width: 180, height: 60, resizeMode: "contain" }}
          />
          <Text className="text-lg text-gray-600 text-center leading-7 font-manrope-regular mt-4 max-w-md">
            Verify product authenticity and protect yourself from counterfeits with our advanced QR & barcode scanner
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Main Scan Card with Purple Gradient */}
        <View className="px-6 mt-8">
          <LinearGradient
            colors={['#ac3ce1', '#9b2dd6', '#8a1ecb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 20 }}
            className="rounded-3xl p-8 shadow-2xl shadow-[#ac3ce1]/30"
          >
            <View className="items-center mb-6">
              <View className="bg-white/20 w-20 h-20 rounded-2xl items-center justify-center mb-4">
                <Icon name="qr-code-scanner" size={40} color="#FFF" />
              </View>
              <Text className="text-white text-2xl font-manrope-bold text-center mb-2">
                Scan Product Code
              </Text>
              <Text className="text-purple-100 text-center text-base font-manrope-regular leading-6">
                Scan QR codes or barcodes to verify product authenticity and get detailed information
              </Text>
            </View>

            <TouchableOpacity
              className="bg-white rounded-2xl p-5 flex-row items-center justify-center shadow-2xl shadow-black/20"
              onPress={handleScanPress}
            >
              <Icon name="camera-alt" size={28} color="#ac3ce1" />
              <Text className="text-[#ac3ce1] text-xl font-manrope-bold ml-3">
                Scan Now
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Features Grid */}
        <View className="px-6 mt-8">
          <Text className="text-2xl text-gray-800 font-manrope-bold mb-6">
            Why Use VeriFit?
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {features.map((feature, index) => (
              <View key={index} className="w-[48%] bg-white rounded-2xl p-5 mb-4 shadow-lg shadow-black/5">
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mb-3"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon name={feature.icon} size={24} color={feature.color} />
                </View>
                <Text className="text-gray-800 text-lg font-manrope-bold mb-2">
                  {feature.title}
                </Text>
                <Text className="text-gray-600 text-sm font-manrope-regular leading-5">
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>


        {/* Help Section */}
        <View className="px-6 mt-8 mb-10">
          <TouchableOpacity
            className="flex-row items-center justify-center p-5 bg-white rounded-2xl shadow-lg shadow-black/5"
            onPress={() => setShowInstructions(true)}
          >
            <LinearGradient
              colors={['#ac3ce1', '#9b2dd6', '#8a1ecb']}
              style={{ borderRadius: 20 }}
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
            >
              <Icon name="help-outline" size={20} color="#FFF" />
            </LinearGradient>
            <View className="flex-1">
              <Text className="text-gray-800 text-lg font-manrope-bold">
                Need Help?
              </Text>
              <Text className="text-gray-600 text-sm font-manrope-regular">
                Learn how to scan and verify products
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <InstructionsModal />
    </View>
  );
};

export default HomeScreen;