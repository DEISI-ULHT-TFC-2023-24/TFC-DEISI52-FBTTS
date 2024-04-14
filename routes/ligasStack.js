import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {IconButton} from "react-native-paper";
import LigaDetalhe from "../screens/LigaDetalhe";
import LigasList from "../screens/Ligas";

const Stack = createStackNavigator();

const LigasStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="LigasList"
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
            }}
        >
            <Stack.Screen name="LigasList" component={LigasList} options={{ title: 'Ligas' }} />
            <Stack.Screen name="LigaDetalhe" component={LigaDetalhe} options={{ title: 'Liga Detalhe' }} />
        </Stack.Navigator>
    );
};

export default LigasStack;
