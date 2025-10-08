import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { productAPI } from '../services/api';

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
      await productAPI.recordScan(qrCodeData);
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
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Verifying product authenticity...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.container}>
        <View style={[styles.statusHeader, { backgroundColor: '#F44336' }]}>
          <Icon name="error" size={60} color="#FFF" />
          <Text style={styles.statusTitle}>Verification Failed</Text>
          <Text style={styles.statusSubtitle}>
            {error || 'Product not found in our database'}
          </Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Scanned Code</Text>
            <Text style={styles.detailValue}>{qrCodeData}</Text>
          </View>

          <View style={styles.warningCard}>
            <Icon name="warning" size={24} color="#FF9800" />
            <Text style={styles.warningText}>
              This product may be counterfeit or not properly registered.
              Please contact the manufacturer or retailer for assistance.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.scanAgainButton} onPress={handleScanAgain}>
            <Text style={styles.scanAgainButtonText}>Scan Another Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.statusHeader, { backgroundColor: getStatusColor(product.status) }]}>
        <Icon name={getStatusIcon(product.status)} size={60} color="#FFF" />
        <Text style={styles.statusTitle}>
          {product.status === 'authentic' ? 'Authentic Product' : 'Verification Warning'}
        </Text>
        <Text style={styles.statusSubtitle}>
          {product.status === 'authentic' 
            ? 'This product is verified and authentic'
            : 'Please review the product details carefully'
          }
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Product Basic Info */}
        <View style={styles.detailCard}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.brandName}>by {product.brand}</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Batch Number</Text>
              <Text style={styles.detailValue}>{product.batchNumber}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Manufacture Date</Text>
              <Text style={styles.detailValue}>
                {new Date(product.manufactureDate).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Expiry Date</Text>
              <Text style={[
                styles.detailValue,
                product.isExpired && styles.expiredText
              ]}>
                {new Date(product.expiryDate).toLocaleDateString()}
                {product.isExpired && ' (Expired)'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Origin</Text>
              <Text style={styles.detailValue}>{product.origin}</Text>
            </View>
          </View>
        </View>

        {/* Additional Information */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Additional Information</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Warranty</Text>
            <Text style={styles.infoValue}>{product.warranty}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Usage Instructions</Text>
            <Text style={styles.infoValue}>{product.instructions}</Text>
          </View>
        </View>

        {/* Security Information */}
        <View style={styles.securityCard}>
          <Text style={styles.cardTitle}>Security Information</Text>
          
          <View style={styles.securityItem}>
            <Icon 
              name={product.isAuthentic ? "check-circle" : "cancel"} 
              size={20} 
              color={product.isAuthentic ? "#4CAF50" : "#F44336"} 
            />
            <Text style={styles.securityText}>
              {product.isAuthentic ? 'Authentic Product' : 'Product Authentication Failed'}
            </Text>
          </View>
          
          <View style={styles.securityItem}>
            <Icon 
              name={product.isExpired ? "warning" : "check-circle"} 
              size={20} 
              color={product.isExpired ? "#FF9800" : "#4CAF50"} 
            />
            <Text style={styles.securityText}>
              {product.isExpired ? 'Product Expired' : 'Within Expiry Date'}
            </Text>
          </View>
          
          <View style={styles.securityItem}>
            <Icon 
              name={product.isSuspicious ? "warning" : "check-circle"} 
              size={20} 
              color={product.isSuspicious ? "#FF9800" : "#4CAF50"} 
            />
            <Text style={styles.securityText}>
              {product.isSuspicious 
                ? `Multiple scans detected (${product.scanCount} times)`
                : 'Normal scan activity'
              }
            </Text>
          </View>
        </View>

        {/* Verification Timestamp */}
        <View style={styles.timestampCard}>
          <Text style={styles.timestampText}>
            Verified on: {new Date(product.verificationDate).toLocaleString()}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.scanAgainButton} onPress={handleScanAgain}>
          <Icon name="qr-code-scanner" size={20} color="#FFF" />
          <Text style={styles.scanAgainButtonText}>Scan Another Product</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  statusHeader: {
    padding: 30,
    alignItems: 'center',
  },
  statusTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusSubtitle: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  detailCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  brandName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  expiredText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  securityCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  timestampCard: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  timestampText: {
    fontSize: 14,
    color: '#1976D2',
    fontStyle: 'italic',
  },
  warningCard: {
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#E65100',
    marginLeft: 10,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  scanAgainButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  scanAgainButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  homeButton: {
    padding: 15,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default ResultScreen;