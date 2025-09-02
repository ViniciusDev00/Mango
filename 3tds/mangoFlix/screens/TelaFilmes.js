// src/screens/TelaFilmes.js

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- SEUS LINKS DE IMAGEM QUE FUNCIONAM ---
// Vou repetir estes links em toda a lista de filmes.
const workingImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s',
  'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg',
  'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg',
];

// --- DADOS MOCK (com a mesma estrutura de antes, mas usando seus links) ---
const allMovies = [
  // Ação
  { id: 'a1', image: workingImages[0], category: 'Ação' },
  { id: 'a2', image: workingImages[1], category: 'Ação' },
  { id: 'a3', image: workingImages[2], category: 'Ação' },
  { id: 'a4', image: workingImages[0], category: 'Ação' },
  { id: 'a5', image: workingImages[1], category: 'Ação' },
  { id: 'a6', image: workingImages[2], category: 'Ação' },
  // Ficção
  { id: 's1', image: workingImages[0], category: 'Ficção' },
  { id: 's2', image: workingImages[1], category: 'Ficção' },
  { id: 's3', image: workingImages[2], category: 'Ficção' },
  { id: 's4', image: workingImages[0], category: 'Ficção' },
  { id: 's5', image: workingImages[1], category: 'Ficção' },
  { id: 's6', image: workingImages[2], category: 'Ficção' },
  // Animação
  { id: 'n1', image: workingImages[0], category: 'Animação' },
  { id: 'n2', image: workingImages[1], category: 'Animação' },
  { id: 'n3', image: workingImages[2], category: 'Animação' },
  { id: 'n4', image: workingImages[0], category: 'Animação' },
  { id: 'n5', image: workingImages[1], category: 'Animação' },
  { id: 'n6', image: workingImages[2], category: 'Animação' },
  // Terror
  { id: 't1', image: workingImages[0], category: 'Terror' },
  { id: 't2', image: workingImages[1], category: 'Terror' },
  { id: 't3', image: workingImages[2], category: 'Terror' },
  { id: 't4', image: workingImages[0], category: 'Terror' },
  // Fantasia
  { id: 'f1', image: workingImages[0], category: 'Fantasia' },
  { id: 'f2', image: workingImages[1], category: 'Fantasia' },
];

const categories = ['Todos', 'Ação', 'Ficção', 'Animação', 'Terror', 'Fantasia'];

export default function TelaFilmes() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredMovies = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return allMovies;
    }
    return allMovies.filter(movie => movie.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Image
          source={require('../img/manga-removebg-preview.png')}
          style={styles.logo}
        />
        <View style={styles.headerIcons}>
          <Ionicons name="search-outline" size={26} color="white" style={{ marginRight: 15 }} />
          <Ionicons name="person-circle-outline" size={28} color="white" />
        </View>
      </View>

      <Text style={styles.pageTitle}>Filmes</Text>

      {/* FILTRO DE CATEGORIAS HORIZONTAL */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
            >
              <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* GRADE DE FILMES FILTRADA */}
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.posterContainer}>
            <Image source={{ uri: item.image }} style={styles.posterImage} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#121212',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 10,
    },
    logo: {
      width: 35,
      height: 35,
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    pageTitle: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      paddingHorizontal: 16,
      marginTop: 10,
    },
    filterContainer: {
      paddingHorizontal: 16,
      paddingVertical: 15,
    },
    categoryButton: {
      marginRight: 12,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: '#252525',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    categoryButtonActive: {
      backgroundColor: '#F5A623',
      borderColor: '#F5A623',
    },
    categoryButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    categoryButtonTextActive: {
      color: '#121212',
    },
    gridContainer: {
      flex: 1,
      paddingHorizontal: 5,
    },
    posterContainer: {
      flex: 1,
      margin: 5,
      aspectRatio: 2 / 3,
    },
    posterImage: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
  });