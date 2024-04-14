import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const SubmeterButton = () => (
    <Button
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={[styles.button, { borderRadius: 4 }]} // Set borderRadius to 0
        labelStyle={styles.label}
        contentStyle={styles.content}
    >
        Submeter
    </Button>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2196F3',
    },
    label: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default SubmeterButton;
