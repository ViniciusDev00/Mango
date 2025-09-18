// src/screens/TelaFavoritos.js
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FavoritesContext } from "../src/contexts/FavoritesContext"; // <-- Caminho corrigido

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
  const { favorites } = useContext(FavoritesContext);

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
        data={favorites}
        keyExtractor={(item) => `${item.type}-${item.id}`} // Chave única
        numColumns={3}
        style={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.posterContainer}
            onPress={() => {
              if (item.type === "movie") {
                navigation.navigate("DetalhesFilme", { filmeId: item.id });
              } else if (item.type === "tv") {
                navigation.navigate("DetalhesSerie", { serieId: item.id });
              }
            }}
          >
            <Image source={{ uri: item.image }} style={styles.posterImage} />
            <Text style={styles.posterTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={EmptyListMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  logo: {
    width: 35,
    height: 35,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 10,
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
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  posterTitle: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: "gray",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  emptySubText: {
    color: "gray",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});