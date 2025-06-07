import { Actions, ProfileData, Screens } from '../types/store';
import { logOut } from '../utils/firebase';


// Acción para navegar entre pantallas
export const navigate = (screen: Screens) => {
    console.log('Navegando a', screen);
    return {
        action: Actions.NAVIGATE,
        payload: screen,
    };
};


// Acción para establecer las credenciales del usuario
export const setUserCredentials = (user: string) => {
    return {
        action: Actions.SETUSERCREDENTIALS,
        payload: user,
    };
};

// Acción para Logout
export const logOutUser = () => {
    logOut();

    return {
        action: Actions.LOGOUT,
        payload: null,
    };
};

// Set User
export const setUser = (user: ProfileData) => {
    return {
        action: Actions.SET_USER,
        payload: user,
    };
};