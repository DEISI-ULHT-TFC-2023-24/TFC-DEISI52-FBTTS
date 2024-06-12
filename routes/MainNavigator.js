import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import DashboardStack from "./dashboardStack";
import LigasStack from "./ligasStack";
import SuporteStack from "./suporteStack";
import JogosDasLigasStack from "./jogosDasLigasStack";
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    const navigation = useNavigation(); // Use useNavigation hook here

    return (
        <Drawer.Navigator
            initialRouteName="DashboardStack"
            drawerContent={(props) => <CustomDrawerContent navigation={navigation} {...props} />}
            screenOptions={{
                headerShown: false,
                animationEnabled: false
            }}
        >
            <Drawer.Screen name="DashboardStack" component={DashboardStack} options={{ title: 'Dashboard' }} />
            <Drawer.Screen name="LigasStack" component={LigasStack} options={{ title: 'Ligas' }} />
            <Drawer.Screen name="SuporteStack" component={SuporteStack} options={{ title: 'Suporte' }} />
            <Drawer.Screen name="JogosStack" component={JogosDasLigasStack} options={{ title: 'Jogos das Ligas' }} />
        </Drawer.Navigator>
    );
};

export default MainNavigator;
