import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigator from './routes/MainNavigation';
import AuthNavigator from './routes/AuthNavigator';
import SplashScreen from './screens/SplashScreen';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                setIsAuthenticated(!!userToken);
                setAuthChecked(true);
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        checkAuthentication();
    }, []);

    if (!authChecked) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default App;
