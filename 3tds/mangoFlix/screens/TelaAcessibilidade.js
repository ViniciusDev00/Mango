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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TelaAcessibilidade() {
  const navigation = useNavigation();
  const [legenda, setLegenda] = React.useState(false);
  const [altoContraste, setAltoContraste] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Acessibilidade</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="closed-caption-outline" size={24} color="white" />
            <Text style={styles.menuText}>Legendas Automáticas</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#F5A623" }}
              thumbColor={legenda ? "#fff" : "#f4f3f4"}
              onValueChange={() => setLegenda(prev => !prev)}
              value={legenda}
            />
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="contrast-outline" size={24} color="white" />
            <Text style={styles.menuText}>Modo de Alto Contraste</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#F5A623" }}
              thumbColor={altoContraste ? "#fff" : "#f4f3f4"}
              onValueChange={() => setAltoContraste(prev => !prev)}
              value={altoContraste}
            />
          </View>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="text-outline" size={24} color="white" />
            <Text style={styles.menuText}>Tamanho da Fonte</Text>
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