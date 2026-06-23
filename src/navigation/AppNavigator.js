import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FormScreen from '../screens/FormScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0f172a',
        },
        headerTintColor: '#f8fafc',
        headerTitleStyle: {
          fontWeight: '900',
          fontSize: 22,
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: 'myT9adiya' }} 
      />
      <Stack.Screen 
        name="FormScreen" 
        component={FormScreen} 
        options={{ title: 'Nouveau Produit' }} 
      />
      <Stack.Screen 
        name="DetailScreen" 
        component={DetailScreen} 
        options={{ title: 'Détails' }} 
      />
    </Stack.Navigator>
  );
}
