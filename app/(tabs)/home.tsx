import { MovieCard } from '@/components/MovieCard';
import { Input } from '@/components/ui/Input';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { fetchTrending, MediaItem } from '@/services/tmdb';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'movie' | 'tv'>('movie');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchTrending(filter);
    setMedia(data);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  const handlePress = (item: MediaItem) => {
    router.push({
      pathname: '/media/[id]',
      params: { id: item.id, type: item.media_type }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-1 px-4">
        {/* Header */}
        <View className="flex-row items-center justify-between py-4">
          <View>
            <Text className="text-2xl font-bold text-text">StreamBox</Text>
            <Text className="text-sm text-text-muted">Discover latest hits</Text>
          </View>
          <ThemeToggle />
        </View>

        {/* Search Bar Placeholder */}
        <View className="mb-6">
          <Input 
            placeholder="Search movies & TV shows..." 
            className="bg-surface dark:bg-slate-800 border-none"
          />
        </View>

        {/* Filter Tabs */}
        <View className="mb-6 flex-row space-x-4">
          <TouchableOpacity 
            onPress={() => setFilter('movie')}
            className={`rounded-full px-6 py-2 ${filter === 'movie' ? 'bg-primary' : 'bg-surface dark:bg-slate-800'}`}
          >
            <Text className={`font-medium ${filter === 'movie' ? 'text-white' : 'text-text'}`}>Movies</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setFilter('tv')}
            className={`rounded-full px-6 py-2 ${filter === 'tv' ? 'bg-primary' : 'bg-surface dark:bg-slate-800'}`}
          >
            <Text className={`font-medium ${filter === 'tv' ? 'text-white' : 'text-text'}`}>TV Shows</Text>
          </TouchableOpacity>
        </View>

        {/* Content Grid */}
        {loading && !refreshing ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#6366f1" />
          </View>
        ) : (
          <FlatList
            data={media}
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
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
            }
            ListEmptyComponent={
              <View className="mt-20 items-center">
                <Text className="text-text-muted">No results found</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
