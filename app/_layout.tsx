```javascript
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from "expo-router";
import { StyleSheet } from 'react-native-css-interop';
import Toast from 'react-native-toast-message';
import '../global.css';

// Configure NativeWind to use class-based dark mode
StyleSheet.setFlag('darkMode', 'class');

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
