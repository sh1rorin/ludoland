const canvas = document.getElementById("Snake");
const ctx = canvas.getContext("2d");

const upper_padding = 50;
const map_height = 18;
const map_width = map_height;
var map = [];
const empty = 0;
const snake = 1;
const apple = 2;
var length = 3;
var player_head = [9,8];
var player_body = [[9,8,1],[8,8,2],[7,8,3]];
const gridsize = (canvas.height-20-upper_padding) / map_height;
let run = false;
var animationoffsets = [];
const duration = 250;
var spacepressed = false;
var signal;
let if_title = true;

var recentX = 0;
var recentY = 0;
var c_dir = "right";

ctx.lineCap = "round";

const scale = window.devicePixelRatio || 1;
const ini_height = parseFloat(canvas.style.height);
const ini_width = parseFloat(canvas.style.width);
ctx.setTransform(1, 0, 0, 1, 0, 0);

window.addEventListener("resize",() => {
  const window_width = window.innerWidth;
  s_factor = window_width / 1280;

  const c_height = canvas.style.height;
  const c_width = canvas.style.width;
  canvas.style.height = 360 * s_factor + 'px';
  canvas.style.width = 640 * s_factor + 'px';

});

function map_create(){
	for(var h=0;h < map_height;h++){
  	map[h] = [];
    for(var w =0;w <map_width; w++){
    	map[h][w] = empty;
    }
  }
}

function set_apple(x,y){
	map[y][x] = apple;
}

function player_mapping(x,y){
	player_body.forEach((element) => {
  	map[element[1]][element[0]] = snake;
  })
}

function set_animation_offset(index){
	animationoffsets[index] = Date.now();
}

function list_reflesh (){
	map.splice(0);
}

function init(){
run = true;
set_animation_offset(1);
c_dir = "right";
length = 3;
player_head = [4,4];
player_body = [[4,4,1],[3,4,2],[2,4,3]];
list_reflesh();
map_create();
set_apple(5,5);
player_mapping();
if (!spacepressed){
	player_move();
}
}

document.addEventListener("mouseup",mouseuphandler,false);
document.addEventListener("keydown",keydownhandler,false);

function mouseuphandler(e){
  if (!run){
  	if (!if_title && canvas.width/4 - 75 < e.offsetX && e.offsetX < canvas.width/4 +135 && canvas.height/2 < e.offsetY && e.offsetY < canvas.height/2 + 105){
  		signal = "retry";
  	} else if (!if_title && canvas.width*3/4 - 130 < e.offsetX && e.offsetX < canvas.width*3/4 + 80 && canvas.height/2 < e.offsetY && e.offsetY < canvas.height/2 + 105){
  		signal = "title";
      if_title = true;
  	} else if(if_title){
    	run = true;
      if_title = false;
    } 
  } else {
  	const head = t_coord(player_head[0],player_head[1]);
    const dx = e.offsetX - head[0]
    const dy = e.offsetY - head[1];
    if(Math.abs(dx) > Math.abs(dy)){
      if (dx < 0){
      	testdir("left");
      } else {
      	testdir("right");
      }
    } else {
     	if(dy < 0){
      	testdir("up");
      } else {
       	testdir("down");
      }
    }
  }
}

function keydownhandler(e) {
	
	if ((e.key == "ArrowUp" || e.key == "Up" || e.key == "w") && c_dir != "up" ){
  	testdir("up");
  } else if ((e.key == "ArrowRight" || e.key == "Right" || e.key == "d") && c_dir != "right"){
  	testdir("right");
  } else if ((e.key == "ArrowDown" || e.key == "Down" || e.key == "s") && c_dir  != "down"){
  	testdir("down");
  } else if((e.key == "ArrowLeft" || e.key == "Left" || e.key == "a") && c_dir != "left"){
  	testdir("left");
  } else if (e.key == " "){
  	spacepressed = true;
  }
}

function testdir(dir){
	let f_body = [player_body[1][0],player_body[1][1]];
	if(dir == "up"){
  	let testemp = [player_head[0],player_head[1] - 1];
  	if (!(testemp[0] == f_body[0] && testemp[1] == f_body[1])){
    	c_dir = "up";
    }
  } else if (dir == "right") {
  	let testemp = [player_head[0] + 1,player_head[1]];
  	if(!(testemp[0] == f_body[0] && testemp[1] == f_body[1])){
    	c_dir = "right";
    }
  } else if (dir == "down"){
  	let testemp = [player_head[0],player_head[1] + 1];
  	if(!(testemp[0] == f_body[0] && testemp[1] == f_body[1])){
    	c_dir = "down";
    }
  } else if (dir == "left"){
		let testemp = [player_head[0] - 1,player_head[1]];
  	if(!(testemp[0] == f_body[0] && testemp[1] == f_body[1])){
    	c_dir = "left";
    }
  }
}

function header(){
  ctx.font = "28px Tektur";
  ctx.textAline = "start";
  ctx.fillStyle = "#efefef";
  ctx.textAlign = "left";
  ctx.fillText(`Length:${length}`,25,35);
  ctx.fillText(`Level:${length-3}`,180,35);
  ctx.fillText(`Current dir:${c_dir}`,310,35);
}

function title(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.fillStyle = "#3c3c3c";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#efefef";
  ctx.font = "2em Raleway";
  ctx.textAlign = "center";
  ctx.fillText("Click / Tap screen to start",canvas.width/2,canvas.height/2);
  ctx.closePath();
  if (run) {
  	init();
		setTimeout(draw,200);
  } else {
  	window.requestAnimationFrame(title);
  }
}

