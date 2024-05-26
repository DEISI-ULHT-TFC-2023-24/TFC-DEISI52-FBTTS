    import React, {useContext} from 'react';
    import { createStackNavigator } from '@react-navigation/stack';
    import { Text, View, StyleSheet } from 'react-native';
    import { IconButton } from 'react-native-paper';
    import Dashboard from '../screens/Dashboard';
    import VerEstrategia from '../screens/VerEstrategia';
    import JogoDetalhe from '../screens/JogoDetalhe';
    import Jogos from '../screens/JogosDasLigas';
    import {AuthContext} from "../context/AuthContext";

    const Stack = createStackNavigator();

    const DashboardStack = ({ navigation }) => {
        const { userInfo } = useContext(AuthContext)

        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <IconButton
                            icon="menu"
                            color="#000"
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                    headerRight: () => (
                        <IconButton
                            icon={() => (
                                <View style={styles.iconContainer}>
                                    <Text style={styles.iconText}>
                                        {userInfo.username[0].toUpperCase()}
                                    </Text>
                                </View>
                            )}
                            color="#000"
                            onPress={() => {}}
                        />

                    ),
                }}
            >
                <Stack.Screen
                    name="DashboardScreen"
                    component={Dashboard}
                    options={{ title: 'Dashboard' }}
                />
                <Stack.Screen
                    name="VerEstrategia"
                    component={VerEstrategia}
                    options={{ title: 'Ver Estratégia' }}
                />
                <Stack.Screen
                    name="JogoDetalhe"
                    component={JogoDetalhe}
                    options={{ title: 'Jogo' }}
                />
                <Stack.Screen
                    name="Jogos"
                    component={Jogos}
                    options={{ title: 'Jogos' }}
                />
            </Stack.Navigator>
        );
    };

    const styles = StyleSheet.create({
        iconContainer: {
            backgroundColor: '#abdbe3',
            borderRadius: 30,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
        },
        iconText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    export default DashboardStack;
