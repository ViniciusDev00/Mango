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
import { Ionicons } from '@expo/vector-icons'; // Trocado para Ionicons

// --- DADOS MOCK (simulando uma API) ---
const filmesData = [
  { id: '1', image: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAXwnNsSf.jpg' },
  { id: '2', image: 'https://image.tmdb.org/t/p/w500/unbrtK8z3iBI2lJ22a2gC6I95S2.jpg' },
  { id: '3', image: 'https://image.tmdb.org/t/p/w500/uYgCaDAf23eEV2c52A7m66a4s06.jpg' },
  { id: '4', image: 'https://image.tmdb.org/t/p/w500/fEOuLC3Ld1P1bXzLp04aNso2m4.jpg' },
  { id: '5', image: 'https://image.tmdb.org/t/p/w500/vGIIy2iH2QkY22F4L1vke4b1vIp.jpg' },
  { id: '6', image: 'https://image.tmdb.org/t/p/w500/hB8ypG224ZdGbdA2p2fOaXkEpyN.jpg' },
  { id: '7', image: 'https://image.tmdb.org/t/p/w500/fEOuLC3Ld1P1bXzLp04aNso2m4.jpg' },
  { id: '8', image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
  { id: '9', image: 'https://image.tmdb.org/t/p/w500/hB8ypG224ZdGbdA2p2fOaXkEpyN.jpg' },
];

export default function TelaFilmes() {
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
      <Text style={styles.pageTitle}>Filmes</Text>

      {/* GRADE DE FILMES */}
      <FlatList
        data={filmesData}
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