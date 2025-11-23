import { MediaItem, TMDB_IMAGE_BASE_URL } from '@/services/tmdb';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;
const SPACER_WIDTH = (width - ITEM_WIDTH) / 2;

interface HeroCarouselProps {
  data: MediaItem[];
}

interface CarouselItemProps {
  item: any;
  index: number;
  scrollX: SharedValue<number>;
}

const CarouselItem = ({ item, index, scrollX }: CarouselItemProps) => {
  const router = useRouter();

  const inputRange = [
    (index - 2) * ITEM_WIDTH,
    (index - 1) * ITEM_WIDTH,
    index * ITEM_WIDTH,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9],
      Extrapolation.CLAMP
    );
    
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  if (!item.id) {
    return <View style={{ width: SPACER_WIDTH }} />;
  }

  return (
    <Animated.View style={[{ width: ITEM_WIDTH }, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push({
          pathname: '/media/[id]',
          params: { id: item.id, type: item.media_type }
        })}
        className="relative h-[400px] w-full overflow-hidden rounded-3xl bg-surface dark:bg-slate-800 shadow-xl"
      >
        <Image
          source={{ uri: `${TMDB_IMAGE_BASE_URL}${item.poster_path}` }}
          className="h-full w-full"
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 }}
        />
        <View className="absolute bottom-0 left-0 right-0 p-6">
          <View className="mb-2 flex-row items-center gap-2">
            <View className="rounded-full bg-primary/80 px-2 py-0.5 backdrop-blur-md">
              <Text className="text-[10px] font-bold text-white uppercase tracking-wider">
                {item.media_type}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="star" size={12} color="#f59e0b" />
              <Text className="ml-1 text-xs font-bold text-yellow-400">
                {item.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
          <Text numberOfLines={2} className="text-2xl font-bold text-white font-sans shadow-sm">
            {item.title || item.name}
          </Text>
          <Text numberOfLines={2} className="mt-1 text-sm text-gray-300 font-sans">
            {item.overview}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const HeroCarousel = ({ data }: HeroCarouselProps) => {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  if (!data || data.length === 0) return null;

  // Add spacers to center the first and last items
  const carouselData = [{ key: 'left-spacer' }, ...data.slice(0, 5), { key: 'right-spacer' }];

  return (
    <View className="mb-8">
      <Text className="px-4 mb-4 text-xl font-bold text-text font-sans">Trending Now</Text>
      <Animated.FlatList
        data={carouselData}
        keyExtractor={(item: any) => item.id ? item.id.toString() : item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ alignItems: 'center' }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <CarouselItem item={item} index={index} scrollX={scrollX} />
        )}
      />
    </View>
  );
};
