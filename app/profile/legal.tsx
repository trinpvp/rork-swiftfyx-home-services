import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function LegalScreen() {
  const router = useRouter();

  const legalItems = [
    { id: 'terms', title: 'Terms of Service', description: 'Read our terms and conditions' },
    { id: 'privacy', title: 'Privacy Policy', description: 'How we handle your data' },
    { id: 'cookies', title: 'Cookie Policy', description: 'Our use of cookies' },
    { id: 'licenses', title: 'Licenses', description: 'Open source licenses' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Legal</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {legalItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.legalItem}>
            <View style={styles.legalItemLeft}>
              <Text style={styles.legalItemTitle}>{item.title}</Text>
              <Text style={styles.legalItemDescription}>{item.description}</Text>
            </View>
            <ChevronRight size={20} color="#999999" />
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>SwiftFyx v1.0.0</Text>
          <Text style={styles.footerText}>© 2025 SwiftFyx. All rights reserved.</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  legalItemLeft: {
    flex: 1,
  },
  legalItemTitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#000000',
    marginBottom: 4,
  },
  legalItemDescription: {
    fontSize: 14,
    color: '#666666',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
});
