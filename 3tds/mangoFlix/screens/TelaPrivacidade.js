import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TelaPrivacidade() {
  const navigation = useNavigation();
  const [isPrivate, setIsPrivate] = useState(false);
  const [allowSearch, setAllowSearch] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Privacidade</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={24} color="white" />
            <Text style={styles.menuText}>Perfil Privado</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#F5A623" }}
              thumbColor={isPrivate ? "#fff" : "#f4f3f4"}
              onValueChange={() => setIsPrivate(prev => !prev)}
              value={isPrivate}
            />
          </View>
          <Text style={styles.description}>
            Se seu perfil for privado, apenas usuários que você aprovar poderão ver seus filmes e séries favoritos.
          </Text>

          <View style={styles.menuItem}>
            <Ionicons name="search-circle-outline" size={24} color="white" />
            <Text style={styles.menuText}>Permitir busca por e-mail</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#F5A623" }}
              thumbColor={allowSearch ? "#fff" : "#f4f3f4"}
              onValueChange={() => setAllowSearch(prev => !prev)}
              value={allowSearch}
            />
          </View>
          <Text style={styles.description}>
            Permita que outras pessoas encontrem seu perfil usando seu endereço de e-mail.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  pageTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  container: { flex: 1, paddingHorizontal: 20 },
  menuContainer: { backgroundColor: '#1C1C1C', borderRadius: 10, paddingHorizontal: 15 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },
  menuText: { color: 'white', fontSize: 16, marginLeft: 15, flex: 1 },
  description: {
    color: 'gray',
    fontSize: 12,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});