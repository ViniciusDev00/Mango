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
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const TMDB_API_KEY = "6cfcd7f3d0168aeb2439a02b1cc9b27b";
const { width } = Dimensions.get('window');

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

const TrendingItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.trendingItemContainer}
    onPress={() => {
      const navParams = item.media_type === "movie"
        ? { screen: "DetalhesFilme", params: { filmeId: item.id } }
        : { screen: "DetalhesSerie", params: { serieId: item.id } };
      navigation.navigate(navParams.screen, navParams.params);
    }}
  >
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      style={styles.trendingImage}
    />
    <View style={styles.trendingOverlay}>
      <Text style={styles.trendingTitle}>{item.title || item.name}</Text>
      <Text style={styles.trendingSubtitle}>
        {item.media_type === "movie" ? "Filme" : "Série"} em destaque
      </Text>
    </View>
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

  if (loading) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F5A623" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require("../img/manga-removebg-preview.png")}
          style={styles.logo}
        />
        <View style={styles.headerIcons}>
          <Ionicons
            name="search-outline"
            size={26}
            color="white"
            style={{ marginRight: 15 }}
          />
          <Ionicons name="person-circle-outline" size={28} color="white" />
        </View>
      </View>

      <ScrollView style={styles.container}>
        {banners.length > 0 && (
          <View style={styles.carouselContainer}>
            <Text style={styles.sectionTitleBanner}>Em alta</Text>
            <FlatList
              data={banners}
              renderItem={({ item }) => <TrendingItem item={item} navigation={navigation} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToInterval={width - 32}
              decelerationRate="fast"
            />
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
  carouselContainer: { paddingVertical: 10, height: width * 0.8 }, // Ajuste na altura
  sectionTitleBanner: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  trendingItemContainer: {
    width: width - 32,
    marginHorizontal: 5,
    height: width * 0.6,
  },
  trendingImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: 'cover',
  },
  trendingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    padding: 16,
    borderRadius: 12,
  },
  trendingTitle: { color: "white", fontSize: 24, fontWeight: "bold" },
  trendingSubtitle: {
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