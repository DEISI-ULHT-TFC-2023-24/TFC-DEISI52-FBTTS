import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import JogoDetalhe from '../screens/JogoDetalhe';
import {IconButton} from "react-native-paper";

const Stack = createStackNavigator();

const JogoDetalheStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="JogoDetalhe"
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
            <Stack.Screen name="JogoDetalhe" component={JogoDetalhe} />
        </Stack.Navigator>
    );
};

export default JogoDetalheStack;
