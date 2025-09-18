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
  Alert,
  Switch,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// URLs de imagens de personagens de Demon Slayer coloridas
const profileImages = [
  'https://i.pinimg.com/736x/f8/86/5f/f8865f0062c846accc69792d49869fbb.jpg'
];

export default function TelaPerfil() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = React.useState(true); // Estado local para o modo escuro

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    // Em uma implementação real, o estado do tema seria gerenciado por um Contexto ou Redux
    console.log('Modo Escuro ativado:', !isDarkMode);
  };
  
  const handleAccountSettings = () => {
    // Aqui você pode navegar para uma nova tela de configurações
    Alert.alert('Funcionalidade Futura', 'A tela de Configurações da Conta será implementada em uma versão futura.');
  };

  const handleAccessibility = () => {
    // Aqui você pode navegar para uma nova tela de acessibilidade
    Alert.alert('Funcionalidade Futura', 'As opções de Acessibilidade serão implementadas em uma versão futura.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Meu Perfil</Text>
          <TouchableOpacity 
            onPress={handleAccountSettings}
            accessibilityLabel="Abrir configurações"
            accessibilityRole="button"
          >
            <Ionicons name="cog-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{ uri: profileImages[0] }}
            style={styles.profileImage}
            accessibilityLabel="Foto de perfil de um personagem de anime"
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
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="theme-light-dark" size={24} color="white" />
            <Text style={styles.menuText}>Modo Escuro</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#F5A623" }}
              thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
              onValueChange={handleToggleDarkMode}
              value={isDarkMode}
              accessibilityLabel="Alternar modo escuro"
            />
          </View>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => Alert.alert('Funcionalidade Futura', 'A funcionalidade de Sair será implementada em uma versão futura.')}
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