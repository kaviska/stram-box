import { HeroCarousel } from '@/components/HeroCarousel';
import { MovieCard } from '@/components/MovieCard';
import { Input } from '@/components/ui/Input';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { fetchTrending, MediaItem, searchMedia } from '@/services/tmdb';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'movie' | 'tv'>('movie');
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    let data;
    if (searchQuery.trim()) {
      data = await searchMedia(searchQuery);
    } else {
      data = await fetchTrending(filter);
    }
    setMedia(data);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 500);
    return () => clearTimeout(timer);
  }, [filter, searchQuery]);

  const handlePress = (item: MediaItem) => {
    router.push({
      pathname: '/media/[id]',
      params: { id: item.id, type: item.media_type }
    });
  };

  const renderHeader = () => (
    <View>
      <View className="px-4 mb-6">
        <View className="flex-row items-center justify-between py-4">
          <View>
            <Text className="text-3xl font-bold text-text font-sans">StreamBox</Text>
            <Text className="text-sm text-text-muted font-sans">Discover latest hits</Text>
          </View>
          <ThemeToggle />
        </View>

        <View className="mb-2">
          <Input 
            placeholder="Search movies & TV shows..." 
            className="bg-surface dark:bg-slate-800 border-none shadow-sm"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {!searchQuery && <HeroCarousel data={media.slice(0, 5)} />}

      <View className="px-4 mb-4 flex-row space-x-4">
        <TouchableOpacity 
          onPress={() => setFilter('movie')}
          className={`rounded-full px-6 py-2 shadow-sm ${filter === 'movie' ? 'bg-primary' : 'bg-surface dark:bg-slate-800'}`}
        >
          <Text className={`font-medium font-sans ${filter === 'movie' ? 'text-white' : 'text-text'}`}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setFilter('tv')}
          className={`rounded-full px-6 py-2 shadow-sm ${filter === 'tv' ? 'bg-primary' : 'bg-surface dark:bg-slate-800'}`}
        >
          <Text className={`font-medium font-sans ${filter === 'tv' ? 'text-white' : 'text-text'}`}>TV Shows</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {loading && !refreshing ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#6366f1" />
        </View>
      ) : (
        <FlatList
          data={media}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          renderItem={({ item, index }) => (
            <Animated.View 
              entering={FadeInUp.delay(index * 100).springify()}
              className="w-[48%]"
            >
              <MovieCard 
                item={item} 
                onPress={() => handlePress(item)}
              />
            </Animated.View>
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
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
    </SafeAreaView>
  );
}
