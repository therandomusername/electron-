const electron = require('electron')
const path = require('path')
const { ipcRenderer } = require('electron');
const notifyBtn = document.getElementById('notifyBtn')
var userSelection = document.getElementsByClassName('eq_item');
var app = require('electron').remote;
const { dialog } = require('electron').remote;
var fs = require('fs');
const ipc = electron.ipcRenderer;
let equip_1 = [], equip_2 = [];
var stats_1 = {
  dmg_min: 0, dmg_max: 0, dmg_second_min: 0, dmg_second_max: 0, armor: 0, ice_dmg: 0, flash_dmg_min: 0, flash_dmg_max: 0, fire_dmg: 0, poison_dmg: 0, destroy_abs: 0, couter: 0, block: 0, hp_for_str: 0,
  ice_res: 0, fire_res: 0, poison_res: 0, flash_res: 0, all_points: 0, crit_val: 1.02, crit_second_val: 1.02, crit: 0, crit_m: 0, abs: 0, abs_fiz: 0, strength: 4, intellect: 3,
  agility: 3, hp: 0, hp_reg: 0, evade: 0, mana: 0, energy: 0, res_low: 0, crit_second: 0, evade_low: 0, destroy_energy: 0, destroy_mana: 0, slow: 0, sa: 1.0, enemy_sa_red: 0, destroy_armor: 0,
  enemy_low_hp_reg: 0, enemy_low_armor_des: 0, enemy_low_energy_des: 0, enemy_low_mana_des: 0, self_dmg: 0, crit_low: 0, enemy_low_hp_reg: 0, pierce_block: 0, legbons: [],gr_second: 0, gr_second_chance: 0, gr:0, gr_chance:0, armor_ev:0, counter:0
};
var stats_2 = {
  dmg_min: 0, dmg_max: 0, dmg_second_min: 0, dmg_second_max: 0, armor: 0, ice_dmg: 0, flash_dmg_min: 0, flash_dmg_max: 0, fire_dmg: 0, poison_dmg: 0, destroy_abs: 0, couter: 0, block: 0, hp_for_str: 0,
  ice_res: 0, fire_res: 0, poison_res: 0, flash_res: 0, all_points: 0, crit_second: 0, crit_val: 1.02, crit_second_val: 1.02, crit: 0, crit_m: 0, abs: 0, abs_fiz: 0, strength: 4, intellect: 3,
  agility: 3, hp: 0, hp_reg: 0, evade: 0, mana: 0, energy: 0, res_low: 0, evade_low: 0, destroy_energy: 0, destroy_mana: 0, slow: 0, sa: 1.0, enemy_sa_red: 0, destroy_armor: 0,
  enemy_low_hp_reg: 0, enemy_low_armor_des: 0, enemy_low_energy_des: 0, enemy_low_mana_des: 0, self_dmg: 0, crit_low: 0, enemy_low_hp_reg: 0, pierce_block: 0, legbons: [], gr_second: 0, gr_second_chance: 0,gr:0, gr_chance:0, armor_ev:0,counter:0
};
var whichItem;
var mistrz_1 = [], mistrz_2 = [];
var usedUm_1 = 0; usedUm_2 = 0;

document.getElementById("openPoints_1").addEventListener("click", function(){
  if(($('#profa1').val() != null) &&$('#player_1_lvl').val() !=null){
  $('#str_1').val(getStrength($('#profa1').val(), stats_1, $('#player_1_lvl').val()))
  $('#int_1').val(getIntellect($('#profa1').val(), stats_1, $('#player_1_lvl').val()))
  $('#agil_1').val(getAgility($('#profa1').val(), stats_1, $('#player_1_lvl').val()))


  if(document.getElementById('addPoints_1').style.display =="none") $('#addPoints_1').css("display", "block")
  }
})
document.getElementById("addStr_1").addEventListener("click", function(){
  stats_1.strength++;
 $('#str_1').val(getStrength($('#profa1').val(), stats_1, $('#player_1_lvl').val()))
 })
 document.getElementById("subStr_1").addEventListener("click", function(){
   stats_1.strength--;
  $('#str_1').val(getStrength($('#profa1').val(), stats_1, $('#player_1_lvl').val()))
  })
  document.getElementById("addInt_1").addEventListener("click", function(){
    stats_1.intellect++;
    $('#int_1').val(getIntellect($('#profa1').val(), stats_1, $('#player_1_lvl').val()))
    })
    document.getElementById("subInt_1").addEventListener("click", function(){
      stats_1.intellect--;
     $('#int_1').val(getIntellect($('#profa1').val(), stats_1, $('#player_1_lvl').val()))
     })
     document.getElementById("addAgil_1").addEventListener("click", function(){
stats_1.agility++;
      $('#agil_1').val(getAgility($('#profa1').val(), stats_1, $('#player_1_lvl').val()))
      })
      document.getElementById("subAgil_1").addEventListener("click", function(){
        stats_1.agility--;
       $('#agil_1').val(getAgility($('#profa1').val(), stats_1, $('#player_1_lvl').val()))
       })
document.getElementById("closePoints_1").addEventListener("click", function(){
 $('#addPoints_1').css("display", "none");
 document.getElementById('basic_1').innerHTML =" Siła/Int/Zr: " + getStrength($('#profa1').val(), stats_1, $('#player_1_lvl').val()) + " "+ getIntellect($('#profa1').val(), stats_1, $('#player_1_lvl').val()) + " "+ getAgility($('#profa1').val(), stats_1, $('#player_1_lvl').val());

})


document.getElementById("openPoints_2").addEventListener("click", function(){
  if(($('#profa2').val() != null) &&$('#player_2_lvl').val() !=null){
  $('#str_2').val(getStrength($('#profa2').val(), stats_1, $('#player_2_lvl').val()))
  $('#int_2').val(getIntellect($('#profa2').val(), stats_1, $('#player_2_lvl').val()))
  $('#agil_2').val(getAgility($('#profa2').val(), stats_1, $('#player_2_lvl').val()))


  if(document.getElementById('addPoints_2').style.display =="none") $('#addPoints_2').css("display", "block")
  }
})
document.getElementById("addStr_2").addEventListener("click", function(){
  stats_2.strength++;
 $('#str_2').val(getStrength($('#profa2').val(), stats_2, $('#player_2_lvl').val()))
 })
 document.getElementById("subStr_2").addEventListener("click", function(){
   stats_2.strength--;
  $('#str_2').val(getStrength($('#profa2').val(), stats_2, $('#player_2_lvl').val()))
  })
  document.getElementById("addInt_2").addEventListener("click", function(){
    stats_2.intellect++;
    $('#int_2').val(getIntellect($('#profa2').val(), stats_2, $('#player_2_lvl').val()))
    })
    document.getElementById("subInt_2").addEventListener("click", function(){
      stats_2.intellect--;
     $('#int_2').val(getIntellect($('#profa2').val(), stats_2, $('#player_2_lvl').val()))
     })
     document.getElementById("addAgil_2").addEventListener("click", function(){
stats_2.agility++;
      $('#agil_2').val(getAgility($('#profa2').val(), stats_2, $('#player_2_lvl').val()))
      })
      document.getElementById("subAgil_2").addEventListener("click", function(){
        stats_2.agility--;
       $('#agil_2').val(getAgility($('#profa2').val(), stats_2, $('#player_2_lvl').val()))
       })
document.getElementById("closePoints_2").addEventListener("click", function(){
 $('#addPoints_2').css("display", "none");
 document.getElementById('basic_2').innerHTML =" Siła/Int/Zr: " + getStrength($('#profa2').val(), stats_2, $('#player_2_lvl').val()) + " "+ getIntellect($('#profa2').val(), stats_2, $('#player_2_lvl').val()) + " "+ getAgility($('#profa2').val(), stats_2, $('#player_2_lvl').val());

})

function getUm(playerNumber) {
  let um = {};
  for (var g = 1; g < 5; g++) {
    for (var h = 1; h < 7; h++) {
      um['um' + g + '_' + h] = document.getElementById(playerNumber + '_' + g + h).getAttribute('value');
    }
  }
  return um;
};


function statsToSend(playerNumber) {
  let calculated = {};
  if (playerNumber == 1) {
    calculated = JSON.parse(JSON.stringify(finalStats(stats_1, $('#player_1_lvl').val(), $('#profa1').val(), 1)));
  }
  if (playerNumber == 2) {
    calculated = JSON.parse(JSON.stringify(finalStats(stats_2, $('#player_2_lvl').val(), $('#profa2').val(), 2)));
  }
  calculated.hp = parseInt(calculated.hp) + parseInt(5 * getStrength($('#profa'+playerNumber+'').val(), calculated, $('#player_'+playerNumber+'_lvl').val())) + parseInt(20 * Math.pow($('#player_'+playerNumber+'_lvl').val(), 1.25));
  calculated.sa = calculateSA(calculated, playerNumber);
  calculated.crit_val = roundNumber(calculated.crit_val + 0.02 * ($('#player_'+playerNumber+'_lvl').val() - 1), 2);
  calculated.crit = roundNumber((1.2 + calculated.crit),2);
  calculated.crit_m = roundNumber((1.2 + calculated.crit_m),2);
  calculated.evade = getEvade(calculated, $('#profa'+playerNumber).val());
  if(((calculated.crit_second==null) || (calculated.crit_second) ==0) && $('#profa1').val()=="tancerz"){
    calculated.crit_second = calculated.crit;
    calculated.crit_second_val = calculated.crit_val;
  }
  //console.log(calculated)
  return calculated;
}


notifyBtn.addEventListener('click', function (event) {
  ipc.send('open-battle-window', 'an-argument')

  let Data = {
    player_1: {
      prof: $('#profa1').val(),
      lvl: $('#player_1_lvl').val(),
      mistrzostwo: JSON.parse(JSON.stringify(mistrz_1)),
      um: getUm(1),
      stats: statsToSend(1)
    },
    player_2: {
      prof: $('#profa2').val(),
      lvl: $('#player_2_lvl').val(),
      mistrzostwo: JSON.parse(JSON.stringify(mistrz_2)),
      um: getUm(2),
      stats: statsToSend(2)
    },
    quant: $('#quant').val()

  }
  ipc.send('battle_info', Data);
})

function get_player(equipNumber) {
  if (equipNumber == "equip_1") return "#profa1";
  if (equipNumber == "equip_2") return "#profa2";
}
_tempSelect = ["helm", "pier", "naszyj", "rece", "first", "zbroja", "second", "buty"];
for (let i = 0; i < userSelection.length; i++) {
  userSelection[i].addEventListener("click", function () {
    if ($(get_player($(this).parent().attr('id'))).val() != null) {
      whichItem = this;
      ipc.send('open-second-window', 'an-argument')
      let Data = {
        player: $(this).parent().attr('id'),
        prof: $(get_player($(this).parent().attr('id'))).val(),
        obj: this.id
      }
      ipc.send('send_info', Data);
      console.log(Data)
      ipc.send('reload-second-window', 'an-argument')
      $(get_player($(this).parent().attr('id'))).css("border", "none");
    } else {
      $(get_player($(this).parent().attr('id'))).css("border", "2px solid red");
    }
  })
  userSelection[i].addEventListener("mousedown", function (ev) {
    if (ev.which == 3) {
      for (var i in _tempSelect) {
        if (this.id == _tempSelect[i]) var position = i;
        console.log(this.id)
        if (($(this).parent().attr('id') == "equip_1") && equip_1[position]) { eraseStatistics(equip_1[position], stats_1); equip_1[position] = null; this.src = "../assets/icons/item-none.png"; this.backgroundPosition = "0px 0px" }
        if (($(this).parent().attr('id') == "equip_2") && equip_2[position]) { eraseStatistics(equip_2[position], stats_2); equip_2[position] = null; this.src = "../assets/icons/item-none.png"; this.backgroundPosition = "0px 0px" }
      }
      updateShiet();
    }
  })

  userSelection[i].addEventListener("mouseover", function () {
    document.getElementById('tip_eq').innerHTML = "<center>Kliknij aby wybrać przedmiot</center>";
    var position;
    for (var i in _tempSelect) {
      if (this.id == _tempSelect[i]) position = i;
    }
    if (($(this).parent().attr('id') == "equip_1") && equip_1[position]) { document.getElementById('tip_eq').innerHTML = getStats(equip_1[position]); } // tak wyciagniesz info do tipa
    if (($(this).parent().attr('id') == "equip_2") && equip_2[position]) { document.getElementById('tip_eq').innerHTML = getStats(equip_2[position]); } // tak wyciagniesz info do tipa
    $('#tip_eq').css("visibility", "visible");
    $('#tip_eq').css("left", this.offsetLeft - 83);
    $('#tip_eq').css("top", this.offsetTop + 35)
  });

  userSelection[i].addEventListener("mouseleave", function () {
    // $('#tip_'+i).css("position", "relative");
    $('#tip_eq').css("visibility", "hidden");
    $('#tip_eq').text("");
  });
}//koniec pętli od itemków

