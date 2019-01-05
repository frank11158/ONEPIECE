var blocks = [];
var colors = ["#555", "#FFFFBB", "#FFDDAA", "#FFAA33", "#FF7744", "#FF3333", "#FF0000", "#FFCC22", "#FF8800", "#FFFF33", "gold", "goldenrod", "orangered"];
var width = 4;
var global_id = 0;
var lock = false;
var first_create = 0;
var create_one = false;
var moved = false;
var imageObj = [];
var images = [0, "luffy", "zoro", "nami", "usopp", "sanji", "chopper", "robin", "franky", "brook", "ace", "shanks", "roger_1"];
var head = "./images/";
var tail = ".jpg";
var score = 0;

/* Load in the images */
for (var i = 1; i < 13; ++i) {
    imageObj[i] = new Image();
    imageObj[i].src = head.concat(images[i]).concat(tail);
}
imageObj[1].onload = function () {
    initial();
}

document.addEventListener("keydown", keyDownHandler, false);

function initial() {
    for (var r = 0; r < width; r++) {
        blocks[r] = [];
        for (var c = 0; c < width; c++) {
            blocks[r][c] = { val: 1, step_count: 0, remove: false, id: -1, top: 100 * r + 10 * (r + 1), left: 100 * c + 10 * (c + 1) };
        }
    }

    var r1 = 0, c1 = 0, r2 = 0, c2 = 0;
    while (r1 == r2 && c1 == c2) {
        r1 = Math.floor((Math.random() * 4));
        c1 = Math.floor((Math.random() * 4));
        r2 = Math.floor((Math.random() * 4));
        c2 = Math.floor((Math.random() * 4));
    }
    create_div(r1, c1, 2);
    set_val_color(r1, c1, 2);
    create_div(r2, c2, 2);
    set_val_color(r2, c2, 2);
    for (var r = 0; r < width; r++) {
        for (var c = 0; c < width; c++) {
            console.log(blocks[r][c].id);
        }
    }
}

function create_div(r, c) {
    var new_div = document.createElement('div');
    new_div.className = 'block';
    new_div.style.top = blocks[r][c].top + 'px';
    new_div.style.left = blocks[r][c].left + 'px';
    blocks[r][c].id = 'id' + global_id++;
    new_div.id = blocks[r][c].id;
    new_div.innerHTML = 2;
    
    //new_div.style.backgroundImage = "url('./images/luffy.jpg')";
    document.getElementsByClassName('big_bg')[0].appendChild(new_div);
    if (first_create < 2) {
        anime({
            targets: "#" + new_div.id,
            duration: 1000,
            rotate: 360
        });
        first_create++;
    }
}

function set_val_color(r, c, val) {
    blocks[r][c].val = val;
    //document.getElementById(blocks[r][c].id).style.backgroundColor = colors[Math.log(blocks[r][c].val) / Math.log(2)];
    var urlstring = "url('" + imageObj[Math.log(blocks[r][c].val) / Math.log(2)].src + "')";
    console.log(urlstring);
    document.getElementById(blocks[r][c].id).style.backgroundImage = urlstring;

}

function keyDownHandler(e) {
    if (lock == false) {
        lock = true;
        move_direction(e.keyCode);
        anime({
            targets: '.big_bg',
            duration: 300,
            complete: function (anim) {
                lock = false;
            }
        });
    }
}

function move_direction(direction) {
    switch (direction) {
        case 38: // up
            for (var r = 0; r < width; r++) {
                for (var c = 0; c < width; c++) {
                    step_count(r, c, direction);
                }
            }
            break;
        case 40: // down
            for (var r = 3; r > -1; r--) {
                for (var c = 0; c < width; c++) {
                    step_count(r, c, direction);
                }
            }
            break;
        case 37: // left
            for (var r = 0; r < width; r++) {
                for (var c = 0; c < width; c++) {
                    step_count(r, c, direction);
                }
            }
            break;
        case 39: // right
            for (var r = 0; r < width; r++) {
                for (var c = 3; c > -1; c--) {
                    step_count(r, c, direction);
                }
            }   
            break;
    }
    move_animate(direction);
    panda_man();
}

