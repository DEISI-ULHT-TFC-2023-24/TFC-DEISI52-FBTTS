import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';

const LigasList = () => {
    const [leaguesData, setLeaguesData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const loadJsonData = async () => {
            try {
                const jsonData = require('../JSON/leagues.json');

                if (jsonData) {
                    const formattedData = jsonData.map(item => ({
                        id: item.id,
                        liga: item.name,
                        logo: item.logo
                    }));

                    setLeaguesData(formattedData);
                } else {
                    console.error('O arquivo JSON não foi carregado corretamente.');
                }
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            }
        };

        loadJsonData();
    }, []);

    const handleImagePress = (ligaTitle) => {
        navigation.navigate('LigaDetalhe', { league: ligaTitle });
    };
    const renderLeagueItem = ({ item, index }) => (
        <View style={[styles.leagueItem, index % 2 === 1 && styles.evenItem]}>
            <Text style={styles.countryName}>{item.liga}</Text>
            <View style={styles.leagueContainer}>
                <TouchableOpacity onPress={() => handleImagePress(item.liga)}>
                    {item.logo && (
                        <Image
                            source={{ uri: item.logo }}
                            style={styles.leagueImage}
                        />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            data={leaguesData}
            renderItem={renderLeagueItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    countryName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    leagueItem: {
        paddingVertical: 10,
    },
    evenItem: {
        backgroundColor: '#F2F2F2',
    },
    leagueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    leagueImage: {
        width: 90,
        height: 90,
        marginBottom: 8,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
});

export default LigasList;
