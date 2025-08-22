// src/screens/TelaSeries.js

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

// --- DADOS MOCK (com séries) ---
const seriesData = [
  { id: 's1', image: 'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg', title: 'Breaking Bad' },
  { id: 's2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', title: 'Game of Thrones' },
  { id: 's3', image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', title: 'Stranger Things' },
  { id: 's4', image: 'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg', title: 'The Office' },
  { id: 's5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', title: 'The Witcher' },
  { id: 's6', image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', title: 'Black Mirror' },
  { id: 's7', image: 'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg', title: 'Peaky Blinders' },
  { id: 's8', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', title: 'Friends' },
  { id: 's9', image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', title: 'La Casa de Papel' },
  { id: 's10', image: 'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg', title: 'The Mandalorian' },
  { id: 's11', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', title: 'Arcane' },
  { id: 's12', image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', title: 'Dark' },
];

// Componente de Pôster com o novo título estilizado
const PosterItem = ({ item }) => (
    <TouchableOpacity style={styles.posterContainer}>
        <Image source={{ uri: item.image }} style={styles.posterImage} />
        <Text style={styles.posterTitle}>{item.title}</Text>
    </TouchableOpacity>
);

export default function TelaSeries() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
          <Text style={styles.headerTitle}>Séries</Text>
          <View style={styles.headerRight}>
              <Ionicons name="search-outline" size={26} color="white" style={{ marginRight: 20 }} />
              <Ionicons name="person-circle-outline" size={28} color="white" />
              <Ionicons name="chevron-down-outline" size={16} color="white" style={{ marginLeft: 5 }}/>
          </View>
      </View>

      {/* GRADE DE SÉRIES */}
      <FlatList
        data={seriesData}
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
    paddingHorizontal: 12,
  },
  posterContainer: {
    flex: 1,
    margin: 12,
    alignItems: 'center',
  },
  posterImage: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 16,
    marginBottom: 8,
  },
  posterTitle: { 
      color: 'white', 
      fontSize: 16,
      // fontFamily: 'SuaFonteSerifada',
      textAlign: 'center' 
  },
});
