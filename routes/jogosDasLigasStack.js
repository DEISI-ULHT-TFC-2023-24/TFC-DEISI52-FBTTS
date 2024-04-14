import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Jogos from '../screens/JogosDasLigas';
import JogoDetalhe from '../screens/JogoDetalhe';
import {IconButton} from "react-native-paper";

const Stack = createStackNavigator();

const JogosDasLigasStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="JogosDasLigas"
            screenOptions={{
                headerShown: true,
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <IconButton
                        icon="menu"
                        color="#000"
                        onPress={() => navigation.openDrawer()} // Open the drawer on button press
                    />
                ),
            }}
        >
            <Stack.Screen name="JogosDasLigas" component={Jogos} options={{ title: 'Jogos das Ligas' }} />
            <Stack.Screen name="JogoDetalhe" component={JogoDetalhe} options={{ title: 'Jogo em detalhe' }} />
        </Stack.Navigator>
    );
};

export default JogosDasLigasStack;
