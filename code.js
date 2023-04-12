
var dataGPTru={'В': 0.05777550384401138, 'ДО': 0.0008576329331046312, 'К': 0.008437684808241128, 'НЕ': 0.007718696397941682, 'ОДНАКО': 0.0030035556798857473, 'ЗА': 0.0008576329331046312, 'КАК': 0.0017152658662092624, 'БЫЛО': 0.0008576329331046312, 'ПРОТИВ': 0.0015729405153650032, 'ЯВЛЯЕТСЯ': 0.005291803777511123, 'МОГУТ': 0.004576496195250751, 'БЫТЬ': 0.0038611886129903783, 'НАПРИМЕР,': 0.005149478426666863, 'КРОМЕ': 0.0024305734484696344, 'ОСОБЕННО': 0.0022882480976253753, 'ЕЩЕ': 0.0022882480976253753, 'КОТОРЫЙ': 0.006149436710615753, 'ИНФОРМАЦИЮ': 0.0015729405153650032, 'НЕОБХОДИМО': 0.0022882480976253753, 'ДЛЯ': 0.0015729405153650032, 'НО': 0.0017152658662092624, 'ПОМОЧЬ': 0.0015729405153650032, 'Я': 0, 'МЕНЯ': 0, 'ТОТ': 0, 'ОН': 0, 'НИ': 0, 'ПОЧТИ': 0, 'ВРЕМЯ': 0, 'ИМ': 0}
var dataHumru={'Я': 0.011842223218287772, 'КАК': 0.00799193186911699, 'В': 0.03645002241147468, 'ДЛЯ': 0.007507844016136261, 'МЕНЯ': 0.004787090990587181, 'ТОТ': 0.001900493052442851, 'НЕ': 0.020448229493500683, 'ОН': 0.007969520394441956, 'БЫЛО': 0.00833706857911251, 'НИ': 0.002770058269834155, 'ПОЧТИ': 0.0021290900941281937, 'НО': 0.005907664724338861, 'К': 0.0038233975795607354, 'ДО': 0.0033886149708650835, 'ВРЕМЯ': 0.0032048408785298075, 'ЗА': 0.0052666965486329, 'ИМ': 0.0023128641864634696, 'БЫТЬ': 0.0010757507844016136, 'КОТОРЫЙ': 0.00105333930972658, 'ЯВЛЯЕТСЯ': 0.0008695652173913044, 'ОДНАКО': 0.0, 'ПРОТИВ': 0.0, 'МОГУТ': 0.0, 'НАПРИМЕР,': 0.0, 'КРОМЕ': 0.0, 'ОСОБЕННО': 0.0, 'ЕЩЕ': 0.0, 'ИНФОРМАЦИЮ': 0.0, 'НЕОБХОДИМО': 0.0, 'ПОМОЧЬ': 0.0}
var data={}
var lang="rus";
var outlen=document.getElementById("outlen");
var tst=document.getElementById("tst");
var langim= document.getElementById("lang");
var text = document.getElementById("input");
var button = document.getElementById("button");
var output = document.getElementById("output");
var EGPT=0;
var txtt="";
var EHum=0;
button.onclick=function(){
if(lang=="rus"){
    var dataGPT=dataGPTru;
    var dataHum=dataHumru;
}
if(lang=="eng"){
  var dataGPT=dataGPTru;
  var dataHum=dataHumru;
}
txtt=text.innerText;
txt=txtt.toUpperCase().split(' ');
for(let key in dataGPT){
  data[key]=0;
}
for(var i=0; i<txt.length;i++){
  if(txt[i] in dataGPT){
    data[txt[i]]+=1/txt.length;
  }
  
}
for(let key in data){
  EGPT+=Math.abs(data[key]-dataGPT[key]);
  EHum+=Math.abs(data[key]-dataHum[key]);
}
if(EGPT>EHum){if(lang=="eng"){output.innerText="This text is written by human"}else if(lang=="rus"){output.innerText="Текст написан людьми"}output.parentElement.setAttribute("class", "elem hum");}
else{if(lang=="eng"){output.innerText="This text is written by ChatGPT"}else if(lang=="rus"){output.innerText="Текст написан в ChatGPT"}output.parentElement.setAttribute("class", "elem gpt");}
}
langim.onchange=function(){
  lang=langim.value;
  if(lang=="rus"){
    output.innerText="Сначала напишите текст!";
    tst.innerText="Проверяет, написан ли текст в ChatGPT"; 
    outlen.innerText="Язык:";
    button.value="Проверить текст";
    text.setAttribute("data-text","Введите текст...")
  }
  else if(lang=="eng"){
    output.innerText="First write your text!";
    tst.innerText="Tests if your text is from ChatGPT"; 
    outlen.innerText="Language:";
    button.value="Test for chatGPT";
    text.setAttribute("data-text","Your text here...")
  }
  output.parentElement.setAttribute("class", "elem not");
}
setInterval(function(){
  if(text.innerText!=txtt){
    output.parentElement.setAttribute("class", "elem not");
  }
},100);