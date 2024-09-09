import {LitElement, html, css} from './lit-core.min.js';

class AuditPanel extends LitElement {

    static properties = {
        audit_name: {type: String},
        audit_description: {type: String},
        number_of_candidats: {type: Number},
        number_of_parameters: {type: Number},
        requested_evidence: {type: Number},
    }

    static styles = css`
        :host {
            border-radius: 8px;
            background: #F5F5F5;
            EEEdisplay: block;
            padding: 16px;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            align-self: stretch;
        }

        .lam {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }

        .label {
            color: var(--Neutral-Black, #000);
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 130%; /* 15.6px */
            letter-spacing: 0.12px;
        }

        textarea {
            EEEflex: 1 0 0;
            EEalign-self: stretch;
            width:100%;
            display:block;
        }
    `;

    render() {
        // alert(this.audit_name);
        return html`
            <div class='lam'>
                <div class='label'>Audit name</div>
                <input type="text" value="${this.audit_name}" @change="${(e) => { this.audit_name = e.target.value; console.log('change'); }}">
            </div>
            <div class='lam'>
                <div class='label'>Audit description</div>
                <textarea @change="${(e) => { this.audit_description = e.target.value; console.log('change2'); }}">${this.audit_description}</textarea>
            </div>
            <black-button><s>Save</s></black-button>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <mask id="mask0_359_4105" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
    <rect width="16" height="16" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_359_4105)">
    <path d="M7.99998 8C7.43331 8 6.95831 7.80834 6.57498 7.425C6.19165 7.04167 5.99998 6.56667 5.99998 6C5.99998 5.44445 6.19165 4.97222 6.57498 4.58334C6.95831 4.19445 7.43331 4 7.99998 4C8.55553 4 9.02776 4.19445 9.41665 4.58334C9.80553 4.97222 9.99998 5.44445 9.99998 6C9.99998 6.56667 9.80553 7.04167 9.41665 7.425C9.02776 7.80834 8.55553 8 7.99998 8ZM7.99998 6.66667C8.18887 6.66667 8.3472 6.60278 8.47498 6.475C8.60276 6.34722 8.66665 6.18889 8.66665 6C8.66665 5.81111 8.60276 5.65278 8.47498 5.525C8.3472 5.39722 8.18887 5.33334 7.99998 5.33334C7.81109 5.33334 7.65276 5.39722 7.52498 5.525C7.3972 5.65278 7.33331 5.81111 7.33331 6C7.33331 6.18889 7.3972 6.34722 7.52498 6.475C7.65276 6.60278 7.81109 6.66667 7.99998 6.66667ZM3.99998 12V10.7333C3.99998 10.5 4.05831 10.2806 4.17498 10.075C4.29165 9.86945 4.44998 9.70556 4.64998 9.58333C5.16109 9.28334 5.6972 9.05556 6.25831 8.9C6.81942 8.74445 7.39998 8.66667 7.99998 8.66667C8.59998 8.66667 9.18053 8.74445 9.74165 8.9C10.3028 9.05556 10.8389 9.28334 11.35 9.58333C11.55 9.70556 11.7083 9.86945 11.825 10.075C11.9416 10.2806 12 10.5 12 10.7333V12H3.99998ZM7.99998 10C7.54442 10 7.09998 10.0556 6.66665 10.1667C6.23331 10.2778 5.8222 10.4444 5.43331 10.6667H10.5666C10.1778 10.4444 9.76665 10.2778 9.33331 10.1667C8.89998 10.0556 8.45553 10 7.99998 10ZM2.66665 14.6667C2.29998 14.6667 1.98609 14.5361 1.72498 14.275C1.46387 14.0139 1.33331 13.7 1.33331 13.3333V10.6667H2.66665V13.3333H5.33331V14.6667H2.66665ZM1.33331 5.33334V2.66667C1.33331 2.3 1.46387 1.98611 1.72498 1.725C1.98609 1.46389 2.29998 1.33334 2.66665 1.33334H5.33331V2.66667H2.66665V5.33334H1.33331ZM10.6666 14.6667V13.3333H13.3333V10.6667H14.6666V13.3333C14.6666 13.7 14.5361 14.0139 14.275 14.275C14.0139 14.5361 13.7 14.6667 13.3333 14.6667H10.6666ZM13.3333 5.33334V2.66667H10.6666V1.33334H13.3333C13.7 1.33334 14.0139 1.46389 14.275 1.725C14.5361 1.98611 14.6666 2.3 14.6666 2.66667V5.33334H13.3333Z" fill="#1C1B1F"/>
  </g>
</svg>
        `;
    }

    constructor() {
        super();
        this.audit_name = 'BAudit name';
        this.audit_description = 'BAudit description';
        this.number_of_candidats = 1;
        this.number_of_parameters = 2;
        this.requested_evidence = 3;
    }
}

customElements.define('audit-panel', AuditPanel);