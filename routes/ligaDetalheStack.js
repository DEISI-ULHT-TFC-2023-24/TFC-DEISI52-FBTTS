import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LigaDetalhe from '../screens/LigaDetalhe';
import {IconButton} from "react-native-paper";

const Stack = createStackNavigator();

const LigaDetalheStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="LigaDetalhe"
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
            <Stack.Screen name="LigaDetalhe" component={LigaDetalhe} options={{ title: 'Liga em detalhe' }} />
        </Stack.Navigator>
    );
};

export default LigaDetalheStack;
