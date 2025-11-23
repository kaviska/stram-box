import { FavoritesProvider } from '@/context/FavoritesContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Outfit_400Regular, Outfit_500Medium, Outfit_700Bold, useFonts } from '@expo-google-fonts/outfit';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { vars } from 'nativewind';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import '../global.css';

// Configure NativeWind
vars({
  '--theme': 'system',
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="media/[id]" options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
