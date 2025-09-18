// App.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Importe suas telas
import TelaInicial from "../screens/TelaInicial";
import TelaFilmes from "../screens/TelaFilmes";
import TelaSeries from "../screens/TelaSeries";
import TelaFavoritos from "../screens/TelaFavoritos";
import DetalhesFilme from "../screens/DetalhesFilme";
import DetalhesSerie from "../screens/DetalhesSerie";
import TelaPerfil from "../screens/TelaPerfil"; // Importa a nova tela de perfil

// Importe o provedor de contexto
import { FavoritesProvider } from "./contexts/FavoritesContext";

const Tab = createBottomTabNavigator();
const FilmesStack = createStackNavigator();
const SeriesStack = createStackNavigator();
const FavoritosStack = createStackNavigator();
const InicioStack = createStackNavigator();
const PerfilStack = createStackNavigator(); // Novo Stack Navigator para o perfil

function FilmesStackNavigator() {
  return (
    <FilmesStack.Navigator screenOptions={{ headerShown: false }}>
      <FilmesStack.Screen name="FilmesTab" component={TelaFilmes} />
      <FilmesStack.Screen name="DetalhesFilme" component={DetalhesFilme} />
    </FilmesStack.Navigator>
  );
}

function SeriesStackNavigator() {
  return (
    <SeriesStack.Navigator screenOptions={{ headerShown: false }}>
      <SeriesStack.Screen name="SeriesTab" component={TelaSeries} />
      <SeriesStack.Screen name="DetalhesSerie" component={DetalhesSerie} />
    </SeriesStack.Navigator>
  );
}

function FavoritosStackNavigator() {
  return (
    <FavoritosStack.Navigator screenOptions={{ headerShown: false }}>
      <FavoritosStack.Screen name="FavoritosTab" component={TelaFavoritos} />
      <FavoritosStack.Screen name="DetalhesFilme" component={DetalhesFilme} />
      <FavoritosStack.Screen name="DetalhesSerie" component={DetalhesSerie} />
    </FavoritosStack.Navigator>
  );
}

function InicioStackNavigator() {
  return (
    <InicioStack.Navigator screenOptions={{ headerShown: false }}>
      <InicioStack.Screen name="InicioTab" component={TelaInicial} />
      <InicioStack.Screen name="DetalhesFilme" component={DetalhesFilme} />
      <InicioStack.Screen name="DetalhesSerie" component={DetalhesSerie} />
    </InicioStack.Navigator>
  );
}

// Componente para a navegação da aba "Perfil"
function PerfilStackNavigator() {
  return (
    <PerfilStack.Navigator screenOptions={{ headerShown: false }}>
      <PerfilStack.Screen name="PerfilTab" component={TelaPerfil} />
    </PerfilStack.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          initialRouteName="Início"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#181818",
              borderTopWidth: 0,
              height: 90,
              paddingBottom: 30,
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              size = 28;

              if (route.name === "Início") {
                iconName = focused ? "home" : "home-outline";
                return <Ionicons name={iconName} size={size} color={color} />;
              } else if (route.name === "Filmes") {
                iconName = focused ? "movie-play" : "movie-play-outline";
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === "Séries") {
                iconName = focused ? "television-play" : "television";
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === "Favoritos") {
                iconName = focused ? "star" : "star-outline";
                return <Ionicons name={iconName} size={size} color={color} />;
              } else if (route.name === "Perfil") {
                iconName = focused ? "person-circle" : "person-circle-outline";
                return <Ionicons name={iconName} size={size} color={color} />;
              }
            },
          })}
        >
          <Tab.Screen name="Início" component={InicioStackNavigator} />
          <Tab.Screen name="Filmes" component={FilmesStackNavigator} />
          <Tab.Screen name="Séries" component={SeriesStackNavigator} />
          <Tab.Screen name="Favoritos" component={FavoritosStackNavigator} />
          <Tab.Screen name="Perfil" component={PerfilStackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}