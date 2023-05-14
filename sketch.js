let faceapi;
let detections = [];
let video;
let canvas;
let sec;
let array = [10];
let arraySec=[10];

function setup() {
	canvas = createCanvas(480,360);
	canvas.id('canvas');
	video = createCapture(0);
	video.id('video');
	video.size(width,height);

	const faceOptions = {
		withLandMarks:true,
		withExpressions:true,
		withDescriptors:false,
		minConfidence:0.5	  
	};
	faceapi = ml5.faceApi(video,faceOptions,faceReady);
}

function faceReady(){
	faceapi.detect(getFaces);
}

function getFaces(error,result){
  detections = result;
	clear();
	drawBoxes(detections);
	//drawExpressions(detections,20,250,14);


	faceapi.detect(getFaces);
}

function drawBoxes(detections){
	if (detections.length > 0) {
	for (f=0; f < detections.length; f++){
      textFont('Helvetica Neue');
      let {_x, _y, _width, _height} = detections[f].alignedRect._box;
      stroke(44, 169, 225);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);

      showNameAndProcent(_x,_y,detections[f],f);
      
    }
  }
  else{
    return;
  }

}

function printScreen(){
  array=[];
  arraySec=[];
  window.print();
}



function showNameAndProcent(_x,_y,detections,f){
    stroke(255, 255, 255);
    textFont('Arial');
    textSize(14);
    emo = findNameandProcent(detections[f]);
    
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
    
    
    sendNameAndProcent(emo[0],emo[1], detections,f);
}

function sendNameAndProcent(name,procent, detections,f){
  procent = nf(procent*100,2,2);
  if(name=='злость' || name=='грустный'){
    if(procent>95)
    {
	  var today = new Date();
      sec = today.getSeconds();
      presentArr(name,sec);
         
    }
  }
  else{
    return;
  }
}

function presentArr(name,sec) {
  if(array.length < 10){
      array.push(true);
      arraySec.push(sec);
  }
  else
  { 
    var s = arraySec[9] - arraySec[0];
	console.log(s);
    if(s<3 || s>-57){
      printScreen();
    }
	else if(s>3){
		array=[];
		arraySec=[];
	}
  }
}

function findNameandProcent(){
  let {neutral, happy, angry, sad, disgusted, surprised, fearful} = detections[f].expressions;
  const arr = [];
  arr.unshift(neutral,happy,angry, sad, disgusted, surprised, fearful);
  var maxNum = Math.max.apply(Math,arr);
  var index = arr.indexOf(maxNum);
  var names = ['нейтральный', 'счастье', 'злость', 'грустный', 'отвращение','удивлен','страх'][index];
  var procent = maxNum;
  return [names,procent,f];
}


function drawExpressions(detections, x, y, textYSpace){
  if(detections.length > 0){
	let {neutral, happy, angry, sad, disgusted, surprised, fearful} = detections[0].expressions;
    textFont('Helvetica Neue');
    textSize(12);
    noStroke();
    fill(44, 169, 225);
	
	text("бейтарап: " + nf(neutral*100, 2, 2)+"%", x, y);
    text("бақыт:    " + nf(happy*100, 2, 2)+"%", x, y+textYSpace);
    text("ашу:      " + nf(angry*100, 2, 2)+"%", x, y+textYSpace*2);
    text("қайғылы:  "+ nf(sad*100, 2, 2)+"%", x, y+textYSpace*3);
    text("жиіркеніш: " + nf(disgusted*100, 2, 2)+"%", x, y+textYSpace*4);
    text("таң қалу:  " + nf(surprised*100, 2, 2)+"%", x, y+textYSpace*5);
    text("қорқыныш:  " + nf(fearful*100, 2, 2)+"%", x, y+textYSpace*6);
    //screenShot(angry,sad,disgusted,fearful);
  }else{//If no faces is detected:
    text("бейтарап: ", x, y);
    text("бақыт: ", x, y + textYSpace);
    text("ашу: ", x, y + textYSpace*2);
    text("қайғылы: ", x, y + textYSpace*3);
    text("жиіркеніш: ", x, y + textYSpace*4);
    text("таң қалу: ", x, y + textYSpace*5);
    text("қорқыныш: ", x, y + textYSpace*6);
  }

}


