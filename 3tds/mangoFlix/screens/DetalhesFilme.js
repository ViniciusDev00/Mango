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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";

export default function DetalhesFilme({ route }) {
  const { filmeId } = route.params;
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalhesFilme = async () => {
      try {
        setLoading(true);
        const respostaFilme = await axios.get(
          `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        const respostaVideos = await axios.get(
          `https://api.themoviedb.org/3/movie/${filmeId}/videos?api_key=${TMDB_API_KEY}&language=pt-BR`
        );

        const trailer = respostaVideos.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        setFilme({
          ...respostaFilme.data,
          trailerUrl: trailer
            ? `https://www.youtube.com/watch?v=${trailer.key}`
            : null,
        });
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
        <View style={styles.infoContainer}>
          <Text style={styles.titulo}>{filme.title}</Text>
          <Text style={styles.sinopse}>
            {filme.overview || "Sinopse não disponível."}
          </Text>
          <Text style={styles.textoDetalhe}>
            Data de Lançamento: {filme.release_date || "N/A"}
          </Text>
          <Text style={styles.textoDetalhe}>
            Nota: {filme.vote_average ? filme.vote_average.toFixed(1) : "N/A"} /
            10
          </Text>

          {filme.trailerUrl && (
            <TouchableOpacity
              style={styles.botaoAssistir}
              onPress={() => Linking.openURL(filme.trailerUrl)}
            >
              <Text style={styles.textoBotao}>Assistir Trailer</Text>
            </TouchableOpacity>
          )}
        </View>
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
    width: "100%",
    height: 500,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 15,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  sinopse: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 24,
    marginBottom: 15,
  },
  textoDetalhe: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 5,
  },
  botaoAssistir: {
    backgroundColor: "#e50914",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
