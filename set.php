<?php
require 'db.php';

if(isset($_POST["submit"])){
  $sec = $_POST["sec"];
  $angry = $_POST["angry"];
  $dis = $_POST["dis"];
  $sad = $_POST["sad"];
  $fear = $_POST["fear"];
  }

  $query = "INSERT INTO faceexp VALUES('$sec','$angry','$sad','$fear','$dis')";
  mysqli_query($conn,$query);
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>setting</title>
  </head>
  <style media="screen">
    label{
      display: block;
    }
  </style>
  <body>
    <form class="" action="" method="post" autocomplete="off">
      <label for="">секунд</label>
      <input type="number" name="sec" value="">
      <label for="">Angry</label>
      <input type="number" name="angry"  value="">
      <label for="">Sad</label>
      <input type="number" name="sad"  value="">
      <label for="">Disappointment отвращение</label>
      <input type="number" name="dis"  value="">
      <label for="">Fearful страх</label>
      <input type="number" name="fear" value="">
      <br>
      <button type="submit" name="submit">Submit</button>
    </form>
  </body>
</html>