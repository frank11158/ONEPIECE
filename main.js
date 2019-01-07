    


function addHoverEffect(frame) {
    if(frame.target.classList.contains("fadeBlock")) {
        $(frame.target).hover(fade, recover);
    }
    else if(frame.target.classList.contains("reveal")) {
        frame.target.classList.add("move");
    }
    console.log("addeffect: " + frame);
}
/*function addmusic(frame) {
    if(frame.target.classList.contains("music")) {
        $(music.target).paused="false";
		bg.paused="true";
    }
   
    
}*/
function removeHoverEffect(frame) {
    if(frame.target.classList.contains("fadeBlock")) {
        $(frame.target).unbind("mouseenter mouseleave");
    }
    else if(frame.target.classList.contains("reveal")) {
        frame.target.classList.remove("move");
    }
}


function fade(){
    $(this.getElementsByClassName("fade_pic")).animate({
        'opacity': '0.11',
    }, 250)
    $(this.getElementsByClassName("behind")).animate({
        'opacity': '1',
    }, 250)
}

function recover(){
    $(this.getElementsByClassName("fade_pic")).animate({
        'opacity': '1',
    }, 250)
    $(this.getElementsByClassName("behind")).animate({
        'opacity': '0',
    }, 250)
}
var characters = document.getElementsByClassName("character");

/*TimeLine var---------------*/
var slider = document.getElementById("timeLine");
var ori_num = slider.value;
/*---------------------------*/
var width = $( window ).width();
console.log(width);
var center = width/3;

var pic_left = [];

pic_left.push(30 + "%"); //Left0

pic_left.push(26 + "%"); //Left1
pic_left.push(50 + "%");
pic_left.push(20 + "%");
pic_left.push(60 + "%");
pic_left.push(4 + "%");
pic_left.push(98 + "%"); //Left6

pic_left.push(50 + "%"); //Left00
//var numMusic = 1;
var allowScroll;
var numFrames = 41;
var initPos = 180;
var EndPos = 200;
var maxScale = 1.6;
var frame = [];
var height = initPos;
var a = height/(maxScale-1);
//var music[];
//var bg=getElementById("bg");
function Frame(index) {
    this.index = index;
    this.target = document.getElementsByClassName("block")[index];
    this.stage = 1-index;
}
document.getElementById("usernow").textContent
$.ajax({
  method: "get",
  url: "./checkScore",
  data:{
    usrName: "admin",
  },
  success: function(data){
    var sc = data.score
    if(0<sc<512){numFrames=12;}
    else if((512<=sc)&&(sc<1024)){numFrames=25;}
    else if((1024<=sc)&&(sc<2048)){numFrames=36;}
    else if(2048<=sc){numFrames=41;}
	console.log("get data success");
	console.log(sc);
	console.log(numFrames);
  }
})
for(i = 0; i < numFrames; i++) {
    frame.push(new Frame(i));
    if(width>1100){
      frame[i].target.style.bottom = EndPos;
    }
}
/*functfion Music(index) {
    this.index = index;
    this.target = document.getElementsByClassName("music")[index];
  
}
for(j = 0; j < numMusic; j++) {
    music.push(new Music(i));
}
*/
if(width>1100){
  frame[0].target.style.bottom = initPos;
}

$(window).mousewheel(function(e) {
	if(allowScroll&&(width>1100)) {
        allowScroll = 0;
        var allowForward = (frame[numFrames-1].stage <= 1) ? true : false;
    	var allowBackward = (frame[0].stage >= 2) ? true : false;
    	for(i = 0; i < numFrames; i++) {
	        if(frame[i].stage <= 0){
	            frame[i].target.style.display = "none";
	        }
	        if(e.deltaY < 0 && allowForward) {
	            moveForward(frame[i], frame[i].stage);
	            frame[i].stage += 1;
	        }
	        else if(e.deltaY > 0 && allowBackward) {
	            moveBackward(frame[i], frame[i].stage);
	            frame[i].stage -= 1;
	        }
	        else allowScroll = 1;
            console.log(frame[i])
    	}
		if(allowBackward && (e.deltaY > 0)){
            slider.value--;
            ori_num--;
            turnPage(ori_num);
		}else if(allowForward && (e.deltaY < 0)){
            slider.value++;
            ori_num++;
            turnPage(ori_num);
		}else{}
    }
    
})

