import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import oviedoData from '../../JSON/match.json';

const GameInfo = () => {
    const { match, home, away } = oviedoData;

    return (
        <View style={styles.container}>
            <View style={styles.teamContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://media.api-sports.io/football/teams/35.png' }}
                    defaultSource={require('../../assets/br.png')}
                />
                <Text style={styles.teamName}>{home.name}</Text>
            </View>
            <Text style={styles.vsText}>{match.ft ? match.ft : 'Vs'}</Text>
            <View style={styles.teamContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://media.api-sports.io/football/teams/52.png' }}
                    defaultSource={require('../../assets/br.png')}
                />
                <Text style={styles.teamName}>{away.name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#ffffff',
    },
    teamContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    teamName: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    vsText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default GameInfo;
