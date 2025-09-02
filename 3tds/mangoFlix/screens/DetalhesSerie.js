import React, { useState, useEffect } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";

export default function DetalhesSerie({ route, navigation }) {
  const { serieId } = route.params;
  const [serie, setSerie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Novo estado para favoritos

  useEffect(() => {
    const fetchDetalhesSerie = async () => {
      try {
        setLoading(true);
        const [respostaSerie, respostaVideos, respostaCast, respostaSimilar] =
          await Promise.all([
            axios.get(
              `https://api.themoviedb.org/3/tv/${serieId}?api_key=${TMDB_API_KEY}&language=pt-BR`
            ),
            axios.get(
              `https://api.themoviedb.org/3/tv/${serieId}/videos?api_key=${TMDB_API_KEY}&language=pt-BR`
            ),
            axios.get(
              `https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=${TMDB_API_KEY}`
            ),
            axios.get(
              `https://api.themoviedb.org/3/tv/${serieId}/similar?api_key=${TMDB_API_KEY}&language=pt-BR`
            ),
          ]);

        setSerie(respostaSerie.data);
        setCast(respostaCast.data.cast.slice(0, 5));
        setSimilarSeries(respostaSimilar.data.results.slice(0, 10));

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
        console.error("Erro ao buscar detalhes da série:", erro);
      } finally {
        setLoading(false);
      }
    };

    if (serieId) {
      fetchDetalhesSerie();
    }
  }, [serieId]);

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

  if (!serie) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={styles.textoDetalhe}>
          Não foi possível carregar os detalhes da série.
        </Text>
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

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.titulo}>{serie.name}</Text>
          <Text style={styles.genero}>
            {serie.genres.map((g) => g.name).join(", ")}
          </Text>
          <Text style={styles.textoDetalhe}>
            Episódios: {serie.number_of_episodes}
          </Text>
          <Text style={styles.textoDetalhe}>
            Data de Lançamento: {serie.first_air_date}
          </Text>
          <Text style={styles.textoDetalhe}>
            Nota: {serie.vote_average ? serie.vote_average.toFixed(1) : "N/A"} /
            10
          </Text>
          <Text style={styles.sinopse}>
            {serie.overview || "Sinopse não disponível."}
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

          {/* Botões de Ação */}
          <View style={styles.actionButtonsContainer}>
            {trailerUrl && (
              <TouchableOpacity
                style={styles.botaoAssistir}
                onPress={() => Linking.openURL(trailerUrl)}
              >
                <Text style={styles.textoBotao}>Assistir Trailer</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.botaoFavorito,
                isFavorite && styles.botaoFavoritoAtivo,
              ]}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons
                name={isFavorite ? "star" : "star-outline"}
                size={24}
                color={isFavorite ? "#fff" : "white"}
              />
              <Text style={styles.textoBotaoFavorito}>
                {isFavorite ? "Favoritado" : "Adicionar aos Favoritos"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Seção de Séries Similares */}
          {similarSeries.length > 0 && (
            <View style={styles.similarSection}>
              <Text style={styles.subtitulo}>Séries Similares</Text>
              <FlatList
                data={similarSeries}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("DetalhesSerie", { serieId: item.id })
                    }
                    style={styles.similarPosterContainer}
                  >
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                      }}
                      style={styles.similarPosterImage}
                    />
                    <Text style={styles.similarTitle}>{item.name}</Text>
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
  safeArea: { flex: 1, backgroundColor: "#121212" },
  scrollView: { flex: 1 },
  poster: { width: "100%", height: 500, resizeMode: "cover" },
  backButton: {
    position: "absolute",
    top: 10,
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
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  botaoAssistir: {
    backgroundColor: "#e50914",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  textoBotao: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  botaoFavorito: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  botaoFavoritoAtivo: { backgroundColor: "#F5A623" },
  textoBotaoFavorito: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
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