function moveForward(frame, stage) {
    if(0 <= stage && stage <= 2) {
        if(stage == 0) frame.target.style.display = "block";

        var m = "movingForwardStage" + String(stage);
        var m_left = (stage+1)*2 - 1 ;
        var tar_left = $(frame.target).position().left;
		var tar_width = $(frame.target).width();
		var left_right = tar_left + (tar_width / 3);
		
        if(tar_left > center){
            m = m + "_r";
            m_left = m_left + 1;
        }
        else if (tar_left < center){
            m = m + "_l";
        }
        else{}

        frame.target.style.animation = m + " 1s";
        frame.target.style.setProperty("animation-delay", 0.2 + "s");
        $(frame.target).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
            var pos, scale, opt;
            switch(stage) {
            case 0:
                removeHoverEffect(frame);
                pos = initPos;
                scale = 0.7;
                opt = 0.5;
                break;
            case 1:
                addHoverEffect(frame);
				//addMusic(frame);
				pos = 150;
                scale = 1.2;   
                opt = 1;
                allowScroll = 1;
                if(frame.index == 12) {
                    characters[0].style.display = "block";
                } else if(frame.index == 13) {
                    characters[1].style.display = "block";
                } else if(frame.index == 14) {
                    characters[2].style.display = "block";
                } else if(frame.index == 15) {
                    characters[3].style.display = "block";
                } else if(frame.index == 16) {
                    characters[4].style.display = "block";
                }
                 else if(frame.index == 18) {
				 characters[5].style.display = "block";
                 } else if(frame.index == 20) {
				 characters[6].style.display = "block";
                 } else if(frame.index == 25) {
                     characters[7].style.display = "block";
                 } else if(frame.index == 28) {
                     characters[8].style.display = "block";
                 }
                break;
            case 2:
                removeHoverEffect(frame);
                pos = -500;
                scale = maxScale;
                opt = 0;
                allowScroll = 1;
                break;
            }
            frame.target.style.bottom = pos + "px"
            frame.target.style.transform = "scale(" + scale + "," + scale + ")";
            frame.target.style.opacity = opt;
            frame.target.style.left = pic_left[m_left];
        });
        // console.log(frame.target.style["animation"]);
    }
}



/*
function moveForward(frame, stage) {
    if(stage == 0){
        frame.target.style.display = "block";
        $(frame.target).delay(200);
        var tar_left = $(frame.target).position().left;
        if(tar_left < center ){
            frame.target.style.animation = "movingForwardStage0_l 1s";
            frame.target.style.left = left1;
        }
        else if(tar_left > center ){
            frame.target.style.animation = "movingForwardStage0_r 1s";
            frame.target.style.left = left2;
        }
        else{
            frame.target.style.animation = "movingForwardStage0 1s";
        }
        frame.target.style.bottom = 150 + "px";
        
        var scale = 1;
        frame.target.style.transform = "scale(" + scale + "," + scale + ")";
        frame.target.style.opacity = 0.5;
    }
    else if(stage == 1){
        frame.target.style.display = "block";
        $(frame.target).delay(200);
        var tar_left = $(frame.target).position().left;
                
        console.log(tar_left);
        if(tar_left < center ){
            frame.target.style.animation = "movingForwardStage1_l 1s";
            frame.target.style.left = left3;
        }
        else if(tar_left > center ){
            frame.target.style.animation = "movingForwardStage1_r 1s";
            frame.target.style.left = left4;
        }
        else{
            frame.target.style.animation = "movingForwardStage1 1s";
        }
        // frame.target.style.animationDelay = "0.5s";
        //frame.target.style.bottom = initPos-50 + "px";
        frame.target.style.bottom = 50 + "px";
        
        var scale = 1.2;
        frame.target.style.transform = "scale(" + scale + "," + scale + ")";
        frame.target.style.opacity = 1;
    }
    else if(stage == 2) {
        var tar_left = $(frame.target).position().left;
        if(tar_left < center ){
            console.log(tar_left);
            frame.target.style.animation = "movingForwardStage2_l 1s";
            frame.target.style.left = left5;
        }
        else if(tar_left > center){
            frame.target.style.animation = "movingForwardStage2_r 1s";
            frame.target.style.left = left6;
        }
        else{
            frame.target.style.animation = "movingForwardStage2 1s";
        }
        // frame.target.style.animationDelay = "0.5s";
        frame.target.style.bottom = -500 + "px" ;
        var scale = maxScale;
        frame.target.style.transform = "scale(" + scale + "," + scale + ")";
        frame.target.style.opacity = 0;
    }
}
*/