$('<div>aaa</div>')
  .attr({
    'id': 'tip_eq'
  }).css({
    position: 'fixed',
    visibility: 'hidden',
    width: '200px',
    height: 'auto',
    opacity: '0.97',
    borderRadius: '3px',
    color: 'white',
    backgroundColor: 'black',
    padding: '5px 5px 5px 5px',
    fontSize: '11px',
    lineHeight: '12px',
  }).appendTo($('body')); //tip przedmiotu

$('<div>aaa</div>')
  .attr({
    'id': 'tip_um'
  }).css({
    position: 'fixed',
    visibility: 'hidden',
    width: '270px',
    height: 'auto',
    borderRadius: '3px',
    color: 'white',
    backgroundColor: 'black',
    padding: '5px 5px 5px 5px',
    fontSize: '10.5px',
    lineHeight: '10.8px',
  }).appendTo($('body')); // tim umki

ipc.on('przedmiot_get', function (event, arg) {
  //console.log(whichItem)
  if (arg.item_id == "helm" && arg.eq_number == "equip_1") {
    if (equip_1[0]) eraseStatistics(equip_1[0], stats_1);
    equip_1[0] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_1)
  }//setborder(arg.item.class)
  if (arg.item_id == "helm" && arg.eq_number == "equip_2") {
    if (equip_2[0]) eraseStatistics(equip_2[0], stats_2);
    equip_2[0] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_2)
  };
  if (arg.item_id == "pier" && arg.eq_number == "equip_1") {
    if (equip_1[1]) eraseStatistics(equip_1[1], stats_1);
    equip_1[1] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_1)
  };
  if (arg.item_id == "pier" && arg.eq_number == "equip_2") {
    if (equip_2[1]) eraseStatistics(equip_2[1], stats_2);
    equip_2[1] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_2)
  };
  if (arg.item_id == "naszyj" && arg.eq_number == "equip_1") {
    if (equip_1[2]) eraseStatistics(equip_1[2], stats_1);
    equip_1[2] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_1)
  };
  if (arg.item_id == "naszyj" && arg.eq_number == "equip_2") {
    if (equip_2[2]) eraseStatistics(equip_2[2], stats_2);
    equip_2[2] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_2)
  };
  if (arg.item_id == "rece" && arg.eq_number == "equip_1") {
    if (equip_1[3]) eraseStatistics(equip_1[3], stats_1);
    equip_1[3] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_1)
  };
  if (arg.item_id == "rece" && arg.eq_number == "equip_2") {
    if (equip_2[3]) eraseStatistics(equip_2[3], stats_2);
    equip_2[3] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_2)
  };
  if (arg.item_id == "first" && arg.eq_number == "equip_1") {
    if (equip_1[4]) eraseStatistics(equip_1[4], stats_1);
    equip_1[4] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_1)
  };
  if (arg.item_id == "first" && arg.eq_number == "equip_2") {
    if (equip_2[4]) eraseStatistics(equip_2[4], stats_2);
    equip_2[4] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_2)
  };
  if (arg.item_id == "zbroja" && arg.eq_number == "equip_1") {
    if (equip_1[5]) eraseStatistics(equip_1[5], stats_1);
    equip_1[5] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_1)
  };
  if (arg.item_id == "zbroja" && arg.eq_number == "equip_2") {
    if (equip_2[5]) eraseStatistics(equip_2[5], stats_2);
    equip_2[5] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_2)
  };
  if (arg.item_id == "second" && arg.eq_number == "equip_1") {
    if (equip_1[6]) eraseStatistics(equip_1[6], stats_1);
    equip_1[6] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_1)
  };
  if (arg.item_id == "second" && arg.eq_number == "equip_2") {
    if (equip_2[6]) eraseStatistics(equip_2[6], stats_2);
    equip_2[6] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_2)
  };
  if (arg.item_id == "buty" && arg.eq_number == "equip_1") {
    if (equip_1[7]) eraseStatistics(equip_1[7], stats_1);
    equip_1[7] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_1)
  };
  if (arg.item_id == "buty" && arg.eq_number == "equip_2") {
    if (equip_2[7]) eraseStatistics(equip_2[7], stats_2);
    equip_2[7] = arg.item;
    whichItem.src = "../assets/itemy/" + arg.item.img;
    whichItem.style.backgroundPosition = setborder(arg.item.class)
    getStatistics(arg.item, stats_2)
  };
  updateShiet();
});

function setborder(border) {
  if (border == "unique" || border == "unique cursed") return "-32px 0px";
  if (border == "heroic" || border == "heroic cursed") return "-64px 0px";
  if (border == "legendary") return "-128px 0px";
  if (border == "upgraded") return "-96px 0px";
  if (!border) return "-96px 0px";
}

function getStatistics(item, stats) {
  if (item.dmg && item.typ != "Pomocnicze") {
    if (item.dmg.indexOf("-") > -1) {
      stats.dmg_min += parseInt(item.dmg.split('-')[0]); stats.dmg_max += parseInt(item.dmg.split('-')[1]);
    } else {
      stats.dmg_min += parseInt(item.dmg); stats.dmg_max += parseInt(item.dmg);
    }
  }
  if (item.dmg && item.typ == "Pomocnicze") {
    if (item.dmg.indexOf("-") > -1) {
      stats.dmg_second_min += parseInt(item.dmg.split('-')[0]); stats.dmg_second_max += parseInt(item.dmg.split('-')[1]);
    } else {
      stats.dmg_second_min += parseInt(item.dmg); stats.dmg_second_max += parseInt(item.dmg);
    }
  }

  if (item.armor_ev) stats.armor_ev += parseInt(item.armor_ev);
  if (item.gr && item.typ=="Pomocnicze") stats.gr_second_chance += parseInt(item.gr.split('  ')[0]);
  if (item.gr&& item.typ == "Pomocnicze") stats.gr_second += parseInt(item.gr.split('  ')[1]);
  if (item.gr && item.typ=="Jednoręczne") stats.gr_chance += parseInt(item.gr.split('  ')[0]);
  if (item.gr&& item.typ == "Jednoręczne") stats.gr += parseInt(item.gr.split('  ')[1]);
  if (item.armor) stats.armor += parseInt(item.armor);
  if (item.ice_dmg) stats.ice_dmg += parseInt(item.ice_dmg);
  if (item.flash_dmg) {
    stats.flash_dmg_max += parseInt(item.flash_dmg.split('-')[1]);
  }
  if (item.fire_dmg) stats.fire_dmg += parseInt(item.fire_dmg);
  if (item.poison_dmg) stats.poison_dmg += parseInt(item.poison_dmg);
  if (item.destroy_abs) stats.destroy_abs += parseInt(item.destroy_abs);
  if (item.couter) stats.couter += parseInt(item.counter);
  if (item.block) stats.block += parseInt(item.block);
  if (item.hp_for_str) stats.hp_for_str += parseInt(item.hp_for_str);
  if (item.ice_res) stats.ice_res += parseInt(item.ice_res);
  if (item.fire_res) stats.fire_res += parseInt(item.fire_res);
  if (item.poison_res) stats.poison_res += parseInt(item.poison_res);
  if (item.flash_res) stats.flash_res += parseInt(item.flash_res);
  if (item.all_points) stats.all_points += parseInt(item.all_points);
  if (item.crit_val) stats.crit_val += parseInt(item.crit_val);
  if (item.crit) stats.crit += roundNumber((item.crit/100),2);
  if (item.crit_m) stats.crit_m += roundNumber((item.crit_m/100),2);
  if (item.abs) stats.abs += parseInt(item.abs);
  if (item.abs_fiz) stats.abs_fiz += parseInt(item.abs_fiz);
  if (item.strength) stats.strength += parseInt(item.strength);
  if (item.intellect) stats.intellect += parseInt(item.intellect);
  if (item.agility) stats.agility += parseInt(item.agility);
  if (item.hp) stats.hp += parseInt(item.hp);
  if (item.hp_reg) stats.hp_reg += parseInt(item.hp_reg);
  if (item.evade) stats.evade += parseInt(item.evade);
  if (item.mana) stats.mana += parseInt(item.mana);
  if (item.energy) stats.energy += parseInt(item.energy);
  if (item.res_low) stats.res_low += parseInt(item.res_low);
  if (item.evade_low) stats.evade_low += parseInt(item.evade_low);
  if (item.destroy_energy) stats.destroy_energy += parseInt(item.destroy_energy);
  if (item.destroy_mana) stats.destroy_mana += parseInt(item.destroy_mana);
  if (item.slow) stats.slow += parseFloat(item.slow.split(" ")[0]);
  if (item.sa) stats.sa += parseFloat(parseInt(item.sa) / 100);
  if (item.enemy_sa_red) stats.enemy_sa_red += parseFloat(item.enemy_sa_red);
  if (item.destroy_armor) stats.destroy_armor += parseInt(item.destroy_armor);
  if (item.enemy_low_hp_reg) stats.enemy_low_hp_reg += parseInt(item.enemy_low_hp_reg);
  if (item.enemy_low_armor_des) stats.enemy_low_armor_des += parseInt(item.enemy_low_armor_des);
  if (item.enemy_low_energy_des) stats.enemy_low_energy_des += parseInt(item.enemy_low_energy_des);
  if (item.enemy_low_mana_des) stats.enemy_low_mana_des += parseInt(item.enemy_low_mana_des);
  if (item.self_dmg) stats.self_dmg += parseInt(item.self_dmg);
  if (item.crit_low) stats.crit_low += parseInt(item.crit_low);
  if (item.enemy_low_hp_reg) stats.enemy_low_hp_reg += parseInt(item.enemy_low_hp_reg);
  if (item.pierce_block) stats.pierce_block += parseInt(item.pierce_block);
  if (item.legbon) {stats.legbons[stats.legbons.length] = {legbon: item.legbon, lvl: parseInt(item.lvl)} };
  
}

