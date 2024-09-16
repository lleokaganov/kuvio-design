/*
TODO:

-- Запись в базу по нажатию кнопку записи оценки, вот реально не успел с этими нашими отключениями электричества

-- Вывод CV с этими оценками


? Нью рул выглядит как шкала без пояснения, туда бы хотя бы пояснение минимальное добавить.

Пояснения какого плана? "Нажав на эту кнопку, вы сможете добавить в свою схему оценки новый параметр..."? Или пояснения к уже появившемуся? Типа "Вы можете установить свою шкалу оценки, например от 0 до 100 или от -273.15 до +500 с шагом 99 градусов. Если вам нужно сделать бинарную оценку, просто ставьте min=0 max=1 step=1, если будет время мы потом в дизайне станем превращать такие шкалы в красивенький переключатель..."?

+ И еще надо чтобы когда жмешь на аудитора можно было посмотреть какие у него правила, не нашла это

*/


// Kuvio engine

page_onstart.push("KUVIO.init();");

KUVI={
    // files: false,

    load_files: async function() {
        // скачиваем список файлов файлы
        var r = await KUVIO.API('cv_my');
        if(!r) r=[];
        r.sort((a, b) => b.time - a.time); // Sorting the array by time in descending order
        // Запоминаем
        KUVI.files = r;
    },

};


