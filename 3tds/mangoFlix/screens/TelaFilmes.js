// src/screens/TelaFilmes.js

import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";

// Mapeamento dos gêneros da sua tela para os IDs da API do TMDb
const genreMap = {
  Todos: null, // 'null' para não filtrar por gênero
  Ação: 28,
  Ficção: 878,
  Animação: 16,
  Terror: 27,
  Fantasia: 14,
};

const categories = Object.keys(genreMap);

export default function TelaFilmes() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const genreId = genreMap[selectedCategory];
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=pt-BR&sort_by=popularity.desc`;

        if (genreId) {
          url += `&with_genres=${genreId}`;
        }

        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory]); // Atualiza os filmes sempre que a categoria muda

  if (loading) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F5A623" />
      </View>
    );
  }

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

      <Text style={styles.pageTitle}>Filmes</Text>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category &&
                    styles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        style={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.posterContainer}
            onPress={() =>
              navigation.navigate("DetalhesFilme", { filmeId: item.id })
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.posterImage}
            />
            <Text style={styles.posterTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

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
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  categoryButton: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#252525",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryButtonActive: {
    backgroundColor: "#F5A623",
    borderColor: "#F5A623",
  },
  categoryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  categoryButtonTextActive: {
    color: "#121212",
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
});