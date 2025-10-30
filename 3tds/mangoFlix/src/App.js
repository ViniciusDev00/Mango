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
import TelaPerfil from "../screens/TelaPerfil";
import TelaBusca from "../screens/TelaBusca";

// Importe o provedor de contexto
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { UserProvider } from "./contexts/UserContext"; // <-- NOVO IMPORTADO

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stacks individuais para cada aba
function FilmesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FilmesTab" component={TelaFilmes} />
      {/* A tela de detalhes ainda fica aqui para a navegação interna da aba */}
      <Stack.Screen name="DetalhesFilme" component={DetalhesFilme} />
    </Stack.Navigator>
  );
}

function SeriesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SeriesTab" component={TelaSeries} />
      <Stack.Screen name="DetalhesSerie" component={DetalhesSerie} />
    </Stack.Navigator>
  );
}

function FavoritosStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoritosTab" component={TelaFavoritos} />
      <Stack.Screen name="DetalhesFilme" component={DetalhesFilme} />
      <Stack.Screen name="DetalhesSerie" component={DetalhesSerie} />
    </Stack.Navigator>
  );
}

function InicioStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InicioTab" component={TelaInicial} />
      <Stack.Screen name="DetalhesFilme" component={DetalhesFilme} />
      <Stack.Screen name="DetalhesSerie" component={DetalhesSerie} />
    </Stack.Navigator>
  );
}

function PerfilStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PerfilTab" component={TelaPerfil} />
    </Stack.Navigator>
  );
}

// Componente com a navegação por abas
function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Início"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#181818",
          borderTopWidth: 0,
          height: 70,          // altura um pouco menor
          paddingBottom: 15,   // espaçamento inferior equilibrado
          paddingTop: 10,
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
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === "Séries") {
            iconName = focused ? "television-play" : "television";
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
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
  );
}

// Estrutura principal do App
export default function App() {
  return (
    <UserProvider> {/* <-- CORREÇÃO: UserProvider deve envolver tudo */}
      <FavoritesProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="TelaBusca" component={TelaBusca} />
            {/* CORREÇÃO APLICADA AQUI */}
            <Stack.Screen name="DetalhesFilme" component={DetalhesFilme} />
            <Stack.Screen name="DetalhesSerie" component={DetalhesSerie} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </UserProvider>
  );
}