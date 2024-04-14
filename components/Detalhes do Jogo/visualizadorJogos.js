import React from 'react';
import { View, StyleSheet } from 'react-native';
import ListaJogos from './ListaJogos';

const VisualizadorJogos = () => {
    return (
        <View style={styles.container}>
            <ListaJogos />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default VisualizadorJogos;
