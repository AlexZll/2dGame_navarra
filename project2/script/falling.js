


/*
document.getElementById("canvas").focus();
function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X: " + x + "<br>Y: " + y;
    document.getElementById("pos1").innerHTML = coords;
}
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const usry = 100;
var usrx = 100;
var rightPressed = false;
var leftPressed = false;
var speed = 5;
var usrToRight = new Image();
usrToRight.src = "../static/wqh_car2.jpg";
var usrToLeft = new Image();
usrToLeft.src = "../static/wqh_car1.jpg";
var init = 1;
var score=0;


var coin = new Image();
coin.src = "../static/coin.gif";
var diamond = new Image();
diamond.src = "../static/diamond.gif";
var coin_value = 1;
var diamond_value = 5;


var obj=[];
var count = 100;

window.onload = function (){
	setInterval(auto, 500);
}


document.addEventListener("keyup", keyupHdler, false);
document.addEventListener("keydown", keydownHdler, false);

function keyupHdler(kb){
  if(kb.key == "Right" || kb.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(kb.key == "Left" || kb.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function keydownHdler(kb){
	if(kb.key == "Right" || kb.key == "ArrowRight") {
       rightPressed = true;
    }
    else if(kb.key == "Left" || kb.key == "ArrowLeft") {
       leftPressed = true;
    }
  
}

function moveUser(){
	if(rightPressed || init){
		init = 0;
		usrx += speed;
		ctx.clearRect(usrx-10,usry,30,50);
		ctx.beginPath();
		ctx.drawImage(usrToRight,usrx,usry,30,50);
		ctx.stroke();
	}
	else if (leftPressed) {
		usrx -= speed;
		ctx.clearRect(usrx+10,usry,30,50);
		ctx.beginPath();
		ctx.drawImage(usrToLeft,usrx,usry,30,50);
		ctx.stroke();
	}
}



function randomGenerator(){
	var attr = [];
	var type = Math.random();
	if(type>=0.7){
		attr.push(1);
	}
	else{
		attr.push(2);
	}
	var s = Math.random()*3+1;
	attr.push(s)
	var posx=Math.random()*290;
	var posy=Math.random()*100-100;
	attr.push(posx);
	attr.push(posy);
	return attr;
}



function judge(attr){
	if(100.0<=attr[3]<=140.0){
		if(Math.abs(attr[2]-usrx)<=5){
			switch(attr[0]){
				case 1:
				score+=diamond_value;
				break;
				case 2:
				score+=coin_value;
				break;
				default:
				score+=coin_value;
				break;
			}
			return true;
		}
	}
	else if(attr[3]>140.0){
		return true;
	}
	return false;
}


function drawFortune(){
	ctx.beginPath();
	ctx.drawImage(diamond,95,140,10,10);
	ctx.stroke();
	if(count>=100){
		count=0;
		num=Math.ceil(Math.random()*10);
		for(var i=0;i<num;i++){
			object=randomGenerator();
			obj.push(object);
		}
		//alert(score);
	}
	else{
		count++;
	}
	var l=obj.length;
	//alert(obj);
	var del_arr=[];
	if(l>0){
		for(var j=0;j<l;j++){
			ctx.clearRect(obj[j][2],obj[j][3],10,10);
			obj[j][3]+=obj[j][1];
			ctx.beginPath();
			switch(obj[j][0]){
				case 1:
				ctx.drawImage(diamond,obj[j][2],obj[j][3],10,10);
				break;
				case 2:
				ctx.drawImage(coin,obj[j][2],obj[j][3],10,10);
				break;
			}
			ctx.stroke();
			var boo=judge(obj[j]);
			//alert(boo);
			if(boo){
				del_arr.push(j);
			}
		}
		for(var jj=0;jj<del_arr.length;jj++){
			obj = obj.splice(del_arr[jj]-jj,1);
		}
	}
}

function auto(){
	moveUser();
	drawFortune();
}


