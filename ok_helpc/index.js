
function INIT(){

    wintempl_cls='pop4 zoomIn animated';
    wintempl="<div id='{id}_body'>{s}</div>"; // <i id='{id}_close' title='Close' class='can4'></i>
/*
	    `<div class="modal-top">
			<div class="modal-item">{header}</div>
			<div class="modal-close mv0" id='{id}_close'>Close</div>
	    </div>
	    <div class="modal-item" style="padding: 16px 16px 16px 16px;">{s}</div>`;
*/

//     ohelpc=function (id,z,s) { helpc(id,mk_helpbody(z,s)); }
// function ohelp(id,z,s) { helps(id,mk_helpbody(z,s)); }

    mk_helpbody = function(header,s) {

	    if(header==undefined) {
		s=`<div class="modal-item" style="padding: 16px 16px 16px 16px;">`+s+`</div>`;
	    } else {
		header=`<div class="modal-top">
			<div class="modal-item">`+header+`</div>
			<div class="modal-close mv0 pop_close">Close</div>
		    </div>`;
		s=header+`<div class="modal-item" style="padding: 16px 16px 16px 16px;">`+s+`</div>`;
	    }

	    return "<div class='textbody'>"+s+"</div>";
	    // return (z==''?'':"<div class='legend'>"+z+"</div>")+"<div class='textbody'>"+s+"</div>";
    };

}

// wintempl="<div id='{id}_body'>{s}</div><i id='{id}_close' title='Close' class='can4'></i>";
// wintempl_cls='pop4 zoomIn animated';



// wintempl=`<div id='{id}_body'>{s}</div>`;
// wintempl_cls='pop4 zoomIn animated';


// <div class="modal-close mv0" id='{id}_close'>Close</div>




/*
wintempl=`
<dialog>
  <div id='{id}_body'>{s}</div>
    <i id='{id}_close' title='Close' class='EEEEEEEcan4' onclick="dialog.close()"></i>
  <button autofocus onclick="dialog.close()">Close</button>
  <p>This modal dialog has a groovy backdrop!</p>
</dialog>
`;

wintempl_cls='EEEEEEEEpop4 zoomIn animated';
*/

unis = "a3IZTNyJ2cPD2A9G-d851f0e3a61f367eddf41fae6673c48b76d42d93b78b88a30e03552287ca7116";


mudaki=function(x){
    if(!x) x = 'T E S T';
    document.querySelector('#buka').innerHTML = x;
}


dialog=function(s,header,set) {
/*
	    if(header==undefined) {
		s=`<div class="modal-item" style="padding: 16px 16px 16px 16px;">`+s+`</div>`;
	    } else {
		header=`<div class="modal-top">
			<div class="modal-item">`+header+`</div>
			<div class="modal-close mv0" id='`+dialog.id+`_close'>Close</div>
		    </div>`;
		s=`<div class="modal-item" style="padding: 16px 16px 16px 16px;">`+s+`</div>`;
	    }
*/
	    return ohelpc('dialog_'+(dialog.id++),header,s);

/*

	    if(header==undefined) {
		s=`<div class="modal-item" style="padding: 16px 16px 16px 16px;">`+s+`</div>`;
	    } else {
		s=`<div class="modal-top">
			<div class="modal-item">`+header+`</div>
			<div class="modal-close mv0" onclick="dialog.close()">Close</div>
		    </div>
		    <div class="modal-item" style="padding: 16px 16px 16px 16px;">`+s+`</div>`;
	    }


	    var e=document.querySelector('dialog');

	    var x='background-color'; e.style[x] = (set && set[x] ? set[x] : 'white');

	    e.innerHTML=s;

	    dialog.id++;
	    e.showModal();
	    // e.style.backdropFilter = 'opacity(0.75)';
	    // e.style.zIndex=dialog.id;
    	    e.classList.add('showing');
	    e.classList.remove('closing');
*/
};
dialog.id=0;
dialog.close=function(){
      var e=document.querySelector('dialog');
      e.classList.add('closing');
      e.classList.remove('showing');
      var p=dialog.id;
      setTimeout(() => {
        if(p==dialog.id) {
	    e.close();
	    // e.style.backdropFilter = 'opacity(0)';
	}
      }, 300); // Таймаут для завершения анимации
};


