import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const MenuItem = ({ icon, label, color }: { icon: keyof typeof Ionicons.glyphMap; label: string; color?: string }) => (
    <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800">
      <View className="flex-row items-center">
        <View className={`h-10 w-10 rounded-full items-center justify-center mr-4 ${color ? `bg-${color}-500/10` : 'bg-gray-100 dark:bg-slate-800'}`}>
          <Ionicons name={icon} size={20} color={color || (theme === 'dark' ? '#94a3b8' : '#64748b')} />
        </View>
        <Text className="text-base font-medium text-text font-sans">{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme === 'dark' ? '#475569' : '#cbd5e1'} />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header Background */}
        <View className="relative h-48 w-full overflow-hidden rounded-b-[40px]">
          <LinearGradient
            colors={['#6366f1', '#ec4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="h-full w-full"
          />
          <View className="absolute top-12 right-6">
            <ThemeToggle />
          </View>
        </View>

        {/* Profile Card */}
        <View className="px-6 -mt-16 items-center">
          <View className="h-32 w-32 rounded-full bg-surface dark:bg-slate-900 p-1 shadow-xl">
            <View className="h-full w-full rounded-full bg-gray-200 dark:bg-slate-800 items-center justify-center overflow-hidden">
               <Text className="text-4xl font-bold text-primary font-sans">JD</Text>
            </View>
            <View className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-green-500 border-4 border-surface dark:border-slate-900" />
          </View>
          
          <Text className="mt-4 text-2xl font-bold text-text font-sans">John Doe</Text>
          <Text className="text-text-muted font-sans">john.doe@example.com</Text>

          {/* Stats */}
          <View className="mt-6 flex-row w-full justify-between rounded-2xl bg-surface dark:bg-slate-800 p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <View className="items-center flex-1 border-r border-gray-100 dark:border-gray-700">
              <Text className="text-xl font-bold text-text font-sans">12</Text>
              <Text className="text-xs text-text-muted uppercase font-bold tracking-wider mt-1">Favorites</Text>
            </View>
            <View className="items-center flex-1 border-r border-gray-100 dark:border-gray-700">
              <Text className="text-xl font-bold text-text font-sans">5</Text>
              <Text className="text-xs text-text-muted uppercase font-bold tracking-wider mt-1">Watched</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-xl font-bold text-text font-sans">Pro</Text>
              <Text className="text-xs text-text-muted uppercase font-bold tracking-wider mt-1">Plan</Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View className="px-6 mt-8">
          <Text className="text-sm font-bold text-text-muted uppercase mb-2 font-sans tracking-wider">Account</Text>
          <MenuItem icon="person-outline" label="Edit Profile" color="#6366f1" />
          <MenuItem icon="notifications-outline" label="Notifications" color="#f59e0b" />
          <MenuItem icon="lock-closed-outline" label="Privacy & Security" color="#10b981" />
        </View>

        <View className="px-6 mt-8">
          <Text className="text-sm font-bold text-text-muted uppercase mb-2 font-sans tracking-wider">Support</Text>
          <MenuItem icon="help-circle-outline" label="Help Center" />
          <MenuItem icon="mail-outline" label="Contact Us" />
        </View>
        
        <View className="px-6 mt-8">
          <Button 
            label="Log Out" 
            variant="outline"
            onPress={() => router.replace('/')}
            className="w-full"
          />
        </View>
      </ScrollView>
    </View>
  );
}
