import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions, // Import Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Por enquanto, a lista de favoritos está vazia
const favoritosData = [];

// Componente para a mensagem de lista vazia
const EmptyListMessage = () => (
  <View style={styles.emptyContainer}>
    <Feather name="star" size={60} color="gray" />
    <Text style={styles.emptyText}>Nenhum favorito adicionado.</Text>
    <Text style={styles.emptySubText}>
      Clique na estrela de um filme ou série para adicioná-lo aqui.
    </Text>
  </View>
);

export default function TelaFavoritos() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritos</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Feather name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Feather name="user" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

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
        // Mostra a mensagem quando a lista está vazia
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
    marginTop: Dimensions.get('window').height / 5, // Centraliza na tela
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