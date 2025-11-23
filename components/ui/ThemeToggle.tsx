import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity 
      onPress={toggleTheme}
      className="h-10 w-10 items-center justify-center rounded-full bg-surface shadow-sm active:opacity-80 border border-gray-100 dark:border-gray-800"
    >
      <Ionicons 
        name={theme === 'dark' ? 'moon' : 'sunny'} 
        size={20} 
        color={theme === 'dark' ? '#6366f1' : '#f59e0b'} 
      />
    </TouchableOpacity>
  );
}
