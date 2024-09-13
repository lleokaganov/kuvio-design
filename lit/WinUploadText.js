import {LitElement, html, css} from './lit-core.min.js';

class WinUploadText extends LitElement {

    static properties = {
        name: {type: String},
        description: {type: String},
        text: {type: String},
    }

    constructor() {
        super();
        this.name = 'Error';
        this.description = `XZ`;
	this.text = '';
    }

  static styles = css`
    :host {
        width:100%
    }



.mv,.mv0,.mv00 { transition: transform 0.2s ease-in-out; }
.mv:hover,mv0:hover,mv00:hover { transition-property: transform; transition-duration: 0.2s;
animation: none; transform: scale(1.7); cursor:pointer;}
.mv0:hover { transform: scale(1.1); }
.mv00:hover { transform: scale(1.05); }




.test-task {
    position: relative;
    font-weight: 600;
}
.write-a-project {
    align-self: stretch;
    position: relative;
}
.response {
    align-self: stretch;
    position: relative;
    font-weight: 500;
}

.wrapper {
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #356bff;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 12px 16px;
    EEEEEEEEEEcolor: #356bff;

  resize: vertical; /* Разрешить изменение размера только по высоте */

      max-width: 100%;
      min-height: 40px; /* Минимальная высота */
      EEEEmax-height: 300px; /* Максимальная высота */
      overflow: hidden;  /* Скрываем скролл */
}
.response-parent {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
}
.login-as-auditor {
    position: relative;
    font-weight: 500;
}
.button {
    align-self: stretch;
    border-radius: 8px;
    background-color: #000;
    height: 42px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    box-sizing: border-box;
    color: #fff;
}
.test-task-parent {
    width: 100%;
    position: relative;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    EEEEEEEEEEEEEpadding: 16px 16px 24px;
    box-sizing: border-box;
    gap: 24px;
    text-align: left;
    font-size: 14px;
    color: #000;
    font-family: Inter;
}


  `;

  textarea_resize(event) {
    const textarea = ( event ? event.target : this.shadowRoot.querySelector('textarea') );
    if(textarea.tagName.toLowerCase() === 'textarea') {
      // Сбрасываем высоту перед вычислением новой
      textarea.style.height = 'auto';
      // Устанавливаем высоту на основе прокручиваемой высоты
      textarea.style.height = Math.min(textarea.scrollHeight, 300) + 'px';
    }
  }



  save(event) {
        var e=event.target.closest('.cv-parent');
        var s=e.querySelector('textarea').value;
        mudaki(s);
        dialog.close();
  }

  firstUpdated() {
    this.textarea_resize(); // Выполнить функцию один раз при рендере
  }

  render() {
    return html`
	<div class="test-task-parent">
	    <div class="test-task">${this.name}</div>
	    <div class="write-a-project">${this.description}</div>
	    <div class="response-parent">
		<div class="response">Response</div>
		<textarea class="wrapper" @input="${this.textarea_resize}" placeholder="Text">${this.text}</textarea>
	    </div>
	    <div class="button mv00" @click="${this.save}">
		<div class="login-as-auditor">Attach response</div>
	    </div>
	</div>
    `;
  }
}

customElements.define('win-upload-text', WinUploadText);
