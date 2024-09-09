import {LitElement, html, css} from './lit-core.min.js';

class BlackButton extends LitElement {

    static styles = css`
    :host {
        border-radius: 8px;
        background: black;
        color: white;
        cursor: pointer;
        display: inline-block;
        padding: 16px;
    }
    
    :host(:hover) {
        background: #333;
    }

    :host(:active) {
        background: #666;
    }

`;

    render() {
        return html`
            <slot></slot>
        `;
    }

    constructor() {
        super();
        this.addEventListener('click', (e)=>{console.log('clicked')});
    }

}

customElements.define('black-button', BlackButton);