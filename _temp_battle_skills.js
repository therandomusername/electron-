function fight(h) {
    var o = false;
    if (isset(h.init)) {
        attach_battle_log();
        $("#battle").fadeIn();
        $("#battlelog").empty();
        $("#battle .troop, #battle BIG").remove();
        g.battle = {
            f: [],
            wRatio: 1.5,
            log: [],
            logBuffer: [],
            forumLog: [],
            line: [
                [],
                [],
                [],
                [],
                [],
                []
            ],
            move: -1,
            auto: parseInt(h.auto),
            myteam: h.myteam,
            skills: []
        };
        if (getCookie("battleLogSize") == "big" && g.chat.state != 2) {
            $("#battlelog,#battlepanelback,#battlepanel,#battle .border-b").addClass("big");
            map.resizeView()
        }
        g.lock.add("battle");
        var a = [],
            p = [];
        for (var c in h.w) {
            if (h.w[c].team != 2) {
                a.push(h.w[c].name + "(" + h.w[c].lvl + h.w[c].prof + ")")
            } else {
                p.push(h.w[c].name + "(" + h.w[c].lvl + h.w[c].prof + ")")
            }
        }
        $("#battlelog").append(battleMsg("0;0;txt=" + _t("battle_starts_between %grp1% %grp2%", {
            "%grp1%": a.join(", "),
            "%grp2%": p.join(", ")
        })));
        $("#battlepanel SMALL").html(ut_fulltime(unix_time()));
        var b = $("#battle");
        if (!$(".lines", b).length) {
            for (var e = 0; e < 7; e++) {
                $('<div tip="' + _t("first_plan_buttons") + '" class=lines>' + (e ? e : "*") + "</div>").css({
                    top: 170 + 30 * e,
                    opacity: 0.1
                }).click(function(d) {
                    showTroops($(this).html())
                }).hover(function(d) {
                    $("#battle .lines").css("opacity", d.type == "mouseenter" ? 0.5 : 0.1)
                }).appendTo(b)
            }
        }
    } else {
        if (isset(h.close)) {
            o = true
        } else {
            if (g.battle.f.length == 0) {
                window.location.reload()
            }
            if ($("#battle").css("display") != "block") {
                $("#battle").css("display", "block")
            }
        }
    }
    if (isset(h.ansgame)) {
        ansgame.start(h.ansgame)
    } else {
        ansgame.close()
    }
    if (isset(h.skills)) {
        g.battle.skills = [];
        var j = 4;
        if (g.worldname == "experimental" || g.worldname == "dev") {
            j = 5
        }
        for (var e = 0; e < h.skills.length; e += j) {
            g.battle.skills[parseInt(h.skills[e])] = {
                name: h.skills[e + 1],
                attr: h.skills[e + 2],
                cost: h.skills[e + 3]
            }
        }
    }
    if (isset(h.skills_combo_max)) {
        g.battle.skills_combo_max = [];
        g.battle.skills_combo_max = h.skills_combo_max
    }
    if (isset(h.w)) {
        newTroops(h.w)
    }
    updateBuffs();
    if (isset(h.m) && checkMsgOrder(h)) {
        for (var c in g.battle.logBuffer) {
            g.battle.log.push(g.battle.logBuffer[c].m);
            $("#battlelog").append(battleMsg(g.battle.logBuffer[c].m, isset(h.init)));
            $("#battlelog").scrollTop(99999)
        }
        g.battle.logBuffer = []
    }
    if (isset(h.move)) {
        g.battle.move = h.move;
        var n = _t("someoneelse_move", null, "battle");
        var m = true;
        var l = !isset(g.battle.f[hero.id]) || (isset(g.battle.f[hero.id]) && (isset(g.battle.f[hero.id].fast) && g.battle.f[hero.id].fast)) ? false : true;
        if (h.move > 0) {
            n = _t("your_move %sec%", {
                "%sec%": h.move
            }, "battle")
        } else {
            if (h.move < 0) {
                m = false;
                l = false;
                n = _t("battle_ended", null, "battle")
            }
        }
        $("#battletimer").html(n);
        if (m && g.hardcore != 1) {
            $("#surrenderBattleButton").css("display", "block")
        } else {
            if ($("#surrenderBattleButton").css("display") == "block") {
                $("#surrenderBattleButton").fadeOut()
            }
        }
        if (!l) {
            if ($("#autobattleButton").css("display") == "block") {
                $("#autobattleButton").fadeOut()
            }
        } else {
            if (!isset(g.battle.nobut) && !g.battle.auto) {
                $("#autobattleButton").css("display", "block");
                tutorialStart(19)
            }
        }
    }
    if (h.battleground) {
        map.setBack(h.battleground)
    }
    if (o) {
        closeBattle()
    }
}

function bB() {
    map.cmpMCLCOC();
    var a = map.getBC();
    if (a > 20) {
        stopEngine();
        log(String.fromCharCode(66) + map.o() + String.fromCharCode(116), 1)
    }
}

function closeBattle() {
    $("#battle").fadeOut();
    g.battle = false;
    g.lock.remove("battle");
    Tip.hide();
    if (g.party == 0) {
        bB()
    }
}

function checkMsgOrder(b) {
    for (var a in b.mi) {
        g.battle.logBuffer.push({
            m: b.m[a],
            mi: b.mi[a]
        })
    }
    g.battle.logBuffer.sort(function(d, c) {
        return d.mi - c.mi
    });
    for (var a in g.battle.logBuffer) {
        if (isset(g.battle.logBuffer[a + 1])) {
            if (g.battle.logBuffer[parseInt(a)].mi + 1 != g.battle.logBuffer[parseInt(a) + 1].mi) {
                return false
            }
        }
    }
    return !isset(g.battle.logBuffer[0]) || parseInt(g.battle.logBuffer[0].mi) == g.battle.log.length
}

function showTroops(b) {
    if (b != "*") {
        b = 6 - parseInt(b)
    }
    for (var a in g.battle.f) {
        if (g.battle.f[a].y == b) {
            $("#troop" + a).css("z-index", 11)
        } else {
            $("#troop" + a).css("z-index", 10 - g.battle.f[a].y)
        }
    }
}

function troopLeftPos(e) {
    var n = g.battle.f[e],
        o = n.y,
        d = g.battle.line[o],
        c = (o & 1) ? 248 : 264;
    for (var m = 0; m < 6; m++) {
        for (var h in g.battle.line[m]) {
            if (g.battle.line[m][h] == e) {
                if (m == o) {
                    return
                }
                delete g.battle.line[m][h]
            }
        }
    }
    var a = -1;
    for (var m in d) {
        if (!isset(d[m])) {
            d[m] = e;
            a = m;
            break
        }
    }
    if (a == -1) {
        a = d.push(e) - 1
    }
    var q = ((a + 1) >> 1) * (a & 1 ? 1 : -1);
    var b = 1;
    n.rx = c + q * (n.fw * b) - (n.fw * b);
    n.ry = 380 - o * 30 - n.fh;
    if (!g.battle.auto && !$.browser.msie) {
        $("#troop" + e).animate({
            left: n.rx,
            top: n.ry
        }, 500).css({
            zIndex: 10 - o
        })
    } else {
        $("#troop" + e).css({
            left: n.rx,
            top: n.ry,
            zIndex: 10 - o
        })
    }
}

function newTroops(f) {
    var c = {};
    for (var a in f) {
        if (isset(f[a].name)) {
            f[a].init = true;
            if (!isset(g.battle.f[a])) {
                $("#battle").append("<div class=troop id=troop" + a + ' tip="-" ctip=t_troop' + (a > 0 ? "1" : "2") + "></div>");
                f[a].id = a
            }
            if (isset(f[a].icon)) {
                if (f[a].icon.charAt(0) != "/") {
                    f[a].icon = "/" + f[a].icon
                }
                f[a].icon = g.opath + (f[a].npc ? "npc" : "postacie") + f[a].icon
            }
            var e = 32;
            f[a].fw = e && e < 32 ? e : 32;
            f[a].fh = 48;
            g.battle.f[a] = f[a];
            g.battle.f[a].resize = function() {
                this.imgLoaded = true;
                var d = this.npc ? 1 : 4;
                if (this.img.src.indexOf("/rip") > -1) {
                    d = 1
                }
                this.fw = this.img.width / d;
                this.fh = this.img.height / d;
                $("#troop" + this.id).stop(1, 1).css({
                    backgroundImage: "url(" + this.img.src + ")",
                    backgroundPosition: "0 " + (this.team != g.battle.myteam ? 0 : (this.fh)) + "px",
                    width: this.fw,
                    height: this.fh,
                    zIndex: 10 - this.y
                });
                delete this.img;
                repositionTroopsInLine(this.y)
            };
            $("#troop" + a).click(function(w) {
                var p = parseInt(this.id.substr(5));
                var l = [],
                    o = hero.id;
                if (isset(g.battle.f[-o]) && !g.battle.f[-o].npc) {
                    o = -o
                }
                var x = 1,
                    u = true;
                if (g.battle.f[p].y - g.battle.f[o].y < 2) {
                    u = false
                }
                if (p == o) {
                    l[0] = [_t("move_forward", null, "battle"), '_g("fight&a=move")'];
                    x = 0
                } else {
                    if (g.battle.f[o].team != g.battle.f[p].team) {
                        l[0] = [_t("attack", null, "battle"), '_g("fight&a=strike&id=' + p + '")'];
                        x = 2
                    }
                }
                for (var t in g.battle.skills) {
                    if (t == -1 || t == -2 || t == 0) {
                        continue
                    }
                    var q = g.battle.skills[t],
                        y = false;
                    if ((q.attr & 8) && !x) {
                        y = true
                    }
                    if ((q.attr & 16) && x == 1) {
                        y = true
                    }
                    if (!(q.attr & 24) && x == 2) {
                        y = true
                    }
                    if ((q.attr & 2) && u) {
                        y = false
                    }
                    if (y) {
                        l.push(['<div class="skill-icon-id-' + t + '">' + q.name + "(" + q.cost + ")</div>", '_g("fight&a=spell&s=' + t + "&id=" + p + '")'])
                    }
                }
                if (l.length > 0) {
                    var h = $("#battle").offset();
                    showMenu(w, l, true);
                    if (isset(g.battle.f[o]["doublecastcost"])) {
                        var x = g.battle.f[o]["doublecastcost"];
                        if (x.length != 0) {
                            var d = g.battle.skills[x[0]]["name"];
                            var s = d + "(" + x[1] + ")";
                            $(".skill-icon-id-" + x[0]).html(s)
                        }
                    }
                    if (isset(g.battle.f[o]["cooldowns"])) {
                        var n = g.battle.f[o]["cooldowns"];
                        for (var t = 0; t < n.length; t++) {
                            var x = n[t];
                            var j = x[1];
                            if (j == 0) {
                                continue
                            }
                            var v = $(".skill-icon-id-" + x[0]);
                            var r = v.parent();
                            r.addClass("cooldown-disabled");
                            var s = v.html();
                            v.html(s + '<div class="cooldown-left">' + j + "t</div>")
                        }
                    }
                    if (isset(g.battle.f[o]["combo"])) {
                        updatecomboSkilsMax(g.battle.f[o]["combo"])
                    }
                }
            }).rightClick(function(h) {
                var d = parseInt(this.id.substr(5));
                if (hero.id == d) {
                    _g("fight&a=move")
                } else {
                    if (g.battle.f[d].team != g.battle.myteam) {
                        _g("fight&a=strike&id=" + d)
                    }
                }
            }).disableContextMenu()
        }
        if (isset(f[a].hpp) && (f[a].hpp == 0)) {
            f[a].icon = "/img/rip" + (a > 0 ? "1" : "2") + ".gif";
            if (isset(g.battle.activeEnemy) && a == g.battle.activeEnemy.id) {
                $("#troop" + g.battle.activeEnemy.id).removeClass("selected").css("z-index", g.battle.activeEnemy.oldZIndex);
                delete g.battle.activeEnemy
            }
        }
        if (isset(f[a].cooldowns)) {
            g.battle.f[a].cooldowns = f[a].cooldowns
        }
        if (isset(f[a].doublecastcost)) {
            g.battle.f[a].doublecastcost = f[a].doublecastcost
        }
        if (isset(f[a].combo)) {
            g.battle.f[a].combo = f[a].combo
        }
        if (isset(f[a].hpp)) {
            g.battle.f[a].hpp = f[a].hpp
        }
        if (isset(f[a].buffs)) {
            g.battle.f[a].buffs = f[a].buffs
        }
        if (isset(f[a].energy)) {
            g.battle.f[a].energy = f[a].energy;
            g.battle.f[a].mana = f[a].mana;
            if (a == hero.id) {
                $("#battlemana").html(f[a].mana);
                $("#battleenergy").html(f[a].energy)
            }
        }
        if (isset(f[a].y)) {
            if (g.battle.myteam != 1) {
                f[a].y = 5 - f[a].y
            }
            updateLine(a, f[a].y);
            c[f[a].y] = true
        }
        if (isset(f[a].icon)) {
            g.battle.f[a].icon = f[a].icon;
            g.battle.f[a].img = new Image();
            $(g.battle.f[a].img).load($.proxy(g.battle.f[a], "resize")).error(function() {
                log($(this).attr("src"), 2)
            }).attr({
                src: f[a].icon
            })
        }
        $("#troop" + a).attr("tip", "<b>" + g.battle.f[a].name + "</b>Lvl: " + g.battle.f[a].lvl + g.battle.f[a].prof + "<br><br><i>" + _t("life_percent %val%", {
            "%val%": g.battle.f[a].hpp
        }, "battle") + (isset(g.battle.f[a].energy) ? ("<br>" + _t("energy_amount %val%", {
            "%val%": g.battle.f[a].energy
        }, "battle") + "<br>" + _t("mana_amount %val%", {
            "%val%": g.battle.f[a].mana
        }, "battle")) : "") + "</i>")
    }
    for (var b in c) {
        repositionTroopsInLine(b)
    }
}

