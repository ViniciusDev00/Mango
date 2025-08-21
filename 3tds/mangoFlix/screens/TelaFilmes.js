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
import { Feather } from '@expo/vector-icons';

// --- DADOS MOCK (simulando uma API) ---
const filmesData = [
  { id: '1', image: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAXwnNsSf.jpg' }, // Vingadores
  { id: '2', image: 'https://image.tmdb.org/t/p/w500/unbrtK8z3iBI2lJ22a2gC6I95S2.jpg' }, // O Protetor
  { id: '3', image: 'https://image.tmdb.org/t/p/w500/uYgCaDAf23eEV2c52A7m66a4s06.jpg' }, // O Rei Leão
  { id: '4', image: 'https://image.tmdb.org/t/p/w500/fEOuLC3Ld1P1bXzLp04aNso2m4.jpg' }, // Harry Potter
  { id: '5', image: 'https://image.tmdb.org/t/p/w500/vGIIy2iH2QkY22F4L1vke4b1vIp.jpg' }, // Capitão América
  { id: '6', image: 'https://image.tmdb.org/t/p/w500/hB8ypG224ZdGbdA2p2fOaXkEpyN.jpg' }, // One Piece Film: Red
  { id: '7', image: 'https://image.tmdb.org/t/p/w500/fEOuLC3Ld1P1bXzLp04aNso2m4.jpg' },
  { id: '8', image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
  { id: '9', image: 'https://image.tmdb.org/t/p/w500/hB8ypG224ZdGbdA2p2fOaXkEpyN.jpg' },
  { id: '10', image: 'https://image.tmdb.org/t/p/w500/fEOuLC3Ld1P1bXzLp04aNso2m4.jpg' },
  { id: '11', image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
  { id: '12', image: 'https://image.tmdb.org/t/p/w500/hB8ypG224ZdGbdA2p2fOaXkEpyN.jpg' },
];

export default function TelaFilmes() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filmes</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Feather name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Feather name="user" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

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
    backgroundColor: '#121212', // Cor de fundo principal
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20, // Mais espaço abaixo do título
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    paddingHorizontal: 5, // Pequeno espaço nas laterais da grade
  },
  posterContainer: {
    flex: 1,
    margin: 5, // Espaço entre os pôsteres
    aspectRatio: 2 / 3, // Proporção padrão de pôsteres (largura/altura)
  },
  posterImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});