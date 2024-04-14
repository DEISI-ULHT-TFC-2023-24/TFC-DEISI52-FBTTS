import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VerEstrategia from "../screens/VerEstrategia";
import {IconButton} from "react-native-paper";
import JogoDetalhe from "../screens/JogoDetalhe";

const Stack = createStackNavigator();

const VerEstrategiaStack = ( {navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="VerEstrategia"
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
            <Stack.Screen
                name="VerEstrategia"
                component={VerEstrategia}
                options={{ title: 'Estratégia' }}
            />
            <Stack.Screen
                name="VerEstrategia"
                component={VerEstrategia}
                options={{ title: 'Estratégia' }}
            />
            <Stack.Screen
                name="JogoDetalhe"
                component={JogoDetalhe}
                options={{ title: 'Jogo' }}
            />
        </Stack.Navigator>
    );
};

export default VerEstrategiaStack;
