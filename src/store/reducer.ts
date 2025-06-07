import { Actions, AppState, Action } from '../types/store';

// Reducer con tipos explícitos
export const reducer = (currentAction: Action, currentState: AppState): AppState => {
    const { action, payload } = currentAction;

    switch (action) {
        case Actions.NAVIGATE:
            // Acción para navegar entre pantallas
            return {
                ...currentState,
                screen: payload,
            };

        case Actions.SETUSERCREDENTIALS:
            // Acción para establecer el ID del usuario
            return {
                ...currentState,
                user: payload,
            };

        case Actions.SET_USER   :
            // Acción para establecer el ID del usuario
            return {
                ...currentState,
                user: payload,
            };


        case Actions.LOGOUT:
            // Acción para cerrar sesion
            return {
                ...currentState,
                user: payload,
            };

        default:
            // Acción desconocida
            console.warn(`Acción desconocida: ${action}`);
            return currentState;
    }
};