import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

const ScreenHeight = Dimensions.get("window").height;

const LoginScreen = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigation = useNavigation();
    const {login} = useContext(AuthContext); // Usando o contexto AuthContext


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setEmail('');
            setPassword('');
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#6dce83', '#0373cc']}
                    style={styles.gradient}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/fbttsLogo.png')}
                            style={styles.logo}
                        />
                    </View>
                </LinearGradient>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Olá! Bem-vindo, bora começar.</Text>
                    <Text style={styles.subtitle}>Faz login para continuar.</Text>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => {login(email, password)}}>
                            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Autenticar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: ScreenHeight * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 145,
        height: 30,
        marginVertical: 20,
    },
    contentContainer: {
        width: 364,
        paddingHorizontal: 20,
        paddingTop: ScreenHeight * 0.3,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#343A40',
        marginBottom: 20,
    },
    form: {
        alignItems: 'center',
    },
    input: {
        width: 325,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        width: 325,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginScreen;
