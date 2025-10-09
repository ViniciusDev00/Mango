import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
  Platform ,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";

const fetchTrending = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}&language=pt-BR`
  );
  return response.data.results;
};

const fetchPopularMovies = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=pt-BR`
  );
  return response.data.results;
};

const fetchTopRatedSeries = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}&language=pt-BR`
  );
  return response.data.results;
};

const PosterItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.posterItemContainer}
    onPress={() => {
      if (item.media_type === "movie" || !item.media_type) {
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
    <Text style={styles.posterTitle}>{item.title || item.name}</Text>
  </TouchableOpacity>
);

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Ionicons name="chevron-forward-outline" size={22} color="gray" />
  </View>
);

export default function TelaInicial() {
  const navigation = useNavigation();
  const [banners, setBanners] = useState([]);
  const [releases, setReleases] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [
          trendingData,
          popularMovies,
          topRatedSeries,
        ] = await Promise.all([
          fetchTrending(),
          fetchPopularMovies(),
          fetchTopRatedSeries(),
        ]);

        setBanners(trendingData.slice(0, 5));
        setReleases(popularMovies);
        setRecommended(topRatedSeries);
        setTrending(trendingData);
      } catch (error) {
        console.error("Erro ao carregar dados da página inicial:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleNextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const currentBanner = banners[currentBannerIndex];

  if (loading) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F5A623" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent={false}
        backgroundColor="#121212"
        barStyle="light-content"
      />
      <ScrollView style={styles.container}>
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

        {currentBanner && (
          <View style={styles.bannerContainer}>
            <Text style={styles.sectionTitleBanner}>Em alta</Text>
            <TouchableOpacity
              onPress={() => {
                const navParams = currentBanner.media_type === "movie" 
                  ? { screen: "DetalhesFilme", params: { filmeId: currentBanner.id } }
                  : { screen: "DetalhesSerie", params: { serieId: currentBanner.id } };
                navigation.navigate(navParams.screen, navParams.params);
              }}
            >
              <ImageBackground
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${currentBanner.poster_path}`,
                }}
                style={styles.bannerImage}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.bannerOverlay}>
                  <Text style={styles.bannerTitle}>
                    {currentBanner.title || currentBanner.name}
                  </Text>
                  <Text style={styles.bannerSubtitle}>
                    {currentBanner.media_type === "movie" ? "Filme" : "Série"} em destaque
                  </Text>
                  <TouchableOpacity style={styles.watchButton}>
                    <Text style={styles.watchButtonText}>Ver Detalhes</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.arrowButton, { left: 10 }]}
                  onPress={handlePrevBanner}
                >
                  <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.arrowButton, { right: 10 }]}
                  onPress={handleNextBanner}
                >
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <SectionHeader title="Lançamentos" />
          <FlatList
            data={releases}
            renderItem={({ item }) => (
              <PosterItem item={{ ...item, media_type: 'movie' }} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Recomendado para Você" />
          <FlatList
            data={recommended}
            renderItem={({ item }) => (
              <PosterItem item={{ ...item, media_type: 'tv' }} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Em Alta Agora" />
          <FlatList
            data={trending}
            renderItem={({ item }) => <PosterItem item={item} navigation={navigation} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  logo: { width: 35, height: 35 },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  bannerContainer: { paddingHorizontal: 16, marginTop: 10 },
  sectionTitleBanner: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 50,
  },
  bannerOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  bannerTitle: { color: "white", fontSize: 24, fontWeight: "bold" },
  bannerSubtitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 1,
    marginTop: 4,
  },
  watchButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  watchButtonText: { color: "black", fontWeight: "bold" },
  section: { marginTop: 25, paddingBottom: 5 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  posterItemContainer: {
    marginRight: 10,
    width: 120,
  },
  posterImage: { width: "100%", height: 180, borderRadius: 8 },
  posterTitle: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  
});