function step_count(r, c, direction) {
    switch (direction) {
        case 38:
            blocks[r][c].remove = false;
            blocks[r][c].step_count = 0;
            if (blocks[r][c].val != 1) {
                var temp_r = r, add_val = blocks[r][c].val;
                while (temp_r - 1 >= 0) {
                    if (blocks[temp_r - 1][c].val == 1) {
                        blocks[r][c].step_count++;
                    } else if (blocks[temp_r - 1][c].val != blocks[r][c].val) {
                        break;
                    } else if (blocks[temp_r - 1][c].val == blocks[r][c].val) {
                        blocks[r][c].step_count++;
                        add_val = blocks[r][c].val * 2;
                        blocks[r][c].remove = true;
                        score+=add_val;
                        break;
                    }
                    temp_r--;
                }
                if (blocks[r][c].step_count != 0) {
                    blocks[r][c].val = 1;
                }
                blocks[r - blocks[r][c].step_count][c].val = add_val;
            }
            break;
        case 40:
            blocks[r][c].remove = false;
            blocks[r][c].step_count = 0;
            if (blocks[r][c].val != 1) {
                var temp_r = r, add_val = blocks[r][c].val;
                while (temp_r + 1 <= 3) {
                    if (blocks[temp_r + 1][c].val == 1) {
                        blocks[r][c].step_count++;
                    } else if (blocks[temp_r + 1][c].val != blocks[r][c].val) {
                        break;
                    } else if (blocks[temp_r + 1][c].val == blocks[r][c].val) {
                        blocks[r][c].step_count++;
                        add_val = blocks[r][c].val * 2;
                        blocks[r][c].remove = true;
                        score+=add_val;
                        break;
                    }
                    temp_r++;
                }
                if (blocks[r][c].step_count != 0) {
                    blocks[r][c].val = 1;
                }
                blocks[r + blocks[r][c].step_count][c].val = add_val;
            }
            break;
        case 37:
            blocks[r][c].remove = false;
            blocks[r][c].step_count = 0;
            if (blocks[r][c].val != 1) {
                var temp_c = c, add_val = blocks[r][c].val;
                while (temp_c - 1 >= 0) {
                    if (blocks[r][temp_c - 1].val == 1) {
                        blocks[r][c].step_count++;
                    } else if (blocks[r][temp_c - 1].val != blocks[r][c].val) {
                        break;
                    } else if (blocks[r][temp_c - 1].val == blocks[r][c].val) {
                        blocks[r][c].step_count++;
                        add_val = blocks[r][c].val * 2;
                        blocks[r][c].remove = true;
                        score+=add_val;
                        break;
                    }
                    temp_c--;
                }
                if (blocks[r][c].step_count != 0) {
                    blocks[r][c].val = 1;
                }
                blocks[r][c - blocks[r][c].step_count].val = add_val;
            }
            break;
        case 39:
            blocks[r][c].remove = false;
            blocks[r][c].step_count = 0;
            if (blocks[r][c].val != 1) {
                var temp_c = c, add_val = blocks[r][c].val;
                while (temp_c + 1 <= 3) {
                    if (blocks[r][temp_c + 1].val == 1) {
                        blocks[r][c].step_count++;
                    } else if (blocks[r][temp_c + 1].val != blocks[r][c].val) {
                        break;
                    } else if (blocks[r][temp_c + 1].val == blocks[r][c].val) {
                        blocks[r][c].step_count++;
                        add_val = blocks[r][c].val * 2;
                        blocks[r][c].remove = true;
                        score+=add_val;
                        break;
                    }
                    temp_c++;
                }
                if (blocks[r][c].step_count != 0) {
                    blocks[r][c].val = 1;
                }
                blocks[r][c + blocks[r][c].step_count].val = add_val;
            }
            break;
    }
}

