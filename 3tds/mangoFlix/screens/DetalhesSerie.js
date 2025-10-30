// src/screens/DetalhesSerie.js
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Linking,
} from "react-native";
// Importação correta do SafeAreaView para flex: 1 funcionar
import { SafeAreaView } from "react-native-safe-area-context"; 
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { FavoritesContext } from "../src/contexts/FavoritesContext"; // Lógica de favoritos já estava aqui

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";

export default function DetalhesSerie({ route }) {
  const navigation = useNavigation();
  const { serieId } = route.params;
  const [serie, setSerie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState(null);

  // Lógica de favoritos já estava aqui
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const isCurrentlyFavorite = serie ? isFavorite(serie.id, "tv") : false;

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        setLoading(true);
        const seriesDetailsResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        setSerie(seriesDetailsResponse.data);

        const seriesCreditsResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        setCast(seriesCreditsResponse.data.cast.slice(0, 10));

        const similarSeriesResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}/similar?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        setSimilarSeries(similarSeriesResponse.data.results.slice(0, 10));

        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}/videos?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        const trailer = trailerResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes da série:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeriesDetails();
  }, [serieId]);

  // Lógica de favoritos já estava aqui
  const handleFavoritePress = () => {
    if (!serie) return;
    const favoriteItem = {
      id: serie.id,
      type: "tv",
      title: serie.name,
      image: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
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

  // Botão de navegação "Voltar"
  const handleGoBack = () => {
    navigation.goBack();
  };

  if (loading || !serie) {
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
            uri: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
          }}
          style={styles.poster}
        />
        
        {/* Botão de navegação "Voltar" */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{serie.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>{serie.vote_average.toFixed(1)}</Text>
          </View>
          <Text style={styles.infoText}>
            {serie.first_air_date.split("-")[0]} |{" "}
            {serie.genres.map((genre) => genre.name).join(", ")}
          </Text>

          {trailerUrl && (
            <TouchableOpacity style={styles.trailerButton} onPress={handleWatchTrailer}>
              <Ionicons name="play-circle" size={24} color="white" />
              <Text style={styles.trailerButtonText}>Assistir Trailer</Text>
            </TouchableOpacity>
          )}

          {/* Botão de Favoritos */}
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

          <Text style={styles.overview}>{serie.overview}</Text>
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
        <Text style={styles.sectionTitle}>Séries Similares</Text>
        <FlatList
          data={similarSeries}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.similarSeriesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.similarSerieItem}
              onPress={() => navigation.push("DetalhesSerie", { serieId: item.id })}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.similarSerieImage}
              />
              <Text style={styles.similarSerieTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Correção para o Scroll funcionar na WEB
  safeArea: {
    backgroundColor: "#121212",
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
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
    top: 10, // Ajustado para ficar igual ao DetalhesFilme (era 50)
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
  similarSeriesList: {
    paddingLeft: 16,
    marginBottom: 20,
  },
  similarSerieItem: {
    width: 120,
    marginRight: 10,
  },
  similarSerieImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  similarSerieTitle: {
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