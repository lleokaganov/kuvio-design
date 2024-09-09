// import {LitElement, html, css} from 'lit';
import {LitElement, html, css} from './lit-core.min.js';


class AuditPanel extends LitElement {

    static properties = {
        audit_name: {type: String},
        audit_description: {type: String},
        number_of_candidates: {type: Number},
        number_of_parameters: {type: Number},
        requested_evidence: {type: Number},
    }

    static styles = css`
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

        .icon-and-txt {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 2px 0px;
            gap: 8px;
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

        .rs {
            font-size: 14px;
            font-weight: 400;
            color: #333;
        }

        .ico16 {
            width: 16px;
            height: 16px;
        }
    `;

    render() {
        return html`
            <div class="frame-group">
                <div class="audit-name-parent">
                    <div class="rs">Audit name</div>
                    <div class="audit-name">${this.audit_name}</div>
                </div>
                <div class="audit-name-parent">
                    <div class="rs">Audit description</div>
                    <div class="audit-description">${this.audit_description}</div>
                </div>
                <div class="frame-container rs">
                    <div class="icon-and-txt">
                        <img class="ico16" src="img/frame_person.svg">
                        ${this.number_of_candidates}
                    </div>
                    <div>${this.number_of_parameters} Evaluation parameters</div>
                    <div>${this.requested_evidence} Requested evidence</div>
                </div>
            </div>
        `;
    }

    constructor() {
        super();
        this.audit_name = 'Open source developer';
        this.audit_description = `Comprehensive review of the developer's contributions, 
                                 code quality, project involvement, and collaboration within the open-source community`;
        this.number_of_candidates = 376;
        this.number_of_parameters = 2;
        this.requested_evidence = 1;
    }
}

customElements.define('audit-panel', AuditPanel);
