import React from 'react';
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

export default function TelaConfiguracoes() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = React.useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Configurações da Conta</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="white" />
            <Text style={styles.menuText}>Editar Perfil</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="key-outline" size={24} color="white" />
            <Text style={styles.menuText}>Alterar Senha</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          <View style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <Text style={styles.menuText}>Notificações Push</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#F5A623" }}
              thumbColor={notifications ? "#fff" : "#f4f3f4"}
              onValueChange={() => setNotifications(prev => !prev)}
              value={notifications}
            />
          </View>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={24} color="white" />
            <Text style={styles.menuText}>Privacidade</Text>
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
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  pageTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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