function moveBackward(frame, stage) {
    if(1 <= stage && stage <= 3) {

        var m = "movingBackwardStage" + String(stage);
        var m_left = (stage-1)*2 - 1 ;
        var tar_left = $(frame.target).position().left;
        var tar_width = $(frame.target).width();
		console.log(tar_width);
		
        if(tar_left > center){
            m = m + "_r";
            m_left = m_left + 1;
        }
        else if (tar_left < center){
            m = m + "_l";
        }
        else{}

        if(m==0){m=7;}
        else if(m==-1){m=0;}

        frame.target.style.animation = m + " 1s";
        frame.target.style.setProperty("animation-delay", 0.2 + "s");
        $(frame.target).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
            var pos, scale, opt;
            switch(stage) {
            case 1:
                removeHoverEffect(frame);
                pos = EndPos;
                scale = 0.5;   // 0.8
                opt = 0;
                break;
            case 2:
                removeHoverEffect(frame);
                pos = initPos;
                scale = 0.7;
                opt = 0.5;
                allowScroll = 1;
                break;
            case 3:
                addHoverEffect(frame);
				//addmusic(frame);
                pos = 150;
                scale = 1.2;   
                opt = 1;
                break;
            }
            frame.target.style.bottom = pos + "px"
            frame.target.style.transform = "scale(" + scale + "," + scale + ")";
            frame.target.style.opacity = opt;
            frame.target.style.left = pic_left[m_left];
        });
        // console.log(frame.target.style["animation"]);
    }
}

/*
function moveBackward(frame, stage) {
    if(stage == 1) {
        var tar_left = $(frame.target).position().left;
        if(tar_left < center ){
            console.log(tar_left);
            frame.target.style.animation = "movingBackwardStage1_l 1s";
            frame.target.style.left = left0;
        }
        else if(tar_left > center ){
            frame.target.style.animation = "movingBackwardStage1_r 1s";
            frame.target.style.left = left00;
        }
        else{
            frame.target.style.animation = "movingBackwardStage1 1s";
        }
        frame.target.style.bottom = 260 + "px";
        var scale = 0.7;
        frame.target.style.transform = "scale(" + scale + "," + scale + ")";
        frame.target.style.opacity = 0;
    }
    else if(stage == 3){
        var tar_left = $(frame.target).position().left;
        if(tar_left < center ){
            console.log(tar_left);
            frame.target.style.animation = "movingBackwardStage3_l 1s";
            frame.target.style.left = left3;
        }
        else if(tar_left > center){
            frame.target.style.animation = "movingBackwardStage3_r 1s";
            frame.target.style.left = left4;
        }else{
            frame.target.style.animation = "movingBackwardStage3 1s";
        }
        // frame.target.style.animationDelay = "0.5s";
        //frame.target.style.bottom = initPos-50 + "px";
        frame.target.style.bottom = 50 + "px";
        var scale = 1.2;
        frame.target.style.transform = "scale(" + scale + "," + scale + ")";
        frame.target.style.opacity = 1;
    }
    else if(stage == 2) {
        var tar_left = $(frame.target).position().left;
        if(tar_left < center ){
            console.log(tar_left);
            frame.target.style.animation = "movingBackwardStage2_l 1s";
            frame.target.style.left = left1;
        }
        else if(tar_left > center){
            frame.target.style.animation = "movingBackwardStage2_r 1s";
            frame.target.style.left = left2;
        }
        else{
            frame.target.style.animation = "movingBackwardStage2 1s";
        }
        
        // frame.target.style.animationDelay = "0.5s";
        frame.target.style.bottom = initPos + "px";
        var scale = 1;
        frame.target.style.transform = "scale(" + scale + "," + scale + ")";
        frame.target.style.opacity = 0.5;
    }
}
*/
var username = undefined;
function onload() {        
    if (getCookie("Username") == "")
        window.top.location.replace("index.html");
    else {
        username = getCookie("Username");
        document.getElementById("usernow").textContent = username;
        for(i = 0; i < numFrames; i++) {
            frame.push(new Frame(i));
            if(width>1100){
              frame[i].target.style.bottom = EndPos; 
            }
        }
        if(width>1100){
          frame[0].target.style.bottom = initPos;
        }else{
          for(i = 0;i<42;i++){
            addHoverEffect(frame[i]);
          }
        }
        
        // initial setting
        for(i = 0; i < numFrames; i++) {
            if(frame[i].stage <= 0){
              if(width>1100){
                frame[i].target.style.display = "none";
              }
            }
            else if(frame[i].stage == 2) {
                addHoverEffect();
            }
            console.log(frame[i]);
        }
        allowScroll = 1;
        if(numFrames==25){
          for(i=0;i<13;i++){
            var div = document.getElementsByClassName("ban")[i];
            div.style.display="none";
          }
        }else if(numFrames==36){
          for(i=0;i<24;i++){
            var div = document.getElementsByClassName("ban")[i];
            div.style.display="none";
          }
        }else if(numFrames==41){
          for(i=0;i<42;i++){
            var div = document.getElementsByClassName("ban")[i];
            div.style.display="none";
          }
        }
    }
}

