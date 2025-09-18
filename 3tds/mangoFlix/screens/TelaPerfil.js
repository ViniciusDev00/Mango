// src/screens/TelaPerfil.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TelaPerfil() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Meu Perfil</Text>
          <TouchableOpacity onPress={() => console.log("Configurações pressionado")}>
            <Ionicons name="cog-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNRkVHKqJuBYlIyckk72EHUe9An5m1KJrlqA&s' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Usuário Mango</Text>
          <Text style={styles.profileEmail}>usuario.mango@email.com</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="film-outline" size={24} color="#F5A623" />
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statText}>Filmes Assistidos</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="tv-outline" size={24} color="#F5A623" />
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statText}>Séries Vistas</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="star-outline" size={24} color="#F5A623" />
            <Text style={styles.statNumber}>30</Text>
            <Text style={styles.statText}>Favoritos</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="white" />
            <Text style={styles.menuText}>Configurações da Conta</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <Text style={styles.menuText}>Notificações</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="theme-light-dark" size={24} color="white" />
            <Text style={styles.menuText}>Modo Escuro</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Sair pressionado")}>
            <Ionicons name="log-out-outline" size={24} color="#e50914" />
            <Text style={[styles.menuText, { color: '#e50914' }]}>Sair</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  pageTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#F5A623',
  },
  profileName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    color: 'gray',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    paddingVertical: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statText: {
    color: 'gray',
    fontSize: 12,
    marginTop: 2,
  },
  menuContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },
  menuText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
});