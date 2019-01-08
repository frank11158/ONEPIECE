var width = 4;
var padding = 10;
var blocks = [];
var nums = [];
var parity = 1;
var path = [];
var rc = [[3, 3], [0, 0], [0, 1], [0, 2],
[0, 3], [1, 0], [1, 1], [1, 2],
[1, 3], [2, 0], [2, 1], [2, 2],
[2, 3], [3, 0], [3, 1], [3, 2]];

var goal = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
var step27 = [[1, 0, 15, 3], [5, 2, 6, 11], [13, 10, 8, 4], [14, 7, 9, 12]];
var step28 = [[3, 9, 4, 8], [1, 2, 7, 6], [0, 11, 5, 15], [13, 10, 12, 14]];
var step32_1 = [[3, 7, 8, 12], [2, 0, 10, 15], [1, 11, 4, 6], [9, 5, 13, 14]];
var step32_2 = [[15, 1, 6, 3], [5, 8, 4, 0], [13, 7, 2, 14], [10, 9, 12, 11]];
/* step48: threshold不改變， initial:32，2'45 ; threshold+=3， 1'30 */
var step48 = [[8, 15, 3, 6], [9, 1, 7, 4], [10, 13, 0, 11], [12, 2, 5, 14]];
/* step50: threshold不改變， initial:37，; threshold+=3， 53 */
var step50 = [[8, 4, 2, 7], [9, 12, 1, 15], [3, 5, 14, 0], [11, 6, 13, 10]];
var veryeasy = [[1, 2, 3, 0], [5, 6, 7, 4], [9, 10, 11, 8], [13, 14, 15, 12]];
var count = 0;
var prev = [38, 40, 37, 39];
var move = [];
var root;
var move_count;
var translate = { 38: "上", 40: "下", 37: "左", 39: "右" };
var imageObj = [];
var images = ["00", "01", "02", "03", "10", "11", "12", "13", "20", "21", "22", "23", "30", "31", "32", "33"];
document.addEventListener("keydown", keyDownHandler, false);

/* Load in the images */
for (var i = 0; i < 16; ++i) {
    imageObj[i] = new Image();
    imageObj[i].src = "./imgs/" + images[i] + ".jpg";
}

imageObj[0].onload = function () {
    console.log("img load");
    while (parity == 1) {
        initial();
        check_parity();
    }
    drawBlocks();
}

function one_step() {
    move_direction(move[move_count++], 1, blocks);
}

function automove() {
    setInterval(function () {
        if (move_count <= move.length)
            one_step();
    }, 400);
}

function solve() {
    move = [];
    move_count = 0;
    document.getElementById("log").innerHTML = "Searching..." + "<br>";
    root = $.extend(true, {}, blocks); // deep copy the "blocks" array to new array "root"
    if (IDA_star() === "FOUND") {
        console.log("finish!");
        console.log("moves:" + move);
        console.log("參考:" + prev);
        for (var i = 0; i < move.length; i++) {
            document.getElementById("log").innerHTML += translate[move[i]] + " ";
        }
    }
}

function h() {
    document.getElementById("log").innerHTML = heuristic(blocks) + "<br>";
}

function initial() {
    blocks = []; nums = [];
    for (var r = 0; r < width; r++) {
        blocks[r] = [];
        for (var c = 0; c < width; c++){
            /*while (1) {
                var random = Math.floor((Math.random() * 16));
                //var inArray = nums.includes(random);
                if (!nums.includes(random)) {
                    nums.push(random);
                    blocks[r][c] = random;
                    break;
                }
            }*/
            blocks[r][c] = step32_2[r][c]; 
        }
    }
}

function check_parity() {
    var f1 = 0, f2 = 0;
    var arr = [];
    for (var r = 0; r < width; r++)
        for (var c = 0; c < width; c++)
            if (blocks[r][c] != 0)
                arr.push(blocks[r][c]);
            else
                f2 += (r + 1);

    for (var i = 0; i < 15; ++i)
        for (var j = i; j < 15; ++j)
            if (arr[i] > arr[j])
                f1++;

    parity = ((f1 + f2) % 2 == 0) ? 2 : 1;
}

function drawBlocks() {
    var urlstring, div;
    for (var r = 0; r < width; r++) {
        for (var c = 0; c < width; c++) {
            div = document.querySelector(".r" + r + " .c" + c);
            console.log(imageObj[blocks[r][c]].src);
            if (blocks[r][c] == 0) {
                div.style.background = "#77DDFF";
                div.innerHTML = "";
            } else {
                //div.innerHTML = blocks[r][c];
                urlstring = "url('" + imageObj[blocks[r][c]-1].src + "')";
                div.style.backgroundImage = urlstring;
            }
        }
    }
}


function keyDownHandler(e) {
    move_direction(e.keyCode, 1, blocks);
}

