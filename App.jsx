import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View, Text, Image } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import ResultScreen from './src/screens/ResultScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import './global.css';

const Stack = createStackNavigator();

// SplashScreen Component
const SplashScreen = () => {
  return (
    <View className="flex-1 bg-primary-color justify-center items-center">
      <Image
        source={require("./assets/images/Verifit_White.png")}
        style={{ width: 180, height: 60, resizeMode: "contain", marginBottom: 16 }}
      />
    </View>
  );
};


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#ac3ce1" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'Verifit',
            headerTitleStyle: {
              fontFamily: 'Manrope-SemiBold',
            },
            headerTintColor: '#ac3ce1',
          }}
        />
        <Stack.Screen 
          name="Scanner" 
          component={ScannerScreen}
          options={{ 
            title: 'Scan QR Code',
            headerTitleStyle: {
              fontFamily: 'Manrope-SemiBold',
            },
            headerTintColor: '#ac3ce1',
          }}
        />
        <Stack.Screen 
          name="Result" 
          component={ResultScreen}
          options={{ 
            title: 'Verification Result',
            headerTitleStyle: {
              fontFamily: 'Manrope-SemiBold',
            },
            headerTintColor: '#0e0e0e',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;