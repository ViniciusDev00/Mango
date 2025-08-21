// Exemplo para src/screens/TelaSeries.js (faça o mesmo para TelaFavoritos)
import { View, Text, StyleSheet } from 'react-native';

export default function TelaSeries() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Séries</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});