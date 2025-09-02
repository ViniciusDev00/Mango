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
import { useNavigation } from '@react-navigation/native';

// --- ATUALIZADO: Usando IDs de filmes reais do TMDb para que a navegação funcione ---
const allMovies = [
  // Ação
  { id: 299534, image: 'https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg', category: 'Ação' }, 
  { id: 496243, image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', category: 'Ação' }, 
  { id: 1011985, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', category: 'Ação' }, 
  { id: 507086, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', category: 'Ação' }, 
  { id: 550, image: 'https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg', category: 'Ação' }, 
  { id: 24428, image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', category: 'Ação' }, 
  // Ficção
  { id: 634649, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', category: 'Ficção' }, 
  { id: 872585, image: 'https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg', category: 'Ficção' }, 
  { id: 157336, image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', category: 'Ficção' }, 
  { id: 1726, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', category: 'Ficção' }, 
  { id: 76600, image: 'https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg', category: 'Ficção' }, 
  { id: 19995, image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', category: 'Ficção' }, 
  // Animação
  { id: 1011985, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', category: 'Animação' }, 
  { id: 315162, image: 'https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg', category: 'Animação' }, 
  { id: 496243, image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', category: 'Animação' }, 
  { id: 359410, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', category: 'Animação' }, 
  { id: 508947, image: 'https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg', category: 'Animação' }, 
  { id: 512200, image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', category: 'Animação' }, 
  // Terror
  { id: 585244, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', category: 'Terror' }, 
  { id: 346364, image: 'https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg', category: 'Terror' }, 
  { id: 580489, image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', category: 'Terror' }, 
  { id: 5752, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', category: 'Terror' }, 
  // Fantasia
  { id: 438631, image: 'https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg', category: 'Fantasia' }, 
  { id: 122906, image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', category: 'Fantasia' }, 
];

const categories = ['Todos', 'Ação', 'Ficção', 'Animação', 'Terror', 'Fantasia'];

export default function TelaFilmes() {
  const navigation = useNavigation(); // Hook de navegação
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredMovies = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return allMovies;
    }
    return allMovies.filter(movie => movie.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea}>
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

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        style={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.posterContainer}
            // Chamando a navegação para a nova tela, passando o ID do filme
            onPress={() => navigation.navigate('DetalhesFilme', { filmeId: item.id })}
          >
            <Image source={{ uri: item.image }} style={styles.posterImage} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

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