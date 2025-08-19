import {View, Text, StyleSheet } from "react-native";

export default function TelaInicial(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Nosso conteudo da inteface</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "bluesky",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    },
});