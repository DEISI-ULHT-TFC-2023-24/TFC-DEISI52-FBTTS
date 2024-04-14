import AsyncStorage from '@react-native-async-storage/async-storage';

const mockUser = {
    email: 'teste',
    password: 'teste',
    token: 'leverkursen',
};

export const loginUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        if (email === mockUser.email && password === mockUser.password) {
            resolve(mockUser.token);
        } else {
            reject(new Error('Invalid credentials'));
        }
    });
};


export const getUserToken = async () => {
    return AsyncStorage.getItem('userToken');
};

export const logoutUser = async () => {
    try {
        // Clear the user token from AsyncStorage
        await AsyncStorage.removeItem('userToken');
        return true; // Logout successful
    } catch (error) {
        console.error('Error logging out:', error);
        return false; // Logout failed
    }
};
