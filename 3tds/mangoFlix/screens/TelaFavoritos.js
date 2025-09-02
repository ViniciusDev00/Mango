// src/screens/TelaFavoritos.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// --- ATUALIZADO: Usando IDs reais e um tipo (movie/tv) para a navegação
const initialFavorites = [
  {
    id: 299534,
    type: "movie",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s",
  },
  {
    id: 1399,
    type: "tv",
    image:
      "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg",
  },
  {
    id: 496243,
    type: "movie",
    image: "https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg",
  },
];

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
  const navigation = useNavigation();
  const [favoritos, setFavoritos] = useState(initialFavorites);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require("../img/manga-removebg-preview.png")}
          style={styles.logo}
        />
        <View style={styles.headerIcons}>
          <Ionicons
            name="search-outline"
            size={26}
            color="white"
            style={{ marginRight: 15 }}
          />
          <Ionicons name="person-circle-outline" size={28} color="white" />
        </View>
      </View>

      <Text style={styles.pageTitle}>Favoritos</Text>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        style={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.posterContainer}
            onPress={() => {
              // Navega para a tela de detalhes apropriada (filme ou série)
              if (item.type === "movie") {
                navigation.navigate("DetalhesFilme", { filmeId: item.id });
              } else if (item.type === "tv") {
                navigation.navigate("DetalhesSerie", { serieId: item.id });
              }
            }}
          >
            <Image source={{ uri: item.image }} style={styles.posterImage} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={EmptyListMessage}
      />
    </SafeAreaView>
  );
}

// Os estilos permanecem os mesmos
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  logo: { width: 35, height: 35 },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  pageTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 15,
  },
  gridContainer: { flex: 1, paddingHorizontal: 5 },
  posterContainer: { flex: 1, margin: 5, aspectRatio: 2 / 3 },
  posterImage: { width: "100%", height: "100%", borderRadius: 10 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 5,
  },
  emptyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  emptySubText: {
    color: "gray",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 40,
  },
});
