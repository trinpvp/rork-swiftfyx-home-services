import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { Home as HomeIcon, MapPin, Bell } from 'lucide-react-native';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Hello, {user?.name || 'Guest'}</Text>
              <View style={styles.locationRow}>
                <MapPin size={16} color="#FF8C00" />
                <Text style={styles.location}>{user?.address || 'Set your location'}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#FF8C00" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Explore!"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Now Near You</Text>
          <View style={styles.emptyState}>
            <HomeIcon size={48} color="#CCCCCC" />
            <Text style={styles.emptyStateText}>No workers available right now</Text>
            <Text style={styles.emptyStateSubtext}>
              Check back soon or browse our categories
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SwiftFyx Featured Selections</Text>
          
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => router.push('/search')}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>House Cleaning</Text>
          </TouchableOpacity>

          <View style={styles.disabledCategoryCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400' }}
              style={[styles.categoryImage, styles.disabledImage]}
            />
            <Text style={styles.disabledCategoryName}>Landscaping</Text>
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </View>
          </View>

          <View style={styles.disabledCategoryCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400' }}
              style={[styles.categoryImage, styles.disabledImage]}
            />
            <Text style={styles.disabledCategoryName}>Electrical Installations</Text>
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </View>
          </View>

          <View style={styles.disabledCategoryCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400' }}
              style={[styles.categoryImage, styles.disabledImage]}
            />
            <Text style={styles.disabledCategoryName}>Tutoring</Text>
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#000000',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: '#666666',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF5EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    borderWidth: 2,
    borderColor: '#FF8C00',
    borderRadius: 12,
    overflow: 'hidden',
  },
  searchInput: {
    padding: 14,
    fontSize: 16,
    color: '#000000',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#000000',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#666666',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999999',
    marginTop: 4,
  },
  categoryCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledCategoryCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    opacity: 0.6,
  },
  categoryImage: {
    width: '100%',
    height: 120,
  },
  disabledImage: {
    opacity: 0.5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#000000',
    padding: 12,
  },
  disabledCategoryName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#999999',
    padding: 12,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF8C00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  comingSoonText: {
    fontSize: 12,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
  },
});
