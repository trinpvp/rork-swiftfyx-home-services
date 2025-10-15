import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { ChevronRight, User as UserIcon } from 'lucide-react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/(auth)/sign-in');
        },
      },
    ]);
  };

  const menuItems = [
    { id: 'name', label: 'Name', value: user?.name, route: '/profile/edit-name' },
    { id: 'email', label: 'Email', value: user?.email, route: '/profile/edit-email' },
    { id: 'password', label: 'Password', value: '••••••••', route: '/profile/edit-password' },
    { id: 'payment', label: 'Payment', value: null, route: '/profile/payment' },
    { id: 'settings', label: 'Settings', value: null, route: '/profile/settings' },
    { id: 'report', label: 'Report', value: null, route: '/profile/report' },
    { id: 'legal', label: 'Legal', value: null, route: '/profile/legal' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Text style={styles.greeting}>Hi, {user?.name || 'Guest'}</Text>
            <View style={styles.avatarContainer}>
              {user?.profileImage ? (
                <Image source={{ uri: user.profileImage }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <UserIcon size={40} color="#FF8C00" />
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                router.push(item.route as any);
              }}
            >
              <Text style={styles.menuLabel}>{item.label}</Text>
              <ChevronRight size={20} color="#999999" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
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
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: '#000000',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF5EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#000000',
  },
  signOutButton: {
    marginTop: 32,
    marginBottom: 40,
    backgroundColor: '#FF8C00',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
  },
});
