import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import JogosDeHojeButton from "../components/Geral/jogosDeHojeButton";
import jogosData from "../JSON/matches.json";

const VerEstrategia = ({ route }) => {
    const navigation = useNavigation();
    const { strategyData } = route.params;

    const [loading, setLoading] = useState(true);
    const [jogosVisiveis, setJogosVisiveis] = useState([]);
    const [ligas, setLigas] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: strategyData.tituloEstrategia,
        });
    }, [navigation, strategyData]);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = () => {
        try {
            setJogosVisiveis(jogosData);
            extractLeagues(jogosData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching matches:', error);
            setLoading(false);
        }
    };

    const extractLeagues = (matches) => {
        const newLeagues = matches.map(match => match.league);
        const uniqueLeagues = [...new Set(newLeagues)];
        setLigas(uniqueLeagues);
    };

    const handleGamePress = (item) => {
        navigation.replace('JogoDetalhe', { gameData: item });
    };

    const renderJogos = ({ item }) => {
        let flagSource;
        switch (item.country) {
            case 'England':
                flagSource = require('../assets/gb.png');
                break;
            case 'Brazil':
                flagSource = require('../assets/br.png');
                break;
            case 'Portugal':
                flagSource = require('../assets/pt.png');
                break;
            case 'Spain':
                flagSource = require('../assets/es.png');
                break;
            case 'Germany':
                flagSource = require('../assets/de.png');
                break;
            case 'France':
                flagSource = require('../assets/fr.png');
                break;
            case 'Italy':
                flagSource = require('../assets/it.png');
                break;
            default:
                break;
        }

        return (
            <TouchableOpacity onPress={() => handleGamePress(item)}>
                <View style={styles.card}>
                    <View style={styles.listItem}>
                        <View style={styles.column}>
                            <Image
                                style={[styles.flag, { width: 32, height: 17 }]}
                                source={flagSource}
                            />
                            <Text>{item.country}</Text>
                        </View>
                        <View style={[styles.column, { justifyContent: 'center' }]}>
                            <Text>{item.match}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.estrategiaInfo}>
                <Text style={styles.infoText}><Text style={styles.boldText}>Lucro:</Text> {strategyData.lucroObtido}€</Text>
                <Text style={styles.infoText}><Text style={styles.boldText}>Jogos/Apostas:</Text> {strategyData.nrJogos}/{strategyData.nrVitorias}</Text>
                <Text style={styles.infoText}><Text style={styles.boldText}>Ligas:</Text> {ligas.join(', ')}</Text>
            </View>
            <FlatList
                data={jogosVisiveis}
                renderItem={renderJogos}
                keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.buttonContainer}>
                <JogosDeHojeButton />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    boldText: {
        fontWeight: 'bold',
    },
    infoText: {
        marginBottom: 4,
        fontSize: 16,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        width: 30,
        height: 20,
        marginRight: 8,
    },
    loadingText: {
        textAlign: 'center',
        marginVertical: 10,
    },
    buttonContainer: {
        padding: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    estrategiaInfo: {
        paddingVertical: 16,
    },
});

export default VerEstrategia;