function eraseStatistics(item, stats) {
  if (item.dmg && item.typ != "Pomocnicze") {
    if (item.dmg.indexOf("-") > -1) {
      stats.dmg_min -= parseInt(item.dmg.split('-')[0]); stats.dmg_max -= parseInt(item.dmg.split('-')[1]);
    } else {
      stats.dmg_min -= parseInt(item.dmg); stats.dmg_max -= parseInt(item.dmg);
    }
  }
  if (item.dmg && item.typ == "Pomocnicze") {
    if (item.dmg.indexOf("-") > -1) {
      stats.dmg_second_min -= parseInt(item.dmg.split('-')[0]); stats.dmg_second_max -= parseInt(item.dmg.split('-')[1]);
    } else {
      stats.dmg_second_min -= parseInt(item.dmg); stats.dmg_second_max -= parseInt(item.dmg);
    }
  }

  if (item.armor_ev) stats.armor_ev -= parseInt(item.armor_ev);
  if (item.gr && item.typ=="Pomocnicze") stats.gr_second_chance -= parseInt(item.gr.split('  ')[0]);
  if (item.gr&& item == "Pomocnicze") stats.gr_second -= parseInt(item.gr.split('  ')[1]);
  if (item.gr && item.typ=="Jednoręczne") stats.gr_chance -= parseInt(item.gr.split('  ')[0]);
  if (item.gr&& item == "Jednoręczne") stats.gr -= parseInt(item.gr.split('  ')[1]);
  if (item.armor) stats.armor -= parseInt(item.armor);
  if (item.ice_dmg) stats.ice_dmg -= parseInt(item.ice_dmg);
  if (item.flash_dmg) {
    stats.flash_dmg_max -= parseInt(item.flash_dmg.split('-')[1]);
  }
  if (item.fire_dmg) stats.fire_dmg -= parseInt(item.fire_dmg);
  if (item.poison_dmg) stats.poison_dmg -= parseInt(item.poison_dmg);
  if (item.destroy_abs) stats.destroy_abs -= parseInt(item.destroy_abs);
  if (item.couter) stats.couter -= parseInt(item.counter);
  if (item.block) stats.block -= parseInt(item.block);
  if (item.hp_for_str) stats.hp_for_str -= parseInt(item.hp_for_str);
  if (item.ice_res) stats.ice_res -= parseInt(item.ice_res);
  if (item.fire_res) stats.fire_res -= parseInt(item.fire_res);
  if (item.poison_res) stats.poison_res -= parseInt(item.poison_res);
  if (item.flash_res) stats.flash_res -= parseInt(item.flash_res);
  if (item.all_points) stats.all_points -= parseInt(item.all_points);
  if (item.crit_val) stats.crit_val -= parseInt(item.crit_val);
  if (item.crit) stats.crit -= roundNumber((item.crit/100),2);
  if (item.crit_m) stats.crit_m -= roundNumber((item.crit_m/100),2);
  if (item.abs) stats.abs -= parseInt(item.abs);
  if (item.abs_fiz) stats.abs_fiz -= parseInt(item.abs_fiz);
  if (item.strength) stats.strength -= parseInt(item.strength);
  if (item.intellect) stats.intellect -= parseInt(item.intellect);
  if (item.agility) stats.agility -= parseInt(item.agility);
  if (item.hp) stats.hp -= parseInt(item.hp);
  if (item.hp_reg) stats.hp_reg -= parseInt(item.hp_reg);
  if (item.evade) stats.evade -= parseInt(item.evade);
  if (item.mana) stats.mana -= parseInt(item.mana);
  if (item.energy) stats.energy -= parseInt(item.energy);
  if (item.res_low) stats.res_low -= parseInt(item.res_low);
  if (item.evade_low) stats.evade_low -= parseInt(item.evade_low);
  if (item.destroy_energy) stats.destroy_energy -= parseInt(item.destroy_energy);
  if (item.destroy_mana) stats.destroy_mana -= parseInt(item.destroy_mana);
  if (item.slow) stats.slow -= parseFloat(item.slow.split(" ")[0]);
  if (item.sa) stats.sa -= parseFloat(parseInt(item.sa) / 100);
  if (item.enemy_sa_red) stats.enemy_sa_red -= parseFloat(item.enemy_sa_red);
  if (item.destroy_armor) stats.destroy_armor -= parseInt(item.destroy_armor);
  if (item.enemy_low_hp_reg) stats.enemy_low_hp_reg -= parseInt(item.enemy_low_hp_reg);
  if (item.enemy_low_armor_des) stats.enemy_low_armor_des -= parseInt(item.enemy_low_armor_des);
  if (item.enemy_low_energy_des) stats.enemy_low_energy_des -= parseInt(item.enemy_low_energy_des);
  if (item.enemy_low_mana_des) stats.enemy_low_mana_des -= parseInt(item.enemy_low_mana_des);
  if (item.self_dmg) stats.self_dmg -= parseInt(item.self_dmg);
  if (item.crit_low) stats.crit_low -= parseInt(item.crit_low);
  if (item.enemy_low_hp_reg) stats.enemy_low_hp_reg -= parseInt(item.enemy_low_hp_reg);
  if (item.pierce_block) stats.pierce_block -= parseInt(item.pierce_block);
  
  if(item.legbon){
    for(var i in stats.legbons){
      if((stats.legbons[i].legbon == item.legbon) && (stats.legbons[i].lvl == parseInt(item.lvl))) stats.legbons[i] =[];
    }
  }
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

function getDamage(statystyki) {
  var dmgString = '';
  if (statystyki.dmg_min) { dmgString += parseInt((statystyki.dmg_min + statystyki.dmg_max) / 2) + "  "; }
  if (statystyki.dmg_second_min) { dmgString += parseInt((statystyki.dmg_second_min + statystyki.dmg_second_max) / 2) + "  "; }
  if (statystyki.gr ||statystyki.gr_second) { dmgString += '<span style="color:#19561d">' + parseInt(statystyki.gr+ statystyki.gr_second) + '  </span>'; }
  if (statystyki.fire_dmg) { dmgString += '<span style="color:red">' + parseInt(statystyki.fire_dmg) + '  </span>'; }
  if (statystyki.ice_dmg) { dmgString += '<span style="color:blue">' + parseInt(statystyki.ice_dmg) + '  </span>'; }1
  if (statystyki.poison_dmg) { dmgString += '<span style="color:#6fbc60">' + parseInt(statystyki.poison_dmg) + '  </span>'; }
  if (statystyki.flash_dmg_max) { dmgString += '<span style="color:#d1b655"> ' + parseInt((statystyki.flash_dmg_min + statystyki.flash_dmg_max) / 2) + '  </span>'; }
  return dmgString;
}
function calculateSA(stats, player) {
  var _agil = getAgility($('#profa' + player).val(), stats, $('#player_' + player + '_lvl').val())
  if (_agil <= 100) return roundNumber((stats.sa + 0.02 * _agil), 2);
  else return roundNumber((stats.sa + 2 + 0.002 * (_agil - 100)), 2)
}

function getEvade(stats, profa) {
  if (profa == "tancerz" || profa == "lowca") return stats.evade + parseInt(getAgility($('#profa1').val(), stats_1, $('#player_1_lvl').val()) / 30);
  else return stats.evade;
}

function getOdp(stats) {
  var odpstr = '';
  if (stats.ice_res) { odpstr += '<span style="color:blue">' + stats.ice_res + '  </span>'; }
  if (stats.flash_res) { odpstr += '<span style="color:#d1b655">' + stats.flash_res + '  </span>'; }
  if (stats.fire_res) { odpstr += '<span style="color:red">' + stats.fire_res + '  </span>'; }
  if (stats.poison_res) { odpstr += '<span style="color:#6fbc60">' + stats.poison_res + '  </span>'; }
  return odpstr;
}

function testInt(number) {
  if (number > 20) return number - 20;
  else return 0;
}

//nie lvl tylko lvl -1 bo pierwszy jest rozdany, ale trzeba sprytnie jakos bo te wyzsze lvl to juz lvl a nie lvl-1
function getAgility(prof, stats, lvl) {
  if (prof == "trop") {
    return parseInt(stats.all_points + ((lvl % 21) - 1) * 2 + parseInt((testInt(lvl)) * 2) + parseInt((testInt(lvl)) / 2) + (testInt(lvl) % 2) * 3 + stats.agility);
  }
  if (prof == "mag") {
    return parseInt(stats.agility + ((lvl % 21) - 1) + stats.all_points);
  }
  if (prof == "wojownik") {
    return parseInt(stats.agility + ((lvl % 21) - 1) * 2 + stats.all_points);
  }
  if (prof == "tancerz") {
    return parseInt(stats.agility + stats.all_points + ((lvl % 21) - 1) * 2 + parseInt(testInt(lvl)) + parseInt((testInt(lvl)) / 2) + (testInt(lvl) % 2) * 2);
  }
  if (prof == "lowca") {
    return parseInt(stats.agility + stats.all_points + 4 * testInt(lvl));
  }
  if (prof == "paladyn") {
    return parseInt(stats.agility + stats.all_points + ((lvl % 21) - 1) / 2);
  }
else{
  return "";
}
}

function getStrength(prof, stats, lvl) {

  if (prof == "trop") {
    return parseInt(stats.strength + stats.all_points + ((lvl % 21) - 1));
  }
  if (prof == "mag") {
    return parseInt(stats.strength + stats.all_points + ((lvl % 21) - 1));
  }
  if (prof == "wojownik") {
    return parseInt(stats.strength + stats.all_points + 4 * testInt(lvl));
  }
  if (prof == "tancerz") {
    return parseInt(stats.strength + stats.all_points + ((lvl % 21) - 1) * 3 + parseInt((testInt(lvl)) * 2) + parseInt((testInt(lvl)) / 2) + (testInt(lvl) % 2) * 2);
  }
  if (prof == "lowca") {
    return parseInt(stats.strength + stats.all_points + (testInt(lvl) % 21));
  }
  if (prof == "paladyn") {
    return parseInt(parseInt(((lvl % 21) - 1) * 2) + parseInt(((lvl % 21) - 1) / 2) + stats.strength + stats.all_points + parseInt((testInt(lvl)) * 2) + parseInt((testInt(lvl)) / 2) + (testInt(lvl) % 2) * 3);
  }
  else{
    return "";
  }
}

function getIntellect(prof, stats, lvl) {
  if (prof == "trop") {
    return parseInt(stats.intellect + stats.all_points + ((lvl % 21) - 1) + parseInt((testInt(lvl)) * 2) + parseInt((testInt(lvl)) / 2) + (testInt(lvl) % 2) * 3);
  }
  if (prof == "mag") {
    return parseInt(stats.intellect + stats.all_points + (testInt(lvl) % 21) * 3 + parseInt(testInt(lvl)) * 4);
  }
  if (prof == "wojownik") {
    return parseInt(stats.intellect + stats.all_points);
  }
  if (prof == "tancerz") {
    return parseInt(stats.intellect + stats.all_points);
  }
  if (prof == "lowca") {
    return parseInt(stats.intellect + stats.all_points);
  }
  if (prof == "paladyn") {
    return parseInt(stats.intellect + stats.all_points + ((lvl % 21) - 1) * 2 + parseInt(testInt(lvl)) + parseInt((testInt(lvl)) / 2) + (testInt(lvl) % 2));
  }
  else{
    return "";
  }
}


function updateShiet() {

  staty_1 = finalStats(stats_1, $('#player_1_lvl').val(), $('#profa1').val(), 1);
  staty_2 = finalStats(stats_2, $('#player_2_lvl').val(), $('#profa2').val(), 2);
  $('#hp_1').text("HP:    " + (parseInt(staty_1.hp) + parseInt(5 * getStrength($('#profa1').val(), staty_1, $('#player_1_lvl').val())) + parseInt(20 * Math.pow($('#player_1_lvl').val(), 1.25))));
  $('#armor_1').text("Pancerz:    " + parseInt(staty_1.armor));
  document.getElementById('dmg_1').innerHTML = "Atak:    " + getDamage(staty_1);
  $('#sa_1').text("SA:    " + calculateSA(staty_1, 1));
  $('#crit_val_1').text("Krytyk:    " + roundNumber(staty_1.crit_val + 0.02 * ($('#player_1_lvl').val() - 1), 2));
  $('#crit_1').text("Siła fiz:     " + roundNumber((1.2 + staty_1.crit),2));
  $('#crit_m_1').text("Siła mag:     " + roundNumber((1.2 + staty_1.crit_m),2));
  document.getElementById('evade_1').innerHTML = "Unik:    " + getEvade(staty_1, $('#profa1').val());
  $('#block_1').text("Blok:     " + staty_1.block);
  $('#hp_reg_1').text("Lek tur:     " + staty_1.hp_reg);
  $('#enemy_low_hp_reg_1').text("Obn. lek tur:     " + staty_1.enemy_low_hp_reg);
  $('#abs_fiz_1').text("Abs fiz:     " + parseInt(staty_1.abs_fiz));
  $('#abs_1').text("Abs mag:     " + parseInt(staty_1.abs));
  $('#energy_1').text("Energia:     " + (50 + parseInt(staty_1.energy)));
  $('#mana_1').text("Mana:     " + parseInt(staty_1.mana));
  $('#evade_low_1').text("Ob. uniku:     " + staty_1.evade_low);
  $('#enemy_slow_1').text("Ob. sa:     " + staty_1.slow);
  $('#enemy_low_res_crit_1').text("Ob. odp/ck:     " + staty_1.res_low + " / " + staty_1.crit_low);
  $('#enemy_low_energy_mana_1').text("Nisz. en/many:     " + staty_1.destroy_energy + " / " + staty_1.destroy_mana);
  $('#enemy_low_abs+amror_1').text("Nisz. abs/panc:     " + staty_1.destroy_abs + " / " + staty_1.destroy_armor);
  $('#self_dmg_1').text("Self dmg:     " + staty_1.self_dmg);
  document.getElementById('legbons_1').innerHTML = "Legbony ";
  for(var i=0; i< stats_1.legbons.length;i++){
    if(staty_1.legbons[i].legbon){
    document.getElementById('legbons_1').innerHTML += staty_1.legbons[i].legbon + " ";
    }
  }
  
  document.getElementById('odp_1').innerHTML = "Odp:   " + getOdp(staty_1);
  document.getElementById('basic_1').innerHTML =" Siła/Int/Zr: " + getStrength($('#profa1').val(), staty_1, $('#player_1_lvl').val()) + " "+ getIntellect($('#profa1').val(), staty_1, $('#player_1_lvl').val()) + " "+ getAgility($('#profa1').val(), staty_1, $('#player_1_lvl').val());
                   

  $('#hp_2').text("HP:    " + (parseInt(staty_2.hp) + parseInt(5 * getStrength($('#profa2').val(), staty_2, $('#player_2_lvl').val())) + parseInt(20 * Math.pow($('#player_2_lvl').val(), 1.25))));
  $('#armor_2').text("Pancerz:    " + staty_2.armor);
  document.getElementById('dmg_2').innerHTML = "Atak:    " + getDamage(staty_2);
  $('#sa_2').text("SA:    " + calculateSA(staty_2, 2));
                                       
  $('#crit_val_2').text("Krytyk:    " + roundNumber(staty_2.crit_val + 0.02 * ($('#player_2_lvl').val() - 1), 2));
  $('#crit_2').text("Siła fiz:     " + roundNumber((1.2 + staty_2.crit),2));
  $('#crit_m_2').text("Siła mag:     " + roundNumber((1.2 + staty_2.crit_m),2));
  document.getElementById('evade_2').innerHTML = "Unik:    " + getEvade(staty_2, $('#profa2').val());
  $('#block_2').text("Blok:     " + staty_2.block);
  $('#hp_reg_2').text("Lek tur:     " + staty_2.hp_reg);
  $('#enemy_low_hp_reg_2').text("Obn. lek tur:     " + staty_2.enemy_low_hp_reg);
  $('#abs_fiz_2').text("Abs fiz:     " + staty_2.abs_fiz);
  $('#abs_2').text("Abs mag:     " + parseInt(staty_2.abs));
  $('#energy_2').text("Energia:     " + (50 + parseInt(staty_2.energy)));
  $('#mana_2').text("Mana:     " + parseInt(staty_2.mana));
  $('#evade_low_2').text("Ob. uniku:     " + staty_2.evade_low);
  $('#enemy_slow_2').text("Ob. sa:     " + staty_2.slow);
  $('#enemy_low_res_crit_2').text("Ob. odp/ck:     " + staty_2.res_low + " / " + staty_2.crit_low);
  $('#enemy_low_energy_mana_2').text("Nisz.. en/many:     " + staty_2.destroy_energy + " / " + staty_2.destroy_mana);
  $('#enemy_low_abs+amror_2').text("Nisz. abs/panc:     " + staty_2.destroy_abs + " / " + staty_2.destroy_armor);
  $('#self_dmg_2').text("Self dmg:     " + staty_2.self_dmg);
  document.getElementById('legbons_2').innerHTML = "Legbony: ";
  for(var i=0; i< stats_2.legbons.length;i++){
    if(staty_2.legbons[i].legbon){
    document.getElementById('legbons_2').innerHTML += staty_2.legbons[i].legbon + " ";
  }}
  document.getElementById('odp_2').innerHTML = "Odp:   " + getOdp(staty_2);
  document.getElementById('basic_2').innerHTML =" Siła/Int/Zr: " + getStrength($('#profa2').val(), staty_2, $('#player_2_lvl').val()) + " "+ getIntellect($('#profa2').val(), staty_2, $('#player_2_lvl').val()) + " "+ getAgility($('#profa2').val(), staty_2, $('#player_2_lvl').val());
}

function getClass(clss) {
  if (clss == "unique") return '<span style="color: #009600">* unikat *</span>';
  if (clss == "heroic") return '<span style="color: #0052b7">* heroiczny *</span>';
  if (clss == "legendary") return '<span style="color: #b400a6">* legendarny *</span>';
  if (clss == "upgraded") return '<span style="color: #9bba00">* ulepszony *</span>';
  if (clss == "unique cursed") return '<span style="color: #009600">* przeklęty unikat *</span>';
  if (clss == "heroic cursed") return '<span style="color: #0052b7">* przeklęty heroiczny *</span>';
  if (!clss) return '<span style="color: #9bba00">* ulepszony *</span>';
}

function getStats(item_stats) {
  var stats = "";
  if (item_stats.name) stats += "<center>" + item_stats.name + "</center>";
  if (item_stats.class) stats += "<center><b>" + getClass(item_stats.class) + "</b></center>";
  if (item_stats.typ) stats += "<br>Typ: " + item_stats.typ;
  if (item_stats.dmg) stats += "<br>Atak: " + item_stats.dmg;
  if (item_stats.armor) stats += "<br>Pancerz: " + item_stats.armor;
  if (item_stats.ice_dmg) stats += "<br>Obrażenia od zimna " + item_stats.ice_dmg;
  if (item_stats.flash_dmg) stats += "<br>Obrażenia od błyskawic " + item_stats.flash_dmg;
  if (item_stats.fire_dmg) stats += "<br>Obrażenia od ognia " + item_stats.fire_dmg;
  if (item_stats.poison_dmg) stats += "<br>Obrażenia od trucizny " + item_stats.poison_dmg;
  if (item_stats.destroy_abs) stats += "<br>Niszczenie " + item_stats.destroy_abs + " absorbcji podczas ciosu";
  if (item_stats.couter) stats += "<br>" + item_stats.counter + " szans na kontre";
  if (item_stats.block) stats += "<br>Blok: " + item_stats.block;
  if (item_stats.hp_for_str) stats += "<br>+ " + item_stats.hp_for_str + " punktów życia za 1 punkt siły"
  if (item_stats.ice_res) stats += "<br>Odborność na zimno: " + item_stats.ice_res;
  if (item_stats.fire_res) stats += "<br>Odborność na ogień: " + item_stats.fire_res;
  if (item_stats.poison_res) stats += "<br>Odborność na truciznę: " + item_stats.poison_res;
  if (item_stats.flash_res) stats += "<br>Odborność na błyskawice: " + item_stats.flash_res;
  if (item_stats.all_points) stats += "<br>Wszystkie cechy: " + item_stats.all_points;
  if (item_stats.crit_val) stats += "<br>Cios krytyczny: " + item_stats.crit_val;
  if (item_stats.crit) stats += "<br>Siła krytyka fizycznego: " + item_stats.crit;
  if (item_stats.crit_m) stats += "<br>Siła krytyka magicznego : " + item_stats.crit_m;
  if (item_stats.abs) stats += "<br>Absorbcja magiczna: " + item_stats.abs;
  if (item_stats.abs_fiz) stats += "<br>Absorbcja fizyczna: " + item_stats.abs_fiz;
  if (item_stats.strength) stats += "<br>Siła: " + item_stats.strength;
  if (item_stats.intellect) stats += "<br>Intelekt: " + item_stats.intellect;
  if (item_stats.agility) stats += "<br>Zręczność: " + item_stats.agility;
  if (item_stats.hp) stats += "<br>Zycie: " + item_stats.hp;
  if (item_stats.armor_ev) stats += "<br>Przebicie " + item_stats.armor_ev;
  if (item_stats.gr) stats += "<br> Głęboka rana " + item_stats.gr;
  if (item_stats.hp_reg) stats += "<br>Przywraca " + item_stats.hp_reg + " punktów zycia podczas walki";
  if (item_stats.evade) stats += "<br>Unik: " + item_stats.evade;
  if (item_stats.mana) stats += "<br>Mana: " + item_stats.mana;
  if (item_stats.energy) stats += "<br>Energia: " + item_stats.energy;
  if (item_stats.res_low) stats += "<br>Obniżanie odporności poczas ciosu o " + item_stats.res_low;
  if (item_stats.evade_low) stats += "<br>Podczas ataku unik przeciwnika jest mniejszy o " + item_stats.evade_low;
  if (item_stats.destroy_energy) stats += "<br>Niszczenie " + item_stats.destroy_energy + " energii podczas ciosu";
  if (item_stats.destroy_mana) stats += "<br>Niszczenie " + item_stats.destroy_mana + " many podczas ciosu";
  if (item_stats.slow) stats += "<br>Obniża SA przeciwnika o " + item_stats.slow;
  if (item_stats.sa) stats += "<br> SA " + (item_stats.sa / 100);
  if (item_stats.enemy_sa_red) stats += "<br> Obniża SA przeciwnika o +" + item_stats.enemy_sa_red;
  if (item_stats.destroy_armor) stats += "<br>Niszsczy " + item_stats.destroy_armor + " punktów pacerza podczas ciosu";
  if (item_stats.quant) stats += "Ilość: " + item_stats.quant;
  if (item_stats.enemy_low_hp_reg) stats += "<br>Redukcja leczenia turowego przeciwnika o " + item_stats.enemy_low_hp_reg;
  if (item_stats.enemy_low_armor_des) stats += "<br>Redukcja niszczenia pancerza o " + item_stats.enemy_low_armor_des;
  if (item_stats.enemy_low_energy_des) stats += "<br>Redukcja niszenia pancerza o " + item_stats.enemy_low_energy_des;
  if (item_stats.enemy_low_mana_des) stats += "<br>Redukcja niszenia many o " + item_stats.enemy_low_mana_des;
  if (item_stats.self_dmg) stats += "<br>Zadaje " + item_stats.self_dmg + " obrażeń właścicielowi";
  if (item_stats.crit_low) stats += "<br>Obniża szansę na cios krytyczny przeciwnika o " + item_stats.crit_low;
  if (item_stats.enemy_low_hp_reg) stats += "<br>Obniża leczenie turowe przeciwnika o " + item_stats.enemy_low_hp_reg;
  if (item_stats.pierce_block) stats += "<br>Blok przebicia: " + item_stats.pierce_block;
  if (item_stats.legbon == "cbk") stats += "<br><i><span style='color: #b400a6'>Cios bardzo krytyczny: 10% szansy na podwojenie mocy ciosu krytycznego.</i></span>";
  if (item_stats.legbon == "fo") stats += "<br><i><span style='color: #b400a6'>Fizyczna osłona: obrażenia fizyczne zmniejszone o 12%. </i></span>";
  if (item_stats.legbon == "or") stats += "<br><i><span style='color: #b400a6'>Ostatni ratunek: kiedy po otrzymanym ataku zostanie graczowi mniej niż 12% życia, zostaje jednorazowo uleczony do 30-50% swojego życia.</i> </span>";
  if (item_stats.legbon == "ko") stats += "<br><i><span style='color: #b400a6'>Krytyczna osłona: przyjmowane ciosy krytyczne są o 15% słabsze.</i> </span>";
  if (item_stats.legbon == "da") stats += "<br><i><span style='color: #b400a6'>Dotyk anioła: podczas udanego ataku 5% szansy na ogromne uleczenie ran, nie więcej niż stan początkowego życia.</i> </span>";
  if (item_stats.legbon == "oż") stats += "<br><i><span style='color: #b400a6'>Ochrona żywiołów: 12% szans na podniesienie wszystkich odporności do maksimum (90%) przy przyjmowaniu ciosu magicznego. </i></span>";
  if (item_stats.legbon == "kl") stats += "<br><i><span style='color: #b400a6'>Klątwa: podczas udanego ataku otrzymujesz 7% szans na aktywację klątwy, która zablokuje najbliższą wykonywaną przez przeciwnika akcję. </i></span>";
  if (item_stats.idesc) stats += "<br><br><i>" + item_stats.idesc + "</i>";
  if (item_stats.prof) stats += "<br><span style='color: yellow'>Wymagana profesja: " + item_stats.prof + "</span>";
  if (item_stats.lvl) stats += "<br><span style='color: yellow'>Wymagany poziom: " + item_stats.lvl + "</span>";
  if (item_stats.value) stats += "<br>Wartość: " + item_stats.value;
  return stats;
}

// jazda z umkami

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

var _tempProfSelector = ["trop", "mag", "wojownik", "tancerz", "lowca", "paladyn"]; // całkiem przydatne zeby sprawdzac jaka jest profa wybrana
document.getElementById('profa1').addEventListener("change", function () {
  for (let i = 0; i < 8; i++) {
    if (equip_1[i]) { eraseStatistics(equip_1[i], stats_1); equip_1[i] = ""; userSelection[i].src = "../assets/icons/item-none.png"; userSelection[i].backgroundPosition = "0px 0px" };

  }
  for (let c = 1; c < 5; c++) {
    for (let v = 1; v < 7; v++) {
      document.getElementById('1_' + c + v).setAttribute('value', 0);
    }
  }
  usedUm_1 = 0;
  adjustUM(1);
  updateShiet();
  mistrz_1 = [];
  getMistrz(1)
  for (var i in _tempProfSelector) {
    if ($('#profa1').val() == _tempProfSelector[i]) {
      for (var a = 1; a < 5; a++) {
        for (var b = 1; b < 7; b++) {
          document.getElementById('1_' + a + b).innerHTML = skillBase[_tempProfSelector[i]][_tempProfSelector[i] + "_" + a].skills[b].name;
          if (skillBase[_tempProfSelector[i]][_tempProfSelector[i] + "_" + a].skills[b].isAttack == !0) {
            $('<div><img src="../assets/icons/mieczyki.png"></div></div>')
              .attr({
                'id': 'isAttack_1_' + a + b,
                'class': 'isAttack'
              }).css({
                position: 'absolute',
                height: '20px',
                width:'20px',
                bottom: '0',
                right: '0',
             
              }).appendTo(document.getElementById('1_' + a + b));
          }

          $('<div> 0/10</div>')
            .attr({
              'id': 'points1_' + a + b
            }).css({
              position: 'absolute',
              bottom: '2px',
              left: '2px',
            }).appendTo(document.getElementById('1_' + a + b));
        }
      }
    }
  }
  var attackButtons = document.getElementsByClassName('isAttack');
  console.log(attackButtons)
  for(let v=0; v<attackButtons.length; v++){
    attackButtons[v].addEventListener("mousedown", function (ev) {
      if (ev.which == 1) {
    ev.stopPropagation();
     if (($(this).parent().attr('value') != 0) && (this.id.split('_')[1].split('_')[0] == 1)) {
       mistrz_1.push(skillBase[$('#profa1').val()][$('#profa1').val() + "_" + this.id[11]].skills[this.id[12]].name);
       getMistrz(1);
     }
    }
  })
  }
});

document.getElementById('profa2').addEventListener("change", function () {
  for (let i = 8; i < 16; i++) {
    if (equip_2[i - 8]) { eraseStatistics(equip_2[i - 8], stats_2); equip_2[i - 8] = ""; userSelection[i].src = "../assets/icons/item-none.png"; userSelection[i].backgroundPosition = "0px 0px" };

  }
  usedUm_2 = 0;
  for (let c = 1; c < 5; c++) {
    for (let v = 1; v < 7; v++) {
      document.getElementById('2_' + c + v).setAttribute('value', 0);
    }
  }
  adjustUM(2);
  updateShiet();
  mistrz_2 = [];
  getMistrz(2)
  for (let i in _tempProfSelector) {
    if ($('#profa2').val() == _tempProfSelector[i]) {
      for (let a = 1; a < 5; a++) {
        for (let b = 1; b < 7; b++) {
          document.getElementById('2_' + a + b).innerHTML = skillBase[_tempProfSelector[i]][_tempProfSelector[i] + "_" + a].skills[b].name;
          if (skillBase[_tempProfSelector[i]][_tempProfSelector[i] + "_" + a].skills[b].isAttack == !0) {
            $('<div><img src="../assets/icons/mieczyki.png"></div></div>')
              .attr({
                'id': 'isAttack_2_' + a + b,
                'class': 'isAttack'
              }).css({
                position: 'absolute',
                height: '20px',
                width:'20px',
                bottom: '2px',
                right: '2px',
              
              }).appendTo(document.getElementById('2_' + a + b));
          }
          $('<div>0/10</div>')
            .attr({
              'id': 'points2_' + a + b
            }).css({
              position: 'absolute',
              bottom: '2px',
              left: '2px',
            }).appendTo(document.getElementById('2_' + a + b));
        }
      }
    }
  }
  var attackButtons = document.getElementsByClassName('isAttack');
  console.log(attackButtons)
  for(let v=0; v<attackButtons.length; v++){
    attackButtons[v].addEventListener("mousedown", function (ev) {
      if (ev.which == 1) {
      console.log(this)
    ev.stopPropagation();
     if (($(this).parent().attr('value') != 0) && (this.id.split('_')[1].split('_')[0] == 2)) {
       mistrz_2.push(skillBase[$('#profa2').val()][$('#profa2').val() + "_" + this.id[11]].skills[this.id[12]].name);
       getMistrz(2);
     }
    }
  })
  }
});
// update on change
document.getElementById('player_1_lvl').addEventListener("change", function () {
  updateShiet();
  adjustUM(1);

})
document.getElementById('player_2_lvl').addEventListener("change", function () {
  updateShiet();
  adjustUM(2);
})




function UpdateUmCounter(um) {
  document.getElementById('points' + [um]).innerHTML = document.getElementById([um]).getAttribute('value') + '/10';
}

// dwie pomocnicze funkcje do tipów umek(przerabianie info z bazy)
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

//to jest miazga co tu sie dzieje, ale działa xD
function getUmTip(id_umki) {
  var umTip = "";
  var idMojejProfy;
  for (var i in _tempProfSelector) {
    if (_tempProfSelector[i] == $('#profa' + id_umki.split('_')[0]).val()) idMojejProfy = _tempProfSelector[i];
  }
  umTip += "<i>" + skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].desc + "</i>";

  if (document.getElementById(id_umki).getAttribute('value') != 0) {
    umTip += "<br><br><center>Bieżący poziom</center>" + "<br>" + skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].valdesc;
    if (umTip.indexOf(':a:') != -1) {
      if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler) {
        if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler.a) {
          umTip = replaceAll(umTip, ":a:", (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.a[document.getElementById(id_umki).getAttribute('value') - 1]) * $('#player_' + id_umki.split('_')[0] + '_lvl').val())
        } else {
          umTip = replaceAll(umTip, ":a:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.a[document.getElementById(id_umki).getAttribute('value') - 1])
        }
      } else {
        umTip = replaceAll(umTip, ":a:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.a[document.getElementById(id_umki).getAttribute('value') - 1])
      }
    }
    if (umTip.indexOf(':b:') != -1) {
      if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler) {
        if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler.b) {
          umTip = replaceAll(umTip, ":b:", (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.b[document.getElementById(id_umki).getAttribute('value') - 1]) * $('#player_' + id_umki.split('_')[0] + '_lvl').val())
        } else {
          umTip = replaceAll(umTip, ":b:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.b[document.getElementById(id_umki).getAttribute('value') - 1])
        }
      } else {
        umTip = replaceAll(umTip, ":b:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.b[document.getElementById(id_umki).getAttribute('value') - 1])
      }
    }
    if (umTip.indexOf(':c:') != -1) {
      if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler) {
        if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler.c) {
          umTip = replaceAll(umTip, ":c:", (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.c[document.getElementById(id_umki).getAttribute('value') - 1]) * $('#player_' + id_umki.split('_')[0] + '_lvl').val())
        } else {
          umTip = replaceAll(umTip, ":c:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.c[document.getElementById(id_umki).getAttribute('value') - 1])
        }
      } else {
        umTip = replaceAll(umTip, ":c:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.c[document.getElementById(id_umki).getAttribute('value') - 1])
      }
    }
    if (umTip.indexOf(':d:') != -1) {
      if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler) {
        if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler.d) {
          umTip = replaceAll(umTip, ":d:", (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.d[document.getElementById(id_umki).getAttribute('value') - 1]) * $('#player_' + id_umki.split('_')[0] + '_lvl').val())
        } else {
          umTip = replaceAll(umTip, ":d:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.d[document.getElementById(id_umki).getAttribute('value') - 1])
        }
      } else {
        umTip = replaceAll(umTip, ":d:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.d[document.getElementById(id_umki).getAttribute('value') - 1])
      }
    }
    if (umTip.indexOf(':e:') != -1) {
      if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler) {
        if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler.e) {
          umTip = replaceAll(umTip, ":e:", (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.e[document.getElementById(id_umki).getAttribute('value') - 1]) * $('#player_' + id_umki.split('_')[0] + '_lvl').val())
        } else {
          umTip = replaceAll(umTip, ":e:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.e[document.getElementById(id_umki).getAttribute('value') - 1])
        }
      } else {
        umTip = replaceAll(umTip, ":e:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.e[document.getElementById(id_umki).getAttribute('value') - 1])
      }
    }
  }

  if (document.getElementById(id_umki).getAttribute('value') < 10) {
    umTip += "<br><br><center>Następny poziom</center>" + "<br>" + skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].valdesc;
    if (umTip.indexOf(':a:') != -1) {
      if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler) {
        if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler.a) {
          umTip = replaceAll(umTip, ":a:", (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.a[document.getElementById(id_umki).getAttribute('value')]) * $('#player_' + id_umki.split('_')[0] + '_lvl').val())
        } else {
          umTip = replaceAll(umTip, ":a:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.a[document.getElementById(id_umki).getAttribute('value')])
        }
      } else {
        umTip = replaceAll(umTip, ":a:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.a[document.getElementById(id_umki).getAttribute('value')])
      }
    }
    if (umTip.indexOf(':b:') != -1) {
      if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler) {
        if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler.b) {
          umTip = replaceAll(umTip, ":b:", (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.b[document.getElementById(id_umki).getAttribute('value')]) * $('#player_' + id_umki.split('_')[0] + '_lvl').val())
        } else {
          umTip = replaceAll(umTip, ":b:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.b[document.getElementById(id_umki).getAttribute('value')])
        }
      } else {
        umTip = replaceAll(umTip, ":b:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.b[document.getElementById(id_umki).getAttribute('value')])
      }
    }
    if (umTip.indexOf(':c:') != -1) {
      if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler) {
        if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler.c) {
          umTip = replaceAll(umTip, ":c:", (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.c[document.getElementById(id_umki).getAttribute('value')]) * $('#player_' + id_umki.split('_')[0] + '_lvl').val())
        } else {
          umTip = replaceAll(umTip, ":c:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.c[document.getElementById(id_umki).getAttribute('value')])
        }
      } else {
        umTip = replaceAll(umTip, ":c:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.c[document.getElementById(id_umki).getAttribute('value')])
      }
    }
    if (umTip.indexOf(':d:') != -1) {
      if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler) {
        if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler.d) {
          umTip = replaceAll(umTip, ":d:", (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.d[document.getElementById(id_umki).getAttribute('value')]) * $('#player_' + id_umki.split('_')[0] + '_lvl').val())
        } else {
          umTip = replaceAll(umTip, ":d:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.d[document.getElementById(id_umki).getAttribute('value')])
        }
      } else {
        umTip = replaceAll(umTip, ":d:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.d[document.getElementById(id_umki).getAttribute('value')])
      }
    }
    if (umTip.indexOf(':e:') != -1) {
      if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler) {
        if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].multipler.e) {
          umTip = replaceAll(umTip, ":e:", (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.e[document.getElementById(id_umki).getAttribute('value') - 1]) * $('#player_' + id_umki.split('_')[0] + '_lvl').val())
        } else {
          umTip = replaceAll(umTip, ":e:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.e[document.getElementById(id_umki).getAttribute('value') - 1])
        }
      } else {
        umTip = replaceAll(umTip, ":e:", skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].values.e[document.getElementById(id_umki).getAttribute('value') - 1])
      }
    }
  }
  umTip = replaceAll(umTip, "@", "<br>");
  if (skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].weapon)
    umTip += "<br>Wymagania:  "
  for (var c in skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].weapon) {
    umTip += skillBase[idMojejProfy][idMojejProfy + '_' + id_umki[2]].skills[id_umki[3]].weapon[c] + " "
  }
  return umTip;
}

