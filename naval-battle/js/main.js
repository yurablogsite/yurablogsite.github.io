
var html = $.ajax({
    url: "test",
    async: false
}).responseText;

document.getElementById('menu').innerHTML = "Скрыть меню";
var visible = true;

function showFun() {
    if(visible) {

        document.getElementById('myShowBlock' ).style.display = 'none';
         document.getElementById('menu').innerHTML = "Показать меню";
        visible = false;

    } else {

        document.getElementById('myShowBlock' ).style.display = 'flex';
        document.getElementById('menu').innerHTML = "Скрыть меню";
        visible = true;

    }

}


const ship = [[[1, 5], [1, 2, 5], [1, 2, 3, 5], [1, 2, 3, 4, 5]], [[6, 10], [6, 7, 10], [6, 7, 8, 10], [6, 7, 8, 9, 10]]];

const dead = [[[201, 203], [201, 202, 203], [201, 202, 202, 203], [201, 202, 202, 202, 203]],
    [[204, 206], [204, 205, 206], [204, 205, 205, 206], [204, 205, 205, 205, 206]]];

var mn = html[3] ? html[3] : 4;
var fr = html[2] ? html[2] : 3;
var kr = html[1] ? html[1] : 2;
var ln = html[0] ? html[0] : 1;
//console.log(w + " W")


const shiptypes = [["Миноносец", 2, mn], ["Фрегат", 3, fr], ["Крейсер", 4, kr], ["Линкор", 5, ln]];

var gridx = 16, gridy = 16;
var player = [], computer = [], playersships = [], computersships = [];
var playerlives = 0, computerlives = 0, playflag = true, statusmsg = "";

var LC = ln, LU = ln, vicU = 0;
var KC = kr, KU = kr, vicC = 0;
var FC = fr, FU = fr;
var MC = mn, MU = mn;

document.getElementById('lnU').innerHTML = ln;
document.getElementById('krU').innerHTML = kr;
document.getElementById('frU').innerHTML = fr;
document.getElementById('mnU').innerHTML = mn;

document.getElementById('lnC').innerHTML = ln;
document.getElementById('krC').innerHTML = kr;
document.getElementById('frC').innerHTML = fr;
document.getElementById('mnC').innerHTML = mn;

var countMove = document.getElementById('user');

var linkC = document.getElementById('linkC');
var kresC = document.getElementById('kresC');
var fregC = document.getElementById('fregC');
var minC = document.getElementById('minC');
var pobedaC = document.getElementById('pobedaC');

var linkU = document.getElementById('linkU');
var kresU = document.getElementById('kresU');
var fregU = document.getElementById('fregU');
var minU = document.getElementById('minU');
var pobedaU = document.getElementById('pobedaU');

var victoryU = document.getElementById('victoryU');
var victoryC = document.getElementById('victoryC');

victoryC.innerHTML =sessionStorage['detailComp'] ? sessionStorage['detailComp'] : 0;
//victoryU.innerHTML =sessionStorage['detailUser'] ? sessionStorage['detailUser'] : 0;

var w = 0;


var preloaded = [];

function imagePreload() {
    var i, ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 101, 102, 103, 201, 202, 203, 204, 205, 206];
    window.status = "Preloading images...please wait";
    for (i = 0; i < ids.length; ++i) {
        var img = new Image, name = "batt/batt" + ids[i] + ".gif";
        img.src = name;
        preloaded[i] = img;
    }
    window.status = "";
}

