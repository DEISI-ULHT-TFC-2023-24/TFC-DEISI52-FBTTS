import React, { useState, useEffect, useContext } from "react";
import { Text, FlatList, SafeAreaView, View, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../context/AuthContext";
import JogosDeHojeButton from "../components/Geral/jogosDeHojeButton";
import { BASE_URL2 } from "../config";

const Dashboard = () => {
    const { userToken, userInfo } = useContext(AuthContext); // Obtendo userToken e userInfo do contexto
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        console.log('User token:', userInfo.token);
        console.log('User email:', userInfo.email);
        const fetchUserData = async () => {
            try {
                if (!userInfo.token || !userInfo) {
                    console.error('Token de usuário ou userInfo não disponíveis');
                    return;
                }

                console.log('Fetching data from:', `${BASE_URL2}methods`);
                const response = await fetch(`${BASE_URL2}methods`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Response status:', response.status);

                if (response.status === 403) {
                    console.error('Acesso negado: token inválido ou insuficiente.');
                    return;
                }

                const responseText = await response.text();
                console.log('Response text:', responseText);

                const userMethods = JSON.parse(responseText);
                console.log('User methods:', userMethods);

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
    }, [userInfo]); // Adicionando userInfo como dependência do useEffect

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
