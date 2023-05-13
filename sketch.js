let faceapi;
let detections = [];
let video;
let canvas;

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
	//console.log(detections);
	clear();
	drawBoxes(detections);
	//drawLandmarks(detections);
	drawExpressions(detections,20,250,14);


	faceapi.detect(getFaces);
}

function drawBoxes(detections){
	if (detections.length > 0) {
    for (f=0; f < detections.length; f++){
      let {_x, _y, _width, _height} = detections[f].alignedRect._box;
      stroke(44, 169, 225);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}

function drawLandmarks(detections){
	if(detections.length>0){
		for(f=0;f<detections.length;f++){
			let points = detections[f].landmarks.positions;
			for(let i=0;i<points.length;i++){
				stroke(44,169,225);
				strokeWeight(3);
				point(points[i]._x,points[i]._y);
			}
		}
	}
}


function drawExpressions(detections, x, y, textYSpace){
  if(detections.length > 0){//If at least 1 face is detected: 
	let {neutral, happy, angry, sad, disgusted, surprised, fearful} = detections[0].expressions;
    textFont('Helvetica Neue');
    textSize(14);
    noStroke();
    fill(44, 169, 225);

    text("нейтральный:       " + nf(neutral*100, 2, 2)+"%", x, y);
    text("счастье: " + nf(happy*100, 2, 2)+"%", x, y+textYSpace);
    text("злость:        " + nf(angry*100, 2, 2)+"%", x, y+textYSpace*2);
    text("грустный:            "+ nf(sad*100, 2, 2)+"%", x, y+textYSpace*3);
    text("отвращение: " + nf(disgusted*100, 2, 2)+"%", x, y+textYSpace*4);
    text("удивлен:  " + nf(surprised*100, 2, 2)+"%", x, y+textYSpace*5);
    text("страх:           " + nf(fearful*100, 2, 2)+"%", x, y+textYSpace*6);
    //screenShot(angry,sad,disgusted,fearful);
  }else{//If no faces is detected:
    text("нейтральный: ", x, y);
    text("счастье: ", x, y + textYSpace);
    text("злость: ", x, y + textYSpace*2);
    text("грустный: ", x, y + textYSpace*3);
    text("отвращение: ", x, y + textYSpace*4);
    text("удивлен: ", x, y + textYSpace*5);
    text("страх: ", x, y + textYSpace*6);
  }

}


function screenShot(angry,sad,disgusted,fearful){
	total_angry=angry*100;
	total_disgusted=disgusted*100;
	total_fearful=fearful*100;
	if(total_disgusted >95 || total_angry>97){
      window.print();
	}
	
}
	