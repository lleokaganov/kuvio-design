import { LitElement, html, css } from './lit-core.min.js';

class AuditorInfo extends LitElement {

  static properties = {
    auditName: { type: String },
    candidates: { type: Number },
    parameters: { type: Number },
    evidence: { type: Number },
    description: { type: String },
  };


  static styles = css`
    :host {
        width:100%
    }

    .mv,.mv0,.mv00 { transition: transform 0.2s ease-in-out; }
    .mv:hover,mv0:hover,mv00:hover { transition-property: transform;
        transition-duration: 0.2s;animation: none; transform: scale(1.7); cursor:pointer;}
    .mv0:hover { transform: scale(1.1); }
    .mv00:hover { transform: scale(1.05); }


    .frame-group {
      border: 2px solid transparent;
      align-self: stretch;
      border-radius: 8px;
      background-color: #f5f5f5;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 16px;
      gap: 24px;
    }
    .frame-group:hover {
      border: 2px solid lightblue;
    }
    .audit-name {
      font-weight: 600;
      width: 100%;
      border-radius: 4px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      height: 41px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 8px 10px;
      font-size: 19px;
    }
    .audit-name-parent {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 8px;
      width: 100%;
    }
    .frame-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 24px;
      opacity: 0.8;
    }
    .audit-description {
      width: 100%;
      border-radius: 4px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      min-height: 56px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 8px 10px;
      font-size: 14px;
    }
    .audit-name2 {
      position: relative;
      font-size: 22px;
      font-weight: 600;
    }
    .verified {
      position: absolute;
      top: -40px;
      right: -40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 10px;
      z-index: 1;
      font-size: 14px;
      color: #356bff;
    }
    .button-blue {
      user-select: none;
      border-radius: 8px;
      background-color: #356bff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 12px 16px;
      font-size: 14px;
      color: #fff;
    }
    .frame-ev-parameters {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 8px;
      text-align: left;
      font-size: 14px;
      color: #000;
      font-family: Inter;
    }








.frame-new {
    width: 100%;
    position: relative;
    border-radius: 8px 8px 8px 8px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 16px;
    box-sizing: border-box;
    gap: 24px;
    text-align: left;
    font-size: 12px;
    color: #000;
    font-family: Inter;
}












  `;

  constructor() {
    super();
    this.auditName = 'Default Audit Name';
    this.candidates = 0;
    this.parameters = 0;
    this.evidence = 0;
    this.description = 'Default description of the audit.';
  }

  render() {
    return html`
      <div class="frame-new">
        <div class="verified"><img src="img/verified.svg" alt="Verified Icon">Auditor’s stamp of approval</div>

        <div class="audit-name-parent audit-name-parent2">
          <div class="rs">Audit name</div>
          <div class="audit-name2">${this.auditName}</div>
          <div class="button-blue mv0">
            <div class="login-as-auditor">Audit me!</div>
          </div>

          <div class="frame-container rs">
            <div>${this.candidates} Candidates</div>
            <div>${this.parameters} Evaluation parameters</div>
            <div>${this.evidence} Requested evidence</div>
          </div>
        </div>

        <div class="audit-name-parent">
          <div class="rs">Audit description</div>
          <div class="audit-description">${this.description}</div>
        </div>

        <div class="frame-ev-parameters">
          <div class="evaluation-parameters">Evaluation parameters</div>
          <!-- Вот здесь содержимое, переданное через слот -->
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('auditor-info', AuditorInfo);
