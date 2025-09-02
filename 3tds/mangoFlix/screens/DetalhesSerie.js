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
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones
import axios from "axios";

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";

export default function DetalhesSerie({ route, navigation }) {
  const { serieId } = route.params;
  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchDetalhesSerie = async () => {
      try {
        setLoading(true);
        const [respostaSerie, respostaVideos] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/tv/${serieId}?api_key=${TMDB_API_KEY}&language=pt-BR`
          ),
          axios.get(
            `https://api.themoviedb.org/3/tv/${serieId}/videos?api_key=${TMDB_API_KEY}&language=pt-BR`
          ),
        ]);

        setSerie(respostaSerie.data);

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
        
        {/* Botão de voltar */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>

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

          {trailerUrl && (
            <TouchableOpacity
              style={styles.botaoAssistir}
              onPress={() => Linking.openURL(trailerUrl)}
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
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
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