$(window).keydown(function(event) {
    if(allowScroll) {
        allowScroll = 0;
        var allowForward = (frame[numFrames-1].stage <= 1) ? true : false;
        var allowBackward = (frame[0].stage >= 2) ? true : false;
        var code = event.which || event.keyCode;
        for(i = 0; i < numFrames; i++) {
            if(frame[i].stage <= 0) {
                frame[i].target.style.display = "none";
            }
            if(code == 40 && allowForward) {
                moveForward(frame[i], frame[i].stage);
                frame[i].stage += 1;
            }
            else if(code == 38 && allowBackward) {
                moveBackward(frame[i], frame[i].stage);
                frame[i].stage -= 1;
            }
            else allowScroll = 1;
            //console.log(frame[i]);
        }
		if(allowBackward && (code == 38)){
			slider.value--;
            ori_num--;
            turnPage(ori_num);
		}else if(allowForward && (code == 40)){
			slider.value++;
            ori_num++;
            turnPage(ori_num);
		}else{}
    }
})


function moveLine(number=slider.value, isSearch=0) {
	// var number = slider.value; // Store the number of page
	while((ori_num != number)&&(number<=(numFrames+1))){
		
	        allowScroll = 0;
	        var allowForward = (frame[numFrames-1].stage <= 1) ? true : false;
	    	var allowBackward = (frame[0].stage >= 2) ? true : false;
	    	for(i = 0; i < numFrames; i++) {
		        if(frame[i].stage <= 0){
		            frame[i].target.style.display = "none";
		        }
		        if((ori_num - number) < 0 && allowForward) {
		            moveForward(frame[i], frame[i].stage);
		            frame[i].stage += 1;
		        }
		        else if((ori_num - number) > 0 && allowBackward) {
		            moveBackward(frame[i], frame[i].stage);
		            frame[i].stage -= 1;
		        }
		        else allowScroll = 1;
	            //console.log(frame[i])
	    	}
	    
		if(ori_num < number){ori_num++;}
	   	else {ori_num--;}
    }
    if(isSearch) turnPage(ori_num);
}




/*-------TimeLine-------*/
var sheet = document.createElement('style'),  
  $rangeInput = $('.range input'),
  prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
  
sheet.textContent = ".range input::-webkit-slider-thumb {background-image: url(\"./image/shipGif/" + "ship1.gif" + "\");";
document.body.appendChild(sheet);

var number = slider.value; // Store the number of page(1 ~ 42)

