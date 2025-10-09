import React, { useState, useEffect, useRef } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";

const genreMap = {
  Todos: null,
  Drama: 18,
  Fantasia: 14,
  Comédia: 35,
  Crime: 80,
  Mistério: 9648,
  Documentário: 99,
};

const categories = Object.keys(genreMap);

export default function TelaSeries() {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchSeries = async (pageNumber, isNewCategory = false) => {
    if (!hasMore && !isNewCategory) return;
    try {
      setLoading(true);
      const genreId = genreMap[selectedCategory];
      let url = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&language=pt-BR&sort_by=popularity.desc&page=${pageNumber}`;

      if (genreId) {
        url += `&with_genres=${genreId}`;
      }

      const response = await axios.get(url);
      const newSeries = response.data.results.filter(serie => !serie.adult);

      if (isNewCategory) {
        setSeries(newSeries);
      } else {
        const uniqueSeries = newSeries.filter(
          (newItem) => !series.some((existingItem) => existingItem.id === newItem.id)
        );
        setSeries((prevSeries) => [...prevSeries, ...uniqueSeries]);
      }
      
      setHasMore(newSeries.length > 0);
    } catch (error) {
      console.error("Erro ao buscar séries:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setSeries([]);
    fetchSeries(1, true);
  }, [selectedCategory]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
      fetchSeries(page + 1);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require("../img/manga-removebg-preview.png")}
          style={styles.logo}
        />
        <View style={styles.headerIcons}>
          {/* ÍCONE DE BUSCA MODIFICADO */}
          <TouchableOpacity onPress={() => navigation.navigate('TelaBusca')}>
            <Ionicons
              name="search-outline"
              size={26}
              color="white"
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Ionicons name="person-circle-outline" size={28} color="white" />
          </TouchableOpacity>
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
        ref={flatListRef}
        data={series}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        style={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.posterContainer}
            onPress={() =>
              navigation.navigate("DetalhesSerie", { serieId: item.id })
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.posterImage}
            />
            <Text style={styles.posterTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => loading && hasMore && <ActivityIndicator size="large" color="#F5A623" style={{ marginVertical: 20 }} />}
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