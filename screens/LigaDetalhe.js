import React, {useState, useEffect, useLayoutEffect} from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation

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
            title: league ? league : 'Liga Detalhe', // Set the title to league name if available, otherwise set a default title
        });
    }, [navigation, league]);

    useEffect(() => {
        navigation.setOptions({ title: league });
    }, [navigation, league]);


    const incrementarAno = () => setAno(ano + 1);
    const decrementarAno = () => {
        if (ano > 1){
            setAno(ano - 1);
        }
    }

    const incrementarJornada = () => {
        if (jornada < 38) {
            setJornada(jornada + 1);
        }
    }
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

    return (
        <ScrollView style={styles.container}>
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
                        <DataTable.Header>
                            <DataTable.Title>#</DataTable.Title>
                            <DataTable.Title style={{ flex: 3 }}>Equipa</DataTable.Title>
                            <DataTable.Title>Pontos</DataTable.Title>
                            <DataTable.Title>Jogos</DataTable.Title>
                            <DataTable.Title>G</DataTable.Title>
                        </DataTable.Header>
                        {classificacao.map((equipe, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>{index + 1}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 5 }}>{equipe.team}</DataTable.Cell>
                                <DataTable.Cell>{equipe.points}</DataTable.Cell>
                                <DataTable.Cell>{equipe.played}</DataTable.Cell>
                                <DataTable.Cell>{equipe.scored}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </View>
            </View>

            {/* Jogos da Jornada */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Jogos da Jornada</Text>
                {jogosJornada.map((jogo, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        {/* Verifica se o jogo já aconteceu e exibe o resultado */}
                        {jogo.ft !== null ? (
                            <Text>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {jogo.home} {jogo.ft}
                                </Text>{" "}
                                <Text>{jogo.away}</Text>
                            </Text>
                        ) : (
                            <Text>{jogo.home} vs {jogo.away}</Text>
                        )}
                    </View>
                ))}
            </View>

            {/* Mercados e Resultados */}
            <View style={styles.section}>
                <View style={styles.mercadosContainer}>
                    {/* Percentagem dos Mercados */}
                    <View style={styles.mercadoSection}>
                        <Text style={styles.mercadoSectionTitle}>Percentagem dos Mercados</Text>
                        {mercadosResultados && (
                            <View>
                                {Object.entries(mercadosResultados.goalsMarket).map(([market, percentage]) => (
                                    <View key={market} style={styles.mercadoItem}>
                                        <Text>{market}: {percentage}%</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Média de Golos */}
                    <View style={styles.mercadoSection}>
                        <Text style={styles.mercadoSectionTitle}>Média de Golos</Text>
                        {mercadosResultados && (
                            <View>
                                {Object.entries(mercadosResultados.goalsMedia).map(([type, average]) => (
                                    <View key={type} style={styles.mercadoItem}>
                                        <Text>{type}: {average}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Percentagem de Resultados */}
                    <View style={styles.mercadoSection}>
                        <Text style={styles.mercadoSectionTitle}>Percentagem de Resultados</Text>
                        {mercadosResultados && (
                            <View>
                                {Object.entries(mercadosResultados.results).map(([result, percentage]) => (
                                    <View key={result} style={styles.mercadoItem}>
                                        <Text>{result}: {percentage}%</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </View>


        </ScrollView>
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
        fontWeight: 'bold'// Cor do texto do botão
    },
    textoAnoJornada: {
        backgroundColor: '#DDE4EB', // Cor de fundo
        padding: 8, // Espaçamento interno
    },
    mercadosContainer: {
        marginTop: 10,
    },
    mercadoSection: {
        marginBottom: 20,
    },
    mercadoSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    mercadoItem: {
        marginBottom: 5,
    },
});

export default LigaDetalhe;
