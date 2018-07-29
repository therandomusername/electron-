const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const electron = require('electron')
const shell = require('electron').shell
var { ipcRenderer, remote } = require('electron');
var main = remote.require("./main.js");

const closeBtn = document.getElementById('closeBtn')
closeBtn.addEventListener('click', function (event) {
  ipcRenderer.send('close-battle-window', 'an-argument')
  $("#battleLogs").html("");
  $("#battleinfo").html("");
  win_1 = 0;
  win_2 = 0;
  total = {
    1: {
      attacks: 0, crits: 0, evades: 0, fastArrows: 0, pierces: 0, gr: 0, secondCrit: 0, cbk: 0, da: 0, kl: 0, oz: 0, des_en: 0, des_armor: 0, des_mana: 0, froze: 0
    }, 2: {
      attacks: 0, crits: 0, evades: 0, fastArrows: 0, pierces: 0, gr: 0, secondCrit: 0, cbk: 0, da: 0, kl: 0, oz: 0, des_en: 0, des_armor: 0, des_mana: 0, froze: 0
    }
  };
})
const ipc = electron.ipcRenderer;
var info = {};
var current = { stats_1: {}, stats_2: {} };
var dmg = [];
var total = {
  1: {
    attacks: 0, crits: 0, evades: 0, fastArrows: 0, pierces: 0, gr: 0, secondCrit: 0, cbk: 0, da: 0, kl: 0, oz: 0, des_en: 0, des_armor: 0, des_mana: 0, froze: 0
  }, 2: {
    attacks: 0, crits: 0, evades: 0, fastArrows: 0, pierces: 0, gr: 0, secondCrit: 0, cbk: 0, da: 0, kl: 0, oz: 0, des_en: 0, des_armor: 0, des_mana: 0, froze: 0
  }
};

