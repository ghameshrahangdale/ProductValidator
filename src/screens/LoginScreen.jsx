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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login attempted with:', { email, password });
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
        >
          {/* Header Section */}
          <View className="flex-1 justify-center px-6 bg-white ">
            {/* Logo/Title */}
            <View className="items-center mb-2">
              <Text className="text-3xl font-manrope-extrabold text-primary-color">VerifyIt</Text>
            </View>

            {/* Welcome Text */}
            <View className="mb-8">
              <Text className="text-2xl text-center font-manrope-bold text-black-body mb-2">
                Let the Journey Begin!
              </Text>
              <Text className="text-secondary-shade text-center font-manrope-regular">
                Welcome back! Please enter your details.
              </Text>
            </View>

            {/* Login Form */}
            <View className="space-y-6 ">
              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-black-body font-manrope-medium mb-2">
                  * Username
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 bg-white font-manrope-regular"
                  placeholder="Enter Email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-black-body font-manrope-medium mb-2">
                  * Password
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 bg-white font-manrope-regular"
                  placeholder="Enter Password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

        
              {/* Forgot Password */}
              <TouchableOpacity className="items-end py-4">
                <Text className="text-secondary-shade text-left font-manrope-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Submit Button */}
              <TouchableOpacity
                className="bg-primary-color rounded-lg py-4 items-center"
                onPress={handleLogin}
              >
                <Text className="text-white font-manrope-semibold text-lg">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>

            {/* Register Section */}
            <View className="items-center mt-4">
              <Text className="text-secondary-shade font-manrope-regular">
                Don't have an account?{' '}
                <Text className="text-primary-color font-manrope-medium">Register</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;