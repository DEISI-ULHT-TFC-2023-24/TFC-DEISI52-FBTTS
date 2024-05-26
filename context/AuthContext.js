import React, {createContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BASE_URL} from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = (email, password) => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/login`, {
            email,
            password
        })
            .then(res => {
                //console.log('Response data:', res.data); // Adicione este log para depuração
                let userInfo = res.data
                setUserInfo(userInfo)
                setUserToken(userInfo.token)

                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                AsyncStorage.setItem('userToken', userInfo.token)

                //console.log(userInfo)
                //console.log('User Token: ' + userInfo.token)
            })
            .catch(e => {
            //console.log(`Login error ${e}`)
        });
        setIsLoading(false)
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null);
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserToken(userToken)
                setUserInfo(userInfo)
            }

            setIsLoading(false);

        } catch (e) {
            console.log(`isLogged in error ${e}`)
        }
    }

    const getUserDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                console.error('Token de usuário não encontrado');
                return;
            }

            const response = await axios.get(`${BASE_URL}/user-details`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userData = response.data;
            setUserInfo(userData);
        } catch (error) {
            console.error('Erro ao buscar detalhes do usuário:', error);
        }
    };



    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo}}>
            {children}
        </AuthContext.Provider>
    )
}
