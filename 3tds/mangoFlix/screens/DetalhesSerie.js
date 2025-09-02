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

export default function DetalhesSerie({ route }) {
  const { serieId } = route.params;
  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalhesSerie = async () => {
      try {
        setLoading(true);
        // Chama a API para detalhes da série
        const respostaSerie = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        // Chama a API para vídeos da série
        const respostaVideos = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}/videos?api_key=${TMDB_API_KEY}&language=pt-BR`
        );

        const trailer = respostaVideos.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        setSerie({
          ...respostaSerie.data,
          trailerUrl: trailer
            ? `https://www.youtube.com/watch?v=${trailer.key}`
            : null,
        });
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
        <View style={styles.infoContainer}>
          <Text style={styles.titulo}>{serie.name}</Text>
          <Text style={styles.sinopse}>
            {serie.overview || "Sinopse não disponível."}
          </Text>
          <Text style={styles.textoDetalhe}>
            Data de Lançamento: {serie.first_air_date || "N/A"}
          </Text>
          <Text style={styles.textoDetalhe}>
            Nota: {serie.vote_average ? serie.vote_average.toFixed(1) : "N/A"} /
            10
          </Text>

          {serie.trailerUrl && (
            <TouchableOpacity
              style={styles.botaoAssistir}
              onPress={() => Linking.openURL(serie.trailerUrl)}
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
