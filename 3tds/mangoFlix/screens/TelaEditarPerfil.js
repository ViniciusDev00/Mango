import React, { useState, useContext } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, TextInput, Image, Alert, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; // ADICIONADO
import { UserContext } from '../src/contexts/UserContext'; // ADICIONADO

export default function TelaEditarPerfil() {
  const navigation = useNavigation();
  const { user, updateUser } = useContext(UserContext); // Pega o usuário e a função de update

  // Inicia o estado local com os dados do contexto
  const [nome, setNome] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [imageUri, setImageUri] = useState(user.profileImage);

  // Função para escolher uma foto da galeria
  const handleChoosePhoto = async () => {
    // Pede permissão para acessar a galeria
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria para alterar a foto.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImageUri(pickerResult.assets[0].uri);
    }
  };

  // Função para salvar as alterações no contexto
  const handleSaveChanges = () => {
    updateUser({
      name: nome,
      email: email,
      profileImage: imageUri,
    });
    Alert.alert('Sucesso', 'Seu perfil foi atualizado!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Editar Perfil</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: imageUri }} // Mostra a imagem selecionada
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.changeImageButton} onPress={handleChoosePhoto}>
            <Text style={styles.changeImageButtonText}>Alterar Foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome de Usuário</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            placeholderTextColor="gray"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ... (os styles permanecem os mesmos) ...
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  pageTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  container: { flex: 1, paddingHorizontal: 20 },
  profileImageContainer: { alignItems: 'center', marginBottom: 30 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderColor: '#F5A623', borderWidth: 2 },
  changeImageButton: { marginTop: 10 },
  changeImageButtonText: { color: '#F5A623', fontSize: 14, fontWeight: 'bold' },
  inputContainer: { marginBottom: 20 },
  label: { color: 'gray', fontSize: 14, marginBottom: 5 },
  input: {
    backgroundColor: '#1C1C1C',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#252525',
  },
  saveButton: {
    backgroundColor: '#F5A623',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
});