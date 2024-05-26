import React, {useContext} from "react";
import AuthNavigator from "./AuthNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import {ActivityIndicator, View} from "react-native";
import MainNavigator from "./MainNavigator";

const AppNav = () => {
    const {isLoading, userToken} = useContext(AuthContext)

    if( isLoading ) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {userToken !== null ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default AppNav