import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

// Componente customizado para adicionar um bullet antes do texto
const DrawerItemWithBullet = ({ label, onPress, labelStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
            <View style={styles.bullet} />
            <Text style={[styles.drawerItemText, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ffffff',
        marginRight: 10,
    },
    drawerItemText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default DrawerItemWithBullet;
