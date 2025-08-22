// src/screens/TelaFavoritos.js

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- SEUS LINKS DE IMAGEM QUE FUNCIONAM ---
const workingImages = [
    'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s',
    'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg',
];

// --- DADOS COM IMAGENS CORRIGIDAS ---
const favoriteMovies = [
    { id: '1', image: workingImages[1], title: 'Harry Potter' },
    { id: '2', image: workingImages[0], title: 'Breaking Bad' },
    { id: '3', image: workingImages[2], title: 'Anime Mix' },
];
const favoriteSeries = [
    { id: '1', image: workingImages[0], title: 'Breaking Bad' },
    { id: '2', image: workingImages[1], title: 'Harry Potter' },
    { id: '3', image: workingImages[2], title: 'Anime Mix' },
];
const continueWatching = [
    { id: '1', image: workingImages[2], title: 'Anime Mix' },
    { id: '2', image: workingImages[1], title: 'Harry Potter' },
    { id: '3', image: workingImages[0], title: 'Breaking Bad' },
];

const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="white" />
    </View>
);
const PosterItem = ({ item }) => (
    <TouchableOpacity style={styles.posterContainer}>
        <Image source={{ uri: item.image }} style={styles.posterImage} />
        <Text style={styles.posterTitle}>{item.title}</Text>
    </TouchableOpacity>
);

export default function TelaFavoritos() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritos</Text>
        <View style={styles.headerRight}>
          <Ionicons name="search-outline" size={26} color="white" style={{ marginRight: 20 }} />
          <Ionicons name="person-circle-outline" size={28} color="white" />
          <Ionicons name="chevron-down-outline" size={16} color="white" style={{ marginLeft: 5 }} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.section}><SectionHeader title="Filmes" /><FlatList data={favoriteMovies} renderItem={PosterItem} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 24 }} /></View>
        <View style={styles.section}><SectionHeader title="Séries" /><FlatList data={favoriteSeries} renderItem={PosterItem} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 24 }} /></View>
        <View style={styles.section}><SectionHeader title="Continue assistindo" /><FlatList data={continueWatching} renderItem={PosterItem} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 24 }} /></View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos (sem alteração)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'black' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 10, paddingBottom: 20 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  section: { marginBottom: 30, marginTop: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  sectionTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  posterContainer: { marginRight: 16 },
  posterImage: { width: 140, height: 210, borderRadius: 16 },
  posterTitle: { color: 'white', fontSize: 16, marginTop: 8, textAlign: 'center' },
});
