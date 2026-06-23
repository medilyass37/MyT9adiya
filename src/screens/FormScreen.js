import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, LayoutAnimation } from 'react-native';
import { getDB } from '../database/db';
import { Ionicons } from '@expo/vector-icons';

export default function FormScreen({ navigation }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
    const [categorie, setCategorie] = useState('');
  const db = getDB();

  const handleSave = () => {
    if (!name.trim() || !quantity.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      Alert.alert('Erreur', 'Veuillez entrer une quantité valide supérieure à 0');
      return;
    }

    try {
      db.runSync('INSERT INTO products (name, quantity, isBought, categorie) VALUES (?, ?, ?, ?)', [name.trim(), qty, 0, categorie.trim()]);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Échec lors de la sauvegarde du produit');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nom du produit</Text>
          <View style={styles.inputWrapper}>
             <Ionicons name="pricetag-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
             <TextInput
               style={styles.input}
               value={name}
               onChangeText={setName}
               placeholder="Ex: Eau minérale, Tomates..."
               placeholderTextColor="#475569"
               autoFocus
             />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantité</Text>
          <View style={styles.inputWrapper}>
             <Ionicons name="layers-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
             <TextInput
               style={styles.input}
               value={quantity}
               onChangeText={setQuantity}
               placeholder="Ex: 3"
               placeholderTextColor="#475569"
               keyboardType="numeric"
             />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categorie</Text>
          <View style={styles.inputWrapper}>
             <Ionicons name="pricetag-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
             <TextInput
               style={styles.input}
               value={categorie}
               onChangeText={setCategorie}
               placeholder="Ex: categorie..."
               placeholderTextColor="#475569"
               autoFocus
             />
          </View>
      </View>
      </View>
      

      <TouchableOpacity style={styles.button} onPress={handleSave} activeOpacity={0.8}>
        <Ionicons name="save-outline" size={24} color="#FFF" style={{marginRight: 8}}/>
        <Text style={styles.buttonText}>Enregistrer le produit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    justifyContent: 'space-between',
  },
  formContainer: {
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#e2e8f0',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#f8fafc',
    paddingVertical: 16,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#10b981',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#10b981',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
