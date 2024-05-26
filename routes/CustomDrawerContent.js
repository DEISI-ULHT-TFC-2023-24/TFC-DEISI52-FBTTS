import React, {useContext} from 'react';
import { StyleSheet, View, Dimensions, Image, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CustomDrawerHeader from "./CustomDrawerHeader";
import DrawerItemWithBullet from "./DrawerItemWithBullet";
import {AuthContext} from "../context/AuthContext";

const CustomDrawerContent = ({ navigation, email }) => {
    const {logout} = useContext(AuthContext)

    const handleOpenWebsite = () => {
        Linking.openURL('https://www.fbtts.pt');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#6dce83', '#0373cc']}
                style={styles.gradient}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
            />
            <DrawerContentScrollView scrollEnabled={false}>
                <View>
                    <Image source={require('../assets/fbttsLogo.png')} style={styles.logo} />
                    <CustomDrawerHeader userName={email} />
                    <DrawerItemWithBullet label="Dashboard" onPress={() => navigation.navigate('DashboardStack')} labelStyle={styles.drawerItemText} />
                    <DrawerItemWithBullet label="Ligas" onPress={() => navigation.navigate('LigasStack')} labelStyle={styles.drawerItemText} />
                    <DrawerItemWithBullet label="Suporte" onPress={() => navigation.navigate('SuporteStack')} labelStyle={styles.drawerItemText} />
                    <DrawerItemWithBullet label="Jogos" onPress={() => navigation.navigate('JogosStack')} labelStyle={styles.drawerItemText} />
                    <DrawerItemWithBullet label="Ajuda" onPress={handleOpenWebsite} labelStyle={styles.drawerItemText} />
                    <DrawerItemWithBullet label="Logout" onPress={() => {logout()}} labelStyle={styles.drawerItemText} />
                    <View style={styles.filler} />
                </View>
            </DrawerContentScrollView>
            <StatusBar style="light" />
        </View>
    );
};

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: window.height,
    },
    logo: {
        width: 145,
        height: 30,
        alignSelf: 'center',
        marginVertical: 20,
    },
    drawerItemText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 30,
    },
    filler: {
        flex: 1,
    },
});

export default CustomDrawerContent;
