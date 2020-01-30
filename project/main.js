// Constants
var WALL = 0;
var BLANK = 9;
var P1 = -1;
var P2 = -2;
var BROKEN = -99; // 99 for testing

var speed = 57;
var img_max_height = 57; // unit height
var img_max_width = 57; // unit width
var map_horizontal_count = 15;
var map_vertical_count = 14;
var p1_init_X = 3;
var p1_init_Y = 4;

// 0-wall, 9-blank, 1(or more)-light, (-1)-p1, (-2)-p2
var orimap = [
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0],
    [9, 0, 0, 9, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0],
    [9, 0, 0, -1, 9, 9, 9, 9, 0, 9, 9, 9, 9, 0, 0],
    [9, 9, 9, 9, 9, 0, 0, 9, 0, 9, 0, 0, 9, 0, 0],
    [0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 9, 0, 0],
    [0, 0, 0, 9, 9, 9, 0, 0, 9, 9, 9, 9, 9, 0, 0],
    [9, 0, 0, 0, 9, 9, 0, 0, 9, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 9, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9],
    [9, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 0, 0, 0, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var tmp_p1 = [3, 3];


var map = { width: img_max_width * map_horizontal_count, height: img_max_height * map_vertical_count };
var box = { width: img_max_width, height: img_max_height };
var nums = {
    hNum: map.width / box.width,
    vNum: map.height / box.height
};
var unit = [];

window.onload = function() {
    initMap();
    // setInterval(move, 400);
    window.onkeydown = function(evt) {
        switch (evt.keyCode) {
            case 87: // w(up)
                {
                    if ((tmp_p1[1] - 1) < 0 || (tmp_p1[1] - 1) >= map_vertical_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p1[1] - 1][tmp_p1[0]] > 0) {
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "broken";
                        orimap[tmp_p1[1]][tmp_p1[0]] = BROKEN;
                        orimap[tmp_p1[1] - 1][tmp_p1[0]] = P1;
                        tmp_p1[1] = tmp_p1[1] - 1;
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "p1";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            case 83: // s(down)
                {
                    if ((tmp_p1[1] + 1) < 0 || (tmp_p1[1] + 1) >= map_vertical_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p1[1] + 1][tmp_p1[0]] > 0) {
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "broken";
                        orimap[tmp_p1[1]][tmp_p1[0]] = BROKEN;
                        orimap[tmp_p1[1] + 1][tmp_p1[0]] = P1;
                        tmp_p1[1] = tmp_p1[1] + 1;
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "p1";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            case 65: // a(left)
                {
                    if ((tmp_p1[0] - 1) < 0 || (tmp_p1[0] - 1) >= map_horizontal_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p1[1]][tmp_p1[0] - 1] > 0) {
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "broken";
                        orimap[tmp_p1[1]][tmp_p1[0]] = BROKEN;
                        orimap[tmp_p1[1]][tmp_p1[0] - 1] = P1;
                        tmp_p1[0] = tmp_p1[0] - 1;
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "p1";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            case 68: // d(right)
                {
                    if ((tmp_p1[0] + 1) < 0 || (tmp_p1[0] + 1) >= map_horizontal_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p1[1]][tmp_p1[0] + 1] > 0) {
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "broken";
                        orimap[tmp_p1[1]][tmp_p1[0]] = BROKEN;
                        orimap[tmp_p1[1]][tmp_p1[0] + 1] = P1;
                        tmp_p1[0] = tmp_p1[0] + 1;
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "p1";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            default:
                break;
        }
    }
}

function initMap() {
    var map_target = document.getElementById("map");
    map_target.style.width = map.width + "px";
    map_target.style.height = map.height + "px";
    var newSpan = null;

    for (var i = 0; i < nums.vNum; i++) {
        for (var j = 0; j < nums.hNum; j++) {
            newSpan = document.createElement("span");
            newSpan.style.width = box.width + "px";
            newSpan.style.height = box.height + "px";
            newSpan.id = 15 * i + j;
            // console.log(15 * i + j);
            map_target.appendChild(newSpan);
            unit.push(newSpan);
            if (orimap[i][j] == P1) {
                newSpan.className = "p1";
                tmp_p1[0] = j;
                tmp_p1[1] = i;
                // p1.push(newSpan);
            } else if (orimap[i][j] == 0) {
                newSpan.className = "wall";
                // other.push(newSpan);
            } else if (orimap[i][j] == 1) {
                newSpan.className = "light1";
            } else {
                newSpan.className = "blank";
            }
        }
    }
}