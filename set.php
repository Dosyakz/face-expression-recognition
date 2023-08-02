<?php
require 'db.php';

if(isset($_POST["submit"])){
  $sec = $_POST["sec"];
  $angry = $_POST["angry"];
  $dis = $_POST["dis"];
  $sad = $_POST["sad"];
  $fear = $_POST["fear"];
  
  for($x=0;$x<5;$x++){
    if($sec=='' || $sec==0){
      $sec=5;
    }
    else if($angry=='' || $angry==0){
      $angry=95;
    }
    else if($sad=='' || $sad==0){
      $sad=95;
    }
    else if($dis=='' || $dis==0){
      $dis=95;
    }
    else if($fear=='' || $fear==0){
      $fear=95;
    }
  }
  $query = "INSERT INTO faceexp VALUES('','$sec','$angry','$sad','$fear','$dis')";
  mysqli_query($conn,$query);
  }

  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

$sql = "select * from faceexp ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<br> последний сохраненние: <br> - секунд: ". $row["sec"]. "<br> - злой: " . $row["angry"] ."%<br> - груст: " . $row["sad"] ."%<br> - отвращение: " . $row["dis"] . "%" ."%<br> - страшный: " . $row["fearful"] . "%" . "<br>";
    }
} 
$conn->close();



?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>setting</title>
  </head>
  <body style="display:flex;margin-top: 50px;margin-left: 500px;">
    <br>
    <br>

    <form class="" action="" method="post" autocomplete="off" style="margin-top: 150px;">
      <label for="">секунд</label>
      <input type="number" name="sec" value="">
      <br>
      <br>
      <label for="">Angry</label>
      <input type="number" name="angry"  value="">
      <br>
      <br>
      <label for="">Sad</label>
      <input type="number" name="sad"  value="">
      <br>
      <br>
      <label for="">Disappointment отвращение</label>
      <input type="number" name="dis"  value="">
      <br>
      <br>
      <label for="">Fearful страх</label>
      <input type="number" name="fear" value="">
      <br>
      <br>
      <button onclick="after()" type="submit" name="submit">Submit</button>
      <br>
      <br>
      <a href="main.html">Back</a>
    </form>

<script type="text/javascript">
  function after(){
    alert("успешно изменен");
  }
</script>
  </body>
</html> 