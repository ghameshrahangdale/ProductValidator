import React from 'react';
import {
  View,
  Text,
  StyleSheet,
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="verified-user" size={80} color="#4CAF50" />
        <Text style={styles.title}>Product Validator</Text>
        <Text style={styles.subtitle}>
          Verify product authenticity and protect yourself from counterfeits
        </Text>
      </View>

      <View style={styles.features}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        
        <View style={styles.featureItem}>
          <Icon name="camera-alt" size={24} color="#2196F3" />
          <Text style={styles.featureText}>Quick QR Code Scanning</Text>
        </View>
        
        <View style={styles.featureItem}>
          <Icon name="security" size={24} color="#4CAF50" />
          <Text style={styles.featureText}>Instant Authenticity Check</Text>
        </View>
        
        <View style={styles.featureItem}>
          <Icon name="warning" size={24} color="#FF9800" />
          <Text style={styles.featureText}>Counterfeit Detection</Text>
        </View>
        
        <View style={styles.featureItem}>
          <Icon name="info" size={24} color="#2196F3" />
          <Text style={styles.featureText}>Product Details & Origin</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
        <Icon name="qr-code-scanner" size={28} color="#FFF" />
        <Text style={styles.scanButtonText}>Scan QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpButton} onPress={showInstructions}>
        <Icon name="help-outline" size={20} color="#666" />
        <Text style={styles.helpButtonText}>How to Use</Text>
      </TouchableOpacity>

      <View style={styles.demoInfo}>
        <Text style={styles.demoTitle}>Demo QR Codes:</Text>
        <Text style={styles.demoText}>• PROD001 - Authentic Product</Text>
        <Text style={styles.demoText}>• PROD002 - Previously Scanned</Text>
        <Text style={styles.demoText}>• EXPIRED001 - Expired Product</Text>
        <Text style={styles.demoText}>• Any other - Invalid Code</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  features: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  scanButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginHorizontal: 20,
  },
  helpButtonText: {
    color: '#666',
    fontSize: 16,
    marginLeft: 8,
  },
  demoInfo: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default HomeScreen;