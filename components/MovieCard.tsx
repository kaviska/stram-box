import { useFavorites } from '@/context/FavoritesContext';
import { MediaItem, TMDB_IMAGE_BASE_URL } from '@/services/tmdb';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface MovieCardProps {
  item: MediaItem;
  onPress?: () => void;
}

export const MovieCard = ({ item, onPress }: MovieCardProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const year = date ? new Date(date).getFullYear() : 'N/A';
  const isFav = isFavorite(item.id);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const toggleFavorite = async () => {
    if (isFav) {
      await removeFavorite(item.id);
    } else {
      await addFavorite(item);
    }
  };

  return (
    <Animated.View style={animatedStyle} className="mb-4 w-full overflow-hidden rounded-2xl bg-surface shadow-lg dark:bg-slate-800">
      <Pressable 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="w-full"
      >
        <View className="relative aspect-[2/3] w-full bg-gray-200 dark:bg-gray-700">
          {item.poster_path ? (
            <Image
              source={{ uri: `${TMDB_IMAGE_BASE_URL}${item.poster_path}` }}
              className="h-full w-full"
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Ionicons name="image-outline" size={40} color="#94a3b8" />
            </View>
          )}
          
          {/* Favorite Button */}
          <TouchableOpacity 
            onPress={toggleFavorite}
            className="absolute right-2 top-2 rounded-full bg-black/30 p-2 backdrop-blur-md"
          >
            <Ionicons 
              name={isFav ? "heart" : "heart-outline"} 
              size={20} 
              color={isFav ? "#ef4444" : "white"} 
            />
          </TouchableOpacity>

          <View className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-2 py-1 backdrop-blur-md border border-white/10">
            <View className="flex-row items-center">
              <Ionicons name="star" size={10} color="#f59e0b" />
              <Text className="ml-1 text-xs font-bold text-white font-sans">
                {item.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
        <View className="p-3">
          <Text numberOfLines={1} className="text-base font-bold text-text font-sans">
            {title}
          </Text>
          <View className="mt-1 flex-row items-center justify-between">
            <Text className="text-xs text-text-muted font-sans">{year}</Text>
            <View className="rounded bg-primary/10 px-1.5 py-0.5">
              <Text className="text-[10px] font-bold text-primary uppercase font-sans">{item.media_type}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
