import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Suporte from '../screens/Suporte';
import { IconButton } from "react-native-paper";

const Stack = createStackNavigator();

const SuporteStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="SuporteScreen"
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
            <Stack.Screen name="SuporteScreen" component={Suporte} options={{ title: 'Suporte' }} />
        </Stack.Navigator>
    );
};

export default SuporteStack;