function setupPlayer(ispc) {
    var y, x;
    grid = [];
    for (y = 0; y < gridx; ++y) {
        grid[y] = [];
        for (x = 0; x < gridx; ++x)
            grid[y][x] = [100, -1, 0];
    }

    var shipno = 0;
    var s;
    for (s = shiptypes.length - 1; s >= 0; --s) {
        var i;
        for (i = 0; i < shiptypes[s][2]; ++i) {
            var d = Math.floor(Math.random() * 2);
            var len = shiptypes[s][1], lx = gridx, ly = gridy, dx = 0, dy = 0;
            if (d == 0) {
                lx = gridx - len;
                dx = 1;
            } else {
                ly = gridy - len;
                dy = 1;
            }
            var x, y, ok;
            do {
                y = Math.floor(Math.random() * ly);
                x = Math.floor(Math.random() * lx);
                var j, cx = x, cy = y;
                ok = true;
                for (j = 0; j < len; ++j) {
                    if (grid[cy][cx][0] < 100) {
                        ok = false;
                        break;
                    }
                    cx += dx;
                    cy += dy;
                }
            } while (!ok);
            var j, cx = x, cy = y;
            for (j = 0; j < len; ++j) {
                grid[cy][cx][0] = ship[d][s][j];
                grid[cy][cx][1] = shipno;
                grid[cy][cx][2] = dead[d][s][j];
                cx += dx;
                cy += dy;
            }
            if (ispc) {
                computersships[shipno] = [s, shiptypes[s][1]];
                computerlives++;
            } else {
                playersships[shipno] = [s, shiptypes[s][1]];
                playerlives++;
            }
            shipno++;
        }
    }
    return grid;
}

function setImage(y, x, id, ispc) {
    if (ispc) {
        computer[y][x][0] = id;
        document.images["pc" + y + "_" + x].src = "batt/batt" + id + ".gif";
    } else {
        player[y][x][0] = id;
        document.images["ply" + y + "_" + x].src = "batt/batt" + id + ".gif";
    }
}

function showGrid(ispc) {
    var y, x;
    for (y = 0; y < gridy; ++y) {
        for (x = 0; x < gridx; ++x) {
            if (ispc) {
                document.write('<a href="javascript:gridClick(' + y + ',' + x + ');"><img class="width-img" name="pc' + y + '_' + x + '" src="batt/batt100.gif" width=30 height=30></a>');
            } else
                document.write('<a href="javascript:void(0);"><img class="width-img" name="ply' + y + '_' + x + '" src="batt/batt' + player[y][x][0] + '.gif" width=30 height=30></a>');
        }
        document.write('<br>');
    }
}

function gridClick(y, x) {
    if (playflag) {
        if (computer[y][x][0] < 100) {
            setImage(y, x, 103, true);
            var shipno = computer[y][x][1];
            if (--computersships[shipno][1] == 0) {
                sinkShip(computer, shipno, true);
                //alert("Вы потопили мой "+shiptypes[computersships[shipno][0]][0]+"!");
                if ('Линкор' == shiptypes[playersships[shipno][0]][0]) {
                    LU--;
                }
                if ('Крейсер' == shiptypes[playersships[shipno][0]][0]) {
                    KU--;
                }
                if ('Фрегат' == shiptypes[playersships[shipno][0]][0]) {
                    FU--;
                }
                if ('Миноносец' == shiptypes[playersships[shipno][0]][0]) {
                    MU--;
                }

                updateStatus();
                if (--computerlives == 0) {
                    pobedaU.innerHTML = "Вы выиграли!";
                    // vicU=sessionStorage['detailUser'];
                    // sessionStorage['detailUser'] = ++vicU;
                    //
                    // victoryU.innerHTML =sessionStorage['detailUser'];
                    playflag = false;
                }
            }
            if (playflag) computerMove();
        } else if (computer[y][x][0] == 100) {
            setImage(y, x, 102, true);
            computerMove();
        }
        showUser();
    }
}

var w = 0;

