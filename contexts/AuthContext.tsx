import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
  profileImage?: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const USERS_KEY = '@swiftfyx_users';
const CURRENT_USER_KEY = '@swiftfyx_current_user';

export const [AuthProvider, useAuth] = createContextHook<AuthContextValue>(() => {
  const loadCurrentUser = async () => {
    try {
      const currentUserJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
      if (currentUserJson) {
        setUser(JSON.parse(currentUserJson));
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllUsers = async (): Promise<User[]> => {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  };

  const saveUsers = async (users: User[]) => {
    try {
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = await getAllUsers();
      console.log('All users in database:', users.map(u => ({ email: u.email, id: u.id })));
      console.log('Looking for user with email:', email);
      
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (foundUser) {
        console.log('User found, signing in:', foundUser.email);
        setUser(foundUser);
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
        return true;
      }
      console.log('User not found or password incorrect');
      return false;
    } catch (error) {
      console.error('Error signing in:', error);
      return false;
    }
  };

  const signUp = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    try {
      const users = await getAllUsers();
      
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (existingUser) {
        console.log('User already exists with email:', email);
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password,
      };

      console.log('Creating new user:', { email: newUser.email, id: newUser.id });
      users.push(newUser);
      await saveUsers(users);
      console.log('User saved successfully');
      
      setUser(newUser);
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Error signing up:', error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const updatedUser = { ...user, ...updates };
      
      const users = await getAllUsers();
      const userIndex = users.findIndex((u) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        await saveUsers(users);
      }

      setUser(updatedUser);
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
  };
});
