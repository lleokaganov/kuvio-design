import { LitElement, html, css } from './lit-core.min.js';

class ModalDialog extends LitElement {
  static styles = css`

.mv,.mv0,.mv00 { transition: transform 0.2s ease-in-out; }
.mv:hover,mv0:hover,mv00:hover { transition-property: transform; transition-duration: 0.2s; animation: none; transform: scale(1.7); cursor:pointer;}
.mv0:hover { transform: scale(1.1); }
.mv00:hover { transform: scale(1.05); }

    :host([opened]) .modal-overlay {
      opacity: 1;
      pointer-events: auto;
    }

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
      EEEEEEEpadding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 400px;
      max-width: 100%;
      text-align: center;
    }

















.candidates {
    position: relative;
    line-height: 130%;
    font-weight: 500;
}
.item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 0 16px 0; /*16px 0;*/
    z-index: 0;
}
.close {
    width: 38px;
    position: absolute;
    margin: 0 !important;
    top: 0; /*16px;*/
    right: 16px;
    font-size: 14px;
    line-height: 130%;
    font-weight: 500;
    color: #356bff;
    text-align: right;
    display: inline-block;
    z-index: 1;
}
.item-parent {
    margin-top:16px;
    width: 100%;
    width: 100%;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 16px;
    gap: 32px;
    text-align: left;
    font-size: 16px;
    color: #000;
    font-family: Inter;
}

.part2 {
    border: 1px solid green;
}



















.test-task {
    align-self: stretch;
    font-weight: 600;
}

.write-a-project {
    align-self: stretch;
    position: relative;
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
    color: #356bff;
}
.response-parent {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
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
    padding: 16px 16px 24px;
    box-sizing: border-box;
    gap: 24px;
    text-align: left;
    font-size: 14px;
    color: #000;
    font-family: Inter;
}





















  `;


  render() {

setTimeout(function(){

document.querySelector('#mytest').innerHTML='OOOOO';

},1000);

    return html`
<div class="modal-overlay" @click="${this.closeModal}">
<div class="modal-content" @click="${e => e.stopPropagation()}">

    <div class="item-parent">
	    <div class="item">
    		<slot name="header" class="candidates">Default Title</slot>
	    </div>
	    <div class="close mv0" @click="${this.closeModal}">Close</div>
    </div>
    <div class="item">


    <div class="test-task-parent">
	    <div class="test-task">Test task</div>
	    <div class="write-a-project">Write a project plan for designing an initial version of a 'Heads or Tails' app in 6 weeks. Less is more – the plan should be concise, focused, and demonstrate your ability to think strategically about designing a simple yet engaging app.</div>
	    <div class="response-parent">
    		<div class="test-task">Response</div>
    		<textarea class="wrapper"></textarea>
	    </div>
	    <div class="button mv00">Attach response</div>

<div id='mytest'>MY_TEST</div>
    </div>





    </div>

<!--
    <div class="cv-parent">
	    <div class="cv">CV</div>
	    <div class="evidencetype-wrapper">
    	    <div class="evidencetype">
    		    <img class="img/download-2-icon" src="img/download_2.svg">
    	    </div>
	    </div>
	    <div class="document-description-parent">
    	    <div class="document-description">Document description</div>
    	    <div class="wrapper">
    		    <div class="div">|</div>
    	    </div>
	    </div>
	    <div class="frame-parent">
    	    <div class="remove-wrapper">
    		    <img class="remove-icon" src="img/remove.svg">
    	    </div>
    	    <div class="my-documents">My documents</div>
	    </div>
	    <div class="button">
    	    <div class="login-as-auditor">Attach document</div>
	    </div>
    </div>
-->

</div>
</div>`;



/*
    return html`
      <div class="modal-overlay" @click="${this.closeModal}">
        <div class="modal-content" @click="${e => e.stopPropagation()}">
          <div class="modal-header">
            <slot name="header">Default Title</slot>
          </div>
          <div class="modal-body">
            <slot name="body">This is the default body content.</slot>
          </div>
          <div class="modal-footer">
            <button class="button button-close" @click="${this.closeModal}">Close</button>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;

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
*/
  }

  static properties = {
    opened: { type: Boolean, reflect: true },
  };

// Отключаем Shadow DOM
//  createRenderRoot() {
//    return this;
//  }

  constructor() {
    super();
    this.opened = false;
  }

  openModal() {
    this.opened = true;
  }

  closeModal() {
    this.opened = false;
  }
}

customElements.define('modal-dialog', ModalDialog);
