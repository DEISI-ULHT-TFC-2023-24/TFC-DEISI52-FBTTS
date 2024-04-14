import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import oviedoData from '../../JSON/match.json';

const EstatisticasGolosListaJogos = () => {
    const [showHomeStats, setShowHomeStats] = useState(true);
    const [verUltimosJogos, setVerUltimosJogos] = useState(true);

    const toggleStats = () => {
        setShowHomeStats(!showHomeStats);
    };

    const handleVerUltimosJogos = () => {
        setVerUltimosJogos(true);
        setShowHomeStats(true);
    };

    const handleVerJogosCasaFora = () => {
        setVerUltimosJogos(false);
        setShowHomeStats(false);
    };

    const selectedStats = {
        'Over 0.5 HT': {
            Home: 'Home Over 0.5 HT',
            Away: 'Away Over 0.5 HT',
            Global: 'Global Over 0.5 HT',
        },
        'Over 1.5': {
            Home: 'Home Over 1.5',
            Away: 'Away Over 1.5',
            Global: 'Global Over 1.5',
        },
        'Over 2.5': {
            Home: 'Home Over 2.5',
            Away: 'Away Over 2.5',
            Global: 'Global Over 2.5',
        },
        'Under 0.5 HT': {
            Home: 'Home Under 0.5 HT',
            Away: 'Away Under 0.5 HT',
            Global: 'Global Under 0.5 HT',
        },
        'Under 1.5': {
            Home: 'Home Under 1.5',
            Away: 'Away Under 1.5',
            Global: 'Global Under 1.5',
        },
        'Under 2.5': {
            Home: 'Home Under 2.5',
            Away: 'Away Under 2.5',
            Global: 'Global Under 2.5',
        },
        'Btts': {
            Home: 'Home Btts',
            Away: 'Away Btts',
            Global: 'Global Btts',
        },
    };

    const goalsData = showHomeStats ? oviedoData.homeGoals : oviedoData.awayGoals;
    const teamName = showHomeStats ? oviedoData.home.name : oviedoData.away.name;

    const renderJogoItem = ({ item }) => (
        <View style={styles.jogoItem}>
            <Text style={styles.jogoText}>{`${item.home} ${item.ft} ${item.away}`}</Text>
        </View>
    );

    let jogosFiltrados = verUltimosJogos
        ? showHomeStats
            ? oviedoData.homeResultsLast10
            : oviedoData.awayResultsLast10
        : showHomeStats
            ? oviedoData.homeResults
            : oviedoData.awayResults;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Últimos Jogos do ${teamName}`}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, verUltimosJogos ? styles.selectedButton : null]}
                    onPress={handleVerUltimosJogos}
                >
                    <Text style={styles.buttonText}>Casa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, !verUltimosJogos ? styles.selectedButton : null]}
                    onPress={handleVerJogosCasaFora}
                >
                    <Text style={styles.buttonText}>Visitante</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={jogosFiltrados}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderJogoItem}
                ListEmptyComponent={<Text>Nenhum jogo disponível.</Text>}
            />
            <Text style={styles.title}>Estatísticas de Golos</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={[styles.cell, styles.headerCell]}></Text>
                    <Text style={[styles.cell, styles.headerCell]}>Home</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Away</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Global</Text>
                </View>
                {Object.entries(selectedStats).map(([key, keys]) => (
                    <View key={key} style={styles.row}>
                        <Text style={styles.cell}>{key}</Text>
                        <Text style={styles.cell}>{goalsData[keys.Home]}%</Text>
                        <Text style={styles.cell}>{goalsData[keys.Away]}%</Text>
                        <Text style={styles.cell}>{goalsData[keys.Global]}%</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 16,
    },
    table: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingVertical: 10,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
    headerCell: {
        fontWeight: 'bold',
    },
    toggleButton: {
        backgroundColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 10,
        marginBottom: 16,
        alignItems: 'center',
    },
    toggleButtonText: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#2196f3',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    },
    selectedButton: {
        backgroundColor: '#2196f3',
    },
    jogoItem: {
        marginBottom: 8,
    },
    jogoText: {
        textAlign: 'center',
    },
});

export default EstatisticasGolosListaJogos;
