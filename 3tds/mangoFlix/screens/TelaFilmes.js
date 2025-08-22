// src/screens/TelaFilmes.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- DADOS MOCK ---
// Use a lista completa de filmes que tínhamos antes, agora com a propriedade "title"
const moviesData = [
  { id: 'a1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', title: 'Harry Potter' },
  { id: 'a2', image: 'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg', title: 'Action Sunrise' },
  { id: 'a3', image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', title: 'Adventure' },
  { id: 'a4', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', title: 'Harry Potter' },
  { id: 'a5', image: 'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg', title: 'Breaking Bad' },
  { id: 'a6', image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', title: 'Anime Mix' },
  { id: 'a7', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', title: 'Harry Potter' },
  { id: 'a8', image: 'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg', title: 'Breaking Bad' },
  { id: 'a9', image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', title: 'Anime Mix' },
  { id: 'a10', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', title: 'Harry Potter' },
  { id: 'a11', image: 'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg', title: 'Breaking Bad' },
  { id: 'a12', image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', title: 'Anime Mix' },
];

// Componente de Pôster com o novo título estilizado
const PosterItem = ({ item }) => (
    <TouchableOpacity style={styles.posterContainer}>
        <Image source={{ uri: item.image }} style={styles.posterImage} />
        <Text style={styles.posterTitle}>{item.title}</Text>
    </TouchableOpacity>
);

export default function TelaFilmes() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
          <Text style={styles.headerTitle}>Filmes</Text>
          <View style={styles.headerRight}>
              <Ionicons name="search-outline" size={26} color="white" style={{ marginRight: 20 }} />
              <Ionicons name="person-circle-outline" size={28} color="white" />
              <Ionicons name="chevron-down-outline" size={16} color="white" style={{ marginLeft: 5 }}/>
          </View>
      </View>

      {/* GRADE DE FILMES */}
      <FlatList
        data={moviesData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.gridContainer}
        renderItem={PosterItem}
      />
    </SafeAreaView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'black' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 24, 
    paddingTop: 10, 
    paddingBottom: 20 
  },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  gridContainer: {
    flex: 1,
    paddingHorizontal: 12, // Espaçamento lateral da grade
  },
  posterContainer: {
    flex: 1,
    margin: 12, // Espaçamento entre os pôsteres
    alignItems: 'center',
  },
  posterImage: {
    width: '100%',
    aspectRatio: 2 / 3, // Proporção da imagem
    borderRadius: 16,
    marginBottom: 8,
  },
  posterTitle: { 
      color: 'white', 
      fontSize: 16,
      // fontFamily: 'SuaFonteSerifada', // Adicione sua fonte aqui
      textAlign: 'center' 
  },
});
