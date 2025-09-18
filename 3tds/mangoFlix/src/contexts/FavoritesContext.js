import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@favorites_key";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Carrega os favoritos do AsyncStorage quando o app é iniciado
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };
    loadFavorites();
  }, []);

  const saveFavorites = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Erro ao salvar favoritos:", error);
    }
  };

  const addFavorite = (item) => {
    // Verifica se o item já está na lista
    if (!favorites.find((fav) => fav.id === item.id && fav.type === item.type)) {
      const updatedFavorites = [...favorites, item];
      saveFavorites(updatedFavorites);
    }
  };

  const removeFavorite = (item) => {
    const updatedFavorites = favorites.filter(
      (fav) => !(fav.id === item.id && fav.type === item.type)
    );
    saveFavorites(updatedFavorites);
  };

  const isFavorite = (id, type) => {
    return favorites.some((fav) => fav.id === id && fav.type === type);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};