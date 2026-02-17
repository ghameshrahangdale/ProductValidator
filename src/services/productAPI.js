import api from './api';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

// Configure Geolocation according to the documentation
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
  enableBackgroundLocationUpdates: false,
  locationProvider: 'auto',
});

// For React Native - request location permission
const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
     
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location for product verification.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Location permission error:', err);
      return false;
    }
  }
  
  // For iOS, use the library's requestAuthorization method
  return new Promise((resolve) => {
    Geolocation.requestAuthorization(
      () => {
        console.log('Location permission granted on iOS');
        resolve(true);
      },
      (error) => {
        console.warn('Location permission denied on iOS:', error);
        resolve(false);
      }
    );
  });
};

// Get current location for React Native
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Location obtained successfully');
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions in settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Please check your connection.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage = `Location error: ${error.message}`;
            break;
        }
        reject(new Error(errorMessage));
      },
      {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 5000,
    distanceFilter: 0,
  }
    );
  });
};

// Send location to backend tracking API
const sendLocationToBackend = async (barcodeId, latitude, longitude) => {
  try {
    const response = await api.post('/products/track-location', {
      barcodeId: barcodeId,
      latitude: latitude,
      longitude: longitude
    });
    console.log('Location tracked successfully:', response.data);
    return response.data;
  } catch (error) {
    console.warn('Failed to send location to backend:', error);
    // Don't throw error here - we don't want location tracking failure to block product verification
  }
};

// Get location with permission handling
const getLocationWithPermission = async () => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      throw new Error('Location permission denied');
    }

    const location = await getCurrentLocation();
    console.log('Location captured successfully:', {
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: location.accuracy
    });
    return location;
  } catch (error) {
    console.warn('Location capture failed:', error.message);
    throw error;
  }
};

export const productAPI = {
  verifyProduct: async (qrCodeData) => {
    try {
     
      let location = null;
      let locationError = null;
      
      // Try to get location (non-blocking)
      try {
        location = await getLocationWithPermission();
        
        // If location is obtained successfully, send it to backend
        if (location && location.latitude && location.longitude) {
          sendLocationToBackend(qrCodeData, location.latitude, location.longitude);
        }
      } catch (error) {
        locationError = error.message;
        console.warn('Location not available:', locationError);
        // Continue without location - don't block verification
      }

      // 👇 Real API call
      const response = await api.get(`/products/barcode/${qrCodeData}`);
      const productData = response.data.data;

      console.log('Product API Response:', productData);

      if (!productData) {
        throw new Error('Product not found in database');
      }

      // Check expiry
      const currentDate = new Date();
      const expiryDate = new Date(productData.expiryDate);
      const isExpired = currentDate > expiryDate;
      const isSuspicious = false;

      return {
        ...productData,
        isExpired,
        isSuspicious,
        scanCount: 0,
        isAuthentic: productData.isVerified,
        verificationDate: new Date().toISOString(),
        status: !isExpired && !isSuspicious
          ? 'authentic'
          : 'warning',
        batchNumber: productData.batch,
        origin: productData.brand,
        warranty: productData.warranty || 'Standard manufacturer warranty',
        instructions: productData.instructions || productData.description || 'Follow manufacturer guidelines',
        verificationLocation: location,
        locationError: locationError
      };
    } catch (error) {
      console.error('Verification failed:', error);
      throw new Error(
        `Verification failed: ${error.response?.data?.message || error.message}`
      );
    }
  },

};