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

// --- DADOS MOCK (Lista única com todos os filmes e suas categorias) ---
const allMovies = [
  // Ação
  { id: 'a1', image: 'https://image.tmdb.org/t/p/w500/iGZX91hIqM9Uu0v3DOIhMxgRCl9.jpg', category: 'Ação' },
  { id: 'a2', image: 'https://image.tmdb.org/t/p/w500/unbrtK8z3iBI2lJ22a2gC6I95S2.jpg', category: 'Ação' },
  { id: 'a3', image: 'https://image.tmdb.org/t/p/w500/y2Aimt8isimtigec3e4kB2GkUy.jpg', category: 'Ação' },
  { id: 'a4', image: 'https://image.tmdb.org/t/p/w500/vGIIy2iH2QkY22F4L1vke4b1vIp.jpg', category: 'Ação' },
  { id: 'a5', image: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAXwnNsSf.jpg', category: 'Ação' },
  { id: 'a6', image: 'https://image.tmdb.org/t/p/w500/otjBq23s9HvoO7rsPIYA7s47dF9.jpg', category: 'Ação' },
  // Ficção
  { id: 's1', image: 'https://image.tmdb.org/t/p/w500/nCbkIeInCF4kP4i2m22d712e1gA.jpg', category: 'Ficção' },
  { id: 's2', image: 'https://image.tmdb.org/t/p/w500/sN6wZWCiVpbiD3s0WcTslIqBSsI.jpg', category: 'Ficção' },
  { id: 's3', image: 'https://image.tmdb.org/t/p/w500/A2YlI1iYhGg2gJgS4i2J1aYkoB8.jpg', category: 'Ficção' },
  { id: 's4', image: 'https://image.tmdb.org/t/p/w500/63N6c3v5i94xKe0tSp1wT5gQe3L.jpg', category: 'Ficção' },
  { id: 's5', image: 'https://image.tmdb.org/t/p/w500/l4aWYyIo7pSfkf0yv03gukbB8aP.jpg', category: 'Ficção' },
  { id: 's6', image: 'https://image.tmdb.org/t/p/w500/bIlYH4l2AyYvEOTa13AOF7aK3iL.jpg', category: 'Ficção' },
  // Animação
  { id: 'n1', image: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', category: 'Animação' },
  { id: 'n2', image: 'https://image.tmdb.org/t/p/w500/kk99aBllVzIXK5dCF39vL23T2w0.jpg', category: 'Animação' },
  { id: 'n3', image: 'https://image.tmdb.org/t/p/w500/hB8ypG224ZdGbdA2p2fOaXkEpyN.jpg', category: 'Animação' },
  { id: 'n4', image: 'https://image.tmdb.org/t/p/w500/uYgCaDAf23eEV2c52A7m66a4s06.jpg', category: 'Animação' },
  { id: 'n5', image: 'https://image.tmdb.org/t/p/w500/AhGAhTe8OAhwVflT2f0aDP3L9wL.jpg', category: 'Animação' },
  { id: 'n6', image: 'https://image.tmdb.org/t/p/w500/pxOKB6PqOMg9i4a9h6e1T6IhqJG.jpg', category: 'Animação' },
  // Terror
  { id: 't1', image: 'https://image.tmdb.org/t/p/w500/d4o4a77HBAys4nZdD0xxXEp2Qf.jpg', category: 'Terror' },
  { id: 't2', image: 'https://image.tmdb.org/t/p/w500/52SnsZtYbVeAq4CbN05wXo53a5p.jpg', category: 'Terror' },
  { id: 't3', image: 'https://image.tmdb.org/t/p/w500/pAok3U221tuOKb2nIq2JZHvJ39o.jpg', category: 'Terror' },
  { id: 't4', image: 'https://image.tmdb.org/t/p/w500/r05mDVoaI3kY0Stm7wcfYtnA4u.jpg', category: 'Terror' },
  // Fantasia
  { id: 'f1', image: 'https://image.tmdb.org/t/p/w500/fEOuLC3Ld1P1bXzLp04aNso2m4.jpg', category: 'Fantasia' }, // Harry Potter
  { id: 'f2', image: 'https://image.tmdb.org/t/p/w500/uexxR7KwFqyzIaKaGcfq1V5IVh.jpg', category: 'Fantasia' }, // Senhor dos Anéis
];

const categories = ['Todos', 'Ação', 'Ficção', 'Animação', 'Terror', 'Fantasia'];

export default function TelaFilmes() {
  // 1. ESTADO para guardar a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // 2. LÓGICA DE FILTRAGEM: filtra a lista de filmes com base na categoria selecionada
  // useMemo otimiza a performance, evitando que o filtro seja refeito a cada renderização
  const filteredMovies = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return allMovies;
    }
    return allMovies.filter(movie => movie.category === selectedCategory);
  }, [selectedCategory]); // A lista só é recalculada quando 'selectedCategory' muda

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

      {/* 3. FILTRO DE CATEGORIAS HORIZONTAL */}
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

      {/* 4. GRADE DE FILMES FILTRADA */}
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
  // Estilos para o filtro de categorias
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
    backgroundColor: '#F5A623', // Cor de destaque para o botão ativo
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
  // Estilos para a grade
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