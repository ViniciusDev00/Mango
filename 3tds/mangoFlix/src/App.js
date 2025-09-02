// App.js

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Importe o Stack Navigator
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Importe suas telas
import TelaInicial from '../screens/TelaInicial';
import TelaFilmes from '../screens/TelaFilmes';
import TelaSeries from '../screens/TelaSeries';
import TelaFavoritos from '../screens/TelaFavoritos';
import DetalhesFilme from '../screens/DetalhesFilme'; // Importe a nova tela

const Tab = createBottomTabNavigator();
const FilmesStack = createStackNavigator(); // Crie um Stack Navigator para os Filmes

// Componente para a navegação da aba "Filmes"
function FilmesStackNavigator() {
  return (
    <FilmesStack.Navigator
      initialRouteName="FilmesTab"
      screenOptions={{ headerShown: false }} // Esconde o cabeçalho padrão da stack
    >
      {/* A primeira tela da stack é a sua TelaFilmes */}
      <FilmesStack.Screen name="FilmesTab" component={TelaFilmes} />
      {/* A segunda tela é a de detalhes, que será exibida por cima */}
      <FilmesStack.Screen name="DetalhesFilme" component={DetalhesFilme} />
    </FilmesStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        initialRouteName="Início"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#181818',
            borderTopWidth: 0,
            height: 90,
            paddingBottom: 30,
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 28;

            if (route.name === 'Início') {
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Filmes') {
              iconName = focused ? 'movie-play' : 'movie-play-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Séries') {
              iconName = focused ? 'television-play' : 'television';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Favoritos') {
              iconName = focused ? 'star' : 'star-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Início" component={TelaInicial} />
        {/* Usando o novo Stack Navigator para a aba "Filmes" */}
        <Tab.Screen name="Filmes" component={FilmesStackNavigator} />
        <Tab.Screen name="Séries" component={TelaSeries} />
        <Tab.Screen name="Favoritos" component={TelaFavoritos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}