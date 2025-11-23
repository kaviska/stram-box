import { Button } from '@/components/ui/Button';
import { useFavorites } from '@/context/FavoritesContext';
import { useTheme } from '@/context/ThemeContext';
import { fetchMediaDetails, MediaDetails, TMDB_IMAGE_BASE_URL } from '@/services/tmdb';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 450;

export default function MediaDetailsScreen() {
  const { id, type } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [details, setDetails] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: HEADER_HEIGHT,
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  useEffect(() => {
    const loadDetails = async () => {
      if (id && type) {
        const data = await fetchMediaDetails(Number(id), type as 'movie' | 'tv');
        setDetails(data);
        setLoading(false);
      }
    };
    loadDetails();
  }, [id, type]);

  const isFav = details ? isFavorite(details.id) : false;

  const toggleFavorite = async () => {
    if (!details) return;
    if (isFav) {
      await removeFavorite(details.id);
    } else {
      await addFavorite(details);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!details) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-text font-sans">Failed to load details</Text>
        <Button label="Go Back" onPress={() => router.back()} className="mt-4" />
      </View>
    );
  }

  const title = details.title || details.name;
  const date = details.release_date || details.first_air_date;
  const year = date ? new Date(date).getFullYear() : 'N/A';
  const runtime = details.runtime || (details.episode_run_time ? details.episode_run_time[0] : 0);
  const duration = runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}m` : 'N/A';

  // Dummy Cast Data
  const cast = [1, 2, 3, 4, 5, 6].map((i) => ({ id: i, name: `Actor ${i}`, role: `Character ${i}` }));

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ headerShown: false }} />
      
      <Animated.ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 40 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {/* Parallax Backdrop */}
        <Animated.View style={[headerStyle, { width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }]}>
          <Image
            source={{ uri: `${TMDB_IMAGE_BASE_URL}${details.poster_path}` }}
            className="h-full w-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', theme === 'dark' ? '#0f172a' : '#f8fafc']}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 250 }}
          />
        </Animated.View>

        {/* Spacer for Header */}
        <View style={{ height: HEADER_HEIGHT - 100 }} />

        {/* Content Info */}
        <View className="px-6 pb-6">
          <Text className="text-4xl font-bold text-text shadow-lg font-sans">{title}</Text>
          
          {details.tagline && (
            <Text className="mt-2 text-lg italic text-text-muted font-sans">{details.tagline}</Text>
          )}

          <View className="mt-4 flex-row flex-wrap items-center gap-3">
            <View className="rounded-md bg-primary/20 px-2 py-1 backdrop-blur-md border border-primary/20">
              <Text className="text-sm font-bold text-primary font-sans">{details.media_type.toUpperCase()}</Text>
            </View>
            <Text className="text-text-muted">•</Text>
            <Text className="text-text-muted font-sans">{year}</Text>
            <Text className="text-text-muted">•</Text>
            <Text className="text-text-muted font-sans">{duration}</Text>
            <View className="flex-row items-center rounded-full bg-yellow-500/10 px-2 py-0.5 border border-yellow-500/20">
              <Ionicons name="star" size={14} color="#f59e0b" />
              <Text className="ml-1 font-bold text-yellow-500 font-sans">{details.vote_average.toFixed(1)}</Text>
            </View>
          </View>

          {/* Genres */}
          <View className="mt-4 flex-row flex-wrap gap-2">
            {details.genres.map((genre) => (
              <View key={genre.id} className="rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 bg-surface/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <Text className="text-xs text-text-muted font-sans">{genre.name}</Text>
              </View>
            ))}
          </View>

          {/* Actions */}
          <View className="mt-8 flex-row gap-4">
            <Button 
              label="Watch Now" 
              className="flex-1 shadow-lg shadow-primary/30"
              onPress={() => {}} 
            />
            <TouchableOpacity 
              onPress={toggleFavorite}
              className={`items-center justify-center rounded-xl border-2 ${isFav ? 'border-red-500 bg-red-500/10' : 'border-gray-200 dark:border-gray-700 bg-surface dark:bg-slate-800'} px-4 shadow-sm`}
            >
              <Ionicons name={isFav ? "heart" : "heart-outline"} size={24} color={isFav ? "#ef4444" : (theme === 'dark' ? 'white' : 'black')} />
            </TouchableOpacity>
          </View>

          {/* Overview */}
          <View className="mt-8 p-4 rounded-2xl bg-surface/50 dark:bg-slate-800/50 border border-gray-100 dark:border-gray-800 backdrop-blur-md">
            <Text className="text-xl font-bold text-text font-sans mb-2">Storyline</Text>
            <Text className="text-base leading-7 text-text-muted font-sans">
              {details.overview}
            </Text>
          </View>

          {/* Cast Section */}
          <View className="mt-8">
            <Text className="text-xl font-bold text-text font-sans mb-4">Top Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
              {cast.map((actor) => (
                <View key={actor.id} className="items-center w-20">
                  <View className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 mb-2 overflow-hidden border-2 border-surface dark:border-slate-600 shadow-sm">
                    <Ionicons name="person" size={30} color="#94a3b8" style={{ marginTop: 10, marginLeft: 2 }} />
                  </View>
                  <Text numberOfLines={1} className="text-xs font-bold text-text font-sans text-center">{actor.name}</Text>
                  <Text numberOfLines={1} className="text-[10px] text-text-muted font-sans text-center">{actor.role}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => router.back()}
        className="absolute left-4 top-12 rounded-full bg-black/30 p-2 backdrop-blur-md border border-white/10"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
