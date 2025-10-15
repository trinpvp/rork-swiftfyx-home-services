import { useRouter } from 'expo-router';
import { ArrowLeft, HelpCircle } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderTrackingScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'completed' | 'active'>('active');
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const order = {
    id: '1',
    service: 'House Cleaning',
    details: 'Rush Cleaning for 4bd 2br 4500sq ft',
    address: '1234 Hidden Valley Drive, San Diego, CA 92183',
    estimatedArrival: '20:00 Mins',
    latestArrival: '2:30 pm',
    workerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpButton}>
            <HelpCircle size={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
              onPress={() => setActiveTab('completed')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'completed' && styles.tabTextActive,
                ]}
              >
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'active' && styles.tabActive]}
              onPress={() => setActiveTab('active')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'active' && styles.tabTextActive,
                ]}
              >
                Active
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.estimatedSection}>
            <Text style={styles.estimatedTime}>{order.estimatedArrival}</Text>
            <Text style={styles.estimatedLabel}>Estimated Arrival</Text>
            <Text style={styles.latestArrival}>
              Latest arrival by {order.latestArrival}
            </Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressStep}>
                <View style={[styles.progressDot, styles.progressDotActive]} />
              </View>
              <View style={styles.progressLine} />
              <View style={styles.progressStep}>
                <View style={styles.progressDot} />
              </View>
              <View style={styles.progressLine} />
              <View style={styles.progressStep}>
                <View style={styles.progressDot} />
              </View>
            </View>
          </View>

          <View style={styles.workerImageContainer}>
            <Image source={{ uri: order.workerImage }} style={styles.workerImage} />
          </View>

          <View style={styles.detailsSection}>
            <Text style={styles.detailsTitle}>Arrival Details</Text>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Address</Text>
              <Text style={styles.detailValue}>{order.address}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>{order.service}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Details</Text>
              <Text style={styles.detailValue}>{order.details}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  helpButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  tabs: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
  },
  tab: {
    paddingBottom: 8,
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF8C00',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#999999',
  },
  tabTextActive: {
    color: '#FF8C00',
  },
  estimatedSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  estimatedTime: {
    fontSize: 48,
    fontWeight: 'bold' as const,
    color: '#000000',
    marginBottom: 8,
  },
  estimatedLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#666666',
    marginBottom: 4,
  },
  latestArrival: {
    fontSize: 14,
    color: '#999999',
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressStep: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#CCCCCC',
  },
  progressDotActive: {
    backgroundColor: '#FF8C00',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  progressLine: {
    flex: 1,
    height: 3,
    backgroundColor: '#CCCCCC',
  },
  workerImageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  workerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  detailsSection: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#000000',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#FF8C00',
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#999999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
  },
});
