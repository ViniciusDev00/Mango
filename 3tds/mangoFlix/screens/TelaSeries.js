// src/screens/TelaSeries.js

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
const workingImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s',
  'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg',
  'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg',
];

// --- DADOS MOCK (Lista de séries organizadas por categoria) ---
const allSeries = [
  // Drama
  { id: 'd1', image: workingImages[0], category: 'Drama' }, // Breaking Bad
  { id: 'd2', image: workingImages[1], category: 'Drama' }, // The Crown
  { id: 'd3', image: workingImages[2], category: 'Drama' }, // Chernobyl
  { id: 'd4', image: workingImages[0], category: 'Drama' }, // Succession
  { id: 'd5', image: workingImages[1], category: 'Drama' }, // House of Cards
  // Fantasia
  { id: 'f1', image: workingImages[2], category: 'Fantasia' }, // Game of Thrones
  { id: 'f2', image: workingImages[0], category: 'Fantasia' }, // The Witcher
  { id: 'f3', image: workingImages[1], category: 'Fantasia' }, // Stranger Things
  { id: 'f4', image: workingImages[2], category: 'Fantasia' }, // The Mandalorian
  { id: 'f5', image: workingImages[0], category: 'Fantasia' }, // Loki
  // Comédia
  { id: 'c1', image: workingImages[1], category: 'Comédia' }, // The Office
  { id: 'c2', image: workingImages[2], category: 'Comédia' }, // Friends
  { id: 'c3', image: workingImages[0], category: 'Comédia' }, // Ted Lasso
  { id: 'c4', image: workingImages[1], category: 'Comédia' }, // Brooklyn Nine-Nine
  { id: 'c5', image: workingImages[2], category: 'Comédia' }, // Fleabag
  // Crime
  { id: 'cr1', image: workingImages[0], category: 'Crime' }, // Peaky Blinders
  { id: 'cr2', image: workingImages[1], category: 'Crime' }, // La Casa de Papel
  { id: 'cr3', image: workingImages[2], category: 'Crime' }, // Mindhunter
  { id: 'cr4', image: workingImages[0], category: 'Crime' }, // Ozark
  { id: 'cr5', image: workingImages[1], category: 'Crime' }, // Narcos
];

const categories = ['Todos', 'Drama', 'Fantasia', 'Comédia', 'Crime'];

export default function TelaSeries() {
  // Estado para guardar a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Lógica de filtragem
  const filteredSeries = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return allSeries;
    }
    return allSeries.filter(serie => serie.category === selectedCategory);
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

      <Text style={styles.pageTitle}>Séries</Text>

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

      {/* GRADE DE SÉRIES FILTRADA */}
      <FlatList
        data={filteredSeries}
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