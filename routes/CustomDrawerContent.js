import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { logoutUser } from '../services/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const CustomDrawerContent = ({ navigation }) => {
    const handleLogout = async () => {
        const loggedOut = await logoutUser();
        if (loggedOut) {
            navigation.navigate('Login');
        }
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
                    <DrawerItem label="Dashboard" onPress={() => navigation.navigate('DashboardStack')} labelStyle={styles.drawerItemText} />
                    <DrawerItem label="Ligas" onPress={() => navigation.navigate('LigasStack')} labelStyle={styles.drawerItemText} />
                    <DrawerItem label="Suporte" onPress={() => navigation.navigate('SuporteStack')} labelStyle={styles.drawerItemText} />
                    <DrawerItem label="Jogos das Ligas" onPress={() => navigation.navigate('JogosStack')} labelStyle={styles.drawerItemText} />
                    <DrawerItem label="Logout" onPress={handleLogout} labelStyle={styles.drawerItemText} />
                    <View style={styles.filler} />
                </View>
            </DrawerContentScrollView>
            {/* Define a cor da status bar */}
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
        paddingHorizontal: 30,
    },
    filler: {
        flex: 1,
    },
});

export default CustomDrawerContent;
