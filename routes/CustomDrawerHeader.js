import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getCliques, getUserData } from '../services/auth';
import {AuthContext} from "../context/AuthContext";

const CustomDrawerHeader = () => {
    const { userInfo } = useContext(AuthContext)
    const [userInitials, setUserInitials] = useState('');
    const [cliques, setCliques] = useState(0);

    useEffect(() => {
        fetchCliques();
    }, []);

    const fetchCliques = async () => {
        const userCliques = await getCliques();
        if (userCliques !== null) {
            setCliques(userCliques);
        }
    };

    return (
        <TouchableOpacity style={styles.headerContainer}>
            {/* Imagem com a inicial do usuário */}
            <View style={styles.imageContainer}>
                <Text style={styles.iconText}>{userInfo.username[0].toUpperCase()}</Text>
            </View>

            {/* Nome de usuário */}
            <View style={styles.userInfo}>
                <Text style={styles.username}>{userInfo.username}</Text>
                {/* Cliques */}
                <View style={styles.cliquesContainer}>
                    <Text style={styles.cliquesText}>{cliques}</Text>
                    <Image
                        source={require('../assets/golo.png')} // Adicione o ícone desejado para os cliques
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
        fontSize: 14,
        marginRight: 5,
        color: '#fff',
        fontWeight: 'bold',
    },
    cliquesIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff',
    },
});

export default CustomDrawerHeader;
