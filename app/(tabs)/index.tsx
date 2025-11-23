import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerClassName="flex-grow justify-center p-6"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-md self-center rounded-3xl bg-surface p-8 shadow-xl shadow-gray-200">
            {/* Header / Logo Area */}
            <View className="mb-8 items-center">
              <View className="h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Text className="text-3xl font-bold text-primary">S</Text>
              </View>
            </View>

            {/* Form Container */}
            {isLogin ? <LoginForm /> : <SignupForm />}

            {/* Toggle Switch */}
            <View className="mt-8 flex-row justify-center space-x-1 border-t border-gray-100 pt-6">
              <Text className="text-text-muted">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </Text>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text className="font-bold text-primary">
                  {isLogin ? "Sign up" : "Sign in"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}