export enum AttributeCasilla {
    casilla = "casilla",
}
class BoardSection extends HTMLElement {
    casilla: string | undefined;
 
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return [

        ];
    }

    attributeChangedCallback(propName: string, _: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case AttributeCasilla.casilla:
                this.casilla = newValue;
                break;
         
        }
        //console.log(propName, newValue);
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                            
                </style>
                <section>
                    <div>
                    </div>         
                </section>
            `;
        }
    }
}

customElements.define("board-section", BoardSection); 
export default BoardSection;