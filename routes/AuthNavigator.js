import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../screens/Login';
import CustomDrawerContent from './CustomDrawerContent';
import DashboardStack from './dashboardStack';
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

const DashboardDrawer = ({ route }) => {
    return (
        <Drawer.Navigator
            initialRouteName="DashboardStack"
            drawerContent={(props) => <CustomDrawerContent navigation={props.navigation} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="DashboardStack" options={{ title: 'Dashboard' }}>
                {(props) => <DashboardStack {...props} route={route} />}
            </Drawer.Screen>
            <Drawer.Screen name="LigasStack" options={{ title: 'Ligas' }}>
                {(props) => <LigasStack {...props} route={route} />}
            </Drawer.Screen>
            <Drawer.Screen name="SuporteStack" options={{ title: 'Suporte' }}>
                {(props) => <SuporteStack {...props} route={route} />}
            </Drawer.Screen>
            <Drawer.Screen name="JogosStack" options={{ title: 'Jogos das Ligas' }}>
                {(props) => <JogosDasLigasStack {...props} route={route} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};

export default AuthNavigator;
