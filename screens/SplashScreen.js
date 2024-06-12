import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = ({ navigation }) => {
    const handleStart = () => {
        navigation.navigate('Login');
    };

    return (
        <LinearGradient
            colors={['#6dce83', '#0373cc']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/fbttsLogo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Football BeTTing Strategies</Text>
            </View>
            <View style={styles.middleContainer}>
                <Image
                    source={require('../assets/splashscreenFBTTS.png')}
                    style={styles.middleImage}
                />
                <Image
                    source={require('../assets/splashscreenFBTTS2.png')}
                    style={styles.middleImage}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        top: 50,
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: 145,
        height: 30,
        marginVertical: 10,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 35,
    },
    middleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
        marginTop: 150,
    },
    middleImage: {
        width: 155,
        height: 322,
        marginHorizontal: 5,
    },
    button: {
        backgroundColor: 'transparent',
        borderColor: '#ffffff',
        borderWidth: 1,
        padding: 10,
        width: 325,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default SplashScreen;
