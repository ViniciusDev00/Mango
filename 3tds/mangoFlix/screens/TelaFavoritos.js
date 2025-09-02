// src/screens/TelaFavoritos.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions, // Usado para centralizar a mensagem de "lista vazia"
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- SEUS LINKS DE IMAGEM QUE FUNCIONAM ---
const workingImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s',
  'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg',
  'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg',
];

// --- DADOS INICIAIS ---
// Para simular, vamos começar com alguns favoritos.
// No futuro, esta lista virá do armazenamento do app ou de uma API.
const initialFavorites = [
    { id: 'fav1', image: workingImages[0] },
    { id: 'fav2', image: workingImages[1] },
    { id: 'fav3', image: workingImages[2] },
];

// Componente para a mensagem de lista vazia
const EmptyListMessage = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="star-outline" size={60} color="gray" />
    <Text style={styles.emptyText}>Sua lista de favoritos está vazia.</Text>
    <Text style={styles.emptySubText}>
      Adicione filmes e séries à sua lista para vê-los aqui.
    </Text>
  </View>
);

export default function TelaFavoritos() {
  // Estado para guardar a lista de favoritos
  const [favoritos, setFavoritos] = useState(initialFavorites);
  
  // DICA: Para testar a tela vazia, troque a linha acima por esta:
  // const [favoritos, setFavoritos] = useState([]);

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

      <Text style={styles.pageTitle}>Favoritos</Text>

      {/* GRADE DE FAVORITOS */}
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.posterContainer}>
            <Image source={{ uri: item.image }} style={styles.posterImage} />
          </TouchableOpacity>
        )}
        // Componente que aparece se a lista 'favoritos' estiver vazia
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
      fontSize: 24,
      fontWeight: 'bold',
      paddingHorizontal: 16,
      marginTop: 10,
      marginBottom: 15,
    },
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
    // Estilos para a mensagem de "lista vazia"
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Dimensions.get('window').height / 5, // Empurra para o meio da tela
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