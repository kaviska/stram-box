import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from "expo-router";
import { vars } from 'nativewind';
import Toast from 'react-native-toast-message';
import '../global.css';

// Configure NativeWind
vars({
  '--theme': 'system',
});

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </ThemeProvider>
  );
}