function move_animate(direction) {
    create_one = false;
    moved = false;
    if (direction == 38) {
        for (var r = 0; r < width; r++) {
            for (var c = 0; c < width; c++) {
                var removed = false;
                var temp_stepcount = blocks[r][c].step_count;
                var temp_block_id = blocks[r][c].id;
                console.log("animation start, step_count = " + temp_stepcount, "move block", r, c);
                if (temp_stepcount != 0) {
                    var targetid = blocks[r - temp_stepcount][c].id;
                    move('#' + temp_block_id)
                        .sub('margin-top', temp_stepcount * 110)
                        .duration('0.2s')
                        .end();
                    var basicTimeline = anime.timeline();
                    basicTimeline
                        .add({
                            targets: '#' + targetid,
                            backgroundColor: { value: colors[Math.log(blocks[r - temp_stepcount][c].val) / Math.log(2)] },
                            duration: 10,
                        })
                        .add({
                            targets: '#' + targetid,
                            scale: {
                                value: 1.05,
                                duration: 50,
                                easing: 'easeInOutQuart',
                            },
                        })
                        .add({
                            targets: '#' + targetid,
                            scale: {
                                value: 1,
                                duration: 50,
                                easing: 'easeInOutQuart',
                            },
                        });
                    anime({

                    });
                    moved = true;
                }

                if (blocks[r][c].remove == true) {
                    blocks[r][c].id = -1;
                    document.getElementById(temp_block_id).remove();
                    removed = true;
                    console.log("remove!");
                    document.getElementById(blocks[r - temp_stepcount][c].id).style.backgroundImage = "url('" + imageObj[Math.log(blocks[r - temp_stepcount][c].val) / Math.log(2)].src + "')";
                    if(blocks[r - temp_stepcount][c].val == 512)
                        document.getElementsByClassName("big_bg")[0].style.backgroundImage = "url('images/bg1_1.jpg')";
                    else if(blocks[r - temp_stepcount][c].val == 1024)
                        document.getElementsByClassName("big_bg")[0].style.backgroundImage = "url('images/bg2_1.jpg')";

                }
                if (removed == false) {
                    if (temp_stepcount != 0) {
                        blocks[r - temp_stepcount][c].id = blocks[r][c].id;
                        blocks[r][c].id = -1;
                        console.log("change id");
                    }
                }
            }
        }
    } else if (direction == 40) {
        for (var r = 3; r > -1; r--) {
            for (var c = 0; c < width; c++) {
                var removed = false;
                var temp_stepcount = blocks[r][c].step_count;
                var temp_block_id = blocks[r][c].id;
                console.log("animation start, step_count = " + temp_stepcount, "move block", r, c);
                if (temp_stepcount != 0) {
                    /*document.getElementById(temp_block_id).classList.add("down3");
                    document.getElementById(temp_block_id).addEventListener("animationend", function () { removeclass(temp_block_id, "down3") }, false);*/
                    console.log(blocks[r][c].step_count);
                    var targetid = blocks[r + temp_stepcount][c].id;
                    move('#' + temp_block_id)
                        .add('margin-top', temp_stepcount * 110)
                        .duration('0.2s')
                        .end();
                    var basicTimeline = anime.timeline();
                    basicTimeline
                        .add({
                            targets: '#' + targetid,
                            backgroundColor: { value: colors[Math.log(blocks[r + temp_stepcount][c].val) / Math.log(2)] },
                            duration: 10,
                        })
                        .add({
                            targets: '#' + targetid,
                            scale: {
                                value: 1.05,
                                duration: 50,
                                easing: 'easeInOutQuart',
                            },
                        })
                        .add({
                            targets: '#' + targetid,
                            scale: {
                                value: 1,
                                duration: 50,
                                easing: 'easeInOutQuart',
                            },
                        });
                    /*anime({
                        targets: '#' + targetid,
                        duration: 50,
                        backgroundColor: [
                            { value: colors[Math.log(blocks[r + temp_stepcount][c].val) / Math.log(2)] },
                        ],
                    });*/
                    moved = true;
                }

                if (blocks[r][c].remove == true) {
                    blocks[r][c].id = -1;
                    document.getElementById(temp_block_id).remove();
                    removed = true;
                    console.log("remove!");
                    document.getElementById(blocks[r + temp_stepcount][c].id).style.backgroundImage = "url('" + imageObj[Math.log(blocks[r + temp_stepcount][c].val) / Math.log(2)].src + "')";
                    if(blocks[r + temp_stepcount][c].val == 512)
                        document.getElementsByClassName("big_bg")[0].style.backgroundImage = "url('images/bg1_1.jpg')";
                    else if(blocks[r + temp_stepcount][c].val == 1024)
                        document.getElementsByClassName("big_bg")[0].style.backgroundImage = "url('images/bg2_1.jpg')";
                }
                if (removed == false) {
                    if (temp_stepcount != 0) {
                        blocks[r + temp_stepcount][c].id = blocks[r][c].id;
                        blocks[r][c].id = -1;

                        console.log("change id");
                    }
                }
            }
        }
    } else if (direction == 37) {
        for (var r = 0; r < width; r++) {
            for (var c = 0; c < width; c++) {
                var removed = false;
                var temp_stepcount = blocks[r][c].step_count;
                var temp_block_id = blocks[r][c].id;
                console.log("animation start, step_count = " + temp_stepcount, "move block", r, c);
                if (temp_stepcount != 0) {
                    var targetid = blocks[r][c - temp_stepcount].id;
                    move('#' + temp_block_id)
                        .sub('margin-left', temp_stepcount * 110)
                        .duration('0.2s')
                        .end();
                    var basicTimeline = anime.timeline();
                    basicTimeline
                        .add({
                            targets: '#' + targetid,
                            backgroundColor: { value: colors[Math.log(blocks[r][c - temp_stepcount].val) / Math.log(2)] },
                            duration: 10,
                        })
                        .add({
                            targets: '#' + targetid,
                            scale: {
                                value: 1.05,
                                duration: 50,
                                easing: 'easeInOutQuart',
                            },
                        })
                        .add({
                            targets: '#' + targetid,
                            scale: {
                                value: 1,
                                duration: 50,
                                easing: 'easeInOutQuart',
                            },
                        });
                    /*anime({
                        targets: '#' + targetid,
                        duration: 50,
                        backgroundColor: [
                            { value: colors[Math.log(blocks[r][c - temp_stepcount].val) / Math.log(2)] },
                        ],*/
                    moved = true;
                }

                if (blocks[r][c].remove == true) {
                    blocks[r][c].id = -1;
                    document.getElementById(temp_block_id).remove();
                    removed = true;
                    console.log("remove!");
                    document.getElementById(blocks[r][c-temp_stepcount].id).style.backgroundImage = "url('" + imageObj[Math.log(blocks[r][c-temp_stepcount].val) / Math.log(2)].src + "')";
                    if(blocks[r][c-temp_stepcount].val == 512)
                        document.getElementsByClassName("big_bg")[0].style.backgroundImage = "url('images/bg1_1.jpg')";
                    else if(blocks[r][c-temp_stepcount].val == 1024)
                        document.getElementsByClassName("big_bg")[0].style.backgroundImage = "url('images/bg2_1.jpg')";
                }
                if (removed == false) {
                    if (temp_stepcount != 0) {
                        blocks[r][c - temp_stepcount].id = blocks[r][c].id;
                        blocks[r][c].id = -1;
                        console.log("change id");
                    }
                }
            }
        }
    } else if (direction == 39) {
        for (var r = 0; r < width; r++) {
            for (var c = 3; c > -1; c--) {
                var removed = false;
                var temp_stepcount = blocks[r][c].step_count;
                var temp_block_id = blocks[r][c].id;
                var targetid = null;
                console.log("animation start, step_count = " + temp_stepcount, "move block", r, c);
                if (temp_stepcount != 0) {
                    moved = true;
                    console.log(blocks[r][c].step_count);
                    targetid = blocks[r][c + temp_stepcount].id;
                    move('#' + temp_block_id)
                        .add('margin-left', temp_stepcount * 110)
                        .duration('0.2s')
                        .end(function () {
                            new_block();
                            //remove_block();
                        });
                    var basicTimeline = anime.timeline();
                    basicTimeline
                        .add({
                            targets: '#' + targetid,
                            backgroundColor: { value: colors[Math.log(blocks[r][c + temp_stepcount].val) / Math.log(2)] },
                            duration: 10,
                        })
                        .add({
                            targets: '#' + targetid,
                            scale: {
                                value: 1.05,
                                duration: 50,
                                easing: 'easeInOutQuart',
                            },
                        })
                        .add({
                            targets: '#' + targetid,
                            scale: {
                                value: 1,
                                duration: 50,
                                easing: 'easeInOutQuart',
                            },
                        });
                    /*anime({
                        targets: '#' + targetid,
                        duration: 50,
                        backgroundColor: [
                            { value: colors[Math.log(blocks[r][c + temp_stepcount].val) / Math.log(2)] },
                        ],
                    });*/
                }

                if (blocks[r][c].remove == true) {
                    blocks[r][c].id = -1;
                    document.getElementById(temp_block_id).remove();
                    removed = true;
                    console.log("remove!");
                    document.getElementById(blocks[r][c+temp_stepcount].id).style.backgroundImage = "url('" + imageObj[Math.log(blocks[r][c+temp_stepcount].val) / Math.log(2)].src + "')";
                    if(blocks[r][c+temp_stepcount].val == 512)
                        document.getElementsByClassName("big_bg")[0].style.backgroundImage = "url('images/bg1_1.jpg')";
                    else if(blocks[r][c+temp_stepcount].val == 1024)
                        document.getElementsByClassName("big_bg")[0].style.backgroundImage = "url('images/bg2_1.jpg')";
                }
                if (removed == false) {
                    if (temp_stepcount != 0) {
                        blocks[r][c + temp_stepcount].id = blocks[r][c].id;
                        blocks[r][c].id = -1;
                        console.log("change id");
                    }
                }
            }
        }
    }


    if (moved == true && create_one == false) {
        var newr = Math.floor((Math.random() * 4));
        var newc = Math.floor((Math.random() * 4));
        while (blocks[newr][newc].val != 1) {
            newr = Math.floor((Math.random() * 4));
            newc = Math.floor((Math.random() * 4));
        }
        new_num = Math.floor((Math.random() * 9));
        if (new_num == 8)
            new_num = 4;
        else
            new_num = 2;
        create_div(newr, newc, new_num);
        set_val_color(newr, newc, new_num);
        document.getElementById("score").innerHTML = "Score: "+ score;
        create_one = true;
    }


    for (var r = 0; r < width; r++) {
        for (var c = 0; c < width; c++) {
            console.log(blocks[r][c].id);
            if (blocks[r][c].id != -1)
                document.getElementById(blocks[r][c].id).innerHTML = blocks[r][c].val;
        }
    }
}

