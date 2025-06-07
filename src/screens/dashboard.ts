import { addObserver, appState, dispatch } from '../store';
import { getState } from '../store/index'; 
import { Screens } from '../types/store';


class Dashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initialize();
  }

  initialize() {
    addObserver(this.update.bind(this));  // Agregar observador para los cambios en el estado
  }

  update() {
    const state = getState();
    // Aquí puedes usar el estado para actualizar la UI según lo necesites
    console.log('Current State:', state);
    // Actualiza la UI, por ejemplo, renderizando tweets u otros datos del estado
  }

  render() {
    this.shadowRoot!.innerHTML = `
          <style>
             .container{
               background-image: url("https://firebasestorage.googleapis.com/v0/b/bedifferent-36168.appspot.com/o/Fondo.png?alt=media&token=91673126-7baf-4e2b-8853-fa8dfc208bb0");
               background-size: cover; /* Hace que la imagen cubra todo el contenedor */
               background-position: center; /* Centra la imagen en el contenedor */
               background-repeat: no-repeat; /* Evita que la imagen se repita */
               } 
          </style>
      <div>
      </div>
    `; 
         
  }
}


customElements.define('dashboard-screen', Dashboard);