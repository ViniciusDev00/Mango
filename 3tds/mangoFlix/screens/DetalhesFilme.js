import React, { useState, useEffect, useContext } from "react"; // 1. Adicionado useContext
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { FavoritesContext } from "../src/contexts/FavoritesContext"; // 2. Importado o Context

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";
const { width } = Dimensions.get('window');

export default function DetalhesFilme({ route, navigation }) {
  const { filmeId } = route.params;
  const [filme, setFilme] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState(null);

  // 3. Lógica do Context (copiada de DetalhesSerie)
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const isCurrentlyFavorite = filme ? isFavorite(filme.id, "movie") : false;

  const handleFavoritePress = () => {
    if (!filme) return;
    const favoriteItem = {
      id: filme.id,
      type: "movie", // <-- Alterado para "movie"
      title: filme.title, // <-- Alterado para filme.title
      image: `https://image.tmdb.org/t/p/w500${filme.poster_path}`,
    };
    if (isCurrentlyFavorite) {
      removeFavorite(favoriteItem);
    } else {
      addFavorite(favoriteItem);
    }
  };
  // Fim da lógica do Context

  useEffect(() => {
    const fetchDetalhesFilme = async () => {
      try {
        setLoading(true);
        const [respostaFilme, respostaVideos, respostaCast, respostaSimilar] =
          await Promise.all([
            axios.get(
              `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${TMDB_API_KEY}&language=pt-BR`
            ),
            axios.get(
              `https://api.themoviedb.org/3/movie/${filmeId}/videos?api_key=${TMDB_API_KEY}&language=pt-BR`
            ),
            axios.get(
              `https://api.themoviedb.org/3/movie/${filmeId}/credits?api_key=${TMDB_API_KEY}`
            ),
            axios.get(
              `https://api.themoviedb.org/3/movie/${filmeId}/similar?api_key=${TMDB_API_KEY}&language=pt-BR`
            ),
          ]);

        setFilme(respostaFilme.data);
        setCast(respostaCast.data.cast.slice(0, 5)); 
        setSimilarMovies(respostaSimilar.data.results.slice(0, 10)); 

        const trailer = respostaVideos.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        const teaser = respostaVideos.data.results.find(
          (video) => video.type === "Teaser" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        } else if (teaser) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${teaser.key}`);
        } else {
          setTrailerUrl(null);
        }
      } catch (erro) {
        console.error("Erro ao buscar detalhes do filme:", erro);
      } finally {
        setLoading(false);
      }
    };

    if (filmeId) {
      fetchDetalhesFilme();
    }
  }, [filmeId]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#F5A623" />
      </View>
    );
  }

  if (!filme) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={styles.textoDetalhe}>
          Não foi possível carregar os detalhes do filme.
        </Text>
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

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.titulo}>{filme.title}</Text>
          <Text style={styles.genero}>
            {filme.genres.map((g) => g.name).join(", ")}
          </Text>
          <Text style={styles.textoDetalhe}>Duração: {filme.runtime} min</Text>
          <Text style={styles.textoDetalhe}>
            Data de Lançamento: {filme.release_date}
          </Text>
          <Text style={styles.textoDetalhe}>
            Nota: {filme.vote_average ? filme.vote_average.toFixed(1) : "N/A"} /
            10
          </Text>
          <Text style={styles.sinopse}>
            {filme.overview || "Sinopse não disponível."}
          </Text>

          {/* Seção de Elenco */}
          <Text style={styles.subtitulo}>Elenco Principal</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.castList}
          >
            {cast.map((actor, index) => (
              <View key={index} style={styles.actorContainer}>
                {actor.profile_path ? (
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
                    }}
                    style={styles.actorImage}
                  />
                ) : (
                  <View style={styles.actorPlaceholder}>
                    <Ionicons name="person" size={40} color="gray" />
                  </View>
                )}
                <Text style={styles.actorName}>{actor.name}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Botões de Ação (Estilo de DetalhesSerie) */}
          {trailerUrl && (
            <TouchableOpacity
              style={styles.trailerButton}
              onPress={() => Linking.openURL(trailerUrl)}
            >
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
          {/* Fim dos Botões de Ação */}

          {/* Seção de Filmes Similares */}
          {similarMovies.length > 0 && (
            <View style={styles.similarSection}>
              <Text style={styles.subtitulo}>Filmes Similares</Text>
              <FlatList
                data={similarMovies}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("DetalhesFilme", { filmeId: item.id })
                    }
                    style={styles.similarPosterContainer}
                  >
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                      }}
                      style={styles.similarPosterImage}
                    />
                    <Text style={styles.similarTitle}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    backgroundColor: "#121212",
    height: '100vh',
    display: 'flex',
    flexDirection: 'column', 
    flex: 1,
  },
  scrollView: { flex: 1 },
  // 4. Estilo da imagem corrigido (igual ao DetalhesSerie)
  poster: { 
    width: "100%", 
    height: Dimensions.get("window").height * 0.6, 
    resizeMode: "cover" 
  },
  backButton: {
    position: "absolute",
    top: 10, // Ajustado para ficar igual ao DetalhesSerie (era 50)
    left: 10,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
  infoContainer: { padding: 15 },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  genero: {
    fontSize: 16,
    color: "#ccc",
    fontStyle: "italic",
    marginBottom: 10,
  },
  textoDetalhe: { fontSize: 14, color: "#aaa", marginBottom: 5 },
  sinopse: { fontSize: 16, color: "#ccc", lineHeight: 24, marginBottom: 15 },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    marginBottom: 10,
  },
  castList: { marginBottom: 15 },
  actorContainer: { alignItems: "center", marginRight: 15 },
  actorImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 5 },
  actorPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  actorName: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    maxWidth: 80,
  },
  
  // 5. Estilos dos botões copiados de DetalhesSerie
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
    backgroundColor: "#F5A623" 
  },
  textoBotaoFavorito: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  // Fim dos estilos dos botões

  similarSection: { marginTop: 20 },
  similarPosterContainer: { marginRight: 10 },
  similarPosterImage: { width: 100, height: 150, borderRadius: 8 },
  similarTitle: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
    maxWidth: 100,
  },
  container: { flex: 1, backgroundColor: "#121212" },
});