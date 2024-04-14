import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import DashboardStack from './dashboardStack';
import CustomDrawerContent from './CustomDrawerContent'; // Import your CustomDrawerContent component
import { createDrawerNavigator } from '@react-navigation/drawer';
import LigasStack from "./ligasStack";
import SuporteStack from "./suporteStack";
import JogosDasLigasStack from "./jogosDasLigasStack";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Dashboard" component={DashboardDrawer} options={{ title: 'Dashboard' }} />
        </Stack.Navigator>
    );
};

const DashboardDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="DashboardStack"
            drawerContent={(props) => <CustomDrawerContent navigation={props.navigation} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="DashboardStack" component={DashboardStack} options={{ title: 'Dashboard' }} />
            <Drawer.Screen name="LigasStack" component={LigasStack} options={{ title: 'Ligas' }} />
            <Drawer.Screen name="SuporteStack" component={SuporteStack} options={{ title: 'Suporte' }} />
            <Drawer.Screen name="JogosStack" component={JogosDasLigasStack} options={{ title: 'Jogos das Ligas' }} />
        </Drawer.Navigator>
    );
};

export default AuthNavigator;
