import { StyleSheet, TextInput } from "react-native";
import React from "react";

const CustomTextBox = ({ placeholder, value, onChangeText, height }) => {
    return (
        <TextInput
            style={[styles.textBox, { height }]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            multiline
            textAlignVertical="top"
            numberOfLines={5}
        />
    );
};

export default CustomTextBox;

const styles = StyleSheet.create({
    textBox: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 10, // Adjust the padding to move placeholder text
        marginBottom: 20,
    },
});
