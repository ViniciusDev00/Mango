// src/screens/TelaSeries.js

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- SEUS LINKS DE IMAGEM QUE FUNCIONAM ---
const workingImages = [
    'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s',
    'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg',
];

// --- DADOS COM IMAGENS CORRIGIDAS ---
const seriesData = [
  { id: 's1', image: workingImages[0], title: 'Breaking Bad' },
  { id: 's2', image: workingImages[1], title: 'Game of Thrones' },
  { id: 's3', image: workingImages[2], title: 'Stranger Things' },
  { id: 's4', image: workingImages[0], title: 'The Office' },
  { id: 's5', image: workingImages[1], title: 'The Witcher' },
  { id: 's6', image: workingImages[2], title: 'Black Mirror' },
  { id: 's7', image: workingImages[0], title: 'Peaky Blinders' },
  { id: 's8', image: workingImages[1], title: 'Friends' },
  { id: 's9', image: workingImages[2], title: 'La Casa de Papel' },
];

const PosterItem = ({ item }) => (
    <TouchableOpacity style={styles.posterContainer}>
        <Image source={{ uri: item.image }} style={styles.posterImage} />
        <Text style={styles.posterTitle}>{item.title}</Text>
    </TouchableOpacity>
);

export default function TelaSeries() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
          <Text style={styles.headerTitle}>Séries</Text>
          <View style={styles.headerRight}>
              <Ionicons name="search-outline" size={26} color="white" style={{ marginRight: 20 }} />
              <Ionicons name="person-circle-outline" size={28} color="white" />
              <Ionicons name="chevron-down-outline" size={16} color="white" style={{ marginLeft: 5 }}/>
          </View>
      </View>
      <FlatList data={seriesData} keyExtractor={(item) => item.id} numColumns={3} style={styles.gridContainer} renderItem={PosterItem} />
    </SafeAreaView>
  );
}

// Estilos (sem alteração)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'black' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 10, paddingBottom: 20 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  gridContainer: { flex: 1, paddingHorizontal: 12 },
  posterContainer: { flex: 1, margin: 12, alignItems: 'center' },
  posterImage: { width: '100%', aspectRatio: 2 / 3, borderRadius: 16, marginBottom: 8 },
  posterTitle: { color: 'white', fontSize: 16, textAlign: 'center' },
});