umClass = document.getElementsByClassName('um');

function adjustUM(player) {
  if ($('#player_1_lvl').val() > 24) {
    document.getElementById('umPoints_1').innerHTML = usedUm_1 + '/' + ($('#player_1_lvl').val() - 24);
  } else {
    document.getElementById('umPoints_1').innerHTML = '0/0';
  }
  if ($('#player_2_lvl').val() > 24) {
    document.getElementById('umPoints_2').innerHTML = usedUm_2 + '/' + ($('#player_2_lvl').val() - 24);
  } else {
    document.getElementById('umPoints_2').innerHTML = '0/0';
  }
  var lvl_2 = $('#player_' + player + '_lvl').val();
  var lvl_1 = $('#player_' + player + '_lvl').val();
  if (lvl_1 > 24) {
    for (let i = 1; i < 7; i++) {
      document.getElementById(player + '_' + 1 + i).setAttribute("enabled", 1);
    }
  } else {
    for (let i = 1; i < 7; i++) {
      document.getElementById(player + '_' + 1 + i).setAttribute("enabled", 0);
    }
  }
  if (lvl_2 > 24) {
    for (let i = 1; i < 7; i++) {
      document.getElementById(2 + '_' + 1 + i).setAttribute("enabled", 1);
    }
  } else {
    for (let i = 1; i < 7; i++) {
      document.getElementById(2 + '_' + 1 + i).setAttribute("enabled", 0);
    }
  }
  if (lvl_1 > 34 && (usedUm_1 >= 10)) {
    for (let i = 1; i < 7; i++) {
      document.getElementById(1 + '_' + 2 + i).setAttribute("enabled", 1);
    }
  } else {
    for (let i = 1; i < 7; i++) {
      document.getElementById(1 + '_' + 2 + i).setAttribute("enabled", 0);
    }
  }
  if (lvl_2 > 34 && (usedUm_2 >= 10)) {
    for (let i = 1; i < 7; i++) {
      document.getElementById(2 + '_' + 2 + i).setAttribute("enabled", 1);
    }
  } else {
    for (let i = 1; i < 7; i++) {
      document.getElementById(2 + '_' + 2 + i).setAttribute("enabled", 0);
    }
  }
  if (lvl_1 > 49 && (usedUm_1 >= 25)) {
    for (let i = 1; i < 7; i++) {
      document.getElementById(1 + '_' + 3 + i).setAttribute("enabled", 1);
    }
  } else {
    for (let i = 1; i < 7; i++) {
      document.getElementById(1 + '_' + 3 + i).setAttribute("enabled", 0);
    }
  }
  if (lvl_2 > 49 && (usedUm_2 >= 25)) {
    for (let i = 1; i < 7; i++) {
      document.getElementById(2 + '_' + 3 + i).setAttribute("enabled", 1);
    }
  } else {
    for (let i = 1; i < 7; i++) {
      document.getElementById(2 + '_' + 3 + i).setAttribute("enabled", 0);
    }
  }
  if (lvl_1 > 79 && (usedUm_1 >= 55)) {
    for (let i = 1; i < 7; i++) {
      document.getElementById(1 + '_' + 4 + i).setAttribute("enabled", 1);
    }
  } else {
    for (let i = 1; i < 7; i++) {
      document.getElementById(1 + '_' + 4 + i).setAttribute("enabled", 0);
    }
  }
  if (lvl_2 > 79 && (usedUm_2 >= 55)) {
    for (let i = 1; i < 7; i++) {
      document.getElementById(2 + '_' + 4 + i).setAttribute("enabled", 1);
    }
  } else {
    for (let i = 1; i < 7; i++) {
      document.getElementById(2 + '_' + 4 + i).setAttribute("enabled", 0);
    }
  }

  for (let i = 0; i < umClass.length; i++) {
    if (umClass[i].getAttribute('enabled') == 1) {
      umClass[i].style.color = 'white';
    } else {
      umClass[i].style.color = '#9b9b9b';
      if (umClass[i].getAttribute('id')[0] == 1) usedUm_1 - umClass[i].getAttribute('value');
      if (umClass[i].getAttribute('id')[0] == 2) usedUm_2 - umClass[i].getAttribute('value');
      umClass[i].setAttribute('value', 0);
    }
  }

}