KUVIO={
//    api_url: "http://localhost:8484/{action}",
    api_url: "https://kuvio-backend.zymologia.fi/{action}",

 init: async function() {

    if(document.location.host == 'localhost') KUVIO.api_url = "http://localhost:8484/{action}";

    KUVIO.LOGIN.init();
    // KUVIO.CV.all();
    // KUVIO.cartLoad(); // загрузить из памяти браузера корзину
    // KUVIO.load(); // загрузить магазин товаров
    // if(KUVIO.test) KUVIO.test();
    // dom('place','OK');
    // IPFS.List();
    // KUVIO.CV.my();
/*
dier( obracom(`

    Вот такой текст.
    В нем https://lleo.me какие-то ссылки.
    Видео как я разговариваю с бабушкой: https://www.youtube.com/watch?v=oDuK2Ds6V90 `) );
*/

    // KUVIO.AUDITOR.all(); // settings();
    // KUVIO.AUDITOR.settings();
    return;
 },


//           ____ _           _      ____ ____ _____
//          / ___| |__   __ _| |_   / ___|  _ \_   _|
//         | |   | '_ \ / _` | __| | |  _| |_) || |
//         | |___| | | | (_| | |_  | |_| |  __/ | |
//          \____|_| |_|\__,_|\__|  \____|_|    |_|
//

 GPT: {

    www_ask: async function() {
	var ara,ask = document.querySelector('textarea.auditor_about').value;
	ajaxon();
	var s = await KUVIO.API('gpt_scale',{ask:ask});

	ajaxoff();
	s=s.replace(/^.*?[\`]{3}(json|)/g,'').replace(/[\`]{3}.*$/g,'');
	console.log(s);

	try {
	    ara = JSON.parse(s);
	} catch(er){
	    salert('Error',800);
	    return;
	}

	if(ara.error) return idie(ara.error);

	ara = KUVIO.AUDITOR.rerules(ara);
	ara.forEach(x=>{
    	    var tr = document.createElement("tr");
	    document.querySelector("TABLE.rules").appendChild(tr);
    	    tr.innerHTML = mpers(KUVIO.AUDITOR.tmpl,{...x,...{tmpl_rule: KUVIO.AUDITOR.tmpl_rule}});
	});
    },

 },


//             _             _ _ _
//            / \  _   _  __| (_) |_ ___  _ __
//           / _ \| | | |/ _` | | __/ _ \| '__|
//          / ___ \ |_| | (_| | | || (_) | |
//         /_/   \_\__,_|\__,_|_|\__\___/|_|
//
 AUDITOR: {

  www_add_request: async function() {
        if(!unis) return;
	var www_auditor=window.event.target.closest('.auditor');
	var ara = { auditor_id: www_auditor.getAttribute('auditor_id') };
	console.log('add request',ara);
	var r = await KUVIO.API('auditor_request_add',ara);
	if(r.id && r.id.length) {
	    // salert("Request sended",1000);
	    www_auditor.querySelector(".my_request").innerHTML = `<input onclick="KUVIO.AUDITOR.www_del_request()" type='button' value='`+mpers("Delete request {day:now}",{now:unixtime()})+`'>`;
	    www_auditor.setAttribute('user_files',r.user_files);
	}
  },

  www_del_request: async function(auditor_id) {
        if(!unis) return;
	var www_auditor=window.event.target.closest('.auditor');
	var ara={
	    auditor_id: www_auditor.getAttribute('auditor_id'),
	    user_files: www_auditor.getAttribute('user_files'),
	}
	console.log('del request',ara);
	if(!ara.user_files) return;
	var r = await KUVIO.API('auditor_request_del',ara);
	if(r.result) {
	    // salert("Request deleted",1000);
	    www_auditor.querySelector(".my_request").innerHTML = `<input onclick="KUVIO.AUDITOR.www_add_request()" type='button' value='REQUEST'>`;
	}
  },


  rerules: function(r){
	r.forEach(x=>{
	    x.percent = (x.name.indexOf('percent')>=0 || x.name.indexOf('%')>=0 || x.name.indexOf('процент')>=0);
	    if(x.percent) {
		if(x.min==undefined || x.min=='') x.min=0;
		if(x.max==undefined || x.max=='') x.max=100;
		if(x.step==undefined || x.step=='') x.step=1;
	    }
	    x.min=1*x.min;
	    x.max=1*x.max;
	    x.step=1*x.step;
	    x.checkbox = x.min+'/'+x.max+'/'+x.step == '0/1/1';
	    x.averageValue = ( 1*x.max - 1*x.min ) / 2 + 1*x.min;
	    x.randomValue = Math.random() * ( 1*x.max - 1*x.min ) + 1*x.min;
	    x.value = x.averageValue;
	    x.disabled = '';
	});
	return r;
  },

  tmpl_rule: `
    <div class='rule_element' data="{#min}|{#max}|{#step}" style='display:flex; align-items:center; width:400px; white-space:nowrap;'>
	{case(checkbox):
	 {1:<label class='switch'><input{#disabled} name="rule_{i}" type="checkbox" onchange="KUVIO.AUDITOR.chRule()"{case(value):{1: checked}{*:}}><div></div></label> <span class='br val' style='margin:0 10px;'>{case(value):{1:ON}{*:OFF}}</span>
	 }
	 {*:
		<span style='font-size:10px;margin:0 10px;'>{#min}</span>
		<input{#disabled} name="rule_{i}" type="range" oninput="KUVIO.AUDITOR.chRule()" min="{#min}" max="{#max}" step="{#step}" value="{#value}" style="width:60%">
		<span style='font-size:10px;margin:0 10px;'>{#max}</span>
		<span class='val'>{#value}</span>{if(percent):%}
	 }
	}
    </div>`,


  tmpl_rule2: `
	{case(checkbox):
	 {1:{case(value):{1:ON}{*:OFF}}}
	 {*:<span style='font-size:10px;margin:0 10px;'>({#min}...{#max})</span> {#value}{if(percent):%}}
	}
    `,

  www_show_rules: async function(id){
	var d=window.event.target;
	var e=d.closest('.auditor_place');
	// if(!id) id=e.getAttribute('data');
	var rules = await KUVIO.API('auditor_id',{id:id});
	if(!rules || !rules.rules) { salert('No rules for '+h(id),1000); return; }
	rules.rules=KUVIO.AUDITOR.rerules(rules.rules);

	clean(d);

	var s=mpers(`
<div class='rules' style='display:inline-block;margin:10px 30px 30px 10px;padding:10px;border: 1px solid #ccc; box-shadow: 0px 15px 15px 15px rgba(0,0,0,0.6); border-radius: 7px 7px 7px 7px;'>
<table cellspacing='20'>{for(rules):<tr>{tmpl0}</tr>}</table>
</div>`,{
	rules: rules.rules,
	tmpl_rule: KUVIO.AUDITOR.tmpl_rule,
	tmpl0: KUVIO.AUDITOR.tmpl0,
	});
	newdiv(s,{class:'auditor_rules'},e,'last');
  },

  all: async function(rt){
	var r = await KUVIO.API('auditor_all');

	// проставить request_time для тех аудиторов, к кому уже сделан запрос
	if(rt){
	    if(!KUVIO.my_requests) KUVIO.my_requests = await KUVIO.API('cv_my_requests');
            // создаем словарь по unic
            var m = KUVIO.my_requests.reduce((map,l) => { map[l.auditor_unic] = l; return map; }, {});
	    r.forEach(x=>{ if(m[x.unic]) {
		    x.request_time = m[x.unic].time;
		    // x.request_id = m[x.unic]._id;
		    x.user_files = m[x.unic].user_files;
		}
	    });
	    // if(!KUVIO.my_grades) KUVIO.my_grades = await KUVIO.API('cv_my_grades');
	}

	var o=mpers(`
<div style='margin:5px; max-width:600px; min-width:400px;'>
{for(auditors):
<div class='auditor' auditor_id='{#_id}' user_files='{#user_files}'>
   <div class='auditor_place' style='padding:10px 25px 10px 25px;position:relative;'>
    <div style='position:absolute;right:20px;top:25px;' class='br'>
	{noif(rt):
	    <div class='my_request' style='font-size:10px;display:inline-block;'>
	    {case(request_time):
		{undefined:<input onclick="KUVIO.AUDITOR.www_add_request()" type='button' value='REQUEST'>}
		{*:<input onclick="KUVIO.AUDITOR.www_del_request()" type='button' value='Delete request {day:request_time}'>}
	    }
	    </div>
	}
	<!-- {day:time} -->
    </div>

    <div style='font-weight:bold;font-size:18px;padding:5px;'>
	<div style='display:inline-block;font-size:28px;user-select:none;' class='mv' alt='Show rules' onclick="KUVIO.AUDITOR.www_show_rules('{#_id}')">&#129440;</div>{#login}
    </div>

    <div style='font-style:italic;padding-top:8px;'>{#about}</div>

   </div>
</div>
}
</div>`,{
	auditors: r,
	rt: (rt?0:1),
});

	if(rt) ohelpc('auditors','All Auditors',o);
	else dom('place',o);
  },

  requests: async function(){

        if(!unis) await KUVIO.LOGIN.login();

	var r = await KUVIO.API('auditor_my_requests');

	// my rules
	var rules = await KUVIO.API('auditor_my'); // var st=KUVIO.AUDITOR.string2system(r);
	if(!rules || !rules.rules) return;
	rules.rules=KUVIO.AUDITOR.rerules(rules.rules);

	var o=mpers(`
<div style='margin:5px;'>

{for(requests):

<form>

<input type='hidden' name='rules_blake3' value='{#rules.blake3}'>
<input type='hidden' name='request_id' value='{#_id}'>

<div>user_files: {#user_files}</div>
<div>request_id: {#_id}</div>
<div>rules.blake: {#rules.blake3}</div>

<table border='0' cellspacing="10" cellpadding="1">
    {for(filelist.files):

<tr hash="{#hash}" name="{#name}">
    <td align='right'><a onclick="return IPFS.View()" href='{ipfs}{#hash}'>{#name}</a></td>
    <td align='right' class='br'>{#size}</td>
    <td class='r'>{dat:time}</td>
</tr>

    }
</table>

<div class='rules' style='display:inline-block;margin:10px 30px 30px 10px;padding:10px;'>
<table cellspacing='20'>{for(rules.rules):
    <tr>
        <td>{#name}:</td>
        <td>{tmpl_rule}</td>
    </tr>
}</table>
</div>

<center><button type="submit" class="input_btn mv0" style="display:unset;" onclick="KUVIO.AUDITOR.www_request_save();return false;" return false;'>Save</button></center>

</form>
}
</div>`,{
	requests: r,
	rules: rules,
	tmpl_rule: KUVIO.AUDITOR.tmpl_rule,

 });

	dom('place',o);
  },




  www_request_save: async function(){
	var d=window.event.target;
	var form = d.closest('FORM')
	var ara={};
	form.querySelectorAll('INPUT').forEach(e=>{
	    ara[e.name] = (e.type == 'checkbox' ? (e.checked?1:0) : e.value );
	});
	var r = await KUVIO.API('auditor_grade_save',ara);
	// dier(r);
	if(r.result) {
	    clean(form);
	    salert('saved',300);
	}
  },


  tmpl:`
    <td style='white-space: nowrap;'>
	<div style='display:inline-block;font-size:24px;' onclick="KUVIO.AUDITOR.delRule()" class="mv" style="font-size:22px" alt="Delete">🗑</div>
	<div style='display:inline-block;font-size:24px;' onclick="KUVIO.AUDITOR.editRule()" class="mv" style="font-size:22px" alt="Edit">&#128221;</div>
    </td>
    <td>
        <div class='rules_name' style='font-weight:bold;font-size:10px;'>{#name}</div>
        <div class='rules_description' style='font-style:italic;font-size:8px;'>{#description}</div>
    </td>
    <td>{tmpl_rule}</td>
  `,

  tmpl0:`
    <td>
        <div class='rules_name' style='font-weight:bold;font-size:10px;'>{#name}</div>
        <div class='rules_description' style='font-style:italic;font-size:8px;'>{#description}</div>
    </td>
    <td>{tmpl_rule}</td>
  `,

  getTRdata: function(tr) {
	var [min,max,step]=tr.querySelector('.rule_element').getAttribute('data').split('|');
	return {
	    min: min,
	    max: max,
	    step: step,
	    name: tr.querySelector('.rules_name').innerHTML.trim(),
	    description: tr.querySelector('.rules_description').innerHTML.trim(),
	};
  },

  editRule: async function(createNew){
	var name = 'editRule', ara, tr = false;

	if(createNew) {
	    ara = {
		min: 0,
		max: 100,
		step: 1,
		name: "",
		description: "",
	    };
	} else {
	    tr=window.event.target.closest('TR');
	    ara=KUVIO.AUDITOR.getTRdata(tr);
	}

    var ara = await new Promise((resolve) => {

	ohelpc(name,'Edit rule',mpers(`
<div>Name: <input value='{#name}' name='name' type='text' placeholder='English knowledge in percentage' size='20'></div>
<div>Description: <input value='{#description}' name='description' type='text' placeholder='' size='50'></div>
<div>
Min: <input value='{#min}' name='min' type='text' size='3' placeholder='0'>
Max: <input value='{#max}' name='max' type='text' size='3' placeholder='100'>
Step: <input value='{#step}' name='step' type='text' size='2' placeholder='1'>
</div>
<center><button type="submit" class="input_btn mv0" style="display:unset;" onclick="KUVIO.AUDITOR.www_request_save();return false;" return false;'>Save</button></center>
	`,ara));
	var e=dom(name);

	e.querySelector('button').onclick=function() { // Save
	    var ara={},s,q;

	    q=e.querySelector("input[name='name']"); s=q.value.trim();
	    if(!s.length) { q.classList.add('input_warning'); return; }
	    ara.name=s; q.classList.remove('input_warning');

	    q=e.querySelector("input[name='description']"); s=q.value.trim();
	    if(!s.length) { q.classList.add('input_warning'); return; }
	    ara.description=s; q.classList.remove('input_warning');

	    q=e.querySelector("input[name='min']"); s=Number(q.value.trim()) || 0;
	    // if(!s.length) { q.classList.add('input_warning'); return; }
	    ara.min=s; q.classList.remove('input_warning');

	    q=e.querySelector("input[name='max']"); s=Number(q.value.trim()) || 0;
	    if(s >= ara.max) { q.classList.add('input_warning'); return; }
	    ara.max=s; q.classList.remove('input_warning');

	    q=e.querySelector("input[name='step']"); s=Number(q.value.trim()) || 0;
	    if(s == 0 || s > ara.max-ara.min) { q.classList.add('input_warning'); return; }
	    ara.step=s; q.classList.remove('input_warning');

	    resolve(ara);
	};
    });
    clean(dom(name));
    var [ara]=KUVIO.AUDITOR.rerules([ara]);
    if(!tr) {
	tr = document.createElement("tr");
	document.querySelector("TABLE.rules").appendChild(tr);
    }
    tr.innerHTML = mpers(KUVIO.AUDITOR.tmpl,{...ara,...{tmpl_rule: KUVIO.AUDITOR.tmpl_rule}});
  },

  chRule: async function(){
	var d=window.event.target, val='?';
	if(d.type=='range') val=d.value;
	else if(d.type=='checkbox') val=d.checked?'ON':'OFF';
	else console.log('no: '+d.type);
	var e=d.closest('DIV').querySelectorAll('.val')[0];
	if(e) e.innerHTML=val;
  },

  delRule: function(){
	var e=window.event.target.closest('TR');
	e.classList.add('input_warning');
	if(confirm('Delete rules?')) clean(e);
	else e.classList.remove('input_warning');
  },

  delRuleAll: function(){
    if(confirm('Delete all rules?')) document.querySelectorAll("TABLE.rules TR").forEach(tr=>{ clean(tr); });
  },

  saveRules: async function(){
	var ara={
	    about: document.querySelector('textarea.auditor_about').value,
	    rules: [],
	};
	document.querySelectorAll("TABLE.rules TR").forEach(tr=>{ ara.rules.push(KUVIO.AUDITOR.getTRdata(tr)); });
        var r = await KUVIO.API('auditor_my_save',ara);
	KUVIO.AUDITOR.settings();
  },

  // Установки аудиотора и его регистрация
  settings: async function(){
        if(!unis) await KUVIO.LOGIN.login();

	var r = await KUVIO.API('auditor_my'); // var st=KUVIO.AUDITOR.string2system(r);
	if(!r) r={};
	if(!r.rules) r.rules=[];
	r.rules=KUVIO.AUDITOR.rerules(r.rules);

	dom('place',mpers(`
<center><div style='text-align:left;'>
<h2>Registration as Auditor <b>{#unis_login}</b></h2>

<p><br>About:
<div><textarea class='auditor_about' style='width:100%;height:60px;'>{#about}</textarea></div>

<table border='0' cellspacing='10' class='rules'>{for(rules):<tr>{tmpl}</tr>}</table>

<p><br><div>
    <input type='button' onclick='KUVIO.GPT.www_ask()' value='Creative'>
    <input type="button" onclick="KUVIO.AUDITOR.editRule(q)" value='New rule'>
    {if(rules.length): <input type='button' onclick='KUVIO.AUDITOR.delRuleAll()' value='Delete All'> }
</div>

<center><button type="submit" class="input_btn mv0" style="display: unset;" onclick='KUVIO.AUDITOR.saveRules(); return false;'>Save</button></center>

</div></center>`,{ ...r,...{
	unis_login: unis_login,
	tmpl: KUVIO.AUDITOR.tmpl,
	tmpl_rule: KUVIO.AUDITOR.tmpl_rule,
} }));

/*
{_STYLES:
  .oce SPAN { margin-left:20px; }
_}

function cha() {
   var e=window.event.target;
   var v=e.value;
console.log('min: '+typeof(e.min)+' '+e.min);
console.log('max: '+typeof(e.max)+' '+e.max);
console.log('step: '+typeof(e.step)+' '+e.step);
console.log('v: '+typeof(v)+' '+v);
   if(1*e.min==0 && 1*e.max==1 && (1*e.step==1||1*e.step==0)) v=(1*v?'да':'нет');
   e.closest('div').querySelector('span').innerHTML=v;
}
*/


  },

 },

//           ____  __     __
//          / ___| \ \   / /
//         | |      \ \ / /
//         | |___    \ V /
//          \____|    \_/
//

 CV: {

    all: async function() {
	var r = await KUVIO.API('cv_all');
	if(!r) return dom('place','No CV');
	r.sort((a, b) => b.time - a.time); // Sorting the array by time in descending order

//=======================================================
	var idx = r.map(item => item._id).filter((value, index, self) => self.indexOf(value) === index);

	var grades = await KUVIO.API('cv_packets_grades',{packets:idx});
	var m={};
	if(!grades) grades=[];
	else grades.forEach(x=>{
	    x.rules=KUVIO.AUDITOR.rerules(x.rules);
	    x.grades.forEach((l,i)=>{
		x.rules[i].value=l;
		x.rules[i].disabled=' disabled';
	    });
	    if(!m[x.user_files]) m[x.user_files]=[];
	    m[x.user_files].push(x);
	});

	r.forEach(x=>{ x.grades = (m[x._id]?m[x._id]:[]); });

// console.log(r);
//=======================================================


	dom('place',mpers(`<h2>All packets: {#packets.length}</h2>
<center><table border='0' cellspacing="20" cellpadding="10">
{for(packets):
<tr valign='top'>

    <td align='right'><a href='mailto:{#user_email}'>{#user_login}</a></td>

    <td>{for(files):
        <div><a onclick="return IPFS.View()" href='{ipfs}{#hash}' hash='{#hash}' name='{#name}'>{#name}</a></div>
    }</td>

    <td>

<div style='text-align:left;'>{for(grades):
    <div style='display:inline-block;padding:10px;user-select:none;' alt="{#auditor_about}<br><a href='mailto:{#auditor_email}'>{#auditor_email}</a>">
      <div style='display:inline-block;font-size:18px;'>&#129440;</div> {#auditor_login}
	<span class='br'>{day:time}</span>
    </div>

    <div style='margin-left:50px'>
      <table border='0'>{for(rules):
       <tr>
        <td class='r'>{#name} <span style='font-size:10px;'>({case(checkbox):
            {1:ON/OFF}
            {*:{#min}...{#max}}
        })</span>:</td>
        <td>
	{case(checkbox):
            {1:{case(value):{1:ON}{*:OFF}}}
            {*:{#value}{if(percent):%}}
        }
	</td>
       </tr>
      }</table>
    </div>
}</div>

    </td>


<!--
    <td align='right'><a onclick="return IPFS.View()" href='{ipfs}{#hash}'>{#name}</a></td>
    <td align='right' class='br'>{#size}</td>
    <td class='r'>{dat:time}</td>
-->
</tr>
}
</table>
</center>`,{
	packets:r,
	ipfs: IPFS.endpoint,
	tmpl_rule: KUVIO.AUDITOR.tmpl_rule2,
    }));

    },


    all_ipfs: async function() {
	var r = await KUVIO.API('cv_all_ipfs');
	if(!r) return dom('place','No CV');

	r.sort((a, b) => b.time - a.time); // Sorting the array by time in descending order
	dom('place',mpers(`<h2>All files: {#files.length}</h2>
<center><table border='0' cellspacing="10" cellpadding="1">{for(files):
<tr hash="{#hash}" name="{#name}">
    <td align='right'><a onclick="return IPFS.View()" href='{ipfs}{#hash}'>{#name}</a></td>
    <td align='right' class='br'>{#size}</td>
    <td class='r'>{dat:time}</td>
    <td><div alt='Delete' onclick='KUVIO.CV.delFile()' class='mv' style='font-size:22px'>&#x1F5D1;</div></td>
</tr>
}</table>
</center>`,{files:r, ipfs: IPFS.endpoint}));

    },
















    my: async function() {
        if(!unis) await KUVIO.LOGIN.login();

	var r = await KUVIO.API('cv_my');
	if(!r) r=[];
	r.sort((a, b) => b.time - a.time); // Sorting the array by time in descending order

	KUVIO.my_requests = await KUVIO.API('cv_my_requests');

	var grades = await KUVIO.API('cv_my_grades');
	if(!grades) grades=[];
	else grades.forEach(x=>{
	    x.rules=KUVIO.AUDITOR.rerules(x.rules);
	    x.grades.forEach((l,i)=>{
		x.rules[i].value=l;
		x.rules[i].disabled=' disabled';
	    });
	});
	// dier(mpers(``,{gredes:rx}));
	// return;

	dom('place',mpers(`<h2>My files: {#files.length}</h2>

<center><table border='0' cellspacing="10" cellpadding="1">

<tr class='br' align='center'>
    <td>visible</td>
    <td>name</td>
    <td>size</td>
    <td>time</td>
    <td></td>
</tr>

{for(files):
<tr hash="{#hash}" name="{#name}">
    <td><input onchange='KUVIO.CV.setVisible()' type='checkbox' {if(visible): checked}></td>
    <td align='right'><a onclick="return IPFS.View()" href='{ipfs}{#hash}'>{#name}</a></td>
    <td align='right' class='br'>{#size}</td>
    <td class='r'>{dat:time}</td>
    <td><div alt='Delete' onclick='KUVIO.CV.delFile()' class='mv' style='font-size:22px'>&#x1F5D1;</div></td>
</tr>
}

</table>

<div>
<input name="file[]" size="30" type="file" multiple onchange="KUVIO.CV.addFiles()" alt='Upload 1 or more file'>
</div>

<div><button type="submit" class="input_btn mv0" style="display: unset;" onclick='KUVIO.CV.add_auditors(); return false;'>Add Auditors</button></div>




<div style='text-align:left;'>{for(grades):
    <div style='display:inline-block;padding:10px;user-select:none;' alt="{#auditor_about}<br><a href='mailto:{#auditor_email}'>{#auditor_email}</a>">
      <div style='display:inline-block;font-size:18px;'>&#129440;</div> {#auditor_login}
	<span class='br'>{day:time}</span>
    </div>

    <div style='margin-left:50px'>
      <table cellspacing='20'>{for(rules):
	<tr>
        <td class='r'>{#name}:</td>
        <td>{tmpl_rule}</td>
	</tr>
      }</table>
    </div>
}</div>


<div style='text-align:left;'>{for(requests):
    <div style='display:block;padding:10px;user-select:none;' alt="{#auditor_about}<br><a href='mailto:{#auditor_email}'>{#auditor_email}</a>">
     <div style='display:inline-block;font-size:18px;'>&#129440;</div>
     {#auditor_login}
     <span class='br'>{day:time}</span>
     <span class='br' style='color:grey'>waiting</span>
    </div>
}</div>




</center>`,{
	files:r,
	ipfs: IPFS.endpoint,
	requests: KUVIO.my_requests,
	grades: grades,
	tmpl_rule: KUVIO.AUDITOR.tmpl_rule,
}));

    },

  add_auditors: async function(){
	KUVIO.AUDITOR.all(1);
  },

  setVisible: async function(){
    var e=window.event.target;
    var hash=IPFS.find_hash(e);
    var r = await KUVIO.API('cv_set_visible',{hash:hash, visible:e.checked});
    KUVIO.CV.my(); // Upload my list
  },

  delFile: async function(){
    var e=window.event.target;
    var hash=IPFS.find_hash(e);
    var name=IPFS.find_tr(e).getAttribute('name');
    if(!confirm(`Delete "${name}" ?`)) return;
    var r = await KUVIO.API('cv_del_file',{hash:hash});
    KUVIO.CV.my(); // Upload my list
  },

  addFiles: async function(){
    if(!unis) return;
    var e=window.event.target;
    ajaxon();
    var formData = new FormData();
    for(var i=0; i < e.files.length; i++) formData.append("file[]", e.files[i], e.files[i].name);
    formData.append('unic', unis);
    // Отправка данных на сервер с помощью fetch
    try {
        let response = await fetch( mpers(KUVIO.api_url,{action:'cv_my_add'}) , { method: 'POST', body: formData });
	ajaxoff();
        if(response.ok) {
	    const r = await response.text();
	    KUVIO.CV.my(); // Upload my list
        } else KUVIO.error('Upload error: '+response.statusText);
    } catch(er) {
        ajaxoff();
	KUVIO.error('Upload files error: '+er);
    }
  },

},

 error: function(s){ console.error(s); idie(s); return false; },

 API: async function(action,data) {
	if(!data) data={};
	KUVIO.API_last={data:data,action:action};
	data.action = action;
	data.num = num;
	data.unic = (typeof(unis)=='undefined' ? false : unis);
	var url = mpers(KUVIO.api_url,data);
	try {
    	    const response = await fetch(url, {
        	method: 'POST',
        	body: JSON.stringify(data),
    	    });
    	    if(!response.ok) throw new Error(`HTTP error status: ${response.status}`);
	    const r = await response.json();
	KUVIO.API_last.error=r.error;
	KUVIO.API_last.result=r.result;
	    if(r.error || typeof(r.result)=='undefined') return KUVIO.error('Error API.'+action+': '+r.error);
	    return r.result;
	} catch(er) {
	    return KUVIO.error('Error during API call: '+er);
	}
    },
 API_last: {
 },

//          _        ___     ____   ___   _   _
//         | |      / _ \   / ___| |_ _| | \ | |
//         | |     | | | | | |  _   | |  |  \| |
//         | |___  | |_| | | |_| |  | |  | |\  |
//         |_____|  \___/   \____| |___| |_| \_|
//

 LOGIN: {

  name: 'kuvio',

  init: async function() {

    if(unis) return; // !!!!!!!!!!!!!!!!!!!!!!!!!!!

    unis=f_read(KUVIO.LOGIN.name);
	console.log('unis('+typeof(unis)+')='+unis);
    unis_login=f_read(KUVIO.LOGIN.name+'_login');
	console.log('unis_login('+typeof(unis_login)+')='+unis_login);
    var l = (unis.indexOf && unis.indexOf('-') && unis_login);

    var e=dom('.unis_login_name');
    e.innerHTML=(l && unis_login && (''+unis_login).length ? '&#128100;&nbsp;'+unis_login : 'Login');

//    max-width:10ch; white-space:nowrap; overflow:hidden;

    if(l) { e.setAttribute('alt','Logged in as: <b>'+h(unis_login)+'</b>'); init_tip(e); }
    else { e.removeAttribute('tiptitle'); e.removeAttribute('alt'); }
  },

  logout: async function() {
    f_del(KUVIO.LOGIN.name);
    f_del(KUVIO.LOGIN.name+'_login');
    KUVIO.LOGIN.init();
  },

/*
  check: async function() {
    // restore unis
    unis=f_read(KUVIO.LOGIN.name);
    if(!unis) {
	unis = await KUVIO.API('login_create');
        if(!unis) return KUVIO.error('Server error: login/create');
	f_save(KUVIO.LOGIN.name,unis);
	console.log('Login created: ',unis);
    }
  },
*/



  login: async function() {
    var name='enter_password';
    var a = await new Promise((resolve) => {
	if(!dom(name)) ohelpc(name,'Login',mpers(`
<div style='width: 300px; text-align: center;'>

{if(unis):
<div style='margin: 20px 0 20px 0;' class="mv0">You are logged as <b>{#unis_login}</b><br><a href="#" onclick="KUVIO.LOGIN.logout(); clean('enter_password');">Logout</a></div>
}

<div style='position:relative;margin-bottom: 15px;'>
    <span class='input_symb'>&#128100;</span>
    <input class='input_form' type="text" placeholder="Username" name="username" required>
</div>

<div style='position:relative;margin-bottom: 15px;'>
    <span class='input_symb'>&#128274;</span>
    <input class='input_form' type="password" placeholder="Password" name="password" id="password" required>
    <div class='mv0' onclick="this.innerHTML=(this.innerHTML=='&#128065;'?'&#128065;&#65039;':'&#128065;'); var e=this.parentNode.querySelector('input');e.setAttribute('type',e.getAttribute('type')=='text'?'password':'text');" style="cursor: pointer; position: absolute; right: 50px; top: 50%; transform: translateY(-50%);">&#128065;</div>
</div>

<div class='login_email' style='position:relative;margin-bottom: 15px;display:none;'>
    <span class='input_symb'>&#9993;&#65039;</span>
    <input class='input_form' type="text" placeholder="contact@email.com" name="email" required>
</div>

<button type="submit" class="input_btn mv0">Sign In</button>
<div class='ajax' style='display:none'>{ajaxgif}</div>
<!-- todo:
div style='margin-top: 10px;' class="r mv0"><a class='login_forgot' href="#" onclick="alert('Ну и мудак, чо')">Forgot Password?</a></div
-->
<div style='margin-top: 10px;' class="r mv0 ">No account? <a href="#" class='login_create' onclick="alert('Ну и мудак, чо')">Create</a></div>
</div>`,{
    ajaxgif: ajaxgif,
    unis: unis && (''+unis).length,
    unis_login: unis_login,
}));
	var e=dom(name);

	e.querySelector('button').onclick=function(){ // Login
	    var a={},q;
	    q=e.querySelector("input[name='username']"); a.login = q.value;
	    if(a.login.length<3) { q.classList.add('input_warning'); return; }
	    q.classList.remove('input_warning');

	    q=e.querySelector("input[name='password']"); a.password = q.value;
	    if(a.password.length<1) { q.classList.add('input_warning'); return; }
	    q.classList.remove('input_warning');

	    if(e.querySelector('.login_email').style.display!='none') {
		q=e.querySelector("input[name='email']"); a.email = q.value;
		if(!(/^[^\s@]+@[^\s@]+\.[^\s@\.]+$/).test(a.email)) { q.classList.add('input_warning'); return; }
		q.classList.remove('input_warning');
	    }
	    dom(e.querySelector('button')).style.display='none';
	    dom.on(e.querySelector('.ajax'));
	    resolve(a);
	};

	e.querySelector('.login_create').onclick=function(){ // Switch to register form
	    dom.on(e.querySelector('.login_email'));
	    dom(e.querySelector('button')).innerHTML='Register';
	    dom.off(e.querySelector('.login_noacc'));
	};

	e.querySelector('button').style.display='unset';
	e.querySelector('.ajax').style.display='none';
    });

    if(a.email) unis = await KUVIO.API('unic_create',a);
    else unis = await KUVIO.API('unic_login',a);
    if(!unis||unis=='') { salert('Error login/password',2000); return KUVIO.LOGIN.login(); }
    clean(name);
    f_save(KUVIO.LOGIN.name,unis);
    if(a.login) f_save(KUVIO.LOGIN.name+'_login',a.login);
    console.log('Login=['+a.login+'] Unis: ',unis);
    KUVIO.LOGIN.init();
 },

},

};


function unixtime() {
    return Math.floor(Date.now() / 1000);
}
