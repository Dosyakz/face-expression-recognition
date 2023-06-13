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

function showNameAndProcent(_x,_y,detections,f){
  emo = findNameandProcent(detections[f]);      
  textSize(14);
  textFont('Arial');
  if(emo[0]=='ашу'){
    stroke(255, 0, 0);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='қайғылы'){
    stroke(255,160,122);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='бейтарап'){
    stroke(255, 255, 0);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='бақыт'){
    stroke(0, 255, 0);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='жиіркеніш'){
    stroke(0, 150, 255); 
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='таң қалу'){
    stroke(169, 92, 104);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='қорқыныш'){
    stroke(222, 49, 99);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
    
    sendNameAndProcent(emo[0],emo[1], detections,f);
}

function sendNameAndProcent(name,procent, detections,f){
  procent = nf(procent*100,2,2);
  if(name=='ашу' || name=='қайғылы' ||  name=='қорқыныш'){
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
// if 50 element of array contains is it screen after 5 sec?

function presentArr (name,sec) {
  if(array.length < 50){
      array.push(true);
      arraySec.push(sec);
  }
  else
  { 
      var s = arraySec[49] - arraySec[0];
      printScreen();
	    if(s>51){
		    array=[];
		    arraySec=[];
  	  }
  }
}


function printScreen(){
  var currentdate = new Date(); 
  var datetime =    
                  currentdate.getHours() + "-"  
                + currentdate.getMinutes() + "-" 
                + currentdate.getSeconds();
  document.title=datetime;
  array=[];
  arraySec=[];
  window.print();
}







function findNameandProcent(){
  let {neutral, happy, angry, sad, disgusted, surprised, fearful} = detections[f].expressions;
  const arr = [];
  arr.unshift(neutral,happy,angry, sad, disgusted, surprised, fearful);
  var maxNum = Math.max.apply(Math,arr);
  var index = arr.indexOf(maxNum);
  var names = ['бейтарап', 'бақыт', 'ашу', 'қайғылы', 'жиіркеніш','таң қалу','қорқыныш'][index];
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



function screenShot(angry,sad,disgusted,fearful)
{
	total_angry=angry*100;
	total_disgusted=disgusted*100;
	total_fearful=fearful*100;
	if(total_disgusted >95 || total_angry>97){
      window.print();
	}
	
}
	