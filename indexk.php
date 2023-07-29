<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname="emo";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "select * from face ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $sec =$row["sec"];
    $ang =$row["angry"];
    $sad =$row["sad"];
    $fear =$row["sad"];
    $dis =$row["fear"];

  }
} 
$conn->close();



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

<body>
  <script src="sketchkz.js"></script>
</body>
</html>


