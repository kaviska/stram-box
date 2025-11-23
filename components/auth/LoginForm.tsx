import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors: { email?: string; password?: string } = {};

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (!validate()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Success
      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
        text2: 'You have successfully logged in.',
      });

      // Redirect to Home
      router.replace('/(tabs)/home');
    }, 1500);
  };

  return (
    <View className="space-y-6">
      <View className="space-y-2">
        <Text className="text-3xl font-bold text-text">Welcome Back</Text>
        <Text className="text-text-muted">Enter your credentials to access your account</Text>
      </View>

      <View className="space-y-4">
        <Input
          label="Email Address"
          placeholder="hello@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          error={errors.email}
        />
        <Input
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          error={errors.password}
        />
      </View>

      <Button 
        label="Sign In" 
        onPress={handleLogin} 
        loading={loading}
      />

      <View className="flex-row justify-center space-x-1">
        <Text className="text-text-muted">Forgot your password?</Text>
        <Text className="font-medium text-primary">Reset it</Text>
      </View>
    </View>
  );
}
