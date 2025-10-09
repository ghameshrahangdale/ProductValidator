import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Registration attempted with:', formData);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-bg">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="flex-1 justify-center px-6 py-8">
            {/* Logo/Title */}
            <View className="items-center mb-8">
              <Text className="text-3xl font-manrope-bold text-primary-color">VerifyIt</Text>
            </View>

            {/* Register Title */}
            <View className="mb-8">
              <Text className="text-2xl font-manrope-bold text-black-body">
                Register
              </Text>
            </View>

            {/* Registration Form */}
            <View className="space-y-6">
              {/* Name Row */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-black-body font-manrope-medium mb-2">
                    * First Name
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white font-manrope-regular"
                    placeholder="Enter First Name"
                    placeholderTextColor="#9CA3AF"
                    value={formData.firstName}
                    onChangeText={(value) => handleChange('firstName', value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-black-body font-manrope-medium mb-2">
                    * Last Name
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white font-manrope-regular"
                    placeholder="Enter Last Name"
                    placeholderTextColor="#9CA3AF"
                    value={formData.lastName}
                    onChangeText={(value) => handleChange('lastName', value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Contact Row */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-black-body font-manrope-medium mb-2">
                    * Email
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white font-manrope-regular"
                    placeholder="Enter Your Email"
                    placeholderTextColor="#9CA3AF"
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-black-body font-manrope-medium mb-2">
                    * Mobile Number
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white font-manrope-regular"
                    placeholder="Enter Mobile Number"
                    placeholderTextColor="#9CA3AF"
                    value={formData.mobileNumber}
                    onChangeText={(value) => handleChange('mobileNumber', value)}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Password Row */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-black-body font-manrope-medium mb-2">
                    * Password
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white font-manrope-regular"
                    placeholder="Enter Password"
                    placeholderTextColor="#9CA3AF"
                    value={formData.password}
                    onChangeText={(value) => handleChange('password', value)}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-black-body font-manrope-medium mb-2">
                    * Confirm Password
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white font-manrope-regular"
                    placeholder="Confirm Password"
                    placeholderTextColor="#9CA3AF"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleChange('confirmPassword', value)}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Divider */}
              <View className="border-t border-gray-200 my-4" />

              {/* Submit Button */}
              <TouchableOpacity
                className="bg-primary-color rounded-lg py-4 items-center"
                onPress={handleRegister}
              >
                <Text className="text-white font-manrope-semibold text-lg">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Section */}
            <View className="items-center mt-8">
              <Text className="text-secondary-shade font-manrope-regular">
                Already a member?{' '}
                <Text className="text-primary-color font-manrope-medium">
                  Please login to your account.
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;