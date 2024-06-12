import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AuthContext } from "../context/AuthContext";

const ProfileScreen = () => {
    const { userInfo } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.section}>
                <Text style={styles.label}>Nome do Utilizador: {userInfo.username}</Text>
                <Text style={styles.label}>E-mail: {userInfo.email}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Preferências</Text>
                <View style={styles.preferenceItem}>
                    <Text style={styles.label}>Idioma:</Text>
                    <Image
                        source={require('../assets/pt.png')}
                        style={styles.flag}
                    />
                </View>
                <View style={styles.preferenceItem}>
                    <Text style={styles.preferenceLabel}>Moeda:</Text>
                    <Text style={styles.currency}>€</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0373cc',
        marginBottom: 20,
    },
    section: {
        width: '100%',
        marginBottom: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    preferencesTitle: {
        color: '#0373cc',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    preferenceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    preferenceLabel: {
        fontSize: 18,
        marginRight: 10,
    },
    flag: {
        width: 30,
        height: 20,
        marginLeft: 3,
    },
    currency: {
        fontSize: 18,
    },
});

export default ProfileScreen;
