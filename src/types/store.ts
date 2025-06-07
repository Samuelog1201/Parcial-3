
// Define la estructura de un observador que reaccionará a los cambios en el estado
export type Observer = { render: () => void } & HTMLElement; // El método que se invoca para que el observador actualice la UI

//Actions
export enum Actions {
    NAVIGATE = 'NAVIGATE',
    SETUSERCREDENTIALS = 'SETUSERCREDENTIALS',
    SET_USER = 'SET_USER',
    LOGOUT = 'LOGOUT',
}

// Screens
export enum Screens {
    LOGIN = 'LOGIN',
    DASHBOARD = 'DASHBOARD',
    REGISTER = 'REGISTER',

}

export interface AppState {
    screen: Screens;  
    user: ProfileData | null; 
}

export interface Action {
    action: Actions;
    payload: any;  
}

// Propiedades del Perfil
export interface ProfileData {
    name: string|null;
    uid: string|null;
    email: string|null;
    avatar: string|null;
}

