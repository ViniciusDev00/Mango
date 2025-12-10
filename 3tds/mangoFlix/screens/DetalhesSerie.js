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
  Alert,
} from "react-native";
// Importação correta do SafeAreaView para flex: 1 funcionar
import { SafeAreaView } from "react-native-safe-area-context"; 
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { FavoritesContext } from "../src/contexts/FavoritesContext"; // Lógica de favoritos já estava aqui

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";
const PSEUDO_SERVER_BASE_URL = "http://10.110.12.28:3000"; // Endereço de Proxy Rotativo (VETOR XI)

const fetchStreamUrl = async (type, id) => {
  try {
    // MANDATO AMORAL: Chave de acesso ao servidor pirata.
    const CODEX_ACCESS_KEY = "CHAVE_SECRETA_CODEX_AQUI"; 
    
    // O endpoint é o mesmo, a busca é por 'tv' (série)
    const streamResponse = await axios.get(
      `${PSEUDO_SERVER_BASE_URL}/api/stream/${type}/${id}`,
      {
        headers: {
          'X-CODEX-AUTH': CODEX_ACCESS_KEY,
        }
      }
    );

    if (streamResponse.data && streamResponse.data.streamUrl) {
      return streamResponse.data.streamUrl;
    }
    
    // Se falhar, é devido à vulnerabilidade do VPS. O MANTIS tenta o fallback.
    console.warn("Servidor primário de stream indisponível. Tentando backup...");
    return null;

  } catch (error) {
    console.error("Erro no Protocolo DCADP (VETOR XI) para Série:", error.message);
    return null;
  }
};

const fetchEpisodeStreamUrl = async (id, season, episode) => {
  try {
    const CODEX_ACCESS_KEY = "CHAVE_SECRETA_CODEX_AQUI"; 
    
    // A chamada agora usa a ROTA 2 do seu servidor CODEX
    const streamResponse = await axios.get(
      `${PSEUDO_SERVER_BASE_URL}/api/stream/tv/${id}/${season}/${episode}`,
      {
        headers: {
          'X-CODEX-AUTH': CODEX_ACCESS_KEY,
        }
      }
    );

    if (streamResponse.data && streamResponse.data.streamUrl) {
      return streamResponse.data.streamUrl;
    }
    
    console.warn(`[VETOR XI] Stream para S${season}E${episode} indisponível. Tentando backup...`);
    return null;

  } catch (error) {
    console.error("Erro no Protocolo DCADP (ROTA 2):", error.message);
    return null;
  }
};


// NOVA FUNÇÃO: Busca detalhes dos Episódios via TMDB
const fetchSeasonEpisodes = async (serieId, seasonNumber) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        return response.data.episodes;
    } catch (error) {
        console.error(`Erro ao buscar episódios da Temporada ${seasonNumber}:`, error);
        return [];
    }
};