function move_direction(direction, change_real, node) {
    var blank_r, blank_c;
    var temp_blocks = $.extend(true, {}, node);
    for (var r = 0; r < width; r++) {
        for (var c = 0; c < width; c++) {
            if (node[r][c] == 0) {
                blank_r = r; blank_c = c;
            }
        }
    }
    switch (direction) {
        case 38:
            if (blank_r + 1 > 3)
                return -1;
            else {
                temp_blocks[blank_r][blank_c] = temp_blocks[blank_r + 1][blank_c];
                temp_blocks[blank_r + 1][blank_c] = 0;
            }
            break;
        case 40:
            if (blank_r - 1 < 0)
                return -1;
            else {
                temp_blocks[blank_r][blank_c] = temp_blocks[blank_r - 1][blank_c];
                temp_blocks[blank_r - 1][blank_c] = 0;
            }
            break;
        case 37:
            if (blank_c + 1 > 3)
                return -1;
            else {
                temp_blocks[blank_r][blank_c] = temp_blocks[blank_r][blank_c + 1];
                temp_blocks[blank_r][blank_c + 1] = 0;
            }
            break;
        case 39:
            if (blank_c - 1 < 0)
                return -1;
            else {
                temp_blocks[blank_r][blank_c] = temp_blocks[blank_r][blank_c - 1];
                temp_blocks[blank_r][blank_c - 1] = 0;
            }
            break;
    }
    if (change_real == 1) {
        blocks = $.extend(true, {}, temp_blocks);
        drawBlocks();
        return -1;
    } else {
        return temp_blocks;
    }
}

function IDA_star() {
    var threshold = heuristic(root);
    document.getElementById("log").innerHTML += "Initial threshold:" + threshold + "<br>";
    path.push(root);
    while (1) {
        console.log("search:" + "threshold:" + threshold, count);
        var temp = search(path, 0, threshold, -1);
        if (temp === "FOUND")
            return "FOUND";
        threshold = temp;
        count++;
        document.getElementById("log").innerHTML += "Threshold " + count + ":" + threshold + "<br>";

        /*if(count == 2)
            break;*/
    }
}

function search(path, g, threshold, prev_move) {
    var node = path[path.length - 1];
    var f = g + heuristic(node);
    if (f > threshold)
        return f;
    if (test_goal(node) == 1) {
        console.log("Find the answer!!");
        console.log("g:" + g + " f:" + f + " threshold:" + threshold + " node: ");
        document.getElementById("log").innerHTML += "找到最佳解!!" + "<br>";
        document.getElementById("log").innerHTML += "g:" + g + " f:" + f + " threshold:" + threshold + "<br>" + "電腦解答：" + "<br>";
        return "FOUND";
    }
    var min = Number.MAX_SAFE_INTEGER;
    var next = next_nodes(node, prev_move);
    for (var i = 0; i < 4; ++i) {
        if (next[i] == 0)
            continue;
        path.push(next[i]);
        move.push(prev[i]);
        var temp = search(path, g + 1, threshold, prev[i]);
        if (temp === "FOUND")
            return "FOUND";
        if (temp < min)
            min = temp;
        path.pop();
        move.pop();
    }
    return min;
}

function heuristic(node) {
    var h = 0;
    for (var r = 0; r < width; r++) {
        if (node[r][0] != 0)
            h += Math.abs(rc[node[r][0]][0] - r) + Math.abs(rc[node[r][0]][1] - 0);
        if (node[r][1] != 0)
            h += Math.abs(rc[node[r][1]][0] - r) + Math.abs(rc[node[r][1]][1] - 1);
        if (node[r][2] != 0)
            h += Math.abs(rc[node[r][2]][0] - r) + Math.abs(rc[node[r][2]][1] - 2);
        if (node[r][3] != 0)
            h += Math.abs(rc[node[r][3]][0] - r) + Math.abs(rc[node[r][3]][1] - 3);
    }
    /*for (var r = 0; r < width; r++) {
        for (var c = 0; c < width; c++) {
            if (node[r][c] != 0)
                h += Math.abs(rc[node[r][c]][0] - r) + Math.abs(rc[node[r][c]][1] - c);
        }
    }*/
    return h;
}

function test_goal(node) {
    for (var r = 0; r < width; r++) {
        for (var c = 0; c < width; c++) {
            if (node[r][c] != goal[r][c])
                return -1;
        }
    }
    return 1;
}

function next_nodes(node, prev_move) {
    var next = [];
    var temp;
    switch (prev_move) {
        case 38:
            temp = move_direction(38, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            next.push(0);
            temp = move_direction(37, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            temp = move_direction(39, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            break;
        case 40:
            next.push(0);
            temp = move_direction(40, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            temp = move_direction(37, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            temp = move_direction(39, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            break;
        case 37:
            temp = move_direction(38, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            temp = move_direction(40, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            temp = move_direction(37, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            next.push(0);
            break;
        case 39:
            temp = move_direction(38, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            temp = move_direction(40, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            next.push(0);
            temp = move_direction(39, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            break;
        case -1:
            temp = move_direction(38, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            temp = move_direction(40, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            temp = move_direction(37, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            temp = move_direction(39, 0, node);
            if (temp != -1)
                next.push(temp);
            else
                next.push(0);
            break;
    }
    return next;
}

function node_in_path(node, path) {
    var same = false;
    for (var i = 0; i < path.length; ++i) {
        var inloop_same = true;
        for (var r = 0; r < width; r++) {
            for (var c = 0; c < width; c++) {
                if (node[r][c] != path[i][r][c]) {
                    inloop_same = false;
                }
            }
        }
        if (inloop_same == true)
            same = true;
    }
    return same;
}