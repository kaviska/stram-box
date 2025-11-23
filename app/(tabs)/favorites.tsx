import { MovieCard } from '@/components/MovieCard';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useFavorites } from '@/context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const router = useRouter();

  const handlePress = (item: any) => {
    router.push({
      pathname: '/media/[id]',
      params: { id: item.id, type: item.media_type }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-3xl font-bold text-text">Favorites</Text>
        <ThemeToggle />
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard 
            item={item} 
            onPress={() => handlePress(item)}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <View className="h-24 w-24 rounded-full bg-surface dark:bg-slate-800 items-center justify-center mb-4">
              <Ionicons name="heart-outline" size={48} color="#94a3b8" />
            </View>
            <Text className="text-xl font-bold text-text">No favorites yet</Text>
            <Text className="text-text-muted mt-2 text-center px-8">
              Start adding movies and TV shows to your favorites list!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
