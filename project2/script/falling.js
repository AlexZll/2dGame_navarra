const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const SCO = document.getElementById('sco');
const TIMERRR = document.getElementById('timerrr');

const usry = 120;
var usrx = 100;

// var rightPressed = false;
// var leftPressed = false;
var speed = 5;
var score = 0;
var timeleft = 60;

var dir = 1;
var usrToRight = new Image();
usrToRight.src = "../static/wqh_car2.jpg";
var usrToLeft = new Image();
usrToLeft.src = "../static/wqh_car1.jpg";

var coin = new Image();
coin.src = "../static/coin.gif";
var diamond = new Image();
diamond.src = "../static/diamond.gif";

var coin_value = 2;
var diamond_value = 5;

var cn_height = [];
var cn_value = [];
var cn_speed = [];
var cn_x = [];

var obj = [];
var count = 100;

window.onload = function() {

    initCondition();
    setInterval(drawFortune, 15);
    window.onkeydown = function(evt) {
        // console.log(usrx);
        switch (evt.keyCode) {
            case 39: // right
                {
                    usrx += speed;
                    dir = 1;
                    break;
                }
            case 37: // left
                {
                    dir = 0;
                    usrx -= speed;
                    break;
                }
            default:
                break;

        }
    }
}

function randomGenerator() {
    var attr = [];
    var type = Math.random();
    if (type >= 0.7) {
        attr.push(1);
    } else {
        attr.push(2);
    }
    var s = Math.random() * 3 + 1;
    attr.push(s)
    var posx = Math.random() * 290;
    var posy = Math.random() * 100 - 100;
    attr.push(posx);
    attr.push(posy);
    return attr;
}

function judge(attr) {
    if (100.0 <= attr[3] <= 140.0) {
        if (Math.abs(attr[2] - usrx) <= 5) {
            switch (attr[0]) {
                case 1:
                    score += diamond_value;
                    break;
                case 2:
                    score += coin_value;
                    break;
                default:
                    score += coin_value;
                    break;
            }
            return true;
        }
    } else if (attr[3] > 140.0) {
        return true;
    }
    return false;
}

function generateCOIN() { // generate 500 coins;
    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 5; j++) {
            var tmp = Math.random();
            if (tmp > 0.7) cn_value.push(5);
            else cn_value.push(2);
            // speed: 20~200
            cn_speed.push(1 + tmp * 6);
            cn_height.push(-((i * 200) + (tmp * 5)));
            cn_x.push(-10 + tmp * 270);
        }
    }

}

function drawFortune() {
    // clear all
    ctx.clearRect(0, 0, 900, 850);
    // process car
    // process coin
    for (var i = 0; i < 500; i++) {
        cn_height[i] = cn_height[i] + cn_speed[i];
        if (cn_height[i] > 0) {
            if (cn_value[i] == 2) { // coin
                ctx.drawImage(coin, cn_x[i], cn_height[i], 10, 10);
                ctx.save();
            } else if (cn_value[i] == 5) { // diamond
                ctx.drawImage(diamond, cn_x[i], cn_height[i], 10, 10);
                ctx.save();
            }
        }
        if (cn_height[i] > 103) {
            if (cn_x[i] >= usrx - 22.5 && cn_x[i] <= usrx + 22.5) {
                score = score + cn_value[i];
                cn_value[i] = 0;
            }
        }
        if (cn_height[i] > 200) cn_speed[i] = 0;
    }
    // draw coin

    // draw car
    if (dir) ctx.drawImage(usrToRight, usrx, usry, 45, 35);
    else ctx.drawImage(usrToLeft, usrx, usry, 45, 35);
    ctx.save();

    console.log("score=" + score);
    timeleft -= 0.2;

    SCO.innerHTML = score;
    TIMERRR.innerHTML = timeleft;

}

function initCondition() {
    // usrx += speed;
    generateCOIN();
    dir = 1;
    ctx.clearRect(0, 0, 900, 850);
    ctx.beginPath();
    ctx.drawImage(usrToRight, usrx, usry, 30, 50);
    ctx.stroke();
}