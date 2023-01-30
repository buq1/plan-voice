if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
}
else {// code for IE6, IE5
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET", "xml/plan_voice.xml", false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;

var hbh = xmlDoc.getElementsByTagName("PLAN_NO")[0];
var yjsj = xmlDoc.getElementsByTagName("EVENT_LX")[0];
var ejsj = xmlDoc.getElementsByTagName("SECONDARY_EVENT")[0];
var ksyy = xmlDoc.getElementsByTagName("START_VOICE")[0];
var hbyy = xmlDoc.getElementsByTagName("VOICE_PLAN_NO")[0];
var yjsjyy = xmlDoc.getElementsByTagName("VOICE_LX")[0];
var ejsjyy = xmlDoc.getElementsByTagName('VOICE_SEC')[0];
var arrAudio = [];     //存放语音的地方
var arrNex = 0;
var ttsAudio = document.getElementById('audio_id');  //获取语音控件
var bfzt = '';
var ejkq = 0; var hzero = 0;

window.onload = function () {

  setFN();
  setFLE();

}

function setFN() {//航班号输出
  var hblb = document.getElementById('ppx');
  for (var i = 0; i < hbh.getElementsByTagName('no').length; i++) {
console.log( hbh.getElementsByTagName('no')[i].childNodes[0].nodeValue);
    var ui = document.createElement('option');
    ui.setAttribute('value', hbh.getElementsByTagName('no')[i].childNodes[0].nodeValue);
    hblb.appendChild(ui);
  }
}

function setFLE() {//事件类型输出
  var sjlx = document.getElementById('sjlx');
  for (var x = 0; x < yjsj.getElementsByTagName('LX').length; x++) {
    var xx = document.createElement('option');
    xx.setAttribute('value', yjsj.getElementsByTagName('LX')[x].childNodes[0].nodeValue);
    xx.innerHTML = yjsj.getElementsByTagName('LX')[x].childNodes[0].nodeValue;
    sjlx.appendChild(xx);
  }
}

function setSE(xzx) {//二级事件输出
  var num = xzx.selectedIndex;
  if (xzx.options[num].value == yjsj.getElementsByTagName('ejkg')[0].childNodes[0].nodeValue) {
    ejkq = 1;
    document.getElementById('ejsjkg').style.display = 'block';
    var ej = document.getElementById('ejsj');
    for (var y = 0; y < ejsj.getElementsByTagName('event').length; y++) {
      var xx = document.createElement('option');
      xx.setAttribute('value', ejsj.getElementsByTagName('event')[y].childNodes[0].nodeValue);
      xx.innerHTML = ejsj.getElementsByTagName('event')[y].childNodes[0].nodeValue;
      ej.appendChild(xx);

    }
  } else {
    ejkq = 0;
    document.getElementById('ejsjkg').style.display = 'none';

  }
}

function setHistory(fn, et, se, bt, bs) {//历史记录输出

  var bg = document.getElementById('biaoge');
  var bh = document.getElementsByClassName('biaohang');
  var pd = 1, ar;
  for (var z = 0; z < bh.length; z++) {

    if (fn == bh[z].childNodes[0].innerHTML && et == bh[z].childNodes[1].innerHTML && se == bh[z].childNodes[2].innerHTML) {
      var pd = 0;
      ar = z;
      break;
    }

  }
  if (pd == 1) {
    if (bh.length < 15) {
      var nm=bh.length;
       document.getElementsByName('xuhao')[nm].style.display='block';
    }
    if (bh.length == 0) {
      var han = document.createElement('div');
      han.setAttribute('class', 'biaohang');
      han.innerHTML = '<div>' + fn + '</div><div>' + et + '</div><div>' + se + '</div><div>' + bt + '</div><div>' + bs + '</div><div><a style="cursor: pointer;color: sandybrown;text-decoration: underline;float:left;" onclick="reply(this)">重播</a><a style="cursor: pointer;color: sandybrown;text-decoration: underline;pointer-events: none;float:left;margin-left:6px;" id="sc" onclick="delh(this)">删除</a><div name="jiesu" style="width:90px;height:20px;float:left;"><a style="cursor: pointer;color: sandybrown;text-decoration: underline;margin-left:6px;"  onclick="jiesu()">结束</a></div></div>';
      bg.appendChild(han);
    } else {
      var han = document.createElement('div');
      han.setAttribute('class', 'biaohang');
      han.innerHTML = '<div>' + fn + '</div><div>' + et + '</div><div>' + se + '</div><div>' + bt + '</div><div>' + bs + '</div><div><a style="cursor: pointer;color: sandybrown;text-decoration: underline;float:left;" onclick="reply(this)">重播</a><a style="cursor: pointer;color: sandybrown;text-decoration: underline;pointer-events: none;float:left;margin-left:6px;" id="sc" onclick="delh(this)">删除</a><div name="jiesu" style="width:90px;height:20px;float:left;"><a style="cursor: pointer;color: sandybrown;text-decoration: underline;margin-left:6px;"  onclick="jiesu()">结束</a></div></div>';
      bh[0].parentNode.insertBefore(han, bh[0]);
    }
  } else {

    bh[ar].parentNode.removeChild(bh[ar]);
    if (bh.length == 0) {
      var han = document.createElement('div');
      han.setAttribute('class', 'biaohang');
      han.innerHTML = '<div>' + fn + '</div><div>' + et + '</div><div>' + se + '</div><div>' + bt + '</div><div>' + bs + '</div><div><a style="cursor: pointer;color: sandybrown;text-decoration: underline;float:left;" onclick="reply(this)">重播</a><a style="cursor: pointer;color: sandybrown;text-decoration: underline;pointer-events: none;float:left;margin-left:6px;" id="sc" onclick="delh(this)">删除</a><div name="jiesu" style="width:90px;height:20px;float:left;"><a style="cursor: pointer;color: sandybrown;text-decoration: underline;margin-left:6px;"  onclick="jiesu()">结束</a></div></div>';
      bg.appendChild(han);
    } else {
      var han = document.createElement('div');
      han.setAttribute('class', 'biaohang');
      han.innerHTML = '<div>' + fn + '</div><div>' + et + '</div><div>' + se + '</div><div>' + bt + '</div><div>' + bs + '</div><div><a style="cursor: pointer;color: sandybrown;text-decoration: underline;float:left;" onclick="reply(this)">重播</a><a style="cursor: pointer;color: sandybrown;text-decoration: underline;pointer-events: none;float:left;margin-left:6px;" id="sc" onclick="delh(this)">删除</a><div name="jiesu" style="width:90px;height:20px;float:left;"><a style="cursor: pointer;color: sandybrown;text-decoration: underline;margin-left:6px;"  onclick="jiesu()">结束</a></div></div>';
      bh[0].parentNode.insertBefore(han, bh[0]);
    }
  }

}
function delh(tHang) {//删除一条历史记录
  var io = document.getElementsByClassName('biaohang');

  tHang.parentNode.parentNode.parentNode.removeChild(tHang.parentNode.parentNode);
  if (io.length < 15) {
    document.getElementsByName('xuhao')[io.length].style.display = 'none';
  }

}



function reply(thb) {//重播
  if(!ttsAudio.paused){
    var r = confirm("系统正在播放中，是否更替？");
    if (r == true) {
        
    } else {
        return false;
    }
  }
  thb.parentNode.childNodes[2].style.display='block';
  thb.parentNode.childNodes[1].style.pointerEvents = "none";
 thb.parentNode.parentNode.childNodes[3].innerHTML='';
 thb.parentNode.parentNode.childNodes[3].innerHTML=new_time();
  arrAudio = new Array();
  ttsAudio.pause();
  arrNex = 0;
  var yw = document.getElementById('ywbb').checked;
  var aa, ab, ac;
  for (var u = 0; u < document.getElementsByClassName('biaohang').length; u++) {
    if (thb == document.getElementsByClassName('biaohang')[u].childNodes[5].childNodes[0]) {
      bfzt = u;
      break;
    }
  }

  var q = thb.parentNode.parentNode.childNodes[0].innerHTML;
  var w = thb.parentNode.parentNode.childNodes[1].innerHTML;
  var e = thb.parentNode.parentNode.childNodes[2].innerHTML;
  if (yw) {
    for (var a = 0; a < hbh.getElementsByTagName('no').length; a++) {
      if (q == hbh.getElementsByTagName('no')[a].childNodes[0].nodeValue) {
        aa = a;
        break;
      }
    }
    var start_src = ksyy.getElementsByTagName('voice_plan')[0].childNodes[0].nodeValue;
    arrAudio.push('' + start_src + '');
    var hbm = hbyy.getElementsByTagName('NO')[aa].childNodes[0].nodeValue;
    arrAudio.push('' + hbm + '');
    if (e != '') {
      for (var c = 0; c < ejsj.getElementsByTagName('event').length; c++) {

        if (e == ejsj.getElementsByTagName('event')[c].childNodes[0].nodeValue) {
          ac = c;
          break;
        }
      }
      var ejsjm = ejsjyy.getElementsByTagName('voice_event')[ac].childNodes[0].nodeValue;
      arrAudio.push('' + ejsjm + '');
    }
    for (var b = 0; b < yjsj.getElementsByTagName('LX').length; b++) {
      if (w == yjsj.getElementsByTagName('LX')[b].childNodes[0].nodeValue) {
        ab = b;
        break;
      }
    }
    var sjlxm = yjsjyy.getElementsByTagName('voice_lx')[ab].childNodes[0].nodeValue;
    arrAudio.push('' + sjlxm + '');
    var start_en = xmlDoc.getElementsByTagName("START_VOICE_EN")[0].getElementsByTagName('voice_plan')[0].childNodes[0].nodeValue;
    arrAudio.push('' + start_en + '');
    var hb_en = xmlDoc.getElementsByTagName("VOICE_PLAN_NO_EN")[0].getElementsByTagName('NO')[aa].childNodes[0].nodeValue;
    arrAudio.push('' + hb_en + '');
    if (e != '') {
      var ej_en = xmlDoc.getElementsByTagName("VOICE_SEC_EN")[0].getElementsByTagName('voice_event')[ac].childNodes[0].nodeValue;
      arrAudio.push('' + ej_en + '');
    }

    var yj_en = xmlDoc.getElementsByTagName("VOICE_LX_EN")[0].getElementsByTagName('voice_lx')[ab].childNodes[0].nodeValue;
    arrAudio.push('' + yj_en + '');

  } else {

    for (var a = 0; a < hbh.getElementsByTagName('no').length; a++) {
      if (q == hbh.getElementsByTagName('no')[a].childNodes[0].nodeValue) {
        aa = a;
        break;
      }
    }
    var start_src = ksyy.getElementsByTagName('voice_plan')[0].childNodes[0].nodeValue;
    arrAudio.push('' + start_src + '');
    var hbm = hbyy.getElementsByTagName('NO')[aa].childNodes[0].nodeValue;
    arrAudio.push('' + hbm + '');

    if (ejkq == 1) {
      for (var c = 0; c < ejsj.getElementsByTagName('event').length; c++) {
        if (e == ejsj.getElementsByTagName('event')[c].childNodes[0].nodeValue) {
          ac = c;
          break;
        }
      }
      var ejsjm = ejsjyy.getElementsByTagName('voice_event')[ac].childNodes[0].nodeValue;
      arrAudio.push('' + ejsjm + '');
    }
    for (var b = 0; b < yjsj.getElementsByTagName('LX').length; b++) {
      if (w == yjsj.getElementsByTagName('LX')[b].childNodes[0].nodeValue) {
        ab = b;
        break;
      }
    }
    var sjlxm = yjsjyy.getElementsByTagName('voice_lx')[ab].childNodes[0].nodeValue;
    arrAudio.push('' + sjlxm + '');


  }

  for (var i = 0; i < document.getElementsByClassName('biaohang').length; i++) {
    if (document.getElementsByClassName('biaohang')[i].childNodes[4].innerHTML == '正在播报'&&thb!=document.getElementsByClassName('biaohang')[i].childNodes[5].childNodes[0]) {
      document.getElementsByClassName('biaohang')[i].childNodes[4].innerHTML = '';
      document.getElementsByClassName('biaohang')[i].childNodes[4].innerHTML = '播放中止';
      document.getElementsByClassName('biaohang')[i].childNodes[5].childNodes[1].style.pointerEvents = '';
      document.getElementsByName('jiesu')[i].style.display = 'none';
    }
  }
  thb.parentNode.parentNode.childNodes[4].innerHTML = '';
  thb.parentNode.parentNode.childNodes[4].innerHTML = '正在播报';
  pdvoice();

}

function scyy() {//条件判断
  var jixu = 0;
  for (var i = 0; i < hbh.getElementsByTagName('no').length; i++) {
    if (document.getElementById('hbh').value == hbh.getElementsByTagName('no')[i].childNodes[0].nodeValue) {
      jixu = 1; break;
    }

  }
  if (jixu == 1) {
    if (document.getElementById('hbh').value != '') {

      changeaudio();


      addhistory();
    } else {
      alert('请选择航班号');


    }
  } else {
    alert('系统中无此航班');
  }


}
function addhistory() {//获取记录并添加到历史记录输出中

  hzero += 1;

  var hone = document.getElementById('hbh').value;
  var htwo = document.getElementById('sjlx').options[document.getElementById('sjlx').selectedIndex].value;
  if (ejkq == 1) {
    var hthree = document.getElementById('ejsj').options[document.getElementById('ejsj').selectedIndex].value;
  } else {
    var hthree = '';
  }
var format=new_time();
  var hfive = '正在播报';
  setHistory(hone, htwo, hthree, format, hfive)
  if (document.getElementsByClassName('biaohang').length > 15) {
    delh(document.getElementsByClassName('biaohang')[15].childNodes[0].childNodes[0]);
  }
}
function new_time(){//获取读取当前年月日时分秒
  var format = '';
  var nTime = new Date();
  format += nTime.getFullYear() + "年";

  format += (nTime.getMonth() + 1) < 10 ? "0" + (nTime.getMonth() + 1) : (nTime.getMonth() + 1);
  format += "月";
  format += nTime.getDate() < 10 ? "0" + (nTime.getDate()) : (nTime.getDate());
  format += "日&nbsp;";
  format += nTime.getHours() < 10 ? "0" + (nTime.getHours()) : (nTime.getHours());
  format += ":";
  format += nTime.getMinutes() < 10 ? "0" + (nTime.getMinutes()) : (nTime.getMinutes());
  format += ":";
  format += nTime.getSeconds() < 10 ? "0" + (nTime.getSeconds()) : (nTime.getSeconds());
return format;
}
function changeaudio() {//改变语音路径，添加新的语音路径
  arrAudio = new Array();
  var aa, ab, ac;
  var yw = document.getElementById('ywbb').checked;
  if (yw) {
    for (var a = 0; a < hbh.getElementsByTagName('no').length; a++) {
      if (document.getElementById('hbh').value == hbh.getElementsByTagName('no')[a].childNodes[0].nodeValue) {
        aa = a;
        break;
      }
    }
    var start_src = ksyy.getElementsByTagName('voice_plan')[0].childNodes[0].nodeValue;
    arrAudio.push('' + start_src + '');
    var hbm = hbyy.getElementsByTagName('NO')[aa].childNodes[0].nodeValue;
    arrAudio.push('' + hbm + '');
    if (ejkq == 1) {
      var num1 = document.getElementById('ejsj').selectedIndex;
      for (var c = 0; c < ejsj.getElementsByTagName('event').length; c++) {

        if (document.getElementById('ejsj').options[num1].value == ejsj.getElementsByTagName('event')[c].childNodes[0].nodeValue) {
          ac = c;
          break;
        }
      }
      var ejsjm = ejsjyy.getElementsByTagName('voice_event')[ac].childNodes[0].nodeValue;
      arrAudio.push('' + ejsjm + '');
    }
    var num = document.getElementById('sjlx').selectedIndex;
    for (var b = 0; b < yjsj.getElementsByTagName('LX').length; b++) {

      if (document.getElementById('sjlx').options[num].value == yjsj.getElementsByTagName('LX')[b].childNodes[0].nodeValue) {
        ab = b;
        break;
      }

    }
    var sjlxm = yjsjyy.getElementsByTagName('voice_lx')[ab].childNodes[0].nodeValue;
    arrAudio.push('' + sjlxm + '');
    var start_en = xmlDoc.getElementsByTagName("START_VOICE_EN")[0].getElementsByTagName('voice_plan')[0].childNodes[0].nodeValue;
    arrAudio.push('' + start_en + '');
    var hb_en = xmlDoc.getElementsByTagName("VOICE_PLAN_NO_EN")[0].getElementsByTagName('NO')[aa].childNodes[0].nodeValue;
    arrAudio.push('' + hb_en + '');
    if (ejkq == 1) {
      var ej_en = xmlDoc.getElementsByTagName("VOICE_SEC_EN")[0].getElementsByTagName('voice_event')[ac].childNodes[0].nodeValue;
      arrAudio.push('' + ej_en + '');
    }

    var yj_en = xmlDoc.getElementsByTagName("VOICE_LX_EN")[0].getElementsByTagName('voice_lx')[ab].childNodes[0].nodeValue;
    arrAudio.push('' + yj_en + '');




  } else {

    for (var a = 0; a < hbh.getElementsByTagName('no').length; a++) {
      if (document.getElementById('hbh').value == hbh.getElementsByTagName('no')[a].childNodes[0].nodeValue) {
        aa = a;
        break;
      }
    }
    var start_src = ksyy.getElementsByTagName('voice_plan')[0].childNodes[0].nodeValue;
    arrAudio.push('' + start_src + '');
    var hbm = hbyy.getElementsByTagName('NO')[aa].childNodes[0].nodeValue;
    arrAudio.push('' + hbm + '');

    if (ejkq == 1) {
      var num1 = document.getElementById('ejsj').selectedIndex;
      for (var c = 0; c < ejsj.getElementsByTagName('event').length; c++) {

        if (document.getElementById('ejsj').options[num1].value == ejsj.getElementsByTagName('event')[c].childNodes[0].nodeValue) {
          ac = c;
          break;
        }
      }
      var ejsjm = ejsjyy.getElementsByTagName('voice_event')[ac].childNodes[0].nodeValue;
      arrAudio.push('' + ejsjm + '');
    }
    var num = document.getElementById('sjlx').selectedIndex;
    for (var b = 0; b < yjsj.getElementsByTagName('LX').length; b++) {

      if (document.getElementById('sjlx').options[num].value == yjsj.getElementsByTagName('LX')[b].childNodes[0].nodeValue) {
        ab = b;
        break;
      }

    }
    var sjlxm = yjsjyy.getElementsByTagName('voice_lx')[ab].childNodes[0].nodeValue;
    arrAudio.push('' + sjlxm + '');
  }
  pdvoice();
}
function pdvoice(){//判断路径文件是否存在
  var xml;
  if(window.XMLHttpRequest)
{
xml = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
try {
xml = new ActiveXObject("Msxml2.XMLHTTP");
}
catch (e) { }
try {
xml = new ActiveXObject("Microsoft.XMLHTTP");
}
catch (e) { }
if (!xml) {
window.alert("不能创建XMLHttpRequest对象");
}
}
  document.getElementById('tx').style.display='none';
for(var p=0;p<arrAudio.length;p++){
   xml.open("GET",arrAudio[p],false);
   xml.send();
   if(xml.readyState==4){
     console.log(xml.status);
    if(xml.status==200){

    }else{
      document.getElementById('tx').style.display='block';
      document.getElementById('tx').innerHTML='*'+arrAudio[p]+'路径下无此文件或路径错误！';

      return false;
    }
    }
}
play_audio();
}


function play_audio() {//获得语音路径并播放
  console.log(arrNex);
  console.log(arrAudio[arrNex]);
  ss = String(arrAudio[arrNex]);
  
  ttsAudio.src = ss;
  ttsAudio.play();

}
function lxv() {//语音串联
  if (arrNex < arrAudio.length - 1) {
    arrNex += 1;
    play_audio();
  } else {
    arrNex = 0;
    setbfzt();
    document.getElementById('play_an').style.pointerEvents = "";
    document.getElementById('play_an').style.backgroundColor = "skyblue";
  }
}

function disable_play() {//语音播放按钮改变样式
  var xx = document.getElementById('play_an');
  xx.style.pointerEvents = 'none';
  xx.style.backgroundColor = 'skyblue';
}


function setbfzt() {//播放结束后改变状态

  if (bfzt == '') {
    document.getElementsByClassName('biaohang')[0].childNodes[4].innerHTML = '';
    document.getElementsByClassName('biaohang')[0].childNodes[4].innerHTML = '播放完成';
    document.getElementsByClassName('biaohang')[0].childNodes[5].childNodes[1].style.pointerEvents = "";
    document.getElementsByName('jiesu')[0].style.display='none';
  }
  else {
    Number(bfzt);
    document.getElementsByClassName('biaohang')[bfzt].childNodes[4].innerHTML = '';;
    document.getElementsByClassName('biaohang')[bfzt].childNodes[4].innerHTML = '播放完成';
    document.getElementsByClassName('biaohang')[bfzt].childNodes[5].childNodes[1].style.pointerEvents = "";
    document.getElementsByName('jiesu')[bfzt].style.display='none';
    bfzt = '';
  }
}


function zybb() {//‘自由播报’动作
  ttsAudio.pause();
  var xy = document.getElementById('play_an');
  var xz = document.getElementById('zybb');
  xy.style.backgroundColor = 'skyblue';
  xy.style.pointerEvents = '';
  arrNex=0;

  for (var i = 0; i < document.getElementsByClassName('biaohang').length; i++) {
    if (document.getElementsByClassName('biaohang')[i].childNodes[4].innerHTML == '正在播报') {
      document.getElementsByClassName('biaohang')[i].childNodes[4].innerHTML = '';
      document.getElementsByClassName('biaohang')[i].childNodes[4].innerHTML = '播放中止';
      document.getElementsByClassName('biaohang')[i].childNodes[5].childNodes[1].style.pointerEvents = '';
      document.getElementsByName('jiesu')[i].style.display='none';
    }
  }
}

function jiesu(){//结束动作
  
  if(!ttsAudio.paused){
    var r = confirm("系统正在播放中，是否结束？");
    if (r == true) {
      ttsAudio.pause();
      
    } else {
      return false; 
    }
  }
  var xy = document.getElementById('play_an');
  xy.style.backgroundColor = 'skyblue';
  xy.style.pointerEvents = '';
  arrNex=0;
  for (var i = 0; i < document.getElementsByClassName('biaohang').length; i++) {
    if (document.getElementsByClassName('biaohang')[i].childNodes[4].innerHTML == '正在播报') {
      document.getElementsByClassName('biaohang')[i].childNodes[4].innerHTML = '';
      document.getElementsByClassName('biaohang')[i].childNodes[4].innerHTML = '播放中止';
      
      document.getElementsByClassName('biaohang')[i].childNodes[5].childNodes[1].style.pointerEvents = '';
      document.getElementsByName('jiesu')[i].style.display='none';
    }
  }
}