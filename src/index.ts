import { NavBar, BoardSection } from './components/index';
import './screens/register';
import './screens/dashboard';
import './screens/login'; 
import './screens/profile';
import { addObserver, appState } from './store/';
import { Screens } from './types/store';
import { registerUser, loginUser } from './utils/firebase';


// Definir el tipo de los detalles del evento Login
interface LoginEventDetail {
    email: string;
    password: string;
}
// Definir el tipo de los detalles del evento Register
interface RegisterEventDetail {
    email: string;
    password: string;
    name: string;
    age: number;
}


class AppContainer extends HTMLElement {


    constructor() {
        super();
        this.attachShadow({ mode: "open" });
		addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    // Registro
    
    async handleRegister(email: string, password: string, name: string, age: number): Promise<void> {
        try {
            const success = await registerUser({ email, password, name, age });
            if (success) {
                const profile = { uid: "random-uid", name, avatar: 'default-avatar.png' }; 
            } else {
                console.error('Error en el registro');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    }
    // Login
    async handleLoginAttempt(email: string, password: string): Promise<void> {
        try {
            await loginUser(email, password);
        } catch (error) {
            console.error('Error en el inicio de sesión', error);
        }
    }

    // Render App
    renderApp() {
        const { user } = appState;
        if (this.shadowRoot && appState && user) {
            this.shadowRoot.innerHTML = '';

            const style = document.createElement("style");
            style.textContent = `
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

                .container {
                    display: flex;  
                    background-image:   opacity: 100%,
                    url("https://s0.smartresize.com/wallpaper/928/844/HD-wallpaper-motivation-fitness-workout-dark-ultra-sports-fitness-dark-motivation-workout.jpg");

                }

                center-section {
                    flex-grow: 1;  
                }

                @media (max-width: 768px) {  /* Ajusta el valor según el tamaño deseado */
                    .container {
                        display: flex;
                        flex-direction: column; /* Organiza las secciones en columna para pantallas pequeñas */
                    }

                    center-section {
                        order: 1;  /* Primero el centro */
                    }

                    right-section {
                        order: 2;  /* Luego la derecha */
                    }

                    left-section {
                        order: 3;  /* Finalmente la izquierda */
                    }
                }
            `;

            const navbar = document.createElement("my-navbar") as NavBar;

            const Board = document.createElement("board-section") as BoardSection;


            this.shadowRoot.appendChild(style);

            const navbarContainer = document.createElement("nav");
            navbarContainer.setAttribute("class", "navbarContainer");
            navbarContainer.appendChild(navbar);

            const container = document.createElement("div");
            container.setAttribute("class", "container");
            container.appendChild(Board);
      

            this.shadowRoot.appendChild(navbarContainer);
            this.shadowRoot.appendChild(container);
        }
    }
    
    renderProfile() {
        const { user } = appState;
        if (this.shadowRoot && appState && user) {
            this.shadowRoot.innerHTML = '';

            const style = document.createElement("style");
            style.textContent = `
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=League+Gothic&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
            // Acción para obtener los tweets de un usuario específico
export const getTweetsByUserAction = async (userUid: string) => {
    try {
        const tweetsByUser = await getTweetsByUser(userUid);  // Obtenemos los tweets del usuario desde Firebase
        return {
            action: Actions.GET_TWEETSBYUSER,
            payload: tweetsByUser,  // Retornamos los tweets del usuario como payload
        };
    } catch (error) {
        console.error("Error al obtener los tweets del usuario:", error);
        return {
            action: Actions.GET_TWEETSBYUSER,
            payload: [],  // Si ocurre un error, retornamos un array vacío
        };
    }
};
                center-section {
                    flex-grow: 1;  
                }
            
                @media (max-width: 768px) {  
                    .container {
                        display: flex;
                        flex-direction: column;
                    }
            
                    center-section {
                        order: 1;  
                    }
            
                    right-section {
                        order: 2;  
                    }
            
                    left-section {
                        order: 3;  
                    }
                }
            `;

            const navbar = document.createElement("my-navbar") as NavBar;

            const navbarContainer = document.createElement("nav");
            navbarContainer.setAttribute("class", "navbarContainer");
            navbarContainer.appendChild(navbar);
            this.shadowRoot.appendChild(navbarContainer);
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';

            switch (appState.screen) {
                case Screens.REGISTER:
                    const registerSection = document.createElement('app-register') as HTMLElement;
                    registerSection.addEventListener('register', (event) => {
                        const customEvent = event as CustomEvent<RegisterEventDetail>;
                        const { email, password, name, age } = customEvent.detail;
                        this.handleRegister(email, password, name, age);
                    });
                    this.shadowRoot.appendChild(registerSection);
                    break;

                case Screens.LOGIN:
                    const loginSection = document.createElement('app-login') as HTMLElement;
                    loginSection.addEventListener('login', (event) => {
                        const customEvent = event as CustomEvent<LoginEventDetail>;
                        const { email, password } = customEvent.detail;
                        this.handleLoginAttempt(email, password);
                    });
                    this.shadowRoot.appendChild(loginSection);
                    break;

                case Screens.DASHBOARD:
                    if (appState.user) {
                        this.renderApp();
                    } else {
                        console.log('Usuario no autenticado');
                    }
                    break;


                default:
                    break;
            }
        }
    }
}

customElements.define("app-container", AppContainer);