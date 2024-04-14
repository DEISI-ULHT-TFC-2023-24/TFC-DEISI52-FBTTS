import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Dashboard from '../screens/Dashboard';
import VerEstrategia from '../screens/VerEstrategia';
import JogoDetalhe from '../screens/JogoDetalhe';
import Jogos from '../screens/JogosDasLigas';

const Stack = createStackNavigator();

const getUserInitials = (name) => {
    return name[0].toUpperCase();
};

const DashboardStack = ({ navigation, route }) => {
    const { userName } = route.params || {};
    const userInitials = userName ? getUserInitials(userName) : 'P';

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
                                <Text style={styles.iconText}>{userInitials}</Text>
                            </View>
                        )}
                        color="#000"
                        onPress={() => {
                            // Ação quando o ícone é pressionado
                        }}
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
                options={{ title: 'Jogos de Hoje' }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: '#abdbe3',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default DashboardStack;