OneFile_Сontent=`
<div>
   <one-file mode="file" name="Portfolio.pdf" description="My recent projects" filesize="15" unixtime="1234567898"></one-file>
   <one-file mode="file" name="Portfolio1.pdf" description="Лошадка придумала конский гей-флаг. В нем десять цветов. Называются так: саврасый, соловый, буланый, каурый, игреневый, рыжий, караковый, бурый, а следом гнедой, и в конце - вороной. Лошадка на прайд поскакала со мной!" filesize="15" unixtime="1726264523"></one-file>
   <one-file mode="file" name="Portfolio2.pdf" description="" filesize="15" unixtime="1234067800"></one-file>
   <one-file mode="text" name="Portfolio3.pdf" description="Углеродный след, углеродный след, давай-ка сделай попроще еблет, ненавидим тебя, злобную вражину, засунь свою нефть обратно в скважину, верни метан коровкам в жопы, почисть океан от Штатов до Европы от радона, гандона да пластикового пакетика, пусть срёт одна лишь зелёная энергетика!" filesize="15" unixtime="102345678"></one-file>
</div>
`;



RequestedFiles_Сontent=`
   <requested-files></requested-files>
`;



AuditorInfo_Content=`

<auditor-info
  auditName="Product designer"
  candidates="87"
  parameters="4"
  evidence="1"
  description="We conduct a thorough audit of product designers' CVs to ensure they meet the qualifications needed for key roles in tech startups.">

  <!-- Вставляем компоненты evaluation-component внутрь auditor-info -->
  <evaluation-component mode="yn" data="1" name="Boolean checkbox"></evaluation-component>
  <evaluation-component mode="multi" data="1" name="Select multi items" names="Хуё|Моё|Пятое|Десятое"></evaluation-component>
  <evaluation-component mode="select" data="1" name="Choose one item" names="Junior|Mid-level|Senior|Lead|Principle"></evaluation-component>
  <evaluation-component mode="select" data="1" name="Знание английского" names="Ваще не ебу|Показываю пальцем и говорю Yes|Могу спросить дорогу|Могу объяснить дорогу|Свободный"></evaluation-component>
  <evaluation-component mode="multi" data="1" name="Chushifying Jesus expirience 2" names="E-commerce | Sport, Nutrition, Healthcare | Fintech, Analytics, Accounting | Public sector | Publishing, Art, Culture | Agency"></evaluation-component>

</auditor-info>

`;



Document_Content=`
<document-component
  icon="img/upload_2.svg"
  docType="Uploaded document"
  docName="Portfolio"
  description="Three insightful projects are enough. Quality and depth over quantity. Tell us what the constraints were, which challenges you encountered, how you solved them.">
</document-component>
`;


Evaluation_Content=`
  <evaluation-component open='1' edit='1' mode="yn" data="1" name="Boolean checkbox"></evaluation-component>
  <evaluation-component open='1' edit='1' mode="multi" data="1" name="Select multi items" names="Хуё|Моё|Пятое|Десятое"></evaluation-component>
  <evaluation-component open='1' edit='1' mode="select" data="1" name="Choose one item" names="Junior|Mid-level|Senior|Lead|Principle"></evaluation-component>
  <evaluation-component open='1' edit='1' mode="select" data="1" name="Знание английского" names="Ваще не ебу|Показываю пальцем и говорю Yes|Могу спросить дорогу|Могу объяснить дорогу|Свободный"></evaluation-component>
  <evaluation-component open='1' edit='1' mode="multi" data="1" name="Chushifying Jesus expirience 2" names="E-commerce | Sport, Nutrition, Healthcare | Fintech, Analytics, Accounting | Public sector | Publishing, Art, Culture | Agency"></evaluation-component>
`;


Audit_Content=`
<div class="frame-parent">

<audit-search-panel></audit-search-panel>

<audit-panel
    audit_id="1"
    audit_name="Product designer"
    audit_description="We conduct a thorough audit of product designers' CVs to ensure they meet the qualifications needed for key roles in tech startups."
    number_of_candidates="78"
    number_of_parameters="10"
    requested_evidence="4">
</audit-panel>

<audit-panel
    audit_id="2"
    audit_name="Open source developer"
    audit_description="Comprehensive review of the developer's contributions, code quality, project involvement, and collaboration within the open-source community"
    number_of_candidates="376"
    number_of_parameters="2"
    requested_evidence="1">
</audit-panel>

<audit-panel
    audit_id="3"
    audit_name="Chiromantic palm reading"
    audit_description="Each reading will carefully interpret unique characteristics, personality traits, and potential paths in life based on submitted photo"
    number_of_candidates="6"
    number_of_parameters="4"
    requested_evidence="1">
</audit-panel>

</div>
`;
