// src/screens/TelaInicial.js

import React, { useState, useRef, useEffect } from 'react';
import { 
    View, Text, StyleSheet, SafeAreaView, ScrollView, Image, FlatList, 
    TouchableOpacity, ImageBackground, Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- DADOS ATUALIZADOS PARA O CARROSSEL COM SEUS LINKS ---
const BANNER_DATA = [
    { 
      id: '1', 
      title: 'Beleza Oculta', // Título de exemplo
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZb38aW5wedCsi5abVr7uJczSn7m4bfBpNQ&s'
    },
    { 
      id: '2', 
      title: 'Aladdin', // Título de exemplo
      image: 'https://i.pinimg.com/236x/0f/00/4f/0f004fb72d1365665f8fffa43e821a0b.jpg'
    },
    { 
      id: '3', 
      title: 'The Batman', // Título de exemplo
      image: 'https://files.tecnoblog.net/wp-content/uploads/2022/04/batman.jpg'
    },
];

// Largura da tela para o cálculo do carrossel
const { width: screenWidth } = Dimensions.get('window');

// --- DADOS MOCK (sem alteração) ---
const CONTINUE_WATCHING_DATA = [
    { id: '1', image: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', progress: 0.7 },
    { id: '2', image: 'https://image.tmdb.org/t/p/w500/nCbkIeInCF4kP4i2m22d712e1gA.jpg', progress: 0.2 },
    { id: '3', image: 'https://image.tmdb.org/t/p/w500/qZtAf4Z1QZkUaZFVMGaIZT3gV2.jpg', progress: 0.9 },
    { id: '4', image: 'https://image.tmdb.org/t/p/w500/A2YlI1iYhGg2gJgS4i2J1aYkoB8.jpg', progress: 0.4 },
];
const RELEASES_DATA = [
    { id: '1', image: 'https://image.tmdb.org/t/p/w500/y2Aimt8isimtigec3e4kB2GkUy.jpg' },
    { id: '2', image: 'https://image.tmdb.org/t/p/w500/kk99aBllVzIXK5dCF39vL23T2w0.jpg' },
    { id: '3', image: 'https://image.tmdb.org/t/p/w500/2GhcgTFuRSzJ6n2aD52ALR4cmE8.jpg' },
    { id: '4', image: 'https://image.tmdb.org/t/p/w500/bWJ0BsNirt5a4g2l2rWgD3n0k4S.jpg' },
];
const RECOMMENDED_DATA = [
    { id: '1', image: 'https://image.tmdb.org/t/p/w500/6V1t3AXlvu3YroS3z31wzH5a0LS.jpg' },
    { id: '2', image: 'https://image.tmdb.org/t/p/w500/sN6wZWCiVpbiD3s0WcTslIqBSsI.jpg' },
    { id: '3', image: 'https://image.tmdb.org/t/p/w500/iGZX91hIqM9Uu0v3DOIhMxgRCl9.jpg' },
    { id: '4', image: 'https://image.tmdb.org/t/p/w500/8YNN55UGQdAS22fdg22CmMKff3e.jpg' },
];
const TRENDING_NOW_DATA = [
    { id: '1', image: 'https://image.tmdb.org/t/p/w500/z0DAKMC0B6vK5c8i2s0eS0gH2v2.jpg' },
    { id: '2', image: 'https://image.tmdb.org/t/p/w500/dDlEsimQ8h2LSNYH3n1a87gxcGN.jpg' },
    { id: '3', image: 'https://image.tmdb.org/t/p/w500/6X2Lpa23a3y4iY4T2w0dKcuy8Rq.jpg' },
    { id: '4', image: 'https://image.tmdb.org/t/p/w500/9A1JSqZAmXreEWHUv7cSze6LSma.jpg' },
];

// --- COMPONENTES REUTILIZÁVEIS ---
const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons name="chevron-forward-outline" size={22} color="gray" />
    </View>
);
const ContinueWatchingItem = ({ item }) => (
    <TouchableOpacity style={styles.posterContainer}>
        <Image source={{ uri: item.image }} style={styles.posterImage} />
        <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${item.progress * 100}%` }]} />
        </View>
    </TouchableOpacity>
);
const PosterItem = ({ item }) => (
    <TouchableOpacity style={styles.posterContainer}>
        <Image source={{ uri: item.image }} style={styles.posterImage} />
    </TouchableOpacity>
);

// --- TELA PRINCIPAL ---
export default function TelaInicial() {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % BANNER_DATA.length;
            
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
            setActiveIndex(nextIndex);
        }, 4000);

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
                    <Image source={require('../img/manga-removebg-preview.png')} style={styles.logo}/>
                    <View style={styles.headerIcons}>
                        <Ionicons name="search-outline" size={26} color="white" style={{ marginRight: 15 }} />
                        <Ionicons name="person-circle-outline" size={28} color="white" />
                    </View>
                </View>

                {/* CARROSSEL DE DESTAQUE */}
                <View style={styles.bannerContainer}>
                    <Text style={styles.sectionTitleBanner}>Em alta</Text>
                    <FlatList
                        ref={flatListRef}
                        data={BANNER_DATA}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={onScroll}
                        renderItem={({ item }) => (
                            <View style={styles.bannerItem}>
                                <ImageBackground source={{ uri: item.image }} style={styles.bannerImage} imageStyle={{ borderRadius: 12 }}>
                                    <View style={styles.bannerOverlay}>
                                        <Text style={styles.bannerTitle}>{item.title}</Text>
                                        <Text style={styles.bannerSubtitle}>TRAILER OFICIAL</Text>
                                        <TouchableOpacity style={styles.watchButton}>
                                            <Text style={styles.watchButtonText}>Assista Agora</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            </View>
                        )}
                    />
                    {/* Indicadores de página (pontos) dinâmicos */}
                    <View style={styles.paginationDots}>
                        {BANNER_DATA.map((_, index) => (
                            <View key={index} style={[styles.dot, activeIndex === index ? styles.dotActive : {}]} />
                        ))}
                    </View>
                </View>

                {/* OUTRAS SEÇÕES */}
                <View style={styles.section}><SectionHeader title="Continue assistindo" /><FlatList data={CONTINUE_WATCHING_DATA} renderItem={ContinueWatchingItem} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16 }} /></View>
                <View style={styles.section}><SectionHeader title="Lançamentos" /><FlatList data={RELEASES_DATA} renderItem={PosterItem} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16 }} /></View>
                <View style={styles.section}><SectionHeader title="Recomendado para Você" /><FlatList data={RECOMMENDED_DATA} renderItem={PosterItem} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16 }} /></View>
                <View style={styles.section}><SectionHeader title="Em Alta Agora" /><FlatList data={TRENDING_NOW_DATA} renderItem={PosterItem} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16 }} /></View>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#121212' },
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10 },
    logo: { width: 35, height: 35 },
    headerIcons: { flexDirection: 'row', alignItems: 'center' },
    bannerContainer: { marginTop: 10, marginBottom: 15 },
    sectionTitleBanner: { fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 12, paddingHorizontal: 16 },
    bannerItem: { width: screenWidth, paddingHorizontal: 16 },
    bannerImage: { width: '100%', height: 200, justifyContent: 'flex-end' },
    bannerOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', padding: 12, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
    bannerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    bannerSubtitle: { color: 'white', fontSize: 14, fontWeight: '300', letterSpacing: 1, marginTop: 4 },
    watchButton: { backgroundColor: 'rgba(255, 255, 255, 0.9)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, alignSelf: 'flex-start', marginTop: 12 },
    watchButtonText: { color: 'black', fontWeight: 'bold' },
    paginationDots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'gray', marginHorizontal: 4 },
    dotActive: { backgroundColor: 'white' },
    section: { marginTop: 25, paddingBottom: 5 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
    sectionTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    posterContainer: { marginRight: 10 },
    posterImage: { width: 120, height: 180, borderRadius: 8 },
    progressBarBackground: { height: 4, backgroundColor: '#404040', borderRadius: 2, marginTop: -4, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: '#E50914' },
});
