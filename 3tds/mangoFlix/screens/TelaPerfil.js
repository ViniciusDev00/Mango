// src/screens/TelaPerfil.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Dados de exemplo para a seção "Minha Lista"
const myWatchlist = [
  { id: 1, title: "Stranger Things", poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskq.jpg" },
  { id: 2, title: "Loki", poster: "https://image.tmdb.org/t/p/w500/kEl2N0u00sK4yQW6nF5hJm7eU5T.jpg" },
  { id: 3, title: "The Mandalorian", poster: "https://image.tmdb.org/t/p/w500/y6j01iQ2R5kGfV7Wd5H1mP2t5rA.jpg" },
  { id: 4, title: "Breaking Bad", poster: "https://image.tmdb.org/t/p/w500/u9r5QeJtK998N3L4g1Nf70X20vL.jpg" },
  { id: 5, title: "WandaVision", poster: "https://image.tmdb.org/t/p/w500/gl0f4d3KjL5c2o8Rj9W2jX6w2Pj.jpg" },
];

export default function TelaPerfil({ navigation }) {
  const user = {
    name: "Usuário Exemplo",
    handle: "@usuarioexemplo",
    avatar: "https://via.placeholder.com/150",
    cover: "https://via.placeholder.com/800x400",
    followers: 1245,
    likes: "8.2K",
  };

  const renderPosterItem = ({ item }) => (
    <View style={styles.posterItemContainer}>
      <Image
        source={{ uri: item.poster }}
        style={styles.posterImage}
      />
      <Text style={styles.posterTitle}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {/* Header com a logo e ícones */}
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

        {/* Seção de perfil estilo rede social */}
        <View>
          <ImageBackground
            source={{ uri: user.cover }}
            style={styles.coverImage}
          >
            <View style={styles.profileOverlay} />
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
          </ImageBackground>

          <View style={styles.profileInfoContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.handle}>{user.handle}</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.followers}</Text>
                <Text style={styles.statLabel}>Seguidores</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.likes}</Text>
                <Text style={styles.statLabel}>Curtidas</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Seção "Minha Lista" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minha Lista</Text>
          <FlatList
            data={myWatchlist}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderPosterItem}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>

        {/* Seção de menu */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#F5A623" />
            <Text style={styles.menuItemText}>Configurações</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={22}
              color="gray"
              style={styles.menuItemChevron}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color="#F5A623" />
            <Text style={styles.menuItemText}>Ajuda e Suporte</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={22}
              color="gray"
              style={styles.menuItemChevron}
            />
          </TouchableOpacity>
        </View>

        {/* Botão de Sair */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#e50914" />
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
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

  coverImage: { width: "100%", height: 200, justifyContent: "center", alignItems: "center" },
  profileOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.4)" },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#121212",
    position: "absolute",
    bottom: -60,
  },
  
  profileInfoContainer: { alignItems: "center", marginTop: 70, paddingHorizontal: 16 },
  name: { color: "white", fontSize: 28, fontWeight: "bold" },
  handle: { color: "gray", fontSize: 16, marginTop: 5 },
  
  statsContainer: { flexDirection: "row", marginTop: 20, marginBottom: 20 },
  statItem: { alignItems: "center", marginHorizontal: 20 },
  statValue: { color: "white", fontSize: 18, fontWeight: "bold" },
  statLabel: { color: "gray", fontSize: 14 },

  section: { marginTop: 20 },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  posterItemContainer: {
    marginRight: 10,
    width: 100,
  },
  posterImage: { width: "100%", height: 150, borderRadius: 8 },
  posterTitle: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  
  menuSection: {
    backgroundColor: "#181818",
    marginHorizontal: 16,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#252525",
  },
  menuItemText: { color: "white", fontSize: 16, marginLeft: 15, flex: 1 },
  menuItemChevron: { marginRight: 5 },
  
  logoutContainer: { marginHorizontal: 16, marginTop: 20, marginBottom: 20 },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#181818",
    padding: 15,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "#e50914",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});