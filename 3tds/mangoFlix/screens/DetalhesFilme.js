// src/screens/DetalhesFilme.js
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { FavoritesContext } from "../src/contexts/FavoritesContext"; // <-- Caminho corrigido

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";

export default function DetalhesFilme({ route }) {
  const navigation = useNavigation();
  const { filmeId } = route.params;
  const [filme, setFilme] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const isCurrentlyFavorite = filme ? isFavorite(filme.id, "movie") : false;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieDetailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        setFilme(movieDetailsResponse.data);

        const movieCreditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${filmeId}/credits?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        setCast(movieCreditsResponse.data.cast.slice(0, 10));

        const similarMoviesResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${filmeId}/similar?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        setSimilarMovies(similarMoviesResponse.data.results.slice(0, 10));

        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${filmeId}/videos?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        const trailer = trailerResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [filmeId]);

  const handleFavoritePress = () => {
    if (!filme) return;
    const favoriteItem = {
      id: filme.id,
      type: "movie",
      title: filme.title,
      image: `https://image.tmdb.org/t/p/w500${filme.poster_path}`,
    };
    if (isCurrentlyFavorite) {
      removeFavorite(favoriteItem);
    } else {
      addFavorite(favoriteItem);
    }
  };

  const handleWatchTrailer = () => {
    if (trailerUrl) {
      Linking.openURL(trailerUrl);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (loading || !filme) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F5A623" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${filme.poster_path}`,
          }}
          style={styles.poster}
        />

        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{filme.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>{filme.vote_average.toFixed(1)}</Text>
          </View>
          <Text style={styles.infoText}>
            {filme.release_date.split("-")[0]} |{" "}
            {filme.genres.map((genre) => genre.name).join(", ")}
          </Text>

          {trailerUrl && (
            <TouchableOpacity style={styles.trailerButton} onPress={handleWatchTrailer}>
              <Ionicons name="play-circle" size={24} color="white" />
              <Text style={styles.trailerButtonText}>Assistir Trailer</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.botaoFavorito,
              isCurrentlyFavorite && styles.botaoFavoritoAtivo,
            ]}
            onPress={handleFavoritePress}
          >
            <Ionicons
              name={isCurrentlyFavorite ? "star" : "star-outline"}
              size={24}
              color={isCurrentlyFavorite ? "#fff" : "white"}
            />
            <Text style={styles.textoBotaoFavorito}>
              {isCurrentlyFavorite ? "Favoritado" : "Adicionar aos Favoritos"}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.overview}>{filme.overview}</Text>
        </View>

        <Text style={styles.sectionTitle}>Elenco</Text>
        <FlatList
          data={cast}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.castList}
          renderItem={({ item }) => (
            <View style={styles.castItem}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                }}
                style={styles.castImage}
              />
              <Text style={styles.castName}>{item.name}</Text>
            </View>
          )}
        />
        <Text style={styles.sectionTitle}>Filmes Similares</Text>
        <FlatList
          data={similarMovies}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.similarMoviesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.similarMovieItem}
              onPress={() => navigation.navigate("DetalhesFilme", { filmeId: item.id })}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.similarMovieImage}
              />
              <Text style={styles.similarMovieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    flex: 1,
  },
  poster: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
    resizeMode: "cover",
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 16,
    marginLeft: 5,
  },
  infoText: {
    color: "gray",
    fontSize: 14,
    marginBottom: 4,
  },
  overview: {
    color: "#E0E0E0",
    fontSize: 16,
    marginTop: 10,
    lineHeight: 24,
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  castList: {
    paddingLeft: 16,
  },
  castItem: {
    alignItems: "center",
    marginRight: 10,
  },
  castImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  castName: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  similarMoviesList: {
    paddingLeft: 16,
    marginBottom: 20,
  },
  similarMovieItem: {
    width: 120,
    marginRight: 10,
  },
  similarMovieImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  similarMovieTitle: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  botaoFavorito: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 15,
    justifyContent: "center",
  },
  botaoFavoritoAtivo: {
    backgroundColor: "#F5A623",
  },
  textoBotaoFavorito: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  trailerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5A623",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 15,
  },
  trailerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});