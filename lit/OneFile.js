import { LitElement, html, css } from './lit-core.min.js';

class OneFile extends LitElement {

// <one-file mode="file" name="Portfolio.pdf" description="My recent projects" filesize="15" unixtime="12345678"><

  static properties = {
    mode: { type: String },
    name: { type: String },
    description: { type: String },
    filesize: { type: Number },
    unixtime: { type: Number },
  };

  constructor() {
    super();
    this.mode = 'plaintext';
    this.name =  'no name';
    this.description = '';
    this.name =  'no name';
    this.filesize = 0;;
    this.unixtime = 0;
  }

  static styles = css`
    :host {
        width:100%
    }

    .mv,.mv0,.mv00 { transition: transform 0.2s ease-in-out; }
    .mv:hover,mv0:hover,mv00:hover { transition-property: transform;
        transition-duration: 0.2s;animation: none; transform: scale(1.7); cursor:pointer;}
    .mv0:hover { transform: scale(1.1); }
    .mv00:hover { transform: scale(1.05); }

.icon24 {
    width: 24px;
    height: 24px;
}

.name {
    align-self: stretch;
    position: relative;
    line-height: 130%;
    font-weight: 600;
}

.description {
  font-size: 14px;
  line-height: 140%;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Ограничение до 3 строк */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* Многоточие для длинных текстов */
  max-height: calc(1.4em * 3); /* Максимальная высота для 3 строк */
}

.uploaded {
    position: relative;
    font-size: 12px;
    letter-spacing: 0.01em;
    line-height: 130%;
    font-family: 'Roboto Mono';
    opacity: 0.8;
}

.portfoliopdf-parent {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 4px;
    flex-grow: 1;
}

/*
.edit {
    width: 26px;
    position: absolute;
    margin: 0 !important;
    top: 16px;
    right: 16px;
    font-size: 14px;
    line-height: 130%;
    font-weight: 500;
    color: #356bff;
    text-align: right;
    display: none;
    z-index: 3;
}
*/

.evidencerequest {
    width: 100%;
    position: relative;
    border-radius: 8px;
    background-color: #e6f4ff;
    border: 1px solid #ddd;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 12px 16px;
    gap: 12px;
    text-align: left;
    font-size: 15px;
    color: #000;
    font-family: Inter;
}




  `;

  render() {
    return html`<div class="evidencerequest" @click="${this.edit}">${this.render_pool()}</div>`;
  }

    edit(event) {
//	dialog(`<win-upload-file name="${this.name}" description="${this.description}"></win-upload-file>`,'Upload File');
	dialog(`<win-upload-text name="${this.name}" text="${this.description}" description="${this.description}"></win-upload-text>`,'Edit Text');
    }

    render_pool() {
	if(this.mode=='plaintext') return html`<div class="description">${this.description}</div>`;

	return html`
	    <img class="icon24 mv0" src="img/check_circle.svg">
	    <div class="portfoliopdf-parent">
    	    <div class="name">${this.name}</div>
    	    <div class="description">${this.description}</div>
	    </div>
	    <div class="uploaded">Uploaded ${this.formatUnixTime(this.unixtime)}</div>
	`;
    }

    formatUnixTime(unixtime) {
	// Текущая дата в миллисекундах
	var now = Date.now();
// console.log(parseInt(now/1000));
	// Универсальное время преобразуем в миллисекунды
	var timestamp = unixtime * 1000;
	// Если разница меньше 5 минут
	if(now - timestamp <= 5 * 60 * 1000) return html`just now`;
	// Преобразуем в дату
	var date = new Date(timestamp);
	var day = String(date.getDate()).padStart(2, '0');
	var month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
	var year = date.getFullYear();
	return html`${day}-${month}-${year}`;
    }

}

customElements.define('one-file', OneFile);