for (let i = 0; i < umClass.length; i++) {
  umClass[i].addEventListener("mousedown", function (ev) {
    if (ev.which == 1) {
      if (this.id[0] == 1 && (usedUm_1 < $('#player_1_lvl').val() - 24)) {
        if (this.getAttribute('value') < 10 && this.getAttribute('enabled') == 1) {
          this.setAttribute('value', (parseInt(this.getAttribute('value')) + 1))
          UpdateUmCounter(this.id);
          usedUm_1++;
          updateShiet();
          adjustUM(1)
        } else {
          return;
        }
      }
      if (this.id[0] == 2 && (usedUm_2 < $('#player_2_lvl').val() - 24)) {
        if (this.getAttribute('value') < 10 && this.getAttribute('enabled') == 1) {
          this.setAttribute('value', (parseInt(this.getAttribute('value')) + 1))
          UpdateUmCounter(this.id);
          usedUm_2++;
          
          updateShiet();
          adjustUM(2)
        } else {
          return;
        }
      }

    }
  })
  umClass[i].addEventListener("mousedown", function (ev) {
    if (ev.which == 3) {
      if (this.getAttribute('value') > 0) {
        this.setAttribute('value', (parseInt(this.getAttribute('value')) - 1))
        UpdateUmCounter(this.id);
        if (this.id[0] == 1) { usedUm_1--; adjustUM(1); updateShiet(); };
        if (this.id[0] == 2) { usedUm_2--; adjustUM(2); updateShiet(); }
      }
    }
  })
 


  umClass[i].addEventListener("mouseover", function () {
    document.getElementById('tip_um').innerHTML = "<center>Najpierw wybierz profesję!</center>";
    // jakos powinienes ogarac ze niedostepne
    if ($(this).attr('id').split('_')[0] == '1' && $('#profa1').val()) { document.getElementById('tip_um').innerHTML = getUmTip($(this).attr('id')); }
    if ($(this).attr('id').split('_')[0] == '2' && $('#profa2').val()) { document.getElementById('tip_um').innerHTML = getUmTip($(this).attr('id')); }

    $('#tip_um').css("visibility", "visible");
    $('#tip_um').css("left", this.offsetLeft - 100);
    $('#tip_um').css("top", this.offsetTop - $('#tip_um').height() - 15)
  });

  umClass[i].addEventListener("mouseleave", function () {
    // $('#tip_'+i).css("position", "relative");
    $('#tip_um').css("visibility", "hidden");
    $('#tip_um').text("");
  });
}

