import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star, MapPin, Clock, Shield, Languages } from 'lucide-react-native';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function WorkerDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const worker = {
    id: id as string,
    name: 'Sarah Johnson',
    rating: 4.8,
    reviewCount: 42,
    location: 'San Diego, CA',
    hourlyRate: 85,
    specialties: ['Deep Cleaning', 'Move-in/Move-out', 'Regular Maintenance'],
    about:
      "I'm Sarah, a professional house cleaner with 6 years of experience. I specialize in thorough deep cleaning and take pride in leaving every home spotless. I'm detail-oriented, reliable, and always arrive on time.",
    yearsInBusiness: 6,
    hiresOnSwiftFyx: 127,
    backgroundChecked: true,
    languages: ['English', 'Spanish'],
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800',
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800',
    ],
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: worker.images[currentImageIndex] }} style={styles.image} />
          <View style={styles.imageDots}>
            {worker.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentImageIndex && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.headerSection}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{worker.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={styles.rating}>{worker.rating}</Text>
                <Text style={styles.reviewCount}>({worker.reviewCount})</Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <MapPin size={16} color="#FF8C00" />
              <Text style={styles.location}>{worker.location}</Text>
            </View>

            <View style={styles.priceSection}>
              <Text style={styles.price}>${worker.hourlyRate}/hour</Text>
              <Text style={styles.priceLabel}>Estimated Price</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specialties</Text>
            <View style={styles.specialtiesContainer}>
              {worker.specialties.map((specialty, index) => (
                <View key={index} style={styles.specialtyBadge}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About This Expert</Text>
            <Text style={styles.aboutText}>{worker.about}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            
            <View style={styles.overviewItem}>
              <Clock size={18} color="#666666" />
              <Text style={styles.overviewText}>
                {worker.yearsInBusiness} years in business
              </Text>
            </View>

            <View style={styles.overviewItem}>
              <Star size={18} color="#666666" />
              <Text style={styles.overviewText}>
                {worker.hiresOnSwiftFyx} hires on SwiftFyx
              </Text>
            </View>

            <View style={styles.overviewItem}>
              <Shield size={18} color="#666666" />
              <Text style={styles.overviewText}>Background Checked</Text>
            </View>

            <View style={styles.overviewItem}>
              <Languages size={18} color="#666666" />
              <Text style={styles.overviewText}>
                Languages Spoken: {worker.languages.join(', ')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkAvailabilityButton}
          onPress={() => {
            router.push('/order-tracking');
          }}
        >
          <Text style={styles.checkAvailabilityText}>Check Availability</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageDots: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotActive: {
    backgroundColor: '#FF8C00',
  },
  content: {
    padding: 20,
  },
  headerSection: {
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#000000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#000000',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666666',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  location: {
    fontSize: 14,
    color: '#666666',
  },
  priceSection: {
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#000000',
  },
  priceLabel: {
    fontSize: 14,
    color: '#999999',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#000000',
    marginBottom: 12,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyBadge: {
    backgroundColor: '#FFE5D9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  specialtyText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FF8C00',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
  },
  overviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  overviewText: {
    fontSize: 14,
    color: '#666666',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  checkAvailabilityButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  checkAvailabilityText: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
  },
});
