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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// --- DADOS MOCK (SIMULANDO DADOS DE UMA API COM IDs REAIS) ---
const BANNERS_DATA = [
  { id: 1011985, type: 'movie', title: "Kung Fu Panda 4", subtitle: "TRAILER OFICIAL", image: "https://i.ytimg.com/vi/pPeyZiQIlOg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAuamQPP_Hb4QOYmM2eXKlEdozpuQ" },
  { id: 708, type: 'movie', title: "Shrek 2", subtitle: "ASSISTA AGORA", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYakEYlsmxRF7sOsAFYzBNWpgFMUo2nWzaPQ&s" },
  { id: 315162, type: 'movie', title: "O Gato de Botas 2", subtitle: "AGORA NA PLATAFORMA", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA61cIcSe2saK87epjSei511RYKd750WYIow&s" },
  { id: 569094, type: 'movie', title: "Homem-Aranha: Através do Aranhaverso", subtitle: "CINEMAS AGORA", image: "https://m.media-amazon.com/images/S/pv-target-images/3c7c45988ed34fe4628aed9d51507061434432482279e1b69f8fd11ced6869bf.jpg" },
];

const CONTINUE_WATCHING_DATA = [
  { id: 299534, type: 'movie', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s", progress: 0.7 },
  { id: 1399, type: 'tv', image: "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg", progress: 0.2 },
  { id: 496243, type: 'movie', image: "https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg", progress: 0.9 },
  { id: 66732, type: 'tv', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s", progress: 0.7 },
  { id: 1402, type: 'tv', image: "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg", progress: 0.2 },
];

const RELEASES_DATA = [
  { id: 24428, type: 'movie', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s" },
  { id: 872585, type: 'movie', image: "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg" },
  { id: 550, type: 'movie', image: "https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg" },
  { id: 157336, type: 'movie', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s" },
  { id: 507086, type: 'movie', image: "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg" },
];

const RECOMMENDED_DATA = [
  { id: 60622, type: 'tv', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s" },
  { id: 62286, type: 'tv', image: "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg" },
  { id: 496243, type: 'movie', image: "https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg" },
  { id: 634649, type: 'movie', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s" },
  { id: 62560, type: 'tv', image: "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg" },
];

const TRENDING_NOW_DATA = [
  { id: 1726, type: 'movie', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s" },
  { id: 1667, type: 'tv', image: "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg" },
  { id: 1400, type: 'tv', image: "https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg" },
  { id: 585244, type: 'movie', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s" },
  { id: 1403, type: 'tv', image: "https://i.pinimg.com/236x/0f/004f/0f004fb72d1365665f8fffa43e821a0b.jpg" },
];

// --- COMPONENTES REUTILIZÁVEIS ---

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Ionicons name="chevron-forward-outline" size={22} color="gray" />
  </View>
);

// Componente para o pôster de filmes
const PosterItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.posterContainer}
    onPress={() => {
      if (item.type === 'movie') {
        navigation.navigate('DetalhesFilme', { filmeId: item.id });
      } else if (item.type === 'tv') {
        navigation.navigate('DetalhesSerie', { serieId: item.id });
      }
    }}
  >
    <Image source={{ uri: item.image }} style={styles.posterImage} />
  </TouchableOpacity>
);

const ContinueWatchingItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.posterContainer}
    onPress={() => {
      if (item.type === 'movie') {
        navigation.navigate('DetalhesFilme', { filmeId: item.id });
      } else if (item.type === 'tv') {
        navigation.navigate('DetalhesSerie', { serieId: item.id });
      }
    }}
  >
    <Image source={{ uri: item.image }} style={styles.posterImage} />
    <View style={styles.progressBarBackground}>
      <View
        style={[styles.progressBarFill, { width: `${item.progress * 100}%` }]}
      />
    </View>
  </TouchableOpacity>
);

// --- TELA PRINCIPAL ---

export default function TelaInicial() {
  const navigation = useNavigation(); // Adiciona o hook de navegação
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex + 1) % BANNERS_DATA.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentBanner = BANNERS_DATA[currentBannerIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* CABEÇALHO */}
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

        {/* BANNER DE DESTAQUE */}
        <View style={styles.bannerContainer}>
          <Text style={styles.sectionTitleBanner}>Em alta</Text>
          <TouchableOpacity
            onPress={() => {
              if (currentBanner.type === 'movie') {
                navigation.navigate('DetalhesFilme', { filmeId: currentBanner.id });
              } else if (currentBanner.type === 'tv') {
                navigation.navigate('DetalhesSerie', { serieId: currentBanner.id });
              }
            }}
          >
            <ImageBackground
              source={{ uri: currentBanner.image }}
              style={styles.bannerImage}
              imageStyle={{ borderRadius: 12 }}
            >
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerTitle}>{currentBanner.title}</Text>
                <Text style={styles.bannerSubtitle}>
                  {currentBanner.subtitle}
                </Text>
                <TouchableOpacity style={styles.watchButton}>
                  <Text style={styles.watchButtonText}>Assista Agora</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.paginationDots}>
            {BANNERS_DATA.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentBannerIndex && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* SEÇÃO CONTINUE ASSISTINDO */}
        <View style={styles.section}>
          <SectionHeader title="Continue assistindo" />
          <FlatList
            data={CONTINUE_WATCHING_DATA}
            renderItem={({ item }) => <ContinueWatchingItem item={item} navigation={navigation} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>

        {/* SEÇÃO LANÇAMENTOS */}
        <View style={styles.section}>
          <SectionHeader title="Lançamentos" />
          <FlatList
            data={RELEASES_DATA}
            renderItem={({ item }) => <PosterItem item={item} navigation={navigation} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>

        {/* SEÇÃO RECOMENDADO PARA VOCÊ */}
        <View style={styles.section}>
          <SectionHeader title="Recomendado para Você" />
          <FlatList
            data={RECOMMENDED_DATA}
            renderItem={({ item }) => <PosterItem item={item} navigation={navigation} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>

        {/* SEÇÃO EM ALTA AGORA */}
        <View style={styles.section}>
          <SectionHeader title="Em Alta Agora" />
          <FlatList
            data={TRENDING_NOW_DATA}
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

// Os estilos permanecem os mesmos
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10 },
  logo: { width: 35, height: 35 },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  bannerContainer: { paddingHorizontal: 16, marginTop: 10 },
  sectionTitleBanner: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 12 },
  bannerImage: { width: "100%", height: 200, justifyContent: "flex-end" },
  bannerOverlay: { backgroundColor: "rgba(0,0,0,0.4)", padding: 12, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  bannerTitle: { color: "white", fontSize: 24, fontWeight: "bold" },
  bannerSubtitle: { color: "white", fontSize: 14, fontWeight: "300", letterSpacing: 1, marginTop: 4 },
  watchButton: { backgroundColor: "rgba(255, 255, 255, 0.9)", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, alignSelf: "flex-start", marginTop: 12 },
  watchButtonText: { color: "black", fontWeight: "bold" },
  paginationDots: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "gray", marginHorizontal: 4 },
  dotActive: { backgroundColor: "white" },
  section: { marginTop: 25, paddingBottom: 5 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, marginBottom: 12 },
  sectionTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  posterContainer: { marginRight: 10 },
  posterImage: { width: 120, height: 180, borderRadius: 8 },
  progressBarBackground: { height: 4, backgroundColor: "#404040", borderRadius: 2, marginTop: -4, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, overflow: "hidden" },
  progressBarFill: { height: "100%", backgroundColor: "#E50914" },
});