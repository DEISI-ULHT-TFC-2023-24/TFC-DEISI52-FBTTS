import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { AuthContext } from "../context/AuthContext";
import { BASE_URL2 } from "../config";

const LigasList = () => {
    const { userInfo } = useContext(AuthContext);
    const [leaguesData, setLeaguesData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchLeaguesData = async () => {
            try {
                if (!userInfo.token) {
                    console.error('Token de usuário não disponível');
                    return;
                }

                console.log('Fetching data from:', `${BASE_URL2}leagues`);
                const response = await fetch(`${BASE_URL2}leagues`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Response status:', response.status);

                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados das ligas');
                }

                const jsonData = await response.json();
                setLeaguesData(jsonData);
            } catch (error) {
                console.error('Erro ao carregar os dados das ligas:', error);
            }
        };

        fetchLeaguesData();
    }, [userInfo.token]);

    const handleImagePress = (ligaTitle) => {
        navigation.navigate('LigaDetalhe', { league: ligaTitle });
    };

    const renderLeagueItem = ({ item, index }) => (
        <View style={[styles.leagueItem, index % 2 === 1 && styles.evenItem]}>
            <Text style={styles.countryName}>{item.name}</Text>
            <View style={styles.leagueContainer}>
                <TouchableOpacity onPress={() => handleImagePress(item.name)}>
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
