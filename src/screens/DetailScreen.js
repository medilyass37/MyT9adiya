import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, LayoutAnimation } from 'react-native';
import Checkbox from 'expo-checkbox';
import { getDB } from '../database/db';
import { Ionicons } from '@expo/vector-icons';

export default function DetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [isBought, setIsBought] = useState(product.isBought === 1);
  const db = getDB();

  const handleToggle = (newValue) => {
    const status = newValue ? 1 : 0;
    try {
      db.runSync('UPDATE products SET isBought = ? WHERE id = ?', [status, product.id]);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsBought(newValue);
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Impossible de mettre à jour le statut');
    }
  };

  const handleDelete = () => {
    Alert.alert('Supprimer', `Voulez-vous vraiment supprimer "${product.name}" ?`, [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          try {
            db.runSync('DELETE FROM products WHERE id = ?', [product.id]);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            navigation.goBack();
          } catch (error) {
            console.error(error);
            Alert.alert('Erreur', 'Impossible de supprimer le produit');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Ionicons 
            name={isBought ? "bag-check" : "bag-handle"} 
            size={40} 
            color={isBought ? "#10b981" : "#e2e8f0"} 
          />
          <View style={styles.titleContainer}>
             <Text style={styles.title}>{product.name}</Text>
             <Text style={styles.quantityText}>Quantité : {product.quantity}</Text>
             <Text style={styles.quantityText}>Categorie : {product.categorie}</Text>
          </View>
        </View>
        
        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.checkboxCard} 
          onPress={() => handleToggle(!isBought)}
          activeOpacity={0.7}
        >
          <View style={styles.checkboxInfo}>
             <Ionicons name="checkmark-done-circle-outline" size={24} color={isBought ? '#10b981' : '#64748b'} style={{marginRight: 10}}/>
             <Text style={[styles.checkboxLabel, isBought ? styles.labelBought : null]}>
                {isBought ? 'Produit Acheté !' : 'Marquer comme acheté'}
             </Text>
          </View>
          <Checkbox
            style={styles.checkbox}
            value={isBought}
            onValueChange={handleToggle}
            color={isBought ? '#10b981' : '#334155'}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.8}>
        <Ionicons name="trash-outline" size={22} color="#FFF" style={{marginRight: 8}}/>
        <Text style={styles.deleteButtonText}>Supprimer le produit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f172a',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#f8fafc',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  quantityText: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 24,
  },
  checkboxCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  checkboxInfo: {
     flexDirection: 'row',
     alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  labelBought: {
    color: '#10b981',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#ef4444',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#ef4444',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
