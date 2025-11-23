import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const MenuItem = ({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) => (
    <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800">
      <View className="flex-row items-center">
        <View className="h-10 w-10 rounded-full bg-gray-100 dark:bg-slate-800 items-center justify-center mr-4">
          <Ionicons name={icon} size={20} color={theme === 'dark' ? '#94a3b8' : '#64748b'} />
        </View>
        <Text className="text-base font-medium text-text">{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme === 'dark' ? '#475569' : '#cbd5e1'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6">
        <View className="flex-row items-center justify-between py-6">
          <Text className="text-3xl font-bold text-text">Profile</Text>
          <ThemeToggle />
        </View>
        
        <View className="items-center mb-8">
          <View className="h-24 w-24 rounded-full bg-primary/20 items-center justify-center mb-4">
            <Text className="text-4xl text-primary font-bold">JD</Text>
          </View>
          <Text className="text-xl font-bold text-text">John Doe</Text>
          <Text className="text-text-muted">john.doe@example.com</Text>
        </View>

        <View className="mb-8">
          <Text className="text-sm font-bold text-text-muted uppercase mb-2">Account</Text>
          <MenuItem icon="person-outline" label="Edit Profile" />
          <MenuItem icon="notifications-outline" label="Notifications" />
          <MenuItem icon="lock-closed-outline" label="Privacy & Security" />
        </View>

        <View className="mb-8">
          <Text className="text-sm font-bold text-text-muted uppercase mb-2">Support</Text>
          <MenuItem icon="help-circle-outline" label="Help Center" />
          <MenuItem icon="mail-outline" label="Contact Us" />
        </View>
        
        <Button 
          label="Log Out" 
          variant="outline"
          onPress={() => router.replace('/')}
          className="w-full mb-8"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
