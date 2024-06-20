import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL2 } from '../../config';
import { AuthContext } from '../../context/AuthContext';

const JogosDeHojeButton = () => {
    const navigation = useNavigation();
    const { userInfo, updateUserClicks } = useContext(AuthContext);

    const handleNavigateToJogos = async () => {
        try {
            const email = userInfo.email;
            const token = userInfo.token;
            const response = await axios.post(`${BASE_URL2}${email}/decrement-clicks`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const updatedClicks = response.data; // Assumindo que a resposta contenha apenas o número atualizado de cliques
                updateUserClicks(updatedClicks);
            }
            navigation.navigate('Jogos');
        } catch (error) {
            console.error('Erro ao diminuir cliques do usuário:', error);
        }
    };

    return (
        <Button
            icon="soccer"
            mode="contained"
            onPress={handleNavigateToJogos}
            style={styles.button}
            labelStyle={styles.label}
            contentStyle={styles.content}
        >
            Jogos de Hoje
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        bottom: 10,
        borderRadius: 4,
        backgroundColor: '#19D895',
    },
    label: {
        color: '#ffffff',
        fontSize: 16,
    },
    content: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
});

export default JogosDeHojeButton;
