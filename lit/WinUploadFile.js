import {LitElement, html, css} from './lit-core.min.js';

class WinUploadFile extends LitElement {

    static properties = {
        name: {type: String},
        description: {type: String},
    }

    constructor() {
        super();
        this.name = 'Error';
        this.description = `XZ`;
    }

  static styles = css`
    :host {
        width:100%
    }

    .mv,.mv0,.mv00 { transition: transform 0.2s ease-in-out; }
    .mv:hover,mv0:hover,mv00:hover { transition-property: transform; transition-duration: 0.2s;animation: none; transform: scale(1.7); cursor:pointer;}
    .mv0:hover { transform: scale(1.1); }
    .mv00:hover { transform: scale(1.05); }

    .cv {
      position: relative;
      font-weight: 600;
    }

    .download-2-icon {
      width: 24px;
      height: 24px;
    }

    .evidencetype {
      flex: 1;
      border-radius: 8px;
      background-color: #f5f5f5;
      width: 448px;
      height: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 12px;
      box-sizing: border-box;
      opacity: 0.8;
    }

    .evidencetype-wrapper {
      align-self: stretch;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
    }

    .document-description {
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
      max-width: 100%;
      min-height: 40px; /* Минимальная высота */
      overflow: hidden;  /* Скрываем скролл */
    }

    .document-description-parent {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 8px;
    }

    .remove-icon {
      width: 12px;
      height: 12px;
    }

    .remove-wrapper {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid #eee;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0px 8px;
    }

    .my-documents {
      flex: 1;
      font-weight: 600;
    }

    .frame-parent {
      align-self: stretch;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
    }

    .login-as-auditor {
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
      opacity: 0.5;
      color: #fff;
    }

    .cv-parent {
      width: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 16px 16px 24px;
      box-sizing: border-box;
      gap: 24px;
      text-align: left;
      font-size: 14px;
      color: #000;
      font-family: 'Inter', sans-serif;
    }
  `;


  textarea_resize(event) {
    const textarea = event.target;
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

  render() {
    return html`
      <div class="cv-parent">
        <div class="cv">${this.name}</div>
        <div class="evidencetype-wrapper">
          <div class="evidencetype">
            <img class="download-2-icon mv" src="img/download_2.png">
          </div>
        </div>
        <div class="document-description-parent">
          <div class="document-description">Document description</div>
		<textarea class="wrapper" @input="${this.textarea_resize}" placeholder="description"></textarea>
        </div>
        <div class="frame-parent">
          <div class="remove-wrapper">
            <img class="remove-icon mv" src="img/remove.svg">
          </div>
          <div class="my-documents">My documents</div>
        </div>
	<div class="button mv00" @click="${this.save}">
          <div class="login-as-auditor">Attach document</div>
        </div>
      </div>
    `;
  }
}

customElements.define('win-upload-file', WinUploadFile);
