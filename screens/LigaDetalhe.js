import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { DataTable } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const LigaDetalhe = ({ route }) => {
    const [ano, setAno] = useState(2024);
    const [jornada, setJornada] = useState(1);
    const { league } = route.params || {};
    const [classificacao, setClassificacao] = useState([]);
    const [jogosJornada, setJogosJornada] = useState([]);
    const [mercadosResultados, setMercadosResultados] = useState(null);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: league ? league : 'Liga Detalhe',
        });
    }, [navigation, league]);

    useEffect(() => {
        navigation.setOptions({ title: league });
    }, [navigation, league]);

    const incrementarAno = () => setAno(ano + 1);
    const decrementarAno = () => {
        if (ano > 1) {
            setAno(ano - 1);
        }
    };

    const incrementarJornada = () => {
        if (jornada < 38) {
            setJornada(jornada + 1);
        }
    };
    const decrementarJornada = () => {
        if (jornada > 1) {
            setJornada(jornada - 1);
        }
    };

    useEffect(() => {
        const loadLeagueData = async () => {
            try {
                const leagueJson = require(`../JSON/bundesliga1.json`);
                setClassificacao(leagueJson.rows);
                setJogosJornada(leagueJson.fixtures.filter(fixture => fixture.round === jornada.toString()));
                setMercadosResultados(leagueJson);
            } catch (error) {
                console.error('Erro ao carregar os dados da liga:', error);
            }
        };

        loadLeagueData();
    }, [league, jornada]);

    const renderJogoItem = ({ item }) => {
        const [homeGoals, awayGoals] = item.ft ? item.ft.split('-').map(Number) : [null, null];

        return (
            <View style={styles.confrontoItem}>
                <Text style={[styles.equipaCasa, homeGoals > awayGoals && styles.bold]}>
                    {item.home}
                </Text>
                <Text style={styles.resultado}>{item.ft || 'vs'}</Text>
                <Text style={[styles.equipaVisitante, awayGoals > homeGoals && styles.bold]}>
                    {item.away}
                </Text>
            </View>
        );
    };

    const renderMercadoItem = (label, value) => {
        const [prefix, suffix] = label.split(':');
        return (
            <View style={styles.mercadoItem}>
                <Text>
                    <Text style={styles.bold}>{prefix}:</Text> {suffix} {value}%
                </Text>
            </View>
        );
    };

    const renderMediaItem = (label, value) => {
        const [prefix, suffix] = label.split(':');
        return (
            <View style={styles.mercadoItem}>
                <Text>
                    <Text style={styles.bold}>{prefix}:</Text> {suffix} {value}
                </Text>
            </View>
        );
    };

    const renderHeader = () => (
        <>
            <View style={styles.botoesAnoJornada}>
                <View style={styles.botaoAnoJornada}>
                    <TouchableOpacity style={styles.botao} onPress={decrementarAno}>
                        <FontAwesome5 name="chevron-left" size={16} color="#2196F3" />
                    </TouchableOpacity>
                    <Text style={styles.textoAnoJornada}>{ano}</Text>
                    <TouchableOpacity style={styles.botao} onPress={incrementarAno}>
                        <FontAwesome5 name="chevron-right" size={16} color="#2196F3" />
                    </TouchableOpacity>
                </View>
                <View style={styles.botaoAnoJornada}>
                    <TouchableOpacity style={styles.botao} onPress={decrementarJornada}>
                        <FontAwesome5 name="chevron-left" size={16} color="#2196F3" />
                    </TouchableOpacity>
                    <Text style={styles.textoAnoJornada}>{jornada}</Text>
                    <TouchableOpacity style={styles.botao} onPress={incrementarJornada}>
                        <FontAwesome5 name="chevron-right" size={16} color="#2196F3" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tabela Classificativa */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Classificação</Text>
                <View style={styles.tableContainer}>
                    <DataTable>
                        <View>
                            <DataTable.Header>
                                <DataTable.Title>#</DataTable.Title>
                                <DataTable.Title style={{ flex: 3 }}>Equipa</DataTable.Title>
                                <DataTable.Title>Pontos</DataTable.Title>
                                <DataTable.Title>Jogos</DataTable.Title>
                                <DataTable.Title>G</DataTable.Title>
                            </DataTable.Header>
                            <LinearGradient
                                colors={['#6dce83', '#0373cc']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ height: 2, width: '100%' }}
                            />
                        </View>
                        {classificacao.map((equipe, index) => (
                            <View key={index}>
                                <DataTable.Row>
                                    <DataTable.Cell>{index + 1}</DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 5 }}>{equipe.team}</DataTable.Cell>
                                    <DataTable.Cell>{equipe.points}</DataTable.Cell>
                                    <DataTable.Cell>{equipe.played}</DataTable.Cell>
                                    <DataTable.Cell>{equipe.scored}</DataTable.Cell>
                                </DataTable.Row>
                                <LinearGradient
                                    colors={['#6dce83', '#0373cc']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{ height: 2, width: '100%' }}
                                />
                            </View>
                        ))}
                    </DataTable>
                </View>
            </View>

            {/* Jogos da Jornada */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Jogos da Jornada</Text>
            </View>
        </>
    );

    const renderFooter = () => (
        <View style={styles.section}>
            <View style={styles.mercadosContainer}>
                <View style={styles.mercadoSection}>
                    <Text style={styles.mercadoSectionTitle}>Percentagem dos Mercados</Text>
                    {mercadosResultados && (
                        <View>
                            {Object.entries(mercadosResultados.goalsMarket).map(([market, percentage]) => (
                                renderMercadoItem(market, percentage)
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.mercadoSection}>
                    <Text style={styles.mercadoSectionTitle}>Média de Golos</Text>
                    {mercadosResultados && (
                        <View>
                            {Object.entries(mercadosResultados.goalsMedia).map(([type, average]) => (
                                renderMediaItem(type, average)
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.mercadoSection}>
                    <Text style={styles.mercadoSectionTitle}>Percentagem de Resultados</Text>
                    {mercadosResultados && (
                        <View>
                            {Object.entries(mercadosResultados.results).map(([result, percentage]) => (
                                renderMercadoItem(result, percentage)
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={jogosJornada}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderJogoItem}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#ffffff',
    },
    tableContainer: {
        alignItems: 'flex-start',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    botoesAnoJornada: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    botaoAnoJornada: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botao: {
        backgroundColor: '#DDE4EB',
        opacity: 0.75,
        borderRadius: 4,
        paddingVertical: 9,
        paddingHorizontal: 12,
    },
    textoBotao: {
        color: '#2196F3',
        fontWeight: 'bold'
    },
    textoAnoJornada: {
        backgroundColor: '#DDE4EB',
        padding: 8,
    },
    mercadosContainer: {
        marginTop: 10,
    },
    mercadoSection: {
        marginBottom: 20,
    },
    mercadoSectionTitle: {
        fontSize: 18, // Aumentar o tamanho do texto do título
        fontWeight: 'bold',
        marginBottom: 10,
    },
    mercadoItem: {
        marginBottom: 5,
        fontSize: 16, // Aumentar o tamanho do texto dos itens
    },
    confrontoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    equipaCasa: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
    },
    resultado: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    equipaVisitante: {
        flex: 1,
        textAlign: 'right',
        fontSize: 16,
    },
    bold: {
        fontWeight: 'bold',
    },
    separator: {
        height: 2,
        marginHorizontal: 16,
    },
});

export default LigaDetalhe;