document.getElementById("mistrz_1").innerHTML = '<div class="container-header">Mistrzostwo walk:</div>';
document.getElementById("mistrz_2").innerHTML = '<div class="container-header">Mistrzostwo walk:</div>';
//mistrzostwo
function getMistrz(playernumber) {
  document.getElementById("mistrz_" + playernumber).innerHTML = '<div class="container-header">Mistrzostwo walk:</div><input id="repeat' + playernumber + '" type="checkbox" title="Powtarzać?">';
  var thatsminemistrz;
  if (playernumber == 1) thatsminemistrz = mistrz_1;
  if (playernumber == 2) thatsminemistrz = mistrz_2;
  for (var i in thatsminemistrz) {
    $('<div><img src="../assets/icons/mieczyki.png">' + thatsminemistrz[i] + '</div>')
      .attr({
        'id': 'mistrz_' + playernumber + '_' + i,
        'class': 'mistrzClick'
      }).appendTo(document.getElementById("mistrz_" + playernumber));
  }
  var masterClick = document.getElementsByClassName('mistrzClick');
for(var d =0; d<masterClick.length;d++){
  masterClick[d].addEventListener("mousedown", function (ev) {
    
    if (ev.which == 3) {
      console.log(this.id)
      if(this.id[7] ==1){
        mistrz_1.splice(this.id.split('_')[2],1);
      getMistrz(1)
      }
      if(this.id[7] ==2){
        mistrz_2.splice(this.id.split('_')[2],1);
        getMistrz(2)
        }
    }
  })
}
}

document.getElementById('clearUM_1').addEventListener("click", function () {

  for (let i = 0; i < umClass.length; i++) {
    if (umClass[i].getAttribute('id')[0] == 1) {
      umClass[i].setAttribute('value', 0);
      UpdateUmCounter(umClass[i].getAttribute('id'))
    }
  }
  usedUm_1 = 0;
  adjustUM(1);
  updateShiet()
})

document.getElementById('save_1').addEventListener("click", function () {

  var Data = {
    eq: JSON.parse(JSON.stringify(equip_1)),
    prof: $('#profa1').val(),
    lvl: $('#player_1_lvl').val(),
    mistrzostwo: JSON.parse(JSON.stringify(mistrz_1)),
    um: getUm(1),
    stats: stats_1,
    usedUm : usedUm_1,
   // repeat: document.getElementById('repeat1').checked
  }
  dialog.showSaveDialog({ filters: [
    { name: 'text', extensions: ['txt'] }
   ]}, function (fileName) {
   if (fileName === undefined) return;
   fs.writeFile(fileName, JSON.stringify(Data), function (err) {   
   });

 }); 
})

document.getElementById('save_2').addEventListener("click", function () {

  var Data = {
    eq: JSON.parse(JSON.stringify(equip_2)),
    prof: $('#profa2').val(),
    lvl: $('#player_2_lvl').val(),
    mistrzostwo: JSON.parse(JSON.stringify(mistrz_2)),
    um: getUm(2),
    stats: stats_2,
    usedUm: usedUm_2,
    //repeat: document.getElementById('repeat2').checked
  }
  dialog.showSaveDialog({ filters: [
    { name: 'text', extensions: ['txt'] }
   ]}, function (fileName) {
   if (fileName === undefined) return;
   fs.writeFile(fileName, JSON.stringify(Data), function (err) {  
   });

 }); 
})



document.getElementById('read_1').addEventListener("click", function () {
  dialog.showOpenDialog({ filters: [
    { name: 'text', extensions: ['txt'] }
   ]}, function (fileNames) {
   if (fileNames === undefined) return;
   var fileName = fileNames[0];
 
   fs.readFile(fileName, 'utf-8', function (err, data) {
    
    for(var b=0;b<8;b++){
    equip_1[b] = JSON.parse(data).eq[b]
    if(equip_1[b]){
      for(var a in document.getElementById('equip_1').childNodes){
        if(document.getElementById('equip_1').childNodes[a].id ==_tempSelect[b]){
          document.getElementById('equip_1').childNodes[a].src= ("../assets/itemy/" + equip_1[b].img);
          document.getElementById('equip_1').childNodes[a].style.backgroundPosition = setborder(equip_1[b].class)
        }
      }
    }
    }
    $('#profa1').val(JSON.parse(data).prof);
    $('#player_1_lvl').val(JSON.parse(data).lvl);
    mistrz_1 = JSON.parse(data).mistrzostwo;
    stats_1 = JSON.parse(data).stats; 
    usedUm_1= JSON.parse(data).usedUm;
    //document.getElementById('repeat1').checked = (JSON.parse(data).repeat);
    getMistrz(1);

    for (var g = 1; g < 5; g++) {
      for (var h = 1; h < 7; h++) {
         document.getElementById('1_' + g + h).setAttribute('value', JSON.parse(data).um['um' + g + '_' + h]);
         document.getElementById('1_' + g+h).innerHTML = skillBase[JSON.parse(data).prof][JSON.parse(data).prof + "_" + g].skills[h].name;
         if (skillBase[JSON.parse(data).prof][JSON.parse(data).prof + "_" + g].skills[h].isAttack == !0) {
           $('<div><img src="../assets/icons/mieczyki.png"></div></div>')
             .attr({
               'id': 'isAttack_1_' + g+h,
               'class': 'isAttack'
             }).css({
               position: 'absolute',
               height: '20px',
                width:'20px',
               bottom: '2px',
               right: '2px',
            
             }).appendTo(document.getElementById('1_' + g+h));
         }
         $('<div> '+ document.getElementById('1_' + g + h).getAttribute('value') +'/10</div>')
           .attr({
             'id': 'points1_' + g+h
           }).css({
             position: 'absolute',
             bottom: '2px',
             left: '2px',
           }).appendTo(document.getElementById('1_' + g+h));
      }
    }
   

    var attackButtons = document.getElementsByClassName('isAttack');

    for(let v=0; v<attackButtons.length; v++){
      attackButtons[v].addEventListener("mousedown", function (ev) {
        if (ev.which == 1) {
      ev.stopPropagation();
       if (($(this).parent().attr('value') != 0) && (this.id.split('_')[1].split('_')[0] == 1)) {
         mistrz_1.push(skillBase[$('#profa1').val()][$('#profa1').val() + "_" + this.id[11]].skills[this.id[12]].name);
         getMistrz(1);
       }
      }
    })
    }
    adjustUM(1);
    updateShiet();
   });
  }); 

 

})

document.getElementById('read_2').addEventListener("click", function () {
  dialog.showOpenDialog({ filters: [
    { name: 'text', extensions: ['txt'] }
   ]}, function (fileNames) {
   if (fileNames === undefined) return;
   var fileName = fileNames[0];
 
   fs.readFile(fileName, 'utf-8', function (err, data) {
    
    for(var b=0;b<8;b++){
    equip_2[b] = JSON.parse(data).eq[b]
    if(equip_2[b]){
      for(var a in document.getElementById('equip_2').childNodes){
        if(document.getElementById('equip_2').childNodes[a].id ==_tempSelect[b]){
          document.getElementById('equip_2').childNodes[a].src= ("../assets/itemy/" + equip_2[b].img);
          document.getElementById('equip_2').childNodes[a].style.backgroundPosition = setborder(equip_2[b].class)
        }
      }
    }
    }
    $('#profa2').val(JSON.parse(data).prof);
    $('#player_2_lvl').val(JSON.parse(data).lvl);
    mistrz_2 = JSON.parse(data).mistrzostwo;
    stats_2 = JSON.parse(data).stats; 
    usedUm_2= JSON.parse(data).usedUm;
    //document.getElementById('repeat1').checked = (JSON.parse(data).repeat);
    getMistrz(2);

    for (var g = 1; g < 5; g++) {
      for (var h = 1; h < 7; h++) {
         document.getElementById('2_' + g + h).setAttribute('value', JSON.parse(data).um['um' + g + '_' + h]);
         document.getElementById('2_' + g+h).innerHTML = skillBase[JSON.parse(data).prof][JSON.parse(data).prof + "_" + g].skills[h].name;
         if (skillBase[JSON.parse(data).prof][JSON.parse(data).prof + "_" + g].skills[h].isAttack == !0) {
           $('<div><img src="../assets/icons/mieczyki.png"></div></div>')
             .attr({
               'id': 'isAttack_2_' + g+h,
               'class': 'isAttack'
             }).css({
               position: 'absolute',
               height: '20px',
                width:'20px',
               bottom: '2px',
               right: '2px',
            
             }).appendTo(document.getElementById('2_' + g+h));
         }
         $('<div> '+ document.getElementById('2_' + g + h).getAttribute('value') +'/10</div>')
           .attr({
             'id': 'points2_' + g+h
           }).css({
             position: 'absolute',
             bottom: '2px',
             left: '2px',
           }).appendTo(document.getElementById('2_' + g+h));
      }
    }

    var attackButtons = document.getElementsByClassName('isAttack');
  
    for(let v=0; v<attackButtons.length; v++){
      attackButtons[v].addEventListener("mousedown", function (ev) {
        if (ev.which == 1) {
      ev.stopPropagation();
       if (($(this).parent().attr('value') != 0) && (this.id.split('_')[1].split('_')[0] == 2)) {
         mistrz_2.push(skillBase[$('#profa2').val()][$('#profa2').val() + "_" + this.id[11]].skills[this.id[12]].name);
         getMistrz(2);
       }
      }
    })
    }
    adjustUM(2);
    updateShiet();
   });
  }); 

})

