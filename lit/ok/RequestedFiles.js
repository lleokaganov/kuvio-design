import { LitElement, html, css } from './lit-core.min.js';

class RequestedFiles extends LitElement {
  static styles = css`
    :host {
        width:100%
    }

    .mv,.mv0,.mv00 { transition: transform 0.2s ease-in-out; }
    .mv:hover,mv0:hover,mv00:hover { transition-property: transform;
        transition-duration: 0.2s;animation: none; transform: scale(1.7); cursor:pointer;}
    .mv0:hover { transform: scale(1.1); }
    .mv00:hover { transform: scale(1.05); }

    .type {
      position: relative;
      font-size: 12px;
      letter-spacing: 0.01em;
      line-height: 130%;
      font-family: 'Roboto Mono';
      opacity: 0.8;
    }
    .name {
      position: relative;
      font-size: 15px;
      line-height: 130%;
      font-weight: 600;
    }

    .edit {
EEEEEEEEEEEEEEwidth: 26px;
      position: absolute;
      margin: 0 !important;
      top: 16px;
      right: 16px;
      font-size: 14px;
      line-height: 130%;
      font-weight: 500;
      color: #356bff;
      text-align: right;
      Edisplay: none;
      z-index: 1;
    }

    .requested-evidence {
      flex: 1;
      position: relative;
      line-height: 130%;
      font-weight: 500;
    }
    .requested-evidence-wrapper {
      align-self: stretch;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
    .notes-icon {
      width: 24px;
      height: 24px;
    }
    .notes-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 6px 0px;
      z-index: 0;
    }
    .description {
      align-self: stretch;
      position: relative;
      font-size: 14px;
      line-height: 140%;
    }

    .the-project-plan {
      flex: 1;
      position: relative;
      line-height: 130%;
      z-index: 0;
    }

    .frame-container {
      border: 1px solid #ddd;
     align-self: stretch;
     border-radius: 8px;
     display: flex;
     flex-direction: row;
     align-items: flex-start;
     justify-content: flex-start;
     padding: 12px 16px;
     position: relative;
     gap: 16px;
    }

    .evidencerequest {
      border: 1px solid #356bff;

      text-align: right;
      font-size: 14px;
      color: #356bff;

     align-self: stretch;
     border-radius: 8px;
     display: flex;
     flex-direction: row;
     align-items: flex-start;
     justify-content: flex-start;
     padding: 12px 16px;
     position: relative;
     gap: 16px;
    }

    .evidencerequest1 {
      align-self: stretch;
      border-radius: 8px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 12px 16px;
      position: relative;
      background-color: #e6f4ff;
      border: 1px solid #ddd;
      gap: 12px;
    }


    .type-parent {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 6px;
      opacity: 0.8;
      z-index: 1;
      text-align: left;
      font-size: 12px;
      color: #000;
    }
    .submit-evidence {
      position: absolute;
      margin: 0 !important;
      top: 16px;
      right: 16px;
      font-weight: 500;
      display: inline-block;
      z-index: 1;
    }
    .check-circle-icon {
      width: 24px;
      position: relative;
      height: 24px;
      z-index: 0;
    }

    .filedesc {
      position: relative;
      font-size: 14px;
      line-height: 140%;
      display: inline-block;
      flex-shrink: 0;
    }

    .file {
      display: inline-block;
      position: relative;
      line-height: 130%;
      font-weight: 600;
    }

    .portfoliopdf-parent {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 4px;
      z-index: 1;
    }

    .uploaded-just-now {
      white-space: nowrap;
      position: relative;
      font-size: 12px;
      letter-spacing: 0.01em;
      line-height: 130%;
      font-family: 'Roboto Mono';
      opacity: 0.8;
      z-index: 2;
    }
    .type-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 6px;
      opacity: 0.8;
      z-index: 1;
    }

    .description1 {
      width: 488px;
      position: relative;
      font-size: 14px;
      line-height: 140%;
      display: none;
    }


    .frame-parent {
      width: 100%;
      position: relative;
      border-radius: 16px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 16px;
      box-sizing: border-box;
      gap: 24px;
      text-align: left;
      font-size: 16px;
      color: #000;
      font-family: Inter;
    }
  `;

  render() {
    return html`
      <div class="frame-parent">
          <div class="requested-evidence-wrapper">
            <div class="requested-evidence">Requested evidence</div>
          </div>
          <!-- div class="evidencerequest-parent" -->


            <div class="evidencerequest">
              <div class="notes-wrapper mv"><img class="notes-icon" src="img/notes.svg"></div>
              <div class="type-parent">
                <div class="type">Text</div>
                <div class="name">Test task</div>
                <div class="description">
                  Write a project plan for designing an initial version of a
                  'Heads or Tails' app in 6 weeks. Less is more – the plan
                  should be concise, focused, and demonstrate your ability to
                  think strategically about designing a simple yet engaging app.
                </div>
                <div class="evidencerequest1">
                  <div class="the-project-plan">
                    The project plan for designing an initial version of a
                    'Heads or Tails' app in 6 weeks will involve three main
                    phases: Research & Ideation (Week 1) to ...
                  </div>

                  <div class="edit">Edit</div>

                </div>


              </div>

              <div class="edit">Upload</div>

              <div class="submit-evidence">Submit evidence</div>

            </div>


            <div class="frame-container">
              <div class="notes-wrapper mv"><img class="notes-icon" alt="" src="img/upload_2.svg"></div>
              <div class="type-group">
                <div class="type">Uploaded document</div>
                <div class="name">Portfolio</div>
                <div class="description">
                  Three insightful projects are enough. Quality and depth over
                  quantity. Tell us what the constraints were, which challenges
                  you encountered, how you solved them.
                </div>
                <div class="evidencerequest1">
                  <img class="check-circle-icon" src="img/check_circle.svg">

                  <div class="portfoliopdf-parent">
                    <div class="file">Portfolio.pdf</div>
                    <div class="filedesc">My recent projects</div>
                  </div>

                  <div class="uploaded-just-now">Uploaded just now</div>

                  <div class="edit">Edit</div>

                </div>
              </div>

              <div class="edit">Upload</div>

            </div>


            <div class="frame-container">
              <div class="notes-wrapper mv"><img class="notes-icon" src="img/upload_2.svg"></div>
              <div class="type-group">
                <div class="type">Uploaded document</div>
                <div class="name">CV</div>
                <div class="evidencerequest1">
                  <img class="check-circle-icon" src="img/check_circle.svg">

                  <div class="portfoliopdf-parent">
                    <div class="file">CV_final.pdf</div>
                    <div class="filedesc"></div>
                  </div>

                  <div class="uploaded-just-now">Uploaded on 21.08.2024</div>
                  <div class="edit">Edit</div>
                </div>
                <div class="description1">Description</div>
              </div>

              <div class="edit">Upload</div>

            </div>

          <!-- /div -->
        </div>
        <div class="button">
          <div class="login-as-auditor">Audit me!</div>
      </div>
    `;
  }
}

customElements.define('requested-files', RequestedFiles);