function drawmap(){
	for(var h = 0;h < map_height;h++){
  	for(var w = 0;w < map_width;w++){
			if(h % 2 == w % 2){
      	ctx.fillStyle = "#7cbd7b";
      } else {
      	ctx.fillStyle = "#4CC071";
      }
      ctx.fillRect((canvas.width - canvas.height)/2 + (gridsize * w) + upper_padding,upper_padding + (gridsize * h),gridsize,gridsize);
      const datatemp = map[h][w];
      if (datatemp == apple){
				ctx.fillStyle = "#EB0701";
        ctx.arc((canvas.width - canvas.height)/2 + (gridsize* w) + upper_padding + gridsize/2,upper_padding + (gridsize * h) + gridsize/2,gridsize/2 - 3,0,Math.PI * 2,false);
        ctx.fill();
      }
    }
  }
}

function t_coord (x,y){
	let x_out = (canvas.width - canvas.height)/2 + (gridsize * x) + upper_padding + gridsize / 2;
  let y_out = upper_padding + (gridsize * y) + gridsize/2;
  return [x_out , y_out];
}

function drawplayer(){
	let bodies =[];
  for (let i = 0;i < player_body.length;i++){
  	if(i == 0){
    	const progression = Date.now() - animationoffsets[0];
      const t_x = ((player_body[i][0])*(progression) + (player_body[i + 1][0])*(duration - progression))/duration;
      const t_y = ((player_body[i][1])*(progression) + (player_body[i + 1][1])*(duration - progression))/duration;
      bodies.push(t_coord(t_x,t_y));
    } else if(i == player_body.length-1){
    	const progression = Date.now() - animationoffsets[0];
      const t_x = ((player_body[i][0])*(duration-progression) + (player_body[i - 1][0])*(progression))/duration;
      const t_y = ((player_body[i][1])*(duration-progression) + (player_body[i - 1][1])*(progression))/duration;
    	bodies.push(t_coord(t_x,t_y));
    } else {
    	bodies.push(t_coord(player_body[i][0],player_body[i][1]));
    }
  }
  ctx.lineWidth = gridsize - 5;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(bodies[0][0],bodies[0][1]);
  for(let i = 1;i < bodies.length;i++){
  	ctx.lineTo(bodies[i][0],bodies[i][1]);
  }
  ctx.strokeStyle ="#4d4fff";
  ctx.stroke();
  ctx.closePath();
}

function gameover(delay,mode){
	let progress;
  if(mode == "easing" && Date.now() - animationoffsets[1] < delay){
  	progress = easeOutExpo((Date.now() - animationoffsets[1]) / delay);
  } else {
    progress = 1;
  }
 
  ctx.fillStyle = "#5959599c";
  ctx.fillRect(0,0,canvas.width,canvas.height * progress);
  ctx.font = "65px Raleway";
  ctx.fillStyle = "#efefef";
  ctx.textAlign = "center";
  ctx.fillText("Game over",canvas.width/2,(-canvas.height/2 * (1-progress) + canvas.height/2 * progress)-70);
  ctx.strokeStyle = "#efefef";
  ctx.lineWidth = 2;
  ctx.strokeRect(canvas.width/4-75,(-canvas.height/2 * (1-progress) + canvas.height/2 * progress),210,105);
  ctx.strokeRect(canvas.width*3/4 -130,(-canvas.height/2 * (1-progress) + canvas.height/2 * progress),210,105);
  ctx.font = "45px Raleway";
  ctx.fillText("Retry",canvas.width/4 +30,(-canvas.height/2 * (1-progress) + canvas.height/2 * progress)+70);
  ctx.fillText("Title",canvas.width*3/4-25,(-canvas.height/2 * (1-progress) + canvas.height/2 * progress)+70);
  
}

function easeOutExpo(x){
	return 1 - Math.pow(2, -10 * x);
}

function player_move(){
	if(c_dir == "up" && player_head[1] > 0){
  	player_body.unshift([player_head[0],player_head[1] - 1,0]);
    player_head[1] -= 1;
  } else if (c_dir == "down" && player_head[1] < map_height-1){
  	player_body.unshift([player_head[0],player_head[1] + 1,0]);
    player_head[1] += 1;
  } else if (c_dir == "right" && player_head[0] < map_height-1){
  	player_body.unshift([player_head[0] + 1,player_head[1],0]);
    player_head[0] += 1;
  } else if (c_dir == "left" && player_head[0] > 0){
    player_body.unshift([player_head[0] - 1,player_head[1],0]);
    player_head[0] -= 1;
  } else {
  	run = false;
    set_animation_offset(1);
  }
  
  if(map[player_head[1]][player_head[0]] == snake){
		run = false;
    set_animation_offset(1);
  } else if(map[player_head[1]][player_head[0]] == apple){
  	while (true){
    	const r_x = Math.floor(Math.random() * map_height);
    	const r_y = Math.floor(Math.random() * map_height);
    	if(map[r_y][r_x] == empty){
    		set_apple(r_x,r_y); 
      	length++;
        break
    	}
    }
  }
  
  
  if(run){
  	for(var i= 0;i < player_body.length;i++){
  		if(player_body[i][2] < length + 1){
    		player_body[i][2] += 1;
    	} else {
    		map[player_body[i][1]][player_body[i][0]] = empty;
      	player_body.splice(i,1);
    	}
  	}
  	player_mapping();
  	set_animation_offset(0);
  	setTimeout(player_move,duration); 
  }
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  header();
  drawmap();
  if(run){
  	drawplayer();
  } else {
  	gameover(1000,"easing");
		if (signal == "retry"){
    	signal = undefined;
    	setTimeout(init(),1500);
    } 
  }
  ctx.closePath();
  if (signal == "title"){
  	location.reload();
  } else {
		window.requestAnimationFrame(draw);
  }
}

title();