ipcRenderer.on('battle_info_main', function (event, arg) {
  info = JSON.parse(JSON.stringify(arg))
  $('<div></div>').attr({ 'id': 'win_1', 'class': 'playersInfo' }).appendTo('#battleinfo')
  $('<div></div>').attr({ 'id': 'win_2', 'class': 'playersInfo' }).appendTo('#battleinfo')
  $('<div>' + info.player_1.prof + '</div>').attr({ 'class': 'playersInfo' }).appendTo('#battleinfo');
  $('<div>' + info.player_2.prof + '</div>').attr({ 'class': 'playersInfo' }).appendTo('#battleinfo');
  $('<div>' + info.player_1.lvl + 'lvl</div>').attr({ 'class': 'playersInfo' }).appendTo('#battleinfo');
  $('<div>' + info.player_2.lvl + 'lvl</div>').attr({ 'class': 'playersInfo' }).appendTo('#battleinfo')

  $('<div></div>').attr({ 'class': 'playersInfo' }).appendTo('#battleinfo')
  $('<div></div>').attr({ 'class': 'playersInfo' }).appendTo('#battleinfo')
  $('<div style="width:58px">0</div>').attr({ 'id': 'attacks_1', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:230px">Wykonane ataki</div>').attr({ 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">0</div>').attr({ 'id': 'attacks_2', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">0</div>').attr({ 'id': 'crits_1', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:230px">Ciosy krytyczne</div>').attr({ 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">0</div>').attr({ 'id': 'crits_2', 'class': 'resultInfo' }).appendTo('#battleinfo');


  $('<div style="width:58px">0</div>').attr({ 'id': 'pierces_1', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:230px">Przebicia</div>').attr({ 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">0</div>').attr({ 'id': 'pierces_2', 'class': 'resultInfo' }).appendTo('#battleinfo');


  $('<div style="width:58px">').attr({ 'id': 'evades_1', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:230px">Uniki</div>').attr({ 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">').attr({ 'id': 'evades_2', 'class': 'resultInfo' }).appendTo('#battleinfo');


  $('<div style="width:58px">0</div>').attr({ 'id': 'fastArr_1', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:230px">Szybkie strzały</div>').attr({ 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">0</div>').attr({ 'id': 'fastArr_2', 'class': 'resultInfo' }).appendTo('#battleinfo');

  $('<div style="width:58px">0</div>').attr({ 'id': 'froze_1', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:230px">Zamrożenia/ogłuszenia</div>').attr({ 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">0</div>').attr({ 'id': 'froze_2', 'class': 'resultInfo' }).appendTo('#battleinfo');

  $('<div style="width:58px">0</div>').attr({ 'id': 'des_1', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:230px">Zniszcz. energia/mana/pancerz</div>').attr({ 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">0</div>').attr({ 'id': 'des_2', 'class': 'resultInfo' }).appendTo('#battleinfo');

  $('<div style="width:58px">0</div>').attr({ 'id': 'da_1', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:230px">Dotyki</div>').attr({ 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">0</div>').attr({ 'id': 'da_2', 'class': 'resultInfo' }).appendTo('#battleinfo');

  $('<div style="width:58px">0</div>').attr({ 'id': 'cbk_1', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:230px">CBK</div>').attr({ 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">0</div>').attr({ 'id': 'cbk_2', 'class': 'resultInfo' }).appendTo('#battleinfo');

  $('<div style="width:58px">0</div>').attr({ 'id': 'kl_1', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:230px">Klątwy</div>').attr({ 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">0</div>').attr({ 'id': 'kl_2', 'class': 'resultInfo' }).appendTo('#battleinfo');

  $('<div style="width:58px">0</div>').attr({ 'id': 'oz_1', 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:230px">OŻ</div>').attr({ 'class': 'resultInfo' }).appendTo('#battleinfo');
  $('<div style="width:58px">0</div>').attr({ 'id': 'oz_2', 'class': 'resultInfo' }).appendTo('#battleinfo');

  for (var i = 0; i < info.quant; i++) {
    $('<div>Walka numer ' + parseInt(i + 1) + '</div>')
      .attr({
        'id': 'logTitle_' + i,
        'class': 'logTitle'
      }).css({
        ///clear:'both',
        lineHeight: '25px',
        textAlign: 'center',
        width: '97%',
        height: '25px',
        marginBottom: '3px',
        fontSize: '12px',
        border: '3px outset #c3c3c3',
      })
      .appendTo('#battleLogs');

    $('<div ></div>')
      .attr({
        'id': 'log_' + i,
        'class': 'logs'
      }).css({
        width: '97%',
        display: 'none',
        marginBottom: '3px',
        fontSize: '12px',
        border: '1px solid #c3c3c3',
        textAlign: 'left'

      })
      .appendTo('#battleLogs');
  }

  for (var i = 0; i < document.getElementsByClassName('logs').length; i++) {
    current.stats_1 = JSON.parse(JSON.stringify(info.player_1.stats));
    current.stats_2 = JSON.parse(JSON.stringify(info.player_2.stats));
    //  console.log(i)
    document.getElementById('log_' + i).innerHTML = battle();
    if (document.getElementById('log_' + i).innerHTML.indexOf("gracz 1") > -1) {
      $('#logTitle_' + i).css('color', 'green')
    }
    if (document.getElementById('log_' + i).innerHTML.indexOf("gracz 2") > -1) {
      $('#logTitle_' + i).css('color', 'red')
    }

    if (document.getElementById('log_' + i).innerHTML.indexOf("zwycięzcy") > -1) {
      $('#logTitle_' + i).css('color', 'grey')
    }
  }

  var titles = document.getElementsByClassName('logTitle');
  for (var i = 0; i < titles.length; i++) {
    titles[i].addEventListener("mousedown", function (ev) {
      if (ev.which == 1) {
        if ($('#log_' + this.id.split('_')[1]).css('display') == 'block') { $('#log_' + this.id.split('_')[1]).css('display', 'none') }
        else $('#log_' + this.id.split('_')[1]).css('display', 'block');
      }
    }
    )
  }
  document.getElementById('win_1').innerHTML = roundNumber((win_1 / parseInt(info.quant) * 100), 1) + '%';
  document.getElementById('win_2').innerHTML = roundNumber((win_2 / parseInt(info.quant) * 100), 1) + '%';
  if (win_1 > (win_1 / parseInt(info.quant))) {
    $('#win_1').css('color', 'green')
    $('#win_2').css('color', 'red')
  } else {
    $('#win_1').css('color', 'red')
    $('#win_2').css('color', 'green')
  }
  document.getElementById('attacks_1').innerHTML = roundNumber(total[1].attacks / parseInt(info.quant), 1);
  document.getElementById('attacks_2').innerHTML = roundNumber(total[2].attacks / parseInt(info.quant), 1);

  document.getElementById('crits_1').innerHTML = roundNumber((total[1].crits + total[1].secondCrit) / parseInt(info.quant), 1);
  document.getElementById('crits_2').innerHTML = roundNumber((total[2].crits + total[2].secondCrit) / parseInt(info.quant), 1);

  document.getElementById('pierces_1').innerHTML = roundNumber(total[1].pierces / parseInt(info.quant), 1);
  document.getElementById('pierces_2').innerHTML = roundNumber(total[2].pierces / parseInt(info.quant), 1);

  document.getElementById('evades_1').innerHTML = roundNumber(total[1].evades / parseInt(info.quant), 1);
  document.getElementById('evades_2').innerHTML = roundNumber(total[2].evades / parseInt(info.quant), 1);

  document.getElementById('fastArr_1').innerHTML = roundNumber(total[1].fastArrows / parseInt(info.quant), 1);
  document.getElementById('fastArr_2').innerHTML = roundNumber(total[2].fastArrows / parseInt(info.quant), 1);

  document.getElementById('froze_1').innerHTML = roundNumber(total[1].froze / parseInt(info.quant), 1);
  document.getElementById('froze_2').innerHTML = roundNumber(total[2].froze / parseInt(info.quant), 1);
  document.getElementById('des_1').innerHTML = roundNumber(total[1].des_en / parseInt(info.quant), 1) + " / " + roundNumber(total[1].des_mana / parseInt(info.quant), 1) + " / " + parseInt(total[1].des_armor / parseInt(info.quant));
  document.getElementById('des_2').innerHTML = roundNumber(total[2].des_en / parseInt(info.quant), 1) + " / " + roundNumber(total[2].des_mana / parseInt(info.quant), 1) + " / " + parseInt(total[2].des_armor / parseInt(info.quant));

  document.getElementById('da_1').innerHTML = roundNumber(total[1].da / parseInt(info.quant), 2);
  document.getElementById('da_2').innerHTML = roundNumber(total[2].da / parseInt(info.quant), 2);
  document.getElementById('cbk_1').innerHTML = roundNumber(total[1].cbk / parseInt(info.quant), 2);
  document.getElementById('cbk_2').innerHTML = roundNumber(total[2].cbk / parseInt(info.quant), 2);
  document.getElementById('kl_1').innerHTML = roundNumber(total[1].kl / parseInt(info.quant), 2);
  document.getElementById('kl_2').innerHTML = roundNumber(total[2].kl / parseInt(info.quant), 2);
  document.getElementById('oz_1').innerHTML = roundNumber(total[1].oz / parseInt(info.quant), 2);
  document.getElementById('oz_2').innerHTML = roundNumber(total[2].oz / parseInt(info.quant), 2);
})

var win_1 = 0;
var win_2 = 0;
var usedOr = [0, 0]
var fastArrow_1;
var fastArrow_2;
var course = [0, 0];
var isZamro = [0, 0];
var grDuration = [0, 0];
var fireArrowDuration = [0, 0];
var flashArrowDuration = [0, 0];
var flashPaladinDuration = [0, 0];
var kontra = [0, 0];
var grDmg = [0, 0];
var desArmorUm = 0; var dmgRed = [1, 1];
var checkForZamro = [0, 0];
var fireArrow = [0, 0];
var flashArrow = [0, 0];
//4xsa do next ataku
// ["trop", "mag", "wojownik", "tancerz", "lowca", "paladyn"]; 
var position = [0, 0]
var combination = [0, 0];
// if profa mana ena reg = tyle co z odpowiednich um dla 1 i 2
var fireBallDuration = [0, 0];
var manaRegen = [0, 0];
var enaRegen = [0, 0];
var poison = [0,0];
var poisonDuration = [0,0];
if (info.player_1.prof == "trop") {
  manaRegen[0] = skillBase.trop.trop_1.skills[5].values.e[info.player_1.um.um1_5 - 1]
  enaRegen[0] = skillBase.trop.trop_1.skills[5].values.b[info.player_1.um.um1_5 - 1]
}
if (info.player_2.prof == "trop") {
  manaRegen[1] = skillBase.trop.trop_1.skills[5].values.e[info.player_1.um.um1_5 - 1]
  enaRegen[1] = skillBase.trop.trop_1.skills[5].values.b[info.player_1.um.um1_5 - 1]
}
if (info.player_1.prof == "mag") {
  manaRegen[0] = skillBase.mag.mag_1.skills[5].values.c[info.player_1.um.um1_5 - 1]
}
if (info.player_2.prof == "mag") {
  manaRegen[1] = skillBase.mag.mag_1.skills[5].values.c[info.player_1.um.um1_5 - 1]
}
if (info.player_1.prof == "wojownik") {
  enaRegen[0] = skillBase.wojownik.wojownik_1.skills[5].values.b[info.player_1.um.um1_5 - 1]
}
if (info.player_2.prof == "wojownik") {
  enaRegen[1] = skillBase.wojownik.wojownik_1.skills[5].values.b[info.player_1.um.um1_5 - 1]
}
if (info.player_1.prof == "tancerz") {
  enaRegen[0] = skillBase.tancerz.tancerz_1.skills[5].values.b[info.player_1.um.um1_5 - 1]
}
if (info.player_2.prof == "tancerz") {
  enaRegen[1] = skillBase.tancerz.tancerz_1.skills[5].values.b[info.player_1.um.um1_5 - 1]
}
if (info.player_1.prof == "lowca") {
  enaRegen[0] = skillBase.lowca.lowca_1.skills[1].values.b[info.player_1.um.um1_1 - 1]
}
if (info.player_2.prof == "lowca") {
  enaRegen[1] = skillBase.lowca.lowca_1.skills[1].values.b[info.player_1.um.um1_1 - 1]
}
if (info.player_2.prof == "paladyn") {
  manaRegen[1] = skillBase.paladyn.paladyn_1.skills[5].values.e[info.player_1.um.um1_5 - 1]
  enaRegen[1] = skillBase.paladyn.paladyn_1.skills[5].values.b[info.player_1.um.um1_5 - 1]
}
if (info.player_2.prof == "paladyn") {
  manaRegen[1] = skillBase.paladyn.paladyn_1.skills[5].values.e[info.player_1.um.um1_5 - 1]
  enaRegen[1] = skillBase.paladyn.paladyn_1.skills[5].values.b[info.player_1.um.um1_5 - 1]
}
function battle() {
  var evadeLow = [0, 0];
  var mistrzPosition1 = 0;
  var mistrzPosition2 = 0;
  var dmgRedDuration = [0,0]
  combination = [0, 0];
  fireArrow = [0, 0];
  var ileLek = [1, 1];
  battleStr = "";
  grDuration = [0, 0];
  var tura1 = 0;
  var tura2 = 0;
  var hpReg1 = 0;
  var hpReg2 = 0;
  var sa2 = (current.stats_2.sa + 1);
  var sa1 = (current.stats_1.sa + 1);
  var healSa1 = sa1;
  var healSa2 = sa2;
  poison = [0,0];
  var speed = [0, 0];
  checkForZamro = [0, 0];
  dmgRed = [1, 1];
  desArmorum = 0;
  course = [0, 0];
  var armorLow = [0, 0];
  if (info.player_1.prof == "trop" || info.player_1.prof == "lowca") {
    position[0] = 2;
  }
  if (info.player_2.prof == "trop" || info.player_2.prof == "lowca") {
    position[1] = 2;
  }
  if (info.player_1.prof == "mag") {
    position[0] = 1;
  }
  if (info.player_2.prof == "mag") {
    position[1] = 1;
  }
  if (info.player_1.prof == "tancerz" || info.player_1.prof == "wojownik" || info.player_1.prof == "paladyn") {
    position[0] = 0;
  }
  if (info.player_2.prof == "tancerz" || info.player_2.prof == "wojownik" || info.player_2.prof == "paladyn") {
    position[1] = 0;
  }

  while ((current.stats_1.hp > 0) && (current.stats_2.hp > 0) && ((tura1 < 50) && (tura2 < 50))) {

    if (healSa1 == healSa2) {
      var losowanko = Math.floor((Math.random() * 100));
      if (losowanko > 49) {
        healSa1 += 0.0001;
      } else {
        healSa2 += 0.0001;
      }
    }
    if ((healSa1 > healSa2) && (current.stats_1.hp < info.player_1.stats.hp) && (hpReg1 < 20)) {
      healSa1 = healSa1 - healSa2;
      healSa2 += (info.player_2.stats.sa + 1);
      var regValue = parseInt(current.stats_1.hp_reg - (current.stats_1.hp_reg * hpReg1 * 0.05));
      current.stats_1.hp += regValue;
      hpReg1++;
      if (current.stats_1.hp > info.player_1.stats.hp) {
        current.stats_1.hp = info.player_1.stats.hp;
      }
      battleStr += "Przywrócono " + regValue + " hp " + info.player_1.prof + "_1" + " (" + parseInt((current.stats_1.hp / info.player_1.stats.hp) * 100) + "%)<br><br>";
    }

    if ((healSa2 > healSa1) && (current.stats_2.hp < info.player_2.stats.hp) && (hpReg2 < 20)) {
      healSa2 = healSa2 - healSa1;
      healSa1 += (info.player_1.stats.sa + 1);
      var regValue = parseInt(current.stats_2.hp_reg - (current.stats_2.hp_reg * hpReg2 * 0.05));
      current.stats_2.hp += regValue;
      hpReg2++;
      battleStr += "Przywrócono " + regValue + " hp " + info.player_2.prof + "_2" + " (" + parseInt((current.stats_2.hp / info.player_2.stats.hp) * 100) + "%)<br><br>";
    }

    if (sa1 == sa2) {
      var losowanko = Math.floor((Math.random() * 100));
      if (losowanko > 49) {
        sa1 += 0.0001;
      } else {
        sa2 += 0.0001;
      }
    }
    while ((sa1 > sa2) && (current.stats_1.hp > 0) && (current.stats_2.hp > 0)) { // pierwszy gracz zaczyna

      if ((info.player_1.prof == "tancerz" || info.player_1.prof == "wojownik" || info.player_1.prof == "paladyn") && ((position[1] - position[0]) != 0)) {
        battleStr += "Krok do przodu(gracz z lewej)<br>"; sa1 = sa1 - sa2; sa2 += (info.player_2.stats.sa + 1);
        tura1++;
        position[0]++;
        total[1].attacks++;
      }
      else {
        // mistrzostwo  
        if (info.player_1.mistrzostwo[mistrzPosition1] == null) {
          mistrzPosition1 = 0;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Trujące pchnięcie") && current.stats_1.energy > skillBase.tancerz.tancerz_1.skills[1].values.c[info.player_1.um.um1_1 - 1]) {
          battleStr += "Trujące pchnięcie<br>"
          current.stats_1.poison_dmg += current.stats_1.poison_dmg * skillBase.tancerz.tancerz_1.skills[1].values.a[info.player_1.um.um1_1 - 1];
          speed[0] = sa1 * (skillBase.tancerz.tancerz_1.skills[1].values.b[info.player_1.um.um1_1 - 1] / 100);
          mistrzPosition1++;
          current.stats_1.energy -= skillBase.tancerz.tancerz_1.skills[1].values.c[info.player_1.um.um1_1 - 1]
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Błyskawiczny cios") && (current.stats_1.energy > skillBase.tancerz.tancerz_1.skills[4].values.b[info.player_1.um.um1_4])) {
          battleStr += "Błyskawiczny cios. Zużyto " + combination[0] + "pkt kombinacji<br>"
          speed[0] = sa1 * (skillBase.tancerz.tancerz_1.skills[4].values.a[info.player_1.um.um1_4 - 1] / 100);
          console.log(mistrzPosition1)
          if (combination[0] > 3) {
            combination[0] = 3;
          }
          current.stats_1.dmg_max += 0.05 * combination[0] * info.player_1.stats.dmg_max;
          current.stats_1.dmg_min += 0.05 * combination[0] * info.player_1.stats.dmg_min;
          combination[0] = 0;
          mistrzPosition1++;
          current.stats_1.energy -= skillBase.tancerz.tancerz_1.skills[4].values.b[info.player_1.um.um1_4]
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Wirujące ostrze") && (current.stats_1.energy > skillBase.tancerz.tancerz_2.skills[3].values.c[info.player_1.um.um2_3])) {
          battleStr += "Wirujące ostrze<br>"
          mistrzPosition1++;
          current.stats_1.energy -= skillBase.tancerz.tancerz_2.skills[3].values.c[info.player_1.um.um2_3]
        }
        if (info.player_1.mistrzostwo[mistrzPosition1] == "Rozszarpanie ran") {
          battleStr += "Rozszarpanie ran<br>"
          grDuration[0] += skillBase.tancerz.tancerz_2.skills[5].values.a[info.player_1.um.um2_5 - 1];
          mistrzPosition1++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Rozpraszający okrzyk") && (current.stats_1.energy > skillBase.tancerz.tancerz_2.skills[6].values.b[info.player_1.um.um2_6])) {
          battleStr += "Rozpraszający okrzyk<br>"
          current.stats_2.crit_val -= skillBase.tancerz.tancerz_2.skills[6].values.a[info.player_1.um.um2_6 - 1];
          current.stats_2.crit_second_val -= skillBase.tancerz.tancerz_2.skills[6].values.a[info.player_1.um.um2_6 - 1];
          current.stats_2.armor_ev -= skillBase.tancerz.tancerz_2.skills[6].values.b[info.player_1.um.um2_6 - 1];
          speed[0] = 0.1;
          current.stats_1.energy -= skillBase.tancerz.tancerz_2.skills[6].values.b[info.player_1.um.um2_6];
          dmgRed[1] = 1 - skillBase.tancerz.tancerz_2.skills[6].values.c[info.player_1.um.um2_6];
          mistrzPosition1++;
        }
        if (info.player_1.mistrzostwo[mistrzPosition1] == "Jadowity podmuch") {
          battleStr += "Jadowity podmuch<br>"
          // ??
          mistrzPosition1++;
        }
        if (info.player_1.mistrzostwo[mistrzPosition1] == "Zadziorny atak") {
          battleStr += "Zadziorny atak<br>"
          speed[0] = sa1 * (skillBase.tancerz.tancerz_4.skills[4].values.b[info.player_1.um.um4_4 - 1] / 100);
          armorLow[0] = current.stats_1.armor * (skillBase.tancerz.tancerz_4.skills[4].values.c[info.player_1.um.um4_4 - 1] / 100);
          current.stats_1.armor -= armorLow;
          desArmorUm = 1;
          mistrzPosition1++;
          //   current.stats_1.energy -=
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Lodowa strzała") && (current.stats_1.mana > skillBase.trop.trop_1.skills[1].values.d[info.player_1.um.um1_1 - 1])) {
          battleStr += "Lodowa strzała<br>"
          speed[1] = - info.player_1.stats.slow * (skillBase.trop.trop_1.skills[1].values.a[info.player_1.um.um1_1 - 1] / 100);
          combination[0]++;
          checkForZamro[0] = 1;
          current.stats_1.mana -= skillBase.trop.trop_1.skills[1].values.d[info.player_1.um.um1_1 - 1];
          mistrzPosition++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Płonąca strzała") && (current.stats_1.mana > skillBase.trop.trop_1.skills[2].values.b[info.player_1.um.um1_2 - 1])) {
          battleStr += "Płonąca strzała<br>"
          fireArrow[0] = 1;
          combination[0]++;
          current.stats_1.mana -= skillBase.trop.trop_1.skills[2].values.b[info.player_1.um.um1_2 - 1];

          mistrzPosition++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Porażająca strzała") && (current.stats_1.mana > skillBase.trop.trop_1.skills[3].values.c[info.player_1.um.um1_3 - 1])) {
          battleStr += "Porażająca strzała<br>"
          armorLow[0] = skillBase.trop.trop_1.skills[3].values.a[info.player_1.um.um1_3 - 1] * ((current.stats_1.dmg_max + durrent.stats_1.dmg_min) / 2)
          combination[0]++;
          flashArrow[0] = 1;
          current.stats_1.mana -= skillBase.trop.trop_1.skills[3].values.c[info.player_1.um.um1_3 - 1];
          mistrzPosition++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Podwójne trafienie") && (current.stats_1.energy > skillBase.trop.trop_1.skills[4].values.a[info.player_1.um.um1_4 - 1])) {
          battleStr += "Podwójne trafienie<br>"
          dmgRed[0] = 1 - skillBase.trop.trop_1.skills[4].values.a[info.player_1.um.um1_4 - 1];
          hitLog += basicAttack(1, 2);
          current.stats_1.energy -= skillBase.trop.trop_1.skills[4].values.a[info.player_1.um.um1_4 - 1];
          mistrzPosition++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Grad strzał") && (current.stats_1.energy > skillBase.trop.trop_1.skills[4].values.a[info.player_1.um.um1_4 - 1])) {
          battleStr += "Grad strzał<br>"
          battleStr += "Gracz otrzymał " + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 100) * ((current.stats_1.dmg_max + durrent.stats_1.dmg_min) / 2) + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * current.stats_1.fire_dmg + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * current.stats_1.ice_dmg + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * ((currene.stats_1.flash_dmg_max + current.stats_1.flash_dmg_min) / 2) + "<br>";
          current.stats_2.hp -= ((skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 100) * ((current.stats_1.dmg_max + durrent.stats_1.dmg_min) / 2) + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * current.stats_1.fire_dmg + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * current.stats_1.ice_dmg + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * ((currene.stats_1.flash_dmg_max + current.stats_1.flash_dmg_min) / 2) - current.stats_2.armor);
          battleStr += "Gracz otrzymał " + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 100) * ((current.stats_1.dmg_max + durrent.stats_1.dmg_min) / 2) + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * current.stats_1.fire_dmg + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * current.stats_1.ice_dmg + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * ((currene.stats_1.flash_dmg_max + current.stats_1.flash_dmg_min) / 2) + "<br>";
          current.stats_2.hp -= ((skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 100) * ((current.stats_1.dmg_max + durrent.stats_1.dmg_min) / 2) + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * current.stats_1.fire_dmg + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * current.stats_1.ice_dmg + (skillBase.trop.trop_2.skills[6].values.a[info.player_1.um.um2_6 - 1] / 200) * ((currene.stats_1.flash_dmg_max + current.stats_1.flash_dmg_min) / 2) - current.stats_2.armor)
          current.stats_1.energy -= skillBase.trop.trop_1.skills[4].values.a[info.player_1.um.um1_4 - 1];
          mistrzPosition++;
          sa1 = sa1 - sa2; sa2 += (info.player_2.stats.sa + 1);
          tura1++;  current.stats_1.energy += enaRegen[0];
          current.stats_1.mana += manaRegen[0];
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Podwójne trafienie") && (current.stats_1.mana > skillBase.trop.trop_1.skills[4].values.a[info.player_1.um.um1_4 - 1])) {

          current.stats_1.dmg_max += (skillBase.trop.trop_3.skills[1].values.a[info.player_1.um.um3_1 - 1] / 100) * current.stats_1.dmg_max;
          current.stats_1.dmg_min += (skillBase.trop.trop_3.skills[1].values.a[info.player_1.um.um3_1 - 1] / 100) * current.stats_1.dmg_min;
          if (combination[0] > 3) {
            combination[0] = 3;
          }
          battleStr += "Strzała z niespadzianka " + combination[0] + " punktów kombinacji<br>"
          dmgRed[1] = 1 - 0.15 * combination[0];
          current.stats_1.mana -= skillBase.trop.trop_3.skills[1].values.c[info.player_1.um.um3_1 - 1];
          mistrzPosition++;
        }
        /*
        if (info.player_1.mistrzostwo[mistrzPosition] == "emanujaca strzała") {

          mistrzPosition++;
        }
        */
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Kojące ochłodzenie") && (current.stats_1.mana > skillBase.trop.trop_3.skills[5].values.b[info.player_1.um.um3_5 - 1])) {
          battleStr += "Kojące ochłodzenie<br>"
          current.stats_1.hp += (skillBase.trop.trop_3.skills[5].values.a[info.player_1.um.um3_5 - 1] / 100) * info.player_1.stats.hp;
          if (current.stats_1.hp > info.player_1.stats.hp) {
            current.stats_1.hp = info.player_1.stats.hp;
          }
          current.stats_1.mana -= skillBase.trop.trop_3.skills[5].values.b[info.player_1.um.um3_5 - 1];
          mistrzPosition++;
          sa1 = sa1 - sa2; sa2 += (info.player_2.stats.sa + 1);
          tura1++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Kula ognia") && (current.stats_1.mana > skillBase.mag.mag_1.skills[2].values.c[info.player_1.um.um1_2 - 1])) {
          battleStr += "Kula ognia<br>"
          current.stats_1.fire_dmg += (skillBase.mag.mag_1.skills[2].values.a[info.player_1.um.um1_2 - 1] / 100) * current.stats_1.fire_dmg
          fireBallDuration[1] = 3;
          current.stats_1.mana -= skillBase.mag.mag_1.skills[2].values.c[info.player_1.um.um1_2 - 1];
          combination[0]++;
          mistrzPosition++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Lodowy pocisk") && (current.stats_1.mana > skillBase.mag.mag_1.skills[3].values.c[info.player_1.um.um1_3 - 1])) {
          battleStr += "Lodowy pocisk<br>"
          speed[1] = -(skillBase.mag.mag_1.skills[3].values.a[info.player_1.um.um1_3 - 1] / 100)
          checkForZamro[0] = 1;
          current.stats_1.mana -= skillBase.mag.mag_1.skills[3].values.c[info.player_1.um.um1_3 - 1];
          combination[0]++;
          mistrzPosition++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Porażenie") && (current.stats_1.mana > skillBase.mag.mag_1.skills[4].values.d[info.player_1.um.um1_4 - 1])) {
          battleStr += "Porażenie<br>"
          dmgRed[1] = 1 - skillBase.mag.mag_1.skills[3].values.a[info.player_1.um.um1_4 - 1]
          current.stats_1.mana -= skillBase.mag.mag_1.skills[3].values.c[info.player_1.um.um1_4 - 1];
          combination[0]++;
          mistrzPosition++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Leczenie ran") && (current.stats_1.mana > skillBase.mag.mag_1.skills[5].values.b[info.player_1.um.um1_5 - 1])) {
          battleStr += "Leczenie ran<br>"
          current.stats_1.hp += (skillBase.mag.mag_1.skills[5].values.a[info.player_1.um.um1_5 - 1] / 100) * info.player_1.stats.hp;
          if (current.stats_1.hp > info.player_1.stats.hp) {
            current.stats_1.hp = info.player_1.stats.hp;
          }
          current.stats_1.mana -= skillBase.mag.mag_1.skills[5].values.b[info.player_1.um.um1_5 - 1];
          mistrzPosition++; sa1 = sa1 - sa2; sa2 += (info.player_2.stats.sa + 1);
          tura1++;  current.stats_1.energy += enaRegen[0];
          current.stats_1.mana += manaRegen[0];
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Łańcuch piorunów") && (current.stats_1.mana > skillBase.mag.mag_2.skills[1].values.b[info.player_1.um.um2_1 - 1])) {
          battleStr += "Łańcuch piorunów<br>"
          current.stats_1.hp -= (skillBase.mag.mag_2.skills[1].values.a[info.player_1.um.um2_1 - 1] / 100) * ((current.stats_1.flash_dmg_max + current.flash_dmg_min) / 2);
          battleStr += "Gracz 2 " + parseInt((skillBase.mag.mag_2.skills[1].values.a[info.player_1.um.um2_1 - 1] / 100) * ((current.stats_1.flash_dmg_max + current.flash_dmg_min) / 2)) + " obrażeń<br>";
          current.stats_1.mana -= skillBase.mag.mag_2.skills[1].values.b[info.player_1.um.um2_1 - 1];
          mistrzPosition++;
          sa1 = sa1 - sa2; sa2 += (info.player_2.stats.sa + 1);
          tura1++;  current.stats_1.energy += enaRegen[0];
          current.stats_1.mana += manaRegen[0];
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Ściana ognia") && (current.stats_1.mana > skillBase.mag.mag_2.skills[2].values.b[info.player_1.um.um2_2 - 1])) {
          battleStr += "Ściana ognia<br>"
          current.stats_1.hp -= (skillBase.mag.mag_2.skills[2].values.a[info.player_1.um.um2_2 - 1] / 100) * (current.stats_1.fire_dmg);
          battleStr += "Gracz 2 " + parseInt((skillBase.mag.mag_2.skills[2].values.a[info.player_1.um.um2_2 - 1] / 100) * (current.stats_1.fire_dmg)) + " obrażeń<br>";
          current.stats_1.mana -= skillBase.mag.mag_2.skills[2].values.b[info.player_1.um.um2_2 - 1];
          mistrzPosition++;
          sa1 = sa1 - sa2; sa2 += (info.player_2.stats.sa + 1);
          tura1++;  current.stats_1.energy += enaRegen[0];
          current.stats_1.mana += manaRegen[0];
        }
        /*
        if( (info.player_1.mistrzostwo[mistrzPosition1] == "Zdrowa atmosfera") && (current.stats_1.mana > skillBase.mag.mag_2.skills[2].values.b[info.player_1.um.um2_2- 1])) {
          battleStr+= "Zdrowa atmosfera<br>"
        
          mistrzPosition++;
        }
        */
        /*
         if( (info.player_1.mistrzostwo[mistrzPosition1] == "Szadź") && (current.stats_1.mana > skillBase.mag.mag_2.skills[2].values.b[info.player_1.um.um2_2- 1])) {
           battleStr+= "Szadź<br>"
         
           mistrzPosition++;
         }
          if( (info.player_1.mistrzostwo[mistrzPosition1] == "Tarcza odporności") && (current.stats_1.mana > skillBase.mag.mag_2.skills[2].values.b[info.player_1.um.um2_2- 1])) {
           battleStr+= "Tarcza odporności<br>"
         
           mistrzPosition++;
         }
         
         */
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Fuzja żywiołów") && (current.stats_1.mana > skillBase.mag.mag_3.skills[5].values.b[info.player_1.um.um3_5 - 1])) {
          if (combination[0] > 3) {
            combination[0] = 3;
          }
          battleStr += "Fuzja żywiołów. " + combination[0] + "punktów kombinacji<br>"
          current.stats_1.fire_dmg += current.stats_1.fire_dmg * (skillBase.mag.mag_3.skills[5].values.a[info.player_1.um.um3_5 - 1] / 100) * combination[0];
          current.stats_1.flash_dmg_max += current.stats_1.flash_dmg_max * (skillBase.mag.mag_3.skills[5].values.a[info.player_1.um.um3_5 - 1] / 100) * combination[0];
          current.stats_1.flash_dmg_min += current.stats_1.flash_dmg_min * (skillBase.mag.mag_3.skills[5].values.a[info.player_1.um.um3_5 - 1] / 100) * combination[0];
          current.stats_1.ice_dmg += current.stats_1.ice_dmg * (skillBase.mag.mag_3.skills[5].values.a[info.player_1.um.um3_5 - 1] / 100) * combination[0];
          mistrzPosition++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Niszczycielski cios") && (current.stats_1.energy > skillBase.wojownik.wojownik_1.skills[1].values.c[info.player_1.um.um1_1 - 1])) {
          battleStr += "Niszczycielski cios<br>"
          evadeLow[1] = skillBase.wojownik.wojownik_1.skills[1].values.c[info.player_1.um.um1_1 - 1];
          current.stats_2.armor -= skillBase.wojownik.wojownik_1.skills[1].values.c[info.player_1.um.um1_1 - 1] * ((current.stats_1.dmg_max + current.stats_1.dmg_min) / 2);
          current.stats_1.energy -= skillBase.wojownik.wojownik_1.skills[1].values.c[info.player_1.um.um1_1 - 1];
          mistrzPosition1++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Agresywny atak") && (current.stats_1.energy > skillBase.wojownik.wojownik_1.skills[3].values.c[info.player_1.um.um1_3 - 1])) {
          battleStr += "Agresywny atak<br>";
          dmgRed[1] = 1 + (skillBase.wojownik.wojownik_1.skills[3].values.a[info.player_1.um.um1_3 - 1] / 100)
          armorLow[0] = current.stats_1.armor * (skillBase.wojownik.wojownik_1.skills[3].values.b[info.player_1.um.um1_3 - 1] / 100);
          current.stats_1.armor -= armorLow;
          current.stats_1.energy -= skillBase.wojownik.wojownik_1.skills[3].values.c[info.player_1.um.um1_3 - 1];
          mistrzPosition1++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Błyskawiczny atak") && (current.stats_1.energy > skillBase.wojownik.wojownik_1.skills[4].values.c[info.player_1.um.um1_4 - 1])) {
          battleStr += "Błyskawiczny atak<br>";
          dmgRed[1] = 1 + (skillBase.wojownik.wojownik_1.skills[4].values.b[info.player_1.um.um1_4 - 1] / 100);
          speed[0] = current.stats_1.sa * skillBase.wojownik.wojownik_1.skills[4].values.a[info.player_1.um.um1_4 - 1];
          current.stats_1.energy -= skillBase.wojownik.wojownik_1.skills[2].values.c[info.player_1.um.um1_2 - 1];
          mistrzPosition1++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Ogłuszający cios") && (current.stats_1.energy > skillBase.wojownik.wojownik_2.skills[1].values.c[info.player_1.um.um2_1 - 1])) {
          isZamro[1] = 1;
          if (combination[0] > 3) {
            combination[0] = 3;
          }
          battleStr += "Ogłuszający cios " + combination[0] + "punktów kombinacji<br>";
          dmgRed[0] = 1 + (skillBase.wojownik.wojownik_2.skills[1].values.b[info.player_1.um.um2_1 - 1] / 100);
          current.stats_1.dmg_min += 0.05 * combination[0] * info.player_2.stats.hp;
          current.stats_1.dmg_max += 0.05 * combination[0] * info.player_2.stats.hp;
          combination[0] = 0;
          current.stats_1.energy -= skillBase.wojownik.wojownik_2.skills[1].values.c[info.player_1.um.um2_1 - 1]
          mistrzPosition1++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Taktyczne uderzenie") && (current.stats_1.energy > skillBase.wojownik.wojownik_3.skills[1].values.c[info.player_1.um.um3_1 - 1])) {
          battleStr += "Taktyczne uderzenie " + combination[0] + "punktów kombinacji<br>";
          dmgRed[0] = 1 + (skillBase.wojownik.wojownik_3.skills[1].values.b[info.player_1.um.um3_ - 1] / 100);
          current.stats_1.dmg_min += 0.05 * combination[0] * info.player_2.stats.hp;
          current.stats_1.dmg_max += 0.05 * combination[0] * info.player_2.stats.hp;
          combination[0] = 0;
          current.stats_1.energy -= skillBase.wojownik.wojownik_3.skills[1].values.c[info.player_1.um.um3_1 - 1]
          mistrzPosition1++;
        }
        if ((info.player_1.mistrzostwo[mistrzPosition1] == "Osłona tarczą") && (current.stats_1.energy > skillBase.wojownik.wojownik_3.skills[5].values.a[info.player_1.um.um3_5 - 1])) {
          battleStr += "Osłona tarczą <br>";
          dmgRed[1] = 0;
          combination[0]++;
          current.stats_1.energy -= skillBase.wojownik.wojownik_3.skills[5].values.c[info.player_1.um.um3_5 - 1]
          mistrzPosition1++;
        }/*
        if( (info.player_1.mistrzostwo[mistrzPosition1] == "Krwawa szarża") && (current.stats_1.energy > skillBase.wojownik.wojownik_3.skills[5].values.a[info.player_1.um.um3_5- 1])) {
      
          battleStr+= "Krwawa szarża <br>";

       mistrzPosition1++;
        }
        */
       if ((info.player_1.mistrzostwo[mistrzPosition1] == "Podwójny strzał") && (current.stats_1.energy > skillBase.lowca.lowca_1.skills[2].values.a[info.player_1.um.um1_2 - 1])) {
        battleStr += "Podwójny strzał<br>"
        dmgRed[0] = 1 - skillBase.lowca.lowca_1.skills[2].values.b[info.player_1.um.um1_2 - 1];
        hitLog += basicAttack(1, 2);
        current.stats_1.energy -= skillBase.lowca.lowca_1.skills[2].values.a[info.player_1.um.um1_2 - 1];
        mistrzPosition++;
      }
      // diamentowa
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Zatruta strzała") && (current.stats_1.energy > 30)) {
        battleStr += "Zatruta strzała<br>"
        poison[1] = (skillBase.lowca.lowca_1.skills[4].values.a[info.player_1.um.um1_4 - 1]/100)*current.stats_1.poison_dmg;
        poisonDuration[1] =5;
        current.stats_1.energy -= 30;
        mistrzPosition++;
      }
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Deszcz strzał") && (current.stats_1.energy > skillBase.lowca.lowca_2.skills[3].values.b[info.player_1.um.um2_3 - 1])) {
        battleStr += "Gracz otrzymał " + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 100) * ((current.stats_1.dmg_max + durrent.stats_1.dmg_min) / 2) + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * current.stats_1.fire_dmg + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * current.stats_1.ice_dmg + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * ((currene.stats_1.flash_dmg_max + current.stats_1.flash_dmg_min) / 2) + "<br>";
        current.stats_2.hp -= ((skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 100) * ((current.stats_1.dmg_max + durrent.stats_1.dmg_min) / 2) + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * current.stats_1.fire_dmg + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * current.stats_1.ice_dmg + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * ((currene.stats_1.flash_dmg_max + current.stats_1.flash_dmg_min) / 2) - current.stats_2.armor);
        battleStr += "Gracz otrzymał " + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 100) * ((current.stats_1.dmg_max + durrent.stats_1.dmg_min) / 2) + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * current.stats_1.fire_dmg + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * current.stats_1.ice_dmg + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * ((currene.stats_1.flash_dmg_max + current.stats_1.flash_dmg_min) / 2) + "<br>";
        current.stats_2.hp -= ((skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 100) * ((current.stats_1.dmg_max + durrent.stats_1.dmg_min) / 2) + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * current.stats_1.fire_dmg + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * current.stats_1.ice_dmg + (skillBase.lowca.lowca_2.skills[3].values.a[info.player_1.um.um2_3 - 1] / 200) * ((currene.stats_1.flash_dmg_max + current.stats_1.flash_dmg_min) / 2) - current.stats_2.armor)
        current.stats_1.energy -= skillBase.lowca.lowca_1.skills[4].values.a[info.player_1.um.um2_3- 1];
        mistrzPosition++;
        sa1 = sa1 - sa2; sa2 += (info.player_2.stats.sa + 1);
        tura1++;  current.stats_1.energy += enaRegen[0];
        current.stats_1.mana += manaRegen[0];
      }
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Piętno bestii") && (current.stats_1.energy > skillBase.lowca.lowca_2.skills[6].values.c[info.player_1.um.um2_6 - 1])) {
        battleStr += "Piętno bestii<br>"
       
        dmgRedDuration[1] = 4;
        current.stats_1.energy -= skillBase.lowca.lowca_2.skills[6].values.c[info.player_1.um.um2_6 - 1];
        mistrzPosition++;
      }
      for(var i =0; i <dmgRedDuration[1];i++){
        dmgRed[1] = 1+ (skillBase.lowca.lowca_2.skills[6].values.a[info.player_1.um.um2_6 - 1]/100);
      }
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Bandażowanie ran") && (current.stats_1.energy > skillBase.lowca.lowca_3.skills[2].values.b[info.player_1.um.um3_2 - 1])) {
        battleStr += "Bandażowanie ran<br>"
        current.stats_1.hp += (skillBase.lowca.lowca_3.skills[2].values.a[info.player_1.um.um3_2 - 1] / 100) * info.player_1.stats.hp;
        if (current.stats_1.hp > info.player_1.stats.hp) {
          current.stats_1.hp = info.player_1.stats.hp;
        }
        current.stats_1.energy -= skillBase.lowca.lowca_3.skills[2].values.b[info.player_1.um.um3_2 - 1];
        mistrzPosition++;
        sa1 = sa1 - sa2; sa2 += (info.player_2.stats.sa + 1);
        tura1++;
      }
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Błyskawiczny strzał") ) {
        if(combination[0]>3){
          combination = 3;
        }
        battleStr += "Błyskawiczny strzał "+combination[0]+" punktów kombinacji<br>"
        sa1 += (skillBase.lowca.lowca_3.skills[3].values.b[info.player_1.um.um3_3 - 1]/100)*info.player_1.stats.sa;
        current.stats_1.energy += 0.1*combination[0]*info.player_1.stats.energy;
        combination[0]=0;
        mistrzPosition++;
      }
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Rozpraszająca strzała") && (current.stats_1.energy > skillBase.lowca.lowca_4.skills[1].values.c[info.player_1.um.um4_1 - 1])) {
        battleStr += "Rozpraszająca strzała<br>"
       current.stats_2.crit_val -=skillBase.lowca.lowca_4.skills[1].values.a[info.player_1.um.um4_1 - 1];
       current.stats_2.crit_second_val -=skillBase.lowca.lowca_4.skills[1].values.a[info.player_1.um.um4_1 - 1]
       current.stats_2.pierce -=skillBase.lowca.lowca_4.skills[1].values.b[info.player_1.um.um4_1 - 1]
        current.stats_1.energy -= skillBase.lowca.lowca_4.skills[1].values.c[info.player_1.um.um4_1 - 1];
        mistrzPosition++;
      }
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Celny strzał") && (current.stats_1.energy > skillBase.lowca.lowca_4.skills[4].values.b[info.player_1.um.um4_4 - 1])) {
        battleStr += "Celny strzał<br>"
        current.stats_1.crit_val +=skillBase.lowca.lowca_4.skills[4].values.a[info.player_1.um.um4_4 - 1]
        current.stats_1.energy -= skillBase.lowca.lowca_4.skills[4].values.b[info.player_1.um.um4_4 - 1];
        mistrzPosition++;
      }
      // strzałw stopę
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Pchnięcie mrozu") && (current.stats_1.mana > skillBase.paladyn.paladyn_1.skills[1].values.b[info.player_1.um.um1_1 - 1])) {
        battleStr += "Pchnięcie mrozu<br>"
        speed[0] =-skillBase.paladyn.paladyn_1.skills[1].values.a[info.player_1.um.um1_1 - 1];
        current.stats_1.mana -= skillBase.paladyn.paladyn_1.skills[1].values.c[info.player_1.um.um1_1 - 1];
        checkForZamro[0] = 1;
        combination[0]++;
        mistrzPosition++;
      }
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Gorące uderzenie") && (current.stats_1.mana > skillBase.paladyn.paladyn_1.skills[2].values.b[info.player_1.um.um1_2 - 1])) {
        battleStr += "Gorące uderzenie<br>"
        current.stats_1.fire_dmg += (skillBase.paladyn.paladyn_1.skills[2].values.a[info.player_1.um.um1_2 - 1]/100)*current.stats_1.fire_dmg;
        evadeLow[1] = skillBase.paladyn.paladyn_1.skills[2].values.c[info.player_1.um.um1_2 - 1];
        combination[0]++;
        mistrzPosition++;
        current.stats_1.mana -= skillBase.paladyn.paladyn_1.skills[2].values.c[info.player_1.um.um1_2 - 1];
      }
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Gniew bogów") && (current.stats_1.energy > skillBase.paladyn.paladyn_1.skills[3].values.b[info.player_1.um.um1_3 - 1])) {
        if(combination[0]>3){
          combination[0] = 3;
        }
        battleStr += "Gniew bogów "+combination[0]+" punktów kombinacji<br>"
        current.stats_1.dmg_max += 0.2*current.stats_1.strength +(skillBase.paladyn.paladyn_1.skills[3].values.b[info.player_1.um.um1_3 - 1]/100)*combination[0]
        current.stats_1.dmg_min += 0.2*current.stats_1.strength +(skillBase.paladyn.paladyn_1.skills[3].values.b[info.player_1.um.um1_3 - 1]/100)*combination[0]
        combination[0]=0;
        mistrzPosition++;
        current.stats_1.energy -= skillBase.paladyn.paladyn_1.skills[3].values.c[info.player_1.um.um1_3 - 1];
      }
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Porażający cios") && (current.stats_1.mana > skillBase.paladyn.paladyn_1.skills[4].values.b[info.player_1.um.um1_4 - 1])) {
        battleStr += "Porażający cios<br>"
        current.stats_2.armor -=(skillBase.paladyn.paladyn_1.skills[4].values.a[info.player_1.um.um1_4 - 1]/100)*((current.stats_1.dmg_min+current.stats_1.dmg_max)/2)
        mistrzPosition++;
        combination[0]++;
        flashPaladinDuration[1] =2;
        current.stats_1.mana -= skillBase.paladyn.paladyn_1.skills[4].values.c[info.player_1.um.um1_4 - 1];
      }
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Szybki atak") && (current.stats_1.energy > skillBase.paladyn.paladyn_2.skills[1].values.b[info.player_1.um.um2_1 - 1])) {
        battleStr += "Szybki atak<br>"
        mistrzPosition++;
        speed[0]=skillBase.paladyn.paladyn_2.skills[1].values.a[info.player_1.um.um2_1 - 1]
        current.stats_1.energy -= skillBase.paladyn.paladyn_2.skills[1].values.b[info.player_1.um.um2_1 - 1];
      }
      // aura szybkosci
      //wyzyw
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Świetlista osłona") && (current.stats_1.energy > skillBase.paladyn.paladyn_3.skills[3].values.v[info.player_1.um.um3_3 - 1])) {
      if(combination[0]>3){
        combination[0]=3;
      }
        battleStr += "Świetlista osłona "+combination[0]+" punktów kombinacji<br>"
        current.stats_1.hp += skillBase.paladyn.paladyn_3.skills[3].values.d[info.player_1.um.um3_3 - 1] * combination[0];
        combination[0]=0;
        if(current.stats_1.hp >info.player_1.stats.hp){
          current.stats_1.hp =info.player_1.stats.hp
        }
        mistrzPosition++;
        current.stats_1.armor += 0.3*current.stats_1.armor;
        speed[0] = 0.2;
        armorLow[0] =-0.3*current.stats_1.armor;
        current.stats_1.energy -= skillBase.paladyn.paladyn_3.skills[3].values.c[info.player_1.um.um3_3 - 1];
      }
      if ((info.player_1.mistrzostwo[mistrzPosition1] == "Srebrzysty blask") && (current.stats_1.mana > skillBase.paladyn.paladyn_3.skills[5].values.b[info.player_1.um.um3_5 - 1])) {
          battleStr += "Srebrzysty blask <br>"
          current.stats_1.hp += (skillBase.paladyn.paladyn_3.skills[5].values.a[info.player_1.um.um3_3 - 1]/100)*info.player_1.stats.hp;
         
          if(current.stats_1.hp >info.player_1.stats.hp){
            current.stats_1.hp =info.player_1.stats.hp
          }
          mistrzPosition++;
       
          current.stats_1.mana -= skillBase.paladyn.paladyn_3.skills[5].values.b[info.player_1.um.um3_5 - 1];
        }
        //odnowa mocy
        //fala leczenia
        /*
        if (info.player_1.mistrzostwo[mistrzPosition] == "") {

          mistrzPosition++;
        }
     */
        if (course[0] == 1) {
          course[0] = 0; battleStr += "Klątwa. Utrata tury.(ten z lewej)<br>"; sa1 = sa1 - sa2; sa2 += (info.player_2.stats.sa + 1);
          tura1++;
        }

        else if (isZamro[0] == 1) {
          isZamro[0] = 0; sa1 = sa1 - sa2; sa2 += (info.player_2.stats.sa + 1);
          tura1++;
        }
        else if (kontra[0] == 1) {
          kontra[0] = 0;
          battleStr += basicAttack(1, 2);
          current.stats_1.sa = info.player_1.stats.sa;
          current.stats_1.energy += enaRegen[0];
          current.stats_1.mana += manaRegen[0];
        }
        else {

          sa1 = sa1 - sa2;
          sa2 += (info.player_1.stats.sa + 1);
          if (speed[0] != 0) {
            sa1 += speed[0];
          }
          if (speed[1] != 0) {
            sa2 -= speed[1];
            speed[0] = 0;
          }
          tura1++;
          total[1].attacks++;
          battleStr += basicAttack(1, 2);
          current.stats_1.energy += enaRegen[0];
          current.stats_1.mana += manaRegen[0];
          current.stats_1.sa = info.player_1.stats.sa;
          current.stats_1.poison_dmg = info.player_1.stats.poison_dmg;
          current.stats_1.dmg_max = info.player_1.stats.dmg_max;
          current.stats_1.dmg_min = info.player_1.stats.dmg_min;
          current.stats_1.crit_val = info.player_1.stats.crit_val;
          current.stats_1.crit_second_val = info.player_1.stats.crit_second_val;
          if (fastArrow_1 == 1) { sa1 = 4 * sa1; fastArrow = 0; }
          if (current.stats_2.hp <= 0) {
            battleStr += "wygrał gracz 1";
            win_1++;
          }
        }
      }
    }
    while ((sa2 > sa1) && (current.stats_1.hp > 0) && (current.stats_2.hp > 0)) {
      if ((info.player_2.prof == "tancerz" || info.player_2.prof == "wojownik" || info.player_2.prof == "paladyn") && ((position[0] - position[1]) != 0)) {
        battleStr += "Krok do przodu(gracz z prawej)<br>"; sa2 = sa2 - sa1; sa1 += (info.player_1.stats.sa + 1);
        tura1++;
        position[1]++;
      }
      else {
        if (info.player_2.mistrzostwo[mistrzPosition2] == null) {
          mistrzPosition2 = 0;
        }
        if ((info.player_2.mistrzostwo[mistrzPosition2] == "Trujące pchnięcie") && current.stats_2.energy > skillBase.tancerz.tancerz_1.skills[1].values.c[info.player_2.um.um1_1 - 1]) {
          battleStr += "Trujące pchnięcie<br>"
          current.stats_2.poison_dmg += current.stats_2.poison_dmg * skillBase.tancerz.tancerz_1.skills[1].values.a[info.player_2.um.um1_1 - 1];
          speed[1] = sa1 * (skillBase.tancerz.tancerz_1.skills[1].values.b[info.player_2.um.um1_1 - 1] / 100);
          mistrzPosition2++;
          current.stats_2.energy -= skillBase.tancerz.tancerz_1.skills[1].values.c[info.player_2.um.um1_1 - 1]
        }
        if ((info.player_2.mistrzostwo[mistrzPosition2] == "Błyskawiczny cios") && (current.stats_2.energy > skillBase.tancerz.tancerz_1.skills[4].values.b[info.player_2.um.um1_4])) {
          battleStr += "Błyskawiczny cios. Zużyto " + combination[1] + "pkt kombinacji<br>"
          speed[1] = sa1 * (skillBase.tancerz.tancerz_1.skills[4].values.a[info.player_2.um.um1_4 - 1] / 100);
          if (combination[1] > 3) {
            combination[1] = 3;
          }
          current.stats_2.dmg_max += 0.05 * combination[1] * info.player_2.stats.dmg_max;
          current.stats_2.dmg_min += 0.05 * combination[1] * info.player_2.stats.dmg_min;
          combination[1] = 0;
          mistrzPosition2++;
          current.stats_2.energy -= skillBase.tancerz.tancerz_1.skills[4].values.b[info.player_2.um.um1_4]
        }
        if ((info.player_2.mistrzostwo[mistrzPosition2] == "Wirujące ostrze") && (current.stats_2.energy > skillBase.tancerz.tancerz_2.skills[3].values.c[info.player_2.um.um2_3])) {
          battleStr += "Wirujące ostrze<br>"
          mistrzPosition2++;
          current.stats_2.energy -= skillBase.tancerz.tancerz_2.skills[3].values.c[info.player_2.um.um2_3]
        }
        if (info.player_2.mistrzostwo[mistrzPosition2] == "Rozszarpanie ran") {
          battleStr += "Rozszarpanie ran<br>"
          grDuration[1] += skillBase.tancerz.tancerz_2.skills[5].values.a[info.player_2.um.um2_5 - 1];

          mistrzPosition2++;
        }
        if ((info.player_2.mistrzostwo[mistrzPosition2] == "Rozpraszający okrzyk") && (current.stats_2.energy > skillBase.tancerz.tancerz_2.skills[6].values.b[info.player_2.um.um2_6])) {
          battleStr += "Rozpraszający okrzyk<br>"
          current.stats_1.crit_val -= skillBase.tancerz.tancerz_2.skills[6].values.a[info.player_2.um.um2_6 - 1];
          current.stats_1.crit_second_val -= skillBase.tancerz.tancerz_2.skills[6].values.a[info.player_2.um.um2_6 - 1];
          current.stats_1.armor_ev -= skillBase.tancerz.tancerz_2.skills[6].values.b[info.player_2.um.um2_6 - 1];
          speed[1] = 0.1;
          current.stats_2.energy -= skillBase.tancerz.tancerz_2.skills[6].values.b[info.player_2.um.um2_6];
          dmgRed[0] = 1 - skillBase.tancerz.tancerz_2.skills[6].values.c[info.player_2.um.um2_6];
          mistrzPosition2++;
        }
        if (info.player_2.mistrzostwo[mistrzPosition2] == "Jadowity podmuch") {
          battleStr += "Jadowity podmuch<br>"
          // ??
          mistrzPosition2++;
        }
        if (info.player_2.mistrzostwo[mistrzPosition2] == "Zadziorny atak") {
          battleStr += "Zadziorny atak<br>"
          speed[1] = sa1 * (skillBase.tancerz.tancerz_4.skills[4].values.b[info.player_2.um.um4_4 - 1] / 100);
          armorLow[1] = current.stats_2.armor * (skillBase.tancerz.tancerz_4.skills[4].values.c[info.player_2.um.um4_4 - 1] / 100);
          current.stats_2.armor -= armorLow;
          desArmorUm = 1;
          mistrzPosition2++;
        }
     
        /*
        if (info.player_2.mistrzostwo[mistrzPosition] == "") {

          mistrzPosition++;
        }
        */
        if (course[1] == 1) {
          course[1] = 0; battleStr += "Klątwa. Utrata tury.(ten z prawej)<br>"; sa2 = sa2 - sa1; sa1 += (info.player_1.stats.sa + 1)
          tura2++;
        }
        else if (isZamro[1] == 1) {
          isZamro[1] = 0; sa2 = sa2 - sa1; sa1 += (info.player_1.stats.sa + 1);
          tura2++;
          total[2].attacks++;
        } else if (kontra[1] == 1) {
          kontra[1] = 0;
          battleStr += basicAttack(2, 1);

        }
        else {

          sa2 = sa2 - sa1;
          sa1 += (info.player_1.stats.sa + 1)
          if (speed[1] != 0) {
            sa2 += speed[1];
          }
          if (speed[0] != 0) {
            sa1 -= speed[0];
            speed[0] = 0;
          }
          tura2++;
          total[2].attacks++;
          battleStr += basicAttack(2, 1);
          current.stats_2.sa = info.player_2.stats.sa;
          current.stats_2.poison_dmg = info.player_2.stats.poison_dmg;
          current.stats_2.dmg_max = info.player_2.stats.dmg_max;
          current.stats_2.dmg_min = info.player_2.stats.dmg_min;
          current.stats_2.crit_val = info.player_2.stats.crit_val;
          current.stats_2.crit_second_val = info.player_2.stats.crit_second_val;
          if (fastArrow_2 == 1) { sa2 = 4 * sa2; fastArrow = 0; }
          if (current.stats_1.hp <= 0) {
            battleStr += "wygrał gracz 2";
            win_2++;
          }
        }
      }
    }
    current.stats_1.armor += armorLow[0];
    current.stats_2.armor += armorLow[1];
  }

  if ((tura1 >= 50) || (tura2 >= 50)) {
    battleStr += "Walka nie wyłoniła zwycięzcy.";
  }
  return battleStr;
}

// bonusy z walk nie działają tzn zmaro i nie wiem c jeszcze
// mistrzos   // przed walka trza pliczyc hp, przewage z kryta, sa, uniktwo

function basicAttack(atacker, deffender) {
  current["stats_" + deffender].sa = current["stats_" + deffender].sa - current["stats_" + atacker].slow - current["stats_" + atacker].enemy_sa_red;
  current["stats_" + deffender].evade = current["stats_" + deffender].evade - current["stats_" + atacker].evade_low;
  if (info["player_" + atacker].prof == "mag") {
    current["stats_" + deffender].evade = 0;
  }

  // przewaga do kryta itd te z roznicy w lvl

  dmg = getDamageValue(info["player_" + atacker].stats, atacker);

  if (fireArrow[atacker - 1] == 1) {
    dmg[3] += dmg[3] * skillBase.trop.trop_1.skills[2].values.a[info["player_" + atacker].um.um1_2 - 1];

  }
  var ileDa = 0;
  var daLvl = 0;
  var ileCbk = 0;
  var cbkLvl = 0;
  var ileOr = 0;
  var orLvl = 0;
  var ileFiz = 0;
  var fizLvl = 0;
  var ileKo = 0;
  var koLvl = 0;
  var ileKl = 0;
  var klLvl = 0;
  var ileOz = 0;
  var ozLvl = 0;

  var isCrit = Math.floor((Math.random() * 100));

  // kryt pomocniczy dla tanca
  var isCritSecond = Math.floor((Math.random() * 100));

  //atacker legbons
  if (info["player_" + atacker].stats.legbons) {
    legbony = info["player_" + atacker].stats.legbons;
    for (var l = 0; l < legbony.length; l++) {
      // prog dzialania 30lvl lub 25% poziomu, powyzej progu działa o 2%*lvl
      var limit_at;
      if (30 > 0.25 * legbony[l].lvl) { limit_at = 30; } else { limit_at = parseInt(0.25 * legbony[l].lvl) }
      if (legbony[l].legbon == "da") {
        if (legbony[l].lvl > daLvl) daLvl = legbony[l].lvl;
        if ((legbony[l].lvl + limit_at) < info["player_" + atacker].lvl) {
          ileDa += 5 - 5 * 0.02 * (info["player_" + atacker].lvl - (legbony[l].lvl + limit_at));
        } else {
          ileDa += 5;
        }
        if (ileDa > 10) ileDa = 10;
      }
      if (legbony[l].legbon == "cbk") {
        if ((legbony[l].lvl + limit_at) < info["player_" + atacker].lvl) {
          ileCbk += 10 - 10 * 0.02 * (info["player_" + atacker].lvl - (legbony[l].lvl + limit_at));
        } else {
          ileCbk += 10;
        }
      }
      if (legbony[l].legbon == "kl") {
        if ((legbony[l].lvl + limit_at) < info["player_" + atacker].lvl) {
          ileKl += 7 - 7 * 0.02 * (info["player_" + atacker].lvl - (legbony[l].lvl + limit_at));
        } else {
          ileKl += 7;
        }
      }
    }
  }

  // deffender legbons
  if (info["player_" + deffender].stats.legbons) {
    legbony = info["player_" + deffender].stats.legbons;
    for (var l = 0; l < legbony.length; l++) {
      // prog dzialania 30lvl lub 25% poziomu, powyzej progu działa o 2%*lvl
      var limit_at;
      if (30 > 0.25 * legbony[l].lvl) { limit_at = 30; } else { limit_at = parseInt(0.25 * legbony[l].lvl) }
      if (legbony[l].legbon == "or") {
        if ((legbony[l].lvl + limit_at) < info["player_" + deffender].lvl) {
          ileOr += (1 - 0.02 * (info["player_" + deffender].lvl - limit_at));;
        } else {
          ileKl += 1;
        }
      }
      if (legbony[l].legbon == "fo") {
        if ((legbony[l].lvl + limit_at) < info["player_" + deffender].lvl) {
          ileFiz += 12 - 12 * 0.02 * (info["player_" + deffender].lvl - (legbony[l].lvl + limit_at));
        } else {
          ileFiz += 12;
        }
      }

      if (legbony[l].legbon == "ko") {
        if ((legbony[l].lvl + limit_at) < info["player_" + deffender].lvl) {
          ileKo += 15 - 15 * 0.02 * (info["player_" + deffender].lvl - (legbony[l].lvl + limit_at));
        } else {
          ileKo += 15;
        }
      }
      if (legbony[l].legbon == "oz") {
        if ((legbony[l].lvl + limit_at) < info["player_" + deffender].lvl) {
          ileOz += 12 - 12 * 0.02 * (info["player_" + deffender].lvl - (legbony[l].lvl + limit_at));
        } else {
          ileOz += 12;
        }
      }
    }
  }

  var writeKo = 0;
  if ((ileKo != 0) && (current["stats_" + atacker].crit_val > isCrit) || ((info["player_" + atacker].prof == "tancerz") && (current["stats_" + atacker].crit_second_val > isCritSecond))) {
    writeKo = 1;
  }

  var isDa;
  var isCbk;
  var isKl;

  var cbkIs = 0;
  isCbk = Math.floor((Math.random() * 100));
  if (current["stats_" + atacker].crit_val > isCrit) {
    if (ileCbk > isCbk) {
      cbkIs = 1;
    }
  }
  var cbkSecond = 0;

  if ((current["stats_" + atacker].crit_second_val > isCritSecond) && info["player_" + atacker].prof == "tancerz") {
    isCbk = Math.floor((Math.random() * 100));
    if (ileCbk > isCbk) {
      cbkSecond = 1;
    }
  }

  isKl = Math.floor((Math.random() * 100));

  if (current["stats_" + atacker].crit_val > isCrit) {
    if (cbkIs == 1) {
      current["stats_" + atacker].crit = current["stats_" + atacker].crit * 2;
      current["stats_" + atacker].crit_m = current["stats_" + atacker].crit_m * 2;
      cbkIs = 0;

    }
    if (dmg[0] != null) { dmg[0] = parseInt(dmg[0] * current["stats_" + atacker].crit); }
    if (dmg[3] != null) { dmg[3] = parseInt(dmg[3] * current["stats_" + atacker].crit_m); }
    if (dmg[4] != null) { dmg[4] = parseInt(dmg[4] * current["stats_" + atacker].crit_m); }
    if (dmg[6] != null) { dmg[6] = parseInt(dmg[6] * current["stats_" + atacker].crit_m); }
  }

  if ((info["player_" + atacker].prof == "tancerz") && (current["stats_" + atacker].crit_second_val > isCritSecond)) {
    if (cbkSecond == 1) {
      current["stats_" + atacker].crit_second = current["stats_" + atacker].crit_second * 2;
      cbkSecond = 0;
    }
    if (dmg[1] != null) { dmg[1] = parseInt(dmg[1] * current["stats_" + atacker].crit_second); }
  }
  if (info["player_" + atacker].stats.armor_ev > isPierce) {
    if(info["player_"+atacker].prof=="lowca"){
      combination[atacker-1]++;
    }
    if (dmg[0] != null) { dmg[0] = dmg[0] + info["player_" + deffender].stats.armor; }
    if (dmg[3] != null) { dmg[3] = dmg[3] + info["player_" + deffender].stats.armor; }
    if (dmg[4] != null) { dmg[4] = dmg[4] + info["player_" + deffender].stats.armor; }
    if (dmg[6] != null) { dmg[6] = dmg[6] + info["player_" + deffender].stats.armor; }
  }
  current["stats_" + atacker].crit_second = info["player_" + atacker].stats.crit_second;
  current["stats_" + atacker].crit = info["player_" + atacker].stats.crit;
  current["stats_" + atacker].crit_m = info["player_" + atacker].stats.crit_m;

  // wyżej są liczone bonusy legend i siła z jaką uderzy
  var hitLog = "";
  hitLog += info["player_" + atacker].prof + "_" + atacker + " (" + parseInt((current["stats_" + atacker].hp / info["player_" + atacker].stats.hp) * 100) + "%) uderzył z siłą" + getDamage(dmg) + '<br>'; // jeszcze trzeci cios
  var critFirst = 0;
  if (current["stats_" + atacker].crit_val > isCrit) {
    total[atacker].crits++;
    critFirst - 1;
    hitLog += " + Cios krytyczny<br>"
    if (info["player_" + atacker].prof == "lowca" && info["player_" + atacker].um.um4_2 != 0) hitLog += "Krytyczne spowolnienie o" + skillBase.lowca.lowca_4.skills[2].values.a[info["player_" + atacker].um.um4_2 - 1] + '%' + '<br>';
    if (info["player_" + atacker].prof == "tancerz" && info["player_" + atacker].um.um1_4 != 0) combination[atacker - 1]++;
    if (info["player_" + atacker].prof == "wojownik" && info["player_" + atacker].um.um2_1 != 0) combination[atacker - 1]++;

  };
  var critSecond = 0;
  if ((info["player_" + atacker].prof == "tancerz") && (info["player_" + atacker].stats.crit_second_val > isCritSecond)) {
    total[atacker].secondCrit++;
    critSecond = 1;
    hitLog += " + Cios krytyczny broni pomocniczej<br>";
    combination[atacker - 1]++
  }

  if (current["stats_" + atacker].crit_val > isCrit) {
    if (ileCbk > isCbk) {
      hitLog += "<i><b>+CIOS BARDZO KRYTYCZNY</i></b><br>";
      total[atacker].cbk++;
    }
  }

  if (cbkSecond == 1) {
    if (ileCbk > isCbk) {
      hitLog += "<i><b>+CIOS BARDZO KRYTYCZNY</i></b><br>";
      total[atacker].cbk++;
    }
  }
  if (ileKl > isKl) {
    course[deffender - 1] = 1;
    hitLog += '<span style="color:red"><i><b>+Klątwa</i></b></span><br>';
    total[atacker].kl++;
  }


  var isEvade = Math.floor((Math.random() * 100));
  var evadeCap = 40 * current["stats_" + deffender].evade / info["player_" + atacker].lvl;
  if (evadeCap > 50) evadeCap = 50;
  if (evadeLow[deffender] != 0) {
    evadeCap -= evadeLow[deffender];
    evadelow[deffender] = 0;
  }
  if (evadeCap > isEvade) { hitLog += '<span style="color:black"> - Unik </span><br>'; total[deffender].evades++; }
  var holyTouch = 0;
  isDa = Math.floor((Math.random() * 100));

  if (evadeCap <= isEvade) {
    if (ileDa > isDa) {
      current["stats_" + atacker].hp += 30 * Math.round(8 + daLvl + (0.02 * daLvl * daLvl + 2.6 * daLvl) / 5);
      if (current["stats_" + atacker].hp > info["player_" + atacker].stats.hp) { current["stats_" + atacker].hp = info["player_" + atacker].stats.hp }
      total[atacker].da++;
      hitLog += '<span style="color:#FF00FF"><i><b>+Dotyk anioła, życie +' + 30 * Math.round(8 + daLvl + (0.02 * daLvl * daLvl + 2.6 * daLvl) / 5) + '</b></i></span><br>';
    }
  }

  // + energia po krytyku
  if ((current["stats_" + atacker].crit_val > isCrit) && info["player_" + atacker].prof == "pal" && info["player_" + atacker].um.um3_2 != 0) {
    hitLog += "+ " + skillBase.paladyn.paladyn_3.skills[2].values.a[info["player_" + atacker].um.um3_2 - 1] + " energii<br>";
    current["stats_" + atacker].energy += skillBase.paladyn.paladyn_3.skills[2].values.a[info["player_" + atacker].um.um3_2 - 1];
  }
  if (((current["stats_" + atacker].crit_val > isCrit) || (info["player_" + atacker].stats.crit_second_val > isCritSecond)) && (info["player_" + atacker].prof == "tancerz" && info["player_" + atacker].um.um3_5 != 0)) {
    hitLog += "+ " + skillBase.tancerz.tancerz_3.skills[5].values.a[info["player_" + atacker].um.um3_5 - 1] + " energii<br>";
    current["stats_" + atacker].energy += skillBase.tancerz.tancerz_3.skills[5].values.a[info["player_" + atacker].um.um3_5 - 1];
  }
  if ((current["stats_" + atacker].crit_val > isCrit) && info["player_" + atacker].prof == "woj" && info["player_" + atacker].um.um3_4 != 0) {
    hitLog += "+ " + skillBase.wojownik.wojownik_3.skills[4].values.a[info["player_" + atacker].um.um3_4 - 1] + " energii<br>";
    current["stats_" + atacker].energy += skillBase.wojownik.wojownik_3.skills[4].values.a[info["player_" + atacker].um.um3_4 - 1];
  }
  // szybka strzała i przebicie dla tropa
  var isPierce;
  var isFastArr;
  if (info["player_" + atacker].prof == "trop") {
    isPierce = Math.floor((Math.random() * 100));
    isFastArr = Math.floor((Math.random() * 100));
    if ((info["player_" + atacker].um.um2_5 != 0) && skillBase.trop.trop_2.skills[5].values.b[info["player_" + atacker].um.um2_5 - 1] > isFastArr) {
      total[atacker].fastArrows++;
      hitLog += "+ szybka strzała<br>";
      fastArrow = 1;
    }

    if (info["player_" + atacker].um.um2_5 != 0) { info["player_" + atacker].stats.armor.ev += skillBase.trop.trop_2.skills[5].values.a[info["player_" + atacker].um.um2_5 - 1] }
    if (info["player_" + atacker].stats.armor_ev != 0) {

      if (info["player_" + atacker].stats.armor_ev > isPierce) {
        total[atacker].pierces++;
        hitLog += " + przebicie<br>";
      }
    }
  }
  // szybka i przebicie dla lowcy
  if (info["player_" + atacker].prof == "lowca") {
    isPierce = Math.floor((Math.random() * 100));
    isFastArr = Math.floor((Math.random() * 100));

    if ((info["player_" + atacker].um.um2_2 != 0) && skillBase.lowca.lowca_2.skills[2].values.b[info["player_" + atacker].um.um2_2 - 1] > isFastArr) {
      hitLog += "+ szybka strzała<br>";
      total[atacker].fastArrows++;
      fastArrow = 1;
    }

    if (info["player_" + atacker].um.um2_2 != 0) { info["player_" + atacker].stats.armor.ev += skillBase.lowca.lowca_2.skills[2].values.a[info["player_" + atacker].um.um2_2 - 1] }
    if (info["player_" + atacker].stats.armor_ev != 0) {
      var isPierce = Math.floor((Math.random() * 100));
      if (info["player_" + atacker].stats.armor_ev > isPierce) {
        total[atacker].pierces++;
        hitLog += " + przebicie<br>";
      }
    }
  }

  // gr do 2.25 (1+0.)
  // olać jednoreczna
  if ((info["player_" + atacker].stats.gr_chance != 0) || (info["player_" + atacker].stats.gr_second_chance)) {
    /*
    var isGr = Math.floor((Math.random() * 100));
    if (info["player_" + atacker].stats.gr_chance > isGr) {
      total[atacker].gr++;
      if (grDuration[deffender - 1] == 0) {
        grDuration[deffender - 1] = 5;
        grDmg[deffender-1] = parseInt(info["player_" + atacker].stats.gr);
      } else {
        grDuration[deffender - 1] += 2;
        grDmg[deffender-1] += parseInt( 0.5 * (info["player_" + atacker].stats.gr));
      }
      hitLog += " + głęboka rana<br>";
    }
    */
    var isGrSecond = Math.floor((Math.random() * 100));
    if (info["player_" + atacker].stats.gr_second_chance > isGrSecond) {
      total[atacker].gr++;
      if (grDuration[deffender - 1] == 0) {
        grDuration[deffender - 1] = 5;
        grDmg[deffender - 1] = parseInt(info["player_" + atacker].stats.gr_second);
      } else {

        grDuration[deffender - 1] += 2;
        grDmg[deffender - 1] += parseInt(0.5 * info["player_" + atacker].stats.gr_second);
        if (grDmg > 2.25 * info["player_" + atacker].stats.gr_second) {
          grDmg = parseInt(2.25 * info["player_" + atacker].stats.gr_second);
        }
      }
      hitLog += " + głęboka rana pomocnicza<br>";
    }

  }
  // redukcja gr/truty z um
  if (info["player_" + deffender].prof == "paladyn") {
    if ((info["player_" + deffender].um.um2_5 != 0)) {
      if (dmg[2] != null) {
        dmg[2] = dmg[2] * ((100 - skillBase.paladyn.paladyn_2.skills[5].values.b[info["player_" + deffender].um.um2_5 - 1]) / 100);
      }
    }
  }
  if (info["player_" + deffender].prof == "wojownik") {
    if ((info["player_" + deffender].um.um3_3 != 0)) {
      if (dmg[2] != null) {
        dmg[2] = dmg[2] * ((100 - skillBase.wojownik.wojownik_3.skills[3].values.b[info["player_" + deffender].um.um3_3 - 1]) / 100);
      }
    }
  }
  var thirdStrike = 0;
  if (info["player_" + atacker].prof == "tancerz" && info["player_" + atacker].um.um1_3 != 0) {
    var third = Math.floor((Math.random() * 100));
    if (skillBase.tancerz.tancerz_1.skills[3].values.a[info["player_" + atacker].um.um1_3 - 1] > third) {
      thirdStrike = 1;
      hitLog += "+ trzeci cios<br>";
    }
  };


  //płonka
  if (fireArrow[atacker - 1] == 1) {
    if (evadeCap > isEvade) {
      fireArrowDuration[deffender - 1] = 3;
      fireArrow[atacker - 1] = 0;
    }
  }
  //porażajaca strzała
  if (flashArrow[atacker - 1] == 1) {
    flashArrowDuration[atacker - 1] = 2;
  }
  // JAK DZIAŁA PAROWANIE???? !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // zeruje atak z first broni graczy z pierwszej lini
  var parowanie;
  var isParowanie = 0;
  if (info["player_" + deffender].prof == "tancerz") {
    if ((info["player_" + deffender].um.um3_1 != 0)) {
      parowanie = Math.floor((Math.random() * 100));
      if ((skillBase.tancerz.tancerz_3.skills[1].values.a[info["player_" + deffender].um.um3_1 - 1]) > parowanie) {
        isParowanie = 1;
        hitLog += " + parowanie<br>"

      }
    }
  }
  if (info["player_" + deffender].prof == "paladyn") {
    if ((info["player_" + deffender].um.um2_3 != 0)) {
      parowanie = Math.floor((Math.random() * 100));
      if ((skillBase.paladyn.paladyn_2.skills[3].values.a[info["player_" + deffender].um.um2_6 - 1]) > parowanie) {
        isParowanie = 1;
        hitLog += " + parowanie<br>"
      }
    }
  }
  var counter;
  var isCounter = 0;

  if (info["player_" + deffender].stats.counter) {
    counter = Math.floor((Math.random() * 100));
    if ((info["player_" + deffender].stats.counter) > counter) {
      isCounter = 1;
      hitLog += " + kontra<br>";
      kontra[deffender - 1] = 1;
    }
  }
  var block;
  var isBlock = 0;
  var blockValue = 0;
  // TO TRZEBA LICZYĆ INACZEJ
  if (info["player_" + deffender].stats.block) {
    block = Math.floor((Math.random() * 100));
    if ((info["player_" + deffender].stats.block / 100) > block) {
      isBlock = 1;
      blockValue = 8 * (info["player_" + deffender].stats.block + info["player_" + deffender].lvl)
      hitLog += " + blok<br>"
      if(info["player_"+atakcer].prof =="paladyn"){
        combination[0]++;
      }
    }
  }
  var pierceBlock;
  var isPierceBlock = 0;
  // TO TRZEBA LICZYĆ INACZEJ
  if (info["player_" + deffender].stats.pierce_block) {
    pierceBlock = Math.floor((Math.random() * 100));
    if ((info["player_" + deffender].stats.pierce_block / 100) > pierceBlock) {
      isPierceBlock = 1;
      hitLog += " + blok przebicia<br>"
    }
  }
  // current, a nie info
  // NA UNIKU NIC NIE MOZNA ZNISZCZYC#############################
  if ((current["stats_" + atacker].destroy_armor > 0) && current["stats_" + deffender].armor > 0) {
    if (evadeCap <= isEvade) {
      current["stats_" + deffender].armor = current["stats_" + deffender].armor - parseInt(current["stats_" + atacker].destroy_armor - current["stats_" + deffender].enemy_low_armor_des);
      if (current["stats_" + deffender].armor < 0) {
        current["stats_" + deffender].armor = 0;
      }
      hitLog += "zniszczono " + (parseInt(current["stats_" + atacker].destroy_armor) - parseInt(current["stats_" + deffender].enemy_low_armor_des)) + " pancerza<br>";
      total[atacker].des_armor += (parseInt(current["stats_" + atacker].destroy_armor) - parseInt(current["stats_" + deffender].enemy_low_armor_des));
    }
  }

  //niszczenie odp
  if ((current["stats_" + atacker].res_low > 0) && (current["stats_" + deffender].ice_res > 0 || current["stats_" + deffender].fire_res > 0 || current["stats_" + deffender].flash_res > 0 || current["stats_" + deffender].poison_res > 0)) {
    if (evadeCap <= isEvade) {
      current["stats_" + deffender].ice_res = current["stats_" + deffender].ice_res - (current["stats_" + atacker].res_low);
      current["stats_" + deffender].fire_res = current["stats_" + deffender].fire_res - (current["stats_" + atacker].res_low);
      current["stats_" + deffender].flash_res = current["stats_" + deffender].flash_res - (current["stats_" + atacker].res_low);
      current["stats_" + deffender].poison_res = current["stats_" + deffender].poison_res - (current["stats_" + atacker].res_low);
      if (current["stats_" + deffender].ice_res < 0) {
        current["stats_" + deffender].ice_res = 0;
      }
      if (current["stats_" + deffender].fire_res < 0) {
        current["stats_" + deffender].fire_res = 0;
      }
      if (current["stats_" + deffender].flash_res < 0) {
        current["stats_" + deffender].flash_res = 0;
      }
      if (current["stats_" + deffender].poison_res < 0) {
        current["stats_" + deffender].poison_res = 0;
      }
      hitLog += "zniszczono " + (current["stats_" + atacker].res_low) + " odpornosci<br>";
    }
  }

  // niszczarka eny
  if ((current["stats_" + atacker].destroy_energy > 0) && current["stats_" + deffender].energy > 0) {
    if (evadeCap <= isEvade) {
      current["stats_" + deffender].energy = current["stats_" + deffender].arenergymor - (current["stats_" + atacker].destroy_energy - current["stats_" + deffender].enemy_low_energy_des);
      if (current["stats_" + deffender].energy < 0) {
        current["stats_" + deffender].energy = 0;
      }
      hitLog += "zniszczono " + (current["stats_" + atacker].destroy_energy - current["stats_" + deffender].enemy_low_energy_des) + " energii<br>";
      total[atacker].des_en += (current["stats_" + atacker].destroy_energy - current["stats_" + deffender].enemy_low_energy_des);
    }
  }
  //niszczarka many
  if ((current["stats_" + atacker].destroy_mana > 0) && current["stats_" + deffender].mana > 0) {
    if (evadeCap <= isEvade) {
      current["stats_" + deffender].mana = current["stats_" + deffender].mana - (current["stats_" + atacker].destroy_mana - current["stats_" + deffender].enemy_low_mana_des);
      if (current["stats_" + deffender].mana < 0) {
        current["stats_" + deffender].mana = 0;
      }
      hitLog += "zniszczono " + (current["stats_" + atacker].destroy_mana - current["stats_" + deffender].enemy_low_mana_des) + " many<br>";
      total[atacker].des_mana += (current["stats_" + atacker].destroy_mana - current["stats_" + deffender].enemy_low_mana_des);
    }
  }
  // niszczarka abs
  if ((current["stats_" + atacker].destroy_abs > 0) && current["stats_" + deffender].abs > 0) {
    if (evadeCap <= isEvade) {
      current["stats_" + deffender].abs = current["stats_" + deffender].abs - (current["stats_" + atacker].destroy_abs);
      current["stats_" + deffender].abs_fiz = current["stats_" + deffender].abs_fiz - (current["stats_" + atacker].destroy_abs);
      if (current["stats_" + deffender].abs < 0) {
        current["stats_" + deffender].abs = 0;
      }
      if (current["stats_" + deffender].abs_fiz < 0) {
        current["stats_" + deffender].abs_fiz = 0;
      }
      hitLog += "zniszczono " + current["stats_" + atacker].destroy_abs + " absorbcji<br>";
    }
  }

  if (writeKo == 1) {
    hitLog += '<span style="color:"#BB0088"><b>-Krytyczna osłona</b></span><br>'; //krytyczna

  }
  var zamro;

  if (info["player_" + atacker].prof == "paladyn") {
    if ((info["player_" + atacker].um.um1_1 != 0)) {
      zamro = Math.floor((Math.random() * 100));
      if (((skillBase.paladyn.paladyn_1.skills[1].values.a[info["player_" + atacker].um.um1_1 - 1]) > zamro) && (checkForZamro == 1)) {
        isZamro[deffender - 1] = 1;
        hitLog += '<span style="color:blue"> + zamrożenie</span><br>';
        total[atacker].froze++;
      }
    }
  }
  if (info["player_" + atacker].prof == "mag") {
    if ((info["player_" + atacker].um.um1_3 != 0)) {
      zamro = Math.floor((Math.random() * 100));
      if ((skillBase.mag.mag_1.skills[3].values.b[info["player_" + atacker].um.um1_3 - 1]) > zamro) {
        isZamro[deffender - 1] = 1;
        hitLog += '<span style="color:blue"> + zamrożenie</span><br>';
        total[atacker].froze++;
      }
    }
  }

  if (info["player_" + atacker].prof == "trop") {
    if ((info["player_" + atacker].um.um1_1 != 0)) {
      zamro = Math.floor((Math.random() * 100));
      if ((skillBase.trop.trop_1.skills[1].values.b[info["player_" + atacker].um.um1_1 - 1]) > zamro) {
        idZamro = 1;
        hitLog += '<span style="color:blue"> + zamrożenie</span><br>';
        total[atacker].froze++;
      }
    }
  }
  var isOgl = 0;
  var ogl
  if (info["player_" + atacker].prof == "wojownik") {
    if ((info["player_" + atacker].um.um2_1 != 0) && isZamro[deffender - 1] == 1) {
      ogl = Math.floor((Math.random() * 100));
      if ((skillBase.wojownik.wojownik_2.skills[1].values.b[info["player_" + atacker].um.um2_1 - 1]) > ogl) {
        isOgl = 1;
        hitLog += ' + ogłuszenie<br>';
        isZamro[deffender - 1] = 0;
        total[atacker].froze++;
      }
    }
  }

  isOz = Math.floor((Math.random() * 100));

  if (ileOz > isOz) {
    current["stats_" + deffender].ice_res = 90;
    current["stats_" + deffender].fire_res = 90;
    current["stats_" + deffender].flash_res = 90;
    hitLog += '<span style="color:#006dc1"><i><b>+Ochrona żywiołów</i></b></span>';
    total[deffender].oz++;
  }


  if (ileFiz != 0 && ((dmg[0] != 0) || (dmg[1] != 0))) {
    hitLog += '<span style="color:#006dc1"><b>-Fizyczna osłona ' + ileFiz + ' %</b></span><br>'; //fizyczna
  }

  if (desArmorUm == 1) {
    current["stats_" + deffender].armor -= (skillBase.tancerz.tancerz_4.skills[4].values.a[info["player_" + atacker].um.um4_4 - 1] / 100) * parseInt(dmg[0] - info["player_" + deffender].stats.armor) * (1 - (ileFiz / 100) - blockValue)
    battleStr += "zniszczono " + parseInt(skillBase.tancerz.tancerz_4.skills[4].values.a[info["player_" + atacker].um.um4_4 - 1] / 100) * parseInt(dmg[0] - info["player_" + deffender].stats.armor) * (1 - (ileFiz / 100) - blockValue) + " pancerza<br>";
    desArmorUm = 0;
  }
  var dmgTakenStr = "";
  var dmgTaken = 0;
  if (dmg[0] != null) {
    dmgTaken = parseInt(dmg[0] - info["player_" + deffender].stats.armor) * (1 - (ileFiz / 100) - blockValue);
    if (evadeCap > isEvade) {
      dmgTaken = 0;
    }
    if (writeKo == 1 && critFirst == 1) {
      dmgTaken = parseInt(dmgTaken * (1 - (ileKo / 100)));
    }
    if (dmgTaken < 0) {
      dmgTaken = 0;
    }
    dmgTakenStr += "+ " + parseInt(dmgTaken);
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - dmgTaken;
  }
  if (dmg[1] != null) {
    dmgTaken = parseInt((dmg[1] - info["player_" + deffender].stats.armor) * (1 - (ileFiz / 100)) - blockValue);

    if (writeKo == 1 && critSecond == 1) {
      dmgTaken = parseInt(dmgTaken * (1 - (ileKo / 100)));
    }
    if (dmgTaken < 0) {
      dmgTaken = 0;
    }
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - dmgTaken;
    dmgTakenStr += "+ " + parseInt(dmgTaken);
  }

  if (dmg[3] != null) {
    dmgTaken = (parseInt((dmg[3] - info["player_" + deffender].stats.armor) * ((100 - info["player_" + deffender].stats.fire_res) / 100)) - blockValue);
    if (evadeCap > isEvade) {
      dmgTaken = 0;
    }
    if (writeKo == 1) {
      dmgTaken = dmgTaken * (1 - (ileKo / 100));
    }
    if (dmgTaken < 0) {
      dmgTaken = 0;
    }
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - dmgTaken;
    dmgTakenStr += '<span style="color:red">+ ' + parseInt(dmgTaken) + '</span>';

  }
  if (dmg[4] != null) {
    dmgTaken = (parseInt((dmg[4] - info["player_" + deffender].stats.armor) * ((100 - info["player_" + deffender].stats.ice_res) / 100)) - blockValue);
    if (evadeCap > isEvade) {
      dmgTaken = 0;
    }
    if (writeKo == 1) {
      dmgTaken = dmgTaken * (1 - (ileKo / 100));
    }
    if (dmgTaken < 0) {
      dmgTaken = 0;
    }
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - dmgTaken;
    dmgTakenStr += '<span style="color:blue">+ ' + parseInt(dmgTaken) + '</span>';
  }
  if (dmg[6] != null) {
    dmgTaken = (parseInt((dmg[6] - info["player_" + deffender].stats.armor) * ((100 - info["player_" + deffender].stats.flash_res) / 100)) - blockValue);
    if (evadeCap > isEvade) {
      dmgTaken = 0;
    }
    if (writeKo == 1) {
      dmgTaken = dmgTaken * (1 - (ileKo / 100));
    }
    if (dmgTaken < 0) {
      dmgTaken = 0;
    }
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - dmgTaken;
    dmgTakenStr += '<span style="color:#d1b655">+ ' + parseInt(dmgTaken) + '</span>';
  }
  if (dmg[5] != null) {
    dmgTaken = parseInt((dmg[5]) * ((100 - info["player_" + deffender].stats.poison_res) / 100));
    if (writeKo == 1) {
      dmgTaken = dmgTaken * (1 - (ileKo / 100));
    }
    if (dmgTaken < 0) {
      dmgTaken = 0;
    }
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - parseInt(dmgTaken);
    dmgTakenStr += '<span style="color:#6fbc60">+ ' + parseInt((dmg[5]) * ((100 - info["player_" + deffender].stats.poison_res) / 100)) + '</span>';
  }
  if (thirdStrike == 1) {
    dmgTakenStr += '<span style="color:#d1b655">+ ' + parseInt((current.stats_1.dmg_min + current.stats_1.dmg_max) / 2) + '</span>';
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - parseInt((current.stats_1.dmg_min + current.stats_1.dmg_max) / 2);
  }
  writeKo = 0;
  if ((usedOr[deffender - 1] == 0) && (ileOr != 0) && (parseInt((current["stats_" + deffender].hp / info["player_" + deffender].stats.hp) * 100) < 12)) {
    var bonusHp = Math.floor((Math.random() * (parseInt(info["player_" + deffender].stats.hp * 0.38) - parseInt(info["player_" + deffender].stats.hp * 0.18) + 1) * 1.2) + parseInt(info["player_" + deffender].stats.hp * 0.18));
    current["stats_" + deffender].hp += bonusHp;
    hitLog += '<span style="color:#FF00FF"><b>+Ostatni ratunek, życie +' + bonusHp + ' </b></span><br>';
    usedOr[deffender - 1] = 1;
  }

  hitLog += info["player_" + deffender].prof + "_" + deffender + " (" + parseInt((current["stats_" + deffender].hp / info["player_" + deffender].stats.hp) * 100) + "%)  otrzymał "

  hitLog += dmgTakenStr + " obrażeń.<br><br>"
  if (grDmg[deffender - 1] != null && grDuration[deffender - 1] != 0) {
    grDuration[deffender - 1]--;
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - parseInt(grDmg[deffender - 1]);
    hitLog += info["player_" + deffender].prof + "_" + deffender + " (" + parseInt((current["stats_" + deffender].hp / info["player_" + deffender].stats.hp) * 100) + "%)  otrzymał " + parseInt(grDmg[deffender - 1]) + " obrażen od głębokiej rany<br><br>";

  }
  if (fireArrowDuration[deffender - 1] != 0) {
    fireArrowDuration[deffender - 1]--;
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - parseInt(dmg[3] * skillBase.trop.trop_1.skills[2].values.c[info["player_" + atacker].um.um1_2 - 1]);
    hitLog += info["player_" + deffender].prof + "_" + deffender + " (" + parseInt((current["stats_" + deffender].hp / info["player_" + deffender].stats.hp) * 100) + "%)  otrzymał " + parseInt(dmg[3] * skillBase.trop.trop_1.skills[2].values.c[info["player_" + atacker].um.um1_2 - 1]) + " obrażen od ognia<br><br>";
  }
  if (flashArrowDuration[deffender - 1] != 0) {
    flashArrowDuration[deffender - 1]--;
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - parseInt(info["player_" + deffender].stats.hp * skillBase.trop.trop_1.skills[2].values.c[info["player_" + atacker].um.um1_2 - 1]);
    hitLog += info["player_" + deffender].prof + "_" + deffender + " (" + parseInt((current["stats_" + deffender].hp / info["player_" + deffender].stats.hp) * 100) + "%)  otrzymał " + parseInt(info["player_" + deffender].stats.hp * skillBase.trop.trop_1.skills[2].values.c[info["player_" + atacker].um.um1_2 - 1]) + " obrażen od błyskawic<br><br>";
  }
  
  if (flashPaladinDuration[deffender - 1] != 0) {
    flashPaladinDuration[deffender - 1]--;
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - parseInt(info["player_" + deffender].stats.hp * skillBase.paladyn.paladyn_1.skills[4].values.b[info["player_" + atacker].um.um1_4 - 1]);
    hitLog += info["player_" + deffender].prof + "_" + deffender + " (" + parseInt((current["stats_" + deffender].hp / info["player_" + deffender].stats.hp) * 100) + "%)  otrzymał " + parseInt(info["player_" + deffender].stats.hp * skillBase.paladyn.paladyn_1.skills[4].values.b[info["player_" + atacker].um.um1_4 - 1]) + " obrażen od błyskawic<br><br>";
  }
  if (fireBallDuration[deffender - 1] != 0) {
    current["stats_" + deffender].hp = current["stats_" + deffender].hp - parseInt(info["player_" + deffender].stats.hp * skillBase.mag.mag_1.skills[2].values.b[info["player_" + atacker].um.um1_2 - 1]);
    hitLog += info["player_" + deffender].prof + "_" + deffender + " (" + parseInt(info["player_" + deffender].stats.hp * skillBase.mag.mag_1.skills[2].values.b[info["player_" + atacker].um.um1_2 - 1]) + " obrażen od ognia<br><br>";

  }
  
  return hitLog;


}


function roundNumber(num, scale) {
  if (!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale) + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if (+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}

function getDamageValue(statystyki, atacker) {
  var dmg = [];
  if (statystyki.dmg_min) { dmg[0] = parseInt(((statystyki.dmg_min + statystyki.dmg_max) / 2) * dmgRed[atacker - 1]) }
  if (statystyki.dmg_second_min) { dmg[1] = parseInt(((statystyki.dmg_second_min + statystyki.dmg_second_max) / 2) * dmgRed[atacker - 1]) }

  if (statystyki.fire_dmg) { dmg[3] = Math.floor((Math.random() * (parseInt(statystyki.fire_dmg * 1.2) - parseInt(statystyki.fire_dmg * 0.8) + 1) * 1.2) + parseInt(statystyki.fire_dmg) * 0.8) * dmgRed[atacker - 1] }
  if (statystyki.ice_dmg) { dmg[4] = parseInt((statystyki.ice_dmg) * dmgRed[atacker - 1]) }
  if (statystyki.poison_dmg) { dmg[5] = parseInt((statystyki.poison_dmg) * dmgRed[atacker - 1])
  if(poisonDuration[atacker+1]!= 0) {dmg[5]+= dmg[5]*poison[atacker+1];poisonDuration--;} }
  if (statystyki.flash_dmg_max) { dmg[6] = Math.floor(Math.random() * (parseInt(statystyki.flash_dmg_max) - parseInt(statystyki.flash_dmg_min) + 1) + parseInt(statystyki.flash_dmg_min)) * dmgRed[atacker - 1] }
  return dmg;
}

function getDamage(dmg) {
  var dmgString = '';
  if (dmg[0]) { dmgString += "+" + dmg[0] + "  "; }
  if (dmg[1]) { dmgString += "+" + dmg[1] + "  "; }

  if (dmg[3]) { dmgString += '<span style="color:red">' + "+" + dmg[3] + '  </span>'; }
  if (dmg[4]) { dmgString += '<span style="color:blue">' + "+" + dmg[4] + '  </span>'; }
  if (dmg[5]) { dmgString += '<span style="color:#6fbc60">' + "+" + dmg[5] + '  </span>'; }
  if (dmg[6]) { dmgString += '<span style="color:#d1b655"> ' + "+" + dmg[6] + '  </span>'; } // !!!!!!!
  return dmgString;
}

var skillBase = { // Baza wszystkich umek
  trop: {
    trop_1: {
      minlvl: 25,
      requireUsed: 0,
      desc: "Dostępne od 25 lvla i 1 pkt umiejętności",
      skills: {
        1: {
          id: 111,
          name: "Lodowa strzała",
          desc: "Za pomocą magii zaklinasz strzałę żywiołem zimna, która spowalnia wroga oraz ma szansę go zamrozić.",
          valdesc: "Wzmacnia spowolnienie z broni zimna o  :a: %@Szansa na zamrożenie  :b: %@Atak zimnem +30% intelektu (efekt pasywny)@+1 pkt kombinacji za każde użycie tej umiejętności@Koszt many:  :d: ",
          values: {
            a: [87, 94, 101, 108, 115, 122, 129, 136, 143, 150], b: [10, 11, 11, 12, 12, 13, 13, 14, 14, 15], d: [24, 26, 28, 30, 34, 38, 42, 46, 50, 55]
          }
          ,
          weapon: ["dist",
            "frost"],
          isAttack: !0
        }
        ,
        2: {
          id: 112,
          name: "Płonąca strzała",
          desc: "Podpalasz strzałę i wysyłasz ją w stronę wroga, siejąc spustoszenie. Uderzenie ognia ignoruje obronę oraz dodatkowo przeciwnik będzie otrzymywał obrażenia od ognia przez kilka tur.",
          valdesc: "Dodatkowe obrażenia od ognia w wysokości  :a: % broni głównej@Zwiększenie obrażeń od ognia o 75% na 4 tury@Atak ogniem +30% intelektu (efekt pasywny)@+1 pkt kombinacji za każde użycie tej umiejętności@Koszt many:  :b: ",
          values: {
            a: [63, 66, 69, 72, 75, 78, 81, 84, 87, 90], b: [60, 70, 90, 110, 130, 150, 170, 190, 210, 230]
          }
          ,
          weapon: ["dist",
            "fire"],
          isAttack: !0
        }
        ,
        3: {
          id: 113,
          name: "Porażająca strzała",
          desc: "Za pomocą magii zaklinasz strzałę żywiołem błyskawic, który niszczy pancerz przeciwnika oraz poraża go na dwie tury.",
          valdesc: "Niszczy pancerz przeciwnika w wysokości  :a: % wartości posiadanego ataku fizycznego@Zadaje wrogiemu graczowi obrażenia od błyskawic równe  :b: % jego maksymalnego życia na 2 tury@Koszt many:  :c: @Atak błyskawicami +30% intelektu (efekt pasywny)@+1 pkt kombinacji za każde użycie tej umiejętności@Obrażenia od błyskawic przynajmniej  :e: % wartości maksymalnej",
          values: {
            a: [2, 2, 3, 3, 4, 4, 5, 5, 6, 6], b: [2, 2, 2, 2, 3, 3, 3, 3, 3, 4], c: [24, 25, 26, 27, 30, 34, 38, 42, 46, 50], e: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
          }
          ,
          weapon: ["dist",
            "light"],
          isAttack: !0
        }
        ,
        4: {
          id: 114,
          name: "Podwójne trafienie",
          desc: "Wystrzeliwujesz dwie strzały jednocześnie, jednak ich siła ciosu jest mniejsza.",
          valdesc: "Koszt energii:  :a: @Chwilowe osłabienie swojego ataku o  :b: %@Użycie dwóch strzał podczas jednego ataku@Czas odnowienia: 2 tury@Atak broni dystansowej +20% zręczności (efekt pasywny)",
          values: {
            a: [31, 32, 33, 34, 45, 36, 37, 38, 39, 40], b: [30, 28, 26, 24, 22, 20, 18, 16, 14, 12]
          }
          ,
          weapon: ["dist",
            "2arrows"],
          isAttack: !0
        }
        ,
        5: {
          id: 115,
          name: "Skupienie mocy",
          desc: "Ogromne skupienie woli pozwala ci na zwiększenie ilości energii i jej turowe przywracanie.",
          valdesc: "Energia + :a: @Energia + :b:  co turę@Mana + :c: @Mana + :d: *intelekt@Mana + :e:  co turę",
          values: {
            a: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50], b: [2, 3, 3, 4, 4, 5, 5, 6, 6, 7], c: [15, 30, 45, 55, 65, 75, 85, 90, 95, 100], d: [.05, .08, .1, .12, .14, .16, .18, .2, .22, .24], e: [2, 4, 6, 8, 9, 10, 11, 12, 13, 14]
          }
        }
        ,
        6: {
          id: 116,
          name: "Sprawność fizyczna",
          desc: "Zwiększona ilość punktów życia sprawia, że jesteś w stanie dłużej przyjmować ataki wroga.",
          valdesc: "Życie + :a:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
          }
          ,
          multipler: {
            a: "plvl"
          }
        }
      }
    }
    ,
    trop_2: {
      minlvl: 35,
      requireUsed: 10,
      desc: "Dostępne od 35 lvla i 10 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 121,
          name: "Wrodzona szybkość",
          desc: "Opanowanie techniki zwinności, umożliwia zadawanie większej ilości ciosów w walce.",
          valdesc: "SA + :a:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [0.002, 0.004, 0.005, 0.006, 0.0065, 0.007, 0.0073, 0.0076, 0.0078, 0.008]
          }
          ,
          multipler: {
            a: "plvl"
          }

        }
        ,
        2: {
          id: 122,
          name: "Podwójny dech",
          desc: "Pozwala na zwiększenie szybkości całej drużyny na kilka tur. Sam uzyskujesz tylko połowę mocy.",
          valdesc: "Aura: SA + :a: % na 8 tur@Koszt many:  :b: @Czas odnowienia: 8 tur",
          values: {
            a: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], b: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
          }
        }
        ,
        3: {
          id: 123,
          name: "Wzmocnienie absorpcji",
          desc: "Pozwala na zwiększenie absorpcji z posiadanych przedmiotów oraz odnowę jej zasobów przy każdym ataku na przeciwnika.",
          valdesc: "Przywrócenie  :c: % absorpcji po udanym ataku@Wzmocnienie absorpcji fizycznej o  :a: %@Wzmocnienie absorpcji magicznej o  :a: %",
          values: {
            a: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], c: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4]
          }
        }
        ,
        4: {
          id: 124,
          name: "Swobodny unik",
          desc: "Swoboda ruchów pozwala ci rozwinąć naturalną umiejętność unikania ciosów.",
          valdesc: "Zwiększenie o  :a:  punktów procentowych posiadanego uniku",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
        }
        ,
        5: {
          id: 125,
          name: "Kruszący grot",
          desc: "Technika udoskonalania grotów sprawia, że szansa na przebicie pancerza przeciwnika zostaje zwiększona. Dodatkowo posiadasz szansę na wykonanie ponownego ataku.",
          valdesc: "Przebicie pancerza + :a: %@ :b: % szans na 4-krotnie szybsze oddanie strzału",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], b: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
          }
          ,
          weapon: ["dist"]
        }
        ,
        6: {
          id: 126,
          name: "Grad strzał",
          desc: "Wysyłasz przed siebie grad 9 strzał, które trafiają losowych przeciwników.",
          valdesc: "Wielokrotny atak o sile  :a: % posiadanego ataku fizycznego i połowie tej wartości procentowej z pozostałego typu ataku@Koszt energii:  :b: @Atak broni dystansowej +10% zręczności (efekt pasywny)@Czas odnowienia: 2 tury",
          values: {
            a: [90, 92, 94, 96, 98, 100, 102, 104, 106, 108], b: [50, 53, 56, 59, 62, 65, 68, 71, 74, 77]
          }
          ,
          weapon: ["dist",
            "9arrows"],
          isAttack: !0
        }
      }
    }
    ,
    trop_3: {
      minlvl: 50,
      requireUsed: 25,
      desc: "Dostępne od 50 lvla i 25 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 131,
          name: "Strzała z niespodzianką",
          desc: "Używanie głównych umiejętności danego żywiołu wzmacnia efekt strzały z niespodzianką, która w zależności od zebranych punktów kombinacji osłabia atak przeciwnika.",
          valdesc: "Atak zwiększony o  :a: %@Zmniejsza zadawane przez przeciwnika obrażenia o 15% za każdy punkt kombinacji@Zużywa wszystkie punkty kombinacji oraz dodaje bonus za maksymalnie 3 pkt@Koszt many:  :c: ",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], c: [10, 13, 16, 19, 22, 25, 28, 31, 34, 37]
          }
        }
        ,
        2: {
          id: 132,
          name: "Emanująca strzała",
          desc: "Wystrzelenie pomiędzy przeciwników niewidzialnej strzały emanującej magią, która obniża atak wszystkich przeciwników na kilka tur.",
          valdesc: "Obniżenie ataku przeciwników o  :a: % na 5 tur@Koszt many:  :b: @Czas odnowienia: 5 tur",
          values: {
            a: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], b: [1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45]
          }
          ,
          multipler: {
            b: "plvl"
          }
          ,
          weapon: ["dist"],
          isAttack: !0
        }
        ,
        3: {
          id: 133,
          name: "Cios krytyczny",
          desc: "Rozwija umiejętność celowania w punkty witalne przeciwnika, przez co zwiększa szanse na zadanie krytycznych obrażeń.",
          valdesc: "Cios krytyczny + :a: %",
          values: {
            a: [1, 2, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7]
          }
        }
        ,
        4: {
          id: 134,
          name: "Kontrola absorpcji",
          desc: "Odpowiednia wiedza o absorpcji pozwala wzmocnić ją przed atakami dystansowymi oraz niszczeniem.",
          valdesc: "Absorpcja o  :a: % skuteczniejsza przeciw broni dystansowej@Redukcja niszczenia absorpcji:  :a: %",
          values: {
            a: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
          }
        }
        ,
        5: {
          id: 135,
          name: "Kojące ochłodzenie",
          desc: "Podmuch magicznej energii leczy ciebie lub twoich kompanów. Każde kolejne użycie jest 50% słabsze od poprzedniego.",
          valdesc: "Przywrócenie  :a: % życia podczas walki@Koszt many:  :b:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [23, 26, 29, 32, 35, 38, 41, 44, 47, 50], b: [1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45]
          }
          ,
          multipler: {
            b: "plvl"
          }
          ,
          isAttack: !0
        }
        ,
        6: {
          id: 136,
          name: "Odzyskiwanie bełtów",
          desc: "Przechodząc po polu bitwy, zbierasz bełty z ciał wrogów odzyskując część z nich. Działa tylko w walkach z NPC.",
          valdesc: "Odzyskiwanie  :a: % strzał po walce",
          values: {
            a: [14, 18, 22, 26, 30, 34, 38, 42, 46, 50]
          }
        }
      }
    }
    ,
    trop_4: {
      minlvl: 80,
      requireUsed: 55,
      desc: "Dostępne od 80 lvla i 55 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 141,
          name: "Krytyczne trafienie",
          desc: "Odpowiednie wyszkolenie w używaniu broni dystansowej daje możliwość zwiększenia obrażeń krytycznych.",
          valdesc: "Siła krytyka fizycznego + :a: %@Atak broni dystansowej + :b: % zręczności (efekt pasywny)",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [5, 5, 6, 6, 7, 8, 8, 9, 9, 10]
          }
          ,
          weapon: ["dist"]
        }
        ,
        2: {
          id: 142,
          name: "Mistrzostwo walk",
          desc: "Osiągnięcie mistrzostwa w walce pozwala na automatyczne wykonywanie czynności podczas szybkiej walki.",
          valdesc: "Automatyczne wykonanie  :a:  tur w walce",
          values: {
            a: [2, 3, 4, 5, 6, 7, 8, 10, 12, 14]
          }
        }
        ,
        3: {
          id: 143,
          name: "Strzelecka moc ognia",
          desc: "Tchnięcie magii w broń dystansową zwiększa obrażenia uderzenia krytycznego od ognia w zależności od intelektu.",
          valdesc: "Siła krytycznego uderzenia magii ognia + :a: %@Atak ogniem + :b: % intelektu (efekt pasywny)",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [10, 12, 12, 14, 14, 16, 16, 18, 18, 20]
          }
          ,
          weapon: ["fire"]
        }
        ,
        4: {
          id: 144,
          name: "Strzelecka moc błyskawic",
          desc: "Tchnięcie magii w broń dystansową zwiększa obrażenia uderzenia krytycznego od błyskawic w zależności od intelektu.",
          valdesc: "Siła krytycznego uderzenia magii błyskawic + :a: %@Atak błyskawicami + :b: % intelektu (efekt pasywny)",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [10, 12, 12, 14, 14, 16, 16, 18, 18, 20]
          }
          ,
          weapon: ["light"]
        }
        ,
        5: {
          id: 145,
          name: "Strzelecka moc zimna",
          desc: "Tchnięcie magii w broń dystansową zwiększa obrażenia uderzenia krytycznego od zimna w zależności od intelektu.",
          valdesc: "Siła krytycznego uderzenia magii zimna + :a: %@Atak zimnem + :b: % intelektu (efekt pasywny)",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [10, 12, 12, 14, 14, 16, 16, 18, 18, 20]
          }
          ,
          weapon: ["frost"]
        }
        ,
        6: {
          id: 146,
          name: "Wygodne stroje",
          desc: "Dzięki unikalnej zdolności otrzymujesz więcej szybkości ataku z bonusów w przedmiotach.",
          valdesc: "SA ubrań zwiększone o  :a: %",
          values: {
            a: [3, 6, 9, 12, 15, 16, 17, 18, 19, 20]
          }
        }
      }
    }
  }
  ,
  mag: {
    mag_1: {
      minlvl: 25,
      requireUsed: 0,
      desc: "Dostępne od 25 lvla i 1 pkt umiejętności",
      skills: {
        1: {
          id: 211,
          name: "Koncentracja many",
          desc: "Umiejętność pozyskiwania i cyklicznego przywracania magicznej energii, która pozwala rzucać czary.",
          valdesc: "Mana + :a: @Mana + :b: *intelekt@Mana + :c:  co turę",
          values: {
            a: [15, 30, 45, 55, 65, 75, 85, 90, 95, 100], b: [.05, .08, .1, .12, .14, .16, .18, .2, .22, .24], c: [2, 4, 6, 8, 9, 10, 11, 12, 13, 14]
          }
        }
        ,
        2: {
          id: 212,
          name: "Kula ognia",
          desc: "Atak magiczny z broni zaklętej żywiołem ognia, skupiony w niszczycielskiej kuli, zadającej obrażenia przy zetknięciu z celem.",
          valdesc: "Dodatkowe obrażenia od ognia o mocy  :a: % broni głównej@Zadaje wrogiemu graczowi obrażenia od ognia równe  :b: % jego maksymalnego życia na 3 tury@Atak ogniem +20% intelektu (efekt pasywny)@+1 pkt kombinacji za każde użycie tej umiejętności@Koszt many:  :c: ",
          values: {
            a: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], b: [3, 3, 3, 4, 4, 4, 5, 5, 5, 6], c: [30, 40, 50, 60, 70, 80, 90, 100, 120, 140]
          }
          ,
          weapon: ["fire"],
          isAttack: !0
        }
        ,
        3: {
          id: 213,
          name: "Lodowy pocisk",
          desc: "Wzmocnienie kryształu energii zimna w broni sprawia, że spowolnienie celu zostaje zwiększone, a lodowy pocisk ma szansę zamrozić przeciwnika.",
          valdesc: "Wzmacnia spowolnienie z broni zimna o  :a: %@Szansa na zamrożenie  :b: %@Koszt many:  :c: @+1 pkt kombinacji za każde użycie tej umiejętności@Atak zimnem +20% intelektu (efekt pasywny)",
          values: {
            a: [97, 104, 111, 118, 125, 132, 139, 146, 153, 160], b: [10, 11, 11, 12, 12, 13, 13, 14, 14, 15], c: [24, 26, 28, 30, 33, 37, 41, 47, 53, 60]
          }
          ,
          weapon: ["frost"],
          isAttack: !0
        }
        ,
        4: {
          id: 214,
          name: "Porażenie",
          desc: "Czar porażenia pozwala lepiej kontrolować obrażenia broni zaklętej żywiołem błyskawic oraz przy każdym użyciu powoduje u przeciwników osłabienie ich kolejnych ataków.",
          valdesc: "Osłabienie następnego ataku przeciwnika o  :a: % na 2 tury@Atak błyskawicami +20% intelektu (efekt pasywny)@+1 pkt kombinacji za każde użycie tej umiejętności@Obrażenia od błyskawic przynajmniej  :c: % wartości maksymalnej@Koszt many:  :d: ",
          values: {
            a: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14], c: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], d: [24, 26, 28, 30, 33, 37, 41, 47, 53, 60]
          }
          ,
          weapon: ["light"],
          isAttack: !0
        }
        ,
        5: {
          id: 215,
          name: "Leczenie ran",
          desc: "Umiejętność przywracania do zdrowia siebie lub kompanów z drużyny. Każda kolejna próba uleczenia życia jest o połowę słabsza od poprzedniej.",
          valdesc: "Przywrócenie  :a: % życia podczas walki@Koszt many:  :b:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [33, 36, 39, 42, 45, 48, 51, 54, 57, 60], b: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]
          }
          ,
          multipler: {
            b: "plvl"
          }
          ,
          isAttack: !0
        }
        ,
        6: {
          id: 216,
          name: "Sprawność fizyczna",
          desc: "Zwiększona ilość punktów życia sprawia, że jesteś w stanie dłużej przyjmować ataki wroga.",
          valdesc: "Życie + :a:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
          }
          ,
          multipler: {
            a: "plvl"
          }
        }
      }
    }
    ,
    mag_2: {
      minlvl: 35,
      requireUsed: 10,
      desc: "Dostępne od 35 lvla i 10 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 221,
          name: "Łańcuch piorunów",
          desc: "Seria błyskawic zależnych od ataku posiadanej broni, które uderzają przeciwnika, a następnie przeskakują w obrębie trzech sąsiednich wrogów.",
          valdesc: "Łańcuch piorunów o mocy  :a: % posiadanego ataku od błyskawic@Koszt many:  :b:  (wartość rośnie wraz z poziomem gracza)@Atak błyskawicami +10% intelektu (efekt pasywny)",
          values: {
            a: [62, 64, 66, 68, 70, 72, 74, 76, 78, 80], b: [.82, .89, .96, 1.03, 1.1, 1.17, 1.24, 1.31, 1.38, 1.45]
          }
          ,
          weapon: ["light"],
          multipler: {
            b: "plvl"
          }
          ,
          isAttack: !0
        }
        ,
        2: {
          id: 222,
          name: "Ściana ognia",
          desc: "Pozwala rzucić ścianę ognistego podmuchu w swoich wrogów. Ściana ognia zadaje obrażenia wszystkim stojącym w jednej linii.",
          valdesc: "Ściana ognia o mocy  :a: % posiadanego ataku od ognia@Wypala 2% maksymalnego życia graczy stojących w jednej linii na 3 tury@Koszt many:  :b:  (wartość rośnie wraz z poziomem gracza)@Atak ogniem +10% intelektu (efekt pasywny)",
          values: {
            a: [63, 66, 69, 72, 75, 78, 81, 84, 87, 90], b: [.72, .79, .86, .93, 1, 1.07, 1.14, 1.21, 1.28, 1.35]
          }
          ,
          weapon: ["fire"],
          multipler: {
            b: "plvl"
          }
          ,
          isAttack: !0
        }
        ,
        3: {
          id: 223,
          name: "Wrodzona szybkość",
          desc: "Opanowanie techniki zwinności, umożliwia zadawanie większej ilości ciosów w walce.",
          valdesc: "SA + :a: ",
          values: {
            a: [0.002, 0.004, 0.005, 0.006, 0.0065, 0.007, 0.0073, 0.0076, 0.0078, 0.008]
          }
          ,
          multipler: {
            a: "plvl"
          }
          ,
          multipler: {
            a: "plvl"
          }
        }
        ,
        4: {
          id: 224,
          name: "Zdrowa atmosfera",
          desc: "Skupienie many pod postacią życiodajnej energii leczącej wszystkich kompanów w drużynie. Każde kolejne użycie jest 25% słabsze od poprzedniego.",
          valdesc: "Przywrócenie wszystkim w drużynie  :a: % życia@Koszt many:  :b:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30], b: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2]
          }
          ,
          multipler: {
            b: "plvl"
          }
          ,
          isAttack: !0
        }
        ,
        5: {
          id: 225,
          name: "Szadź",
          desc: "Wykorzystując kryształ energii zimna potrafisz wysłać w stronę przeciwników mroźny podmuch i znacznie ich tym spowolnić.",
          valdesc: "Spowolnienie wrogów o  :a: % na  :b:  tur@Koszt many:  :c:  (wartość rośnie wraz z poziomem gracza)@Atak zimnem +10% intelektu (efekt pasywny)",
          values: {
            a: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], b: [6, 6, 6, 6, 6, 7, 7, 7, 7, 6], c: [.35, .4, .45, .5, .55, .6, .65, .7, .75, .8]
          }
          ,
          weapon: ["frost"],
          multipler: {
            c: "plvl"
          }
          ,
          isAttack: !0
        }
        ,
        6: {
          id: 226,
          name: "Specjalizacja kosturów",
          desc: "Specjalizacja w używaniu kosturów zwiększa obrażenia zadawane przy ich użyciu.",
          valdesc: "Atak błyskawicami + :a: % intelektu (efekt pasywny)@Atak zimnem + :a: % intelektu (efekt pasywny)@Atak ogniem + :a: % intelektu (efekt pasywny)@Cios krytyczny + :b: %",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4]
          }
          ,
          weapon: ["stave"]
        }
      }
    }
    ,
    mag_3: {
      minlvl: 50,
      requireUsed: 25,
      desc: "Dostępne od 50 lvla i 25 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 231,
          name: "Odnowa absorpcji",
          desc: "Odpowiednia wiedza o absorpcji pozwala wzmocnić ją przed niszczeniem oraz odnowić co turę jej zasoby przy każdym udanym ataku na wroga.",
          valdesc: "Przywrócenie  :a: % absorpcji po udanym ataku@Redukcja niszczenia absorpcji:  :b: %",
          values: {
            a: [1, 2, 3, 4, 5, 5.5, 6, 6.5, 7, 7.5], b: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
          }
        }
        ,
        2: {
          id: 232,
          name: "Chwila skupienia",
          desc: "Chwila silnego skupienia pozwalająca przywrócić część punktów many. Każdej kolejne użycie jest 10% słabsze od poprzedniego.",
          valdesc: "Przywraca  :a: % całości posiadanej many",
          values: {
            a: [44, 48, 52, 56, 60, 64, 68, 72, 76, 80]
          }
          ,
          isAttack: !0
        }
        ,
        3: {
          id: 233,
          name: "Magiczna osłona",
          desc: "Zaklinanie przedmiotów w połączeniu z kowalstwem pozwala powlekać przedmioty magiczną barierą odbijającą część ataków dystansowych.",
          valdesc: "Podczas obrony szansa na zablokowanie strzały/bełtu  :a: %@Obrażenia zadawane potworom zwiększone o  :b: %",
          values: {
            a: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14], b: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
          }
          ,
          weapon: ["shield"]
        }
        ,
        4: {
          id: 234,
          name: "Cios krytyczny",
          desc: "Rozwija umiejętność celowania w punkty witalne przeciwnika, przez co zwiększa szanse na zadanie krytycznych obrażeń.",
          valdesc: "Cios krytyczny + :a: %",
          values: {
            a: [1, 2, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7]
          }
        }
        ,
        5: {
          id: 235,
          name: "Fuzja żywiołów",
          desc: "Używanie głównych umiejętności żywiołów pozwala uwolnić moc pochodzącą z ich połączenia, aby zadać większe obrażenia przeciwnikowi.",
          valdesc: "Zwiększenie obrażeń o  :a: % za każdy pkt kombinacji@Zużywa wszystkie punkty kombinacji oraz dodaje bonus za maksymalnie 3 pkt@Koszt many:  :b: ",
          values: {
            a: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14], b: [19, 22, 25, 28, 31, 34, 37, 40, 43, 46]
          }
        }
        ,
        6: {
          id: 236,
          name: "Zwiększenie absorpcji",
          desc: "Wzmocnienie absorpcji z posiadanych przedmiotów, która pochłania obrażenia zadawane przez wrogów.",
          valdesc: "Wzmocnienie absorpcji magicznej o  :a: %@Wzmocnienie absorpcji fizycznej o  :a: %@Absorpcja o  :b: % skuteczniejsza przeciw broni dystansowej",
          values: {
            a: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], b: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
          }
        }
      }
    }
    ,
    mag_4: {
      minlvl: 80,
      requireUsed: 55,
      desc: "Dostępne od 80 lvla i 55 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 241,
          name: "Potęga błyskawic",
          desc: "Obrażenia krytyczne od ataków magicznych z wykorzystaniem broni z żywiołem błyskawic zostają zwiększone.",
          valdesc: "Siła krytycznego uderzenia magii błyskawic + :a: %@Atak błyskawicami + :b: % intelektu (efekt pasywny)",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30], b: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10]
          }
          ,
          weapon: ["light"]
        }
        ,
        2: {
          id: 242,
          name: "Potęga zimna",
          desc: "Obrażenia krytyczne od ataków magicznych z wykorzystaniem broni z żywiołem zimna zostają zwiększone.",
          valdesc: "Siła krytycznego uderzenia magii zimna + :a: %@Atak zimnem + :b: % intelektu (efekt pasywny)",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30], b: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10]
          }
          ,
          weapon: ["frost"]
        }
        ,
        3: {
          id: 243,
          name: "Tarcza odporności",
          desc: "Ochronna tarcza żywiołów pochłaniających wszystkie rodzaje magii przez kilka tur.",
          valdesc: "Pochłania  :a: % obrażeń od zimna na  :b:  tury@Pochłania  :a: % obrażeń od ognia na  :b:  tury@Pochłania  :a: % obrażeń od błyskawic na  :b:  tury@Koszt many:  :c:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [23, 26, 29, 32, 35, 38, 41, 44, 47, 50], b: [4, 4, 4, 5, 5, 5, 6, 6, 6, 7], c: [1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45]
          }
          ,
          multipler: {
            c: "plvl"
          }
          ,
          isAttack: !0
        }
        ,
        4: {
          id: 244,
          name: "Potęga ognia",
          desc: "Obrażenia krytyczne od ataków magicznych z wykorzystaniem broni z żywiołem ognia zostają zwiększone.",
          valdesc: "Siła krytycznego uderzenia magii ognia + :a: %@Atak ogniem + :b: % intelektu (efekt pasywny)",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30], b: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10]
          }
          ,
          weapon: ["fire"]
        }
        ,
        5: {
          id: 245,
          name: "Mistrzostwo walk",
          desc: "Osiągnięcie mistrzostwa w walce pozwala na automatyczne wykonywanie czynności podczas szybkiej walki.",
          valdesc: "Automatyczne wykonanie  :a:  tur w walce",
          values: {
            a: [2, 3, 4, 5, 6, 7, 8, 10, 12, 14]
          }
        }
        ,
        6: {
          id: 246,
          name: "Moc leczenia",
          desc: "Nauka o tworzeniu przedmiotów magicznych pozwala uzyskać większą moc leczenia turowego z przedmiotów posiadających takie bonusy.",
          valdesc: "Zwiększenie leczenia turowego z posiadanych przedmiotów o  :a: %",
          values: {
            a: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
          }
        }
      }
    }
  }
  ,
  wojownik: {
    wojownik_1: {
      minlvl: 25,
      requireUsed: 0,
      desc: "Dostępne od 25 lvla i 1 pkt umiejętności",
      skills: {
        1: {
          id: 311,
          name: "Niszczycielski cios",
          desc: "Skupiasz swoje uderzenie na pancerzu przeciwnika, starając się go uszkodzić. Pozwala to zwiększyć zadawane mu obrażenia.",
          valdesc: "Niszczy pancerz przeciwnika w wysokości  :a: % wartości posiadanego ataku fizycznego@Obniżenie uniku przeciwnika o  :b:  punktów procentowych@Koszt energii:  :c: @Atak broni dwuręcznej +20% siły (efekt pasywny)",
          values: {
            a: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14], b: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], c: [23, 24, 25, 26, 27, 28, 29, 30, 32, 34]
          }
          ,
          weapon: ["2h"],
          isAttack: !0
        }
        ,
        2: {
          id: 312,
          name: "Celny cios",
          desc: "Doświadczenie przy władaniu bronią jednoręczną zmniejsza szansę na unik przeciwnika.",
          valdesc: "Obniżenie uniku przeciwnika o  :a:  punktów procentowych",
          values: {
            a: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
          }
          ,
          weapon: ["1h"]
        }
        ,
        3: {
          id: 313,
          name: "Agresywny atak",
          desc: "Wyprowadzasz bardzo silny cios, który wystawia cię na ciosy przeciwników.",
          valdesc: "Dodatkowe obrażenia fizyczne o mocy  :a: % broni głównej@Zmniejszenie posiadanego pancerza - :b: %@Koszt energii:  :c: ",
          values: {
            a: [42, 44, 46, 48, 50, 52, 54, 56, 58, 60], b: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], c: [12, 12, 12, 13, 14, 15, 16, 18, 19, 20]
          }
          ,
          weapon: ["1h",
            "2h",
            "1.5h"],
          isAttack: !0
        }
        ,
        4: {
          id: 314,
          name: "Błyskawiczny atak",
          desc: "Gnasz przed siebie, wykonując przy tym znacznie szybszy atak.",
          valdesc: "Zwiększenie posiadanego SA o + :a: %@Dodatkowe obrażenia fizyczne o mocy  :b: % broni głównej@Koszt energii:  :c: @Atak broni jednoręcznej +20% siły (efekt pasywny)",
          values: {
            a: [13, 16, 19, 22, 25, 28, 31, 34, 37, 40], b: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28], c: [14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
          }
          ,
          weapon: ["1h",
            "2h",
            "1.5h"],
          isAttack: !0
        }
        ,
        5: {
          id: 315,
          name: "Wzmocnienie energii",
          desc: "Trening siły woli pozwala ci zwiększyć maksymalną ilość posiadanej energii i przywracać jej część po każdej turze.",
          valdesc: "Energia + :a: @Energia + :b:  co turę",
          values: {
            a: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60], b: [2, 3, 4, 4, 4, 5, 5, 6, 6, 7]
          }
        }
        ,
        6: {
          id: 316,
          name: "Sprawność fizyczna",
          desc: "Zwiększona ilość punktów życia sprawia, że jesteś w stanie dłużej przyjmować ataki wroga.",
          valdesc: "Życie + :a:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
          }
          ,
          multipler: {
            a: "plvl"
          }
        }
      }
    }
    ,
    wojownik_2: {
      minlvl: 35,
      requireUsed: 10,
      desc: "Dostępne od 35 lvla i 10 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 321,
          name: "Ogłuszający cios",
          desc: "Twój atak bronią dwuręczną jest tak silny, że wywołujesz wstrząs ziemi, który ogłusza przeciwnika. Dodatkowo zadane w walce ciosy krytyczne wzmacniają siłę tej umiejętności.",
          valdesc: "Szansa na ogłuszenie  :a: %@Dodatkowe obrażenia fizyczne o mocy  :b: % broni głównej@Koszt energii:  :c: @+1 pkt kombinacji za każdy zadany cios krytyczny (efekt pasywny)@Zadaje wrogiemu graczowi obrażenia równe 5% jego maksymalnego życia za każdy pkt kombinacji@Zużywa wszystkie punkty kombinacji oraz dodaje bonus za maksymalnie 2 pkt@Użycie umiejętności drugi raz z rzędu podnosi jej koszt o 50%@Atak broni dwuręcznej +10% siły (efekt pasywny)",
          values: {
            a: [30, 35, 35, 40, 40, 45, 45, 50, 50, 55], b: [22, 24, 26, 28, 30, 32, 34, 36, 38, 40], c: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65]
          }
          ,
          weapon: ["2h"],
          isAttack: !0
        }
        ,
        2: {
          id: 322,
          name: "Twarda głowa",
          desc: "Dzięki swojej wyjątkowej wytrwałości, czas ogłuszenia i zamrożenia zostaje zmniejszony.",
          valdesc: "Czas ogłuszenia, zamrożenia oraz potężnych ciosów zmniejszony o  :a: %@Czas spowolnienia z przedmiotów przeciwnika oraz magii zimna i trucizny zmniejszony o  :b: %",
          values: {
            a: [25, 27, 29, 31, 34, 37, 40, 43, 46, 50], b: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70]
          }
        }
        ,
        3: {
          id: 323,
          name: "Wytrącenie z równowagi",
          desc: "Zaskakujesz wroga podstępnym uderzeniem, przez co ciężej mu się skupić przy następnym ataku. Wytrącenia mogą się sumować i działają kolejno jedno po drugim.",
          valdesc: "Szansa  :a: % na wytrącenie z równowagi po krytyku",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
          }
        }
        ,
        4: {
          id: 324,
          name: "Szeroki zamach",
          desc: "Wykonujesz zamaszysty cios, który zadaje mniejsze obrażenia, jednak rani 3 przeciwników stojących na linii ataku.",
          valdesc: "Szansa  :a: % na atak do 3 przeciwników@Atak broni jednoręcznej +10% siły (efekt pasywny)",
          values: {
            a: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
          }
          ,
          weapon: ["1h",
            "2h",
            "1.5h"]
        }
        ,
        5: {
          id: 325,
          name: "Wrodzona szybkość",
          desc: "Opanowanie techniki zwinności, umożliwia zadawanie większej ilości ciosów w walce.",
          valdesc: "SA + :a:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [0.002, 0.004, 0.005, 0.006, 0.0065, 0.007, 0.0073, 0.0076, 0.0078, 0.008]
          }
          ,
          multipler: {
            a: "plvl"
          }
          ,
          multipler: {
            a: "plvl"
          }
        }
        ,
        6: {
          id: 326,
          name: "Wyzywający okrzyk",
          desc: "Wydajesz prowokujący okrzyk, który ściąga na ciebie uwagę przeciwnika na dwie najbliższe tury.",
          valdesc: "Obraza  :a:  przeciwników@Koszt energii:  :b: ",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], b: [6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
          }
          ,
          isAttack: !0
        }
      }
    }
    ,
    wojownik_3: {
      minlvl: 50,
      requireUsed: 25,
      desc: "Dostępne od 50 lvla i 25 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 331,
          name: "Taktyczne uderzenie",
          desc: "Łączysz defensywną taktykę z atakiem i potrafisz uwolnić wcześniej zagospodarowaną moc, aby dotkliwiej ranić przeciwnika.",
          valdesc: "Dodatkowe obrażenia fizyczne o mocy  :a: % broni głównej@Zadaje wrogiemu graczowi obrażenia równe 5% jego maksymalnego życia za każdy pkt kombinacji@Zużywa wszystkie punkty kombinacji oraz dodaje bonus za maksymalnie 3 pkt@Koszt energii:  :b: ",
          values: {
            a: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30], b: [12, 12, 13, 14, 15, 16, 17, 18, 19, 20]
          }
          ,
          isAttack: !0
        }
        ,
        2: {
          id: 332,
          name: "Cios krytyczny",
          desc: "Rozwija umiejętność celowania w punkty witalne przeciwnika, przez co zwiększa szanse na zadanie krytycznych obrażeń.",
          valdesc: "Cios krytyczny + :a: %",
          values: {
            a: [1, 2, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7]
          }
        }
        ,
        3: {
          id: 333,
          name: "Adaptacja",
          desc: "Wielokrotne zwalczanie trucizn i głębokich ran w swoim organizmie, pozwala uodpornić się na ich rodzaj obrażeń. ",
          valdesc: "Odporność na truciznę + :a: %@Obrażenia od głębokich ran zmniejszone o  :a: %",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
          }
        }
        ,
        4: {
          id: 334,
          name: "Żądza krwi",
          desc: "Rzucasz się w wir walki, przez co z każdym uderzeniem krytycznym odzyskujesz część energii.",
          valdesc: "Odzyskanie  :a: % energii po krytyku",
          values: {
            a: [6, 8, 10, 12, 14, 15, 16, 17, 18, 19]
          }
          ,
          weapon: ["1h",
            "2h",
            "1.5h"]
        }
        ,
        5: {
          id: 335,
          name: "Osłona tarczą",
          desc: "Przyjmujesz defensywną postawę i zasłaniasz się tarczą. Pozwala to uniknąć wszelkich obrażeń.",
          valdesc: "Niewrażliwość na otrzymywane obrażenia na 1 turę@+1 pkt kombinacji za każde użycie tej umiejętności@Koszt energii:  :a: @Czas odnowienia: 2 tury",
          values: {
            a: [28, 26, 24, 22, 20, 18, 16, 14, 12, 10]
          }
          ,
          weapon: ["shield"],
          isAttack: !0
        }
        ,
        6: {
          id: 336,
          name: "Mocarna ochrona",
          desc: "Wyostrzone zmysły pozwalają ci na zwiększenie szansy na blok tarczą.",
          valdesc: "Blok z ekwipunku zwiększony o + :a: %@Podczas obrony szansa na zablokowanie strzały/bełtu  :b: %",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], b: [12, 14, 16, 18, 20, 21, 22, 23, 24, 25]
          }
          ,
          weapon: ["shield"]
        }
      }
    }
    ,
    wojownik_4: {
      minlvl: 80,
      requireUsed: 55,
      desc: "Dostępne od 80 lvla i 55 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 341,
          name: "Kontratak",
          desc: "Taktyczny zwrot po ciosie krytycznym przeciwnika, który pozwala ci włamać się wgłąb jego obrony.",
          valdesc: "+ :a: % szans na kontrę po krytyku",
          values: {
            a: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
          }
          ,
          weapon: ["2h"]
        }
        ,
        2: {
          id: 342,
          name: "Wytrzymałość",
          desc: "Dzięki ciężkiemu treningowi zwiększasz swoją ilość punktów życia, w zależności od ilości siły.",
          valdesc: "+ :a:  życia za 1 pkt siły",
          values: {
            a: [1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3]
          }
        }
        ,
        3: {
          id: 343,
          name: "Okaleczenie",
          desc: "Umiejętność odczytywania ruchów przeciwnika, pozwala ci uderzać jeszcze bardziej dotkliwie. Działa jeżeli posiadasz przedmiot z bonusem głęboka rana.",
          valdesc: "+ :a: % szans na głęboką ranę@Zwiększa o  :b: % obrażenia od głębokiej rany",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [52, 54, 56, 58, 60, 62, 64, 66, 68, 70]
          }
        }
        ,
        4: {
          id: 344,
          name: "Mistrzostwo walk",
          desc: "Osiągnięcie mistrzostwa w walce pozwala na automatyczne wykonywanie czynności podczas szybkiej walki.",
          valdesc: "Automatyczne wykonanie  :a:  tur w walce",
          values: {
            a: [2]
          }
        }
        ,
        5: {
          id: 345,
          name: "Krwawa szarża",
          desc: "Pędzisz przed siebie wykonując ryzykowny atak, który odbiera ci 10% aktualnej ilości życia, jednak pozwala przez jakiś czas zwiększyć szybkość.",
          valdesc: "Zwiększenie posiadanego SA o +20% na  :b:  tur@Koszt energii:  :c: @Strata 10% swojego życia",
          values: {
            b: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15], c: [21]
          }
          ,
          isAttack: !0
        }
        ,
        6: {
          id: 346,
          name: "Potężne uderzenie",
          desc: "Wzmacnia krytyczne uderzenie bronią białą.",
          valdesc: "Siła krytyka fizycznego + :a: %@Atak broni jednoręcznej + :b: % siły (efekt pasywny)@Atak broni dwuręcznej + :b: % siły (efekt pasywny)",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30], b: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10]
          }
          ,
          weapon: ["1h",
            "2h",
            "1.5h"]
        }
      }
    }
  }
  ,
  tancerz: {
    tancerz_1: {
      minlvl: 25,
      requireUsed: 0,
      desc: "Dostępne od 25 lvla i 1 pkt umiejętności",
      skills: {
        1: {
          id: 411,
          name: "Trujące pchnięcie",
          desc: "Wiedza o różnych rodzajach trucizny, pozwala zwiększyć obrażenia zadawane przez broń.",
          valdesc: "Bonus  :a: % obrażeń od trucizny do posiadanej broni@Zwiększenie posiadanego SA o + :b: %@Koszt energii:  :c: ",
          values: {
            a: [83, 86, 89, 92, 95, 98, 101, 104, 107, 110], b: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], c: [30, 30, 32, 32, 34, 34, 36, 36, 38, 38]
          }
          ,
          weapon: ["poison"],
          isAttack: !0
        }
        ,
        2: {
          id: 412,
          name: "Przenikliwa rana",
          desc: "Omijasz obronę przeciwnika uderzając pod jego pancerz. Daje to szansę na otwarcie głębokiej rany i zwiększa jej obrażenia jeżeli posiadasz przedmiot z tym bonusem.",
          valdesc: "Zwiększa o  :a: % obrażenia od głębokiej rany w broni pomocniczej@+ :b: % szans na głęboką ranę",
          values: {
            a: [210, 220, 230, 240, 250, 260, 270, 280, 290, 300], b: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4]
          }
          ,
          weapon: ["aux",
            "wound"]
        }
        ,
        3: {
          id: 413,
          name: "Potrójne uderzenie",
          desc: "Ogromna zręczność w używaniu broni głównej, pozwala uderzyć nią dwa razy podczas jednej tury. Bonusy nie są brane pod uwagę.",
          valdesc: " :a: % szans na 3 atak@Atak broni pomocniczej +20% siły (efekt pasywny)",
          values: {
            a: [4, 6, 8, 10, 12, 14, 16, 18, 19, 20]
          }
          ,
          weapon: ["aux"]
        }
        ,
        4: {
          id: 414,
          name: "Błyskawiczny cios",
          desc: "Wykorzystując posiadaną zręczność możesz zadać normalny atak jeszcze szybciej niż zazwyczaj. Dodatkowo wykonywane uniki pozwalają zbierać punkty kombinacji, dzięki którym wzmacniasz siłę tej umiejętności.",
          valdesc: "Zwiększenie posiadanego SA o + :a: %@Koszt energii:  :b: @Atak broni jednoręcznej +20% siły (efekt pasywny)@+1 pkt kombinacji za każdy zadany cios krytyczny (efekt pasywny)@Zwiększenie obrażeń o 5% za każdy pkt kombinacji@Zużywa wszystkie punkty kombinacji oraz dodaje bonus za maksymalnie 3 pkt",
          values: {
            a: [22, 24, 26, 28, 30, 32, 34, 36, 38, 40], b: [18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
          }
          ,
          weapon: ["1h"],
          isAttack: !0
        }
        ,
        5: {
          id: 415,
          name: "Poprawa kondycji",
          desc: "Dzięki wymagającemu treningowi jesteś w stanie zwiększyć swoją bazową ilość energii i co turę przywracać jej cześć.",
          valdesc: "Energia + :a: @Energia + :b:  co turę",
          values: {
            a: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60], b: [2, 3, 4, 4, 4, 5, 5, 6, 6, 7]
          }
        }
        ,
        6: {
          id: 416,
          name: "Sprawność fizyczna",
          desc: "Zwiększona ilość punktów życia sprawia, że jesteś w stanie dłużej przyjmować ataki wroga.",
          valdesc: "Życie + :a:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
          }
          ,
          multipler: {
            a: "plvl"
          }
        }
      }
    }
    ,
    tancerz_2: {
      minlvl: 35,
      requireUsed: 10,
      desc: "Dostępne od 35 lvla i 10 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 421,
          name: "Wrodzona szybkość",
          desc: "Opanowanie techniki zwinności, umożliwia zadawanie większej ilości ciosów w walce.",
          valdesc: "SA + :a: ",
          values: {
            a: [0.002, 0.004, 0.005, 0.006, 0.0065, 0.007, 0.0073, 0.0076, 0.0078, 0.008]
          }
          ,
          multipler: {
            a: "plvl"
          }
        }
        ,
        2: {
          id: 422,
          name: "Płynność ruchów",
          desc: "Twoje ruchy mimo spowolnienia są płynne niczym kroki taneczne.",
          valdesc: "Czas spowolnienia z przedmiotów przeciwnika oraz magii zimna i trucizny zmniejszony o  :a: %@Czas ogłuszenia, zamrożenia oraz potężnych ciosów zmniejszony o  :b: %@Atak broni pomocniczej +20% siły (efekt pasywny)",
          values: {
            a: [35, 40, 45, 50, 55, 60, 65, 70, 75, 80], b: [13, 16, 19, 22, 25, 28, 31, 34, 37, 40]
          }
        }
        ,
        3: {
          id: 423,
          name: "Wirujące ostrze",
          desc: "Rozpoczynasz wirujący taniec ostrzy, podczas którego wykonujesz serię ataków raniących do 4 przeciwników w linii.",
          valdesc: "Atak o sile  :a: % obrażeń na 2 pozostałych przeciwników@Atak broni jednoręcznej +10% siły (efekt pasywny)@Koszt energii:  :c: ",
          values: {
            a: [64, 68, 72, 76, 80, 84, 88, 92, 96, 100], c: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
          }
          ,
          weapon: ["1h"],
          isAttack: !0
        }
        ,
        4: {
          id: 424,
          name: "Wrodzony unik",
          desc: "Zwinne ciało i wrodzone umiejętności pozwalają ci unikać ataków przeciwnika z jeszcze większą skutecznością.",
          valdesc: "Zwiększenie o  :a:  punktów procentowych posiadanego uniku",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
        }
        ,
        5: {
          id: 425,
          name: "Rozszarpanie ran",
          desc: "Trafienie dokładne w miejsce poprzedniego ataku przedłuża działanie głębokiej rany o kilka tur. Umiejętność dodatkowo pozwala zranić przeciwnika, gdy ten jeszcze nie posiada głębokiej rany od broni pomocniczej.",
          valdesc: "Przedłużenie głębokiej rany o  :a:  tur@Koszt energii:  :b: @Rani głęboką raną pomocniczą, gdy ten nie był wcześniej zraniony",
          values: {
            a: [2, 3, 3, 4, 4, 5, 5, 6, 6, 7], b: [10, 20, 15, 25, 20, 30, 25, 35, 30, 40]
          }
          ,
          isAttack: !0
        }
        ,
        6: {
          id: 426,
          name: "Rozpraszający okrzyk",
          desc: "Podczas ataku wydajesz z siebie przerażający krzyk, który obniża szansę przeciwnika na cios krytyczny i przebicie.",
          valdesc: "Obniżenie krytyka o  :a: % i przebicia o  :b: %@Osłabienie następnego ataku przeciwnika o  :c:  na 2 tury%@Zwiększenie posiadanego SA o +10%@Koszt energii:  :d: ",
          values: {
            a: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], b: [22, 24, 26, 28, 30, 32, 34, 36, 38, 40], c: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21], d: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
          }
          ,
          weapon: ["1h"],
          isAttack: !0
        }
      }
    }
    ,
    tancerz_3: {
      minlvl: 50,
      requireUsed: 25,
      desc: "Dostępne od 50 lvla i 25 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 431,
          name: "Mistrzostwo mieczy",
          desc: "Dzięki wypracowanej precyzji w używaniu oręża, jesteś w stanie sparować nawet najpotężniejsze ataki od broni białej oraz wykonać skuteczną kontrę.",
          valdesc: "+ :a: % szans na sparowanie ataku@ :b: % szans na kontrę po parowaniu",
          values: {
            a: [6, 6, 7, 7, 8, 8, 9, 9, 10, 10], b: [30, 35, 40, 45, 50, 55, 65, 70, 75, 80]
          }
          ,
          weapon: ["aux"]
        }
        ,
        2: {
          id: 432,
          name: "Podstępne uderzenie",
          desc: "Podstępne uderzenie dodatkowo zabierające część maksymalnego zdrowia przeciwnika.",
          valdesc: "Zadaje wrogiemu graczowi obrażenia równe 12% jego maksymalnego życia@Koszt energii:  :b: @Czas odnowienia: 3 tury",
          values: {
            b: [40, 38, 36, 34, 32, 30, 28, 26, 24, 22]
          }
          ,
          weapon: ["wound"]
        }
        ,
        3: {
          id: 433,
          name: "Cios krytyczny",
          desc: "Rozwija umiejętność celowania w punkty witalne przeciwnika, przez co zwiększa szanse na zadanie krytycznych obrażeń.",
          valdesc: "Cios krytyczny + :a: %",
          values: {
            a: [1, 2, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7]
          }
        }
        ,
        4: {
          id: 434,
          name: "Precyzyjny cios",
          desc: "Skupiasz się na zadaniu jednego, precyzyjnego cięcia, przez co szansa na unik przeciwnika zostaje zmniejszona.",
          valdesc: "Obniżenie uniku przeciwnika o  :a:  punktów procentowych",
          values: {
            a: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
          }
          ,
          weapon: ["1h"]
        }
        ,
        5: {
          id: 435,
          name: "Zew krwi",
          desc: "Widząc skuteczność swoich krytycznych ataków, odnawiasz część energii.",
          valdesc: "Odzyskanie  :a: % energii po krytyku",
          values: {
            a: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
          }
          ,
          weapon: ["1h"]
        }
        ,
        6: {
          id: 436,
          name: "Jadowity podmuch",
          desc: "Wykorzystując wiedzę o truciznach potrafisz rozsiać na polu bitwy zatruty obłok powodujący osłabienie umiejętności leczących przeciwnika.",
          valdesc: "Osłabia o  :a: % leczenie z aktywnych umiejętności przeciwnika na 5 tur@Koszt energii:  :b: ",
          values: {
            a: [18, 21, 24, 27, 30, 33, 36, 39, 42, 45], b: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60]
          }
          ,
          weapon: ["1h"],
          isAttack: !0
        }
      }
    }
    ,
    tancerz_4: {
      minlvl: 80,
      requireUsed: 55,
      desc: "Dostępne od 80 lvla i 55 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 441,
          name: "Krytyczne cięcie",
          desc: "Broń pomocnicza staje się przedłużeniem twojej dłoni, dzięki czemu zwiększa się szansa na krytyczne trafienie przy jej użyciu.",
          valdesc: "Cios krytyczny pomocniczy + :a: %@Atak broni pomocniczej + :b: % siły (efekt pasywny)",
          values: {
            a: [1, 2, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7], b: [10, 12, 12, 14, 14, 16, 16, 18, 18, 20]
          }
          ,
          weapon: ["aux"]
        }
        ,
        2: {
          id: 442,
          name: "Zdradzieckie cięcie",
          desc: "Wykorzystywanie dwóch broni naraz wykształciło w tobie oburęczność, przez co obrażenia krytyczne z wykorzystaniem broni pomocniczej zostają zwiększone.",
          valdesc: "Siła krytyka broni pomocniczej + :a: %",
          values: {
            a: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
          }
          ,
          weapon: ["aux"]
        }
        ,
        3: {
          id: 443,
          name: "Mistrzostwo walk",
          desc: "Osiągnięcie mistrzostwa w walce pozwala na automatyczne wykonywanie czynności podczas szybkiej walki.",
          valdesc: "Automatyczne wykonanie  :a:  tur w walce",
          values: {
            a: [2, 3, 4, 5, 6, 7, 8, 10, 12, 14]
          }
        }
        ,
        4: {
          id: 444,
          name: "Zadziorny atak",
          desc: "Wykonujesz agresywny atak, który niszczy pancerz przeciwnika, jednak wystawia cię na ciosy przeciwników.",
          valdesc: "Niszczy pancerz przeciwnika w wysokości  :a: % wartości posiadanego ataku fizycznego@Zwiększenie posiadanego SA o + :b: %@Zmniejszenie posiadanego pancerza - :c: %@Koszt energii:  :c: ",
          values: {
            a: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5], b: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], c: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
          }
          ,
          weapon: ["1h"],
          isAttack: !0
        }
        ,
        5: {
          id: 445,
          name: "Zabójcze uderzenie",
          desc: "Morderczy instynkt pozwala ci na zwiększenie obrażeń krytycznych przy użyciu broni białej.",
          valdesc: "Siła krytyka fizycznego + :a: %@Atak broni jednoręcznej + :b: % siły (efekt pasywny)",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10]
          }
          ,
          weapon: ["1h"]
        }
        ,
        6: {
          id: 446,
          name: "Adrenalina",
          desc: "W przypływie obaw o własne życie, szybkość twojego ataku drastycznie wzrasta.",
          valdesc: "Przyspieszenie postaci o  :a: %, jeśli życie spadnie poniżej 15%",
          values: {
            a: [23, 26, 29, 32, 35, 38, 41, 44, 47, 50]
          }
        }
      }
    }
  }
  ,
  lowca: {
    lowca_1: {
      minlvl: 25,
      requireUsed: 0,
      desc: "Dostępne od 25 lvla i 1 pkt umiejętności",
      skills: {
        1: {
          id: 511,
          name: "Wzmocnienie wigoru",
          desc: "Sprawność w działaniu pozwala ci zwiększyć ilość energii i przywracać co turę jej część.",
          valdesc: "Energia + :a: @Energia + :b:  co turę",
          values: {
            a: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60], b: [2, 3, 3, 4, 4, 5, 5, 6, 6, 7]
          }
        }
        ,
        2: {
          id: 512,
          name: "Podwójny strzał",
          desc: "Wystrzeliwujesz dwie strzały, jednak ich siła ciosu jest mniejsza.",
          valdesc: "Koszt energii:  :a: @Chwilowe osłabienie swojego ataku o  :b: %@Użycie dwóch strzał podczas jednego ataku@Czas odnowienia: 2 tury@Atak broni dystansowej +20% zręczności (efekt pasywny)",
          values: {
            a: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40], b: [30, 28, 26, 24, 22, 20, 18, 16, 14, 12]
          }
          ,
          weapon: ["dist",
            "2arrows"],
          isAttack: !0
        }
        ,
        3: {
          id: 513,
          name: "Diamentowa strzała",
          desc: "Używając łuków z samym atakiem fizycznym stosujesz strzały z bardzo twardym grotem, które niszczą pancerz przeciwnika. Dodatkowo możesz wytrącić przeciwnika z równowagi. Wytrącenia mogą się sumować i działają kolejno jedno po drugim.",
          valdesc: "Niszczy pancerz przeciwnika w wysokości  :a: % wartości posiadanego ataku fizycznego@Koszt energii:  :b: @Szansa  :c: % na wytrącenie z równowagi po krytyku@Atak broni dystansowej + :d: % zręczności (efekt pasywny)",
          values: {
            a: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5], b: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], c: [23, 26, 29, 32, 35, 38, 41, 44, 47, 50], d: [22, 24, 26, 28, 30, 32, 34, 36, 38, 40]
          }
          ,
          weapon: ["dist",
            "fiz"],
          isAttack: !0
        }
        ,
        4: {
          id: 514,
          name: "Zatruta strzała",
          desc: "Nakładasz na strzały truciznę, powodując tym samym zwiększenie obrażeń. Działa tylko jako bonus do posiadanych już obrażeń od trucizny (zwiększa obrażenia na 5 tur).",
          valdesc: "Bonus  :a: % obrażeń od trucizny do posiadanej broni@Koszt energii: 30",
          values: {
            a: [89, 95, 101, 107, 113, 119, 125, 131, 137, 143]
          }
          ,
          weapon: ["dist",
            "poison"],
          isAttack: !0
        }
        ,
        5: {
          id: 515,
          name: "Rozdzierająca strzała",
          desc: "Strzały, które wystrzeliwujesz są kierowane w przerwy w zbroi przeciwnika. Zwiększa to posiadaną szansę na głęboką ranę i wzmacnia jej działanie.",
          valdesc: "Zwiększa o  :a: % obrażenia od głębokiej rany@+ :b: % szans na głęboką ranę",
          values: {
            a: [87, 89, 91, 93, 95, 97, 99, 101, 103, 105], b: [1, 2, 3, 4, 5, 5, 6, 6, 7, 7]
          }
          ,
          weapon: ["dist",
            "wound"]
        }
        ,
        6: {
          id: 516,
          name: "Sprawność fizyczna",
          desc: "Zwiększona ilość punktów życia sprawia, że jesteś w stanie dłużej przyjmować ataki wroga.",
          valdesc: "Życie + :a:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
          }
          ,
          multipler: {
            a: "plvl"
          }
        }
      }
    }
    ,
    lowca_2: {
      minlvl: 35,
      requireUsed: 10,
      desc: "Dostępne od 35 lvla i 10 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 521,
          name: "Wrodzona szybkość",
          desc: "Opanowanie techniki zwinności, umożliwia zadawanie większej ilości ciosów w walce.",
          valdesc: "SA + :a: ",
          values: {
            a: [0.002, 0.004, 0.005, 0.006, 0.0065, 0.007, 0.0073, 0.0076, 0.0078, 0.008]
          }
          ,
          multipler: {
            a: "plvl"
          }
        }
        ,
        2: {
          id: 522,
          name: "Przebijanie pancerza",
          desc: "Groty twoich strzał stają się ostrzejsze niż kiedykolwiek. Pozwala to na przebicie pancerza z jeszcze większą efektywnością oraz oddawanie szybszych strzał co jakiś czas.",
          valdesc: "Przebicie pancerza + :a: %@ :b: % szans na 4-krotnie szybsze oddanie strzału",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], b: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
          }
          ,
          weapon: ["dist"]
        }
        ,
        3: {
          id: 523,
          name: "Deszcz strzał",
          desc: "Wykonujesz ostrzał w stronę przeciwników używając do tego 9 strzał.",
          valdesc: "Wielokrotny atak o sile  :a: % posiadanego ataku fizycznego i połowie tej wartości procentowej z pozostałego typu ataku@Koszt energii:  :b: @Atak broni dystansowej +10% zręczności (efekt pasywny)@Czas odnowienia: 2 tury",
          values: {
            a: [90, 92, 94, 96, 98, 100, 102, 104, 106, 108], b: [50, 53, 56, 59, 62, 65, 68, 71, 74, 77]
          }
          ,
          weapon: ["dist",
            "9arrows"],
          isAttack: !0
        }
        ,
        4: {
          id: 524,
          name: "Wyswobodzenie",
          desc: "Doświadczenie w unikaniu ciosów pozwala ci instynktownie zmniejszyć poziom spowolnienia oraz ogłuszeń, zamrożeń i innych potężnych ciosów.",
          valdesc: "Czas spowolnienia z przedmiotów przeciwnika oraz magii zimna i trucizny zmniejszony o  :a: %@Czas ogłuszenia, zamrożenia oraz potężnych ciosów zmniejszony o  :b: %",
          values: {
            a: [30, 45, 50, 55, 60, 65, 70, 75, 80, 85], b: [13, 16, 19, 22, 25, 28, 31, 34, 37, 40]
          }
        }
        ,
        5: {
          id: 525,
          name: "Naturalny unik",
          desc: "Wyostrzone zmysły pozwalają ci zwiększyć posiadany unik.",
          valdesc: "Zwiększenie o  :a:  punktów procentowych posiadanego uniku",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
        }
        ,
        6: {
          id: 526,
          name: "Piętno bestii",
          desc: "Tworzysz na skórze przeciwnika znamię, które powoduje, że przez kilka tur przyjmuje on zwiększone obrażenia.",
          valdesc: "Zwiększenie o  :a: % przyjmowanych obrażeń na 4 tury@Koszt energii:  :c: @Czas odnowienia: 4 tury",
          values: {
            a: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25], c: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58]
          }
          ,
          isAttack: !0
        }
      }
    }
    ,
    lowca_3: {
      minlvl: 50,
      requireUsed: 25,
      desc: "Dostępne od 50 lvla i 25 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 531,
          name: "Zwinność",
          desc: "Twoje unikalne umiejętności pozwalają ci osiągnąć większa szybkość ataków z bonusów posiadanych przedmiotów.",
          valdesc: "SA ubrań zwiększone o  :a: %",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
          }
        }
        ,
        2: {
          id: 532,
          name: "Bandażowanie ran",
          desc: "Jesteś w stanie instynktownie leczyć drobne rany. Każde kolejne użycie jest o 50% mniej skuteczne.",
          valdesc: "Uleczenie  :a: % wartości całego życia@Koszt energii:  :b: ",
          values: {
            a: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30], b: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58]
          }
          ,
          isAttack: !0
        }
        ,
        3: {
          id: 533,
          name: "Błyskawiczny strzał",
          desc: "Nie zważając na włożony w to wysiłek, natychmiast wystrzeliwujesz strzałę w swoich wrogów. Dodatkowo, każde wykonane przebicie wzmacnia tą umiejętność o przywracanie energii.",
          valdesc: "Czas ataku - :a: % SA@+1 pkt kombinacji za każdy atak z przebiciem (efekt pasywny)@Przywraca 10% energii za każdy pkt kombinacji oraz dodaje bonus za maksymalnie 3 pkt@Czas odnowienia: 5 tur",
          values: {
            a: [13, 16, 19, 22, 25, 28, 31, 34, 37, 40]
          }
          ,
          weapon: ["dist"],
          isAttack: !0
        }
        ,
        4: {
          id: 534,
          name: "Odzyskiwanie strzał",
          desc: "Po zakończonej walce z NPC, wyciągasz część strzał z pokonanych przeciwników.",
          valdesc: "Odzyskiwanie  :a: % strzał po walce",
          values: {
            a: [14, 18, 22, 26, 30, 34, 38, 42, 46, 50]
          }
        }
        ,
        5: {
          id: 535,
          name: "Cios krytyczny",
          desc: "Rozwija umiejętność celowania w punkty witalne przeciwnika, przez co zwiększa szanse na zadanie krytycznych obrażeń.",
          valdesc: "Cios krytyczny + :a: %",
          values: {
            a: [1, 2, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7]
          }
        }
        ,
        6: {
          id: 536,
          name: "Strzał w stopę",
          desc: "Kierujesz ostrzał w stopę nadbiegającego przeciwnika przez co znacznie go spowalniasz.",
          valdesc: "Strzała spowalnia przeciwnika o  :a: % po uprzednio wykonanym przez niego kroku@Chwilowe osłabienie swojego ataku o  :b: %@Szansa  :c: % na zatrzymanie przeciwnika po uprzednio wykonanym przez niego kroku@Koszt energii:  :d: ",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [5], c: [50], d: [30]
          }
          ,
          weapon: ["dist"],
          isAttack: !0
        }
      }
    }
    ,
    lowca_4: {
      minlvl: 80,
      requireUsed: 55,
      desc: "Dostępne od 80 lvla i 55 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 541,
          name: "Rozpraszająca strzała",
          desc: "Wyprowadzasz zaskakujący strzał, który obniża szanse na cios krytyczny i przebicie przeciwnika.",
          valdesc: "Obniżenie krytyka o  :a: % i przebicia o  :b: %@Koszt energii:  :c: ",
          values: {
            a: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15], b: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30], c: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
          }
          ,
          weapon: ["dist"],
          isAttack: !0
        }
        ,
        2: {
          id: 542,
          name: "Bolesne uderzenie",
          desc: "Kiedy strzała trafi w czuły punkt przeciwnika powodując uderzenie krytyczne, następny cios przeciwnika będzie wolniejszy.",
          valdesc: "Spowolnienie przeciwnika o  :a: % po krytyku",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
          ,
          weapon: ["dist"]
        }
        ,
        3: {
          id: 543,
          name: "Mistrzostwo walk",
          desc: "Osiągnięcie mistrzostwa w walce pozwala na automatyczne wykonywanie czynności podczas szybkiej walki.",
          valdesc: "Automatyczne wykonanie  :a:  tur w walce",
          values: {
            a: [2, 3, 4, 5, 6, 7, 8, 10, 12, 14]
          }
        }
        ,
        4: {
          id: 544,
          name: "Celny strzał",
          desc: "Dzięki skupieniu się na celu, zwiększasz szanse na zadanie ciosu krytycznego.",
          valdesc: "Cios krytyczny + :a: %@Koszt energii:  :b: ",
          values: {
            a: [7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30], b: [5, 6, 7, 9, 11, 13, 16, 20, 25, 30]
          }
          ,
          weapon: ["dist"],
          isAttack: !0
        }
        ,
        5: {
          id: 545,
          name: "Oczyszczenie",
          desc: "Potrafisz skupić swoją energię, a następnie uwolnić ją w formie fali, która oczyszcza sprzymierzeńców ze spowolnień i ogłuszeń.",
          valdesc: "Usunięcie spowolnień ze swojej drużyny@Usunięcie ogłuszeń ze swojej drużyny@Koszt energii:  :a: ",
          values: {
            a: [95, 90, 85, 80, 75, 70, 65, 60, 55, 50]
          }
          ,
          isAttack: !0
        }
        ,
        6: {
          id: 546,
          name: "Krytyczny strzał",
          desc: "Częste celowanie w punkty witalne pozwoliło ci rozwinąć umiejętność zadawania większych obrażeń krytycznych z broni dystansowej.",
          valdesc: "Siła krytyka fizycznego + :a: %@Atak broni dystansowej + :b: % zręczności (efekt pasywny)",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30], b: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
          }
          ,
          weapon: ["dist"]
        }
      }
    }
  }
  ,
  paladyn: {
    paladyn_1: {
      minlvl: 25,
      requireUsed: 0,
      desc: "Dostępne od 25 lvla i 1 pkt umiejętności",
      skills: {
        1: {
          id: 611,
          name: "Pchnięcie mrozu",
          desc: "Po uderzeniu bronią mrozu, spowalniasz przeciwnika i masz szansę na to, żeby go zamrozić.",
          valdesc: "Wzmacnia spowolnienie z broni zimna o  :a: %@Szansa na zamrożenie  :b: %@+1 pkt kombinacji za każde użycie tej umiejętności@Koszt many:  :c: @Atak zimnem +30% intelektu (efekt pasywny)",
          values: {
            a: [60, 66, 72, 78, 84, 90, 96, 102, 108, 114], b: [10, 11, 11, 12, 12, 13, 13, 14, 14, 15], c: [28, 31, 34, 37, 40, 43, 46, 49, 52, 55]
          }
          ,
          weapon: ["frost"],
          isAttack: !0
        }
        ,
        2: {
          id: 612,
          name: "Gorące uderzenie",
          desc: "Błogosławieństwo Ermosa zaklina twoją broń żywiołem ognia, przez co zadaje ona dodatkowe obrażenia oraz zwiększa celność podczas tego ataku. Obrażenia gorącego uderzenia ignorują obronę przeciwnika.",
          valdesc: "Dodatkowe obrażenia od ognia o mocy  :a: % broni głównej@Obniżenie uniku przeciwnika o  :b:  punktów procentowych@+1 pkt kombinacji za każde użycie tej umiejętności@Koszt many:  :c: @Użycie umiejętności drugi raz z rzędu podnosi jej koszt o 50%@Atak ogniem +30% intelektu (efekt pasywny)",
          values: {
            a: [100, 110, 120, 130, 141, 152, 163, 175, 187, 200], b: [3, 4, 4, 5, 5, 6, 7, 8, 9, 10], c: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65]
          }
          ,
          weapon: ["fire"],
          isAttack: !0
        }
        ,
        3: {
          id: 613,
          name: "Gniew bogów",
          desc: "Potrafisz kumulować siłę swojego ciosu poprzez blokowanie ataków przeciwnika. W zależności od ilości posiadanych punktów kombinacji potrafisz ściągnąć Gniew Bogów w stronę wroga.",
          valdesc: "Zwiększenie posiadanego SA o +10%@+1 pkt kombinacji za każdy zablokowany cios (efekt pasywny)@Ziększenie obrażeń o  :b: % za każdy pkt kombinacji@Zużywa wszystkie punkty kombinacji oraz dodaje bonus za maksymalnie 3pkt@Koszt energii:  :c: @Atak broni jednoręcznej +20% siły (efekt pasywny)",
          values: {
            b: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], c: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
          }
          ,
          weapon: ["1h",
            "1.5h"],
          isAttack: !0
        }
        ,
        4: {
          id: 614,
          name: "Porażający cios",
          desc: "Używasz broni zaklętej żywiołem błyskawic, przez co niszczysz pancerz przeciwnika oraz porażasz go na dwie tury.",
          valdesc: "Niszczy pancerz przeciwnika w wysokości  :a: % wartości posiadanego ataku fizycznego@Zadaje wrogiemu graczowi obrażenia od błyskawic równe  :b: % jego maksymalnego życia na 2 tury@+1pkt kombinacji za każde użycie tej umiejętności@Koszt many:  :c: @Atak błyskawicami +30% intelektu (efekt pasywny)@Obrażenia od błyskawic przynajmniej  :d: % wartości maksymalnej",
          values: {
            a: [2, 2, 3, 3, 4, 4, 5, 5, 6, 6], b: [3, 3, 3, 3, 3, 4, 4, 4, 4, 4], c: [17, 19, 21, 23, 25, 28, 31, 34, 37, 40], d: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
          }
          ,
          weapon: ["light"],
          isAttack: !0
        }
        ,
        5: {
          id: 615,
          name: "Moc sprawiedliwych",
          desc: "Czujesz moc niebiańskiej siły, która pozwala ci zwiększyć ilość energii i many oraz jej turowe odnawianie.",
          valdesc: "Energia + :a: @Energia + :b:  co turę@Mana + :c: @Mana + :d: *intelekt@Mana + :e:  co turę",
          values: {
            a: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50], b: [2], c: [15, 30, 45, 55, 65, 75, 85, 90, 95, 100], d: [.05, .08, .1, .12, .14, .16, .18, .2, .22, .24], e: [2, 4, 6, 8, 9, 10, 11, 12, 13, 14]
          }
        }
        ,
        6: {
          id: 616,
          name: "Sprawność fizyczna",
          desc: "Zwiększona ilość punktów życia sprawia, że jesteś w stanie dłużej przyjmować ataki wroga.",
          valdesc: "Życie + :a:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
          }
          ,
          multipler: {
            a: "plvl"
          }
        }
      }
    }
    ,
    paladyn_2: {
      minlvl: 35,
      requireUsed: 10,
      desc: "Dostępne od 35 lvla i 10 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 621,
          name: "Szybki atak",
          desc: "Uderzasz we wroga z niespotykaną dotąd szybkością kosztem utraty części energii.",
          valdesc: "Zwiększenie posiadanego SA o + :a: %@Koszt energii:  :b: ",
          values: {
            a: [23, 26, 29, 32, 35, 38, 41, 44, 47, 50], b: [15, 17, 19, 21, 23, 25, 27, 29, 31, 33]
          }
          ,
          weapon: ["1h",
            "1.5h"],
          isAttack: !0
        }
        ,
        2: {
          id: 622,
          name: "Wrodzona szybkość",
          desc: "Opanowanie techniki zwinności, umożliwia zadawanie większej ilości ciosów w walce.",
          valdesc: "SA + :a:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [0.002, 0.004, 0.005, 0.006, 0.0065, 0.007, 0.0073, 0.0076, 0.0078, 0.008]
          }
          ,
          multipler: {
            a: "plvl"
          }
        }
        ,
        3: {
          id: 623,
          name: "Aura szybkości",
          desc: "Boska energia wokół ciebie zwiększa na kilka tur szybkość ataków twoich kompanów. Sam uzyskujesz z niej tylko połowę mocy.",
          valdesc: "Aura: SA + :a: % na 8 tur@Koszt many:  :c: @Czas odnowienia: 8 tur",
          values: {
            a: [22, 24, 26, 28, 30, 32, 34, 36, 38, 40], c: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140]
          }
          ,
          isAttack: !0
        }
        ,
        4: {
          id: 624,
          name: "Skupienie na celu",
          desc: "Twoja broń uderza przeciwnika z idealną celnością, dzięki czemu jego szansa na unik zostaje zmniejszona.",
          valdesc: "Obniżenie uniku przeciwnika o  :a:  punktów procentowych",
          values: {
            a: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
          }
          ,
          weapon: ["1h"]
        }
        ,
        5: {
          id: 625,
          name: "Błogosławiona ochrona",
          desc: "Twoja tarcza zostaje pobłogosławiona w imię świętej sprawy, zwiększającym tym samym szansę na blok i redukując obrażenia od głębokich ran.",
          valdesc: "Blok z ekwipunku zwiększony o + :a: %@Obrażenia od głębokich ran zmniejszone o  :b: %",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], b: [15, 16, 17, 18, 19, 20, 21, 23, 26, 30]
          }
        }
        ,
        6: {
          id: 626,
          name: "Parowanie",
          desc: "Twoja obrona znacznie wzrasta dzięki umiejętności blokowania nie tylko tarczą, a także bronią. Sparować można tylko ataki zadane przez miecze, noże, topory i ich pochodne.",
          valdesc: "+ :a: % szans na sparowanie ataku@Atak broni jednoręcznej +10% siły (efekt pasywny)",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
          ,
          weapon: ["1h"]
        }
      }
    }
    ,
    paladyn_3: {
      minlvl: 50,
      requireUsed: 25,
      desc: "Dostępne od 50 lvla i 25 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 631,
          name: "Prowokujący okrzyk",
          desc: "Wykonujesz zawołanie bitewne, które prowokuje przeciwników do atakowania tylko ciebie przez dwie tury.",
          valdesc: "Obraza  :a:  przeciwników@Koszt energii:  :b: ",
          values: {
            a: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], b: [6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
          }
          ,
          isAttack: !0
        }
        ,
        2: {
          id: 632,
          name: "Strażnik boskich mocy",
          desc: "Zadawanie ciosów krytycznych wzmacnia twoją energię. Dodatkowo, gdy życie spada poniżej określonego poziomu boska światłość osłania twoje zasoby mocy.",
          valdesc: "Odzyskanie  :a: % energii po krytyku@Próg adrenaliny równy 30% zycia@Zwiększa redukcję niszczenia many i energii o 50%",
          values: {
            a: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
          }
          ,
          weapon: ["1h",
            "1.5h"]
        }
        ,
        3: {
          id: 633,
          name: "Świetlista osłona",
          desc: "Zamiast atakować zasłaniasz się tarczą, przyjmując w ten sposób defensywną strategię. Odzyskujesz przy tym część życia w zależności od posiadanych punktów kombinacji.",
          valdesc: "Wzmocnienie pancerza z tarczy o  :a: %@Czas ogłuszenia, zamrożenia oraz potężnych ciosów zmniejszony o  :b: %@Zwiększenie posiadanego SA o +20%@Koszt energii:  :c: @Przywraca  :d: % życia za każdy pkt kombinacji@Zużywa wszystkie punkty kombinacji oraz dodaje bonus za maksymalnie 3 pkt@Czas odnowienia: 1 tura",
          values: {
            a: [250, 260, 270, 280, 290, 300, 310, 320, 330, 340], b: [52, 54, 56, 58, 60, 62, 64, 66, 68, 70], c: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], d: [2, 2, 2, 3, 3, 3, 4, 4, 4, 5]
          }
          ,
          weapon: ["shield"],
          isAttack: !0
        }
        ,
        4: {
          id: 634,
          name: "Cios krytyczny",
          desc: "Rozwija umiejętność celowania w punkty witalne przeciwnika, przez co zwiększa szanse na zadanie krytycznych obrażeń.",
          valdesc: "Cios krytyczny + :a: %",
          values: {
            a: [1, 2, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7]
          }
        }
        ,
        5: {
          id: 635,
          name: "Srebrzysty blask",
          desc: "Otaczasz siebie lub sojusznika uzdrawiającą aurą, która przywraca zdrowie. Każde kolejne użycie jest 50% słabsze od poprzedniego.",
          valdesc: "Przywrócenie  :a: % życia podczas walki@Koszt many:  :b:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [23, 26, 29, 32, 35, 38, 41, 44, 47, 50], b: [.8, .85, .9, .95, 1, 1.05, 1.1, 1.15, 1.2, 1.25]
          }
          ,
          multipler: {
            b: "plvl"
          }
          ,
          isAttack: !0
        }
        ,
        6: {
          id: 636,
          name: "Odnowa mocy",
          desc: "Cicho recytujesz kanon, dzięki czemu przywracasz sobie część punktów many i energii. Każde kolejne użycie jest 10% słabsze od poprzedniego.",
          valdesc: "Przywraca  :a: % całości posiadanej many@Przywraca  :a: % całości posiadanej energii",
          values: {
            a: [23, 26, 29, 32, 35, 38, 41, 44, 47, 50]
          }
          ,
          isAttack: !0
        }
      }
    }
    ,
    paladyn_4: {
      minlvl: 80,
      requireUsed: 55,
      desc: "Dostępne od 80 lvla i 55 wykorzystanych pkt umiejętności",
      skills: {
        1: {
          id: 641,
          name: "Krytyczne uderzenie",
          desc: "Krytyczne obrażenia bronią biała zostają zwiększone dzięki wieloletniemu treningowi efektywnej walki.",
          valdesc: "Siła krytyka fizycznego + :a: %@Atak broni jednoręcznej + :b: % siły (efekt pasywny)",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10]
          }
          ,
          weapon: ["1h",
            "1.5h"]
        }
        ,
        2: {
          id: 642,
          name: "Mistrzostwo walk",
          desc: "Osiągnięcie mistrzostwa w walce pozwala na automatyczne wykonywanie czynności podczas szybkiej walki.",
          valdesc: "Automatyczne wykonanie  :a:  tur w walce",
          values: {
            a: [2, 3, 4, 5, 6, 7, 8, 10, 12, 14]
          }
        }
        ,
        3: {
          id: 643,
          name: "Fala leczenia",
          desc: "Wysyłasz przed siebie falę świętego światła, który leczy sojuszników w drużynie. Każde kolejne użycie jest 25% słabsze od poprzedniego.",
          valdesc: "Przywrócenie wszystkim w drużynie  :a: % życia@Koszt many:  :b:  (wartość rośnie wraz z poziomem gracza)",
          values: {
            a: [16, 18, 20, 22, 24, 26, 28, 30, 32, 34], b: [1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45]
          }
          ,
          multipler: {
            b: "plvl"
          }
          ,
          isAttack: !0
        }
        ,
        4: {
          id: 644,
          name: "Krytyczna moc ognia",
          desc: "Używanie broni z żywiołem ognia zwiększa magiczne obrażenia krytyczne od tego żywiołu.",
          valdesc: "Siła krytycznego uderzenia magii ognia + :a: %@Atak ogniem + :b: % intelektu (efekt pasywny)",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [15, 18, 18, 21, 21, 24, 24, 27, 27, 30]
          }
          ,
          weapon: ["fire"]
        }
        ,
        5: {
          id: 645,
          name: "Krytyczna moc błyskawic",
          desc: "Używanie broni z żywiołem błyskawic zwiększa magiczne obrażenia krytyczne od tego żywiołu.",
          valdesc: "Siła krytycznego uderzenia magii błyskawic + :a: %@Atak błyskawicami + :b: % intelektu (efekt pasywny)",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [15, 18, 18, 21, 21, 24, 24, 27, 27, 30]
          }
          ,
          weapon: ["light"]
        }
        ,
        6: {
          id: 646,
          name: "Krytyczna moc zimna",
          desc: "Używanie broni z żywiołem zimna zwiększa magiczne obrażenia krytyczne od tego żywiołu.",
          valdesc: "Siła krytycznego uderzenia magii zimna + :a: %@Atak zimnem + :b: % intelektu (efekt pasywny)",
          values: {
            a: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], b: [15, 18, 18, 21, 21, 24, 24, 27, 27, 30]
          }
          ,
          weapon: ["frost"]
        }
      }
    }
  }
}