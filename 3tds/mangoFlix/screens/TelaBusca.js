import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  // SafeAreaView não é mais necessário aqui
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";

export default function TelaBusca() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMoviesAndSeries = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=pt-BR&query=${text}`
        );
        const filteredResults = response.data.results.filter(
          (item) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
        );
        setResults(filteredResults);
      } catch (err) {
        setError("Erro ao buscar resultados.");
        console.error("Erro na busca:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => {
        if (item.media_type === "movie") {
          navigation.navigate("DetalhesFilme", { filmeId: item.id });
        } else if (item.media_type === "tv") {
          navigation.navigate("DetalhesSerie", { serieId: item.id });
        }
      }}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.posterImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title || item.name}</Text>
        <Text style={styles.mediaType}>{item.media_type === 'movie' ? 'Filme' : 'Série'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    // ===== MUDANÇA PRINCIPAL: View em vez de SafeAreaView =====
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar filmes, séries..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={searchMoviesAndSeries}
          autoFocus
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#F5A623" style={{ marginTop: 20 }} />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.listContainer}>
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
    // ==========================================================
  );
}

const styles = StyleSheet.create({
  // ===== E AQUI: 'container' com altura definida para web =====
  container: {
    flex: 1,
    backgroundColor: "#121212",
    // @ts-ignore - 'height' é uma propriedade web
    height: '100vh',
    paddingTop: 40, // Simula o preenchimento superior da SafeAreaView
  },
  // ============================================================
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#252525",
    borderRadius: 20,
    paddingHorizontal: 15,
    color: "white",
    fontSize: 16,
    marginLeft: 15,
  },
  listContainer: {
    flex: 1,
    overflow: 'hidden', // Ajuda a conter a lista
  },
  resultItem: {
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#1C1C1C",
    borderRadius: 10,
    overflow: 'hidden',
  },
  posterImage: {
    width: 100,
    height: 150,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  mediaType: {
    color: "gray",
    fontSize: 14,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});