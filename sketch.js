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
		minConfidence:0. FaceExpressionModel:'http://localhost/dev/models/face_expression_model-weights_manifest.json',
		Mobilenetv1Model: 'http://localhost/dev/models/ssd_mobilenetv1_model-weights_manifest.json',
		FaceLandmarkModel: 'http://localhost/dev/models/face_landmark_68_model-weights_manifest.json',
		FaceLandmark68TinyNet: 'http://localhost/dev/models/face_landmark_68_tiny_model-weights_manifest.json',
		FaceRecognitionModel: 'http://localhost/dev/models/face_recognition_model-weights_manifest.json'5,

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
  if(emo[0]=='злость'){
    stroke(255, 0, 0);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='грустный'){
    stroke(255,160,122);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='нейтральный'){
    stroke(255, 255, 0);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='счастье'){
    stroke(0, 255, 0);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='отвращение'){
    stroke(0, 150, 255); 
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='удивлен'){
    stroke(169, 92, 104);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  else if(emo[0]=='страх'){
    stroke(222, 49, 99);
    text("#"+(f+1)+"   "+emo[0]+" : "+nf(emo[1]*100,2,2)+"%",_x,_y);
  }
  sendNameAndProcent(emo[0],emo[1], detections,f);
}

function sendNameAndProcent(name,procent, detections,f){
  procent = nf(procent*100,2,2);
  if(name=='злость' || name=='грустный' || name=='страх' || name=='отвращение'){
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
  var names = ['нейтральный', 'счастье', 'злость', 'грустный', 'отвращение','удивлен','страх'][index];
  var procent = maxNum;
  return [names,procent,f];
}




