import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();


import TelaInicial from '../screens/TelaInicial';

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="TelaInicial"
        screenOptions={{
          headerShown: false
        }}
      >
        <Drawer.Screen name="TelaInicial" component={TelaInicial}>
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
