import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const JogosDeHojeButton = () => {
    const navigation = useNavigation();

    const handleNavigateToJogos = () => {
        navigation.navigate('Jogos'); // Replace 'Jogos' with the correct screen name
    };

    return (
        <Button
            icon="soccer"
            mode="contained"
            onPress={handleNavigateToJogos} // Use the navigation function
            style={styles.button}
            labelStyle={styles.label}
            contentStyle={styles.content}
        >
            Jogos de Hoje
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#19D895',
    },
    label: {
        color: '#ffffff',
        fontSize: 16,
    },
    content: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
});

export default JogosDeHojeButton;