function turnPage(index) {
    
    $rangeInput.val(index).trigger('input');
    $('.range-labels li').removeClass('active selected');
    
    slider.value = index;
    val = (index - 1) * 2;
    style = '';
    var curLabel = $('.range-labels').find('li:nth-child(' + index + ')');
     
    curLabel.addClass('active selected');
    curLabel.prevAll().addClass('selected');
     
    // Change background gradient
    /* Cancel color of timeline */
/*    for (var i = 0; i < prefs.length; i++) {
      style += '.range {background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, transparent ' + val + '%, transparent 100%)}';
      style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #3c3c3c ' + val + '%, #3c3c3c 100%)}';
    }*/
    if(slider.value < 16) style += ".range input::-webkit-slider-thumb {background-image: url(\"./image/shipGif/" + "ship1.gif" + "\");";
    else if(16 <= slider.value && slider.value < 27) style += ".range input::-webkit-slider-thumb {background-image: url(\"./image/shipGif/" + "merry.gif" + "\");";
    else style += ".range input::-webkit-slider-thumb {background-image: url(\"./image/shipGif/" + "sunny.gif" + "\");";
    sheet.textContent = style;
}

var getTrackStyle = function (el) {  
  var curVal = el.value
      val = (curVal - 1) * 2,
      style = '';
    number = el.value;
  // Set active label
  $('.range-labels li').removeClass('active selected');
  
  var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');
  
  curLabel.addClass('active selected');
  curLabel.prevAll().addClass('selected');
  
  // Change background gradient
  /* Cancel color of timeline */
/*  for (var i = 0; i < prefs.length; i++) {
    style += '.range {background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, transparent ' + val + '%, transparent 100%)}';
    style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #3c3c3c ' + val + '%, #3c3c3c 100%)}';
  }*/

  if(slider.value < 16) style += ".range input::-webkit-slider-thumb {background-image: url(\"./image/shipGif/" + "ship1.gif" + "\");";
  else if(16 <= slider.value && slider.value < 27) style += ".range input::-webkit-slider-thumb {background-image: url(\"./image/shipGif/" + "merry.gif" + "\");";
  else style += ".range input::-webkit-slider-thumb {background-image: url(\"./image/shipGif/" + "sunny.gif" + "\");";
 return style;
}

$rangeInput.on('input', function () {
  sheet.textContent = getTrackStyle(this);
  moveLine();
});

// Change input value on label click
$('.range-labels li').on('click', function () {
  var index = $(this).index();

  $rangeInput.val(index + 1).trigger('input');
  moveLine();
});


/*----------Search------------*/
var target;
var menu = document.getElementById("myMenu");
var content = document.getElementsByTagName("p");

function search() {
    document.getElementsByClassName("search-content")[0].style.display = "block";
    menu.innerHTML = "";
    target = document.getElementById("mySearch").value;
    for(i = 0; i < content.length; i++) {
        answer = fuzzyQuery(content[i].innerHTML, target);
        if(answer.length != 0) {
            var position = i+1
            var title = content[i].getElementsByTagName("span")[0];
            menu.innerHTML += "<li onclick=\"moveLine(" + position + "," + 1 + ")\">" + title.innerText + "</li>";
        }
    }
}

function fuzzyQuery(list, keyword) {
    var arr = [];
    if(list.indexOf(keyword) >= 0) {
        arr.push(list);
    }
    return arr;
}

$(document).mouseup(function(e) 
{
    var container = $(".search-content");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
    }
});

function openNav() {
  if(width>1100){
    document.getElementsByClassName("topnav")[0].style.height = "49.33px";
    document.getElementsByClassName("open")[0].style.display = "none";
    document.getElementsByClassName("topnav")[0].style.overflow = "visible";
    document.getElementById("container").style.top = "10%";
  }
  else{
    var div=$(".sub_menu");
    div.css("right","auto");
    div.animate({width:'100%'},"fast");
    $(".closebtn").toggle();
  }
}

function closeNav() {
  if(width>1100){
    document.getElementsByClassName("topnav")[0].style.height = "0";
    document.getElementsByClassName("open")[0].style.display = "block";
    document.getElementsByClassName("topnav")[0].style.overflow = "hidden";
    document.getElementById("container").style.top = "5%";
  }
  else{
    var div=$(".sub_menu");
    div.css("left","auto");
    div.animate({width:'0%'},"fast");
    $(".closebtn").toggle();
  }
}
function openLog(){
  $(".login").toggle();
  $("#usernow").toggle();
  $(".logout").toggle();
}
/*---------Cookie------------*/
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
/*------------------------------*/
function pop(){
    var popmes = document.querySelector(".floating.message.hidden");
    if(popmes != null)
        popmes.classList.remove("hidden");
    else{
        popmes = document.querySelector(".floating.message");
        popmes.classList.add("hidden");
    }
}