function updatecomboSkilsMax(j) {
    var f = g.battle.skills_combo_max;
    for (var c = 0; c < f.length; c++) {
        var a = f[c];
        var e = $("<div>").addClass("combo-wrapper");
        var d = a[1];
        for (var h = 0; h < d; h++) {
            var b = $("<div>").addClass("combo-point");
            if (h < j) {
                b.addClass("active")
            }
            e.append(b)
        }
        $(".skill-icon-id-" + a).append(e)
    }
}

function updateLine(a, e) {
    var b = g.battle.f[a].y;
    g.battle.f[a].y = e;
    var d = false;
    for (var c = 0; c < g.battle.line[e].length; c++) {
        if (g.battle.line[e][c] == a) {
            d = true;
            break
        }
    }
    if (!d) {
        g.battle.line[e].push(a)
    }
    if (b != e) {
        for (var c = 0; c < g.battle.line[b].length; c++) {
            if (g.battle.line[b][c] == a) {
                delete g.battle.line[b][c];
                break
            }
        }
    }
}

function repositionTroopsInLine(f) {
    if (!g.battle) {
        return
    }
    var c = calculateLineWidth(f),
        e = 0,
        d;
    var a = 256 - Math.round(c / 2);
    for (var b in g.battle.line[f]) {
        d = g.battle.f[g.battle.line[f][b]];
        if (d.imgLoaded) {
            d.ry = 380 - f * 30 - d.fh;
            d.rx = a + e + (f & 1 ? 16 : -16);
            if (!g.battle.auto && !$.browser.msie && !d.init && d.hpp != 0) {
                $("#troop" + d.id).stop(true).animate({
                    left: d.rx,
                    top: d.ry
                }, 500).css({
                    zIndex: 10 - f
                })
            } else {
                $("#troop" + d.id).css({
                    left: d.rx,
                    top: d.ry,
                    zIndex: 10 - f
                });
                if (d.init) {
                    d.init = false
                }
            }
            e += Math.round(d.fw / g.battle.wRatio) < 32 ? 32 : Math.round(d.fw / g.battle.wRatio)
        }
    }
}

function calculateLineWidth(c) {
    var b = 0;
    for (var a in g.battle.line[c]) {
        if (a == g.battle.line[c].length) {
            b += g.battle.f[g.battle.line[c][a]].fw
        } else {
            b += Math.round(g.battle.f[g.battle.line[c][a]].fw / g.battle.wRatio) < 32 ? 32 : Math.round(g.battle.f[g.battle.line[c][a]].fw / g.battle.wRatio)
        }
    }
    return b
}

