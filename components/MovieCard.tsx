import { useFavorites } from '@/context/FavoritesContext';
import { MediaItem, TMDB_IMAGE_BASE_URL } from '@/services/tmdb';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

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

  const toggleFavorite = async () => {
    if (isFav) {
      await removeFavorite(item.id);
    } else {
      await addFavorite(item);
    }
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      className="mb-4 w-[48%] overflow-hidden rounded-xl bg-surface shadow-sm dark:bg-slate-800"
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
          className="absolute right-2 top-2 rounded-full bg-black/30 p-2 backdrop-blur-sm"
        >
          <Ionicons 
            name={isFav ? "heart" : "heart-outline"} 
            size={20} 
            color={isFav ? "#ef4444" : "white"} 
          />
        </TouchableOpacity>

        <View className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-1">
          <Text className="text-xs font-bold text-white">
            {item.vote_average.toFixed(1)}
          </Text>
        </View>
      </View>
      <View className="p-3">
        <Text numberOfLines={1} className="text-base font-bold text-text">
          {title}
        </Text>
        <View className="mt-1 flex-row items-center justify-between">
          <Text className="text-xs text-text-muted">{year}</Text>
          <Text className="text-xs font-medium text-primary uppercase">{item.media_type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
