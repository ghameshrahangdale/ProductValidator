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

const HomeScreen = ({ navigation }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleScanPress = () => {
    navigation.navigate('Scanner');
  };

  const InstructionsModal = () => (
    <Modal
      visible={showInstructions}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowInstructions(false)}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-5">
        <View className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg shadow-black/20">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl text-gray-800 font-manrope-semibold">
              How to Use
            </Text>
            <TouchableOpacity 
              onPress={() => setShowInstructions(false)}
              className="p-1"
            >
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <View className="flex-row items-start">
              <View className="bg-primary-color w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-xs font-manrope-semibold">1</Text>
              </View>
              <Text className="text-base text-gray-700 flex-1 font-manrope-regular">
                Tap "Scan QR Code" button
              </Text>
            </View>

            <View className="flex-row items-start">
              <View className="bg-primary-color w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-xs font-manrope-semibold">2</Text>
              </View>
              <Text className="text-base text-gray-700 flex-1 font-manrope-regular">
                Point your camera at the product QR code
              </Text>
            </View>

            <View className="flex-row items-start">
              <View className="bg-primary-color w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-xs font-manrope-semibold">3</Text>
              </View>
              <Text className="text-base text-gray-700 flex-1 font-manrope-regular">
                Get instant verification results
              </Text>
            </View>

            <View className="flex-row items-start">
              <View className="bg-primary-color w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-xs font-manrope-semibold">4</Text>
              </View>
              <Text className="text-base text-gray-700 flex-1 font-manrope-regular">
                View product details and authenticity status
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-primary-color mt-6 p-4 rounded-xl items-center justify-center shadow-lg shadow-black/30"
            onPress={() => setShowInstructions(false)}
          >
            <Text className="text-white text-lg font-manrope-semibold">
              Got It
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="items-center bg-white px-8 py-12 mb-5">
        <Image
          source={require("../../assets/images/Verifit.png")}
          style={{ width: 150, height: 50, resizeMode: "contain", marginTop: 12, marginBottom: 12 }}
        />
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
        className="flex-row bg-primary-color mx-5 my-3 p-5 rounded-xl items-center justify-center shadow-lg shadow-black/30"
        onPress={handleScanPress}
      >
        <Icon name="qr-code-scanner" size={28} color="#FFF" />
        <Text className="text-white text-lg ml-3 font-manrope-semibold">
          Scan QR Code
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="flex-row items-center justify-center p-4 mx-5"
        onPress={() => setShowInstructions(true)}
      >
        <Icon name="help-outline" size={20} color="#666" />
        <Text className="text-gray-600 text-base ml-2 font-manrope-regular">
          How to Use
        </Text>
      </TouchableOpacity>

      <InstructionsModal />
    </ScrollView>
  );
};

export default HomeScreen;