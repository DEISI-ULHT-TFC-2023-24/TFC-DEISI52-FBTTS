import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import oviedoData from '../../JSON/match.json';

const ConfrontosDiretos = () => {
    const { h2h } = oviedoData;

    const renderConfrontoItem = ({ item }) => (
        <View style={styles.confrontoItem}>
            <Text>{`${item.home} ${item.ft} ${item.away}`}</Text>
        </View>
    );

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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    confrontoItem: {
        marginBottom: 8,
        alignItems: "center"
    },
});

export default ConfrontosDiretos;
