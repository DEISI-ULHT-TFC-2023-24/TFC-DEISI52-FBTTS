import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const VoltarButton = () => (
    <Button
        mode="outlined"
        onPress={() => console.log('Pressed')}
        style={[styles.button, { borderRadius: 4 }]} // Set borderRadius to 0
        labelStyle={styles.label}
        contentStyle={styles.content}
    >
        Voltar
    </Button>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ffffff',
    },
    label: {
        color: '#000000',
        fontSize: 16,
    },
});

export default VoltarButton;
