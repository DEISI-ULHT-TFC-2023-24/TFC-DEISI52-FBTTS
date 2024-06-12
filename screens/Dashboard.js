import React, { useState, useEffect, useContext } from "react";
import { Text, FlatList, SafeAreaView, View, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../context/AuthContext";
import JogosDeHojeButton from "../components/Geral/jogosDeHojeButton";
import { BASE_URL2 } from "../config";
import { LinearGradient } from "expo-linear-gradient";

const Dashboard = () => {
    const { userToken, userInfo } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!userInfo.token || !userInfo) {
                    console.error('Token de usuário ou userInfo não disponíveis');
                    return;
                }

                const response = await fetch(`${BASE_URL2}methods`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 403) {
                    console.error('Acesso negado: token inválido ou insuficiente.');
                    return;
                }

                const responseText = await response.text();
                const userMethods = JSON.parse(responseText);

                if (Array.isArray(userMethods)) {
                    const formattedData = userMethods.map(method => ({
                        tituloEstrategia: method.title,
                        nrJogos: method.total,
                        lucroObtido: method.profit,
                        oddMedia: method.odd.toFixed(2),
                        nrVitorias: method.wins,
                    }));

                    setData(formattedData);
                } else {
                    console.error('Resposta da API não contém dados válidos');
                }
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            }
        };

        if (userInfo.token) {
            fetchUserData();
        }
    }, [userInfo]);

    const Item = ({ item }) => {
        const { tituloEstrategia, nrJogos, nrVitorias, lucroObtido, oddMedia } = item;

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
                        <Text>Vitorias: {nrVitorias}</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text>Lucro: {lucroObtido}€</Text>
                        <Text>Odd Média: {oddMedia}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    const renderSeparator = () => (
        <LinearGradient
            colors={['#6dce83', '#0373cc']}
            style={styles.separator}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeparator}
                ListFooterComponent={renderSeparator}
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
    separator: {
        height: 2,
        width: '100%',
    },
});

export default Dashboard;
