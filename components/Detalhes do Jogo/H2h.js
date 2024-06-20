import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import oviedoData from '../../JSON/match.json';

const ConfrontosDiretos = () => {
    const { h2h } = oviedoData;

    const renderConfrontoItem = ({ item }) => {
        const [homeGoals, awayGoals] = item.ft.split('-').map(Number);

        return (
            <View style={styles.confrontoItem}>
                <Text style={[styles.equipaCasa, homeGoals > awayGoals && styles.bold]}>
                    {item.home}
                </Text>
                <Text style={styles.resultado}>{item.ft}</Text>
                <Text style={[styles.equipaVisitante, awayGoals > homeGoals && styles.bold]}>
                    {item.away}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confrontos Diretos</Text>
            {h2h.length > 0 ? (
                <FlatList
                    data={h2h}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderConfrontoItem}
                />
            ) : (
                <Text>Nenhum confronto disponível.</Text>
            )}
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
    confrontoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    equipaCasa: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16, // Aumentar o tamanho do texto
    },
    resultado: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16, // Aumentar o tamanho do texto
    },
    equipaVisitante: {
        flex: 1,
        textAlign: 'right',
        fontSize: 16, // Aumentar o tamanho do texto
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default ConfrontosDiretos;
