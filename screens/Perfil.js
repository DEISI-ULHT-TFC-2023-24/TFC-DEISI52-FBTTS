import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
    const { userInfo } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <View style={styles.section}>
                <Text style={styles.label}>Utilizador: {userInfo.username}</Text>
                <Text style={styles.label}>E-mail: {userInfo.email}</Text>
            </View>
            <LinearGradient
                colors={['#6dce83', '#0373cc']}
                style={styles.separator}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
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
        color: '#000000',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    section: {
        width: '100%',
        marginBottom: 30,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    preferencesTitle: {
        color: '#000000',
        fontSize: 28,
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
    separator: {
        height: 2,
        width: '100%',
        marginBottom: 30,
    },
});

export default ProfileScreen;
