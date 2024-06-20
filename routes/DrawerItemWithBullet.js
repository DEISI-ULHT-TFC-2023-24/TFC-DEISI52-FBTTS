import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DrawerItemWithBullet = ({ label, onPress, labelStyle }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.bulletContainer}>
                <View style={styles.bullet} />
            </View>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginLeft: '15%',
    },
    bulletContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        color: '#fff',
    },
});

export default DrawerItemWithBullet;