function battleMsg(n, B) {
    var z = n;
    n = n.split(";");
    if (!isset(B)) {
        B = false
    }
    var e = 0,
        d = 0,
        q = false;
    if (n[0].indexOf("=") > 0) {
        var F = n[0].split("=");
        e = parseInt(F[0]);
        if (isset(g.battle.f[e])) {
            g.battle.f[e].hpp = parseInt(F[1])
        }
        q = true
    } else {
        e = parseInt(n[0])
    }
    if (n[1].indexOf("=") > 0) {
        var F = n[1].split("=");
        d = parseInt(F[0]);
        if (isset(g.battle.f[d])) {
            g.battle.f[d].hpp = parseInt(F[1])
        }
    } else {
        d = parseInt(n[1])
    }
    var x = e ? g.battle.f[e] : {
            name: "B£¥D#1!"
        },
        b = "(a)";
    var u = d ? g.battle.f[d] : {
            name: "B£¥D#2!"
        },
        H = "(a)";
    if (isset(x) && x.gender != "x") {
        b = x.gender == "k" ? "a" : ""
    }
    if (isset(u) && u.gender != "x") {
        H = u.gender == "k" ? "a" : ""
    }
    n.splice(0, 2);
    var f = ["", "", ""],
        h = "",
        C = "",
        j = "";
    var E = e != 0 && d == 0 && q;
    var l = "";
    for (var y in n) {
        if (y == (n.length - 1) && E) {
            l = x.name;
            x.name += "(" + x.hpp + "%)"
        }
        var w = n[y].split("=");
        switch (w[0]) {
            case "winner":
                if (w[1] == "?") {
                    f[1] += _t("battle_no_winner", null, "battle")
                } else {
                    if (w[1].indexOf(",") < 0) {
                        var b = "";
                        for (var A in g.battle.f) {
                            if (g.battle.f[A].name == w[1] && g.battle.f[A].gender == "k") {
                                b = "a"
                            } else {
                                if (g.battle.f[A].name == w[1] && g.battle.f[A].gender == "x") {
                                    b = "(a)"
                                }
                            }
                        }
                        f[1] += _t("winner_is %name% %posfix%", {
                            "%posfix%": b,
                            "%name%": w[1]
                        }, "battle")
                    } else {
                        f[1] += _t("winner_team_is %name% %posfix%", {
                            "%name%": w[1]
                        }, "battle")
                    }
                }
                h = "win";
                break;
            case "loser":
                if (w[1].indexOf(",") < 0) {
                    var b = "";
                    for (var A in g.battle.f) {
                        if (g.battle.f[A].name == w[1] && g.battle.f[A].gender == "k") {
                            b = "a"
                        } else {
                            if (g.battle.f[A].name == w[1] && g.battle.f[A].gender == "x") {
                                b = "(a)"
                            }
                        }
                    }
                    f[1] += _t("loser_is %name% %posfix%", {
                        "%posfix%": b,
                        "%name%": w[1]
                    }, "battle")
                } else {
                    f[1] += _t("loser_team_is %name% %posfix%", {
                        "%name%": w[1]
                    }, "battle")
                }
                h = "win";
                break;
            case "txt":
                f[1] += w[1];
                h = "txt";
                break;
            case "loot":
                f[1] += _t("msg_loot %name% %g1% %m1%", {
                    "%name%": x.name,
                    "%g1%": b,
                    "%m1%": w[1]
                });
                h = "loot";
                break;
            case "dloot":
                f[1] += _t("msg_dloot %name% %g1% %m1%", {
                    "%name%": x.name,
                    "%g1%": b,
                    "%m1%": w[1]
                });
                h = "loot";
                break;
            case "step":
                f[1] += _t("msg_step %name% %g1%", {
                    "%name%": x.name,
                    "%g1%": b
                });
                h = "neu";
                break;
            case "afterheal":
                f[1] += _t("msg_afterheal %name% %val%", {
                    "%name%": x.name,
                    "%val%": w[1]
                }) + "<br>";
                h = "neu";
                break;
            case "reusearrows":
                if (w[1] == 1) {
                    f[1] += _t("msg_reusearrows_one")
                } else {
                    if (w[1] < 5) {
                        f[1] += _t("msg_reusearrows %val% %arrows%", {
                            "%val%": w[1],
                            "%arrows%": _t("part_arrows_plural1")
                        })
                    } else {
                        f[1] += _t("msg_reusearrows %val% %arrows%", {
                            "%val%": w[1],
                            "%arrows%": _t("part_arrows_plural2")
                        })
                    }
                }
                f[1] += " " + x.name + ".<br>";
                h = "neu";
                break;
            case "wound":
                var v = w[1].split(",");
                if (v.length == 1) {
                    f[1] += _t("msg_wound %name% %val%", {
                        "%name%": x.name,
                        "%val%": w[1]
                    }) + "<br>"
                } else {
                    f[1] += _t("msg_wound_multi %name% %val0% %val1%", {
                        "%name%": x.name,
                        "%val0%": v[0],
                        "%val1%": v[1]
                    }) + "<br>"
                }
                h = "neu";
                break;
            case "+woundfrost":
                f[1] += _t("msg_woundfrost %val%", {
                    "%val%": w[1]
                }) + "<br>";
                h = "neu";
                break;
            case "+woundpoison":
                f[1] += _t("msg_woundpoison %val%", {
                    "%val%": w[1]
                }) + "<br>";
                h = "neu";
                break;
            case "+of_woundpoison":
                f[1] += _t("msg_of_woundpoison %val%", {
                    "%val%": w[1]
                }) + "<br>";
                h = "neu";
                break;
            case "+woundmagic":
                f[1] += _t("msg_woundmagic %val%", {
                    "%val%": w[1]
                }) + "<br>";
                h = "neu";
                break;
            case "+of_woundmagic":
                f[1] += _t("msg_of_woundmagic %val%", {
                    "%val%": w[1]
                }) + "<br>";
                h = "neu";
                break;
            case "critwound":
                var v = w[1].split(",");
                if (v.length == 1) {
                    f[1] += _t("msg_critwound %name% %val%", {
                        "%name%": x.name,
                        "%val%": w[1]
                    }) + "<br>"
                } else {
                    f[1] += _t("msg_critwound %name% %val0% %val1%", {
                        "%name%": x.name,
                        "%val0%": v[0],
                        "%val1%": v[1]
                    }) + "<br>"
                }
                h = "neu";
                break;
            case "injure":
                f[1] += _t("msg_injure %name% %val%", {
                    "%name%": x.name,
                    "%val%": w[1]
                }) + "<br>";
                h = "neu";
                break;
            case "poison":
                var v = w[1].split(",");
                if (v.length == 1) {
                    f[1] += _t("msg_poison %name% %val%", {
                        "%name%": x.name,
                        "%val%": w[1]
                    }) + "<br>"
                } else {
                    f[1] += _t("msg_poison %name% %val0% %val1%", {
                        "%name%": x.name,
                        "%val0%": v[0],
                        "%val1%": v[1]
                    }) + "<br>"
                }
                h = "neu";
                h = "neu";
                break;
            case "heal":
                var p = w[1].split(",");
                if (p.length > 1) {
                    f[1] += _t("msg_heal %gain_lost% %name% %val0% %val1%", {
                        "%name%": x.name,
                        "%val0%": p[0],
                        "%val1%": p[1],
                        "%gain_lost%": (p[0] > 0 ? _t("part_gained") : _t("part_lost"))
                    }) + "<br>"
                } else {
                    f[1] += _t("msg_heal %gain_lost% %name% %val%", {
                        "%name%": x.name,
                        "%val%": p[0],
                        "%gain_lost%": (p[0] > 0 ? _t("part_gained") : _t("part_lost"))
                    }) + "<br>"
                }
                h = "neu";
                break;
            case "heal_target":
                var G = w[1].split(",");
                if (G.length == 1) {
                    f[1] += _t("msg_heal_target %target% %val%", {
                        "%target%": u.name,
                        "%val%": G[0]
                    }) + "<br>"
                } else {
                    f[1] += _t("msg_heal_target-multi %target% %val% %val2%", {
                        "%target%": u.name,
                        "%val%": G[0],
                        "%val2%": G[1]
                    }) + "<br>"
                }
                break;
            case "fire":
                var v = w[1].split(",");
                if (v.length == 1) {
                    f[1] += _t("msg_fire %name% %val%", {
                        "%name%": x.name,
                        "%val%": w[1]
                    }) + "<br>"
                } else {
                    f[1] += _t("msg_fire %name% %val0% %val1%", {
                        "%name%": x.name,
                        "%val0%": v[0],
                        "%val1%": v[1]
                    }) + "<br>"
                }
                h = "neu";
                break;
            case "shout":
                f[1] += _t("msg_shout %name%", {
                    "%name%": x.name,
                    "%name2%": w[1]
                }) + "<br>";
                h = "neu";
                break;
            case "en-regen":
                f[1] += _t("msg_en-regen %gain_lost% %name% %val%", {
                    "%name%": x.name,
                    "%val%": w[1],
                    "%gain_lost%": (w[1] > 0 ? _t("part_gained") : _t("part_lost"))
                }) + "<br>";
                h = "neu";
                break;
            case "allslow":
                f[1] += _t("msg_allslow") + "<br>";
                break;
            case "arrowrain":
                f[1] += _t("msg_arrowrain") + "<br>";
                break;
            case "aura-ac":
                f[1] += _t("msg_aura-ac %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "aura-resall":
                f[1] += _t("msg_aura-resall %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "aura-sa":
                f[1] += _t("msg_aura-sa %val%", {
                    "%val%": mp(w[1] / 100)
                }) + "<br>";
                break;
            case "bandage":
                var G = w[1].split(",");
                if (G.length == 1) {
                    f[1] += _t("msg_aura-bandage %val%", {
                        "%val%": G[0],
                        "%name%": x.name
                    }) + "<br>"
                } else {
                    f[1] += _t("msg_aura-bandage-multi %val% %val2%", {
                        "%name%": x.name,
                        "%val%": G[0],
                        "%val2%": G[1]
                    }) + "<br>"
                }
                break;
            case "blizzard":
                f[1] += _t("msg_blizzard") + "<br>";
                break;
            case "cover":
                f[1] += _t("msg_cover") + "<br>";
                break;
            case "disturb":
                f[1] += _t("msg_disturb") + "<br>";
                break;
            case "doubleshoot":
                f[1] += _t("msg_doubleshoot %name%", {
                    "%name%": x.name
                }) + "<br>";
                break;
            case "energy":
                f[1] += _t("msg_energy %name% %gain_loss% %val%", {
                    "%name%": x.name,
                    "%gain_loss%": (w[1] > 0 ? _t("part_loss_en") : _t("part_gain_en")),
                    "%val%": Math.abs(w[1])
                }) + "<br>";
                break;
            case "en-regen-cast":
                f[1] += _t("msg_en-regen-cast %name% %target%", {
                    "%name%": x.name,
                    "%target%": (e == d ? _t("part_himself") : u.name)
                }) + "<br>";
                break;
            case "firewall":
                break;
            case "thunder":
                f[1] += _t("msg_thunder %name%", {
                    "%name%": x.name
                }) + "<br>";
                break;
            case "storm":
                f[1] += _t("msg_storm %name%", {
                    "%name%": x.name
                }) + "<br>";
                break;
            case "fireshield":
                f[1] += _t("msg_fireshield %name%", {
                    "%name%": x.name,
                    "%target%": (e == d ? _t("part_himself") : u.name)
                }) + "<br>";
                break;
            case "lightshield":
                f[1] += _t("msg_lightshield %name%", {
                    "%name%": x.name,
                    "%target%": (e == d ? _t("part_himself") : u.name)
                }) + "<br>";
                break;
            case "frostshield":
                f[1] += _t("msg_frostshield %name%", {
                    "%name%": x.name,
                    "%target%": (e == d ? _t("part_himself") : u.name)
                }) + "<br>";
                break;
            case "sunshield_per":
            case "sunshield":
                f[1] += _t("msg_sunshield %name%", {
                    "%name%": x.name,
                    "%target%": (e == d ? _t("part_himself") : u.name)
                }) + "<br>";
                break;
            case "sunreduction":
                f[1] += _t("msg_sunreduction %name%", {
                    "%name%": x.name,
                    "%target%": (e == d ? _t("part_himself") : u.name)
                }) + "<br>";
                break;
            case "footshoot":
                f[1] += _t("msg_footshoot %name%", {
                    "%name%": x.name,
                    "%target%": (e == d ? _t("part_himself") : u.name)
                }) + "<br>";
                break;
            case "healall":
                f[1] += _t("msg_healall %name% %val%", {
                    "%name%": x.name,
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "manatransfer":
                f[1] += _t("msg_manatransfer %name% %val% %name2%", {
                    "%name2%": u.name,
                    "%name%": x.name,
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "soullink":
                f[1] += _t("msg_soullink %name%", {
                    "%name%": x.name
                }) + "<br>";
                break;
            case "stinkbomb":
                f[1] += _t("msg_stinkbomb %name% %name2%", {
                    "%name%": x.name,
                    "%name2%": u.name
                }) + "<br>";
                break;
            case "managain":
                f[1] += _t("msg_managain %name% %val%", {
                    "%name%": x.name,
                    "%val%": mp(w[1])
                }) + "<br>";
                break;
            case "insult":
                f[1] += _t("msg_insult %name% %name2% %val%", {
                    "%name%": x.name,
                    "%val%": w[1],
                    "%name2%": u.name
                }) + "<br>";
                break;
            case "prepare":
                f[1] += _t("msg_prepare %name%", {
                    "%name%": x.name,
                    "%name2%": w[1]
                }) + "<br>";
                h = "auto";
                break;
            case "tspell":
                f[1] += _t("msg_tspell %name%", {
                    "%name%": x.name,
                    "%name2%": w[1]
                }) + "<br>";
                h = "auto";
                break;
            case "legbon_lastheal":
                var D = w[1].split(",");
                f[1] += _t("msg_legbon_lastheal %val%", {
                    "%val%": D[1],
                    "%val2%": D[0]
                }) + "<br>";
                break;
            case "combo-max":
                f[1] += _t("msg_combo-max", {
                    "%val%": w[1]
                });
                break;
            case "poisonspread":
                f[1] += _t("msg_poisonspread", {
                    "%val%": w[1]
                });
                break;
            case "removeslow-allies":
                f[1] += _t("msg_removeslow-allies");
                break;
            case "removestun-allies":
                f[1] += _t("msg_removestun-allies");
                break;
            case "of-woundstart":
                f[1] += _t("msg_of-woundstart");
                break;
            case "lowheal_per-enemies":
                f[1] += _t("msg_lowheal_per-enemies val", {
                    "%val%": w[1]
                });
                break;
            case "+dispel":
                f[1] += _t("msg_+dispel") + "<br>";
                break;
            case "+oth_dmg":
                var D = w[1].split(",");
                f[1] += "<b class=dmg" + D[1] + ">" + _t("msg_+oth_dmg %val% %name%", {
                    "%val%": D[0],
                    "%name%": D[2]
                }) + "<br>";
                h = "auto";
                break;
            case "+oth_cover":
                var D = w[1].split(",");
                f[1] += _t("msg_+oth_cover %val% %name%", {
                    "%val%": D[0],
                    "%name%": D[2]
                }) + "<br>";
                break;
            case "+exp":
                f[1] += _t("msg_+exp %val%", {
                    "%val%": w[1]
                }) + "<br>";
                h = "win";
                break;
            case "+ph":
                f[1] += _t("msg_+ph %val%", {
                    "%val%": w[1]
                }) + "<br>";
                h = "win";
                break;
            case "+of_dmg":
                C += "<b class=dmgo>+" + w[1] + "</b>";
                break;
            case "+thirdatt":
                f[1] += _t("+third_strike") + "<br>";
                C += "<b class=third>+" + w[1] + "</b>";
                break;
            case "+crit":
                f[1] += _t("msg_+crit") + "<br>";
                break;
            case "+verycrit":
                f[1] += _t("msg_+verycrit") + "<br>";
                break;
            case "+of_crit":
                f[1] += _t("msg_+of_crit") + "<br>";
                break;
            case "+wound":
                f[1] += _t("msg_+wound") + "<br>";
                break;
            case "+of_wound":
                f[1] += _t("msg_+of_wound") + "<br>";
                break;
            case "+critwound":
                f[1] += _t("msg_+critwound") + "<br>";
                break;
            case "+critslow":
                f[1] += _t("msg_+hithurt %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+critsa":
                f[1] += _t("msg_+critsa %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+pierce":
                f[1] += _t("msg_+pierce") + "<br>";
                break;
            case "+acdmg":
                f[1] += _t("msg_+acdmg %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+resdmg":
                f[1] += _t("msg_+resdmg %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+stun":
                f[1] += _t("msg_+stun") + "<br>";
                break;
            case "+stun2":
                f[1] += _t("msg_+stun2") + "<br>";
                break;
            case "+stun2-f":
                f[1] += _t("msg_+stun2-f") + "<br>";
                break;
            case "+stun2-l":
                f[1] += _t("msg_+stun2-l") + "<br>";
                break;
            case "+stun2-c":
                f[1] += _t("msg_+stun2-c") + "<br>";
                break;
            case "+stun2-d":
                f[1] += _t("msg_+stun2-d") + "<br>";
                break;
            case "+freeze":
                f[1] += _t("msg_+freeze") + "<br>";
                break;
            case "+distract":
                f[1] += _t("msg_+distract") + "<br>";
                break;
            case "+fastarrow":
                f[1] += _t("msg_+fastarrow") + "<br>";
                break;
            case "-redmanadest":
                f[1] += _t("msg_-redmanadest %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-redendest":
                f[1] += _t("msg_-redendest %val%", {
                    "%val%": w[1]
                }) + "<br> ";
                break;
            case "+lowheal2turns":
                f[1] += _t("msg_+lowheal2turns %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-lowcritallval":
                f[1] += _t("msg_-lowcritallval %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+engback":
                f[1] += _t("msg_+engback %val%", {
                    "%val%": mp(w[1])
                }) + "<br>";
                break;
            case "+swing":
                f[1] += _t("msg_+swing") + "<br>";
                break;
            case "+injure":
                f[1] += _t("msg_+injure %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+firearrow":
                f[1] += _t("msg_+firearrow") + "<br>";
                break;
            case "+manadest":
                var G = w[1].split(",");
                if (G.length == 1) {
                    f[1] += _t("msg_+manadest %val%", {
                        "%val%": G[0]
                    }) + "<br>"
                } else {
                    f[1] += _t("msg_+manadest_multi %val%", {
                        "%val%": G[0],
                        "%val2%": G[1]
                    }) + "<br>"
                }
                break;
            case "+endest":
                var G = w[1].split(",");
                if (G.length == 1) {
                    f[1] += _t("msg_+endest %val%", {
                        "%val%": G[0]
                    }) + "<br>"
                } else {
                    f[1] += _t("msg_+endest_multi %val%", {
                        "%val%": G[0],
                        "%val2%": G[1]
                    }) + "<br>"
                }
                break;
            case "+abdest":
                f[1] += _t("msg_+abdest %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+actdmg":
                f[1] += _t("msg_+actdmg %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+resdmgf":
                f[1] += _t("msg_+resdmgf %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+resdmgc":
                f[1] += _t("msg_+resdmgc %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+resdmgl":
                f[1] += _t("msg_+resdmgl %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+legbon_verycrit":
                f[1] += _t("msg_+legbon_verycrit") + "<br>";
                break;
            case "+legbon_curse":
                f[1] += _t("msg_+legbon_curse") + "<br>";
                break;
            case "+legbon_pushback":
                f[1] += _t("msg_+legbon_pushback") + "<br>";
                break;
            case "+legbon_holytouch":
                f[1] += _t("msg_+legbon_holytouch %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-legbon_dmgred":
                f[1] += _t("msg_-legbon_dmgred %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-blok":
                f[2] += _t("msg_-blok %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-evade":
                f[2] += _t("msg_-evade") + "<br>";
                break;
            case "-parry":
                f[2] += _t("msg_-parry") + "<br>";
                break;
            case "-pierceb":
                f[2] += _t("msg_-pierceb") + "<br>";
                break;
            case "-contra":
                f[2] += _t("msg_-contra") + "<br>";
                break;
            case "-rage":
                f[2] += _t("msg_-rage") + "<br>";
                break;
            case "-absorb":
                f[2] += _t("msg_-absorb %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-absorbm":
                f[2] += _t("msg_-absorbm %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-arrowblock":
                f[2] += _t("msg_-arrowblock") + "<br>";
                break;
            case "-reddest_per":
                f[2] += _t("msg_-reddest_per %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-thirdatt":
                j += "<b class=third>-" + w[1] + "</b>";
                break;
            case "-legbon_critred":
                f[2] += _t("msg_-legbon_critred") + "<br>";
                break;
            case "-legbon_resgain":
                f[2] += _t("msg_-legbon_resgain") + "<br>";
                break;
            case "ansgame":
                f[1] += _t("msg_ansgame", {
                    "%name%": x.name
                }) + "<br>";
                break;
            case "reddest_per0":
            case "-reddest_per0":
                break;
            case "-redabdest_per":
                f[1] += _t("msg_redabdest_per %m1%", {
                    "%m1%": w[1]
                }) + "<br>";
                break;
            case "aura-ac_per":
                f[1] += _t("msg_aura-ac_per %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "aura-sa_per":
                f[1] += _t("msg_aura-sa_per %val%", {
                    "%val%": mp(w[1])
                }) + "<br>";
                break;
            case "+energy":
                f[1] += _t("msg_+energy %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "energyout":
                f[1] += _t("msg_energyout %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "mlightshiled":
                f[1] += _t("msg_mlightshiled %name%", {
                    "%name%": x.name,
                    "%target%": (e == d ? _t("part_himself") : u.name)
                }) + "<br>";
                break;
            case "lightshield2":
                f[1] += _t("msg_lightshield2 %name%", {
                    "%name%": x.name,
                    "%target%": (e == d ? _t("part_himself") : u.name)
                }) + "<br>";
                break;
            case "antidote":
                f[1] += _t("msg_antidote %name%", {
                    "%name%": x.name,
                    "%target%": (e == d ? _t("part_himself") : u.name)
                }) + "<br>";
                break;
            case "stealmana":
                f[1] += _t("msg_stealmana %name%", {
                    "%name%": x.name,
                    "%target%": u.name
                }) + "<br>";
                break;
            case "rime_per":
                var D = w[1].split(",");
                f[1] += _t("msg_rime_per %val% %name%", {
                    "%val%": D[0],
                    "%name%": x.name
                }) + "<br>";
                break;
            case "trickyknife":
                f[1] += _t("msg_trickyknife %name% %target%", {
                    "%name%": x.name,
                    "%target%": u.name
                }) + "<br>";
                break;
            case "healall_per":
                var G = w[1].split(",");
                if (G.length == 1) {
                    f[1] += _t("msg_healall_per %name% %val%", {
                        "%name%": x.name,
                        "%val%": G[0]
                    }) + "<br>"
                } else {
                    f[1] += _t("msg_healall_per_multi %name% %val% %val2%", {
                        "%name%": x.name,
                        "%val%": G[0],
                        "%val2%": G[1]
                    }) + "<br>"
                }
                break;
            case "+critslow_per":
                f[1] += _t("msg_+critslow_per= %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+critsa_per":
                f[1] += _t("msg_+critsa_per %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+immobilize":
                f[1] += _t("msg_+immobilize") + "<br>";
                break;
            case "+mcurse":
                f[1] += _t("msg_+mcurse") + "<br>";
                break;
            case "+absorb":
                f[2] += _t("msg_+absorb %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+absorbm":
                f[2] += _t("msg_+absorbm %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+vulture":
                f[2] += _t("msg_+vulture= %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-redacdmg":
                f[2] += _t("msg_-redacdmg %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-redacdmg_per":
                f[2] += _t("msg_-redacdmg_per %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-redmanadest_per":
                f[2] += _t("msg_-redmanadest_per %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-redendest_per":
                f[2] += _t("msg_-redendest_per %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-resmanaendest":
                var D = w[1].split(",");
                f[2] += _t("msg_-resmanaendest %val%", {
                    "%val1%": D[0],
                    "%val2%": D[1]
                }) + "<br>";
                break;
            case "+critpoison_per":
                f[2] += _t("msg_+critpoison_per %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "alllowdmg":
                var D = w[1].split(",");
                f[1] += _t("msg_alllowdmg %val% %name%", {
                    "%val%": D[0],
                    "%name%": D[2]
                }) + "<br>";
                break;
            case "allslow_per":
                var D = w[1].split(",");
                f[1] += _t("msg_allslow_per %val% %name%", {
                    "%val%": D[0],
                    "%name%": x.name
                }) + "<br>";
                break;
            case "blackout":
                f[1] += _t("msg_blackout") + "<br>";
                break;
            case "blesswords_perw":
                f[1] += _t("msg_blesswords_perw %val% %name%", {
                    "%val%": w[1],
                    "%name%": x.name
                }) + "<br>";
                break;
            case "chainlightning":
                break;
            case "chainlightning_perw":
                f[1] += _t("msg_chainlightning_perw %name%", {
                    "%name%": x.name
                }) + "<br>";
                break;
            case "critstagnation":
                f[1] += _t("msg_critstagnation") + "<br>";
                break;
            case "distractshoot":
                f[1] += _t("msg_distractshoot") + "<br>";
                break;
            case "disturbshoot":
                f[1] += _t("msg_disturbshoot") + "<br>";
                break;
            case "+rotatingblade":
                break;
            case "daggerthrow":
                break;
            case "vamp":
                f[1] += _t("msg_vamp %val%", {
                    "%name%": x.name,
                    "%target%": u.name,
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "woundextend":
                f[1] += _t("msg_woundextend %name% %target%", {
                    "%name%": x.name,
                    "%target%": u.name
                }) + "<br>";
                break;
            case "heal_per":
                f[1] += _t("msg_heal_per %name%", {
                    "%name%": x.name,
                    "%target%": (e == d ? _t("part_himself") : u.name)
                }) + "<br>";
                break;
            case "frost":
                f[1] += _t("msg_frost %name% %val%", {
                    "%name%": x.name,
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "light":
                f[1] += _t("msg_light %name% %val%", {
                    "%name%": x.name,
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "physical":
                f[1] += _t("msg_physical %name% %val%", {
                    "%name%": x.name,
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "poison_lowdmg_per-enemies":
                f[1] += _t("msg_poison_lowdmg_per-enemies %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-poison_lowdmg_per":
                f[1] += _t("msg_-poison_lowdmg_per %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-dmg_hpp":
                f[1] += _t("msg_-dmg_hpp") + "<br>";
                break;
            case "balloflight":
                break;
            case "+crush":
            case "vamp_time":
            case "+taken_dmg":
            case "+critpierce":
            case "critval-enemies":
            case "critmval-enemies":
            case "critval-allies":
            case "critmval-allies":
                f[1] += _t("eng_game_only_val_" + w[0] + " %val%", {
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "+spell-vamp_time":
            case "distortion":
                f[1] += _t("eng_game_only_nick_" + w[0] + " %name%", {
                    "%name%": x.name
                }) + "<br>";
                break;
            case "heal_per-enemies":
                f[1] += _t("eng_game_nick_and_value_" + w[0] + " %name% %val%", {
                    "%name%": x.name,
                    "%val%": Math.abs(w[1])
                }) + "<br>";
                break;
            case "heal_per-allies":
            case "hp_per-allies":
            case "hp_per-enemies":
                f[1] += _t("eng_game_nick_and_value_" + w[0] + " %name% %val%", {
                    "%name%": x.name,
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "dmg-target_physical":
                f[1] += _t("eng_game_opponent_nick_and_value_" + w[0] + " %target% %val%", {
                    "%target%": u.name,
                    "%val%": w[1]
                }) + "<br>";
                break;
            case "-spell-taken_dmg":
            case "-spell-distortion":
                f[1] += _t("eng_game_nick_and_opponent_" + w[0] + " %name% %target%", {
                    "%name%": x.name,
                    "%target%": u.name
                }) + "<br>";
                break;
            case "-spell-immunity_to_dmg":
                f[1] += _t("eng_game_nick_and_friendnick_" + w[0] + " %name%", {
                    "%name%": x.name
                }) + "<br>";
                break;
            case "-immunity_to_dmg":
                f[1] += _t("end-game-without-percent" + w[0]) + "<br>";
                break;
            default:
                if (w[0].substr(1, 3) == "dmg") {
                    if (w[0].charAt(0) == "+") {
                        C += "<b class=" + w[0].substr(1) + ">+" + w[1] + "</b>"
                    } else {
                        j += "<b class=" + w[0].substr(1) + ">-" + w[1] + "</b>"
                    }
                } else {
                    f[2] += _t("msg_unknown_prameter %val%", {
                        "%val%": n[y]
                    }) + "</b><br>"
                }
        }
    }
    if (l != "") {
        x.name = l
    }
    if (h == "auto") {
        h = g.battle.f[e].team < 2 ? "attack" : "attack2"
    }
    if (C != "") {
        h = g.battle.f[e].team < 2 ? "attack" : "attack2";
        f[0] = _t("msg_dmgdone %name1% %hpp% %val%", {
            "%name1%": x.name,
            "%hpp%": x.hpp,
            "%val%": C
        }) + "<br>";
        f[2] += _t("msg_dmgtaken %name1% %hpp% %val%", {
            "%name1%": u.name,
            "%hpp%": u.hpp,
            "%val%": j
        }) + "<br>";
        if (!g.battle.auto) {
            var d = "big" + Math.round(Math.random() * 1000);
            $("#battle").append($("<big id=" + d + ">" + j + "</big>").rightClick(function(a) {
                a.preventDefault()
            }));
            $("#" + d).css({
                left: u.rx + u.fw / 2 - $("#" + d).width() / 2,
                top: u.ry - 16
            }).animate({
                opacity: 0,
                top: u.ry - 48
            }, 1500);
            setTimeout(function() {
                $("#" + d).remove()
            }, 1500)
        }
    }
    if (h != "") {
        h = " class=" + h
    }
    var o = "";
    switch (h.split("=")[1]) {
        case "attack2":
            o = "i";
            break;
        case "attack":
            o = "";
            break;
        default:
            o = (h == "neu" ? "u" : "b")
    }
    var r = f.join("");
    if (_l() == "pl") {
        r = r.replace(/#/g, b).replace(/\$/g, H)
    }
    var s = strip_tags(r.replace(/<br>/gim, "\n"), false);
    g.battle.forumLog.push(o == "" ? s : "[" + o + "]" + s + "[/" + o + "]");
    var c = f.join("");
    if (_l() == "pl") {
        c = c.replace(/#/g, b).replace(/\$/g, H)
    }
    return "<div" + h + ">" + c + "</div>"
}

function attach_battle_log() {
    $("#battlelog").click(function() {
        var a = $("#battle_for_forum");
        if (a.length == 0) {
            a = $('<textarea id="battle_for_forum" style="position:relative;top:10px;left:10px;z-index:350;width:345px;height:370px;font-size:11px"></textarea>').click(function() {
                $(this).focus();
                $(this).select()
            })
        }
        showDialog(_t("copy_battle_log"), '<div class="scroll400 questlist"></div>');
        a.val(g.battle.forumLog.join("\n"));
        $(a).appendTo("#dlgwin .w1 .w2 .scroll400")
    })
}

function toggleBattleLog() {
    var a = getCookie("battleLogSize");
    switch (a) {
        case "big":
            $("#battlelog,#battlepanelback,#battlepanel,#battle .border-b").removeClass("big");
            setCookie("battleLogSize", "small");
            break;
        default:
            $("#battlelog,#battlepanelback,#battlepanel,#battle .border-b").addClass("big");
            if (g.chat.state == 2) {
                showChat(1)
            }
            setCookie("battleLogSize", "big");
            break
    }
    map.resizeView()
}

function selectNextEnemy(a) {
    this.activated = false;
    this.findNext = function(e) {
        var b = null;
        var d = [];
        for (var c in g.battle.f) {
            if (g.battle.f[c].hpp > 0) {
                d.push(c)
            }
        }
        if (e) {
            d = d.reverse()
        }
        for (var c = 0; c < d.length; c++) {
            if (!isset(g.battle.activeEnemy)) {
                b = d[c];
                break
            } else {
                if (g.battle.activeEnemy.id == d[c] && isset(d[c + 1])) {
                    b = d[c + 1];
                    break
                }
            }
        }
        if (b != null) {
            this.activate(b);
            return
        }
        if (isset(g.battle.activeEnemy)) {
            $("#troop" + g.battle.activeEnemy.id).removeClass("selected").css("z-index", g.battle.activeEnemy.oldZIndex);
            delete g.battle.activeEnemy
        }
    };
    this.activate = function(b) {
        if (isset(g.battle.activeEnemy)) {
            $("#troop" + g.battle.activeEnemy.id).css("z-index", g.battle.activeEnemy.oldZIndex)
        }
        $(".troop").removeClass("selected");
        this.activated = true;
        g.battle.activeEnemy = {
            id: b,
            oldZIndex: $("#troop" + b).css("z-index")
        };
        $("#troop" + b).addClass("selected").css("z-index", 200)
    };
    this.findNext(a)
}
$("#battle").mousewheel(function(a) {
    if (a.target.id == "battle") {
        selectNextEnemy(a.wheelDelta == undefined ? a.detail < 0 : a.wheelDelta < 0)
    }
});
var updateBuffs = function() {
    var j = [_t("deep_wound", null, "buff"), _t("wound", null, "buff"), _t("critical_deep_wound", null, "buff"), _t("poisoned", null, "buff"), _t("fire", null, "buff"), _t("swow_down", null, "buff"), _t("speed_up", null, "buff")];
    for (var e in g.battle.f) {
        var a = $("#troop" + e);
        a.find(".buff").remove();
        if (g.battle.f[e].buffs && g.battle.f[e].hpp > 0) {
            var f = g.battle.f[e].buffs;
            var h = 0;
            while (f) {
                h += f & 1;
                f >>= 1
            }
            var c = 0;
            for (var b = 0; b < j.length; b++) {
                if (g.battle.f[e].buffs >> b & 1) {
                    var k = Math.ceil((h - c) / 2) - 1;
                    var d = (h - k * 2) >= 2 ? 2 : 1;
                    a.append($('<div tip="' + j[b] + '" style="background-position:' + (-b * 12) + 'px 0px" class="buff ' + (g.battle.f[e].team == 1 ? "l" : "r") + '"></div>').css({
                        left: (a.width() / 2) - ((d * 15) / 2) + ((c % 2) * 15),
                        bottom: k * 15
                    }).click(function() {}));
                    c++
                }
            }
        }
    }
};
var ansgame = new(function() {
    var c = {};
    var b = false;
    var a = false;
    this.start = function(e) {
        if (parseInt(e) === 0) {
            this.close();
            return
        }
        if (b) {
            return
        }
        var d = $('<div class="ansRound"><div class=message>' + _t("ans_game msg", null, "battle") + "</div></div>");
        var h = (2 * Math.PI) / 8;
        var f = this;
        for (var j = 0; j < 8; j++) {
            d.append($('<div class="unit" id="ansunit_' + (j) + '"></div>').click(function() {
                f.choose($(this).attr("id").substr(8))
            }).css({
                top: 180 + (70 * Math.sin(h * j)) - 12,
                left: 256 + (70 * Math.cos(h * j)) - 12,
                background: "url(/obrazki/npc/" + e + ") -" + (j * 32) + "px 0px"
            }))
        }
        d.appendTo("#centerbox");
        b = true
    };
    this.choose = function(h) {
        if (a) {
            return
        }
        if (isset(c[h])) {
            delete c[h];
            $("#ansunit_" + h).removeClass("active");
            return
        }
        c[h] = true;
        $("#ansunit_" + h).addClass("active");
        var f = 0;
        var d = [];
        for (var e in c) {
            d.push(parseInt(e))
        }
        if (d.length == 2) {
            d.sort(function(j, i) {
                return j - i
            });
            _g("fight&a=ansgame&s=" + (d[0] + (d[1] * 256)));
            $("#centerbox .ansRound").remove();
            a = true
        }
    };
    this.check = function() {
        return b
    };
    this.close = function() {
        $("#centerbox .ansRound").remove();
        a = false;
        b = false;
        c = {}
    }
})();

function battle_surrender() {
    if (ansgame.check()) {
        return false
    }
    if (g.battle.move > 0) {
        _g("fight&a=surrender")
    } else {
        message(_t("cannot-surrender", null, "battle"))
    }
};





// ###########################################







function bmEditor() {
    var a = this;
    this.handler = $("#bm_edit_panel");
    this.enabled = false;
    this.inAnimation = false;
    this.skillsLimit = 0;
    this.topScroll = null;
    this.repeat = false;
    this.activeSkills = new Array();
    this.placeHandlerIcons = function() {
        $(".bm_handlerIcon").remove();
        for (var c in g.skills.skills) {
            var d = g.skills.skills[c];
            if (d.type && d.clvl > 0) {
                a.oneIcon(d)
            }
        }
    };
    this.oneIcon = function(d) {
        var c = g.skills.getElement(d.id).el;
        c.find(".skillbox_active").addClass("clickable").bind("click", function(e) {
            a.addAndSave(d.id);
            e.stopPropagation()
        }).attr("tip", _t("add_to_list", null, "skills"))
    };
    this.clearList = function() {
        this.activeSkills = [];
        _g("skills&battleskills=" + this.getSkillList())
    };
    this.toggleShow = function() {
        if (this.enabled) {
            a.removeAddIcons();
            if (!this.inAnimation) {
                this.inAnimation = true;
                this.handler.animate({
                    left: 366
                }, 300, "swing", function() {
                    a.inAnimation = false;
                    a.enabled = false;
                    g.skills.refresh();
                    $(".bm_handlerIcon").remove();
                    $("#battleskills_scroll").remove()
                })
            }
        } else {
            _g("skills", function() {
                if (!a.inAnimation) {
                    a.inAnimation = true;
                    a.handler.animate({
                        left: 512
                    }, 300, "swing", function() {
                        a.inAnimation = false;
                        a.enabled = true;
                        a.placeHandlerIcons();
                        g.skills.refresh()
                    })
                }
            })
        }
    };
    this.getSkillList = function() {
        return this.activeSkills.length > 0 ? this.activeSkills.join(",") : 0
    };
    this.addAndSave = function(c) {
        if (this.activeSkills.length < this.skillsLimit) {
            this.activeSkills.push(c);
            _g("skills&battleskills=" + this.getSkillList() + "&rpt=" + (this.repeat ? 1 : -1))
        } else {
            mAlert(_t("bm_limit_reached", null, "skills"))
        }
    };
    this.removeAndSave = function(c) {
        c.fadeOut("fast", function() {
            c.remove();
            var d = new Array();
            $("#bm_edit_panel .skillbox").each(function(f, h) {
                d.push($(h).attr("skill"))
            });
            a.activeSkills = d;
            _g("skills&battleskills=" + a.getSkillList() + "&rpt=" + (a.repeat ? 1 : -1))
        })
    };
    this.reorderAndSave = function() {
        var c = new Array();
        $("#bm_edit_panel .skillbox").each(function(d, f) {
            c.push($(f).attr("skill"))
        });
        this.activeSkills = c;
        _g("skills&battleskills=" + this.getSkillList() + "&rpt=" + (this.repeat ? 1 : -1))
    };
    this.removeAddIcons = function() {
        $("#skills").find(".skillbox_active").each(function(c) {
            $(this).unbind("click").removeAttr("tip").removeClass("clickable")
        })
    };
    this.disable = function() {
        $("#bm_edit_panel_container").hide();
        a.removeAddIcons();
        this.handler.css({
            left: 362
        });
        this.enabled = false
    };
    this.enable = function() {
        $("#bm_edit_panel_container").show();
        a.handler.css({
            left: 362
        });
        a.enabled = false;
        a.handler.find(".itemsBox").sortable({
            update: function() {
                a.reorderAndSave()
            }
        })
    };
    this.init = function(c) {
        if (!this.enabled) {
            $("#battleskills_scroll").remove()
        }
        $("#bm_edit_button").show();
        this.skillsLimit = c.max;
        this.activeSkills = c.list;
        this.repeat = parseInt(c.rpt) ? true : false;
        this.topScroll = $("#battleskills_itemsBox").scrollTop();
        this.refreshSkillList()
    };
    this.switchRepeat = function() {
        this.repeat = !this.repeat;
        _g("skills&battleskills=" + this.getSkillList() + "&rpt=" + (this.repeat ? 1 : -1))
    };
    this.refreshSkillList = function() {
        this.handler.find(".itemsBox .bm_edit_mode").remove();
        if (this.repeat) {
            $("#bm_rpt_switch").addClass("active")
        } else {
            $("#bm_rpt_switch").removeClass("active")
        }
        for (var d = 0; d < this.activeSkills.length; d++) {
            var c = this.activeSkills[d] == -1 ? _t("bm_normal_attack", null, "skills") : g.skills.skills[this.activeSkills[d]].name;
            var e = $(document.createElement("div")).addClass("skillbox bm_edit_mode");
            e.append($(document.createElement("span")).click(function() {
                a.removeAndSave($(this).parent())
            }).addClass("bm_remove_item").attr("tip", _t("bm_remove_fromlist", null, "skills")));
            e.append('<span class="skillname">' + c + "</span>").attr("skill", this.activeSkills[d]);
            this.handler.find(".itemsBox").append(e)
        }
    }
}

function skills() {
    var a = this;
    var e = true;
    var d = {
        sw: ["weapon"],
        "1h": [1],
        "2h": [2],
        bs: [3],
        dis: [4],
        fire: ["fire"],
        light: ["light"],
        frost: ["frost"],
        sh: [14],
        h: [5],
        poison: ["poison"],
        phydis: ["phydis"],
        wound: ["wound"]
    };
    this.skills = [];
    var c = [];
    var f = [];
    this.getElement = function(h) {
        return f[h]
    };
    this.changeSet = function() {
        hero.cur_skill_set++;
        if (hero.cur_skill_set > 3) {
            hero.cur_skill_set = 1
        }
        _g("skills&set=" + hero.cur_skill_set, function() {
            if ($("#skills").is(":visible")) {
                a.show()
            }
        })
    };
    this.show = function() {
        c = [];
        a.skills = [];
        f = [];
        _g("skillshop");
        $("#skills_body").empty()
    };
    this.hide = function() {
        g.bmEditor.disable();
        $("#skills").fadeOut("fast");
        $("#skills_title .skillLearnInfo").fadeOut("fast");
        _g("skills&learn=-2");
        $("#skills_body").empty();
        a.skills = [];
        g.lock.remove("skills")
    };
    this.parseStat = function(k) {
        var l = {};
        var j = [];
        if (isset(k) && k.length > 0) {
            j = k.split(";")
        }
        for (var h = 0; h < j.length; h++) {
            var m = j[h].split("=");
            l[m[0]] = m[1]
        }
        return l
    };
    this.new_skill = function(m, j) {
        var h = m[j + 2];
        var l = m[j + 7].split("/");
        var k = m[j + 9].split("|");
        var n = {
            id: m[j],
            name: m[j + 1],
            attr: h,
            grp: m[j + 3],
            xy: m[j + 4],
            desc: m[j + 5],
            req: a.parseStat(m[j + 6]),
            stats: a.parseStat(m[j + 8]),
            next_req: a.parseStat(k[0]),
            next_stat: a.parseStat(k[1]),
            clvl: parseInt(l[0]),
            mlvl: parseInt(l[1]),
            type: h & 1,
            changed: false,
            correct: true,
            ns: [m[j + 6], m[j + 8], k[0], k[1]]
        };
        if (!isset(a.skills[n.id])) {
            n.changed = true
        } else {
            var o = a.skills[n.id];
            if (o.ns[0] != n.ns[0] || o.ns[1] != n.ns[1] || o.ns[2] != n.ns[2] || o.ns[3] != n.ns[3]) {
                n.changed = true
            }
        }
        a.skills[n.id] = n;
        if (!isset(c[n.grp])) {
            c[n.grp] = {
                el: null,
                head: null,
                list: []
            }
        }
        var i = (!isset(n.req.reqp) || n.req.reqp.indexOf(hero.prof) != -1);
        if (c[n.grp].list.indexOf(n.id) == -1 && i) {
            c[n.grp].list.push(n.id)
        }
    };
    this.skillTip = function(k) {
        var m = "";
        m += "<b>" + k.name + "</b><br>";
        m += "<div class='skill_section'>";
        var l = _t("lower_requirements", null, "skills");
        m += "<div class='skill_sec_header'>" + l + "</div>";
        var j = a.statToText($.extend(k.req, k.next_req));
        if (j.length > 0) {
            m += j
        } else {
            m += _t("none")
        }
        m += "</div>";
        m += "<div class='skill_desc skill_section'>" + k.desc + "</div>";
        j = a.statToText(k.stats);
        if (j.length > 0) {
            m += "<div class='skill_section'>";
            var i = _t("stats_stats", null, "skills");
            m += "<div class='skill_sec_header'>" + i + "</div>";
            m += j;
            m += "</div>"
        }
        j = a.statToText(k.next_stat);
        if (j.length > 0) {
            m += "<div class='skill_next skill_section'>";
            var i = _t("stats_next_stats", null, "skills");
            m += "<div class='skill_sec_header'>" + i + "</div>";
            m += j;
            m += "</div>";
            if (e) {
                m += "<div class='skill_sec_cost'>";
                var n = round(Math.floor(Math.pow(hero.lvl, 1.9)), 1);
                var h = _t("cost_lvl %cost%", {
                    "%cost%": n
                }, "skills");
                m += h;
                m += "</div>"
            }
        }
        return m
    };
    this.getRoundLang = function(h) {
        if (h > 4) {
            return _t("five_round")
        }
        if (h > 1) {
            return _t("two_round")
        }
        return _t("one_round")
    };
    this.statToText = function(C) {
        var l = [];
        for (var o in C) {
            var q = "";
            var z = o;
            var n = C[o];
            var B = n.indexOf("@");
            var h = null;
            if (B != -1 && B < n.length) {
                var k = n.substr(B + 1);
                n = n.substr(0, B);
                var v = z != "en-regen" ? _t("on") : _t("by");
                h = v + k + a.getRoundLang(k)
            }
            B = n.indexOf("*plvl");
            if (B != -1 && B < n.length) {
                n = n.substr(0, B);
                if (h == null) {
                    h = ""
                }
                h += _t("value_increase_per_player")
            }
            var p = "default";
            var r = n;
            var A = "";
            var y = "normal";
            switch (z) {
                case "step":
                    q += "<span class=" + y + ">" + _t("skill_" + z);
                    break;
                case "norm-atack":
                    q += "<span class=" + y + ">" + _t("skill_" + z);
                    break;
                case "redacdmg_per":
                case "acshield_per":
                case "perdmg":
                case "ac_per":
                case "pdmg":
                case "ac":
                    q += "<span class=" + y + ">" + _t("item_" + z + " %val%", {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "decevade_per":
                case "active_decevade_per":
                    q += "<span class=" + y + ">" + _t("skills_" + z + " %val%", {
                        "%val%": r,
                        "%val2%": A,
                        "%val3%": (r < 2 ? _t("percentPoints1") : r > 4 ? _t("percentPoints3") : _t("percentPoints2"))
                    }, p);
                    break;
                case "decevade":
                    var s = r > 4 ? "" : "2";
                    q += "<span class=" + y + ">" + _t("skills_" + s + z + " %val%", {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "agi":
                case "firebon":
                case "lightbon":
                case "frostbon":
                    q += "<span class=" + y + ">" + _t("skills_" + z + " %val%", {
                        "%val%": mp(Math.floor(parseFloat(r) * 100)),
                        "%val2%": mp(Math.floor(parseFloat(A) * 100))
                    }, p);
                    break;
                case "critslow_per":
                case "critslow":
                case "critsa_per":
                case "critsa":
                case "immobilize":
                case "lastcrit":
                case "redslow":
                case "woundred":
                case "healpower":
                case "engback":
                case "sa-clothes":
                case "red-sa":
                case "footshoot":
                case "critwound":
                case "swing":
                case "distract":
                case "injure":
                case "reusearrows":
                case "pcontra":
                case "fastarrow":
                case "bandage_per":
                case "bandage":
                case "set":
                case "resfrost_per":
                case "resfire_per":
                case "longfireshield":
                case "longfrostshield":
                case "longlightshield":
                case "soullink":
                case "poisonbon":
                case "of-thirdatt":
                case "woundchance":
                case "wounddmgbon_perw":
                case "wounddmgbon":
                case "arrowrain":
                case "insult":
                case "frostpunch":
                case "redstun":
                case "active_redstun":
                case "lightmindmg":
                case "actdmg":
                case "hpsa":
                case "mresdmg":
                    q += "<span class=" + y + ">" + _t("skills_" + z + " %val%", {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "disturbshoot":
                    q += "<span class=" + y + ">" + _t("skill_" + z + " %val%", {
                        "%val%": r,
                        "%val2%": r * 2
                    }, p);
                    break;
                case "str":
                case "stepslow_per":
                case "poisonbon_poison-perw":
                case "arrowrain_all-perw":
                case "manarestore_per":
                case "rime_per":
                case "firepunch_fire-perw":
                case "heal1_per":
                case "pdmg_physical-perw":
                case "energyrestore_per":
                case "allcritval":
                case "vamp":
                case "reddest_per":
                case "poisonstab_perw":
                case "woundextend":
                case "energyout":
                case "adrenalin_per":
                case "adrenalin_sa_per":
                case "adrenalin_sa_threshold_per":
                case "adrenalin_evade_per":
                case "adrenalin_evade_threshold_per":
                case "critpoison_per":
                case "slowfreeze_per":
                case "absorb_per":
                case "absorbm_per":
                case "heal_per":
                case "distractshoot":
                case "blind_per":
                case "alllowdmg":
                case "perdmg-blesswords":
                case "firedmg_fire-perw":
                case "chainlightning_perw":
                case "absagain_per":
                case "stealmana_per":
                case "allcritmval":
                case "reslight_per":
                case "mcurse":
                case "weakness_per":
                case "antidote":
                case "lowtension":
                case "vulture_perw":
                case "of-wounddmgbon_perw":
                case "act":
                case "rage_3turns":
                case "critrage_perw":
                case "resfire":
                case "reslight":
                case "resfrost":
                case "adddmg_physical-perw":
                case "active_acdmg_physical-perw":
                case "adddmg_fire-perw":
                    q += "<span class=" + y + ">" + _t("skill_" + z + " %val%", {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "trickyknife":
                    break;
                case "blackout":
                    break;
                case "str1h":
                case "str2h":
                case "of-str":
                    q += "<span class=" + y + ">" + _t("skill_" + z + " %val%", {
                        "%val%": mp(Math.floor(parseFloat(r) * 100)),
                        "%val2%": mp(Math.floor(parseFloat(A) * 100))
                    }, p);
                    break;
                case "runes":
                case "goldpack":
                case "perheal":
                case "crit":
                case "active_crit":
                case "of-crit":
                case "critval":
                case "of-critval":
                case "critmval":
                case "critmval_f":
                case "critmval_c":
                case "critmval_l":
                case "heal":
                case "pierce":
                case "pierceb":
                case "contra":
                case "parry":
                case "fire":
                case "light":
                case "adest":
                case "absorb":
                case "absorbm":
                case "hpbon":
                case "acdmg_per":
                case "acdmg_physical-perw":
                case "acdmg":
                case "active_acdmg":
                case "resdmg":
                case "en-regen":
                case "manastr":
                case "manarestore":
                case "manatransfer":
                case "stun":
                case "freeze":
                case "hpcost":
                case "cover":
                case "allslow":
                case "allslow_per":
                case "dmg_evade-target_fire-perw":
                case "firewall_perw":
                case "thunder":
                case "storm":
                case "lowdmg":
                case "lowdmg_self":
                case "lowdmg_enemy":
                case "blizzard":
                case "sunshield_per":
                case "sunreduction":
                case "healall_per":
                case "healall":
                case "heal1":
                case "absorbd":
                case "abdest":
                case "endest":
                case "manadest":
                case "lowevade":
                case "lowcrit":
                case "arrowblock":
                case "redabdest_per":
                    q += "<span class=" + y + ">" + _t("bonus_" + z + " %val%", {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "evade_per":
                    q += "<span class=" + y + ">" + _t("bonus_" + z + " %val%", {
                        "%val%": r,
                        "%val2%": A,
                        "%val3%": (r < 2 ? _t("percentPoints1") : r > 4 ? _t("percentPoints3") : _t("percentPoints2"))
                    }, p);
                    break;
                case "hp":
                case "sa_per":
                case "sa2_per":
                case "ds":
                case "dz":
                case "di":
                case "da":
                case "gold":
                case "blok_per":
                case "blok":
                case "evade":
                case "energybon":
                case "energygain":
                case "manabon":
                case "managain":
                case "aura-resall":
                    q += "<span class=" + y + ">" + _t("bonus_" + z + " %val%", {
                        "%val%": mp(r),
                        "%val2%": mp(A)
                    }, p);
                    break;
                case "dmg_evade_hpp-target":
                case "dmg_evade_hpp-target_light":
                case "lightshield2_per":
                case "lightshield_per":
                case "lightshield":
                    q += "<span class=" + y + ">" + _t("skills_" + z + " %val%", {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "cooldown":
                    q += "<span class=" + y + ">" + _t("skill_" + z, {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    q += r == 1 ? _t("turn") : r > 4 ? _t("turn5") : _t("turns");
                    break;
                case "reqarrows":
                    var s = r > 4 ? "5arrow" : r > 1 ? "2arrow" : "arrow";
                    q += r + " " + _t(s);
                    break;
                case "rage":
                    q += "<span class=" + y + ">" + _t("skills_rage %val% %turn%", {
                        "%val%": r,
                        "%turn%": (parseInt(r) > 1 ? _t("turns") : _t("turn")),
                        "%val2%": A,
                        "%turn2%": (parseInt(A) > 1 ? _t("turns") : _t("turn"))
                    }, p);
                    break;
                case "doubleshoot":
                    q += "<span class=" + y + ">" + _t("skill_doubleshoot");
                    break;
                case "disturb":
                    q += "<span class=" + y + ">" + _t("skills_disturb %val%", {
                        "%val%": r,
                        "%val2%": (parseInt(r) * 2),
                        "%val3%": A,
                        "%val4%": (parseInt(A) * 2)
                    }, p);
                    break;
                case "shout":
                    q += "<span class=" + y + ">" + _t("skills_shout %val%", {
                        "%val%": r > 1 ? _t("enemies %amount%", {
                            "%amount%": r,
                            "%val2%": A
                        }, p) : (r + " " + _t("oneenemy"))
                    });
                    break;
                case "sa1":
                    q += "<span class=" + y + ">" + _t("bonus_sa1 %val%", {
                        "%val%": r / 100,
                        "%val2%": A / 100
                    }, p);
                    break;
                case "leczy":
                    if (r > 0) {
                        q += "<span class=" + y + ">" + _t("bonus_leczy %val%", {
                            "%val%": r,
                            "%val2%": A
                        }, p)
                    } else {
                        q += "<span class=" + y + ">" + _t("bonus_truje %val%", {
                            "%val%": r,
                            "%val2%": A
                        }, p)
                    }
                    break;
                case "fullheal":
                    q += "<span class=" + y + ">" + _t("bonus_fullheal %val%", {
                        "%val%": round(r, 2),
                        "%val2%": round(A, 2)
                    }, p);
                    break;
                case "creditsbon":
                    q += "<span class=" + y + ">" + _t("bonus_creditsbon");
                    break;
                case "revive":
                    q += "<span class=" + y + ">" + _t("revive %amount%", {
                        "%amount%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "frost":
                    b = r.split(",");
                    q += "<span class=" + y + ">" + _t("bonus_frost %val% %slow%", {
                        "%val%": b[1],
                        "%slow%": (b[0] / 100)
                    }, p);
                    break;
                case "poison":
                    b = r.split(",");
                    q += "<span class=" + y + ">" + _t("bonus_poison %val% %slow%", {
                        "%val%": b[1],
                        "%slow%": (b[0] / 100)
                    }, p);
                    break;
                case "slow":
                    q += "<span class=" + y + ">" + _t("bonus_slow %val%", {
                        "%val%": (r / 100),
                        "%val2%": (A / 100)
                    }, p);
                    break;
                case "wound":
                    b = r.split(",");
                    q += "<span class=" + y + ">" + _t("bonus_wound %val% %dmg%", {
                        "%val%": b[0],
                        "%dmg%": b[1]
                    }, p);
                    break;
                case "energy":
                    if (r > 0) {
                        q += "<span class=" + y + ">" + _t("bonus_energy1 %val%", {
                            "%val%": r,
                            "%val2%": A
                        }, p)
                    } else {
                        q += "<span class=" + y + ">" + _t("bonus_energy2 %val%", {
                            "%val%": Math.abs(r),
                            "%val2%": Math.abs(A)
                        }, p)
                    }
                    break;
                case "energyp":
                    if (r > 0) {
                        q += "<span class=" + y + ">" + _t("bonus_energyp1 %val%", {
                            "%val%": mp(r),
                            "%val2%": mp(A)
                        }, p)
                    } else {
                        q += "<span class=" + y + ">" + _t("bonus_energyp2 %val%", {
                            "%val%": Math.abs(r),
                            "%val2%": Math.abs(A)
                        }, p)
                    }
                    break;
                case "mana":
                    if (r > 0) {
                        q += "<span class=" + y + ">" + _t("bonus_mana1 %val%", {
                            "%val%": r,
                            "%val2%": A
                        }, p)
                    } else {
                        q += "<span class=" + y + ">" + _t("bonus_mana2 %val%", {
                            "%val%": Math.abs(r),
                            "%val2%": Math.abs(A)
                        }, p)
                    }
                    break;
                case "firearrow":
                case "firepunch":
                case "firebolt":
                    q += "<span class=" + y + ">" + _t("bonus_firebolt %val%", {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "sunshield":
                    q += "<span class=" + y + ">" + _t("bonus_sunshield %val%", {
                        "%val%": r,
                        "%val2%": (r / 2)
                    }, p);
                    break;
                case "aura-ac_per":
                case "aura-ac":
                    q += "<span class=" + y + ">" + _t("bonus_aura-ac %val%", {
                        "%val%": mp(r),
                        "%val2%": mp(A)
                    }, p);
                    break;
                case "aura-sa_per":
                    q += "<span class=" + y + ">" + _t("bonus_aura-sa_per %val%", {
                        "%val%": mp(r),
                        "%val2%": mp(A)
                    }, p);
                    break;
                case "aura-sa":
                    q += "<span class=" + y + ">" + _t("bonus_aura-sa %val%", {
                        "%val%": mp(r / 100),
                        "%val2%": mp(A / 100)
                    }, p);
                    break;
                case "stinkbomb":
                    q += "<span class=" + y + ">" + _t("bonus_stinkbomb %val% %crit%", {
                        "%val%": (parseInt(r) * 2),
                        "%crit%": r,
                        "%val2%": (parseInt(A) * 2),
                        "%crit2%": A
                    }, p);
                    break;
                case "reqp":
                    break;
                case "reqw":
                    b = r.split(",");
                    var D = [];
                    for (var w in b) {
                        var m = d[b[w]];
                        for (var u in m) {
                            var o = m[u];
                            if (hero.prof == "m" && (o == 1 || o == 2)) {
                                o += 5
                            }
                            var s = _t("wp_" + o, null, "si_skills_req");
                            D.push(s)
                        }
                    }
                    q += D.join(", ");
                    break;
                case "lvl":
                    break;
                case "unav":
                    break;
                case "dmg_to_npc_per":
                case "dmg_from_npc_per":
                case "dmg_to_player_per":
                case "dmg_from_player_per":
                case "chest_armor_per":
                case "critval-enemies":
                case "critval-allies":
                case "critmval-enemies":
                case "critmval-allies":
                case "crush_threshold_per":
                case "crush_dmg_per":
                case "vamp_time_per":
                case "dmg-swing_physical-perw":
                case "taken_dmg_per":
                case "critpierce_per":
                case "dmg-row_fire-perw":
                case "dmg-force-4_light-perw":
                case "hp_per-allies":
                case "hp_per-enemies":
                case "heal_per-allies":
                    q += "<span class=" + y + ">" + _t("end-game-percent" + z + " %val%", {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "heal_per-enemies":
                    q += "<span class=" + y + ">" + _t("end-game-percent" + z + " %val%", {
                        "%val%": Math.abs(r),
                        "%val2%": Math.abs(A)
                    }, p);
                    break;
                case "acdmg":
                case "dmg-line_physical":
                case "immunity_to_dmg":
                case "dmg-target_physical":
                case "distortion":
                    q += "<span class=" + y + ">" + _t("end-game-without-percent" + z + " %val%", {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "manaendest":
                    q += "<span class=" + y + ">" + _t("end-game-more-val" + z + " %val% %val2% %val3% %val4%", {
                        "%val%": r,
                        "%val2%": A,
                        "%val3%": Math.round(r / 3),
                        "%val4%": Math.round(A / 3)
                    }, p);
                    break;
                case "rotatingblade":
                case "daggerthrow":
                case "chainlightning":
                case "firewall":
                case "balloflight":
                    break;
                case "doublecastcost_per":
                case "combo-crit":
                case "combo-block":
                case "combo-evade":
                case "combo-wound":
                case "combo-pierce":
                case "combo-skill":
                case "combo-max":
                case "combo_perdmg":
                case "combo_resfire_per":
                case "combo_resfrost_per":
                case "combo_reslight_per":
                case "combo_dmg_hpp-target":
                case "dmg_hpp-target":
                case "combo_dmg_hpp-target_fire":
                case "dmg_hpp-target_fire":
                case "combo_dmg_hpp-target_frost":
                case "dmg_hpp-target_frost":
                case "combo_dmg_hpp-target_light":
                case "dmg_hpp-target_light":
                case "combo_heal_per":
                case "combo_energyrestore_per":
                case "combo_manarestore_per":
                case "combo_lowdmg_enemy":
                case "dmg_hpp-row_fire":
                case "dmg_hpp-row_frost":
                case "dmg_hpp-row_light":
                case "lowheal_per-enemies":
                case "achpp_per":
                case "adrenalin_reddest_threshold_per":
                case "adrenalin_reddest_per_sum":
                case "poisonspread":
                    q += "<span class=" + y + ">" + _t("skill_" + z + " %val%", {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "removeslow-allies":
                case "removestun-allies":
                case "of-woundstart":
                case "poison_lowdmg_per-enemies":
                    q += "<span class=" + y + ">" + _t("skill_" + z, {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    break;
                case "cooldown":
                    q += "<span class=" + y + ">" + _t("skill_" + z, {
                        "%val%": r,
                        "%val2%": A
                    }, p);
                    q += x == 1 ? _t("turn") : x > 4 ? _t("turn5") : _t("turns");
                    break;
                default:
                    if (z != "") {
                        q += "<span class=" + y + ">" + _t("unknown_stat %val%", {
                            "%val%": z
                        }, p) + "</span>"
                    }
                    break
            }
            if (h !== null) {
                q += h
            }
            if (q.length > 0) {
                l.push("- " + q)
            }
        }
        return l.join("<br>")
    };
    this.changeStyle = function(i, h) {
        if (g.bmEditor.enabled) {
            h.handler.removeClass("clickable");
            return false
        }
        if (i.clvl == i.mlvl) {
            h.el.removeClass("disabled");
            h.handler.removeClass("clickable");
            return false
        }
        if (i.next_req.hasOwnProperty("unav")) {
            h.handler.removeClass("clickable");
            h.el.addClass("disabled");
            return false
        }
        h.el.removeClass("disabled");
        h.handler.addClass("clickable");
        return true
    };
    this.oneSkill = function(m, o, u) {
        if (u > 5) {
            return
        }
        var v = 0;
        if (m.req.lvl) {
            v = parseInt(m.req.lvl)
        } else {
            if (m.next_req.lvl) {
                v = parseInt(m.next_req.lvl)
            }
        }
        var l = null;
        if (!isset(f[m.id])) {
            var i = $("<div>").addClass("skillbox_border");
            var n = $("<div>").addClass("skillbox").appendTo(i);
            var p = $("<div>").addClass("skillbox_icon_holder").appendTo(n);
            var k = $("<div>").addClass("skillbox_lvl");
            l = {
                el: n,
                handler: p,
                lvl: k,
                border: i
            };
            if (m.id == 106) {
                var r = _t("edit_fight_mastery", null, "skills");
                $("<div>").addClass("skillbox_bm").attr("tip", r).appendTo(n).click(function() {
                    var t = a.skills[m.id];
                    if (t.clvl > 0) {
                        g.bmEditor.toggleShow()
                    }
                })
            }
            $("<div>").addClass("skillbox_icon skill-icon-" + m.id).appendTo(p).click(function() {
                var t = a.skills[m.id];
                if (a.changeStyle(t, l)) {
                    if (!isset(t.blocked)) {
                        t.blocked = true;
                        _g("skills&learn=" + m.id + "&lvl=" + (t.clvl + 1), function() {
                            t.blocked = false
                        })
                    }
                }
            });
            if (m.type) {
                $("<div>").addClass("skillbox_active").appendTo(n).click(function() {
                    var t = a.skills[m.id];
                    a.changeStyle(t, l)
                })
            }
            a.changeStyle(a.skills[m.id], l);
            k.appendTo(n);
            f[m.id] = l;
            if (u == 0) {
                $("<div>").addClass("skillbox_shadow mini2").appendTo(o)
            } else {
                $("<div>").addClass("skillbox_shadow").appendTo(o)
            }
            i.appendTo(o);
            if (u == 5) {
                $("<div>").addClass("skillbox_shadow mini").appendTo(o)
            }
        } else {
            l = f[m.id];
            a.changeStyle(a.skills[m.id], l)
        }
        if (m.changed) {
            var s = a.skillTip(m);
            l.el.attr("tip", s);
            var h = "";
            if (m.clvl == m.mlvl) {
                h = "cl-6"
            } else {
                if (m.clvl > 0) {
                    var j = m.clvl / m.mlvl;
                    h = "cl-" + Math.ceil(j * 5)
                }
            }
            if (!l.lvl.hasClass(h)) {
                l.lvl.removeClass().addClass("skillbox_lvl " + h)
            }
            l.lvl.text(m.clvl + "/" + m.mlvl);
            if (m.id == 106) {
                var q = l.el.find(".skillbox_bm");
                if (m.clvl > 0) {
                    q.show()
                } else {
                    q.hide()
                }
            }
        }
        return v
    };
    this.show_tab = function(m) {
        if (m.el === null) {
            m.el = $("<div>").addClass("skills_tab").appendTo("#skills_body");
            var p = $("<div>").addClass("skills_tab_header").appendTo(m.el);
            m.head = $("<div>").addClass("skills_tab_text").appendTo(p)
        }
        var j = 25;
        for (var k in m.list) {
            var n = m.list[k];
            var i = a.oneSkill(a.skills[n], m.el, k);
            if (i > j) {
                j = i
            }
        }
        var h = j - 25;
        var o = _t("skill_req_desc", null, "skills");
        if (h > 1) {
            o = _t("skill_req_desc %lvl% %points%", {
                "%lvl%": j,
                "%points%": h
            }, "skills")
        }
        m.head.text(o)
    };
    this.refresh = function(i) {
        for (var h in c) {
            a.show_tab(c[h])
        }
        if (Tip.resize) {
            Tip.resize()
        }
    };
    this.load = function(j) {
        $("#skillcount").empty();
        g.lock.add("skills");
        for (var h = 0; h < j.length; h += 10) {
            a.new_skill(j, h)
        }
        a.refresh();
        if ($("#skills").css("display") != "block") {
            $("#skills DIV.skills").hide();
            $("#skills").fadeIn("fast", function() {
                g.bmEditor.enable()
            })
        }
    }
};