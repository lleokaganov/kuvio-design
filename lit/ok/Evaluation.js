import { LitElement, html, css } from './lit-core.min.js';

class Evaluation extends LitElement {
  static styles = css`
    :host {
        width:100%
    }

    .mv,.mv0,.mv00 { transition: transform 0.2s ease-in-out; }
    .mv:hover,mv0:hover,mv00:hover { transition-property: transform;
	transition-duration: 0.2s;animation: none; transform: scale(1.7); cursor:pointer;}
    .mv0:hover { transform: scale(1.1); }
    .mv00:hover { transform: scale(1.05); }


    .remove-icon {
      width: 12px;
      height: 12px;
    }

    .remove-wrapper {
      width: 24px;
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid #eee;
      box-sizing: border-box;
      height: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0px 8px;
    }

    .header {
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





    .frame-group {
      align-self: stretch;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-content: center;
      gap: 8px;
      text-align: center;
      font-size: 12px;
    }

    .all {
      width: 100%;
      position: relative;
      border-radius: 8px;
      background-color: #f2f4ff;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 12px 16px;
      box-sizing: border-box;
      gap: 8px;
      text-align: left;
      font-size: 14px;
      color: #000;
      font-family: 'Inter', sans-serif;
    }






    .block-to-toggle {
	 width:100%;
      padding:5px;
      EEEdisplay: none;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }





/****** multi */
    .ew {
      user-select: none;
      border-radius: 24px;
      background-color: #f2f4ff;
      border: 1px solid #cdcdcd;
      padding: 8px 16px;
    }

    .pin {
      background-color: #eecea5;
    }


/************* select */

.div {
    opacity: 0.5;
}

.junior {
    text-align: center;
    white-space: nowrap;
}

.parent {
    user-select: none;
    flex: 0 0 auto;
    border-radius: 8px;
    border: 1px solid #cdcdcd;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 8px 20px 8px 12px;
    gap: 4px;
}



/*********** mode = scale */
.sdiv {
    width: 30px;
    position: relative;
    letter-spacing: 0.01em;
    white-space: pre-wrap;
    display: inline-block;
    flex-shrink: 0;
    opacity: 0.8;
}

.sdiv1 {
    text-align: center;
}
.sdiv2 {
    text-align: right;
}

.sparent {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    text-align: left;
    font-size: 12px;
    color: #000;
    font-family: 'Roboto Mono';
}
.rectangle-div {
    width: 100%;
    position: relative;
    border-radius: 6px;
    background-color: #dfe3fa;
    height: 6px;
}


/******************** yn *******************/


.task-alt-icon {
    width: 24px;
    position: relative;
    height: 24px;
}
.yes {
    position: relative;
    line-height: 130%;
}
.task-alt-parent {
 border-radius: 6px;
 padding:2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
}
.uframe-parent {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
    text-align: left;
    font-size: 12px;
    color: #000;
    font-family: Inter;
}
  `;


  onoff(event) {
    const block = this.shadowRoot.querySelector('.block-to-toggle');

    var maxh = 1*(block.getAttribute('maxh'));
    if(!maxh) {
	maxh=400;
	block.style.maxHeight = maxh+`px`;
//	block.style.display = 'block';
//	maxh=block.scrollHeight;
//	console.log('maxh='+maxh);
	// block.style.display = (this.open ? 'block':'none');
	// block.style.maxHeight = maxh+`px`;
    }
    // maxh = Math.max(maxh,1*`${block.scrollHeight}`);
    block.setAttribute('maxh',maxh);

    if(this.open) {
	block.style.maxHeight = maxh+`px`;
	setTimeout(() => { block.style.maxHeight = '0px'; }, 10);
	block.addEventListener('transitionend', () => { if(!this.open) block.style.display = 'none'; }, { once: true });
    } else {
	block.style.display = 'block';
        block.style.maxHeight = `0px`;
        setTimeout(() => { block.style.maxHeight = maxh+`px`; }, 10);
    }
    this.open = !this.open;
  }


// select 1 2 3 4 5 6
// percent 100%
// yn bool
// multi

  renderContent() {

    if(this.mode == 'select') {
	var s = ('' + this.names).split('|').map((x, i) => html`
	    <div pid="${i}" class="parent mv00${this.edit &&this.data==i?' pin':''}"" @click="${this.pin}">
	        <div class="div">${i+1}</div>
    		<div class="junior">${x.trim()}</div>
	      </div>`);
	return html`<div class="frame-group">${s}</div>`;
    }

    if(this.mode == 'scale') {
	return html`<div class="frame-group">
	    <div class="rectangle-div"></div>
	    <div class="sparent">
	        <div class="sdiv">0%</div>
	        <div class="sdiv sdiv1">50%</div>
	        <div class="sdiv sdiv2">100%</div>
	    </div>
	    </div>`;
    }

    if(this.mode == 'yn') {
	var x = this.edit && (this.data=="true"||this.data=="1");

	return html`<div class="frame-group">
	<div class="uframe-parent">
	    <div pid="1" class="task-alt-parent${this.edit && x?' pin':''}"" @click="${this.pin}">
		<img class="task-alt-icon" src="img/task_alt.svg">
		<div class="yes">Yes</div>
	    </div>
	    <div pid="0" class="task-alt-parent${this.edit && !x?' pin':''}"" @click="${this.pin}">
		<img class="task-alt-icon" src="img/horizontal_rule.svg">
		<div class="yes">No</div>
	    </div>
	</div>
	</div>`;
    }

    if(this.mode == 'multi') {
	var d=this.data.split(',');
	var s=(''+this.names).split('|').map((x, i) => html`<div pid="${i}" @click="${this.pin}"
	    class="ew mv00${this.edit && d.includes(''+i)?' pin':''}">${x.trim()}</div>`);
	return html`<div class="frame-group">${s}</div>`;
    }

    return html`Error`;
}

pin(event) {
 if(!this.edit) return;
 var e=event.target,x;
 while((x=e.getAttribute('pid'))===null) e=e.parentNode;

 if(this.mode=='multi') {
    var d=(this.data==''? [] : this.data.split(','));
    if(d.includes(x)) d = d.filter(item => item !== x); else d.push(x);
    d.sort((a, b) => a - b);
    this.data=d.join(',');
 }
 else if(this.mode=='select') { this.data = x; }
 else if(this.mode=='yn') { this.data = x; }
 else if(this.mode=='percent') { }
 mudaki(this.data);
}

render() {
    return html`
      <div class="all">
        <div class="frame-parent">
          <div class="remove-wrapper mv">
          <img class="remove-icon" @click="${this.onoff}"
            src="${this.open ? 'img/remove.svg' : 'img/add.svg'}"
          />
          </div>
          <div class="header" @click="${this.onoff}">${this.name}</div>
        </div>
	<div class="block-to-toggle" style="display:${this.open ? 'block' : 'none'}">
         ${this.renderContent()}
	</div>
      </div>
    `;
  }

  static properties = {
    name: { type: String },
    names: { type: String },
    data: { type: String },
    mode: { type: String },
    edit: { type: Boolean },
    open: { type: Boolean },
  };

  connectedCallback() {
    super.connectedCallback();
    // Преобразуем значения 'false' и '0' в логическое значение false
    this.open = this.hasAttribute('open') && this.getAttribute('open') !== 'false' && this.getAttribute('open') !== '0';
    this.edit = this.hasAttribute('edit') && this.getAttribute('edit') !== 'false' && this.getAttribute('edit') !== '0';
  }

  constructor() {
    super();
    this.name = "Name error";
  }



}



customElements.define('evaluation-component', Evaluation);
