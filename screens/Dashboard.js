import React, { useState, useEffect } from "react";
import { Text, FlatList, SafeAreaView, View, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from '@react-navigation/native';
import JogosDeHojeButton from "../components/Geral/jogosDeHojeButton";

const Dashboard = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const loadJsonData = async () => {
            try {
                const jsonData = require('../JSON/matches_strat.json');

                const matches = jsonData.response.matches;

                const totalJogos = matches.length;
                const totalApostas = matches.reduce((total, match) => {
                    const count = parseInt(match.count);
                    return count ? total + count : total;
                }, 25);

                const lucroTotal = matches.reduce((total, match) => {
                    const profit = parseInt(match.profit);
                    return profit ? total + profit : total;
                }, 37);

                const oddMedia = matches.reduce((total, match) => {
                    const odd = parseFloat(match.odd);
                    return odd ? total + odd : total;
                }, 0) / totalJogos;


                const strategyData = { //feito
                    tituloEstrategia: "Both teams to score",
                    nrJogos: totalJogos,
                    nrApostas: totalApostas,
                    lucroObtido: lucroTotal,
                    oddMedia: oddMedia.toFixed(2),
                    nrVitorias: 13,
                    jogos: jsonData.response.matches.map(match => ({
                        id: match.id,
                        country: match.country,
                        flag: match.flag,
                        league: match.league,
                        match: `${match.home} vs ${match.away}`,
                    }))
                };

                setData([strategyData]);
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            }
        };

        loadJsonData();
    }, []);


    const Item = ({ item }) => {
        const { tituloEstrategia, nrJogos, nrApostas, lucroObtido, oddMedia } = item;

        return (
            <TouchableHighlight
                style={styles.itemContainer}
                underlayColor="#DDDDDD"
                onPress={() => {
                    navigation.navigate('VerEstrategia', {
                        strategyData: item
                    });
                }}
            >
                <View>
                    <Text style={styles.titulo}>{tituloEstrategia}</Text>
                    <View style={styles.dataContainer}>
                        <Text>Jogos: {nrJogos}</Text>
                        <Text>Apostas: {nrApostas}</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text>Lucro: {lucroObtido}€</Text>
                        <Text>Odd Média: {oddMedia}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{ backgroundColor: 'gray', height: 1 }} />}
            />
            <View style={styles.buttonContainer}>
                <JogosDeHojeButton />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        padding: 5,
        alignItems: 'center',
        marginTop: 20,
    },
});

export default Dashboard;
