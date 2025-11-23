import { ThemeToggle } from '@/components/ui/ThemeToggle';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background p-6">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-3xl font-bold text-text">Favorites</Text>
        <ThemeToggle />
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-text-muted">No favorites yet</Text>
      </View>
    </SafeAreaView>
  );
}