function removeclass(removeid, dir) {
    document.getElementById(removeid).classList.remove(dir);
    console.log("callback");
}

function new_block() {

}

function remove_block() {

    for (var r = 0; r < width; r++) {
        for (var c = 3; c > -1; c--) {
            var removed = false;
            var temp_block_id = blocks[r][c].id;
            var temp_stepcount = blocks[r][c].step_count;
            console.log("block:" + r + c);
            if (blocks[r][c].remove == true) {
                blocks[r][c].id = -1;
                document.getElementById(temp_block_id).remove();
                removed = true;
                console.log("remove!");
            }
            if (removed == false) {
                if (temp_stepcount != 0) {
                    blocks[r][c + temp_stepcount].id = blocks[r][c].id;
                    blocks[r][c].id = -1;
                    console.log("change id");
                }
            }
        }
    }
}

function panda_man(){
    var rand = Math.floor((Math.random() * 50));
    if(rand == 1){
        while(1){
            var r = Math.floor((Math.random() * 4));
            var c = Math.floor((Math.random() * 4));
            var val  = blocks[r][c].val;
            if( val >= 2 && val <= 64){
                var urlstring;
                if(blocks[r][c].val == 2)
                    urlstring = "url('images/luffypanda.jpg')";
                else if(blocks[r][c].val == 4)
                    urlstring = "url('images/zoropanda.jpg')";
                else if(blocks[r][c].val == 8)
                    urlstring = "url('images/namipanda.jpg')";
                else if(blocks[r][c].val == 16)
                    urlstring = "url('images/usopppanda.jpg')";
                else if(blocks[r][c].val == 32)
                    urlstring = "url('images/sanjipanda.jpg')";
                else if(blocks[r][c].val == 64)
                    urlstring = "url('images/chopperpanda.jpg')";
                document.getElementById(blocks[r][c].id).style.backgroundImage = urlstring;
                break;
            }
        }
    }
}