import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL2 } from '../config';

const CustomDrawerHeader = () => {
    const { userInfo, updateUserClicks } = useContext(AuthContext);

    const fetchCliques = async () => {
        try {
            const response = await axios.get(`${BASE_URL2}${userInfo.email}/cliques`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            const fetchedClicks = response.data;
            updateUserClicks(fetchedClicks);
        } catch (error) {
            console.error('Erro ao buscar cliques do usuário:', error);
        }
    };

    useEffect(() => {
        fetchCliques();
    }, []);

    return (
        <TouchableOpacity style={styles.headerContainer}>
            <View style={styles.imageContainer}>
                <Text style={styles.iconText}>{userInfo.username[0].toUpperCase()}</Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.username}>{userInfo.username}</Text>
                <View style={styles.cliquesContainer}>
                    <Text style={styles.cliquesText}>{userInfo.clicks}</Text>
                    <Image
                        source={require('../assets/football.png')}
                        style={styles.cliquesIcon}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Center the content horizontally
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    imageContainer: {
        backgroundColor: '#abdbe3',
        borderRadius: 30,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    iconText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    userInfo: {
        flexDirection: 'column',
        alignItems: 'center', // Center the user info vertically
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff',
    },
    cliquesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cliquesText: {
        fontSize: 16,
        marginRight: 5,
        color: '#fff',
        fontWeight: 'bold',
    },
    cliquesIcon: {
        width: 14,
        height: 14,
        tintColor: '#fff',
    },
});

export default CustomDrawerHeader;
