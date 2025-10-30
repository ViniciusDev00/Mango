import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@user_key';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Usuário Mango',
    email: 'usuario.mango@email.com',
    profileImage: 'https://i.pinimg.com/736x/f8/86/5f/f8865f0062c846accc69792d49869fbb.jpg',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Carrega os dados do usuário do AsyncStorage ao iniciar o app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  // Função para atualizar e salvar os dados do usuário
  const updateUser = async (newUserData) => {
    try {
      const updatedUser = { ...user, ...newUserData };
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
    }
  };

  // REMOVIDA A CONDIÇÃO if (isLoading) { return null; }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};