import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!name) {
      newErrors.name = 'Full name is required';
      isValid = false;
    }

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
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = () => {
    if (!validate()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Success
      Toast.show({
        type: 'success',
        text1: 'Account created!',
        text2: 'Welcome to StreamBox.',
      });

      // Redirect to Home
      router.replace('/(tabs)/home');
    }, 1500);
  };

  return (
    <View className="space-y-6">
      <View className="space-y-2">
        <Text className="text-3xl font-bold text-text">Create Account</Text>
        <Text className="text-text-muted">Sign up to get started with StreamBox</Text>
      </View>

      <View className="space-y-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          error={errors.name}
        />
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
        label="Create Account" 
        onPress={handleSignup}
        loading={loading}
      />

      <View className="flex-row justify-center space-x-1">
        <Text className="text-text-muted">By signing up, you agree to our</Text>
        <Text className="font-medium text-primary">Terms</Text>
      </View>
    </View>
  );
}
