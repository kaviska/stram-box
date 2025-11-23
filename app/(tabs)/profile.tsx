import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background p-6">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-3xl font-bold text-text">Profile</Text>
        <ThemeToggle />
      </View>
      
      <View className="flex-1 items-center justify-center space-y-6">
        <View className="h-24 w-24 rounded-full bg-primary/20 items-center justify-center">
          <Text className="text-4xl text-primary font-bold">JD</Text>
        </View>
        <Text className="text-xl font-bold text-text">John Doe</Text>
        <Text className="text-text-muted">john.doe@example.com</Text>
        
        <Button 
          label="Log Out" 
          variant="outline"
          onPress={() => router.replace('/')}
          className="w-full max-w-xs"
        />
      </View>
    </SafeAreaView>
  );
}
