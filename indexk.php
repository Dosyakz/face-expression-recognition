<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname="emo";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "select * from faceexp ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $sec =$row["sec"];
    $ang =$row["angry"];
    $sad =$row["sad"];
    $fear =$row["sad"];
    $dis =$row["fearful"];
  }
} 
$conn->close();
?>



?>
<html>

<head>
  <script src="p5.js"></script>
  <script  src="p5.sound.js"  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="ml5.min.js"></script>
  <script type="application/json" src="ssd_mobilenetv1_model-weights_manifest.json"></script>
  <link href="css/style.css" rel="stylesheet">
  </head>
  <meta charset="utf-8" />
</head>
<div id="data-sec" style="display: none;color:white;">
  
<body>
  <div id="data-sec" style="display: none;color:white;">
    <?php
        echo $sec; // put as the div content
    ?>
</div>

<div id="data-angry" style="display: none;color:white;">
    <?php
        echo $ang; // put as the div content
    ?>
</div>
<div id="data-sad" style="display: none;color:white;">
    <?php
        echo $sad; // put as the div content
    ?>
</div>

<div id="data-fearful" style="display: none;color:white;">
    <?php
        echo $fear; // put as the div content
    ?>
</div>
<div id="data-dis" style="display: none;color:white;">
    <?php
        echo $dis; // put as the div content
    ?>
</div>
<body>
  <script type="text/javascript">
let faceapi;
let detections = [];
let video;
let canvas;
let sec;
const second = document.getElementById("data-sec").textContent;
const pr_angry = document.getElementById("data-angry").textContent;
const pr_sad = document.getElementById("data-sad").textContent;
const pr_dis = document.getElementById("data-dis").textContent;
const pr_fearful = document.getElementById("data-fearful").textContent;
let arraySec=[second];
pra=10*second; 
let array = [pra];


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
		minConfidence:0.5,
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
        if(procent>pr_angry || procent>pr_sad || procent>pr_fearful)
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
  pro_second = second*10;
  if(array.length < pro_second){
      array.push(true);
      arraySec.push(sec);
  }
  else
  { 
      var s = arraySec[pro_second-1] - arraySec[0];
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
  
  </script>
</body>
</html>


