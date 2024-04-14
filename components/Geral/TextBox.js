import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const TextBox = ({ placeholder, onChangeText, value, numberOfLines, height }) => {
    return (
        <TextInput
            style={[styles.textBox, { height }]} // Adiciona a propriedade height dinamicamente
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            multiline={true}
            numberOfLines={numberOfLines}
            textAlignVertical={'top'}
        />
    );
};

const styles = StyleSheet.create({
    textBox: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10, // Define a borda arredondada
        marginBottom: 16,
        padding: 8,
        paddingHorizontal: 12, // Adiciona espaço horizontal
    },
});

export default TextBox;
