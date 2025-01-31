const canvas = document.getElementById("tapgame");
const ctx = canvas.getContext("2d");
var s_factor = 1;
let tapped = [0,0,0,0];
var anim_offsets = {title_logo:0,title_btn:0,thumbnail:0};
var signals = {start:"none"};

const divElem = document.getElementById("main_content");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");


const scale = window.devicePixelRatio || 1;
const ini_height = parseFloat(canvas.style.height);
const ini_width = parseFloat(canvas.style.width);
//canvas.width = ini_width * scale;
//canvas.height = ini_height;
ctx.setTransform(1, 0, 0, 1, 0, 0);
//ctx.scale(scale,scale);
ctx.fillStyle = "#FFF";
draw();

divElem.addEventListener("mousedown",mousedownhandler,false);
divElem.addEventListener("mouseup",mouseuphandler,false);
canvas.addEventListener("keydown",keydownhandler,false);
canvas.addEventListener("keyup",keyuphandler,false);
canvas.addEventListener("mousedown",(e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;
  console.log(mouseX,mouseY)
},false);

function mousedownhandler(e){
  if (e.target.tagName == "div"){
    const id = e.target.getAttribute("id");
    if (id == "btn1"){
      tapped[0] = 1;
    } else if (id == "btn2"){
      tapped[1] = 1;
    } else if (id == "btn3"){
      tapped[2] = 1;
    } else if (id == "btn4"){
      tapped[3] = 1;
    }
    btnpressed();

  }
  

}

function mouseuphandler(e){
  if (e.target.tagName == "div"){
    const id = e.target.getAttribute("id");
    if (id == "btn1"){
      tapped[0] = 0;
    } else if (id == "btn2"){
      tapped[1] = 0;
    } else if (id == "btn3"){
      tapped[2] = 0;
    } else if (id == "btn4"){
      tapped[3] = 0;
    }
    btnpressed();
  }
}

function keydownhandler(e){

}

function keyuphandler(e){

}

window.addEventListener("resize",() => {
  const window_width = window.innerWidth;
  s_factor = window_width / 1280;

  const c_height = canvas.style.height;
  const c_width = canvas.style.width;
  canvas.style.height = 360 * s_factor + 'px';
  canvas.style.width = 640 * s_factor + 'px';

  btn1.style.height = 240 * s_factor + "px";
  btn1.style.width = 160 * s_factor + "px";
  btn2.style.height = 240 * s_factor + "px";
  btn2.style.width = 160 * s_factor + "px";
  btn2.style.left = 160 * s_factor + "px";
  btn3.style.height = 240 * s_factor + "px";
  btn3.style.width = 160 * s_factor + "px";
  btn3.style.left = 320 * s_factor + "px";
  btn4.style.height = 240 * s_factor + "px";
  btn4.style.width = 160 * s_factor + "px";
  btn4.style.left = 480 * s_factor + "px";

  //ctx.scale(canvas.style.width/c_width,canvas.style.height/c_height);
  draw();
});

function draw (){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  draw_title();
  ctx.fillStyle = "#FFF";
  ctx.arc(0,0,120,0,2 * Math.PI);
  ctx.closePath();
}

function easeOut(offset,duration) {
  if ( Date.now() - offset <= duration ){
  	const p = (Date.now() - offset)/duration;
    return p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
  }
}

function easeInOut(offset,duration) {
	if(Date.now() - offset <= duration){
		const p = (Date.now() - offset)/duration;
    return p === 0
  ? 0
  : p === 1
  ? 1
  : p < 0.5 ? Math.pow(2, 20 * p - 10) / 2
  : (2 - Math.pow(2, -20 * p + 10)) / 2;

  }
}

function move_anim(c1,c2,progress){
	return progress * (c1) + (1 - progress) * c2;
}

function draw_title(){
  ctx.font = "120px Iceberg";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#00efef";
  ctx.fillText("BeatSync",0,62);
  ctx.fillStyle = "#efefef";
  ctx.fillText("BeatSync",0,60);
  ctx.fillStyle = "#efefef";
  ctx.font = "60px Iceberg";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Play",canvas.width*3/4,canvas.height*3/4);

}


// for debug //


function btnpressed(){
  const p = document.getElementsByName("ts");
  p.textContent = `ボタンの状況1:${tapped[0]} 2: ${tapped[1]} 3:${tapped[2]} 4: ${tapped[3]}`;
}