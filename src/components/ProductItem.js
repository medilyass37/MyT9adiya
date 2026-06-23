import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';

export default function ProductItem({ product, onToggle, onPress, index }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.innerContainer}
      >
        <View style={styles.iconContainer}>
            {product.isBought === 1 ? (
                <Ionicons name="checkmark-circle" size={28} color="#10b981" />
            ) : (
                <Ionicons name="ellipse-outline" size={28} color="#334155" />
            )}
        </View>

        <View style={styles.info}>
          <Text style={[styles.name, product.isBought ? styles.boughtText : null]}>
            {product.name}
          </Text>
          <Text style={styles.quantity}>Quantité : {product.quantity}</Text>
          <Text style={styles.quantity}>Categorie : {product.categorie}</Text>
        </View>

        <Pressable 
          hitSlop={15} 
          onPress={() => onToggle(product)} 
          style={styles.checkboxWrapper}
        >
          <Checkbox
            style={styles.checkbox}
            value={product.isBought === 1}
            onValueChange={() => onToggle(product)}
            color={product.isBought === 1 ? '#10b981' : '#334155'}
          />
        </Pressable>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  innerContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
     marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    letterSpacing: 0.3,
  },
  boughtText: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  quantity: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 6,
    fontWeight: '500',
  },
  checkboxWrapper: {
    padding: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
  }
});
