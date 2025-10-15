import { MessageCircle } from 'lucide-react-native';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'read' | 'unread'>('all');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Messages</Text>
          
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'all' && styles.tabActive]}
              onPress={() => setActiveTab('all')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'all' && styles.tabTextActive,
                ]}
              >
                All Messages
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'read' && styles.tabActive]}
              onPress={() => setActiveTab('read')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'read' && styles.tabTextActive,
                ]}
              >
                Read
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'unread' && styles.tabActive]}
              onPress={() => setActiveTab('unread')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'unread' && styles.tabTextActive,
                ]}
              >
                Unread
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.emptyState}>
            <MessageCircle size={64} color="#CCCCCC" />
            <Text style={styles.emptyStateTitle}>No Messages</Text>
            <Text style={styles.emptyStateText}>
              Your conversations with workers will appear here
            </Text>
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
  tabs: {
    flexDirection: 'row',
    gap: 16,
  },
  tab: {
    paddingBottom: 8,
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF8C00',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#999999',
  },
  tabTextActive: {
    color: '#FF8C00',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});
