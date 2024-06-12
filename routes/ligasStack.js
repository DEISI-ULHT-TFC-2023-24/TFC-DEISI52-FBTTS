import { createStackNavigator } from '@react-navigation/stack';
import React, {useContext} from 'react';
import {IconButton} from "react-native-paper";
import LigaDetalhe from "../screens/LigaDetalhe";
import LigasList from "../screens/Ligas";
import {StyleSheet, Text, View} from "react-native";
import {AuthContext} from "../context/AuthContext";

const Stack = createStackNavigator();
const LigasStack = ({ navigation }) => {
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
                        onPress={() => navigation.navigate('Perfil')}
                    />

                ),
            }}
        >
            <Stack.Screen name="LigasList" component={LigasList} options={{ title: 'Ligas' }} />
            <Stack.Screen name="LigaDetalhe" component={LigaDetalhe} options={{ title: 'Liga Detalhe' }} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: '#abdbe3',
        borderRadius: 50,
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

export default LigasStack;
