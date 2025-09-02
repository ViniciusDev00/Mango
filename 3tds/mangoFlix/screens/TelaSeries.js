// src/screens/TelaSeries.js

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// --- ATUALIZADO: Usando IDs de séries reais do TMDb ---
const allSeries = [
  // Drama
  {
    id: 1399,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s",
    category: "Drama",
  }, // Game of Thrones
  {
    id: 456,
    image:
      "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg",
    category: "Drama",
  }, // The Simpsons
  {
    id: 1402,
    image: "https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg",
    category: "Drama",
  }, // The Walking Dead
  {
    id: 62560,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s",
    category: "Drama",
  }, // Mr. Robot
  {
    id: 66732,
    image:
      "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg",
    category: "Drama",
  }, // Stranger Things
  // Fantasia
  {
    id: 60735,
    image: "https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg",
    category: "Fantasia",
  }, // The Flash
  {
    id: 60622,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s",
    category: "Fantasia",
  }, // Rick and Morty
  {
    id: 62286,
    image:
      "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg",
    category: "Fantasia",
  }, // The Crown
  {
    id: 71912,
    image: "https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg",
    category: "Fantasia",
  }, // The Good Doctor
  {
    id: 690,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s",
    category: "Fantasia",
  }, // O Mandaloriano
  // Comédia
  {
    id: 2316,
    image:
      "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg",
    category: "Comédia",
  }, // The Office
  {
    id: 1667,
    image: "https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg",
    category: "Comédia",
  }, // Seinfeld
  {
    id: 1400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s",
    category: "Comédia",
  }, // The Big Bang Theory
  {
    id: 1416,
    image:
      "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg",
    category: "Comédia",
  }, // Friends
  {
    id: 641,
    image: "https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg",
    category: "Comédia",
  }, // South Park
  // Crime
  {
    id: 82856,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s",
    category: "Crime",
  }, // O Mandaloriano
  {
    id: 63174,
    image:
      "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg",
    category: "Crime",
  }, // Lucifer
  {
    id: 1403,
    image: "https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg",
    category: "Crime",
  }, // The Flash
  {
    id: 37854,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s",
    category: "Crime",
  }, // The Walking Dead
  {
    id: 1399,
    image:
      "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg",
    category: "Crime",
  }, // Stranger Things
];

const categories = ["Todos", "Drama", "Fantasia", "Comédia", "Crime"];

export default function TelaSeries() {
  const navigation = useNavigation(); // Adiciona o hook de navegação
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredSeries = useMemo(() => {
    if (selectedCategory === "Todos") {
      return allSeries;
    }
    return allSeries.filter((serie) => serie.category === selectedCategory);
  }, [selectedCategory]);

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

      <Text style={styles.pageTitle}>Séries</Text>

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
        data={filteredSeries}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        style={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.posterContainer}
            // Navega para a nova tela de detalhes de série
            onPress={() =>
              navigation.navigate("DetalhesSerie", { serieId: item.id })
            }
          >
            <Image source={{ uri: item.image }} style={styles.posterImage} />
          </TouchableOpacity>
        )}
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
  },
  filterContainer: { paddingHorizontal: 16, paddingVertical: 15 },
  categoryButton: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#252525",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryButtonActive: { backgroundColor: "#F5A623", borderColor: "#F5A623" },
  categoryButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  categoryButtonTextActive: { color: "#121212" },
  gridContainer: { flex: 1, paddingHorizontal: 5 },
  posterContainer: { flex: 1, margin: 5, aspectRatio: 2 / 3 },
  posterImage: { width: "100%", height: "100%", borderRadius: 10 },
});
