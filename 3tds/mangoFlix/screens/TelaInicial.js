// src/screens/TelaInicial.js

import React, { useState, useRef, useEffect } from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, ScrollView, Image, FlatList, 
    TouchableOpacity, ImageBackground, Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- DADOS PARA O CARROSSEL ---
const BANNER_DATA = [
    { 
      id: '1', 
      title: 'Dragões',
      subtitle: 'NETFLIX ORIGINAL',
      image: 'https://i.pinimg.com/originals/a1/b5/0c/a1b50c008a1ba56b3b552a8b9f7c358e.jpg' // Imagem de "Como Treinar o seu Dragão"
    },
    { 
      id: '2', 
      title: 'Interestelar',
      subtitle: 'UM FILME DE CHRISTOPHER NOLAN',
      image: 'https://image.tmdb.org/t/p/original/c0DCmfAlTy2r2K9iWbCgCgSgAmN.jpg'
    },
    { 
      id: '3', 
      title: 'Duna',
      subtitle: 'UMA JORNADA ÉPICA',
      image: 'https://image.tmdb.org/t/p/original/cxevDYdeFkiixR_bBSG6BdnT55i.jpg'
    },
];

// --- DADOS PARA AS LISTAS ---
const CONTINUE_WATCHING_DATA = [
    { id: '1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s', title: 'Harry Potter' },
    { id: '2', image: 'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg', title: 'Breaking Bad' },
    { id: '3', image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg', title: 'Anime Mix' },
];

const { width: screenWidth } = Dimensions.get('window');

// --- COMPONENTES REUTILIZÁVEIS ---
const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="white" />
    </View>
);

// Componente de Pôster com o novo título estilizado
const PosterItem = ({ item }) => (
    <TouchableOpacity style={styles.posterContainer}>
        <Image source={{ uri: item.image }} style={styles.posterImage} />
        <Text style={styles.posterTitle}>{item.title}</Text>
    </TouchableOpacity>
);

// --- TELA PRINCIPAL ---
export default function TelaInicial() {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    // Efeito para auto-scroll (opcional, mas recomendado)
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % BANNER_DATA.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    const onScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / screenWidth);
        setActiveIndex(index);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* CABEÇALHO */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.logo} />
                        <Text style={styles.headerTitle}>Em alta</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Ionicons name="search-outline" size={26} color="white" style={{ marginRight: 20 }} />
                        <Ionicons name="person-circle-outline" size={28} color="white" />
                        <Ionicons name="chevron-down-outline" size={16} color="white" style={{ marginLeft: 5 }}/>
                    </View>
                </View>

                {/* CARROSSEL DE DESTAQUE */}
                <View style={styles.carouselContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={BANNER_DATA}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={onScroll}
                        renderItem={({ item }) => (
                            <View style={styles.carouselItem}>
                                <ImageBackground source={{ uri: item.image }} style={styles.carouselImage} imageStyle={{ borderRadius: 24 }}>
                                    <View style={styles.carouselOverlay}>
                                        <Text style={styles.carouselTitle}>{item.title}</Text>
                                        <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
                                        <TouchableOpacity style={styles.playButton}>
                                            <Ionicons name="play" size={20} color="black" style={{ marginRight: 8 }} />
                                            <Text style={styles.playButtonText}>Assista Agora</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            </View>
                        )}
                    />
                    <View style={styles.paginationDots}>
                        {BANNER_DATA.map((_, index) => (
                            <View key={index} style={[styles.dot, activeIndex === index ? styles.dotActive : {}]} />
                        ))}
                    </View>
                </View>

                {/* SEÇÃO CONTINUE ASSISTINDO */}
                <View style={styles.section}>
                    <SectionHeader title="Continue assistindo" />
                    <FlatList 
                        data={CONTINUE_WATCHING_DATA} 
                        renderItem={PosterItem} 
                        keyExtractor={item => item.id} 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={{ paddingLeft: 24 }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}


// --- ESTILOS ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'black' },
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 10, paddingBottom: 10 },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    logo: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FF6347' }, // Cor laranja/vermelha
    headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold', marginLeft: 12 },
    headerRight: { flexDirection: 'row', alignItems: 'center' },
    carouselContainer: { marginTop: 10, marginBottom: 30 },
    carouselItem: { width: screenWidth, paddingHorizontal: 24 },
    carouselImage: { width: '100%', height: 220, justifyContent: 'center' },
    carouselOverlay: { padding: 24, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 24 },
    carouselTitle: { color: 'white', fontSize: 36, fontWeight: 'bold' },
    carouselSubtitle: { color: 'white', fontSize: 14, fontWeight: '300', letterSpacing: 1, marginTop: 4, textTransform: 'uppercase' },
    playButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 30, alignSelf: 'flex-start', marginTop: 16 },
    playButtonText: { color: 'black', fontWeight: 'bold', fontSize: 16 },
    paginationDots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#444', marginHorizontal: 4 },
    dotActive: { backgroundColor: 'white' },
    section: { marginBottom: 30 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
    sectionTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
    posterContainer: { marginRight: 16 },
    posterImage: { width: 140, height: 210, borderRadius: 16 },
    posterTitle: { 
        color: 'white', 
        fontSize: 16, 
        marginTop: 8,
        // Tente usar uma fonte serifada se tiver uma instalada no projeto
        // fontFamily: 'SuaFonteSerifada', 
        textAlign: 'center' 
    },
});
