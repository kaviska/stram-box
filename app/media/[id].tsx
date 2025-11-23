import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { fetchMediaDetails, MediaDetails, TMDB_IMAGE_BASE_URL } from '@/services/tmdb';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function MediaDetailsScreen() {
  const { id, type } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [details, setDetails] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(true);

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
        <Text className="text-text">Failed to load details</Text>
        <Button label="Go Back" onPress={() => router.back()} className="mt-4" />
      </View>
    );
  }

  const title = details.title || details.name;
  const date = details.release_date || details.first_air_date;
  const year = date ? new Date(date).getFullYear() : 'N/A';
  const runtime = details.runtime || (details.episode_run_time ? details.episode_run_time[0] : 0);
  const duration = runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}m` : 'N/A';

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Backdrop Image */}
        <View className="relative h-[450px] w-full">
          <Image
            source={{ uri: `${TMDB_IMAGE_BASE_URL}${details.poster_path}` }}
            className="h-full w-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', theme === 'dark' ? '#0f172a' : '#f8fafc']}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 }}
          />
          
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => router.back()}
            className="absolute left-4 top-12 rounded-full bg-black/30 p-2 backdrop-blur-md"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Content Info */}
        <View className="px-6 -mt-20">
          <Text className="text-4xl font-bold text-text shadow-lg">{title}</Text>
          
          {details.tagline && (
            <Text className="mt-2 text-lg italic text-text-muted">{details.tagline}</Text>
          )}

          <View className="mt-4 flex-row flex-wrap items-center gap-3">
            <View className="rounded-md bg-primary/20 px-2 py-1">
              <Text className="text-sm font-bold text-primary">{details.media_type.toUpperCase()}</Text>
            </View>
            <Text className="text-text-muted">•</Text>
            <Text className="text-text-muted">{year}</Text>
            <Text className="text-text-muted">•</Text>
            <Text className="text-text-muted">{duration}</Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#f59e0b" />
              <Text className="ml-1 font-bold text-yellow-500">{details.vote_average.toFixed(1)}</Text>
            </View>
          </View>

          {/* Genres */}
          <View className="mt-4 flex-row flex-wrap gap-2">
            {details.genres.map((genre) => (
              <View key={genre.id} className="rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1">
                <Text className="text-xs text-text-muted">{genre.name}</Text>
              </View>
            ))}
          </View>

          {/* Actions */}
          <View className="mt-6 flex-row gap-4">
            <Button 
              label="Watch Now" 
              className="flex-1"
              onPress={() => {}} 
            />
            <TouchableOpacity className="items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-700 px-4">
              <Ionicons name="heart-outline" size={24} color={theme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>

          {/* Overview */}
          <View className="mt-8">
            <Text className="text-xl font-bold text-text">Storyline</Text>
            <Text className="mt-2 text-base leading-6 text-text-muted">
              {details.overview}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
