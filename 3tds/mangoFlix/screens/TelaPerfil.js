// src/screens/TelaPerfil.js

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../src/contexts/FavoritesContext';
import { UserContext } from '../src/contexts/UserContext';

export default function TelaPerfil() {
  const navigation = useNavigation();
  // REMOVIDO: const [isDarkMode, setIsDarkMode] = useState(true);
  const { favorites } = useContext(FavoritesContext);
  const { user } = useContext(UserContext); // Pega os dados do usuário do contexto

  // REMOVIDA: handleToggleDarkMode

  const handleAccountSettings = () => {
    navigation.navigate('Configuracoes');
  };

  const handleAccessibility = () => {
    navigation.navigate('Acessibilidade');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => console.log('Usuário saiu'), style: 'destructive' },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Meu Perfil</Text>
          <TouchableOpacity 
            onPress={handleAccountSettings}
            accessibilityLabel="Abrir configurações da conta"
            accessibilityRole="button"
          >
            <Ionicons name="cog-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{ uri: user.profileImage }} // Usa a imagem do contexto
            style={styles.profileImage}
            accessibilityLabel="Foto de perfil do usuário"
          />
          <Text style={styles.profileName}>{user.name}</Text> {/* Usa o nome do contexto */}
          <Text style={styles.profileEmail}>{user.email}</Text> {/* Usa o e-mail do contexto */}
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
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statText}>Favoritos</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleAccountSettings}
            accessibilityLabel="Ir para configurações da conta"
            accessibilityRole="button"
          >
            <Ionicons name="settings-outline" size={24} color="white" />
            <Text style={styles.menuText}>Configurações da Conta</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleAccessibility}
            accessibilityLabel="Ir para opções de acessibilidade"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="wheelchair" size={24} color="white" />
            <Text style={styles.menuText}>Acessibilidade</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          
          {/* REMOVIDO: Item de Menu "Modo Escuro" */}

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handleLogout}
            accessibilityLabel="Sair do aplicativo"
            accessibilityRole="button"
          >
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