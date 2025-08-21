// App.js

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Importe os ícones

// Importe suas telas
import TelaInicial from '../screens/TelaInicial';
import TelaFilmes from '../screens/TelaFilmes';
import TelaSeries from '../screens/TelaSeries';
import TelaFavoritos from '../screens/TelaFavoritos';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        initialRouteName="Início"
        screenOptions={({ route }) => ({
          headerShown: false, // Esconde o cabeçalho branco padrão
          tabBarStyle: {
            backgroundColor: '#181818', // Cor de fundo da barra
            borderTopWidth: 0, // Remove a linha de cima
            height: 90, // Altura da barra
            paddingBottom: 30, // Espaçamento inferior para o texto
          },
          tabBarActiveTintColor: 'white', // Cor do ícone e texto ativos
          tabBarInactiveTintColor: 'gray', // Cor do ícone e texto inativos

          // Função que define qual ícone usar para cada aba
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 28; // Define um tamanho padrão maior para os ícones

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
        <Tab.Screen name="Filmes" component={TelaFilmes} />
        <Tab.Screen name="Séries" component={TelaSeries} />
        <Tab.Screen name="Favoritos" component={TelaFavoritos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}