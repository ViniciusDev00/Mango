// src/screens/TelaSeries.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image, // Adicionado
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Trocado para Ionicons

// --- DADOS MOCK (com pôsteres de séries) ---
const seriesData = [
  { id: '1', image: 'https://image.tmdb.org/t/p/w500/rweIrveL43AunRyKiSwKcFpPM0w.jpg' }, // Stranger Things
  { id: '2', image: 'https://image.tmdb.org/t/p/w500/iKSwavb0I2efw6d1I4dExd0f9k.jpg' }, // The Witcher
  { id: '3', image: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg' }, // Game of Thrones
  { id: '4', image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' }, // Breaking Bad
  { id: '5', image: 'https://image.tmdb.org/t/p/w500/eU1i6eCXsJ2uaM2QJgqB5E4wGg3.jpg' }, // The Mandalorian
  { id: '6', image: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg' }, // La Casa de Papel
  { id: '7', image: 'https://image.tmdb.org/t/p/w500/8X1trg1a2oE5T22AmlAW5w5A8n5.jpg' }, // The Boys
  { id: '8', image: 'https://image.tmdb.org/t/p/w500/wJm3G8fB86a9iH5t1gK6b2sYanc.jpg' }, // The Last of Us
  { id: '9', image: 'https://image.tmdb.org/t/p/w500/o6bUnTwmstrBeV5MOU2MBOevN73.jpg' }, // Loki
  { id: '10', image: 'https://image.tmdb.org/t/p/w500/uD8B2EW2f62F7u3nJF5jE6N3sY9.jpg' }, // Wandavision
  { id: '11', image: 'https://image.tmdb.org/t/p/w500/5vKmEdK22e2sHwII0W53pWjM4G.jpg' }, // Arcane
  { id: '12', image: 'https://image.tmdb.org/t/p/w500/775dPl4ZAeb2s20042dxtz2oDU.jpg' }, // Peaky Blinders
];

export default function TelaSeries() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* CABEÇALHO (IGUAL AO DA TELA INICIAL) */}
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

      {/* TÍTULO DA PÁGINA */}
      <Text style={styles.pageTitle}>Séries</Text>

      {/* GRADE DE SÉRIES */}
      <FlatList
        data={seriesData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.container}
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
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  container: {
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