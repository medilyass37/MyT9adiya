import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, LayoutAnimation } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ProductItem from '../components/ProductItem';
import { getDB } from '../database/db';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const db = getDB();

  const loadProducts = useCallback(() => {
    try {
      const allRows = db.getAllSync('SELECT * FROM products');
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setProducts(allRows);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [loadProducts])
  );

  const handleToggle = (product) => {
    const newStatus = product.isBought === 1 ? 0 : 1;
    try {
      db.runSync('UPDATE products SET isBought = ? WHERE id = ?', [newStatus, product.id]);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = (product) => {
    navigation.navigate('DetailScreen', { product });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="cart" size={28} color="#10b981" style={{ marginRight: 8 }} />
          <Text style={{ color: '#f8fafc', fontSize: 24, fontWeight: '900', letterSpacing: 0.5 }}>myT9adiya</Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="basket-outline" size={80} color="#334155" />
          <Text style={styles.emptyText}>Votre chariot est vide</Text>
          <Text style={styles.emptySubText}>Ajoutez vos premières courses !</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
             <ProductItem
               product={item}
               onToggle={handleToggle}
               onPress={() => handlePress(item)}
               index={index}
             />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
      
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('FormScreen')}
      >
        <Ionicons name="add" size={32} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 22,
    color: '#f8fafc',
    fontWeight: 'bold',
  },
  emptySubText: {
    marginTop: 8,
    fontSize: 16,
    color: '#94a3b8',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#10b981',
    width: 65,
    height: 65,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#10b981',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});