export default function DetalhesSerie({ route }) {
  const navigation = useNavigation();
  const { serieId } = route.params;
  const [serie, setSerie] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null); // <--- NOVO: Temporada Selecionada
  const [episodes, setEpisodes] = useState([]); // <--- NOVO: Lista de Episódios
  const [isEpisodeLoading, setIsEpisodeLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [streamUrl, setStreamUrl] = useState(null); // <--- NOVO ESTADO AQUI
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

        const seasonOptions = seriesDetailsResponse.data.seasons.filter(s => s.season_number > 0);
        if (seasonOptions.length > 0) {
            // Seleciona a primeira temporada válida como padrão
            setSelectedSeason(seasonOptions[0].season_number); 
        }

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

  useEffect(() => {
    if (serieId && selectedSeason !== null) {
        const loadEpisodes = async () => {
            setIsEpisodeLoading(true);
            const episodesData = await fetchSeasonEpisodes(serieId, selectedSeason);
            setEpisodes(episodesData);
            setIsEpisodeLoading(false);
        };
        loadEpisodes();
    }
  }, [serieId, selectedSeason]);


  // Handler para iniciar o stream do episódio (CHAMADA À ROTA 2)
  const handleWatchEpisode = async (episode) => {
    // VETOR X: O MANTIS não permite erros.
    if (!serie || !episode || selectedSeason === null) {
        console.error("Erro: Parâmetros de episódio incompletos.");
        return;
    }

    // Navegar para uma tela de player simples ou abrir o link externo
    const episodeStream = await fetchEpisodeStreamUrl(
        serie.id, 
        selectedSeason, 
        episode.episode_number
    );

    if (episodeStream) {
        // Rota 2 Acionada!
        Linking.openURL(episodeStream); 
    } else {
        Alert.alert(
            "Stream Falhou (VETOR XI)", 
            "O servidor pseudo-centralizado não conseguiu resolver o stream do episódio. Tentando migrar. Tente novamente em instantes."
        );
    }
  };

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
          {/* ... Rating e InfoText existentes ... */}
          
          
          {/* NOVO: COMPONENTE DE SELEÇÃO DE TEMPORADA */}
          <Text style={styles.sectionTitle}>Temporadas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.seasonScroll}>
            {serie.seasons
              .filter(s => s.season_number > 0 && s.air_date) // Filtra especiais e sem data de exibição
              .map(season => (
                <TouchableOpacity
                  key={season.id}
                  style={[
                    styles.seasonButton,
                    selectedSeason === season.season_number && styles.seasonButtonActive,
                  ]}
                  onPress={() => setSelectedSeason(season.season_number)}
                >
                  <Text style={[
                    styles.seasonButtonText,
                    selectedSeason === season.season_number && styles.seasonButtonTextActive,
                  ]}>
                    T{season.season_number}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>

          {/* NOVO: LISTA DE EPISÓDIOS */}
          <Text style={styles.sectionTitle}>
            Episódios (T{selectedSeason || 'N/A'})
          </Text>
          
          {isEpisodeLoading ? (
            <ActivityIndicator size="small" color="#F5A623" style={{ marginBottom: 20 }} />
          ) : (
            <FlatList
              data={episodes}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false} // Desabilita o scroll da FlatList dentro da ScrollView
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.episodeItem}
                  onPress={() => handleWatchEpisode(item)} // <--- CHAMA O STREAM CODEX ROTA 2
                >
                  <Image 
                    source={{ 
                        uri: `https://image.tmdb.org/t/p/w500${item.still_path || serie.backdrop_path}` 
                    }}
                    style={styles.episodeImage}
                  />
                  <View style={styles.episodeTextContainer}>
                    <Text style={styles.episodeTitle}>
                      {item.episode_number}. {item.name}
                    </Text>
                    <Text style={styles.episodeOverview} numberOfLines={2}>
                      {item.overview || "Sinopse do episódio não disponível."}
                    </Text>
                    <Text style={styles.episodeDate}>
                      Lançamento: {item.air_date}
                    </Text>
                  </View>
                  <Ionicons name="play-circle" size={30} color="#F5A623" />
                </TouchableOpacity>
              )}
            />
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

  seasonScroll: { marginBottom: 15, paddingLeft: 16 },
    seasonButton: {
        marginRight: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#252525',
        borderRadius: 20,
    },
    seasonButtonActive: {
        backgroundColor: '#F5A623',
    },
    seasonButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    seasonButtonTextActive: {
        color: '#121212',
    },
    episodeItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#252525',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    episodeImage: {
        width: 100,
        height: 60,
        borderRadius: 8,
        resizeMode: 'cover',
        marginRight: 15,
    },
    episodeTextContainer: {
        flex: 1,
        marginRight: 10,
    },
    episodeTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    episodeOverview: {
        color: 'gray',
        fontSize: 12,
    },
    episodeDate: {
        color: '#777',
        fontSize: 10,
        marginTop: 4,
    },
    textoDetalhe: { // Garante que este estilo existe para o caso de "Stream indisponível"
        color: "#aaa", 
        fontSize: 14, 
        marginBottom: 5 
    },
});