function computerMove() {
    var x, y, pass;
    var sx, sy;
    var selected = false;
    w++;
    countMove.innerHTML = "Колличество выстрелов [ " + w + " ]";

    //moveCount()
    for (pass = 0; pass < 2; ++pass) {
        for (y = 0; y < gridy && !selected; ++y) {
            for (x = 0; x < gridx && !selected; ++x) {
                if (player[y][x][0] == 103) {
                    sx = x;
                    sy = y;
                    var nup = (y > 0 && player[y - 1][x][0] <= 100);
                    var ndn = (y < gridy - 1 && player[y + 1][x][0] <= 100);
                    var nlt = (x > 0 && player[y][x - 1][0] <= 100);
                    var nrt = (x < gridx - 1 && player[y][x + 1][0] <= 100);
                    if (pass == 0) {
                        var yup = (y > 0 && player[y - 1][x][0] == 103);
                        var ydn = (y < gridy - 1 && player[y + 1][x][0] == 103);
                        var ylt = (x > 0 && player[y][x - 1][0] == 103);
                        var yrt = (x < gridx - 1 && player[y][x + 1][0] == 103);
                        if (nlt && yrt) {
                            sx = x - 1;
                            selected = true;
                        } else if (nrt && ylt) {
                            sx = x + 1;
                            selected = true;
                        } else if (nup && ydn) {
                            sy = y - 1;
                            selected = true;
                        } else if (ndn && yup) {
                            sy = y + 1;
                            selected = true;
                        }
                    } else {
                        if (nlt) {
                            sx = x - 1;
                            selected = true;
                        } else if (nrt) {
                            sx = x + 1;
                            selected = true;
                        } else if (nup) {
                            sy = y - 1;
                            selected = true;
                        } else if (ndn) {
                            sy = y + 1;
                            selected = true;
                        }
                    }
                }
            }
        }
    }
    if (!selected) {
        do {
            sy = Math.floor(Math.random() * gridy);
            sx = Math.floor(Math.random() * gridx / 2) * 2 + sy % 2;
        } while (player[sy][sx][0] > 100);
    }
    if (player[sy][sx][0] < 100) {
        setImage(sy, sx, 103, false);
        var shipno = player[sy][sx][1];
        if (--playersships[shipno][1] == 0) {
            sinkShip(player, shipno, false);
            if ('Линкор' == shiptypes[playersships[shipno][0]][0]) {
                LC--;
            }
            if ('Крейсер' == shiptypes[playersships[shipno][0]][0]) {
                KC--;
            }
            if ('Фрегат' == shiptypes[playersships[shipno][0]][0]) {
                FC--;
            }
            if ('Миноносец' == shiptypes[playersships[shipno][0]][0]) {
                MC--;
            }
            //alert("Я потопил Ваш "+shiptypes[playersships[shipno][0]][0]+"!");
            if (--playerlives == 0) {
                knowYourEnemy();
                pobedaC.innerHTML = "Победил компьютер!";
                vicC=sessionStorage['detailComp'];
                sessionStorage['detailComp'] = ++vicC;

                victoryC.innerHTML =sessionStorage['detailComp'];
                playflag = false;
            }

        }
    } else {
        setImage(sy, sx, 102, false);
    }
    showComp();
}

function sinkShip(grid, shipno, ispc) {
    var y, x;
    for (y = 0; y < gridx; ++y) {
        for (x = 0; x < gridx; ++x) {
            if (grid[y][x][1] == shipno)
                if (ispc) setImage(y, x, computer[y][x][2], true);
                else setImage(y, x, player[y][x][2], false);
        }
    }
}

function knowYourEnemy() {
    var y, x;
    for (y = 0; y < gridx; ++y) {
        for (x = 0; x < gridx; ++x) {
            if (computer[y][x][0] == 103)
                setImage(y, x, computer[y][x][2], true);
            else if (computer[y][x][0] < 100)
                setImage(y, x, computer[y][x][0], true);
        }
    }
}

function updateStatus() {
    var f = false, i, s = "Computer has ";
    for (i = 0; i < computersships.length; ++i) {
        if (computersships[i][1] > 0) {
            if (f) s = s + ", "; else f = true;
            s = s + shiptypes[computersships[i][0]][0];
        }
    }
    if (!f) s = s + "больше ничего не осталось. Спасибо!!";
    statusmsg = s;
    window.status = statusmsg;
}

function setStatus() {
    window.status = statusmsg;
}

function showComp() {
    linkC.innerHTML = LC;
    kresC.innerHTML = KC;
    fregC.innerHTML = FC;
    minC.innerHTML = MC;
}

function showUser() {
    linkU.innerHTML = LU;
    kresU.innerHTML = KU;
    fregU.innerHTML = FU;
    minU.innerHTML = MU;
}


imagePreload();
showComp();
showUser();

player = setupPlayer(false);
computer = setupPlayer(true);
document.write("<center><table id='table'><tr><td align=center><p class='heading'>Игровое поле компьютера</p></td>" +
    "<td align=center><p class='heading'>Ваше игровое поле</p><p></p></td></tr><tr><td>");
showGrid(true,70);
document.write("</td><td>");
showGrid(false);
document.write("</td></tr></table></center>");
updateStatus();
setInterval("setStatus();", 500);
