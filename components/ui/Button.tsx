import { clsx, type ClassValue } from 'clsx';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  label: string;
  loading?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  label, 
  loading, 
  className, 
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "flex-row items-center justify-center rounded-xl font-medium active:opacity-80";
  
  const variants = {
    primary: "bg-primary shadow-lg shadow-primary/30",
    secondary: "bg-secondary shadow-lg shadow-secondary/30",
    outline: "border-2 border-primary bg-transparent",
    ghost: "bg-transparent",
  };

  const sizes = {
    sm: "px-4 py-2",
    md: "px-6 py-3.5",
    lg: "px-8 py-4",
  };

  const textStyles = {
    primary: "text-primary-foreground font-bold",
    secondary: "text-secondary-foreground font-bold",
    outline: "text-primary font-bold",
    ghost: "text-primary font-bold",
  };

  return (
    <TouchableOpacity
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#6366f1' : '#ffffff'} />
      ) : (
        <Text className={cn("text-center text-base", textStyles[variant])}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
