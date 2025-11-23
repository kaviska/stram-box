import { clsx, type ClassValue } from 'clsx';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export function Input({ 
  label, 
  error, 
  containerClassName, 
  className, 
  ...props 
}: InputProps) {
  return (
    <View className={cn("w-full space-y-2", containerClassName)}>
      {label && (
        <Text className="text-sm font-medium text-text-muted">
          {label}
        </Text>
      )}
      <TextInput
        className={cn(
          "w-full rounded-xl border border-gray-200 bg-surface px-4 py-3 text-text placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && (
        <Text className="text-xs text-red-500">
          {error}
        </Text>
      )}
    </View>
  );
}