document.getElementById('clearUM_2').addEventListener("click", function () {
  for (let i = 0; i < umClass.length; i++) {
    if (umClass[i].getAttribute('id')[0] == 2) {
      umClass[i].setAttribute('value', 0);
      UpdateUmCounter(umClass[i].getAttribute('id'))
    }
  }
  usedUm_2 = 0;
  adjustUM(2); 
  updateShiet();
})


// tu sie uwzgledniaja wartosci z um, do wyswietlenia w statach
function finalStats(stats, lvl, profa, playerNumber) {
  let statsCopy = JSON.parse(JSON.stringify(stats));
  for (let k = 0; k < Object.keys(statsCopy).length; k++) {
    if (Object.values(statsCopy)[0] != Object.values(stats)[0]) {
      Object.values(stats)[0] = Object.values(statsCopy)[0];
    }

  }

  //console.log(Object.values(statsCopy)[0])
  var umLvl = 0;
  if (profa == "trop") {
    if (document.getElementById(playerNumber + '_11').getAttribute('value') != 0) {
      statsCopy.ice_dmg = stats.ice_dmg + 0.3 * stats.ice_dmg;
    }
    if (document.getElementById(playerNumber + '_12').getAttribute('value') != 0) {
      statsCopy.fire_dmg = stats.fire_dmg + 0.3 * stats.fire_dmg;
    }
    if (document.getElementById(playerNumber + '_13').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_13').getAttribute('value');
      statsCopy.flash_dmg_min = stats.flash_dmg_max * skillBase.trop.trop_1.skills[3].values.e[umLvl - 1] + 0.3 * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());;
      statsCopy.flash_dmg_max = stats.flash + 0.3 * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_14').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_14').getAttribute('value');
      statsCopy.dmg_min = stats.dmg_min + 0.2 * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())
      statsCopy.dmg_max = stats.dmg_max + 0.2 * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())

    }
    if (document.getElementById(playerNumber + '_15').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_15').getAttribute('value');
      statsCopy.energy = stats.energy + skillBase.trop.trop_1.skills[5].values.a[umLvl - 1];
      statsCopy.mana = stats.mana + skillBase.trop.trop_1.skills[5].values.c[umLvl - 1] + getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val()) * skillBase.trop.trop_1.skills[5].values.d[umLvl - 1];
    }
    if (document.getElementById(playerNumber + '_16').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_16').getAttribute('value');
      statsCopy.hp = stats.hp + skillBase.trop.trop_1.skills[6].values.a[umLvl - 1] * lvl;
    }
    if (document.getElementById(playerNumber + '_21').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_21').getAttribute('value');
      statsCopy.sa = stats.sa + skillBase.trop.trop_2.skills[1].values.a[umLvl - 1] * lvl;
    }
    if (document.getElementById(playerNumber + '_23').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_23').getAttribute('value');
      statsCopy.abs_fiz = stats.abs_fiz + (skillBase.trop.trop_2.skills[3].values.a[umLvl - 1] / 100) * stats.abs_fiz;
      statsCopy.abs = stats.abs + (skillBase.trop.trop_2.skills[3].values.c[umLvl - 1] / 100) * stats.abs;
    }
    if (document.getElementById(playerNumber + '_24').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_24').getAttribute('value');
      statsCopy.evade = stats.evade + (skillBase.trop.trop_2.skills[4].values.a[umLvl - 1] / 100) * lvl / 40;
    }
    if (document.getElementById(playerNumber + '_26').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_26').getAttribute('value');
      statsCopy.dmg_min = stats.dmg_min + 0.1 * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())
      statsCopy.dmg_max = stats.dmg_max + 0.1 * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())

    }
    if (document.getElementById(playerNumber + '_33').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_33').getAttribute('value');
      statsCopy.crit_val = stats.crit_val + skillBase.trop.trop_3.skills[3].values.a[umLvl - 1]
    }
    if (document.getElementById(playerNumber + '_41').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_41').getAttribute('value');
      statsCopy.dmg_min = stats.dmg_min + (skillBase.trop.trop_4.skills[1].values.b[umLvl - 1] / 100) * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())
      statsCopy.dmg_max = stats.dmg_max + (skillBase.trop.trop_4.skills[1].values.b[umLvl - 1] / 100) * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())
      statsCopy.crit = stats.crit + (skillBase.trop.trop_4.skills[1].values.a[umLvl - 1] / 100)
    }
    if (document.getElementById(playerNumber + '_43').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_43').getAttribute('value');
      statsCopy.fire_dmg = stats.fire_dmg + (skillBase.trop.trop_4.skills[3].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())
      statsCopy.crit_m = stats.crit_m + (skillBase.trop.trop_4.skills[3].values.a[umLvl - 1] / 100)
    }
    if (document.getElementById(playerNumber + '_44').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_44').getAttribute('value');
      statsCopy.flash_dmg_max = (stats.flash_dmg_max + skillBase.trop.trop_4.skills[4].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())
      statsCopy.flash_dmg_mmin = (stats.flash_dmg_min + skillBase.trop.trop_4.skills[4].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())

      statsCopy.crit_m = stats.crit_m + (skillBase.trop.trop_4.skills[4].values.a[umLvl - 1] / 100)
    }
    if (document.getElementById(playerNumber + '_45').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_45').getAttribute('value');
      statsCopy.ice_dmg = stats.ice_dmg + (skillBase.trop.trop_4.skills[5].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())
      statsCopy.crit_m = stats.crit_m + (skillBase.trop.trop_4.skills[5].values.a[umLvl - 1] / 100)
    }
    if (document.getElementById(playerNumber + '_46').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_46').getAttribute('value');
      statsCopy.sa = stats.sa + (skillBase.trop.trop_4.skills[6].values.a[umLvl - 1] / 100) * statsCopy.sa;
    }
  }//koniec um na tropa
  if (profa == "mag") {
    if (document.getElementById(playerNumber + '_11').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_11').getAttribute('value');
      statsCopy.mana = stats.mana + skillBase.mag.mag_1.skills[1].values.a[umLvl - 1] + skillBase.mag.mag_1.skills[1].values.b[umLvl - 1] * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_12').getAttribute('value') != 0) {
      statsCopy.fire_dmg = stats.fire_dmg + 0.2 * statsCopy.fire_dmg;
    }
    if (document.getElementById(playerNumber + '_13').getAttribute('value') != 0) {
      statsCopy.ice_dmg = stats.ice_dmg + 0.2 * statsCopy.ice_dmg;
    }
    if (document.getElementById(playerNumber + '_14').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_14').getAttribute('value');
      statsCopy.flash_dmg_min = stats.flash_dmg_min + statsCopy.flash_dmg_max * skillBase.mag.mag_1.skills[4].values.c[umLvl - 1] + 0.2 * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.flash_dmg_max = stats.flash_dmg_max + 0.2 * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_16').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_16').getAttribute('value');
      statsCopy.hp = stats.hp + skillBase.mag.mag_1.skills[6].values.a[umLvl - 1] * lvl;
    }
    if (document.getElementById(playerNumber + '_21').getAttribute('value') != 0) {
      statsCopy.flash_dmg_min = stats.flash_dmg_min + 0.1 * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.flash_dmg_max = stats.flash_dmg_max + 0.1 * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_22').getAttribute('value') != 0) {
      statsCopy.fire_dmg = stats.fire_dmg + 0.1 * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_23').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_23').getAttribute('value');
      statsCopy.sa = stats.sa + skillBase.mag.mag_2.skills[3].values.a[umLvl - 1] * lvl;
    }
    if (document.getElementById(playerNumber + '_25').getAttribute('value') != 0) {
      statsCopy.ice_dmg = stats.ice_dmg + 0.1 * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_26').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_26').getAttribute('value');
      statsCopy.ice_dmg = stats.ice_dmg + (skillBase.mag.mag_2.skills[6].values.a[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.fire_dmg = stats.fire_dmg + (skillBase.mag.mag_2.skills[6].values.a[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.flash_dmg_max = stats.flash_dmg_max + (skillBase.mag.mag_2.skills[6].values.a[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.flash_dmg_min = stats.flash_dmg_min + (skillBase.mag.mag_2.skills[6].values.a[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_34').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_34').getAttribute('value');
      statsCopy.crit_val = stats.crit_val + skillBase.mag.mag_3.skills[4].values.a[umLvl - 1];
    }
    if (document.getElementById(playerNumber + '_36').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_36').getAttribute('value');
      statsCopy.abs_fiz = stats.abs_fiz + (skillBase.mag.mag_3.skills[6].values.a[umLvl - 1] / 100);
      statsCopy.abs = stats.abs + (skillBase.mag.mag_3.skills[6].values.a[umLvl - 1] / 100);
    }
    if (document.getElementById(playerNumber + '_41').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_41').getAttribute('value');
      statsCopy.flash_dmg_max = stats.flash_dmg_max + (skillBase.mag.mag_4.skills[1].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.flash_dmg_min = stats.flash_dmg_min + (skillBase.mag.mag_4.skills[1].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.crit_m = stats.crit_m + (skillBase.mag.mag_4.skills[1].values.a[umLvl - 1] / 100)
    }
    if (document.getElementById(playerNumber + '_42').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_42').getAttribute('value');
      statsCopy.ice_dmg = stats.ice_dmg + (skillBase.mag.mag_4.skills[2].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.crit_m = stats.crit_m + (skillBase.mag.mag_4.skills[2].values.a[umLvl - 1] / 100)
    }
    if (document.getElementById(playerNumber + '_44').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_44').getAttribute('value');
      statsCopy.fire_dmg = stats.fire_dmg + (skillBase.mag.mag_4.skills[4].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.crit_m = stats.crit_m + (skillBase.mag.mag_4.skills[4].values.a[umLvl - 1] / 100)
    }
    if (document.getElementById(playerNumber + '_46').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_46').getAttribute('value');
      statsCopy.hp_reg = stats.hp_reg + (skillBase.mag.mag_4.skills[6].values.a[umLvl - 1] / 100) * statsCopy.hp.reg;
    }
  }// koniec maga
  if (profa == "wojownik") {
    if (document.getElementById(playerNumber + '_11').getAttribute('value') != 0) {
      statsCopy.dmg_max = stats.dmg_max + 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_min = stats.dmg_min + 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_14').getAttribute('value') != 0) {
      statsCopy.dmg_max = stats.dmg_max + 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_min = stats.dmg_min + 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_15').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_15').getAttribute('value');
      statsCopy.energy = stats.energy + skillBase.wojownik.wojownik_1.skills[5].values.a[umLvl - 1];
    }
    if (document.getElementById(playerNumber + '_16').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_16').getAttribute('value');
      statsCopy.hp = stats.hp + skillBase.wojownik.wojownik_1.skills[6].values.a[umLvl - 1] * lvl;
    }
    if (document.getElementById(playerNumber + '_21').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_21').getAttribute('value');
      statsCopy.dmg_min = stats.dmg_min + (skillBase.wojownik.wojownik_2.skills[1].values.b[umLvl - 1] / 100) * statsCopy.dmg_min;
      statsCopy.dmg_max = stats.dmg_max + (skillBase.wojownik.wojownik_2.skills[1].values.b[umLvl - 1] / 100) * statsCopy.dmg_max;
      if ((playernumber == 1 && equip_2[6] == "") || playerNumber == 2 && equip_2[6] == "") {
        statsCopy.dmg_max = stats.dmg_max + 0.1 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
        statsCopy.dmg_min = stats.dmg_min + 0.1 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      }
    }
    if (document.getElementById(playerNumber + '_24').getAttribute('value') != 0) {
      statsCopy.dmg_max = stats.dmg_max + 0.1 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_min = stats.dmg_min + 0.1 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_25').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_25').getAttribute('value');
      statsCopy.sa = stats.sa + skillBase.wojownik.wojownik_2.skills[5].values.a[umLvl - 1] * lvl;
    }
    if (document.getElementById(playerNumber + '_32').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_32').getAttribute('value');
      statsCopy.crit_val = stats.crit_val + (skillBase.wojownik.wojownik_3.skills[2].values.a[umLvl - 1] );
    }
    if (document.getElementById(playerNumber + '_33').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_33').getAttribute('value');
      statsCopy.poison_res = stats.poison_res + skillBase.wojownik.wojownik_3.skills[3].values.a[umLvl - 1];
    }
    if (document.getElementById(playerNumber + '_36').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_36').getAttribute('value');
      if ((playernumber == 1 && equip_2[6] != "") || playerNumber != 2 && equip_2[6] != "") {
        statsCopy.block = stats_block + (skillBase.wojownik.wojownik_3.skills[6].values.a[umLvl - 1] / 100) * statsCopy.block;
      }
    }
    if (document.getElementById(playerNumber + '_42').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_42').getAttribute('value');
      statsCopy.hp = stats.hp + skillBase.wojownik.wojownik_4.skills[2].values.a[umLvl - 1] * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_46').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_46').getAttribute('value');
      if ((playerNumber == 1 && equip_1[6] != "") || playerNumber != 2 && equip_2[6] != "") {
        statsCopy.dmg_max= stats.dmg_max + (skillBase.wojownik.wojownik_4.skills[6].values.b[umLvl - 1] / 100) * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
        statsCopy.dmg_min= stats.dmg_min + (skillBase.wojownik.wojownik_4.skills[6].values.b[umLvl - 1] / 100) * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());

      }
      if ((playerNumber == 1 && equip_1[6] == "") || playerNumber != 2 && equip_2[6] == "") {
        statsCopy.dmg_max= stats.dmg_max + (skillBase.wojownik.wojownik_4.skills[6].values.a[umLvl - 1] / 100) * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
        statsCopy.dmg_min= stats.dmg_min + (skillBase.wojownik.wojownik_4.skills[6].values.a[umLvl - 1] / 100) * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());

      }
    }
  } //koniec woja
  if (profa == "tancerz") {
    if (document.getElementById(playerNumber + '_11').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_11').getAttribute('value');
      statsCopy.poison_dmg = stats.poison_dmg + (skillBase.tancerz.tancerz_1.skills[1].values.a[umLvl - 1] / 100) * statsCopy.poison_dmg;
    }
    if (document.getElementById(playerNumber + '_12').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_12').getAttribute('value');
      statsCopy.gr_second = stats.gr_second + (skillBase.tancerz.tancerz_1.skills[2].values.a[umLvl - 1] / 100) * statsCopy.gr_second;
    }
    if (document.getElementById(playerNumber + '_13').getAttribute('value') != 0) { //
      statsCopy.dmg_second_min = stats.dmg_second_min + 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_second_max = stats.dmg_second_min + 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_14').getAttribute('value') != 0) { //
      statsCopy.dmg_min = stats.dmg_min + 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_max = stats.dmg_max + 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_15').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_15').getAttribute('value');
      statsCopy.energy = stats.energy + skillBase.tancerz.tancerz_1.skills[5].values.a[umLvl - 1];
    }
    if (document.getElementById(playerNumber + '_16').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_16').getAttribute('value');
      statsCopy.hp = stats.hp + skillBase.tancerz.tancerz_1.skills[6].values.a[umLvl - 1] * lvl;
    }
    if (document.getElementById(playerNumber + '_21').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_21').getAttribute('value');
      statsCopy.sa = stats.sa + skillBase.tancerz.tancerz_2.skills[1].values.a[umLvl - 1]*lvl;
    }
    if (document.getElementById(playerNumber + '_22').getAttribute('value') != 0) { //
      statsCopy.dmg_second_min = stats.dmg_second_min + 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_second_max = stats.dmg_second_min + 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_23').getAttribute('value') != 0) { //
      statsCopy.dmg_min = stats.dmg_min + 0.1 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_max = stats.dmg_max + 0.1 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_24').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_24').getAttribute('value');
      statsCopy.evade = stats.evade + (skillBase.tancerz.tancerz_2.skills[4].values.a[umLvl - 1]) * lvl / 40;
    }
    if (document.getElementById(playerNumber + '_33').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_33').getAttribute('value');
      statsCopy.crit_val = stats.crit_val + (skillBase.tancerz.tancerz_3.skills[3].values.a[umLvl - 1] );
    }
    if (document.getElementById(playerNumber + '_34').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_34').getAttribute('value');
      statsCopy.evade_low = stats.evade_low + (skillBase.tancerz.tancerz_3.skills[4].values.a[umLvl - 1] / 100) * lvl / 40;
    }
    if (document.getElementById(playerNumber + '_41').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_41').getAttribute('value');
      statsCopy.crit_second_val = stats.crit_val  + (skillBase.tancerz.tancerz_4.skills[1].values.a[umLvl - 1]);
      statsCopy.dmg_second_max = stats.dmg_second_max + (skillBase.tancerz.tancerz_4.skills[1].values.b[umLvl - 1] / 100) * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_second_min = stats.dmg_second_min + (skillBase.tancerz.tancerz_4.skills[1].values.b[umLvl - 1] / 100) * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_42').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_42').getAttribute('value');
      statsCopy.crit_second = stats.crit_second + (skillBase.tancerz.tancerz_4.skills[2].values.a[umLvl - 1] / 100);
    }
    if (document.getElementById(playerNumber + '_45').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_45').getAttribute('value');
      statsCopy.crit = stats.crit + (skillBase.tancerz.tancerz_4.skills[5].values.a[umLvl - 1] / 100);
      statsCopy.crit_second = stats.crit_second + (skillBase.tancerz.tancerz_4.skills[5].values.a[umLvl - 1] / 100);
      statsCopy.dmg_min = stats.dmg_min + (skillBase.tancerz.tancerz_4.skills[5].values.b[umLvl - 1] / 100) * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_max = stats.dmg_max + (skillBase.tancerz.tancerz_4.skills[5].values.b[umLvl - 1] / 100) * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
  }// koniec tanca

  if (profa == "lowca") {
    if (document.getElementById(playerNumber + '_11').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_11').getAttribute('value');
      statsCopy.energy = stats.energy + skillBase.lowca.lowca_1.skills[1].values.a[umLvl - 1];
    }
    if (document.getElementById(playerNumber + '_12').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_12').getAttribute('value');
      statsCopy.dmg_min = stats.dmg_min + 0.2 * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_max = stats.dmg_max + 0.2 * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_13').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_13').getAttribute('value');
      statsCopy.dmg_max = stats.dmg_max + (skillBase.lowca.lowca_1.skills[3].values.d[umLvl - 1] / 100) * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_min = stats.dmg_min + (skillBase.lowca.lowca_1.skills[3].values.d[umLvl - 1] / 100) * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_16').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_16').getAttribute('value');
      statsCopy.hp = stats.hp + skillBase.lowca.lowca_1.skills[6].values.a[umLvl - 1] * lvl;
    }
    if (document.getElementById(playerNumber + '_21').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_21').getAttribute('value');
      statsCopy.sa = stats.sa + (skillBase.lowca.lowca_1.skills[1].values.a[umLvl - 1]*lvl);
    }
    if (document.getElementById(playerNumber + '_23').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_23').getAttribute('value');
      statsCopy.dmg_max = stats.dmg_max + 0.1 * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_min = stats.dmg_min + 0.1 * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_25').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_25').getAttribute('value');
      statsCopy.evade = stats.evade + (skillBase.lowca.lowca_2.skills[5].values.a[umLvl - 1] / 100) * lvl / 40;
    }
    if (document.getElementById(playerNumber + '_31').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_31').getAttribute('value');
      statsCopy.sa = stats.sa + skillBase.lowca.lowca_3.skills[1].values.a[umLvl - 1]*statsCopy.sa;
    }
    if (document.getElementById(playerNumber + '_35').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_35').getAttribute('value');
      statsCopy.crit_val = stats.crit_val + skillBase.lowca.lowca_3.skills[5].values.a[umLvl - 1];
    }
    if (document.getElementById(playerNumber + '_46').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_46').getAttribute('value');
      statsCopy.crit = stats.crit + (skillBase.lowca.lowca_4.skills[6].values.a[umLvl - 1] / 100);
      statsCopy.dmg_max = stats.dmg_max + (skillBase.lowca.lowca_4.skills[6].values.b[umLvl - 1] / 100) * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_min = stats.dmg_min + (skillBase.lowca.lowca_4.skills[6].values.b[umLvl - 1] / 100) * getAgility($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
  }//koniec lowcy
  if (profa == "paladyn") {
    if (document.getElementById(playerNumber + '_11').getAttribute('value') != 0) {
      statsCopy.ice_dmg = stats.ice_dmg + 0.3 * stats.ice_dmg;
    }
    if (document.getElementById(playerNumber + '_12').getAttribute('value') != 0) {
      statsCopy.fire_dmg = stats.fire_dmg + 0.3 * stats.fire_dmg;
    }
    if (document.getElementById(playerNumber + '_13').getAttribute('value') != 0) {
      statsCopy.dmg_max = 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_min = 0.2 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_14').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_14').getAttribute('value');
      statsCopy.flash_dmg_min = stats.flash_dmg_max * skillBase.paladyn.paladyn_1.skills[4].values.d[umLvl - 1] + 0.3 * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.flash_dmg_max = stats.flash_dmg_max + 0.3 * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_15').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_15').getAttribute('value');
      statsCopy.energy = stats.energy + skillBase.paladyn.paladyn_1.skills[5].values.a[umLvl - 1];
      statsCopy.mana = stats.mana + skillBase.paladyn.paladyn_1.skills[5].values.c[umLvl - 1] + getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val()) * skillBase.paladyn.paladyn_1.skills[5].values.d[umLvl - 1];
    }
    if (document.getElementById(playerNumber + '_16').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_16').getAttribute('value');
      statsCopy.hp = stats.hp + skillBase.paladyn.paladyn_1.skills[6].values.a[umLvl - 1] * lvl;
    }
    if (document.getElementById(playerNumber + '_22').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_22').getAttribute('value');
      statsCopy.sa = stats.sa + skillBase.paladyn.paladyn_2.skills[2].values.a[umLvl - 1] * lvl;
    }
    if (document.getElementById(playerNumber + '_24').getAttribute('value') != 0) { //
      umLvl = document.getElementById(playerNumber + '_24').getAttribute('value');
      statsCopy.evade_low = stats.evade_low + (skillBase.paladyn.paladyn_2.skills[4].values.a[umLvl - 1] / 100) * lvl / 40;
    }
    if (document.getElementById(playerNumber + '_25').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_25').getAttribute('value');
      statsCopy.block = stats.block + (skillBase.paladyn.paladyn_2.skills[5].values.a[umLvl - 1] * lvl / 100) * stats.block;
    }
    if (document.getElementById(playerNumber + '_26').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_26').getAttribute('value');
      statsCopy.dmg_min = stats.dmg_min + 0.1 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_max = stats.dmg_max + 0.1 * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_34').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_34').getAttribute('value');
      statsCopy.crit_val = stats.crit_val + skillBase.paladyn.paladyn_3.skills[4].values.a[umLvl - 1];
    }
    if (document.getElementById(playerNumber + '_41').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_41').getAttribute('value');
      statsCopy.crit = stats.crit + (skillBase.paladyn.paladyn_4.skills[1].values.a[umLvl - 1] / 100)
      statsCopy.dmg_min = stats.dmg_min + (skillBase.paladyn.paladyn_4.skills[1].values.b[umLvl - 1] * lvl / 100) * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
      statsCopy.dmg_max = stats.dmg_max + (skillBase.paladyn.paladyn_4.skills[1].values.b[umLvl - 1] * lvl / 100) * getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());
    }
    if (document.getElementById(playerNumber + '_44').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_44').getAttribute('value');
      statsCopy.fire_dmg = stats.fire_dmg + (skillBase.paladyn.paladyn_4.skills[4].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())
      statsCopy.crit_m = stats.crit_m + (skillBase.paladyn.paladyn_4.skills[4].values.a[umLvl - 1] / 100)
    }
    if (document.getElementById(playerNumber + '_45').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_45').getAttribute('value');
      statsCopy.flash_dmg_max = (stats.flash_dmg_max + skillBase.paladyn.paladyn_4.skills[5].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())
      statsCopy.flash_dmg_mmin = (stats.flash_dmg_min + skillBase.paladyn.paladyn_4.skills[5].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())
      statsCopy.crit_m = stats.crit_m + (skillBase.paladyn.paladyn_4.skills[5].a[umLvl - 1] / 100)
    }
    if (document.getElementById(playerNumber + '_46').getAttribute('value') != 0) {
      umLvl = document.getElementById(playerNumber + '_46').getAttribute('value');
      statsCopy.ice_dmg = stats.ice_dmg + (skillBase.paladyn.paladyn_4.skills[6].values.b[umLvl - 1] / 100) * getIntellect($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val())
      statsCopy.crit_m = stats.crit_m + (skillBase.paladyn.paladyn_4.skills[6].values.a[umLvl - 1] / 100)
    }
  }//koniec um na pala

  return statsCopy;
}//koniec calej funkcji
//* getStrength($('#profa' + playerNumber).val(), stats, $('#player_' + playerNumber + '_lvl').val());


