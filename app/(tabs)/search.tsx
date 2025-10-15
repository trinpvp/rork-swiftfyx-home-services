import { useRouter } from 'expo-router';
import { Search as SearchIcon, Home as HomeIcon, Dog, Baby, Calendar, ChefHat } from 'lucide-react-native';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: '1', name: 'Landscaping', icon: '🌳', enabled: false },
    { id: '2', name: 'House Cleaning', icon: '🏠', enabled: true },
    { id: '3', name: 'Dog Sitting', icon: '🐕', enabled: false },
    { id: '4', name: 'Baby Sitting', icon: '👶', enabled: false },
    { id: '5', name: 'Party Planning', icon: '🎉', enabled: false },
    { id: '6', name: 'Cooking', icon: '👨‍🍳', enabled: false },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Search</Text>
          
          <View style={styles.searchContainer}>
            <SearchIcon size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search For Gigs!"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Top Categories</Text>

          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                !category.enabled && styles.categoryItemDisabled,
              ]}
              disabled={!category.enabled}
              onPress={() => {
                if (category.enabled) {
                  console.log('Navigate to category:', category.name);
                }
              }}
            >
              <View style={styles.categoryLeft}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    !category.enabled && styles.categoryNameDisabled,
                  ]}
                >
                  {category.name}
                </Text>
              </View>
              {!category.enabled && (
                <View style={styles.comingSoonBadge}>
                  <Text style={styles.comingSoonText}>Coming Soon</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: '#000000',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF8C00',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: '#000000',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#000000',
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  categoryItemDisabled: {
    opacity: 0.5,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#000000',
  },
  categoryNameDisabled: {
    color: '#999999',
  },
  comingSoonBadge: {
    backgroundColor: '#FFE5D9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  comingSoonText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#FF8C00',
  },
});
