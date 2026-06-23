import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { initDBSync } from './src/database/db';
import { Platform, UIManager } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Initialize the database synchronously before the app starts rendering
initDBSync();

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0f172a',
    card: '#0f172a',
    text: '#f8fafc',
    border: '#1e293b',
    primary: '#10b981',
  },
};

export default function App() {
  return (
    <>
      <NavigationContainer theme={DarkTheme}>
        <AppNavigator />
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}
