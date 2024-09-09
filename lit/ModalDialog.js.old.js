import { LitElement, html, css } from './lit-core.min.js';

class ModalDialog extends LitElement {
  static styles = css`
    /* Основные стили для модального окна */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 400px;
      max-width: 100%;
      text-align: center;
    }

    .modal-header {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .modal-body {
      margin-bottom: 20px;
      font-size: 16px;
      color: #333;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .button {
      background-color: #007bff;
      color: white;
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .button-close {
      background-color: #dc3545;
    }

    /* Показ модального окна */
    :host([opened]) .modal-overlay {
      opacity: 1;
      pointer-events: auto;
    }
  `;

  static properties = {
    opened: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.opened = false;
  }

  // Публичный метод для открытия модального окна
  openModal() {
    this.opened = true;
  }

  // Публичный метод для закрытия модального окна
  closeModal() {
    this.opened = false;
  }

  render() {
    return html`
      <div class="modal-overlay" @click="${this.closeModal}">
        <div class="modal-content" @click="${e => e.stopPropagation()}">
          <div class="modal-header">Modal Title</div>
          <div class="modal-body">This is the content of the modal window.</div>
          <div class="modal-footer">
            <button class="mv0 button button-close" @click="${this.closeModal}">Close</button>
            <button class="mv0 button">Confirm</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-dialog', ModalDialog);
