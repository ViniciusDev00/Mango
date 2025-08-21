// src/screens/TelaFavoritos.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Trocado para Ionicons

// Por enquanto, a lista de favoritos está vazia
const favoritosData = [];

// Componente para a mensagem de lista vazia
const EmptyListMessage = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="star-outline" size={60} color="gray" />
    <Text style={styles.emptyText}>Nenhum favorito adicionado.</Text>
    <Text style={styles.emptySubText}>
      Clique na estrela de um filme ou série para adicioná-lo aqui.
    </Text>
  </View>
);

export default function TelaFavoritos() {
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
      <Text style={styles.pageTitle}>Favoritos</Text>

      {/* GRADE DE FILMES FAVORITOS */}
      <FlatList
        data={favoritosData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.container}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.posterContainer}>
            <Image source={{ uri: item.image }} style={styles.posterImage} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={EmptyListMessage}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height / 5,
  },
  emptyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptySubText: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
});